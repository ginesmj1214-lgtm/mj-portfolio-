/* =======================================================
   MJ AI PORTFOLIO V3
   Interactive Experience Engine
======================================================= */

const roles = [
  "Customer Experience Specialist",
  "Healthcare Support Specialist",
  "Virtual Assistant",
  "Provider Services Specialist",
  "Order Processing Specialist",
  "Remote Operations Professional",
  "AI Productivity Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;
const typingElement = document.getElementById("typing");

function typeRole() {
  const currentRole = roles[roleIndex];
  if (!typingElement) return;

  if (!deleting) {
    typingElement.textContent = currentRole.slice(0, charIndex++);
    if (charIndex > currentRole.length) {
      deleting = true;
      setTimeout(typeRole, 1200);
      return;
    }
  } else {
    typingElement.textContent = currentRole.slice(0, charIndex--);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeRole, deleting ? 50 : 110);
}
typeRole();

const counters = document.querySelectorAll(".counter");
counters.forEach((counter) => {
  const target = Number(counter.dataset.target);
  let current = 0;
  const step = target / 120;

  const update = () => {
    current += step;
    if (current < target) {
      counter.textContent = Math.ceil(current);
      requestAnimationFrame(update);
    } else {
      counter.textContent = target === 6 ? "6+" : target;
    }
  };

  update();
});

const profileShell = document.querySelector(".profile-shell");
const cursorGlow = document.querySelector(".cursor-glow");

if (profileShell) {
  profileShell.addEventListener("mousemove", (event) => {
    const rect = profileShell.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((0.5 - y / rect.height) * 10);
    profileShell.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  profileShell.addEventListener("mouseleave", () => {
    profileShell.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px)";
  });
}

if (cursorGlow) {
  // smooth trailing bubble cursor
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let cursorX = pointerX;
  let cursorY = pointerY;
  let moveTimer;

  window.addEventListener("mousemove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    // quick pop on movement
    cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.25)';
    cursorGlow.style.opacity = '1';
    clearTimeout(moveTimer);
    moveTimer = setTimeout(() => {
      cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 120);
  });

  window.addEventListener("mouseout", () => {
    cursorGlow.style.opacity = '0';
  });

  const animateCursor = () => {
    cursorX += (pointerX - cursorX) * 0.18;
    cursorY += (pointerY - cursorY) * 0.18;
    cursorGlow.style.left = `${cursorX}px`;
    cursorGlow.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCursor);
  };

  animateCursor();
}

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar?.classList.add("shrink");
  } else {
    navbar?.classList.remove("shrink");
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) {
      const top = section.offsetTop - 140;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        document.querySelectorAll(".nav-link").forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
});

const themeButton = document.getElementById("theme");
if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const icon = themeButton.querySelector("i");
    icon.className = document.body.classList.contains("light")
      ? "fa-solid fa-sun"
      : "fa-solid fa-moon";
  });
}

