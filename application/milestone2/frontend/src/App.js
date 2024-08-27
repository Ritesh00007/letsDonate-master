import React, { useReducer } from 'react';
import './App.css';
import ProductDonationHome from './ProductDonationHome.js';
import TopBar from './TopBar';
import update from 'immutability-helper';

export const AppContext = React.createContext();

const initialState = {
  inputText: ''
};

function reducer(state, action) {
  switch (action.type) {
      case 'UPDATE_INPUT':
          return update(state, { inputText: {$set: action.data}});
      default:
          return initialState;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div className="app">
      <AppContext.Provider value={{ state, dispatch }}>
        <TopBar />
        <ProductDonationHome />
      </AppContext.Provider>
    </div>
  );
}

export default App;
