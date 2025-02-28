import { firstValueFrom, takeUntil } from 'rxjs';

import { ApiService, RequestTypes } from '../../services/api-service';
import './request-editor.css';


export class RequestEditor extends HTMLElement {
  static readonly HTML_TAG = 'request-editor';

  constructor() {
    super();

    this.api = new ApiService();
  }

  private api!: ApiService;
  private button!: HTMLButtonElement;
  private input!: HTMLInputElement;
  private requestTypes = Object.keys(RequestTypes);
  private select!: HTMLSelectElement;

  create() {
    const requestEditor = document.createElement(RequestEditor.HTML_TAG) as RequestEditor;
    this.buildComponent(requestEditor);
    return requestEditor;
  }

  private buildComponent(requestEditor: RequestEditor) {
    this.classList.add('request-container');

    const label = document.createElement('label');
    label.setAttribute('for', 'request-type-select');
    requestEditor.appendChild(label);

    this.select = document.createElement('select');
    this.select.classList.add('request-select');
    this.select.id = 'request-type-select';
    this.select.name = 'request-type-select';
    this.fillRequestTypes();
    requestEditor.appendChild(this.select);
    this.observeRequestType();

    this.input = document.createElement('input');
    this.input.classList.add('request-input');
    this.input.id = 'request-editor';
    this.input.type = 'text';
    requestEditor.appendChild(this.input);

    this.button = document.createElement('button');
    this.button.id = 'request-send';
    this.button.innerHTML = 'Send';
    requestEditor.appendChild(this.button);
    this.button.onclick = () => {
      this.applyRequest(this.input.value);
    };
  }

  private fillRequestTypes() {
    this.requestTypes
      .forEach(request => {
        const option = document.createElement('option');
        option.id = `dropdown-request-${ request }`;
        option.value = request;
        option.innerHTML = request;
        this.select.appendChild(option);
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
    return this.api.requestType$
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
}

if (!customElements.get(RequestEditor.HTML_TAG)) {
  customElements.define(RequestEditor.HTML_TAG, RequestEditor);
}
