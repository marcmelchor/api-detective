import './style.module.css';


export class DetectiveAPI extends HTMLElement {
  constructor() {
    super();

    const p = document.createElement('p');
    p.innerText = 'Hello from Detective API';
    p.classList.add('d-flex');
    this.appendChild(p);
  }

  static readonly HTML_TAG = 'detective-api';
  static create() {
    return document.createElement(DetectiveAPI.HTML_TAG) as DetectiveAPI;
  }
}

if (!customElements.get(DetectiveAPI.HTML_TAG)) {
  customElements.define(DetectiveAPI.HTML_TAG, DetectiveAPI);
}
