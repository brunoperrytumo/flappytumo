// HighscoreService.js
export default class HighscoreService {
  constructor() {
    this.functionUrl =
      "https://ehhmqckxetsepnvcefvx.supabase.co/functions/v1/super-function";
    this.supabaseKey =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoaG1xY2t4ZXRzZXBudmNlZnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MjE4OTUsImV4cCI6MjA4ODM5Nzg5NX0.SLhe_PyRsxv_BYN4WcmjtoeY5F67Zun0boeXh2jmpFE"; // Same anon key as before
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
    for (let i = 0; i < 5; i++) {
      this.#buildScore(result.highscores[i]);
    }
    return result.highscores || [];
  }

  #buildScore(score = null) {
    const scoresElem = document.querySelector(".scores");
    const leftCol = scoresElem.querySelector(".left");
    const rightCol = scoresElem.querySelector(".right");
    let pElem = document.createElement("p");
    if (!score) pElem.className = "no-score";
    pElem.innerText = score?.name || "---";
    leftCol.appendChild(pElem);
    pElem = document.createElement("p");
    if (!score) pElem.className = "no-score";
    pElem.innerText = score?.score || "---";
    rightCol.appendChild(pElem);
  }

  async submitScore(playerName, score) {
    const result = await this.callFunction("SUBMIT_SCORE", { playerName, score });
    return result;
  }

  async wouldMakeLeaderboard(score) {
    const result = await this.callFunction("CHECK_QUALIFIES", { score });
    return result.qualifies;
  }
}
