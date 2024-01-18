
let amountInput = document.getElementById('amount') as HTMLInputElement;
let interestRateInput = document.getElementById('interestRate') as HTMLInputElement;
let repaymentPeriod = document.getElementById('repaymentPeriod') as HTMLInputElement;

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

// checks so user only puts in numbers in each inputfeild else makes it red
function validateUserInput(e: any, value: string): void {
    const onlyNum: RegExp = /^\d+$/;
    if (!onlyNum.test(value)) {
        e.currentTarget.classList.add('invalid-input');
    } else {
        e.currentTarget.classList.remove('invalid-input');
    }
}

// checks so all inputfields have numbers, if not lets the user know. else calls 'calculateLaon'
function checkAllUsersInput(): void {
    const messageElem = document.getElementById('message') as HTMLParagraphElement;
    let invalidInput: boolean = false;
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
    } else messageElem.textContent = 'You can only put numbers in each feild!';
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