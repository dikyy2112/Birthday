// Intro and Music
const intro = document.getElementById('intro');
const main = document.getElementById('main');
const audio = document.getElementById('bgm');
const musicToggle = document.getElementById('music-toggle');
const sfxOpen = document.getElementById('sfx-open');

intro.addEventListener('click', () => {
  // Play sound effect
  if (sfxOpen) sfxOpen.play().catch(() => console.log('SFX play prevented'));
  
  // Add opening animation
  intro.classList.add('intro-opening');
  
  // Disable clicking again
  intro.style.pointerEvents = 'none';
  
  // Wait for animation to finish before showing main content
  setTimeout(() => {
    intro.classList.add('hidden');
    main.classList.add('visible');
    audio.play().catch(() => console.log('Auto-play prevented'));
    animateCounter();
  }, 1200);
});

musicToggle.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    musicToggle.textContent = "Musik: ON";
  } else {
    audio.pause();
    musicToggle.textContent = "Musik: OFF";
  }
});

// Dialogues - Updated for farewell tone
const dialogues = [
  { role: "Dinda Kecil", text: '"Kak, apakah dunia dewasa semenakutkan yang aku bayangkan?"' },
  { role: "Dinda", text: '"Kadang-kadang. Tapi kamu punya banyak keberanian yang mungkin belum kamu sadari."' },
  { role: "Dinda Kecil", text: '"Apakah kita akan selalu berjalan di jalan yang sama?"' },
  { role: "Dinda", text: '"Tidak selalu. Kadang kita harus mengambil jalan berbeda untuk bisa menemukan diri kita sendiri."' },
  { role: "Dinda Kecil", text: '"Aku bangga padamu, Kak. Berjanjilah untuk terus melangkah walau sendiri."' },
  { role: "Dinda", text: '"Terima kasih. Berbahagialah di jalanmu yang baru, Dinda kecilku."' }
];

let dIdx = 0;
const dBox = document.getElementById('dialogue-container');
const dRole = document.getElementById('d-role');
const dText = document.getElementById('d-text');

dBox.addEventListener('click', () => {
  dIdx = (dIdx + 1) % dialogues.length;
  dText.style.opacity = 0;
  dRole.style.opacity = 0;
  setTimeout(() => {
    dRole.textContent = dialogues[dIdx].role;
    dText.textContent = dialogues[dIdx].text;
    dText.style.opacity = 1;
    dRole.style.opacity = 1;
  }, 400);
});

// Smooth scrolling for nav
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: 'smooth'
    });
  });
});

// Update Nav Active State on Scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('nav a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href').substring(1) === current) {
      a.classList.add('active');
    }
  });
});

// Day Counter
const birthDate = new Date("2005-03-22");
function calculateDays() {
  const today = new Date();
  return Math.ceil(Math.abs(today - birthDate) / (1000 * 60 * 60 * 24));
}

function animateCounter() {
  const target = calculateDays();
  const obj = document.getElementById('day-counter');
  let current = 0;
  const increment = Math.ceil(target / 100);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      obj.textContent = target.toLocaleString('id-ID');
      clearInterval(timer);
    } else {
      obj.textContent = current.toLocaleString('id-ID');
    }
  }, 20);
}

// Wish Form
document.getElementById('wish-form-submit').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('wish-input');
  const response = document.getElementById('wish-response');
  
  if (input.value.trim() !== '') {
    response.innerHTML = `"${input.value}"<br><span style="font-size:0.9rem; color:#8a736c;">Sebuah akhir yang baik untuk awal yang baru. Tersimpan selamanya.</span>`;
    response.style.display = 'block';
    e.target.style.display = 'none';
  }
});

// Secret Feature
const secretBtn = document.getElementById("secret-trigger");
if (secretBtn) {
  secretBtn.addEventListener("click", function () {
    const passwordInput = prompt(
      "Passwordnya ada di blogger dengan gambar yang sama pada halaman awal sebelum membuka surat, password terletak di judul..selamat mencari yaa! (Hint: ada angka dan jenis bunga di dalamnya) :)"
    );
    
    if (passwordInput && passwordInput.toLowerCase() === "3 tangkai gerbera") {
      this.style.display = "none";
      const msg = document.getElementById("secret-message");
      msg.innerHTML = "Meski jalannya tak lagi sama, beberapa memori memang ditakdirkan untuk diingat selamanya. ❤️<br><span style='font-size:0.9rem; color:var(--text-muted);'>(Some moments are indeed destined to be remembered)</span>";
      msg.style.display = "block";
      alert("Yay! Passwordnya benar. Selamat melangkah dan berbahagialah!");
    } else if (passwordInput !== null) {
      this.classList.add("shake-animation");
      setTimeout(() => {
        this.classList.remove("shake-animation");
        alert("Yah, salah, coba cari lagi yaa!");
      }, 500);
    }
  });
}

// Cursor Heart Trail Effect
let lastSpark = 0;
document.addEventListener("mousemove", function (e) {
  const now = Date.now();
  if (now - lastSpark < 100) return; // 1 spark per 100ms
  lastSpark = now;

  const spark = document.createElement("div");
  spark.innerHTML = "❤️";
  spark.style.position = "fixed";
  spark.style.left = e.clientX + "px";
  spark.style.top = e.clientY + "px";
  spark.style.fontSize = Math.random() * 8 + 10 + "px";
  spark.style.pointerEvents = "none";
  spark.style.zIndex = "999999";
  spark.style.opacity = "0.7";
  spark.style.transition = "all 1s ease-out";
  
  document.body.appendChild(spark);

  // Animate the spark going up and fading
  setTimeout(() => {
    spark.style.transform = `translateY(-60px) scale(0.5)`;
    spark.style.opacity = "0";
  }, 50);

  // Remove the element from DOM
  setTimeout(() => {
    if (spark.parentNode) {
      spark.remove();
    }
  }, 1000);
});
