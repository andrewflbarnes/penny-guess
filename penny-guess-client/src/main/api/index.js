const ENDPOINTS = {
  HIGH_SCORES: './api/scores/high',
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
  }
}
