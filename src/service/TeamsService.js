import axios from 'axios';

const API_URL = 'https://api-nba-v1.p.rapidapi.com/teams';

const options = {
  method: 'GET',
  url: API_URL,
  headers: {
    'x-rapidapi-key': '6296a4e58cmsh9a4e3b0b3a35dc6p1ee89ejsn37713818ea38',
    'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
  }
};

export const getNBATeams = async () => {
  try {
    const response = await axios.request(options);
    console.log('Raw API Response:', response.data);
    
    // Filter hanya tim NBA franchise yang memiliki logo
    const nbaTeams = response.data.response.filter(team => 
      team.nbaFranchise === true && 
      team.logo && 
      team.logo.trim() !== ''
    );
    
    console.log(`Found ${nbaTeams.length} NBA teams with logos`);
    // Log beberapa contoh logo URL untuk debugging
    if (nbaTeams.length > 0) {
      console.log('Sample logo URLs:', nbaTeams.slice(0, 3).map(t => ({ name: t.name, logo: t.logo })));
    }
    
    return { response: nbaTeams };
  } catch (error) {
    console.error("Error fetching NBA Teams:", error);
    throw error;
  }
};
