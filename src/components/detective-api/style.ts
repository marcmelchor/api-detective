import * as styles from './style.module.css';


const sheet = new CSSStyleSheet();

const styleSource = Object.values(styles).join('\n');

sheet.replaceSync(styleSource);

export default sheet; 