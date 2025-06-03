// src/service/StandingsService.js
import axios from 'axios';

const API_URL = 'https://api-nba-v1.p.rapidapi.com/standings';

export const getNBAStandings = async (season = '2021', league = 'standard') => {
  const options = {
    method: 'GET',
    url: API_URL,
    params: {
      league: league,
      season: season,
    },
    headers: {
      'x-rapidapi-key': '6296a4e58cmsh9a4e3b0b3a35dc6p1ee89ejsn37713818ea38',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.request(options);
    console.log('Standings API Response:', response.data);
    return response.data.response || [];
  } catch (error) {
    console.error('Error fetching NBA Standings:', error);
    throw error;
  }
};