const experienceButtons = document.querySelectorAll(".experience-card .text-button");
const experienceData = {
  "AVAS Flowers": {
    role: "Customer Experience & Order Processing",
    overview: "Supported high-volume order lifecycle management, customer issue resolution, and delivery coordination while staying calm under pressure.",
    positions: ["Customer Support Specialist", "Operations Support Partner"],
    responsibilities: [
      "Handled order-related concerns and customer communication.",
      "Coordinated delivery and issue follow-through.",
      "Maintained service consistency during busy periods."
    ],
    achievements: [
      "Improved resolution flow for time-sensitive customer requests.",
      "Strengthened remote collaboration between support and operations teams."
    ],
    technologies: ["CRM tools", "Ticketing systems", "Microsoft Office", "Google Workspace"],
    skills: ["Customer Experience", "Order Processing", "Problem Solving", "Team Coordination"],
    timeline: "Over multiple years supporting daily service operations"
  },
  "Carelon Global Solutions": {
    role: "Healthcare Provider Support",
    overview: "Delivered provider-focused support in healthcare services, including prerequisites for eligibility, claims review, and careful documentation.",
    positions: ["Healthcare Support Specialist", "Provider Services Support"],
    responsibilities: [
      "Reviewed and verified benefits, eligibility, and claims-related information.",
      "Supported authorization review and provider documentation workflows.",
      "Maintained compliance-aligned communication and handling procedures."
    ],
    achievements: [
      "Managed detailed review work with accuracy and consistency.",
      "Played a dependable role in high-trust healthcare support operations."
    ],
    technologies: ["Healthcare systems", "CRM workflow tools", "Microsoft Office", "Secure documentation tools"],
    skills: ["Healthcare Support", "Documentation", "HIPAA Awareness", "Provider Services"],
    timeline: "Professional healthcare support experience across long-running operations"
  },
  "RJ Glubos Solutions": {
    role: "Support Operations & Delivery Coordination",
    overview: "Built dependable support habits across service operations, keeping communications clear and work aligned with delivery expectations.",
    positions: ["Support Team Contributor", "Operations Support Partner"],
    responsibilities: [
      "Maintained steady support delivery across customer-facing operations.",
      "Worked closely with teams to keep workflows organized and timely.",
      "Supported day-to-day continuity with calm follow-through."
    ],
    achievements: [
      "Strengthened consistency in daily support routines.",
      "Helped reduce friction in cross-team handoffs."
    ],
    technologies: ["CRM systems", "Google Workspace", "Communication tools", "Workflow trackers"],
    skills: ["Remote Operations", "Support Coordination", "Reliability", "Communication"],
    timeline: "Experience in support-linked operational delivery and coordination"
  }
};

const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = `
  <div class="modal-card glass-card">
    <button class="modal-close" type="button" aria-label="Close profile">×</button>
    <div class="modal-body"></div>
  </div>
`;
document.body.appendChild(modal);

function closeModal() {
  modal.classList.remove("open");
}

function openModal(company) {
  const data = experienceData[company];
  if (!data) return;
  const body = modal.querySelector(".modal-body");
  body.innerHTML = `
    <p class="eyebrow"><i class="fa-solid fa-briefcase"></i> ${company}</p>
    <h3>${data.role}</h3>
    <p class="modal-overview">${data.overview}</p>
    <div class="modal-grid">
      <div>
        <h4>Positions Held</h4>
        <ul>${data.positions.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
      <div>
        <h4>Responsibilities</h4>
        <ul>${data.responsibilities.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
      <div>
        <h4>Achievements</h4>
        <ul>${data.achievements.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
      <div>
        <h4>Technologies Used</h4>
        <ul>${data.technologies.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
    </div>
    <div class="modal-foot">
      <div><h4>Key Skills Applied</h4><p>${data.skills.join(" • ")}</p></div>
      <div><h4>Timeline</h4><p>${data.timeline}</p></div>
    </div>
  `;
  modal.classList.add("open");
}

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

modal.querySelector(".modal-close").addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

experienceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const company = button.closest(".experience-card")?.dataset.company;
    if (company) openModal(company);
  });
});

document.addEventListener("click", (event) => {
  const toggle = event.target.closest(".case-toggle");
  if (!toggle) return;

  event.preventDefault();
  const card = toggle.closest(".case-card");
  if (card) {
    card.classList.toggle("open");
  }
});

const lightboxModal = document.createElement("div");
lightboxModal.className = "modal";
lightboxModal.innerHTML = `
  <div class="lightbox-card">
    <button class="lightbox-close" type="button" aria-label="Close image">×</button>
    <div class="lightbox-content">
      <button class="lightbox-image-close" type="button" aria-label="Close image">×</button>
      <img class="lightbox-image" src="" alt="" />
      <div class="lightbox-caption">
        <h3></h3>
        <p></p>
      </div>
    </div>
  </div>
`;
document.body.appendChild(lightboxModal);

function closeLightbox() {
  lightboxModal.classList.remove("open");
}

