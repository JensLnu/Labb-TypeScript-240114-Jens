// global references
const messageElem = document.getElementById('message') as HTMLParagraphElement;
const inputs = document.querySelectorAll('.inputs') as NodeListOf<HTMLInputElement>;

document.addEventListener('DOMContentLoaded', init);
// initiates base functionallity
function init(): void {
    inputs.forEach(input => {
        input.addEventListener('change', (e: Event) => {
            validateUserInput(e, input.value);
        });
    });
    let submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
    submitBtn.addEventListener('click', checkAllUsersInput);
}

// checks so user only puts in right numbers in each inputfeild
function validateUserInput(e: Event, value: string): void {
    const onlyNum: RegExp = /^\d+$/;
    const input: HTMLInputElement = e.target as HTMLInputElement;
    const numberValue: number = Number(value);
    if (input.classList.contains('amount') && (!onlyNum.test(value) || numberValue < 1 || numberValue > 100000000)) {
        wrongInput(input);
        messageElem.textContent = 'You can only take a loan between 1 - 100 000 000!';
    } else if (input.classList.contains('interestRate') && (!onlyNum.test(value) || numberValue < 0 || numberValue > 100)) {
        wrongInput(input);
        messageElem.textContent = 'You interest rate must be between 0 - 100!';
    } else if (input.classList.contains('repaymentPeriod') && (!onlyNum.test(value) || numberValue < 1 || numberValue > 100)) {
        wrongInput(input);
        messageElem.textContent = 'You are only allowed to take a loan with repayment period from 1 to 100 year!';
    }
    else { // rests feild
        input.classList.remove('invalid-input');
        messageElem.textContent = '';
    }
}

// shakes and makes inputfield red
function wrongInput(input: HTMLInputElement): void {
    input.classList.add('invalid-input', 'invalid-input-animation');
    setTimeout(() => {
        input.classList.remove('invalid-input-animation');
    }, 500);
}

// checks so all inputfields have numbers, if not lets the user know. else calls 'calculateLaon'
function checkAllUsersInput(): void {
    let invalidInput: boolean = false;
    inputs.forEach(input => {
        if (input.classList.contains('invalid-input') || input.value === '') {
            invalidInput = true;
            wrongInput(input);
        }
    });
    if (!invalidInput) {
        messageElem.textContent = '';
        calculateLoan();
    } else messageElem.textContent = 'You have to put in only numbers in each feild!';
}

// get user input and calculate monthly cost
function calculateLoan(): void {
    const amountInput = document.getElementById('amount') as HTMLInputElement;
    const interestRateInput = document.getElementById('interestRate') as HTMLInputElement;
    const repaymentPeriod = document.getElementById('repaymentPeriod') as HTMLInputElement;
    let p: number = Number(amountInput.value);
    let r: number = Number(interestRateInput.value) / 12 / 100;
    let n: number = Number(repaymentPeriod.value) * 12;
    let monthlyCost: number = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    printLoanDetail(monthlyCost, p, r);
}

// print & calculate loan detail
function printLoanDetail(monthlyCost: number, totalAmount: number, rate:number): void {
    // references
    const loanDataContainer = document.getElementById('display-data-container') as HTMLDivElement;
    const printPlaces = document.querySelectorAll('.loan-data p') as NodeListOf<HTMLParagraphElement>;
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
    let numberOfMonth: number = 1;
    let loanAmount: number = totalAmount;
    while (loanAmount > 1) {
        month.innerHTML += `<br>${numberOfMonth}.`;
        numberOfMonth++;
        paymentPerMonth.innerHTML += `<br>${monthlyCost.toFixed(2)}`;
        interestCost.innerHTML += `<br>${(loanAmount * rate).toFixed(2)}`;
        loanAmount += (loanAmount * rate) - monthlyCost;
        amountLeft.innerHTML += `<br>${loanAmount.toFixed(2)}`;
    }
}