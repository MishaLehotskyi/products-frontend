import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="h-screen bg-gray-600 overflow-y-scroll py-[20px] scrollbar-webkit">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
