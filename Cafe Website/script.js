// ========== NAVBAR TOGGLE (MOBILE) ==========
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinkItems = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close menu on link click (mobile)
navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll("section[id]");
const options = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute("id");
    const navItem = document.querySelector(`.nav-link[href="#${id}"]`);
    if (navItem && entry.isIntersecting) {
      navLinkItems.forEach((link) => link.classList.remove("active"));
      navItem.classList.add("active");
    }
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
});

// ========== MENU DATA & FILTERING ==========
const menuData = [
  // Coffee
  {
    category: "coffee",
    name: "Espresso Shot",
    price: "₹120",
    desc: "Rich, bold, and intense single shot of espresso.",
    tags: ["Hot", "Strong"],
  },
  {
    category: "coffee",
    name: "Cappuccino",
    price: "₹180",
    desc: "Espresso with steamed milk and creamy foam.",
    tags: ["Hot", "Classic"],
  },
  {
    category: "coffee",
    name: "Caramel Latte",
    price: "₹220",
    desc: "Silky latte with caramel drizzle on top.",
    tags: ["Hot", "Sweet"],
  },
  {
    category: "coffee",
    name: "Iced Vanilla Cold Brew",
    price: "₹230",
    desc: "Slow-brewed coffee served over ice with vanilla.",
    tags: ["Iced", "Smooth"],
  },
  // Tea
  {
    category: "tea",
    name: "Masala Chai",
    price: "₹140",
    desc: "Strong Indian tea brewed with spices and milk.",
    tags: ["Hot", "Spiced"],
  },
  {
    category: "tea",
    name: "Jasmine Green Tea",
    price: "₹160",
    desc: "Soothing green tea infused with jasmine.",
    tags: ["Hot", "Light"],
  },
  {
    category: "tea",
    name: "Lemon Ginger Detox",
    price: "₹150",
    desc: "Refreshing herbal blend with lemon and ginger.",
    tags: ["Herbal", "Detox"],
  },
  // Snacks
  {
    category: "snacks",
    name: "Garlic Herb Fries",
    price: "₹170",
    desc: "Crispy fries tossed in garlic and mixed herbs.",
    tags: ["Veg", "Crispy"],
  },
  {
    category: "snacks",
    name: "Paneer Tikka Sandwich",
    price: "₹210",
    desc: "Grilled sandwich filled with spiced paneer.",
    tags: ["Veg", "Spicy"],
  },
  {
    category: "snacks",
    name: "Chicken Mayo Croissant",
    price: "₹230",
    desc: "Buttery croissant stuffed with creamy chicken filling.",
    tags: ["Non-Veg", "Soft"],
  },
  // Desserts
  {
    category: "desserts",
    name: "Classic Tiramisu",
    price: "₹260",
    desc: "Coffee-soaked sponge layered with mascarpone.",
    tags: ["Coffee", "Creamy"],
  },
  {
    category: "desserts",
    name: "Chocolate Lava Cake",
    price: "₹240",
    desc: "Warm cake with a gooey chocolate center.",
    tags: ["Chocolate", "Warm"],
  },
  {
    category: "desserts",
    name: "Berry Cheesecake Jar",
    price: "₹220",
    desc: "Creamy cheesecake layered with berry compote.",
    tags: ["Fruity", "Jar"],
  },
];

const menuGrid = document.getElementById("menu-items");
const menuTabBtns = document.querySelectorAll(".menu-tab-btn");

function renderMenu(category = "coffee") {
  menuGrid.innerHTML = "";

  const filtered = menuData.filter((item) => item.category === category);

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.classList.add("menu-card");

    card.innerHTML = `
      <div class="menu-card-header">
        <div>
          <h3>${item.name}</h3>
          <p class="menu-desc">${item.desc}</p>
        </div>
        <span class="menu-price">${item.price}</span>
      </div>
      <div class="menu-tag-row">
        <div class="menu-tags">
          ${item.tags
            .map((tag) => <span class="menu-tag">${tag}</span>)
            .join("")}
        </div>
        <span class="menu-tag">⭐ Popular</span>
      </div>
    `;

    menuGrid.appendChild(card);
  });
}

