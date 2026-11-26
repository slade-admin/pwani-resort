/* ============================================
   PWANI BEACH RESORT — Interactive Features
   Modern Mombasa Business Website MVP
   ============================================ */

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initNavbar();
  initHeroParticles();
  initScrollReveal();
  initCalendar();
  initMap();
  initThemeToggle();
  initLanguageToggle();
  initMobileMenu();

  // Show welcome toast after a short delay
  setTimeout(() => {
    showToast('Karibu! Welcome! 🌊', 'Book directly and save up to 30% today.');
  }, 3000);
});

// ==================== NAVBAR ====================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // Active nav link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ==================== HERO PARTICLES ====================
function initHeroParticles() {
  const container = document.getElementById('heroParticles');
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = (Math.random() * 4 + 2) + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    container.appendChild(particle);
  }
}

// ==================== SCROLL REVEAL ====================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ==================== THEME TOGGLE (Dark/Light) ====================
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Check saved preference
  const savedTheme = localStorage.getItem('pwani-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('pwani-theme', next);
    updateThemeIcons(next);
  });
}

function updateThemeIcons(theme) {
  const darkIcon = document.querySelector('.theme-icon-dark');
  const lightIcon = document.querySelector('.theme-icon-light');
  if (theme === 'dark') {
    darkIcon.style.display = 'block';
    lightIcon.style.display = 'none';
  } else {
    darkIcon.style.display = 'none';
    lightIcon.style.display = 'block';
  }
}

// ==================== LANGUAGE TOGGLE (EN/SW) ====================
let currentLang = 'en';

function initLanguageToggle() {
  const toggle = document.getElementById('langToggle');

  toggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'sw' : 'en';
    updateLanguage();
    showToast(
      currentLang === 'sw' ? 'Lugha Imebadilishwa' : 'Language Changed',
      currentLang === 'sw' ? 'Sasa inaonyesha kwa Kiswahili' : 'Now showing in English'
    );
  });
}

function updateLanguage() {
  // Update all elements with data-en and data-sw attributes
  document.querySelectorAll('[data-en][data-sw]').forEach(el => {
    const text = el.getAttribute(`data-${currentLang}`);
    if (text) {
      el.innerHTML = text;
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-en-placeholder][data-sw-placeholder]').forEach(el => {
    const placeholder = el.getAttribute(`data-${currentLang}-placeholder`);
    if (placeholder) {
      el.placeholder = placeholder;
    }
  });

  // Update language toggle button text
  const toggle = document.getElementById('langToggle');
  toggle.textContent = currentLang === 'en' ? 'SW' : 'EN';
}

// ==================== CALENDAR ====================
let calendarDate = new Date();
let selectedDate = null;
let selectedTime = '12:00 PM';

function initCalendar() {
  renderCalendar();
}

function renderCalendar() {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const swahiliMonths = ['Januari', 'Februari', 'Machi', 'Aprili', 'Mei', 'Juni',
    'Julai', 'Agosti', 'Septemba', 'Oktoba', 'Novemba', 'Desemba'];

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthLabel = document.getElementById('calendarMonth');
  const names = currentLang === 'sw' ? swahiliMonths : monthNames;
  monthLabel.textContent = `${names[month]} ${year}`;

  const daysContainer = document.getElementById('calendarDays');
  daysContainer.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Empty cells for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'calendar-day empty';
    daysContainer.appendChild(empty);
  }

  // Day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day';
    dayEl.textContent = day;

    const cellDate = new Date(year, month, day);
    cellDate.setHours(0, 0, 0, 0);

    if (cellDate < today) {
      dayEl.classList.add('disabled');
    } else {
      dayEl.addEventListener('click', () => selectDate(dayEl, cellDate));
    }

    if (cellDate.getTime() === today.getTime()) {
      dayEl.classList.add('today');
    }

    if (selectedDate && cellDate.getTime() === selectedDate.getTime()) {
      dayEl.classList.add('selected');
    }

    daysContainer.appendChild(dayEl);
  }
}

function selectDate(el, date) {
  document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
  el.classList.add('selected');
  selectedDate = date;
}

function changeMonth(delta) {
  calendarDate.setMonth(calendarDate.getMonth() + delta);
  renderCalendar();
}

function selectTime(el) {
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  selectedTime = el.textContent;
}

