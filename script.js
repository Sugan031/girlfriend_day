const surpriseButton = document.getElementById("surpriseButton");
const surpriseModal = document.getElementById("surpriseModal");
const closeModal = document.getElementById("closeModal");
const complimentButton = document.getElementById("complimentButton");
const funOutput = document.getElementById("funOutput");
const meterButton = document.getElementById("meterButton");
const meterFill = document.getElementById("meterFill");
const meterLabel = document.getElementById("meterLabel");
const quizOptions = document.querySelectorAll(".quiz-option");
const quizResponse = document.getElementById("quizResponse");
const confettiLayer = document.getElementById("confettiLayer");
const animalButton = document.getElementById("animalButton");
const animalImage = document.getElementById("animalImage");
const animalTitle = document.getElementById("animalTitle");
const animalDescription = document.getElementById("animalDescription");
const girlfriendButton = document.getElementById("girlfriendButton");
const girlfriendImage = document.getElementById("girlfriendImage");
const flamesNameOne = document.getElementById("flamesNameOne");
const flamesNameTwo = document.getElementById("flamesNameTwo");
const flamesButton = document.getElementById("flamesButton");
const flamesResultTitle = document.getElementById("flamesResultTitle");
const flamesResultText = document.getElementById("flamesResultText");
const breakupQuestion = document.getElementById("breakupQuestion");
const breakupResponse = document.getElementById("breakupResponse");
const breakupNo = document.getElementById("breakupNo");
const breakupYes = document.getElementById("breakupYes");
const loveName = document.getElementById("loveName");
const loveZodiac = document.getElementById("loveZodiac");
const loveDob = document.getElementById("loveDob");
const loveMeterButton = document.getElementById("loveMeterButton");
const loveMeterFill = document.getElementById("loveMeterFill");
const loveMeterTitle = document.getElementById("loveMeterTitle");
const loveMeterText = document.getElementById("loveMeterText");

const compliments = [
  "Breaking news: your smile remains unfairly powerful.",
  "Scientists confirm you are 97% sunshine and 3% magic.",
  "You somehow make being adorable look effortless.",
  "Your laugh deserves its own world tour.",
  "Official report: you are the best part of my day."
];

const meterResults = [
  { width: "96%", text: "Result: wildly amazing." },
  { width: "98%", text: "Result: dangerously lovable." },
  { width: "99%", text: "Result: too cute for normal measurements." },
  { width: "100%", text: "Result: perfect score. No notes." }
];

const animals = [
  {
    name: "Rabbit",
    image: "assets/animals/rabbit.jpg",
    description: "Sweet, quick, affectionate, and impossible not to love for even one second."
  },
  {
    name: "Panda",
    image: "assets/animals/panda.jpg",
    description: "Soft, cozy, adorable, and somehow powerful just by existing."
  },
  {
    name: "Cat",
    image: "assets/animals/cat.jpg",
    description: "Elegant, chaotic, funny, and fully aware that you run the whole room."
  },
  {
    name: "Monkey",
    image: "assets/animals/monkey.jpg",
    description: "Playful, clever, curious, and always one step away from a hilarious idea."
  },
  {
    name: "Pig",
    image: "assets/animals/pig.jpg",
    description: "Round-cheeked joy, pure comfort, and a professional at being cute without trying."
  },
  {
    name: "Donkey",
    image: "assets/animals/donkey.jpg",
    description: "Strong, stubborn in the cutest way, and secretly one of the most lovable souls around."
  },
  {
    name: "Rat",
    image: "assets/animals/rat.jpg",
    description: "Tiny genius energy: fast, resourceful, and underestimated by people who just do not get it."
  }
];

const girlfriendImages = [
  "assets/girlfriends/amalpaul.jpg",
  "assets/girlfriends/eppo_varinga.jpg",
  "assets/girlfriends/jesse.jpg",
  "assets/girlfriends/nikki.jpg",
  "assets/girlfriends/shobana.jpg",
  "assets/girlfriends/vallavan_geetha.jpg",
  "assets/girlfriends/vani.jpg"
];

