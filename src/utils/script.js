const invitationContent = document.querySelector("#invitationContent");
const openInvitationButton = document.querySelector("#openInvitation");
const musicButton = document.querySelector("#musicButton");
const weddingMusic = document.querySelector("#weddingMusic");

const weddingDate = new Date("2026-05-08T09:00:00+08:00").getTime();
let hasStartedMusic = false;

const guestList = {
  "steven-wijaya-dan-ibu": "Steven Wijaya dan ibu",
  "dani-karel-dan-ibu": "Dani karel dan ibu",
  "kris-halim-dan-ibu": "Kris Halim dan ibu",
  "ibu-jumiaty": "Ibu jumiaty",
  "aryani-dan-suami": "Aryani dan suami",
  "crew-hollywood": "Crew Hollywood",
  "crew-aneka-murah": "Crew aneka murah",
};

function setGuestName() {
  const params = new URLSearchParams(window.location.search);
  const guest = params.get("to");

  if (guest) {
    const guestKey = guest.trim().toLowerCase();
    const guestName = guestList[guestKey] || guest.replaceAll("-", " ");

    document.querySelector("#guestName").textContent = guestName;
  }
}

function updateCountdown() {
  const now = Date.now();
  const distance = weddingDate - now;

  if (distance <= 0) {
    document.querySelector("#days").textContent = "00";
    document.querySelector("#hours").textContent = "00";
    document.querySelector("#minutes").textContent = "00";
    document.querySelector("#seconds").textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.querySelector("#days").textContent = String(days).padStart(2, "0");
  document.querySelector("#hours").textContent = String(hours).padStart(2, "0");
  document.querySelector("#minutes").textContent = String(minutes).padStart(2, "0");
  document.querySelector("#seconds").textContent = String(seconds).padStart(2, "0");
}

async function toggleMusic() {
  if (weddingMusic.paused) {
    await playMusic();
  } else {
    weddingMusic.pause();
    musicButton.classList.remove("is-playing");
    hasStartedMusic = false;
  }
}

async function playMusic() {
  try {
    weddingMusic.loop = true;
    await weddingMusic.play();
    hasStartedMusic = true;
    musicButton.classList.add("is-playing");
  } catch {
    musicButton.classList.remove("is-playing");
  }
}

openInvitationButton.addEventListener("click", async () => {
  invitationContent.scrollIntoView({ behavior: "smooth" });
  await playMusic();
});

musicButton.addEventListener("click", toggleMusic);

["click", "touchstart", "keydown", "scroll"].forEach((eventName) => {
  window.addEventListener(eventName, () => {
    if (!hasStartedMusic) {
      playMusic();
    }
  }, { once: true, passive: true });
});

setGuestName();
updateCountdown();
playMusic();
setInterval(updateCountdown, 1000);
