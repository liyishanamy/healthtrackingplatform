import { createStore } from 'redux';
import reducer from '../login_Reducers/reducers';

const store = createStore(reducer);

export default store;