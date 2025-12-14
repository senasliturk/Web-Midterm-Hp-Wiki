import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { fetchSpells } from '../services/api';
import frontCoverImg from '../assets/bookon.jpg';
import backCoverImg from '../assets/bookarka.jpg';
import bgVideo from '../assets/videoke.mp4';
import indexImg from '../assets/spels.jpg';
import daImg from '../assets/army.jpg';

const Page = React.forwardRef((props, ref) => {
  const isFull = props.full;

  return (
    <div
      ref={ref}
      className={`demoPage h-full w-full relative ${
        isFull
          ? 'p-0 bg-[#fdf6e3]'
          : 'bg-[#fdf6e3] text-gray-800 border-l border-gray-300 shadow-inner p-8'
      }`}
    >
      {!isFull && props.number && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 font-sans text-xs">
          - {props.number} -
        </div>
      )}

      {isFull ? (
        props.children
      ) : (
        <div className="h-full border-2 border-double border-[#d4c5a0] p-4 relative overflow-y-auto">
          {props.children}
        </div>
      )}
    </div>
  );
});

const Cover = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage h-full w-full relative bg-[#3d2b1f]" ref={ref}>
      <img src={frontCoverImg}alt="Front Cover"className="absolute top-0 left-0 w-full h-full object-fill z-0"/>
      <div className="absolute top-0 right-0 h-full w-24 z-20 flex items-center justify-center cursor-pointer group"onClick={props.onOpen}title="Open Book">
        <div className="text-6xl text-[#d4af37] opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 animate-pulse drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">
          ➾
        </div>
      </div>
    </div>
  );
});

const LeftCover = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage h-full w-full relative bg-[#3d2b1f]" ref={ref}>
      <img src={frontCoverImg}alt="Inner Cover"className="absolute top-0 left-0 w-full h-full object-fill z-0"/>
      <div className="absolute top-0 left-0 h-full w-24 z-20 flex items-center justify-center cursor-pointer group"onClick={props.onClose}title="Close Book">
        <div className="text-6xl text-[#d4af37] opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 animate-pulse drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] transform rotate-180">
          ➾
        </div>
      </div>
    </div>
  );
});

const BackCover = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage h-full w-full relative bg-[#3d2b1f]" ref={ref}>
      <img src={backCoverImg}alt="Back Cover"className="absolute top-0 left-0 w-full h-full object-fill z-0"/>
      <div className="absolute top-0 left-0 h-full w-24 z-20 flex items-center justify-center cursor-pointer group"onClick={props.onClose}title="Close Book">
        <div className="text-6xl text-[#d4af37] opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 animate-pulse drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] transform rotate-180">
          ➾
        </div>
      </div>
    </div>
  );
});

function Spells() {
  const [spells, setSpells] = useState([]);
  const [loading, setLoading] = useState(true);
  const bookRef = useRef();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchSpells();
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
      setSpells(sortedData);
      setLoading(false);
    };
    getData();
  }, []);

  const nextBtn = () => {
    if (bookRef.current) bookRef.current.pageFlip().flipNext();
  };

  const prevBtn = () => {
    if (bookRef.current) bookRef.current.pageFlip().flipPrev();
  };

  const closeBook = () => {
    if (bookRef.current) bookRef.current.pageFlip().flip(0);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50">
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="text-2xl font-harry text-white animate-pulse tracking-widest relative z-10">
          Summoning the Book... 
        </div>
      </div>
    );

  return (
    <div className="min-h-screen relative overflow-hidden font-harry flex items-center justify-center pt-24 pb-10">
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0"></div>

      <div className="relative z-10">
        <HTMLFlipBook
          width={400}
          height={600}
          size="stretch"
          minWidth={300}
          maxWidth={500}
          minHeight={400}
          maxHeight={700}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          usePortrait={false}
          className="shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          ref={bookRef}
          style={{ backgroundColor: 'transparent' }}
        >
          <Cover onOpen={nextBtn} />
          <LeftCover onClose={closeBook} />

          <Page number={1} full>
            <div className="absolute inset-0">
              <img src={indexImg}alt="Wizarding Spells Poster"className="w-full h-full object-cover"draggable={false}/>
            </div>

            <div className="absolute bottom-6 right-6 z-10">
              <button onClick={nextBtn}className="text-3xl text-[#8b0000] hover:scale-125 transition-transform"title="Next page">
                ➠
              </button>
            </div>
          </Page>

          <Page number={2} full>
            <div className="absolute inset-0">
              <img src={daImg}alt="Dumbledore's Army"className="w-full h-full object-cover"draggable={false}/>
            </div>

            <div className="absolute bottom-6 left-6 z-10">
              <button onClick={prevBtn}className="text-3xl text-[#8b0000] hover:scale-125 transition-transform"title="Previous page">
                ⟵
              </button>
            </div>

            <div className="absolute bottom-6 right-6 z-10">
              <button onClick={nextBtn}className="text-3xl text-[#8b0000] hover:scale-125 transition-transform"title="Next page">
                ➠
              </button>
            </div>
          </Page>

          {spells.map((spell, index) => (
            <Page key={spell.id} number={index + 3}>
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h2 className="text-4xl text-center mb-6 text-[#2a1a1f] border-b border-[#2a1a1f]/30 pb-4">
                    {spell.name}
                  </h2>
                  <div className="font-sans text-lg leading-relaxed text-gray-800">
                    <p className="mb-4">
                      <strong className="text-[#8b0000]">Effect:</strong>
                      <br />
                      {spell.description || 'Unknown magic.'}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-end mt-4">
                  <button onClick={prevBtn} className="text-2xl text-[#8b0000] hover:scale-125 transition-transform p-2">
                    ☜ Prev
                  </button>
                  <button onClick={nextBtn} className="text-2xl text-[#8b0000] hover:scale-125 transition-transform p-2">
                    Next ☞
                  </button>
                </div>
              </div>
            </Page>
          ))}

          <BackCover onClose={closeBook} />
        </HTMLFlipBook>
      </div>
    </div>
  );
}

export default Spells;
