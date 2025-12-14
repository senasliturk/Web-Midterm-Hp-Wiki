import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent p-8 font-harry">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold tracking-[0.15em] text-slate-300 hover:text-white transition-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          HOGWARTS WIKI 
        </Link>
        <div className="space-x-10 text-xl font-bold tracking-wide text-slate-300">
          <Link to="/" className="hover:text-white transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Home</Link>
          <Link to="/books" className="hover:text-white transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Books</Link>
          <Link to="/movies" className="hover:text-white transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Movies</Link>
          <Link to="/characters" className="hover:text-white transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Characters</Link>
          <Link to="/spells" className="hover:text-white transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Spells</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;