// Script for Calculator Project

function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}

function operate(operator, num1, num2){
    num1 = Number(num1);
    num2 = Number(num2);

    if (operator == 'Add') {
        result = add(num1, num2);
    }
    else if (operator == 'Subtract') {
        result = subtract(num1, num2);
    }
    else if (operator == 'Multiply') {
        result = multiply(num1, num2);
    }
    else {
        result = divide(num1, num2);
    }

    return result
}

function populateDisplay (button, type) {
    if (display.innerHTML == '0' || firstDigit == true) {
        display.innerHTML = button;
        !displayValues.operator ? displayValues.num1 = display.innerHTML : displayValues.num2 = display.innerHTML
        firstDigit = false;
    }
    else if (type == 'number') {
        display.innerHTML += button;
        !displayValues.operator ? displayValues.num1 = display.innerHTML : displayValues.num2 = display.innerHTML
    }
    else if (type == 'operator' && displayValues.operator && displayValues.num2) {
        let result = operate(displayValues.operator, displayValues.num1, displayValues.num2);

        display.innerHTML = result;
        displayValues = {num1: display.innerHTML, operator: button, num2: ''};
        firstDigit = true;
    }
    else {
        displayValues.operator = button;
        firstDigit = true;
    }
}

const display = document.querySelector('.display');
let displayValues = 
{num1: display.innerHTML, operator: '', num2: ''};

const numberBtns = document.querySelectorAll('.numberBtn');
const operateBtns = document.querySelectorAll('.operateBtn');
const clearBtn = document.querySelector('.clearBtn');
const equalsBtn = document.querySelector('.equalsBtn');

numberBtns.forEach((item) => {
    item.addEventListener('click', () => {
        let number = item.innerHTML;
        populateDisplay(number, 'number')
    })
})

operateBtns.forEach((item) => {
    item.addEventListener('click', () => {
        let operator = item.innerHTML;
        populateDisplay(operator, 'operator')
    })
})

clearBtn.addEventListener('click', () => {
    display.innerHTML = '0';
    displayValues = {num1: display.innerHTML, operator: '', num2: ''};
})

equalsBtn.addEventListener('click', () => {

    let result = operate(displayValues.operator, displayValues.num1, displayValues.num2);

    display.innerHTML = result;
    displayValues = {num1: display.innerHTML, operator: '', num2: ''};
})