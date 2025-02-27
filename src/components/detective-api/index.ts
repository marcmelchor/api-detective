import sheet from './style';


export class DetectiveAPI extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(`.d-flex { display: flex; justify-content: end; width: 100%; }`);
      this.shadowRoot.adoptedStyleSheets = [ sheet ];
      const p = document.createElement('p');
      p.innerText = 'Hello from Detective API';
      p.classList.add('d-flex');
      this.shadowRoot.appendChild(p);
    }
  }

  static readonly HTML_TAG = 'detective-api';
  static create() {
    return document.createElement(DetectiveAPI.HTML_TAG) as DetectiveAPI;
  }
}

if (!customElements.get(DetectiveAPI.HTML_TAG)) {
  customElements.define(DetectiveAPI.HTML_TAG, DetectiveAPI);
}
