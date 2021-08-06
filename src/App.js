import React from 'react';

// Routing
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//Components
import Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound';

//Styles
import { GlobalStyle } from './GlobalStyle';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* '/:movieId' is a parameter for the Route component */}
        <Route path='/:movieId' element={<Movie/>}/> 
        {/* '/*' is for any other path */}
        <Route path='/*' element={<NotFound/>}/> 
      </Routes>
      <GlobalStyle />
    </Router>
  );
}

export default App;