// ==================== BOOKING FORM ====================
function handleBooking(e) {
  e.preventDefault();

  const name = document.getElementById('bookingName').value;
  const phone = document.getElementById('bookingPhone').value;
  const guests = document.getElementById('bookingGuests').value;
  const service = document.getElementById('bookingService');
  const serviceText = service.options[service.selectedIndex].text;

  if (!selectedDate) {
    showToast(
      currentLang === 'sw' ? 'Chagua Tarehe' : 'Select a Date',
      currentLang === 'sw' ? 'Tafadhali chagua tarehe kwenye kalenda' : 'Please select a date on the calendar'
    );
    return;
  }

  const dateStr = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // Show confirmation modal
  const modalDetails = document.getElementById('modalDetails');
  modalDetails.innerHTML = `
    <div class="modal-detail-row">
      <span class="label">${currentLang === 'sw' ? 'Jina' : 'Guest'}</span>
      <span class="value">${name}</span>
    </div>
    <div class="modal-detail-row">
      <span class="label">${currentLang === 'sw' ? 'Simu' : 'Phone'}</span>
      <span class="value">${phone}</span>
    </div>
    <div class="modal-detail-row">
      <span class="label">${currentLang === 'sw' ? 'Tarehe' : 'Date'}</span>
      <span class="value">${dateStr}</span>
    </div>
    <div class="modal-detail-row">
      <span class="label">${currentLang === 'sw' ? 'Wakati' : 'Time'}</span>
      <span class="value">${selectedTime}</span>
    </div>
    <div class="modal-detail-row">
      <span class="label">${currentLang === 'sw' ? 'Wageni' : 'Guests'}</span>
      <span class="value">${guests}</span>
    </div>
    <div class="modal-detail-row">
      <span class="label">${currentLang === 'sw' ? 'Huduma' : 'Service'}</span>
      <span class="value">${serviceText}</span>
    </div>
  `;

  document.getElementById('bookingModal').classList.add('active');
}

function closeModal() {
  document.getElementById('bookingModal').classList.remove('active');
  document.getElementById('bookingForm').reset();

  // Show success toast
  showToast(
    currentLang === 'sw' ? 'Nafasi Imethibitishwa! ✅' : 'Booking Confirmed! ✅',
    currentLang === 'sw' ? 'Uthibitisho wa WhatsApp umetumwa.' : 'WhatsApp confirmation sent.'
  );
}

// ==================== GALLERY LIGHTBOX ====================
function openLightbox(item) {
  const img = item.querySelector('img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  lightboxImg.src = img.src.replace('w=600', 'w=1400').replace('w=800', 'w=1400');
  lightboxImg.alt = img.alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    document.getElementById('bookingModal').classList.remove('active');
  }
});

// ==================== REVIEWS CAROUSEL ====================
let reviewScrollPos = 0;

function scrollReviews(direction) {
  const carousel = document.getElementById('reviewsCarousel');
  const cardWidth = carousel.querySelector('.review-card').offsetWidth + 24; // card + gap
  const maxScroll = carousel.scrollWidth - carousel.parentElement.offsetWidth;

  reviewScrollPos += direction * cardWidth;
  reviewScrollPos = Math.max(0, Math.min(reviewScrollPos, maxScroll));
  carousel.style.transform = `translateX(-${reviewScrollPos}px)`;
}

// Auto-scroll reviews
let autoScrollInterval;
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    const carousel = document.getElementById('reviewsCarousel');
    const maxScroll = carousel.scrollWidth - carousel.parentElement.offsetWidth;
    if (reviewScrollPos >= maxScroll) {
      reviewScrollPos = 0;
      carousel.style.transform = `translateX(0)`;
    } else {
      scrollReviews(1);
    }
  }, 5000);
}

startAutoScroll();

// ==================== MAP (LEAFLET) ====================
function initMap() {
  // Nyali Beach, Mombasa coordinates
  const lat = -4.0435;
  const lng = 39.7137;

  const map = L.map('map', {
    scrollWheelZoom: false,
    zoomControl: true,
  }).setView([lat, lng], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 19,
  }).addTo(map);

  // Custom marker
  const markerIcon = L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 40px; height: 40px; 
      background: linear-gradient(135deg, #0891b2, #0e7490); 
      border-radius: 50% 50% 50% 0; 
      transform: rotate(-45deg); 
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 15px rgba(8,145,178,0.5);
      border: 3px solid white;
    "><span style="transform: rotate(45deg); font-size: 16px;">🌊</span></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  L.marker([lat, lng], { icon: markerIcon })
    .addTo(map)
    .bindPopup(`
      <div style="font-family: 'Inter', sans-serif; padding: 8px; text-align: center;">
        <strong style="font-size: 14px;">🌊 Pwani Beach Resort</strong><br>
        <span style="font-size: 12px; color: #666;">Nyali Beach Road, Mombasa</span><br>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" 
           target="_blank" 
           style="display:inline-block; margin-top:8px; padding:6px 14px; background:#0891b2; color:white; border-radius:20px; font-size:12px; text-decoration:none;">
          Get Directions 🧭
        </a>
      </div>
    `)
    .openPopup();
}

