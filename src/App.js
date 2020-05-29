import React,{Suspense} from 'react';
import { PersistGate } from "redux-persist/integration/react";
import Loader from './components/Loader';
import store, { persistor } from "./store/store";
import { Provider } from "react-redux";
import  Router  from './helper/Router';


function App() {
  return (
    
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
        <Suspense fallback={<Loader />}>
          <Router></Router>
        </Suspense>
      </PersistGate>
    </Provider>  
  );
}

export default App;
