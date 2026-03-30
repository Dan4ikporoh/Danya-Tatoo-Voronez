const data = window.siteContent;

const $ = (selector) => document.querySelector(selector);
const byId = (id) => document.getElementById(id);

const iconMap = {
  telegram: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21.4 4.6L18.3 19c-.2 1-.8 1.2-1.6.8l-4.6-3.4-2.2 2.1c-.2.2-.5.4-.9.4l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2l-10.6 6.7-4.6-1.4c-1-.3-1-1 .2-1.5L19.6 3c.9-.4 1.7.2 1.8 1.6Z" fill="currentColor"/>
    </svg>
  `,
  vk: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 7.5c.1 6.8 3.5 10.9 9.4 10.9h.4v-3.9c2.2.2 3.8 1.7 4.5 3.9H21c-.9-3.1-3-4.8-4.3-5.4 1.3-.8 3.1-2.7 3.5-5.5h-3.3c-.5 2.3-2.2 4.2-4.1 4.4V7.5H9.5v7.6c-1.9-.5-4.4-2.6-4.5-7.6H3Z" fill="currentColor"/>
    </svg>
  `,
  email: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6.8A1.8 1.8 0 0 1 4.8 5h14.4A1.8 1.8 0 0 1 21 6.8v10.4a1.8 1.8 0 0 1-1.8 1.8H4.8A1.8 1.8 0 0 1 3 17.2V6.8Zm1.8.2v.3l7.2 5.5 7.2-5.5V7H4.8Zm14.4 10.2V9.6l-6.7 5.1a.9.9 0 0 1-1.1 0L4.8 9.6v7.6h14.4Z" fill="currentColor"/>
    </svg>
  `,
  location: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.7A6.8 6.8 0 0 0 5.2 9.5c0 4.9 6 11.2 6.3 11.4.3.3.8.3 1.1 0 .3-.2 6.2-6.5 6.2-11.4A6.8 6.8 0 0 0 12 2.7Zm0 9.4a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2Z" fill="currentColor"/>
    </svg>
  `
};

const setText = (id, value) => {
  const el = byId(id);
  if (el) el.textContent = value;
};

setText('brandName', data.profile.brand);
setText('heroEyebrow', data.profile.eyebrow);
setText('heroTitle', data.profile.title);
setText('heroDescription', data.profile.description);
setText('aboutText', data.profile.about);
setText('approachText', data.profile.approach);
setText('locationText', data.profile.location);
setText('addressChip', data.profile.address);
setText('footerBrand', data.profile.brand);
setText('footerText', data.profile.footer);
document.title = `${data.profile.brand} — тату-мастер в Воронеже`;

const heroPills = byId('heroPills');
data.heroPills.forEach((pill) => {
  const span = document.createElement('span');
  span.className = 'hero-pill';
  span.textContent = pill;
  heroPills.appendChild(span);
});

const heroFacts = byId('heroFacts');
data.heroFacts.forEach((fact) => {
  const item = document.createElement('article');
  item.className = 'fact-card';
  item.innerHTML = `
    <span>${fact.title}</span>
    <strong>${fact.text}</strong>
  `;
  heroFacts.appendChild(item);
});

const heroStack = byId('heroStack');
data.showcase.forEach((item, index) => {
  const card = document.createElement('article');
  card.className = `stack-card tilt-card stack-card-${index + 1}`;
  card.innerHTML = `
    <img src="${item.image}" alt="${item.title}" loading="eager" />
    <div class="stack-card-copy">
      <span>${item.label}</span>
      <strong>${item.title}</strong>
    </div>
  `;
  heroStack.appendChild(card);
});

const featureGrid = byId('featureGrid');
data.features.forEach((feature) => {
  const card = document.createElement('article');
  card.className = 'feature-card reveal';
  card.innerHTML = `
    <p class="panel-label">Преимущество</p>
    <h3>${feature.title}</h3>
    <p>${feature.text}</p>
  `;
  featureGrid.appendChild(card);
});

const serviceGrid = byId('serviceGrid');
data.services.forEach((service) => {
  const card = document.createElement('article');
  card.className = 'service-card reveal';
  card.innerHTML = `
    <div class="service-badge">${service.badge}</div>
    <h3>${service.title}</h3>
    <p>${service.text}</p>
  `;
  serviceGrid.appendChild(card);
});

const processGrid = byId('processGrid');
data.process.forEach((step) => {
  const card = document.createElement('article');
  card.className = 'process-card reveal';
  card.innerHTML = `
    <div class="process-step">${step.step}</div>
    <div>
      <h3>${step.title}</h3>
      <p>${step.text}</p>
    </div>
  `;
  processGrid.appendChild(card);
});

