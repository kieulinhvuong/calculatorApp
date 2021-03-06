const keys = document.querySelector('.calculator-keys');
const output = document.querySelector('#output');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const outputResult = output.textContent;
        const prevKey = keys.dataset.prevKey;

        if (!action) {
            if (outputResult === '0' || prevKey === 'operator') {
                keys.dataset.prevKey = 'number';
                output.textContent = keyContent;
            }
            else {
                output.textContent = outputResult + keyContent;
            }
        }
        else {
            if (action === 'add' || action === 'subtract' ||
                action === 'multiply' || action === 'divide') {
                keys.dataset.prevKey = 'operator';
                keys.dataset.firstNum = outputResult;
                keys.dataset.operator = action;
            }
            else if (action === 'decimal') {
                keys.dataset.prevKey = 'decimal';
                if (!outputResult.includes('.')) {
                    output.textContent = outputResult + '.';
                }
            }
            else if (action === 'equal') {
                keys.dataset.prevKey = "equal";
                const firstNum = keys.dataset.firstNum;
                const operator = keys.dataset.operator;
                const secondNum = outputResult;
                output.textContent = calculate(firstNum, operator, secondNum);
            }
            else if (action === 'del') {
                keys.dataset.prevKey = "del";
                output.textContent = outputResult.slice(0, -1);
            }
            else if (action === 'reset') {
                keys.dataset.prevKey = "reset";
                keys.dataset.firstNum = '';
                keys.dataset.operator = '';
                keys.dataset.secondNum = '';
                keys.dataset.prevKey = '';
                output.textContent = '0';
            }
        }
    }
})

const calculate = (firstNum, operator, secondNum) => {
    let result = '';
    if (operator === 'add') {
        result = parseFloat(firstNum) + parseFloat(secondNum);
    }
    else if (operator === 'subtract') {
        result = parseFloat(firstNum) - parseFloat(secondNum);
    }
    else if (operator === 'multiply') {
        result = parseFloat(firstNum) * parseFloat(secondNum);
    }
    else if (operator === 'divide') {
        result = parseFloat(firstNum) / parseFloat(secondNum);
    }
    else if (!operator) {
        result = outputResult;
    }
    return result;
}

