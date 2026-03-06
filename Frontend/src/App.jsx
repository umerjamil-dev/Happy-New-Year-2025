import React from 'react'
import './App.css'
import Router from './Router/Router'
import WhatsAppButton from './components/WhatsAppButton'
// In your index.js or App.jsx
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {

  return (
    <>
      <Router/>
      <WhatsAppButton />
    </>
  )
}

export default App
