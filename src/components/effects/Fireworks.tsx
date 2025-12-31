"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  brightness: number;
  alpha: number;
  decay: number;
  coordinates: [number, number][];

  constructor(x: number, y: number, hue: number) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 1;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.hue = hue + Math.random() * 40 - 20;
    this.brightness = Math.random() * 50 + 50;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.015;
    this.coordinates = [];

    // Initialize coordinates
    for (let i = 0; i < 5; i++) {
      this.coordinates.push([x, y]);
    }
  }

  update() {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05; // Gravity
    this.vx *= 0.95; // Friction
    this.vy *= 0.95; // Friction
    this.alpha -= this.decay;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(
      this.coordinates[this.coordinates.length - 1][0],
      this.coordinates[this.coordinates.length - 1][1]
    );
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
    ctx.stroke();
  }
}

class Firework {
  x: number;
  y: number;
  sx: number;
  sy: number;
  hue: number;
  brightness: number;
  alpha: number;
  dead: boolean;
  coordinates: [number, number][];

  constructor(sx: number, sy: number, tx: number, ty: number) {
    this.x = sx;
    this.y = sy;
    this.sx = sx;
    this.sy = sy;
    this.hue = Math.random() * 360;
    this.brightness = Math.random() * 50 + 50;
    this.alpha = 1;
    this.dead = false;
    this.coordinates = [];

    const angle = Math.atan2(ty - sy, tx - sx);
    const speed = 10;
    this.sx = Math.cos(angle) * speed;
    this.sy = Math.sin(angle) * speed;

    // Initialize coordinates
    for (let i = 0; i < 3; i++) {
      this.coordinates.push([sx, sy]);
    }
  }

  update(
    height: number,
    createParticles: (x: number, y: number, hue: number) => void
  ) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    this.x += this.sx;
    this.y += this.sy;

    this.sy += 0.05; // Gravity

    if (this.y < height * 0.2 || Math.random() < 0.01) {
      this.dead = true;
      createParticles(this.x, this.y, this.hue);
    } else if (this.y > height) {
      this.dead = true;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(
      this.coordinates[this.coordinates.length - 1][0],
      this.coordinates[this.coordinates.length - 1][1]
    );
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
    ctx.stroke();
  }
}

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const fireworks: Firework[] = [];

    function createParticles(x: number, y: number, hue: number) {
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, hue));
      }
    }

    function loop() {
      if (!ctx || !canvas) return;

      // Clear canvas completely each frame
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, width, height);

      ctx.globalCompositeOperation = "lighter";

      // Randomly launch fireworks
      if (Math.random() < 0.03) {
        const sx = Math.random() * width;
        const sy = height;
        // Constrain target x to be within a reasonable range of start x to avoid horizontal shots
        // Max horizontal deviation: 20% of screen width or 200px, whichever is smaller
        const maxDeviation = Math.min(width * 0.2, 200);
        const tx = sx + (Math.random() * 2 - 1) * maxDeviation;
        const ty = Math.random() * (height / 2);
        fireworks.push(new Firework(sx, sy, tx, ty));
      }

      // Update and draw fireworks
      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update(height, createParticles);
        fireworks[i].draw(ctx);
        if (fireworks[i].dead) {
          fireworks.splice(i, 1);
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].alpha <= 0.05) {
          // Kill particles sooner to avoid faint traces
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(loop);
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    const animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
