export default class AudioPlayer {
  static #context = new (window.AudioContext || window.webkitAudioContext)();
  static #buffers = new Map();

  /**
   * Loads multiple audio files into memory.
   * @param {Object} files - Key-value pairs of { name: url }
   */
  static async load(files) {
    const loadTasks = Object.entries(files).map(async ([name, url]) => {
      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.#context.decodeAudioData(arrayBuffer);
        this.#buffers.set(name, audioBuffer);
      } catch (err) {
        console.error(`Failed to load audio "${name}" from ${url}:`, err);
      }
    });

    await Promise.all(loadTasks);
  }

  /**
   * Plays a loaded sound by name.
   * @param {string} name - The key used during loading.
   * @param {boolean} loop - Whether the sound should loop.
   */
  static play(name, loop = false) {
    const buffer = this.#buffers.get(name);

    if (!buffer) {
      console.warn(`Audio "${name}" not found. Did you load it?`);
      return;
    }

    // Resume context if it was suspended (browser autoplay policy)
    if (this.#context.state === "suspended") {
      this.#context.resume();
    }

    const source = this.#context.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;
    source.connect(this.#context.destination);
    source.start(0);

    return source; // Returns source so you can call .stop() later
  }

  /**
   * Checks if a specific audio key is loaded.
   */
  static isLoaded(name) {
    return this.#buffers.has(name);
  }
}
