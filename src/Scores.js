export default class Scores {
  state = "scores";

  #element;
  constructor() {
    this.#element = document.querySelector("#scores");

    this.functionUrl =
      "https://ehhmqckxetsepnvcefvx.supabase.co/functions/v1/super-function";
    this.supabaseKey =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoaG1xY2t4ZXRzZXBudmNlZnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MjE4OTUsImV4cCI6MjA4ODM5Nzg5NX0.SLhe_PyRsxv_BYN4WcmjtoeY5F67Zun0boeXh2jmpFE"; // Same anon key as before

    document.querySelector("#back-button").onclick = () =>
      (this.state = "menu");
  }

  async init() {
    await this.getHighscores();
  }

  reset() {
    this.state = "scores";
  }

  async callFunction(action, data = {}) {
    try {
      const response = await fetch(this.functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.supabaseKey,
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

  async getHighscores() {
    const result = await this.callFunction({ action: "GET_HIGHSCORES" });
    const tbody = this.#element.querySelector("tbody");
    for (let i = 0; i < result.highscores.length; i++) {
      const r = result.highscores[i];

      const tr = document.createElement("tr");
      const tdName = document.createElement("td");
      tdName.innerText = r.name;
      tr.appendChild(tdName);

      const tdScore = document.createElement("td");
      tdScore.innerText = r.score;
      tr.appendChild(tdScore);

      tbody.appendChild(tr);
    }
  }
  async submitScore(playerName, score) {
    const result = await this.callFunction("SUBMIT_SCORE", {
      playerName,
      score,
    });
    return result;
  }

  show() {
    this.#element.style.display = "flex";
  }

  hide() {
    this.#element.style.display = "none";
    this.reset();
  }
}
