import React from 'react';

import Login from './components/Login/Login';
import SignUp from './components/SignUp';
import Home from './components/Home/Home';
// redux packages
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import reducers from './store/reducers/reducer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// firebase config
import { firebase as fbConfig, reduxFirebase as rfConfig } from './config';

// firebase packages
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore'; // for firestore
import 'firebase/storage';
import 'firebase/analytics';

// store
import { createStore } from 'redux';


const store = createStore(reducers);
firebase.initializeApp(fbConfig);



export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={rfConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}>
        <div>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={Login} exact={true} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/new" component={Home} />
            </Switch>
          </BrowserRouter>
        </div>

      </ReactReduxFirebaseProvider>
    </Provider>
  )

}