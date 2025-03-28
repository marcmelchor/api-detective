import { ApiService } from '../services/api-service';
import { RequestEditor } from './request-editor/request-editor';
import { RequestTab } from './request-tab/request-tab';
import './index.css';


export class DetectiveAPI extends HTMLElement {
  static readonly HTML_TAG = 'detective-api';

  constructor() {
    super();

    this.api = new ApiService();
  }

  api!: ApiService;

  init() {
    const detectiveApi = document.createElement(DetectiveAPI.HTML_TAG) as DetectiveAPI;
    this.buildDetectiveApi(detectiveApi);

    return detectiveApi;
  }

  private buildDetectiveApi(detectiveApi: DetectiveAPI) {
    const requestEditor = new RequestEditor(this.api);
    const requestEditorComponent = requestEditor.init();
    detectiveApi.appendChild(requestEditorComponent);

    const requestTabs = new RequestTab(this.api);
    const requestTabsComponent = requestTabs.init();
    detectiveApi.appendChild(requestTabsComponent);
  }
}

if (!customElements.get(DetectiveAPI.HTML_TAG)) {
  customElements.define(DetectiveAPI.HTML_TAG, DetectiveAPI);
}
