document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const content = document.querySelector(".content");
  const intro = document.querySelector(".intro");
  const typingText = document.getElementById("typingText");
  const giftBtn = document.getElementById("giftBtn");
  const surprise = document.getElementById("surprise");
  const bgMusic = document.getElementById("bgMusic");
  const photos = document.querySelectorAll(".photos img");
  const goGift = document.getElementById("goGift");
  const giftPopup = document.getElementById("giftPopup");
  const closePopup = document.querySelector(".closePopup");

  // FIX utama: pastikan popup tidak muncul otomatis
  giftPopup.classList.add("hidden");

  const message = "Hay bybyku yang cantik, hari ini adalah hari yang spesial buat aku, hari di mana dunia menjadi lebih indah karena kehadiranmu. Selamat ulang tahun, cintaku 💙 Semoga apa yang kamu harapkan di masa depan semuanya bisa tercapai yah, mulai dari kuliahnya, mondoknya, jodohnya—semoga itu aku—xixixi. Aku juga bakal mendampingi byby di semua proses yang byby jalani, semangat buat semuanya sayang, doaku selalu menyertaimu byby. I Love you so much 💙";

  startBtn.addEventListener("click", () => {
    intro.classList.add("hidden");
    content.classList.remove("hidden");
    bgMusic.play();
    typeMessage(message);
    startBlueBalloons();
  });

  function typeMessage(text) {
    let i = 0;
    const interval = setInterval(() => {
      typingText.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 60);
  }

  window.addEventListener("scroll", () => {
    photos.forEach(photo => {
      const rect = photo.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        photo.classList.add("show");
      }
    });
  });

  // Klik Buka Kado → tampilkan popup hadiah
  giftBtn.addEventListener("click", () => {
    giftPopup.classList.remove("hidden");
    giftPopup.classList.add("show");
    startConfetti();
  });

  // Klik "Mau dong!" → tutup popup → tampilkan tulisan → buka link
  goGift.addEventListener("click", () => {
    giftPopup.classList.add("hidden");
    window.location.href = "https://hadiah-ultah.vercel.app/";
  });

  // ❌ Tombol close menutup popup
closePopup.addEventListener("click", () => {
  giftPopup.classList.add("hidden");
});

  // Confetti Effect
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  canvas.classList.add("confetti-canvas");

  const confettis = Array.from({ length: 200 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 10 + 10
  }));

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff66b2";
    confettis.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fill();
    });
    updateConfetti();
  }

  function updateConfetti() {
    confettis.forEach(c => {
      c.y += Math.cos(c.d) + 2;
      c.x += Math.sin(c.d);
      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    });
  }

  function startConfetti() {
    setInterval(drawConfetti, 20);
  }

  // Blue Balloons
  function startBlueBalloons() {
    const canvas = document.getElementById("blueBalloonCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const balloons = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      r: Math.random() * 15 + 10,
      color: "rgba(80,160,255,0.8)",
      speed: Math.random() * 2 + 1
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      balloons.forEach(b => {
        ctx.beginPath();
        ctx.ellipse(b.x, b.y, b.r * 0.7, b.r, 0, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        b.y -= b.speed;

        if (b.y + b.r < 0) {
          b.y = canvas.height + 50;
          b.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(draw);
    }

    draw();
  }
});
