window.onload = () => {
  const loadingText = document.querySelector(".loading-text");
  const progressBar = document.querySelector(".progress");
  const percentText = document.querySelector(".loading-percent");
  const loadingScreen = document.getElementById("loading-screen");
  const homeScreen = document.getElementById("home-screen");

  const messages = [
    "Initializing Shinobi Database...",
    "Loading Chakra Network...",
    "Loading Villages...",
    "Loading Characters...",
    "Loading Lore...",
    "Loading Missions...",
    "Loading World..."
  ];

  let progress = 0;
  let msgIndex = 0;

  const interval = setInterval(() => {
    progress += 5;
    progressBar.style.width = progress + "%";
    percentText.textContent = progress + "%";

    if (progress % 20 === 0 && msgIndex < messages.length) {
      loadingText.textContent = messages[msgIndex];
      msgIndex++;
    }

    if (progress >= 100) {
      clearInterval(interval);
      gsap.to(loadingScreen, { opacity: 0, duration: 1, onComplete: () => {
        loadingScreen.style.display = "none";
        homeScreen.classList.remove("hidden");
        gsap.from(".logo", { opacity: 0, y: -50, duration: 1 });
        gsap.from(".menu-btn", { opacity: 0, y: 50, stagger: 0.2, duration: 1 });
      }});
    }
  }, 200);

  // Background Canvas Animation
  const canvas = document.getElementById("background-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
};
