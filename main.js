const billAmountInput = document.getElementById("bill-amount");
// Select all buttons inside the .tip-buttons container
const tipButtons = document.querySelectorAll(".tip-buttons-wrap .tip-button");

// Select the custom tip input
const customTipInput = document.getElementById("custom-tip");

// Select the elements to display the tip amount and total amount
const tipAmountDisplay = document.querySelector(".tip-amount-wrap .tip-amount");
const totalAmountDisplay = document.querySelector(".total-amount");
const numOfPeople = document.getElementById("people");
const inputDivPeople = document.querySelector(".input-div-people");
const errorText = document.querySelector(".error-txt-msg");

// Select the reset button
const resetButton = document.querySelector(".right-reset-button");

// Select the overlay element
const overlay = document.getElementById("overlay");

// Function to validate inputs
function validateInputs() {
  const billAmount = parseFloat(billAmountInput.value);
  const people = parseFloat(numOfPeople.value);

  if (isNaN(billAmount) || billAmount <= 0) {
    alert("Please enter a valid bill amount");
    
    return false;
  }

  if (isNaN(people) || people <= 0) {
    inputDivPeople.classList.add("error");
    errorText.style.display = "block";
    setTimeout(() => {
      inputDivPeople.classList.remove("error");
      errorText.style.display = "none";
    }, 3000);
    return false;
  }

  return true;
}

// Function to calculate the tip amount and total cost per person
function calculateTipAmount(tipPercentage, isDollarAmount = false) {
  if (!validateInputs()) return;

  const billAmount = parseFloat(billAmountInput.value);
  const people = parseFloat(numOfPeople.value);

  const tipAmount = billAmount * (tipPercentage / 100);
  const tipPerPerson = tipAmount / people;
  const totalAmount = billAmount + tipAmount;
  const totalPerPerson = totalAmount / people;

  tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
}

// Add an event listener for each tip button element
tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!validateInputs()) return;

    const tipPercentage = parseFloat(button.textContent);
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    calculateTipAmount(tipPercentage);
    if (customTipInput.value) {
      customTipInput.value = "";
      tipButtons.forEach((btn) => btn.classList.remove("active"));
    }
  });
});

// Add an event listener for the custom tip input
customTipInput.addEventListener("input", () => {
  if (!validateInputs()) return;

  const customTipPercentage = parseFloat(customTipInput.value);
  if (!isNaN(customTipPercentage) && customTipPercentage >= 0) {
    calculateTipAmount(customTipPercentage);
  }

  if (customTipPercentage === 0) {
    let newCustomDivMsg = document.createElement("div");
    newCustomDivMsg.innerHTML = `
    <div class="custom-tip-zero-msg">
      <div class="custom-circle-div">
        <div class="custom-sub-div">
          <img class="" src="./assets/Group 1261157452.png">
        </div>
      </div>
        <img class="custom-tip-zero-img" src="./assets/Screenshot_2024-09-29_152710-removebg-preview.png">
        <p>Pwase leave a tip?</p>
            <button class="close-btn">X</button>
            <div class="yes-no-wrap">
                <button class="yes-btn">Yes</button>
                <button class="no-btn">No</button>
            </div>
        </div>`;

    // selecting our container element
    let container = document.querySelector(".container");

    container.appendChild(newCustomDivMsg);

    // Show the overlay
    overlay.style.display = "block";

    const addEventListeners = () => {
      // adding event listener to the close button
      const closeBtn = newCustomDivMsg.querySelector(".close-btn");
      closeBtn.addEventListener("click", () => {
        newCustomDivMsg.remove();
        // Hide the overlay
        overlay.style.display = "none";
      });

      // adding event listener to the yes button
      const yesBtn = newCustomDivMsg.querySelector(".yes-btn");
      yesBtn.addEventListener("click", () => {
        newCustomDivMsg.remove();
        customTipInput.value = "";
        // Hide the overlay
        overlay.style.display = "none";
      });

      // adding event listener to the no button
      const noBtn = newCustomDivMsg.querySelector(".no-btn");
      noBtn.addEventListener("click", () => {
        newCustomDivMsg.innerHTML = `<div class="custom-tip-zero-msg">
        <div class="custom-circle-div">
        <div class="custom-sub-div">
          <img class="" src="./assets/Group 1261157452.png">
        </div>
      </div>
        <img class="custom-tip-zero-img" src="./assets/Screenshot 2024-09-30 140200.png">
            <p>If you're broke just say that!</p>
            <button class="close-btn">X</button>
            <div class="yes-no-wrap">
                <button class="yes-btn">Yes</button>
                <button class="no-btn">No</button>
            </div>
        </div>`;
        // Have to call the function
        addEventListeners();
      });
    };
    addEventListeners();
  }
});

// Add an event listener for the custom tip input focus event
customTipInput.addEventListener("focus", () => {
  tipButtons.forEach((btn) => btn.classList.remove("active"));
});

// Add an event listener for the number of people input
numOfPeople.addEventListener("input", () => {
  if (!validateInputs()) return;

  const activeButton = document.querySelector(".tip-button.active");
  if (activeButton) {
    const tipPercentage = parseFloat(activeButton.textContent);
    calculateTipAmount(tipPercentage);
  } else {
    const customTipPercentage = parseFloat(customTipInput.value);
    if (!isNaN(customTipPercentage) && customTipPercentage >= 0) {
      calculateTipAmount(customTipPercentage);
    }
  }
});

// Add an event listener for the reset button
resetButton.addEventListener("click", () => {
  // Reset all input fields
  billAmountInput.value = "";
  customTipInput.value = "";
  numOfPeople.value = "";

  // Reset displayed amounts
  tipAmountDisplay.textContent = "$0.00";
  totalAmountDisplay.textContent = "$0.00";

  // Remove active states from tip buttons
  tipButtons.forEach((btn) => btn.classList.remove("active"));

  // Remove error states
  inputDivPeople.classList.remove("error");
  errorText.style.display = "none";
});
