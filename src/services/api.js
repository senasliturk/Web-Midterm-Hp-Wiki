import axios from 'axios';

const BASE_URL = 'https://hp-api.onrender.com/api';

export const fetchCharacters = async () => {
  const response = await axios.get(`${BASE_URL}/characters`);
  return response.data; 
};

export const fetchSpells = async () => {
  const response = await axios.get(`${BASE_URL}/spells`);
  return response.data;
};

export const fetchCharacterById = async (id) => {
  const response = await axios.get(`${BASE_URL}/character/${id}`);
  return response.data; 
};