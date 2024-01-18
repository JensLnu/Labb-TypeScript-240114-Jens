"use strict";
let amountInput = document.getElementById('amount');
let interestRateInput = document.getElementById('interestRate');
let repaymentPeriod = document.getElementById('repaymentPeriod');
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
// checks so user only puts in numbers in each inputfeild else makes it red
function validateUserInput(e, value) {
    const onlyNum = /^\d+$/;
    if (!onlyNum.test(value)) {
        e.currentTarget.classList.add('invalid-input');
    }
    else {
        e.currentTarget.classList.remove('invalid-input');
    }
}
// checks so all inputfields have numbers, if not lets the user know. else calls 'calculateLaon'
function checkAllUsersInput() {
    const messageElem = document.getElementById('message');
    let invalidInput = false;
    inputs.forEach(input => {
        if (input.classList.contains('invalid-input')) {
            invalidInput = true;
            input.classList.add('invalid-input-animation');
            setTimeout(() => {
                input.classList.remove('invalid-input-animation');
            }, 500);
        }
    });
    if (!invalidInput) {
        messageElem.textContent = '';
        calculateLoan();
    }
    else
        messageElem.textContent = 'You can only put numbers in each feild!';
}
// 
function calculateLoan() {
    console.log('calculateLoan');
    let p = Number(interestRateInput.value);
    let r = Number(amountInput.value) / 12;
    let n = Number(repaymentPeriod.value) * 12;
    let monthlyCost = p * (r * (1 + r) ^ n) / (1 + r) ^ n - 1;
    console.log(monthlyCost);
}
