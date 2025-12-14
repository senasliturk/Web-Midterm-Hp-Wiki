import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import hogwartsBg from '../assets/Hogwarts.avif';
import ravenclawImg from '../assets/raven.png';
import sortingVideo from '../assets/sorting.mp4';

const gryffindorLogo = "https://static.wikia.nocookie.net/harrypotter/images/b/b1/Gryffindor_ClearBG.png";
const slytherinLogo = "https://static.wikia.nocookie.net/harrypotter/images/0/00/Slytherin_ClearBG.png";
const hufflepuffLogo = "https://static.wikia.nocookie.net/harrypotter/images/0/06/Hufflepuff_ClearBG.png";

const questions = [
  {
    id: 1,
    text: "What do you value most?",
    options: [
      { text: "Bravery", house: "Gryffindor" },
      { text: "Greed", house: "Slytherin" },
      { text: "Intelligence", house: "Ravenclaw" },
      { text: "Loyalty", house: "Hufflepuff" }
    ]
  },
  {
    id: 2,
    text: "How would you react in a difficult situation?",
    options: [
      { text: "I fight", house: "Gryffindor" },
      { text: "I Seek Opportunity", house: "Slytherin"},
      { text: "Make a Plan", house: "Ravenclaw" },
      { text: "I Will Help Others", house: "Hufflepuff" }
    ]
  },
  {
    id: 3,
    text: "What is yoour favorite lesson?",
    options: [
      { text: "Deffence", house: "Gryffindor" },
      { text: "Potion", house: "Slytherin"},
      { text: "Charm", house: "Ravenclaw" },
      { text: "Botany", house: "Hufflepuff" }
    ]
  }
];

