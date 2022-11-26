import * as ReactDOM from 'react-dom/client';

import '@fontsource/roboto';
import './styles.css';

import { App } from './app';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(<App />);