const flamesMeanings = {
  F: { label: "Friends", text: "You two are giving best-friends-with-chaos energy." },
  L: { label: "Love", text: "This one says love. Very dramatic. Very promising." },
  A: { label: "Affection", text: "Pure affection mode: soft, sweet, and dangerously cute." },
  M: { label: "Marriage", text: "The FLAMES universe just hinted at marriage. Big move." },
  E: { label: "Enemies", text: "Enemies... but in the flirty cartoon-chase kind of way." },
  S: { label: "Soulmates", text: "Soulmates. FLAMES has spoken and it was not subtle." }
};

const breakupSteps = [
  "Are you sure",
  "Wait do you mean it",
  "Nijamava",
  "Okay pa lets breakup",
  "Sorry for the trouble you have to stay with me forever"
];

let breakupStage = 0;
let breakupAccepted = false;
let loveMeterTimeout;

function toggleModal(show) {
  surpriseModal.classList.toggle("hidden", !show);
  surpriseModal.setAttribute("aria-hidden", String(!show));
}

function launchConfetti(count = 18) {
  const pieces = ["*", "+", "o", "~"];

  for (let index = 0; index < count; index += 1) {
    const confetti = document.createElement("span");
    confetti.className = "confetti";
    confetti.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDelay = `${Math.random() * 0.3}s`;
    confetti.style.fontSize = `${0.9 + Math.random() * 1.1}rem`;
    confettiLayer.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function setAnimalCard(animal) {
  animalImage.src = animal.image;
  animalImage.alt = animal.name;
  animalImage.classList.remove("hidden-image");
  animalTitle.textContent = `You are a ${animal.name}`;
  animalDescription.textContent = animal.description;
}

function setGirlfriendImage(image) {
  girlfriendImage.src = image;
  girlfriendImage.alt = "Random girlfriend type";
  girlfriendImage.classList.remove("hidden-image");
}

function updateNoButtonScale() {
  const scale = 1 + breakupStage * 0.18;
  breakupNo.style.transform = `scale(${scale})`;
}

function showLoveEnding() {
  breakupQuestion.textContent = "Very good";
  breakupResponse.textContent = "Love you 😘😘😘";
  breakupNo.hidden = true;
  breakupYes.hidden = true;
  launchConfetti(16);
}

function showAcceptanceEnding() {
  breakupQuestion.textContent = "Sorry for the trouble you have to stay with me forever";
  breakupResponse.textContent = "One last choice and then it is official.";
  breakupNo.textContent = "No, I accept";
  breakupYes.textContent = "Yes I accept";
  breakupAccepted = true;
}

function sanitizeName(value) {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

function normalizeText(value) {
  return value.trim().toLowerCase();
}

function resetLoveMeterAnimation() {
  clearTimeout(loveMeterTimeout);
  loveMeterFill.classList.remove("scanning", "beyond");
}

function showLoveMeterResult(percent, title, text) {
  resetLoveMeterAnimation();
  loveMeterFill.style.width = `${percent}%`;
  loveMeterTitle.textContent = title;
  loveMeterText.textContent = text;
}

function calculateLovePercent(name, zodiac, dob) {
  const seed = `${sanitizeName(name)}|${normalizeText(zodiac)}|${dob}`;
  let total = 0;

  for (let index = 0; index < seed.length; index += 1) {
    total += seed.charCodeAt(index) * (index + 3);
  }

  return 55 + (total % 44);
}

function isSpecialLoveMatch(name, zodiac, dob) {
  const allowedNames = ["suganthan", "suganth", "sugan", "surya", "sugu"];
  const normalizedName = sanitizeName(name);
  const normalizedZodiac = normalizeText(zodiac);

  return (
    allowedNames.includes(normalizedName) &&
    normalizedZodiac === "aries" &&
    dob === "2001-10-31"
  );
}

function calculateFlames(firstName, secondName) {
  const first = sanitizeName(firstName).split("");
  const second = sanitizeName(secondName).split("");

  for (let firstIndex = 0; firstIndex < first.length; firstIndex += 1) {
    const matchIndex = second.indexOf(first[firstIndex]);

    if (matchIndex !== -1) {
      first[firstIndex] = "";
      second[matchIndex] = "";
    }
  }

  const count =
    first.join("").length + second.join("").length;

  if (count === 0) {
    return flamesMeanings.S;
  }

  let flames = ["F", "L", "A", "M", "E", "S"];
  let index = 0;

  while (flames.length > 1) {
    index = (index + count - 1) % flames.length;
    flames.splice(index, 1);
  }

  return flamesMeanings[flames[0]];
}

surpriseButton.addEventListener("click", () => toggleModal(true));
closeModal.addEventListener("click", () => toggleModal(false));
complimentButton.addEventListener("click", () => {
  funOutput.textContent = randomItem(compliments);
  launchConfetti(14);
});

meterButton.addEventListener("click", () => {
  const result = randomItem(meterResults);
  meterFill.style.width = result.width;
  meterLabel.textContent = result.text;
  launchConfetti(10);
});

quizOptions.forEach((option) => {
  option.addEventListener("click", () => {
    quizResponse.textContent = "Correct. The judges also accepted: you, you, and obviously you.";
    launchConfetti(12);
  });
});

animalButton.addEventListener("click", () => {
  const animal = randomItem(animals);
  setAnimalCard(animal);
  launchConfetti(10);
});

girlfriendButton.addEventListener("click", () => {
  const image = randomItem(girlfriendImages);
  setGirlfriendImage(image);
  launchConfetti(10);
});

flamesButton.addEventListener("click", () => {
  const firstName = flamesNameOne.value.trim();
  const secondName = flamesNameTwo.value.trim();

  if (!firstName || !secondName) {
    flamesResultTitle.textContent = "Need two names";
    flamesResultText.textContent = "Add both names first, then I can reveal the FLAMES result.";
    return;
  }

  const result = calculateFlames(firstName, secondName);
  flamesResultTitle.textContent = result.label;
  flamesResultText.textContent = result.text;
  launchConfetti(12);
});

breakupNo.addEventListener("click", () => {
  if (breakupAccepted) {
    showLoveEnding();
    return;
  }

  if (breakupStage >= breakupSteps.length - 1) {
    showAcceptanceEnding();
    breakupResponse.textContent = "No, I accept. Excellent decision.";
    return;
  }

  showLoveEnding();
});

breakupYes.addEventListener("click", () => {
  if (breakupAccepted) {
    showLoveEnding();
    return;
  }

  if (breakupStage < breakupSteps.length - 1) {
    breakupStage += 1;
    breakupQuestion.textContent = breakupSteps[breakupStage - 1];
    breakupResponse.textContent = "Hmm. Think again.";
    updateNoButtonScale();
    return;
  }

  showAcceptanceEnding();
  updateNoButtonScale();
});

loveMeterButton.addEventListener("click", () => {
  const name = loveName.value.trim();
  const zodiac = loveZodiac.value.trim();
  const dob = loveDob.value;

  if (!name || !zodiac || !dob) {
    showLoveMeterResult(0, "Need all details", "Add name, zodiac, and date of birth first.");
    return;
  }

  resetLoveMeterAnimation();
  loveMeterFill.style.width = "0%";
  loveMeterFill.classList.add("scanning");
  loveMeterTitle.textContent = "Calculating...";
  loveMeterText.textContent = "Reading hearts, stars, and suspiciously accurate romance signals...";

  loveMeterTimeout = setTimeout(() => {
    if (isSpecialLoveMatch(name, zodiac, dob)) {
      resetLoveMeterAnimation();
      loveMeterFill.style.width = "100%";
      loveMeterFill.classList.add("beyond");
      loveMeterTitle.textContent = "He loves you beyond the meter";
      loveMeterText.textContent = "This reading broke the machine. It is way too much love to measure.";
      launchConfetti(18);
      return;
    }

    const percent = calculateLovePercent(name, zodiac, dob);
    showLoveMeterResult(
      percent,
      `${percent}% Love Detected`,
      "The meter has spoken. This looks very promising and a little dramatic."
    );
    launchConfetti(10);
  }, 2200);
});

surpriseModal.addEventListener("click", (event) => {
  if (event.target === surpriseModal) {
    toggleModal(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    toggleModal(false);
  }
});

meterLabel.textContent = "Result: off the charts, as expected.";
updateNoButtonScale();
