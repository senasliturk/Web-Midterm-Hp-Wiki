import { useState } from 'react';

import bgImg from '../assets/trenke.jpg'; 

const BOOK_DATA = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    year: "1997",
    pages: "223",
    image: "https://m.media-amazon.com/images/I/81YOuOGFCJL._AC_UF1000,1000_QL80_.jpg",
    desc: "Harry Potter thinks he is an ordinary boy until he is rescued by a giant beetle-eyed man, enrolls at Hogwarts, and learns the truth about his past."
  },
  {
    id: 2,
    title: "Harry Potter and the Chamber of Secrets",
    year: "1998",
    pages: "251",
    image: "https://m.media-amazon.com/images/I/81S0LnPGGUL._AC_UF1000,1000_QL80_.jpg",
    desc: "Harry returns to Hogwarts for his second year, but the school is plagued by attacks that leave students petrified. The Chamber of Secrets has been opened."
  },
  {
    id: 3,
    title: "Harry Potter and the Prisoner of Azkaban",
    year: "1999",
    pages: "317",
    image: "https://m.media-amazon.com/images/I/81lAPl9Fl0L._AC_UF1000,1000_QL80_.jpg",
    desc: "Sirius Black, a mass murderer, has escaped from the wizarding prison of Azkaban, and everyone says he is coming after Harry."
  },
  {
    id: 4,
    title: "Harry Potter and the Goblet of Fire",
    year: "2000",
    pages: "636",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b6/Harry_Potter_and_the_Goblet_of_Fire_cover.png",
    desc: "Harry finds himself competing in the hazardous Triwizard Tournament between rival schools of magic, while Voldemort gains power."
  },
  {
    id: 5,
    title: "Harry Potter and the Order of the Phoenix",
    year: "2003",
    pages: "766",
    image: "https://upload.wikimedia.org/wikipedia/en/7/70/Harry_Potter_and_the_Order_of_the_Phoenix.jpg",
    desc: "Harry discovers that much of the wizarding community has been denied the truth about his recent encounter with the evil Lord Voldemort."
  },
  {
    id: 6,
    title: "Harry Potter and the Half-Blood Prince",
    year: "2005",
    pages: "607",
    image: "https://covers.openlibrary.org/b/isbn/9781408855706-L.jpg",
    desc: "As Voldemort's grip on both the Muggle and wizarding worlds tightens, Dumbledore prepares Harry for the final battle that he knows is fast approaching."
  },
  {
    id: 7,
    title: "Harry Potter and the Deathly Hallows",
    year: "2007",
    pages: "607",
    image: "https://m.media-amazon.com/images/I/81Whkax7IGL._AC_UF1000,1000_QL80_.jpg",
    desc: "Harry has been burdened with a dark, dangerous and seemingly impossible task: that of locating and destroying Voldemort's remaining Horcruxes."
  }
];

function Books() {
  return (
    <div className="min-h-screen pt-32 px-6 font-harry pb-20 relative"style={{backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 20, 0.9), rgba(10, 10, 20, 0.95)), url(${bgImg})`,backgroundSize: 'cover',backgroundPosition: 'center',backgroundAttachment: 'fixed'}}>
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 text-slate-300 tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
        THE ORIGINAL SERIES
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {BOOK_DATA.map((book) => (
          <div key={book.id} className="group relative bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <div className="h-[450px] w-full overflow-hidden relative bg-[#2a2a2a]">
              <img src={book.image} alt={book.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"/>
              <div className="absolute top-2 right-2 bg-yellow-600/90 text-black px-3 py-1 rounded-full text-xs font-bold font-sans shadow-lg">
                {book.year}
              </div>
            </div>

            <div className="p-6 relative z-10 bg-gradient-to-t from-[#121212] via-[#121212] to-transparent -mt-16 pt-20">
              <h3 className="text-xl font-bold text-gray-100 leading-tight mb-2 drop-shadow-md font-serif">
                {book.title}
              </h3>
              <div className="flex justify-between items-center mb-3">
                <span className="text-yellow-500/80 text-xs font-sans uppercase tracking-wider">
                  J.K. Rowling
                </span>
                <span className="text-gray-500 text-xs font-sans">
                  {book.pages} Pages
                </span>
              </div>
              <p className="text-gray-400 text-sm font-sans line-clamp-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 border-t border-white/10 pt-3">
                {book.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;