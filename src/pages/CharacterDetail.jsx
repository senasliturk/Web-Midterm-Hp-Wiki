import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCharacterById } from '../services/api';
import sortingHatImg from '../assets/sapka.jpg';
import dumbledoreImg from '../assets/Dumbledore.webp';
import lilyImg from '../assets/Lily_Potter1.webp';
import jamesImg from '../assets/James_Potter.webp';
import mollyImg from '../assets/Molly_Weasley.webp';
import pettigrewImg from '../assets/Pettigrew_DH1.webp';
import dobbyImg from '../assets/dobby.jpg';
import gryffindorImg from '../assets/gryffindorstudent.jpg';
import slytherinImg from '../assets/slytherinstudent.jpg';
import ravenclawImg from '../assets/ravenstudent.jpg';
import hufflepuffImg from '../assets/hufflepufstudent.jpg';

const CUSTOM_IMAGES = {
  "Albus Dumbledore": dumbledoreImg,
  "Lily Potter": lilyImg,
  "James Potter": jamesImg,
  "Molly Weasley": mollyImg,
  "Peter Pettigrew": pettigrewImg,
  "Dobby": dobbyImg
};

function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        if (typeof fetchCharacterById !== 'function') {
           throw new Error("We can not find a api files.Please Check");
        }

        const data = await fetchCharacterById(id);
        
        if (data && data.length > 0) {
          setCharacter(data[0]);
        } else {
          setError("Empty characters data.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  const getImage = (char) => {
    if (!char) return sortingHatImg;
    if (CUSTOM_IMAGES[char.name]) return CUSTOM_IMAGES[char.name];
    if (char.image) return char.image;
    switch(char.house) {
        case 'Gryffindor': return gryffindorImg;
        case 'Slytherin': return slytherinImg;
        case 'Ravenclaw': return ravenclawImg;
        case 'Hufflepuff': return hufflepuffImg;
        default: return sortingHatImg;
    }
  };

  const getHouseColor = (house) => {
    switch(house) {
      case 'Gryffindor': return 'text-red-500 border-red-500';
      case 'Slytherin': return 'text-green-500 border-green-500';
      case 'Ravenclaw': return 'text-blue-400 border-blue-500';
      case 'Hufflepuff': return 'text-yellow-500 border-yellow-500';
      default: return 'text-gray-400 border-gray-500';
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white font-harry animate-pulse text-2xl">
      Revelio...
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-red-400 font-sans p-4 text-center">
      <h2 className="text-3xl font-bold mb-2">Somethings go wrong</h2>
      <p className="mb-6 text-white">{error}</p>
      <button onClick={() => navigate('/characters')} className="px-6 py-2 border border-white/30 rounded hover:bg-white/10 transition text-white">
        Return
      </button>
    </div>
  );

  if (!character) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex items-center justify-center p-6 pt-24 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-full opacity-20 bg-center bg-cover blur-sm z-0 pointer-events-none`}
             style={{ backgroundImage: `url(${getImage(character)})` }}>
        </div>

        <div className="max-w-4xl w-full bg-black/60 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl p-8 z-10 flex flex-col md:flex-row gap-10">
            <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className={`w-64 h-80 rounded-2xl overflow-hidden border-4 shadow-2xl ${getHouseColor(character.house)}`}>
                    <img src={getImage(character)}alt={character.name}className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"/>
                </div>
                <div className={`text-center mt-4 font-harry text-2xl tracking-widest ${getHouseColor(character.house).split(' ')[0]}`}>
                    {character.house || "Unknown"}
                </div>
            </div>
            <div className="flex-grow flex flex-col justify-center">
                <h1 className="text-5xl font-harry mb-2 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    {character.name}
                </h1>
                
                {character.alternate_names && character.alternate_names.length > 0 && (
                    <p className="text-gray-400 italic mb-6 text-sm">
                        Also known as: {character.alternate_names.join(", ")}
                    </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
                    <InfoItem label="Species" value={character.species}/>
                    <InfoItem label="Gender" value={character.gender}/>
                    <InfoItem label="Date of Birth" value={character.dateOfBirth}/>
                    <InfoItem label="Ancestry" value={character.ancestry}/>
                    <InfoItem label="Eye Colour" value={character.eyeColour}/>
                    <InfoItem label="Hair Colour" value={character.hairColour} />
                    <InfoItem label="Patronus" value={character.patronus}/>
                    <InfoItem label="Wand" value={character.wand?.wood ? `${character.wand.wood}, ${character.wand.core}` : "Unknown"}/>
                    <InfoItem label="Actor" value={character.actor} />
                    <InfoItem label="Alive" value={character.alive ? "Yes" : "No "}/>
                </div>

                <div className="mt-8">
                    <button onClick={() => navigate(-1)}className="px-6 py-2 bg-white/10 border border-white/30 rounded-lg hover:bg-white/20 transition-all font-bold backdrop-blur-sm">
                        ← Back to List
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

const InfoItem = ({ label, value, icon }) => (
    <div className="bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
        <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">{icon} {label}</span>
        <span className="text-white font-medium capitalize">{value || "Unknown"}</span>
    </div>
);

export default CharacterDetail;