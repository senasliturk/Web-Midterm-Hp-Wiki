import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchCharacters } from '../services/api';
import ErrorAlert from '../components/ErrorAlert';
import trenBg from '../assets/trenke.jpg';
import sortingHatImg from '../assets/sapka.jpg'; 
import gryffindorDefault from '../assets/gryffindorstudent.jpg';
import slytherinDefault from '../assets/slytherinstudent.jpg';
import ravenclawDefault from '../assets/ravenstudent.jpg';
import hufflepuffDefault from '../assets/hufflepufstudent.jpg'; 
import dumbledoreImg from '../assets/Dumbledore.webp';
import lilyImg from '../assets/Lily_Potter1.webp';
import jamesImg from '../assets/James_Potter.webp';
import mollyImg from '../assets/Molly_Weasley.webp'; 
import pettigrewImg from '../assets/Pettigrew_DH1.webp';
import dobbyImg from '../assets/dobby.jpg';

const CUSTOM_IMAGES = {
  "Albus Dumbledore": dumbledoreImg,
  "Lily Potter": lilyImg,
  "James Potter": jamesImg,
  "Molly Weasley": mollyImg,
  "Peter Pettigrew": pettigrewImg,
  "Dobby": dobbyImg 
};

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedHouse = searchParams.get('house'); 

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const allData = await fetchCharacters();
      
      if (!allData || allData.length === 0) {
        throw new Error("No wizards found. The API might be down.");
      }

      const uniqueData = allData.filter((char, index, self) =>index === self.findIndex((t) => (t.name === char.name)));

      setCharacters(uniqueData);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch wizard data. Please check your internet connection or try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {getData();},[]);

  const filteredCharacters = characters.filter(char => {
    const matchesHouse = selectedHouse ? char.house === selectedHouse : true;
    const matchesSearch = char.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesHouse && matchesSearch;
  });

  const getImage = (char) => {
    if (CUSTOM_IMAGES[char.name]) return CUSTOM_IMAGES[char.name];
    if (char.image) return char.image;
    switch(char.house) {
      case 'Gryffindor': return gryffindorDefault;
      case 'Slytherin': return slytherinDefault;
      case 'Ravenclaw': return ravenclawDefault;
      case 'Hufflepuff': return hufflepuffDefault;
      default: return sortingHatImg; 
    }
  };

  const getHouseColor = (house) => {
    switch(house) {
      case 'Gryffindor': return 'text-red-500 border-red-500/50 hover:shadow-red-500/20';
      case 'Slytherin': return 'text-green-500 border-green-500/50 hover:shadow-green-500/20';
      case 'Ravenclaw': return 'text-blue-400 border-blue-500/50 hover:shadow-blue-500/20';
      case 'Hufflepuff': return 'text-yellow-500 border-yellow-500/50 hover:shadow-yellow-500/20';
      default: return 'text-gray-400 border-gray-500/50 hover:shadow-gray-500/20'; 
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-2xl font-harry text-white animate-pulse tracking-widest">Loading Magic...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <ErrorAlert message={error} onRetry={getData} />
    </div>
  );

  return (
    <div className="min-h-screen pt-32 px-6 font-harry pb-20 relative"style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${trenBg})`,backgroundSize: 'cover',backgroundPosition: 'center',backgroundAttachment: 'fixed'}}>
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h2 className={`text-4xl md:text-6xl font-bold mb-8 drop-shadow-lg tracking-widest ${selectedHouse ? getHouseColor(selectedHouse).split(' ')[0] : 'text-slate-300'}`}>
          {selectedHouse ? `${selectedHouse.toUpperCase()} MEMBERS` : 'ALL WIZARDS'}
        </h2>
        <div className="relative max-w-md mx-auto">
          <input type="text"placeholder="Search by name ..."value={searchTerm}onChange={(e) => setSearchTerm(e.target.value)}className="w-full bg-gray-900/80 border border-white/20 text-white px-5 py-3 rounded-full focus:outline-none focus:border-yellow-500 transition-colors shadow-xl font-sans"/>
          <span className="absolute right-4 top-3 text-2xl">🔍</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
        {filteredCharacters.map((char) => (
          <div key={char.id}onClick={() => navigate(`/characters/${char.id}`)}className={`relative bg-gray-900/60 rounded-2xl overflow-hidden backdrop-blur-md border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer ${getHouseColor(char.house)}`}>
            <div className="h-72 w-full overflow-hidden bg-black/20 flex items-center justify-center p-0">
              <img src={getImage(char)}alt={char.name}className={`w-full h-full ${char.image || CUSTOM_IMAGES[char.name] ? 'object-cover' : 'object-contain p-6 opacity-70'} group-hover:opacity-100 transition-opacity duration-500`}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = sortingHatImg; 
                  e.target.className = "w-full h-full object-contain p-6 opacity-70";
                }}
              />
            </div>
            <div className="p-5 text-center bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent absolute bottom-0 w-full pt-12">
              <h3 className="text-xl font-bold text-white drop-shadow-md tracking-wide mb-1">{char.name}</h3>
              <div className="flex flex-col gap-1 text-xs font-sans text-gray-400">
                <span className="opacity-80">{char.house || "Unknown House"}</span>
                {char.wand && char.wand.core && (
                  <span className="italic text-gray-500">Wand: {char.wand.wood}</span>
                )}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity text-white/50">Click for Details</div>
            </div>
          </div>
        ))}
      </div>

      {filteredCharacters.length === 0 && (
        <div className="text-center text-gray-400 text-xl mt-10 font-sans">No results for "{searchTerm}".</div>
      )}
    </div>
  );
}
export default Characters;