// Simple synthesizer for retro UI sounds
// Uses Web Audio API to avoid external assets

let audioContext: AudioContext | null = null;

const initAudio = () => {
  if (!audioContext) {
    // @ts-ignore - Safari fallback
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioContext = new AudioContext();
    }
  }
  
  // Try to resume if suspended, but handle the promise to avoid unhandled rejections
  if (audioContext?.state === 'suspended') {
    audioContext.resume().catch(() => {
      // Intentionally ignore auto-play policy errors here.
      // The context will remain suspended until a user gesture.
    });
  }
  return audioContext;
};

export const playSound = (type: 'type' | 'click' | 'hover' | 'boot' | 'success' | 'error') => {
  const ctx = initAudio();
  if (!ctx) return;

  // If context is suspended (due to autoplay policy), we can't play sound yet.
  if (ctx.state === 'suspended') return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  const now = ctx.currentTime;

  switch (type) {
    case 'type':
      // Short high tick
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(800, now);
      oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.03);
      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      oscillator.start(now);
      oscillator.stop(now + 0.03);
      break;

    case 'click':
      // Deeper mechanical click
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(300, now);
      oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.05);
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      oscillator.start(now);
      oscillator.stop(now + 0.05);
      break;
      
    case 'hover':
      // Subtle chirp
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(400, now);
      oscillator.frequency.linearRampToValueAtTime(450, now + 0.02);
      gainNode.gain.setValueAtTime(0.02, now);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.02);
      oscillator.start(now);
      oscillator.stop(now + 0.02);
      break;

    case 'boot':
      // Low hum sweep
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(50, now);
      oscillator.frequency.linearRampToValueAtTime(100, now + 1);
      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.linearRampToValueAtTime(0, now + 1);
      oscillator.start(now);
      oscillator.stop(now + 1);
      break;
      
    case 'success':
      // Positive chime
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(440, now);
      oscillator.frequency.setValueAtTime(880, now + 0.1);
      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      oscillator.start(now);
      oscillator.stop(now + 0.4);
      break;
      
    case 'error':
      // Low buzz
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(100, now);
      oscillator.frequency.linearRampToValueAtTime(50, now + 0.3);
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
      oscillator.start(now);
      oscillator.stop(now + 0.3);
      break;
  }
};