const galleryGrid = byId('galleryGrid');
const filterBar = byId('filterBar');
const allFilters = ['Все', ...new Set(data.works.map((work) => work.category))];
let activeFilter = 'Все';

const renderFilters = () => {
  filterBar.innerHTML = '';
  allFilters.forEach((filter) => {
    const button = document.createElement('button');
    button.className = `filter-chip ${filter === activeFilter ? 'is-active' : ''}`;
    button.type = 'button';
    button.textContent = filter;
    button.addEventListener('click', () => {
      activeFilter = filter;
      renderFilters();
      renderGallery();
    });
    filterBar.appendChild(button);
  });
};

const lightbox = byId('lightbox');
const lightboxImage = byId('lightboxImage');
const lightboxLabel = byId('lightboxLabel');
const lightboxTitle = byId('lightboxTitle');
const lightboxText = byId('lightboxText');
const lightboxClose = byId('lightboxClose');

const openLightbox = (work) => {
  lightboxImage.src = work.image;
  lightboxImage.alt = work.title;
  lightboxLabel.textContent = work.category;
  lightboxTitle.textContent = work.title;
  lightboxText.textContent = work.text;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
};

const closeLightbox = () => {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
};

const renderGallery = () => {
  galleryGrid.innerHTML = '';
  const filtered = activeFilter === 'Все'
    ? data.works
    : data.works.filter((work) => work.category === activeFilter);

  filtered.forEach((work, index) => {
    const card = document.createElement('article');
    card.className = 'gallery-card reveal';
    card.innerHTML = `
      <button class="gallery-card-button" type="button" aria-label="Открыть ${work.title}">
        <div class="gallery-image-wrap">
          <img src="${work.image}" alt="${work.title}" loading="lazy" class="gallery-image" />
        </div>
        <div class="gallery-copy">
          <span class="gallery-category">${work.category}</span>
          <h3>${work.title}</h3>
          <p>${work.text}</p>
          <div class="tag-list">
            ${work.tags.map((tag) => `<span>${tag}</span>`).join('')}
          </div>
        </div>
      </button>
    `;
    card.querySelector('.gallery-card-button').addEventListener('click', () => openLightbox(work));
    galleryGrid.appendChild(card);
    revealObserver.observe(card);
  });
};

const contactGrid = byId('contactGrid');
const renderContacts = () => {
  data.contacts.forEach((contact) => {
    const card = document.createElement('article');
    const isExternal = contact.href.startsWith('http');
    card.className = 'contact-card reveal';
    card.innerHTML = `
      <div class="contact-head">
        <div class="contact-icon">${iconMap[contact.type] || ''}</div>
        <div>
          <p class="panel-label">${contact.title}</p>
          <h3>${contact.value}</h3>
        </div>
      </div>
      <p class="contact-helper">${contact.helper}</p>
      <div class="contact-actions">
        <a class="button button-primary" href="${contact.href}" ${isExternal ? 'target="_blank" rel="noreferrer"' : ''}>${contact.button}</a>
        <button class="button button-secondary copy-button" type="button" data-copy="${contact.value}">Скопировать</button>
      </div>
      <div class="qr-block">
        <img src="${contact.qr}" alt="QR-код для ${contact.title}" loading="lazy" />
        <div>
          <span class="qr-title">QR-код</span>
          <p>Сканируй с экрана телефоном — ссылка сразу откроется.</p>
        </div>
      </div>
    `;
    contactGrid.appendChild(card);
  });
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

const observeExistingReveals = () => {
  document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));
};

renderFilters();
renderGallery();
renderContacts();
observeExistingReveals();

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});

const copyButtons = () => {
  document.querySelectorAll('.copy-button').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        const original = button.textContent;
        button.textContent = 'Скопировано';
        setTimeout(() => {
          button.textContent = original;
        }, 1500);
      } catch (error) {
        button.textContent = 'Не удалось';
        setTimeout(() => {
          button.textContent = 'Скопировать';
        }, 1500);
      }
    });
  });
};

copyButtons();

const menuToggle = byId('menuToggle');
const siteNav = byId('siteNav');
menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const scrollProgress = byId('scrollProgress');
const updateProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  scrollProgress.style.transform = `scaleX(${ratio / 100})`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const tiltCards = document.querySelectorAll('.tilt-card');
const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (motionAllowed) {
  tiltCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--rotate-x', `${(-y * 8).toFixed(2)}deg`);
      card.style.setProperty('--rotate-y', `${(x * 10).toFixed(2)}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
    });
  });
}
