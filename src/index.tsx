import * as ReactDOM from 'react-dom/client';

import './styles.css';
import './fonts';

import { App } from './app';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(<App />);
