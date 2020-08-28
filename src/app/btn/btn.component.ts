import { Component, OnInit, Input } from '@angular/core';
import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.css'],
})
export class BtnComponent implements OnInit {
  @Input() btn: string;
  btnClasses;
  constructor(private calculatorService: CalculatorService) {}

  ngOnInit(): void {
    this.btnClasses = {
      operatorsButtons: /^(\=|\+|\-|X|\/)$/.test(this.btn),
      functionsButtons: /^(C|AC|\%|\+\-)$/.test(this.btn),
    };
  }

  calculate(event, btnValue: string): void {
    event.stopPropagation();
    this.calculatorService.calculate(btnValue);
  }
}
