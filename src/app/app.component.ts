import { Component, OnInit } from '@angular/core';
import { CalculatorService } from './calculator.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CalculatorService],
})
export class AppComponent implements OnInit {
  btns: string[];
  constructor(private calculatorService: CalculatorService) {}

  ngOnInit(): void {
    this.btns = [
      'C',
      '+-',
      '%',
      '/',
      '7',
      '8',
      '9',
      'X',
      '4',
      '5',
      '6',
      '-',
      '1',
      '2',
      '3',
      '+',
      '0',
      '.',
      '=',
    ];
  }
}
