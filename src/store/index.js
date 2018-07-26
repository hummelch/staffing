import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import staffingApp from './reducers';
import { loadDb } from './thunks';

const store = createStore(
  staffingApp,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(loadDb());

export default store;
