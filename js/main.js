"use strict";
// global references
const messageElem = document.getElementById('message');
const inputs = document.querySelectorAll('.inputs');
init();
// initiates base functionallity
function init() {
    inputs.forEach(input => {
        input.addEventListener('change', (e) => {
            validateUserInput(e, input.value);
        });
    });
    let submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', checkAllUsersInput);
}
// checks so user only puts in right numbers in each inputfeild
function validateUserInput(e, value) {
    const onlyNum = /^\d+$/;
    const input = e.target;
    const numberValue = Number(value);
    if (input.classList.contains('amount') && (!onlyNum.test(value) || numberValue < 1 || numberValue > 100000000)) {
        wrongInput(input);
        messageElem.textContent = 'You can only take a loan between 1 - 100 000 000!';
    }
    else if (input.classList.contains('interestRate') && (!onlyNum.test(value) || numberValue < 0 || numberValue > 100)) {
        wrongInput(input);
        messageElem.textContent = 'You interest rate must be between 0 - 100!';
    }
    else if (input.classList.contains('repaymentPeriod') && (!onlyNum.test(value) || numberValue < 1 || numberValue > 100)) {
        wrongInput(input);
        messageElem.textContent = 'You are only allowed to take a loan with repayment period from 1 to 100 year!';
    }
    else {
        input.classList.remove('invalid-input');
        messageElem.textContent = '';
    }
}
// shakes and makes inputfield red
function wrongInput(input) {
    input.classList.add('invalid-input', 'invalid-input-animation');
    setTimeout(() => {
        input.classList.remove('invalid-input-animation');
    }, 500);
}
// checks so all inputfields have numbers, if not lets the user know. else calls 'calculateLaon'
function checkAllUsersInput() {
    let invalidInput = false;
    inputs.forEach(input => {
        if (input.classList.contains('invalid-input') || input.value === '') {
            invalidInput = true;
            wrongInput(input);
        }
    });
    if (!invalidInput) {
        messageElem.textContent = '';
        calculateLoan();
    }
    else
        messageElem.textContent = 'You have to put in only numbers in each feild!';
}
// get user input and calculate monthly cost
function calculateLoan() {
    const amountInput = document.getElementById('amount');
    const interestRateInput = document.getElementById('interestRate');
    const repaymentPeriod = document.getElementById('repaymentPeriod');
    let p = Number(amountInput.value);
    let r = Number(interestRateInput.value) / 12 / 100;
    let n = Number(repaymentPeriod.value) * 12;
    let monthlyCost = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    printLoanDetail(monthlyCost, p, r);
}
// print & calculate loan detail
function printLoanDetail(monthlyCost, totalAmount, rate) {
    // references
    const loanDataContainer = document.getElementById('display-data-container');
    const printPlaces = document.querySelectorAll('.loan-data p');
    const month = printPlaces[0];
    const paymentPerMonth = printPlaces[1];
    const interestCost = printPlaces[2];
    const amountLeft = printPlaces[3];
    // resets feild
    month.textContent = 'Month';
    paymentPerMonth.textContent = 'Payment';
    interestCost.textContent = 'Interest cost';
    amountLeft.textContent = 'Amount left';
    loanDataContainer.classList.remove('display-none');
    let numberOfMonth = 1;
    let loanAmount = totalAmount;
    while (loanAmount > 1) {
        month.innerHTML += `<br>${numberOfMonth}.`;
        numberOfMonth++;
        paymentPerMonth.innerHTML += `<br>${monthlyCost.toFixed(2)}`;
        interestCost.innerHTML += `<br>${(loanAmount * rate).toFixed(2)}`;
        loanAmount += (loanAmount * rate) - monthlyCost;
        amountLeft.innerHTML += `<br>${loanAmount.toFixed(2)}`;
    }
}
