const API_BASE_URL = 'https://api.pennyguess.com/functions/aflb-pg-api/executions';
const endpoints = {
  highScores: `${API_BASE_URL}?type=score`,
  whatIs: `${API_BASE_URL}?type=what`
};

const api = {
  async getHighScores() {
    const response = await fetch(endpoints.highScores, {
      method: 'GET',
    });

    return response.json();
  },

  async addHighScore(user, score) {
    const response = await fetch(endpoints.highScores, {
      method: 'POST',
      body: JSON.stringify({
        user,
        score,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.json();
  },

  async getWhatIs() {
    const response = await fetch(endpoints.whatIs, {
      method: 'GET',
    });

    return response.json();
  }
};

export default api;
