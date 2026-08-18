import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/audio';

interface SpideyCornerSpriteProps {
  className?: string;
  onClick?: () => void;
}

export function SpideyCornerSprite({ className = '', onClick }: SpideyCornerSpriteProps) {
  const [isClicked, setIsClicked] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const FRAME_COUNT = 76;
  const FRAME_WIDTH = 74;
  const FRAME_HEIGHT = 119;
  const DISPLAY_WIDTH = 46;
  const DISPLAY_HEIGHT = 74;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Crisp pixel rendering without blurring
    ctx.imageSmoothingEnabled = false;

    const img = new Image();
    img.src = '/SpiderMan_HeadTurn.png';

    let animFrameId: number;
    let currentFrame = 0;
    let lastTime = performance.now();
    const frameDuration = 55; // ~18 fps for silky smooth 76-frame head turn

    img.onload = () => {
      setImageLoaded(true);

      const render = (time: number) => {
        if (time - lastTime >= frameDuration) {
          currentFrame = (currentFrame + 1) % FRAME_COUNT;
          lastTime = time;

          ctx.clearRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
          const srcX = currentFrame * FRAME_WIDTH;

          ctx.drawImage(
            img,
            srcX,
            0,
            FRAME_WIDTH,
            FRAME_HEIGHT,
            0,
            0,
            DISPLAY_WIDTH,
            DISPLAY_HEIGHT
          );
        }
        animFrameId = requestAnimationFrame(render);
      };

      animFrameId = requestAnimationFrame(render);
    };

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  const handleClick = () => {
    sound.playBlip(1050);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 350);
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      title="Spider-Man (Click to Poke)"
      className={`relative cursor-pointer select-none transition-transform duration-100 flex items-end justify-center ${
        isClicked ? 'scale-125 -translate-y-1' : 'hover:scale-110'
      } ${className}`}
      id="spidey-corner-spritesheet-mascot"
    >
      <div className="relative drop-shadow-[2px_2px_0_rgba(0,0,0,0.85)]">
        {/* Canvas Renderer for direct frame-by-frame playback from SpiderMan_HeadTurn.png */}
        <canvas
          ref={canvasRef}
          width={DISPLAY_WIDTH}
          height={DISPLAY_HEIGHT}
          className="w-[44px] h-[71px] sm:w-[48px] sm:h-[77px] block"
          style={{ imageRendering: 'pixelated' }}
        />

        {/* Fallback CSS spritesheet if canvas is loading */}
        {!imageLoaded && (
          <div className="w-[44px] h-[71px] overflow-hidden relative flex items-center justify-center">
            <div
              className="spidey-headturn-real-sprite transform scale-[0.6] origin-top-left"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </div>
  );
}
