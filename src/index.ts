import './style.css';

class Calculator {
  private display: HTMLDivElement;
  private currentValue: number;
  private previousValue: number;
  private operation: string;

  constructor() {
    this.display = document.querySelector('.display') as HTMLDivElement;
    this.currentValue = 0;
    this.previousValue = 0;
    this.operation = '';
  }

  private updateDisplay() {
    this.display.textContent = this.currentValue.toString();
  }

  private clearDisplay() {
    this.display.textContent = '0';
  }

  private addDigit(digit: string) {
    if (this.currentValue === 0) {
      this.currentValue = Number(digit);
    } else {
      this.currentValue = Number(`${this.currentValue}${digit}`);
    }
    this.updateDisplay();
  }

  private calculate() {
    switch (this.operation) {
      case '+':
        this.currentValue = this.previousValue + this.currentValue;
        break;
      case '-':
        this.currentValue = this.previousValue - this.currentValue;
        break;
      case '*':
        this.currentValue = this.previousValue * this.currentValue;
        break;
      case '/':
        this.currentValue = this.previousValue / this.currentValue;
        break;
      default:
        break;
    }
    this.operation = '';
    this.previousValue = 0;
    this.updateDisplay();
  }

  private setOperation(operation: string) {
    if (this.operation !== '') {
      this.calculate();
    }
    this.operation = operation;
    this.previousValue = this.currentValue;
    this.currentValue = 0;
  }

  public init() {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const value = button.textContent;
        if (/\d/.test(value)) {
          this.addDigit(value);
        } else if (value === 'C') {
          this.currentValue = 0;
          this.previousValue = 0;
          this.operation = '';
          this.clearDisplay();
        } else if (value === '=') {
          this.calculate();
        } else {
          this.setOperation(value);
        }
      });
    });
  }
}

const calculator = new Calculator();
calculator.init();
