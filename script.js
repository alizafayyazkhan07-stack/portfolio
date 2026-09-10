// --- EMAILJS CONFIGURATION ---
const EMAILJS_PUBLIC_KEY = "KyLn6dquIGBsru-8z";
const EMAILJS_SERVICE_ID = "service_3rw8a4l";
const EMAILJS_TEMPLATE_ID = "template_jstrimm";

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// Handle contact form submission
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.innerText = "Sending...";
  formStatus.textContent = "";
  formStatus.className = "form-status";

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
    .then(() => {
      formStatus.textContent = "Message received! I'll get back to you shortly.";
      formStatus.classList.add("success");
      contactForm.reset();
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      formStatus.textContent = "Transmission failed. Check internet or email me directly.";
      formStatus.classList.add("error");
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerText = "Send Message";
    });
});

// --- THEME TOGGLE ---
const themeToggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "light" || (!currentTheme && window.matchMedia("(prefers-color-scheme: light)").matches)) {
  document.body.classList.add("light");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
});

// --- MOBILE NAVIGATION ---
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// --- PROJECT FILTERING ---
const filterSelect = document.getElementById("filter");
const projectGrid = document.getElementById("projectGrid");

filterSelect.addEventListener("change", () => {
  const selected = filterSelect.value;
  Array.from(projectGrid.children).forEach((card) => {
    const category = card.getAttribute("data-tags") || "";
    card.style.display = (selected === "all" || category.includes(selected)) ? "flex" : "none";
  });
});

// --- SKILL BAR ANIMATIONS ---
const skillBars = document.querySelectorAll(".fill");

const skillObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      target.style.width = target.getAttribute("data-width");
      observer.unobserve(target);
    }
  });
}, { threshold: 0.4 });

skillBars.forEach(bar => skillObserver.observe(bar));

// --- FOOTER YEAR ---
document.getElementById("year").textContent = new Date().getFullYear();