lightboxModal.addEventListener("click", (event) => {
  if (event.target === lightboxModal) {
    closeLightbox();
  }
});

lightboxModal.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightboxModal.querySelector(".lightbox-image-close").addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

document.querySelectorAll(".testimonial-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const imageUrl = link.getAttribute("href");
    const caption = link.dataset.caption || "";
    const detail = link.dataset.detail || "";
    const lightboxImage = lightboxModal.querySelector(".lightbox-image");
    const lightboxTitle = lightboxModal.querySelector(".lightbox-caption h3");
    const lightboxText = lightboxModal.querySelector(".lightbox-caption p");
    lightboxImage.src = imageUrl;
    lightboxImage.alt = caption;
    lightboxTitle.textContent = caption;
    lightboxText.textContent = detail;
    // Show image-close overlay only for the first two review images
    const imageClose = lightboxModal.querySelector('.lightbox-image-close');
    const showOverlay = /Avas-feedback\.png$|Avas-rating\.png$/.test(imageUrl);
    imageClose.style.display = showOverlay ? 'block' : 'none';
    lightboxModal.classList.add("open");
  });
});

const promptButtons = document.querySelectorAll(".prompt-pill");
const chatWindow = document.getElementById("chatWindow");
const responses = {
  "Tell me about Mary Jane.": "Mary Jane is a customer experience and operations professional with over 6 years of experience focused on support, healthcare-related workflows, and remote collaboration.",
  "Show customer service experience.": "Her background includes customer issue resolution, service continuity, order support, and maintaining calm, dependable communication in fast-moving environments.",
  "Show healthcare experience.": "She has worked in healthcare-facing support operations including provider services, eligibility and benefits verification, claims investigation, and documentation-oriented responsibilities.",
  "What leadership experience does she have?": "She has experience supporting team coordination, daily execution, and dependable collaboration, with a strong sense of accountability in service-driven work.",
  "What software does she use?": "She works comfortably with Microsoft Office, Google Workspace, CRM systems, Zoho, Canva, Zoom, and AI tools such as ChatGPT and Gemini.",
  "Why should we hire her?": "She brings calm problem-solving, strong service orientation, adaptability, and a consistent focus on quality, trust, and operational reliability."
};

promptButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const prompt = button.dataset.prompt;
    const userBubble = document.createElement("div");
    userBubble.className = "chat-bubble user";
    userBubble.innerHTML = `<p>${prompt}</p>`;
    chatWindow?.appendChild(userBubble);

    const assistantBubble = document.createElement("div");
    assistantBubble.className = "chat-bubble assistant";
    assistantBubble.innerHTML = "<p>Thinking�</p>";
    chatWindow?.appendChild(assistantBubble);

    setTimeout(() => {
      assistantBubble.innerHTML = `<p>${responses[prompt] || "I can help with that."}</p>`;
    }, 650);
  });
});

