
// Blacksmith - Assignment 3

// Plan:
// - Get the buttons and the heat input.
// - Check the heat amount before adding it.
// - Use the game functions for the three actions.
// - Update the page after each action.

// Get the parts of the page that show the forge.
const $forge = document.querySelector("#forge");
const $heatValue = document.querySelector("#heat-value");
const $swordCount = document.querySelector("#sword-count");
const $forgeStatus = document.querySelector("#forge-status");
const $forgeImage = document.querySelector("#forge-image");
const $actionMessage = document.querySelector("#action-message");

// Get the controls.
const $heatInput = document.querySelector("#heat-input");
const $addHeatButton = document.querySelector("#add-heat-button");
const $makeSwordButton = document.querySelector("#make-sword-button");
const $resetForgeButton = document.querySelector("#reset-forge-button");

// Starting values.
let forgeHeat = 20;
let swordsMade = 0;

// Check the forge status.
function getForgeStatus(heatValue) {
  if (heatValue < 30) {
    return "Too cold";
  } else if (heatValue < 70) {
    return "Ready to forge";
  } else {
    return "Roaring fire";
  }
}

// Update the numbers, status, and forge picture.
function updateForge() {
  $heatValue.textContent = forgeHeat;
  $swordCount.textContent = swordsMade;

  const status = getForgeStatus(forgeHeat);
  $forgeStatus.textContent = status;

  // Remove the old class before adding the new one.
  $forge.classList.remove("is-cold", "is-ready", "is-roaring");

  if (status === "Too cold") {
    $forge.classList.add("is-cold");
    $forgeImage.src = "assets/forge-cold.svg";
    $forgeImage.alt = "A stone forge with dark coals and no flames";

  } else if (status === "Ready to forge") {
    $forge.classList.add("is-ready");
    $forgeImage.src = "assets/forge-ready.svg";
    $forgeImage.alt = "A stone forge with a small orange fire";

  } else {
    $forge.classList.add("is-roaring");
    $forgeImage.src = "assets/forge-roaring.svg";
    $forgeImage.alt = "A stone forge with tall bright flames and sparks";
  }
}

// Put everything back to the beginning.
function resetForge() {
  forgeHeat = 20;
  swordsMade = 0;

  $heatInput.value = "";
  $actionMessage.textContent = "";

  updateForge();
}

// Add heat, but don't go over 100.
function heatForge(amount) {
  forgeHeat = Math.min(forgeHeat + amount, 100);

  $actionMessage.textContent =
    `Heating complete. The forge is at ${forgeHeat} heat.`;

  updateForge();
}

// Make a sword if there's enough heat.
function makeSword() {
  if (forgeHeat >= 30) {
    forgeHeat -= 30;
    swordsMade += 1;

    $actionMessage.textContent = "Sword crafted successfully.";

  } else {
    $actionMessage.textContent =
      "Not enough heat. Add more heat to make a sword.";
  }

  updateForge();
}

// Add heat button:
// Read the number, check it, then add it if it's valid.
$addHeatButton.addEventListener("click", function () {
  const inputValue = $heatInput.value.trim();
  const amount = Number(inputValue);

  if (
    inputValue === "" ||
    !Number.isFinite(amount) ||
    !Number.isInteger(amount) ||
    amount <= 0
  ) {
    $actionMessage.textContent =
      "Please enter a positive whole number.";
    return;
  }

  heatForge(amount);
});

// Make sword button:
// The function checks if there's enough heat.
$makeSwordButton.addEventListener("click", function () {
  makeSword();
});

// Reset button:
// Start over and clear the message.
$resetForgeButton.addEventListener("click", function () {
  resetForge();
});

// Show the starting forge when the page opens.
resetForge();

