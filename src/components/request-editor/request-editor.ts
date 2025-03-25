import { firstValueFrom, takeUntil } from 'rxjs';

import { ApiService, RequestTypes } from '../../services/api-service';
import './request-editor.css';


export class RequestEditor extends HTMLElement {
  static readonly HTML_TAG = 'request-editor';

  constructor(private api: ApiService) {
    super();
  }

  private button!: HTMLButtonElement;
  private input!: HTMLInputElement;
  private requestTypes = Object.keys(RequestTypes);
  private select!: HTMLSelectElement;

  init() {
    const requestEditor = document.createElement(RequestEditor.HTML_TAG) as RequestEditor;
    this.buildComponent(requestEditor);
    return requestEditor;
  }

  private buildComponent(requestEditor: RequestEditor) {
    requestEditor.classList.add('request-editor-container');

    const selectLabelContainer = document.createElement('div');
    selectLabelContainer.classList.add('request-editor-select-label');

    selectLabelContainer.insertAdjacentHTML('afterbegin',`<label for="request-type-select"></label>`);

    this.select = document.createElement('select');
    this.select.classList.add('request-editor-select');
    this.select.id = 'request-type-select';
    this.fillRequestTypes();
    selectLabelContainer.appendChild(this.select);
    this.observeRequestType();

    this.input = document.createElement('input');
    this.input.classList.add('request-editor-input');
    this.input.type = 'text';
    this.input.addEventListener('input', this.handleInput.bind(this));
    selectLabelContainer.appendChild(this.input);
    this.observeRequestInput();

    requestEditor.appendChild(selectLabelContainer);

    this.button = document.createElement('button');
    this.button.innerHTML = 'Send';
    this.button.disabled = true;
    this.button.classList.add('request-editor-button', 'button-disabled');
    requestEditor.appendChild(this.button);
    this.button.onclick = () => {
      this.applyRequest(this.input.value);
    };
  }

  private handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.api.changeRequestUrl({ typeOfChange: 'url', url: value });
  }

  private fillRequestTypes() {
    this.requestTypes
      .forEach(request => {
        this.select.insertAdjacentHTML('beforeend', `<option value="${ request }">${ request }</option>`);
      });
    this.select.onchange = () => {
      this.api.changeType(this.select.value as RequestTypes);
    };
  }

  private async applyRequest(
    url: string,
    body?: Record<string, string | number | Record<string, string | number>>,
    headers?: Record<string, string>
  ) {
    const apiRequest = await firstValueFrom(this.api.requestType$);   
    this.api.request(url, apiRequest, JSON.stringify(body), headers)
      .then(async res => {
        if (res.ok) {
          const response = await res.json();
          console.log('RES', response);
        } else {
          console.log('AN ERROR', res);
        }
      })
      .catch(error => console.log('ERROR', error));
  }

  private observeRequestType() {
    this.api.requestType$
      .pipe(takeUntil(this.api.unsubscribeNotifier()))
      .subscribe(type => {
        for (const option of (Array.from(this.select.children) as HTMLOptionElement[])) {
          if (option.value === type) {
            option.selected = true;
          } else {
            option.selected = false;
          }
        }
      });
  }

  private observeRequestInput() {
    this.api.requestUrl$
      .pipe(takeUntil(this.api.unsubscribeNotifier()))
      .subscribe(url => {
        this.input.value = url.url;
        if (!this.button) {
          return;
        }

        if (!this.input.value.length) {
          this.button.disabled = true;
          this.button.classList.add('button-disabled');
        } else {
          if (this.button.disabled) {
            this.button.disabled = false;
            this.button.classList.remove('button-disabled');
          }
        }
      });
  }
}

if (!customElements.get(RequestEditor.HTML_TAG)) {
  customElements.define(RequestEditor.HTML_TAG, RequestEditor);
}
