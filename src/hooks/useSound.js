import { useState, useEffect, useRef } from 'react';

const useSound = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioContext, setAudioContext] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize audio context on first user interaction
  const initializeAudio = () => {
    if (!isInitialized && typeof window !== 'undefined') {
      try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(context);
        setIsInitialized(true);
        
        // Resume context if it was suspended
        if (context.state === 'suspended') {
          context.resume();
        }
      } catch (error) {
        console.warn('Audio context initialization failed:', error);
      }
    }
  };

  // Create audio context for sound effects
  const playSound = (type) => {
    if (!soundEnabled || !isInitialized) return;

    try {
      const ctx = audioContext || new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Different sound types with enhanced effects
      switch(type) {
        case 'coin':
          oscillator.frequency.setValueAtTime(800, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.1);
          break;
          
        case 'battle':
          oscillator.frequency.setValueAtTime(200, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.2);
          break;
          
        case 'victory':
          oscillator.frequency.setValueAtTime(400, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
          gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.3);
          break;
          
        case 'defeat':
          oscillator.frequency.setValueAtTime(300, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.2);
          break;
          
        case 'click':
          oscillator.frequency.setValueAtTime(600, ctx.currentTime);
          gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.05);
          break;
          
        case 'achievement':
          oscillator.frequency.setValueAtTime(500, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.2);
          oscillator.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.4);
          gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.4);
          break;

        case 'levelup':
          oscillator.frequency.setValueAtTime(400, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
          oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.2);
          oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.3);
          gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.3);
          break;

        case 'trade':
          oscillator.frequency.setValueAtTime(700, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.1);
          break;

        case 'guild':
          oscillator.frequency.setValueAtTime(300, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.15);
          oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.3);
          gainNode.gain.setValueAtTime(0.35, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.3);
          break;
          
        default:
          break;
      }
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  // Auto-initialize on first user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      initializeAudio();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  return { playSound, soundEnabled, toggleSound, isInitialized, initializeAudio };
};

export default useSound;
