import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Detail from './components/Detail';
import {
	BrowserRouter as Router,
	Routes,
	Route,
  } from "react-router-dom";
import Login from './components/Login';
import SearchMovies from './components/search';
import WatchList from './components/watchList';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Login />} /> 
          <Route path='/home' element={<Home />} /> 
          <Route path='/detail/:id' element={<Detail />} />  
          <Route path='/search' element={<SearchMovies />} />
          <Route path='/watchList' element={<WatchList />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
