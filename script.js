class Calculator {
  constructor(prevOperTextElem, currOperTextElem) {
    this.prevOperTextElem = prevOperTextElem;
    this.currOperTextElem = currOperTextElem;
    this.clear();
  }

  

  clear() {
    this.currOper = '';
    this.prevOper = '';
    this.operation = undefined;
  }

  delete() {
    this.currOper = this.currOper.toString().slice(0, -1);
  }
  
  appendNumber(number) {
    if (number === '.' && this.currOper.includes('.')) return ;
    this.currOper = this.currOper.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currOper === '') return;
    if (this.prevOper !== '') {
      this.compute(); 
    };
    this.operation = operation;
    this.prevOper = this.currOper;
    this.currOper = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOper);
    const current = parseFloat(this.currOper);

    if (isNaN(prev) || isNaN(current)) return;
    
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currOper = computation;
    this.operation = undefined;
    this.prevOper = '';
  }

  getDisplayNumber(num) {
    const stringNum = num.toString();
    const integerDigit = parseFloat(stringNum.split('.')[0]);
    const decimalDigit = stringNum.split('.')[1];

    let integerDisplay;
    if (isNaN(integerDigit)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigit.toLocaleString('en', {maximumFractionDigits: 0})
    }
    if (decimalDigit != null) {
      return `${integerDisplay}.${decimalDigit}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currOperTextElem.innerText = 
      this.getDisplayNumber(this.currOper);
    if (this.operation != null) {
      this.prevOperTextElem.innerText = 
        `${this.getDisplayNumber(this.prevOper)} ${this.operation}`;
    } else {
      this.prevOperTextElem.innerText = '';
    }

  }
}

let currOper = '';

const numberBtns = document.querySelectorAll('[data-number]'),
  opertarionBtns = document.querySelectorAll('[data-operation]'),
  equalsBtn = document.querySelector('[data-equals]'),
  deleteBtn = document.querySelector('[data-delete]'),
  allClearbtn = document.querySelector('[data-all-clear]'),
  currOperTextElem = document.querySelector('[data-curr]'),
  prevOperTextElem = document.querySelector('[data-prev]');


const calculator = new Calculator(prevOperTextElem, currOperTextElem);

numberBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  });
});


opertarionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
  });
});


equalsBtn.addEventListener('click', btn => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearbtn.addEventListener('click', btn => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener('click', btn => {

  calculator.delete();
  calculator.updateDisplay();
});