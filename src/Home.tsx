import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Timer from './Timer';

function Home() {
    const navigate = useNavigate();
    const handleSignout = () => {
        // Add signout logic here
        navigate("/");
    }

  return (
    <>
      <div>
        Productivity
        <button onClick={handleSignout}>Signout</button>
        <div id='timer'>Timer here</div>
        <Timer></Timer>
        <div id='spotify'>Spotify API here</div>
        <div id='notepad'>Notepad here</div>
        <div id='todo-list'>Todo list here</div>
      </div>
    </>
  )
}

export default Home
