// إظهار وإخفاء الحلول
const buttons = document.querySelectorAll(".toggle-btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const solution = document.getElementById(targetId);

    solution.classList.toggle("show");
    btn.textContent = solution.classList.contains("show")
      ? "إخفاء الحل"
      : "إظهار الحل";
  });
});

// تبديل الواجهة
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// خلفية متحركة على canvas
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let particleCount = 80;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.reset();
    this.y = Math.random() * canvas.height;
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 120;
    this.size = Math.random() * 2.2 + 0.6;
    this.speedY = Math.random() * 0.65 + 0.15;
    this.speedX = (Math.random() - 0.5) * 0.35;
    this.alpha = Math.random() * 0.6 + 0.15;
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
      this.reset();
      this.y = canvas.height + 20;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(160, 210, 255, ${this.alpha})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}
initParticles();

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 110) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(130, 180, 255, ${0.08 - dist / 2000})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  connectParticles();
  requestAnimationFrame(animate);
}

animate();
