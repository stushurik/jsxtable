import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

process.env.REACT_APP_EMISSARY_URL = String(Math.random());

const root = document.createElement('div');
root.setAttribute('id', 'root');

document.body.appendChild(root);