const particleCanvas = document.getElementById("particles");
if (particleCanvas) {
  const ctx = particleCanvas.getContext("2d");
  const particles = [];
  let width = window.innerWidth;
  let height = window.innerHeight;
  let centerX = width / 2;
  let centerY = height / 2;
  let pointerX = centerX;
  let pointerY = centerY;
  const depth = 1400;
  const particleCount = Math.min(120, Math.floor(width / 12));

  const createParticle = () => ({
    x: (Math.random() - 0.5) * width * 2,
    y: (Math.random() - 0.5) * height * 2,
    z: Math.random() * depth + 60,
    speed: Math.random() * 0.9 + 0.8,
    alpha: Math.random() * 0.5 + 0.2
  });

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    centerX = width / 2;
    centerY = height / 2;
    const dpr = window.devicePixelRatio || 1;
    particleCanvas.width = width * dpr;
    particleCanvas.height = height * dpr;
    particleCanvas.style.width = `${width}px`;
    particleCanvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles.length = 0;
    for (let i = 0; i < particleCount; i += 1) {
      particles.push(createParticle());
    }
  };

  window.addEventListener("mousemove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
  });

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    const cameraX = (pointerX - centerX) * 0.04;
    const cameraY = (pointerY - centerY) * 0.04;

    ctx.save();
    ctx.translate(cameraX, cameraY);

    particles.forEach((particle, index) => {
      particle.z -= particle.speed;
      if (particle.z < 60) {
        Object.assign(particle, createParticle(), { z: depth });
      }

      const scale = 300 / particle.z;
      const x = centerX + particle.x * scale;
      const y = centerY + particle.y * scale;
      const radius = Math.max(0.5, scale * 2.8);
      const opacity = particle.alpha * Math.min(1, (depth - particle.z) / depth + 0.35);

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(145, 193, 255, ${opacity})`;
      ctx.shadowColor = `rgba(145, 193, 255, ${opacity * 0.85})`;
      ctx.shadowBlur = radius * 2;
      ctx.fill();
      ctx.shadowBlur = 0;

      for (let j = index + 1; j < particles.length; j += 1) {
        const next = particles[j];
        const nextScale = 300 / next.z;
        const nextX = centerX + next.x * nextScale;
        const nextY = centerY + next.y * nextScale;
        const distance = Math.hypot(x - nextX, y - nextY);
        if (distance < 110) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(nextX, nextY);
          ctx.strokeStyle = `rgba(145, 193, 255, ${0.08 * (1 - distance / 110)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

    ctx.restore();
    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resize);
  resize();
  draw();
}

// Project Modal Functionality
const projectModal = document.getElementById("projectModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const clickableProjects = document.querySelectorAll(".clickable-project");

function openProjectModal(imageSrc) {
  if (projectModal && modalImage) {
    modalImage.src = imageSrc;
    projectModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeProjectModal() {
  if (projectModal) {
    projectModal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

clickableProjects.forEach((img) => {
  img.addEventListener("click", (e) => {
    openProjectModal(img.src);
  });
});

if (modalClose) {
  modalClose.addEventListener("click", closeProjectModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", closeProjectModal);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && projectModal?.classList.contains("active")) {
    closeProjectModal();
  }
});

const openSampleProjectsButton = document.getElementById("openSampleProjects");
const sampleProjectsDialog = document.getElementById("sampleProjectsDialog");
const closeSampleProjectsButton = document.getElementById("closeSampleProjects");
const sampleProjectGrid = document.querySelector(".sample-project-grid");
const sampleProjectPreview = document.getElementById("sampleProjectPreview");
const closeSampleProjectPreviewButton = document.getElementById("closeSampleProjectPreview");
const sampleProjectPreviewImage = document.getElementById("sampleProjectPreviewImage");
const sampleProjectPreviewTitle = document.getElementById("sampleProjectPreviewTitle");

openSampleProjectsButton.addEventListener("click", () => {
  sampleProjectsDialog.showModal();
});

closeSampleProjectsButton.addEventListener("click", () => {
  sampleProjectsDialog.close();
});

sampleProjectsDialog.addEventListener("click", (event) => {
  if (event.target === sampleProjectsDialog) {
    sampleProjectsDialog.close();
  }
});

sampleProjectGrid.addEventListener("click", (event) => {
  const projectCard = event.target.closest(".sample-project-card");
  if (!projectCard) return;

  const image = projectCard.querySelector("img");
  sampleProjectPreviewImage.src = image.src;
  sampleProjectPreviewImage.alt = image.alt;
  sampleProjectPreviewTitle.textContent = projectCard.dataset.title;
  sampleProjectPreview.showModal();
});

closeSampleProjectPreviewButton.addEventListener("click", () => {
  sampleProjectPreview.close();
});

sampleProjectPreview.addEventListener("click", (event) => {
  if (event.target === sampleProjectPreview) {
    sampleProjectPreview.close();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (sampleProjectPreview.open) {
    sampleProjectPreview.close();
  } else if (sampleProjectsDialog.open) {
    sampleProjectsDialog.close();
  }
});
