import { RequestEditor } from './request-editor/request-editor';
import './style.css';


export class DetectiveAPI extends HTMLElement {
  static readonly HTML_TAG = 'detective-api';

  constructor() {
    super();
  }

  create() {
    const detectiveApi = document.createElement(DetectiveAPI.HTML_TAG) as DetectiveAPI;
    this.buildDetectiveApi(detectiveApi);

    return detectiveApi;
  }

  private buildDetectiveApi(detectiveApi: DetectiveAPI) {
    const requestEditor = new RequestEditor();
    const requestEditorComponent = requestEditor.create();
    requestEditorComponent.classList.add('request-editor');
    detectiveApi.appendChild(requestEditorComponent);
  }
}

if (!customElements.get(DetectiveAPI.HTML_TAG)) {
  customElements.define(DetectiveAPI.HTML_TAG, DetectiveAPI);
}
