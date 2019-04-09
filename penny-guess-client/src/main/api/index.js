const ENDPOINTS = {
  HIGH_SCORES: './api/scores/high',
  WHAT_IS: './api/whatis',
};

export default {
  async getHighScores() {
    const response = await fetch(ENDPOINTS.HIGH_SCORES, {
      method: 'GET',
    });

    return response.json();
  },

  async addHighScore({name, score}) {
    const response = await fetch(ENDPOINTS.HIGH_SCORES, {
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
    const response = await fetch(ENDPOINTS.WHAT_IS, {
      method: 'GET',
    });

    return response.json();
  }
}
