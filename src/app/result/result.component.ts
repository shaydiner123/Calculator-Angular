import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  result: string;
  @ViewChild('resultContainer', { static: true }) resultContainer: ElementRef;
  @ViewChild('resultDiv', { static: true }) resultDiv: ElementRef;

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit(): void {
    this.result = '0';
    this.calculatorService.numData.subscribe((num: string) => {
      this.result = this.getNumberWithCommas(num);
    });
  }

  ngAfterViewChecked() {
    let widthContainer = +this.resultContainer.nativeElement.clientWidth;
    let resultLength = +this.resultDiv.nativeElement.innerHTML.length;
    let resultWidth = +this.resultDiv.nativeElement.clientWidth;
    if (resultWidth >= widthContainer) {
      while (resultWidth >= widthContainer) {
        this.resultDiv.nativeElement.style.fontSize =
          0.99 * +this.resultDiv.nativeElement.style.fontSize.split('rem')[0] +
          'rem';
        resultWidth = +this.resultDiv.nativeElement.clientWidth;
      }
    } else if (resultLength * 64 <= widthContainer) {
      this.resultDiv.nativeElement.style.fontSize = '4rem';
    }
  }

  getNumberWithCommas(num: String) {
    let parts = num.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}
