import React, { useRef, useEffect, useState } from 'react';
import { soundFX } from '../audio/soundFX';

export function WebCanvas() {
  const canvasRef = useRef(null);
  const [popups, setPopups] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const webs = [];
    let mouse = { x: canvas.width / 2, y: canvas.height / 2, active: false };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      soundFX.thwip();

      // Spawn web shockwave lines
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i;
        webs.push({
          x,
          y,
          dx: Math.cos(angle) * (4 + Math.random() * 4),
          dy: Math.sin(angle) * (4 + Math.random() * 4),
          length: 30 + Math.random() * 40,
          alpha: 1,
          life: 1
        });
      }

      // Add comic text popup
      const comicWords = ['THWIP!', 'BANG!', 'WEB-SHOT!', 'SPIDEY-SENSE!', 'ZAP!'];
      const text = comicWords[Math.floor(Math.random() * comicWords.length)];
      const id = Date.now() + Math.random();
      setPopups(prev => [...prev.slice(-4), { id, x, y, text }]);

      setTimeout(() => {
        setPopups(prev => prev.filter(p => p.id !== id));
      }, 1000);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle background spider web pattern
      ctx.strokeStyle = 'rgba(230, 36, 41, 0.08)';
      ctx.lineWidth = 1;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let r = 50; r < Math.max(canvas.width, canvas.height); r += 80) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 / 12) * i;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * canvas.width, centerY + Math.sin(angle) * canvas.height);
        ctx.stroke();
      }

      // Draw active click webs
      for (let i = webs.length - 1; i >= 0; i--) {
        const w = webs[i];
        ctx.beginPath();
        ctx.moveTo(w.x, w.y);
        ctx.lineTo(w.x + w.dx * 10, w.y + w.dy * 10);
        ctx.strokeStyle = `rgba(255, 255, 255, ${w.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        w.x += w.dx * 0.5;
        w.y += w.dy * 0.5;
        w.alpha -= 0.03;

        if (w.alpha <= 0) {
          webs.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-auto z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
      {popups.map(p => (
        <div
          key={p.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-yellow-300 font-black text-xl tracking-wider bungee-font animate-bounce comic-border bg-red-600 px-3 py-1 rounded shadow-2xl z-30"
          style={{ left: p.x, top: p.y }}
        >
          {p.text}
        </div>
      ))}
    </div>
  );
}
