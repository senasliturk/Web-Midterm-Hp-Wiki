import { useState } from 'react';
import bgImg from '../assets/trenke.jpg'; 

const MOVIE_DATA = [
  {
    id: 1,
    title: "Harry Potter and the Sorcerer's Stone",
    year: "2001",
    director: "Chris Columbus",
    image: "https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
    desc: "Harry Potter's first step into the wizarding world and his first year at Hogwarts."
  },
  {
    id: 2,
    title: "Harry Potter and the Chamber of Secrets",
    year: "2002",
    director: "Chris Columbus",
    image: "https://image.tmdb.org/t/p/w500/sdEOH0992YZ0QSxgXNIGLq1ToUi.jpg",
    desc: "The Chamber of Secrets has been opened and students at Hogwarts are being petrified."
  },
  {
    id: 3,
    title: "Harry Potter and the Prisoner of Azkaban",
    year: "2004",
    director: "Alfonso Cuarón",
    image: "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_FMjpg_UX1000_.jpg",
    desc: "Sirius Black has escaped from Azkaban and Harry is forced to face his past."
  },
  {
    id: 4,
    title: "Harry Potter and the Goblet of Fire",
    year: "2005",
    director: "Mike Newell",
    image: "https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_FMjpg_UX1000_.jpg",
    desc: "The Triwizard Tournament begins and Voldemort returns."
  },
  {
    id: 5,
    title: "Harry Potter and the Order of the Phoenix",
    year: "2007",
    director: "David Yates",
    image: "https://m.media-amazon.com/images/M/MV5BMTM0NTczMTUzOV5BMl5BanBnXkFtZTYwMzIxNTg3._V1_FMjpg_UX1000_.jpg",
    desc: "The Ministry denies Voldemort's return; Dumbledore's Army is formed."
  },
  {
    id: 6,
    title: "Harry Potter and the Half-Blood Prince",
    year: "2009",
    director: "David Yates",
    image: "https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_FMjpg_UX1000_.jpg",
    desc: "Voldemort's past is explored and a great war is approaching."
  },
  {
    id: 7,
    title: "Harry Potter and the Deathly Hallows: Part 1",
    year: "2010",
    director: "David Yates",
    image: "https://m.media-amazon.com/images/M/MV5BMTQ2OTE1Mjk0N15BMl5BanBnXkFtZTcwODE3MDAwNA@@._V1_FMjpg_UX1000_.jpg",
    desc: "A dangerous journey away from Hogwarts in search of Horcruxes."
  },
  {
    id: 8,
    title: "Harry Potter and the Deathly Hallows: Part 2",
    year: "2011",
    director: "David Yates",
    image: "https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_FMjpg_UX1000_.jpg",
    desc: "The end of all things. The final duel between Harry and Voldemort."
  }
];

function Movies() {
  return (
    <div className="min-h-screen pt-32 px-6 font-harry pb-20 relative"style={{backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 20, 0.9), rgba(10, 10, 20, 0.95)), url(${bgImg})`,backgroundSize: 'cover',backgroundPosition: 'center',backgroundAttachment: 'fixed'}}>
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 text-slate-300 tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
        THE COMPLETE SERIES
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {MOVIE_DATA.map((movie) => (
          <div key={movie.id}className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">           
            <div className="h-[400px] w-full overflow-hidden relative">
              <img src={movie.image} alt={movie.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"/>
              <div className="absolute top-2 right-2 bg-black/70 px-3 py-1 rounded text-sm font-sans border border-white/20">
                {movie.year}
              </div>
            </div>
            <div className="p-5 relative z-10 bg-gradient-to-t from-black via-black/90 to-transparent -mt-20 pt-24 h-full">
              <h3 className="text-xl font-bold text-white leading-tight mb-2 drop-shadow-md">
                {movie.title}
              </h3>
              <p className="text-gray-400 text-xs font-sans mb-3 uppercase tracking-wider">
                Director: {movie.director}
              </p>
              <p className="text-gray-300 text-sm font-sans line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                {movie.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;