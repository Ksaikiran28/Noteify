import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import Notes from './pages/Notes';
import Home from './pages/Home';
import NoteDetails from './components/NoteDetails';

const App = () => {
  return (
    <div className='relative h-full w-full'>
      <div
        className='absolute inset-0 -z-10 h-full w-full'
        style={{
          background: 'radial-gradient(125% 125% at 50% 10%, #000 60%, #00FF9D40 100%)'
        }}
      />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/note/:id' element={<NoteDetails />} />
      </Routes>
    </div>
  );
};

export default App;
