import axios from 'axios';

const API_URL = 'https://api-nba-v1.p.rapidapi.com/players';

export const getNBATeamsPlayers = async (teamId, season) => {
  const options = {
    method: 'GET',
    url: API_URL,
    params: {
      team: teamId,
      season: season 
    },
    headers: {
      'x-rapidapi-key': '6296a4e58cmsh9a4e3b0b3a35dc6p1ee89ejsn37713818ea38',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  try {
    const response = await axios.request(options);
    console.log('Raw API Response:', response.data);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching NBA Players:", error);
    throw error;
  }
};