function Home() {
  const [stage, setStage] = useState('start');
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [scores, setScores] = useState({ Gryffindor: 0, Slytherin: 0, Ravenclaw: 0, Hufflepuff: 0 });
  const [isVideoFading, setIsVideoFading] = useState(false);

  const startJourney = () => {
    setIsZoomed(true);
    setTimeout(() => {
      setStage('quiz');
    }, 800);
  };

  const handleAnswer = (house) => {
    const newScores = { ...scores, [house]: scores[house] + 1 };
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const winner = Object.keys(newScores).reduce((a, b) => newScores[a] > newScores[b] ? a : b);
      setSelectedHouse(winner);
      setStage('sorting');
    }
  };

  const handleVideoEnd = () => {
    setIsVideoFading(true);
    setTimeout(() => {
      setStage('result');
      setIsVideoFading(false);
    }, 1000);
  };

  const resetQuiz = () => {
    setStage('start');
    setIsZoomed(false);
    setCurrentQuestion(0);
    setScores({ Gryffindor: 0, Slytherin: 0, Ravenclaw: 0, Hufflepuff: 0 });
    setIsVideoFading(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col font-harry overflow-hidden">
      {stage !== 'sorting' && (
        <div className={`absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-[2000ms] ease-in-out ${isZoomed ? 'scale-150' : 'scale-100'}`}style={{ backgroundImage: `url(${hogwartsBg})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/30 to-black/90"></div>
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center px-4 w-full h-full">        
        {stage === 'start' && (
          <div className="animate-fadeIn">
            <h1 className="font-harry text-5xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_5px_5px_rgba(0,0,0,1)] mb-8 pb-4 leading-normal tracking-wide">
              Welcome to Hogwarts
            </h1>
            <p className="font-sans text-xl text-gray-300 mb-12 drop-shadow-md">
              Are you ready to learn which House is your destiny?
            </p>
            <button onClick={startJourney}className="px-12 py-5 bg-violet-900/80 hover:bg-violet-800 text-white font-harry font-bold text-2xl rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(167,139,250,0.8)] hover:scale-105 transition-all duration-300 border border-violet-400/50 tracking-wider backdrop-blur-sm">
              Let’s begin
            </button>
          </div>
        )}

        {stage === 'quiz' && (
          <div className="animate-fadeIn bg-black/30 p-10 rounded-3xl backdrop-blur-xl border border-white/20 max-w-4xl shadow-2xl">
            <p className="text-gray-300 font-sans mb-4 text-sm tracking-widest uppercase opacity-80">
              Question {currentQuestion + 1} / {questions.length}
            </p>
            <h2 className="text-3xl md:text-5xl text-white font-harry mb-10 drop-shadow-lg tracking-wide">
              {questions[currentQuestion].text}
            </h2>
            <div className="grid grid-cols-2 gap-6 w-full">
              {questions[currentQuestion].options.map((option, index) => (
                <button 
                  key={index}
                  onClick={() => handleAnswer(option.house)}
                  className={`
                    h-32 w-full flex flex-col items-center justify-center 
                    border border-white/30 rounded-2xl text-white text-xl font-harry transition-all hover:scale-105 shadow-lg group relative overflow-hidden backdrop-blur-sm
                    ${option.house === 'Gryffindor' ? 'bg-red-900/40 hover:bg-red-900/60 hover:border-red-500' : ''}
                    ${option.house === 'Slytherin' ? 'bg-green-900/40 hover:bg-green-900/60 hover:border-green-500' : ''}
                    ${option.house === 'Ravenclaw' ? 'bg-blue-900/40 hover:bg-blue-900/60 hover:border-blue-500' : ''}
                    ${option.house === 'Hufflepuff' ? 'bg-yellow-900/40 hover:bg-yellow-900/60 hover:border-yellow-500' : ''}
                  `}
                >
                  <span className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300 z-10 drop-shadow-md">{option.icon}</span>
                  <span className="z-10 tracking-wider drop-shadow-md">{option.text}</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-30 transition-opacity"></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {stage === 'sorting' && createPortal(
          <div className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-1000 ${isVideoFading ? 'opacity-0' : 'opacity-100'}`}>
            <div className="absolute inset-0 bg-cover bg-center"style={{ backgroundImage: `url(${hogwartsBg})`,filter: 'blur(15px) brightness(0.5)'}}/>
            <div className="relative z-10 h-[85vh] aspect-[9/16] shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden border-2 border-yellow-600/30">
              <video 
                src={sortingVideo} 
                autoPlay 
                onEnded={handleVideoEnd}
                className="h-full w-full object-cover" 
                style={{ pointerEvents: 'none' }}
                />
            </div>
          </div>,
          document.body
        )}

        {stage === 'result' && (
          <div className="animate-fadeIn transition-all duration-1000 ease-out">
            <p className="text-3xl text-gray-200 mb-8 font-harry tracking-widest drop-shadow-md">The Sorting Hat has decided...</p>
            
            {selectedHouse === 'Gryffindor' && (
              <Link to="/characters?house=Gryffindor" className="group block relative rounded-3xl bg-black/60 border-4 border-red-600 p-12 hover:bg-black/80 transition-all hover:scale-105 cursor-pointer backdrop-blur-md">
                <img src={gryffindorLogo} alt="Gryffindor" className="w-64 h-64 object-contain drop-shadow-[0_0_40px_rgba(220,38,38,0.6)] mb-6 mx-auto" />
                <h2 className="text-6xl font-harry font-bold text-red-500 tracking-[0.2em] drop-shadow-lg">GRYFFINDOR</h2>
                <div className="mt-8 px-8 py-3 bg-red-800 hover:bg-red-700 text-white rounded-full inline-block font-sans text-lg">See Characters</div>
              </Link>
            )}

            {selectedHouse === 'Slytherin' && (
              <Link to="/characters?house=Slytherin" className="group block relative rounded-3xl bg-black/60 border-4 border-green-600 p-12 hover:bg-black/80 transition-all hover:scale-105 cursor-pointer backdrop-blur-md">
                <img src={slytherinLogo} alt="Slytherin" className="w-64 h-64 object-contain drop-shadow-[0_0_40px_rgba(22,163,74,0.6)] mb-6 mx-auto" />
                <h2 className="text-6xl font-harry font-bold text-green-500 tracking-[0.2em] drop-shadow-lg">SLYTHERIN</h2>
                <div className="mt-8 px-8 py-3 bg-green-800 hover:bg-green-700 text-white rounded-full inline-block font-sans text-lg">See Characters</div>
              </Link>
            )}

            {selectedHouse === 'Ravenclaw' && (
              <Link to="/characters?house=Ravenclaw" className="group block relative rounded-3xl bg-black/60 border-4 border-blue-500 p-12 hover:bg-black/80 transition-all hover:scale-105 cursor-pointer backdrop-blur-md">
                <img src={ravenclawImg} alt="Ravenclaw" className="w-64 h-64 object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.6)] mb-6 mx-auto" />
                <h2 className="text-6xl font-harry font-bold text-blue-400 tracking-[0.2em] drop-shadow-lg">RAVENCLAW</h2>
                <div className="mt-8 px-8 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-full inline-block font-sans text-lg">See Characters</div>
              </Link>
            )}

            {selectedHouse === 'Hufflepuff' && (
              <Link to="/characters?house=Hufflepuff" className="group block relative rounded-3xl bg-black/60 border-4 border-yellow-500 p-12 hover:bg-black/80 transition-all hover:scale-105 cursor-pointer backdrop-blur-md">
                <img src={hufflepuffLogo} alt="Hufflepuff" className="w-64 h-64 object-contain drop-shadow-[0_0_40px_rgba(234,179,8,0.6)] mb-6 mx-auto" />
                <h2 className="text-6xl font-harry font-bold text-yellow-500 tracking-[0.2em] drop-shadow-lg">HUFFLEPUFF</h2>
                <div className="mt-8 px-8 py-3 bg-yellow-700 hover:bg-yellow-600 text-white rounded-full inline-block font-sans text-lg">See Characters</div>
              </Link>
            )}
            
            <button onClick={resetQuiz} className="mt-12 text-gray-400 hover:text-white underline font-sans text-lg">
              Repeat Test
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;