// Initialize menu
renderMenu();

menuTabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    menuTabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const category = btn.getAttribute("data-category");
    renderMenu(category);
  });
});

// ========== REVIEWS SLIDER ==========
const reviews = [
  {
    name: "Ananya Sharma",
    rating: "4.9",
    text: "The ambience is perfect for working or catching up with friends. The hazelnut latte is a must-try!",
    visited: "Visited last week",
  },
  {
    name: "Rahul Verma",
    rating: "4.8",
    text: "Their sandwiches and cold brews are amazing. Staff is super friendly and the place feels like home.",
    visited: "Regular customer for 6 months",
  },
  {
    name: "Sophia D’Souza",
    rating: "5.0",
    text: "One of the coziest cafés in town. Love the desserts and the weekend live music sessions.",
    visited: "Visited on a Saturday evening",
  },
];

let currentReviewIndex = 0;
const reviewWrapper = document.querySelector(".review-card-wrapper");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

function renderReview(index) {
  const review = reviews[index];
  reviewWrapper.innerHTML = `
    <div class="review-card">
      <div class="review-card-header">
        <span class="review-name">${review.name}</span>
        <span class="review-rating">${review.rating} ★</span>
      </div>
      <p class="review-text">“${review.text}”</p>
      <p class="review-meta">${review.visited}</p>
    </div>
  `;
}

renderReview(currentReviewIndex);

prevBtn.addEventListener("click", () => {
  currentReviewIndex =
    (currentReviewIndex - 1 + reviews.length) % reviews.length;
  renderReview(currentReviewIndex);
});

nextBtn.addEventListener("click", () => {
  currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
  renderReview(currentReviewIndex);
});

// ========== CONTACT FORM (DEMO ONLY) ==========
// ========== CONTACT / BOOKING FORM (AJAX submit to booking.php) ==========
/*
  This code will:
  - find the form (id "booking-form" preferred; falls back to "contact-form")
  - POST via fetch to booking.php (expects JSON response)
  - show messages in #form-status
*/
// ========== CONTACT / BOOKING FORM (AJAX submit to booking.php) ==========
(function () {
  const bookingForm = document.getElementById("booking-form") || document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (!bookingForm || !formStatus) return; // nothing to do

  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // basic client-side validation (HTML also validates)
    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      return;
    }

    // Find submit button (disable while sending)
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-disabled', 'true');
    }

    formStatus.textContent = "Submitting...";
    formStatus.style.color = "#f3b26b";

    const formData = new FormData(bookingForm);

    try {
      const res = await fetch("booking.php", {
        method: "POST",
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        throw new Error("Invalid server response.");
      }

      if (res.ok && data && data.success) {
        formStatus.textContent = data.message || "Thanks! Your booking request has been received.";
        formStatus.style.color = "#7cf29c";
        bookingForm.reset();
      } else {
        const msg = (data && data.message) ? data.message : "Submission failed. Please try again.";
        formStatus.textContent = msg;
        formStatus.style.color = "#ff6b6b";
      }
    } catch (err) {
      console.error("Booking submit error:", err);
      formStatus.textContent = "Network or server error. Try again later.";
      formStatus.style.color = "#ff6b6b";
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-disabled');
      }
    }
  });
})();


// ========== FOOTER YEAR ==========
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
// Ensure hero image has a minimum visual height on mobile
function adjustHeroHeight() {
  const heroImg = document.querySelector('.hero-image-wrapper');
  if (!heroImg) return;
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  if (vw < 420) {
    heroImg.style.height = '220px';
  } else if (vw < 768) {
    heroImg.style.height = '280px';
  } else {
    heroImg.style.height = ''; // let CSS control for larger screens
  }
}
window.addEventListener('resize', adjustHeroHeight);
window.addEventListener('load', adjustHeroHeight);