// ==================== AI CHATBOT ====================
function toggleChatbot() {
  const widget = document.getElementById('chatbotWidget');
  widget.classList.toggle('open');
}

// Chatbot knowledge base
const chatResponses = {
  'room prices?': {
    en: "We have 3 room types:\n\n🏡 **Garden Room** — KES 8,500/night\n🌊 **Ocean Suite** — KES 15,000/night (Most Popular!)\n🏠 **Family Villa** — KES 25,000/night\n\nAll prices include breakfast. Book directly and save 30% vs. travel agencies!",
    sw: "Tuna aina 3 za vyumba:\n\n🏡 **Chumba cha Bustani** — KES 8,500/usiku\n🌊 **Chumba cha Bahari** — KES 15,000/usiku (Maarufu Zaidi!)\n🏠 **Villa ya Familia** — KES 25,000/usiku\n\nBei zote zinajumuisha kifungua kinywa. Weka nafasi moja kwa moja na okoa 30%!"
  },
  'book a room': {
    en: "I'd love to help you book! You can:\n\n1️⃣ Use our **booking form** below 👇\n2️⃣ **WhatsApp us** at +254 700 123 456\n3️⃣ **Call us** directly\n\nBooking directly saves you up to 30% compared to Booking.com! 💰",
    sw: "Ningependa kukusaidia kuweka nafasi! Unaweza:\n\n1️⃣ Tumia **fomu ya nafasi** hapa chini 👇\n2️⃣ **Tuandikie WhatsApp** +254 700 123 456\n3️⃣ **Tupigie** moja kwa moja\n\nKuweka nafasi moja kwa moja kunakuokoa hadi 30%! 💰"
  },
  'restaurant menu': {
    en: "Our Swahili restaurant serves authentic coastal cuisine daily from 7AM to 11PM! 🍽️\n\n**Signature Dishes:**\n• Biryani ya Kamba (Prawn Biryani) — KES 1,800\n• Samaki wa Kupaka — KES 1,500\n• Pilau ya Nyama — KES 1,200\n• Mahamri & Chai — KES 400\n\nAll ingredients are sourced fresh from local fishermen and farms daily! 🐟",
    sw: "Mkahawa wetu wa Kiswahili unatoa vyakula halisi vya pwani kila siku 7AM hadi 11PM! 🍽️\n\n**Vyakula Maalum:**\n• Biryani ya Kamba — KES 1,800\n• Samaki wa Kupaka — KES 1,500\n• Pilau ya Nyama — KES 1,200\n• Mahamri & Chai — KES 400\n\nViungo vyote ni safi kutoka wavuvi na mashamba! 🐟"
  },
  'how to get there?': {
    en: "We're located on **Nyali Beach Road, Mombasa** 📍\n\n🚗 **From Moi Airport (MIA):** 15-minute drive\n🌉 **From Nyali Bridge:** 5-minute drive\n🚕 **Taxi/Uber:** Available at the airport\n✈️ **Airport Pickup:** FREE for Ocean Suite & Villa guests!\n\nCheck our map section below for directions! 🗺️",
    sw: "Tuko kwenye **Nyali Beach Road, Mombasa** 📍\n\n🚗 **Kutoka Uwanja wa Moi:** Dakika 15 kwa gari\n🌉 **Kutoka Daraja la Nyali:** Dakika 5 kwa gari\n🚕 **Taxi/Uber:** Inapatikana uwanja wa ndege\n✈️ **Usafiri wa Uwanja:** BURE kwa wageni wa Ocean Suite & Villa!\n\nAngalia sehemu ya ramani hapa chini! 🗺️"
  },
  'talk to human': {
    en: "Of course! Here are the fastest ways to reach our team:\n\n💬 **WhatsApp:** +254 700 123 456 (fastest — avg. 2 min response!)\n📞 **Call:** +254 700 123 456\n📧 **Email:** hello@pwaniresort.co.ke\n\nOur team is available 24/7! 🌟",
    sw: "Bila shaka! Hizi ni njia za haraka kuwafikia timu yetu:\n\n💬 **WhatsApp:** +254 700 123 456 (haraka zaidi — jibu la dakika 2!)\n📞 **Pigia:** +254 700 123 456\n📧 **Barua pepe:** hello@pwaniresort.co.ke\n\nTimu yetu inapatikana 24/7! 🌟"
  }
};

