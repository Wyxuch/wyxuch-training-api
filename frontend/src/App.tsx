import React from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './constants/routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routes.map(({path, element}) => (
              <Route key={path} path={path} element={element}/>
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
