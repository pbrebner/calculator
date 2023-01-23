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
        num2 == 0 ? result = 'Err, No dividing by zero' : result = divide(num1, num2);
    }
    return result
}

function populateDisplay (button, type) {

    //TODO: Not sure about behavior after htting equals sign where the next number is just appended on to the result
    
    if (display.innerHTML.includes('Err')) {
        display.innerHTML = '0';
    }

    if (type == 'decimal') {
        if (display.innerHTML.includes(".")) {
            return
        }
        else if(firstDigit == true) {
            display.innerHTML = '0' + button
            !displayValues.operator ? displayValues.num1 = display.innerHTML : displayValues.num2 = display.innerHTML
            firstDigit = false;
        }
        else {
            display.innerHTML += button;
            !displayValues.operator ? displayValues.num1 = display.innerHTML : displayValues.num2 = display.innerHTML
        }
    }
    else if (type == 'del') {
        if (display.innerHTML.length == 1) {
            display.innerHTML = '0'
        }
        else {
            display.innerHTML = display.innerHTML.slice(0,-1)
        }
        !displayValues.operator ? displayValues.num1 = display.innerHTML : displayValues.num2 = display.innerHTML
    }
    else if (type == 'number') {
        if (display.innerHTML == '0' || firstDigit == true) {
            display.innerHTML = button;
            !displayValues.operator ? displayValues.num1 = display.innerHTML : displayValues.num2 = display.innerHTML
            firstDigit = false;
        }
        else {
            display.innerHTML += button;
            !displayValues.operator ? displayValues.num1 = display.innerHTML : displayValues.num2 = display.innerHTML
        }
    }
    else {
        if(displayValues.operator && displayValues.num2) {
            let result = operate(displayValues.operator, displayValues.num1, displayValues.num2);
            if (typeof result == 'number') {
                result = Math.round(result*1000000) / 1000000;
            }
    
            display.innerHTML = result;
            displayValues = {num1: display.innerHTML, operator: button, num2: ''};
            firstDigit = true;
        }
        else {
            displayValues.operator = button;
            firstDigit = true;
        }
    }
}

const display = document.querySelector('.display');
let displayValues = 
{num1: display.innerHTML, operator: '', num2: ''};

const numberBtns = document.querySelectorAll('.numberBtn');
const operateBtns = document.querySelectorAll('.operateBtn');

const decimalBtn = document.querySelector('.decimalBtn')
const clearBtn = document.querySelector('.clearBtn');
const delBtn = document.querySelector('.delBtn');
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

decimalBtn.addEventListener('click', () => {
    decimal = decimalBtn.innerHTML;
    populateDisplay(decimal, 'decimal')
})

clearBtn.addEventListener('click', () => {
    display.innerHTML = '0';
    displayValues = {num1: display.innerHTML, operator: '', num2: ''};
})

delBtn.addEventListener('click', () => {
    del = delBtn.innerHTML;
    populateDisplay(del, 'del')
})

equalsBtn.addEventListener('click', () => {
    if (!displayValues.operator) {
        return
    }
    else if (!displayValues.num2) {
        displayValues.num2 = displayValues.num1;
    }

    let result = operate(displayValues.operator, displayValues.num1, displayValues.num2);
    if (typeof result == 'number') {
        result = Math.round(result*1000000) / 1000000;
    }    
    display.innerHTML = result;
    displayValues = {num1: display.innerHTML, operator: '', num2: ''};
})