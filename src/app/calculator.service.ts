import { OnInit, Injectable, ɵɵpureFunctionV } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CalculatorService implements OnInit {
  private firstNumber = { num: '0' };
  private secondNum = { num: '' };
  private result = { num: '' };
  private operation = { btn: '' };
  private currentStage: any = this.firstNumber;

  private _numSubject = new Subject<string>();
  numData = this._numSubject.asObservable();

  ngOnInit(): void {}

  calculate(btnValue: string): void {
    if (btnValue === 'C') {
      this[btnValue]();
      this._numSubject.next(this.getNumerToDisplay().num);
      return;
    }
    if (btnValue === '%' || btnValue === '+-') {
      let currentDisplayedNum = this.convertCurrentNum(btnValue);
      this._numSubject.next(currentDisplayedNum);
      return;
    }
    if (!this.isDoubleClickOnKeyOperation(btnValue)) {
      this.goToNextStageIfNedded(btnValue);
      this.initBtns(btnValue);
      this.executeOperationIfNeeded();
      this._numSubject.next(this.getNumerToDisplay().num);
    }
  }

  isDoubleClickOnKeyOperation(btn: string): boolean {
    return (
      (this.currentStage === this.operation && /^(\=|\+|\-|X|\/)$/.test(btn)) ||
      (this.currentStage === this.firstNumber && btn === '=')
    );
  }

  executeOperationIfNeeded() {
    if (this.currentStage === this.secondNum) {
      this[this.operation.btn]();
    }
  }

  getNumerToDisplay(): { num: string } {
    if (this.currentStage === this.result) {
      return this.firstNumber;
    }
    if (this.currentStage === this.operation) {
      if (this.secondNum.num !== '') return this.secondNum;
      else return this.firstNumber;
    }
    return this.currentStage;
  }

  initBtns(btn: string): void {
    if (
      this.currentStage === this.operation ||
      this.currentStage === this.result
    ) {
      this.operation.btn = btn;
      if (this.currentStage === this.result) {
        this.firstNumber.num = this.result.num;
        this.currentStage = this.firstNumber;
        this.secondNum.num = '';
        this.result.num = '';
      }
      return;
    }
    if (this.currentStage === this.firstNumber && this.operation.btn === '=') {
      if (btn !== '.') this.firstNumber.num = '0';
      this.operation.btn = '';
    }
    this.addDigitOrDot(btn);
  }

  goToNextStageIfNedded(btn: string): void {
    let isFuncionKey = /^(\+|\-|X|\/)$/.test(btn);
    if (this.currentStage === this.firstNumber && isFuncionKey) {
      this.currentStage = this.operation;
    } else if (
      this.currentStage === this.firstNumber &&
      this.operation.btn === '='
    ) {
      return;
    } else if (
      this.currentStage === this.firstNumber &&
      this.operation.btn !== ''
    ) {
      this.currentStage = this.secondNum;
    } else if (this.currentStage === this.result && isFuncionKey) {
      this.currentStage = this.operation;
    } else if (
      this.currentStage === this.secondNum &&
      (isFuncionKey || btn === '=')
    ) {
      this.currentStage = this.result;
    } else if (this.currentStage === this.result && !isFuncionKey) {
      this.currentStage = this.firstNumber;
    } else if (
      this.currentStage === this.operation &&
      this.firstNumber.num !== ''
    ) {
      this.currentStage = this.secondNum;
    }
  }

  addDigitOrDot(btn: string): void {
    let currentStage = this.currentStage;
    if (btn === '.') {
      currentStage.num.includes('.') ? '' : (currentStage.num += btn);
    } else if (btn === '0') {
      currentStage.num === '0' ? '' : (currentStage.num += btn);
    } else {
      if (currentStage.num === '0') currentStage.num = btn;
      else currentStage.num += btn;
    }
  }

  convertCurrentNum(btnValue: string): string {
    let operation = btnValue === '%' ? 0.01 : -1;
    let currentNum: { num: string } = this.getNumerToDisplay();
    currentNum.num = +currentNum.num * operation + '';
    //update the result number if needed
    if (this.result.num !== '') {
      this[this.operation.btn]();
    }
    return currentNum.num;
  }

  '+'(): string {
    this.result.num =
      Number(this.firstNumber.num) + Number(this.secondNum.num) + '';
    return this.result.num;
  }

  '-'(): string {
    this.result.num =
      Number(this.firstNumber.num) - Number(this.secondNum.num) + '';
    return this.result.num;
  }
  X(): string {
    this.result.num =
      Number(this.firstNumber.num) * Number(this.secondNum.num) + '';
    return this.result.num;
  }
  '/'(): string {
    this.result.num =
      Number(this.firstNumber.num) / Number(this.secondNum.num) + '';
    return this.result.num;
  }

  C() {
    if (this.currentStage === this.firstNumber) {
      this.firstNumber.num = '0';
      this.operation.btn = '';
      return;
    }
    if (this.currentStage === this.operation) {
      this.operation.btn = '';
      this.currentStage = this.firstNumber;
      return;
    }
    if (this.currentStage === this.secondNum) {
      this.secondNum.num = '';
      this.currentStage = this.operation;
      return;
    }
    //currentStage=result
    this.currentStage = this.firstNumber;
    this.firstNumber.num = '0';
    this.result.num = '';
    this.secondNum.num = '';
    this.operation.btn = '';
  }
}
