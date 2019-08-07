import React from 'react';
import FormikUserForm from './Form';
import './App.css';
import ReactDOM from 'react-dom';

function App() {
  return (
    <div className="App">
      <FormikUserForm />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
