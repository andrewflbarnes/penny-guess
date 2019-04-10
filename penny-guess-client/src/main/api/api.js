const endpoints = {
  highScores: './api/scores/high',
  whatIs: './api/whatis',
};

const api = {
  async getHighScores() {
    const response = await fetch(endpoints.highScores, {
      method: 'GET',
    });

    return response.json();
  },

  async addHighScore({name, score}) {
    const response = await fetch(endpoints.highScores, {
      method: 'POST',
      body: JSON.stringify({
        name,
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
