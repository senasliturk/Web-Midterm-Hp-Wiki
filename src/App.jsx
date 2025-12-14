import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Spells from './pages/Spells';
import CharacterDetail from './pages/CharacterDetail';
import Movies from './pages/Movies'; 
import Books from './pages/Books'; 
import bgMusic from './assets/sortingaudio.mp3';

function App() {
  const audioRef = useRef(new Audio(bgMusic));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current.loop = true; 
    audioRef.current.volume = 0.5; 
    const playAudio = () => {
      if (!isPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log("Audio play error:", err));
      }
    };

    window.addEventListener('click', playAudio);
    return () => { window.removeEventListener('click', playAudio); };
  }, [isPlaying]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 font-sans text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/spells" element={<Spells />} />
          <Route path="/movies" element={<Movies />} /> 
          <Route path="/books" element={<Books />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;