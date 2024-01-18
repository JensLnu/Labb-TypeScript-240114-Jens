
const amountInput = document.getElementById('amount') as HTMLInputElement;
const interestRateInput = document.getElementById('interestRate') as HTMLInputElement;
const repaymentPeriod = document.getElementById('repaymentPeriod') as HTMLInputElement;

const messageElem = document.getElementById('message') as HTMLParagraphElement;

const inputs = document.querySelectorAll('.inputs') as NodeListOf<HTMLInputElement>;

init();

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
function validateUserInput(e: any, value: string): void {
    const onlyNum: RegExp = /^\d+$/;
    const input: any = e.target;
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
    else {
        input.classList.remove('invalid-input');
        messageElem.textContent = '';
    }
}

// shakes and makes inputfield red
function wrongInput(input: any): void {
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

// 
function calculateLoan() {
    console.log('calculateLoan');
    let p: number = Number(interestRateInput.value);
    let r: number = Number(amountInput.value) / 12;
    let n: number = Number(repaymentPeriod.value) * 12;
    let monthlyCost: number = p * (r * (1 + r) ^ n) / (1 + r) ^ n - 1;
    console.log(monthlyCost)
}