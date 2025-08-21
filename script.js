const equation = document.querySelector(".equation");
const calcResult = document.querySelector(".result");
const buttons = document.querySelectorAll(".button");
const delButton = document.querySelector(".button:nth-child(2)");
let prevInput = '';
let operation = '';
let currentInput = '';
let isParenthesOpen = false;

delButton.addEventListener("click", () => {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, 0);
        updateDisplay();
    } else if (operation) {
        operation = '';
        updateDisplay();
    } else if (prevInput.length > 0) {
        prevInput = prevInput.slice(0, 0);
        updateDisplay();
    }
});

function appendNumber(number) {
    if (!number || number === '') return;
    currentInput += number;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') return;
    if (prevInput !== '') {
        calc();
    }
    operation = op;
    prevInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function toggleParenthes() {
    if (isParenthesOpen) {
        currentInput += ")";
    } else {
        currentInput += "(";
    }
    isParenthesOpen = !isParenthesOpen;
    updateDisplay();
}

function calcPercentage() {
    if (currentInput === '') return;
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

function calc() {
    if (prevInput === '' || currentInput === '' || !operation) return;

    let result;
    const prev = parseFloat(prevInput);
    const current = parseFloat(currentInput);

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '−':
            result = prev - current;
            break;
        case '÷':
            if (current === 0) {
                calcResult.textContent = "Can't divide by Zero";
                clear();
                return;
            }
            result = prev / current;
            break;
        case 'X':
            result = prev * current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    calcResult.textContent = currentInput;
    operation = '';
    prevInput = '';
    updateDisplay();
}

function clear() {
    currentInput = '';
    operation = '';
    prevInput = '';
    isParenthesOpen = false;
    calcResult.textContent = '0';
    equation.textContent = '';
}

function updateDisplay() {
    calcResult.textContent = currentInput || (prevInput && operation ? '' : '0');
    equation.textContent = `${prevInput} ${operation} ${currentInput}`.trim();
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const pElement = button.querySelector('p');
        const value = pElement.textContent;

        if (!isNaN(parseInt(value)) || value === '0') {
            appendNumber(value);
        }
        else if (value === ".") {
            if (!currentInput.includes('.')) {
                appendNumber(value);
            }
        }
        else if (['+', '−', 'X', '÷'].includes(value)) {
            appendOperator(value);
        }
        else if (value === "C") {
            clear();
        }
        else if (value === "( )") {
            toggleParenthes();
        }
        else if (value === "%") {
            calcPercentage();
        }
        else if (value === "=") {
            calc();
        }
    });
});