import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TrackForm from './components/TrackForm';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-track" element={<TrackForm />} />
          <Route path="/edit-track/:trackId" element={<TrackForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
