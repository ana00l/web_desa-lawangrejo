// Pastikan elemen ada
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  // Toggle menu mobile
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle("active");
    menuBtn.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", isOpen);
    // Fokusibilitas: bisa trap focus di navLinks jika perlu
  });

  // Event delegation untuk menutup menu saat klik link
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("active");
      menuBtn.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Klik di luar menutup menu
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
      navLinks.classList.remove("active");
      menuBtn.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// Animasi fade-in dengan IntersectionObserver
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  });

  document.querySelectorAll(".fade-in, .galeri img").forEach(el => {
    observer.observe(el);
  });
} else {
  // fallback: langsung show semua elemen
  document.querySelectorAll(".fade-in, .galeri img").forEach(el => {
    el.classList.add("show");
  });
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (!nav) return;
  if (window.scrollY > 70) {
    nav.classList.add("nav-scroll");
  } else {
    nav.classList.remove("nav-scroll");
  }
});

// Lightbox
window.addEventListener('load', () => {
  const overlay = document.getElementById('lightboxOverlay');
  const lightboxImg = document.getElementById('lightboxImage');
  const closeBtn = document.getElementById('lightboxClose');
  const imgs = document.querySelectorAll('.galeri img');

  if (!(overlay && lightboxImg && closeBtn && imgs.length > 0)) {
    return; // elemen lightbox tidak lengkap, skip
  }

  imgs.forEach(img => {
    img.addEventListener('click', () => {
      overlay.style.display = 'flex';
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      document.body.style.overflow = 'hidden';
      // bisa set fokus ke closeBtn
      closeBtn.focus();
    });
  });

  closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    lightboxImg.src = '';
    lightboxImg.alt = '';
    document.body.style.overflow = '';
    // bisa kembalikan fokus ke gambar yang terakhir diklik
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.style.display = 'none';
      lightboxImg.src = '';
      lightboxImg.alt = '';
      document.body.style.overflow = '';
    }
  });

  // Keyboard support: Esc untuk tutup
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.style.display === 'flex') {
      overlay.style.display = 'none';
      lightboxImg.src = '';
      lightboxImg.alt = '';
      document.body.style.overflow = '';
    }
  });
});

document.getElementById('linkSejarah').addEventListener('click', function(e) {
  e.preventDefault();  // agar tidak reload halaman
  const el = document.getElementById('sejarah');
  el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
});

document.getElementById('linkVisiMisi').addEventListener('click', function(e) {
  e.preventDefault();
  const el = document.getElementById('visi-misi');
  el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
});

