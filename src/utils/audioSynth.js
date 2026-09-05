// WEB AUDIO API SYNTHESIZER FOR INDIAN SWARAS & CULTURAL TONES
// Pure browser Web Audio API — zero dependencies

class SwaraSynth {
  constructor() {
    this.ctx = null;
    // Frequencies in Hz based on C4 (Madhya Saptak)
    this.swaraFrequencies = {
      'Sa': 261.63,   // C4
      'Re': 293.66,   // D4
      'Ga': 329.63,   // E4
      'Ma': 349.23,   // F4
      'Pa': 392.00,   // G4
      'Dha': 440.00,  // A4
      'Ni': 493.88,   // B4
      'Sa^': 523.25   // C5
    };
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playSwara(noteName, duration = 0.8) {
    try {
      this.init();
      if (!this.ctx) return;

      const freq = this.swaraFrequencies[noteName] || 261.63;
      const now = this.ctx.currentTime;

      // Primary tone oscillator
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Flute / Tanpura rich harmonic overtone oscillator
      const harmonicOsc = this.ctx.createOscillator();
      const harmonicGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      harmonicOsc.type = 'triangle';
      harmonicOsc.frequency.setValueAtTime(freq * 2, now);

      // Smooth envelope attack and decay
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.3, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      harmonicGain.gain.setValueAtTime(0.001, now);
      harmonicGain.gain.exponentialRampToValueAtTime(0.08, now + 0.06);
      harmonicGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.7);

      osc.connect(gain);
      harmonicOsc.connect(harmonicGain);

      gain.connect(this.ctx.destination);
      harmonicGain.connect(this.ctx.destination);

      osc.start(now);
      harmonicOsc.start(now);

      osc.stop(now + duration);
      harmonicOsc.stop(now + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }
}

export const swaraSynth = new SwaraSynth();
