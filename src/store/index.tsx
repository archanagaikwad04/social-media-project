import { initialState } from './initialState';
import reducer from './reducers/reducer';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';


const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, initialState());
  
  return store;
};
export default configureStore;
