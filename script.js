const openButton = document.getElementById("openInvite");
const cover = document.getElementById("cover");
const invitation = document.getElementById("invitation");

openButton.addEventListener("click", () => {
  cover.classList.add("opened");
  invitation.classList.add("visible");
  window.setTimeout(() => {
    document.getElementById("invitation").scrollIntoView({ behavior: "smooth" });
  }, 350);
});

// Reveal sections and programme entries as they enter the screen.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal, .timeline-item").forEach((item) => {
  observer.observe(item);
});

// Soft falling gold petals.
const petalLayer = document.getElementById("petalLayer");
const petalSymbols = ["✧", "❀", "✦"];

function createPetal() {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.setProperty("--drift", (Math.random() * 150 - 75) + "px");
  petal.style.animationDuration = (9 + Math.random() * 8) + "s";
  petal.style.fontSize = (10 + Math.random() * 12) + "px";
  petalLayer.appendChild(petal);
  window.setTimeout(() => petal.remove(), 18000);
}

window.setInterval(createPetal, 850);

// Keep the tradition list tidy: opening one closes the others.
const traditionCards = document.querySelectorAll(".tradition-card");
traditionCards.forEach((card) => {
  card.addEventListener("toggle", () => {
    if (card.open) {
      traditionCards.forEach((otherCard) => {
        if (otherCard !== card) otherCard.open = false;
      });
    }
  });
});

// Keep the celebrant photo placeholder visible when no celebrant.jpg is supplied.
const celebrantPhoto = document.querySelector(".celebrant-photo img");
if (celebrantPhoto) {
  celebrantPhoto.addEventListener("error", () => {
    celebrantPhoto.style.display = "none";
  });
}