// Default responses for unrecognized input
const defaultResponses = {
  en: [
    "Thank you for your interest! 😊 For the best assistance, I'd recommend reaching out to our team on WhatsApp at +254 700 123 456 — they typically respond in under 2 minutes!",
    "Great question! Let me connect you with our team for a detailed answer. You can WhatsApp us at +254 700 123 456 or click the green button below. 👇",
    "I appreciate your query! While I may not have the exact answer, our wonderful team is available 24/7 on WhatsApp (+254 700 123 456) to help you. 🌟"
  ],
  sw: [
    "Asante kwa kuvutiwa! 😊 Kwa msaada bora, ninapendekeza uwasiliane na timu yetu kupitia WhatsApp +254 700 123 456 — wanajibu ndani ya dakika 2!",
    "Swali zuri! Wasiliana na timu yetu kwa jibu la kina. WhatsApp +254 700 123 456 au bonyeza kitufe cha kijani hapo chini. 👇",
    "Ninathamini swali lako! Timu yetu inapatikana 24/7 kupitia WhatsApp (+254 700 123 456) kukusaidia. 🌟"
  ]
};

function sendQuickReply(btn) {
  const text = btn.textContent.trim();
  addChatMessage(text, 'user');

  // Hide quick replies after first use
  document.getElementById('quickReplies').style.display = 'none';

  // Show typing indicator
  showTyping();

  setTimeout(() => {
    removeTyping();

    // Find matching response
    const key = btn.getAttribute('data-en').toLowerCase();
    const response = chatResponses[key];

    if (response) {
      addChatMessage(response[currentLang] || response.en, 'bot');
    } else {
      const defaults = defaultResponses[currentLang] || defaultResponses.en;
      addChatMessage(defaults[Math.floor(Math.random() * defaults.length)], 'bot');
    }
  }, 1200 + Math.random() * 800);
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  addChatMessage(text, 'user');
  input.value = '';

  showTyping();

  setTimeout(() => {
    removeTyping();

    // Simple keyword matching
    const lower = text.toLowerCase();
    let response = null;

    if (lower.includes('price') || lower.includes('cost') || lower.includes('bei') || lower.includes('how much')) {
      response = chatResponses['room prices?'];
    } else if (lower.includes('book') || lower.includes('reserv') || lower.includes('nafasi')) {
      response = chatResponses['book a room'];
    } else if (lower.includes('menu') || lower.includes('food') || lower.includes('restaurant') || lower.includes('chakula')) {
      response = chatResponses['restaurant menu'];
    } else if (lower.includes('direction') || lower.includes('location') || lower.includes('where') || lower.includes('map') || lower.includes('wapi') || lower.includes('mahali')) {
      response = chatResponses['how to get there?'];
    } else if (lower.includes('human') || lower.includes('person') || lower.includes('call') || lower.includes('phone') || lower.includes('mtu')) {
      response = chatResponses['talk to human'];
    }

    if (response) {
      addChatMessage(response[currentLang] || response.en, 'bot');
    } else {
      const defaults = defaultResponses[currentLang] || defaultResponses.en;
      addChatMessage(defaults[Math.floor(Math.random() * defaults.length)], 'bot');
    }
  }, 1500 + Math.random() * 1000);
}

function addChatMessage(text, type) {
  const container = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = `chat-message ${type}`;
  msg.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

function showTyping() {
  const container = document.getElementById('chatMessages');
  const typing = document.createElement('div');
  typing.className = 'chat-typing';
  typing.id = 'typingIndicator';
  typing.innerHTML = '<span></span><span></span><span></span>';
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById('typingIndicator');
  if (typing) typing.remove();
}

// Handle Enter key in chat input
document.addEventListener('DOMContentLoaded', () => {
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendChatMessage();
      }
    });
  }
});

// ==================== TOAST NOTIFICATIONS ====================
function showToast(title, message) {
  const toast = document.getElementById('toast');
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastMessage').textContent = message;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ==================== SMOOTH SCROLL FOR NAV LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==================== LAZY LOADING IMAGES ====================
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imgObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

// ==================== SERVICE WORKER REGISTRATION (PWA-Ready) ====================
// Uncomment this when deploying to production with a service worker file
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js').catch(() => {});
// }
