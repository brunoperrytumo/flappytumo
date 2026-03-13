// HighscoreService.js
export default class HighscoreService {
  constructor() {
    this.functionUrl =
      "https://ehhmqckxetsepnvcefvx.supabase.co/functions/v1/super-function";
    this.supabaseKey =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoaG1xY2t4ZXRzZXBudmNlZnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MjE4OTUsImV4cCI6MjA4ODM5Nzg5NX0.SLhe_PyRsxv_BYN4WcmjtoeY5F67Zun0boeXh2jmpFE";
  }

  async callFunction(action, data = {}) {
    try {
      const response = await fetch(this.functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.supabaseKey,
        },
        body: JSON.stringify(action),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Request failed");
      }

      return result;
    } catch (error) {
      console.error("Error calling highscores function:", error);
      throw error;
    }
  }

  async testing() {
    const result = await this.callFunction({ action: "TESTING" });
    return result || [];
  }

  async getHighscores() {
    const result = await this.callFunction({ action: "GET_HIGHSCORES" });

    return result.highscores || [];
  }

  async submitScore(playerName, score) {
    const result = await this.callFunction({
      action: "SUBMIT_SCORE",
      playerName: playerName,
      score: score,
    });
    return result;
  }
}
