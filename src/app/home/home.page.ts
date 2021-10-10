import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  value = '0';
  toOperateWith = parseFloat('0');
  toOperate = '+';
  readyForNewInput = true;

  numberGroups = [
    ['c',' ',' ','/'],
    [7, 8, 9, '*'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, ',', '%', '=']
  ];

  onButtonPress(symbol) {
    if (isNaN(parseInt(symbol))) {
      switch (symbol) {
        case '=':
          this.doCalc();
          this.toOperateWith = parseFloat('0');
          this.toOperate = '+';
          break;
        case 'c':
          this.value = '0';
          this.readyForNewInput = true;
          break;
        case ' ':
          break;
        case ',':
          this.value += '' + '.';
          break;
        case '%':
          this.value = '' + (parseFloat(this.value) / 100);
          break;
        default:
          this.doOperator(symbol);
          break;
      }
    }
    else { // Zahlen abhandeln
      if (this.readyForNewInput) { // Erste Ziffer
        this.value = '' + symbol;
        this.readyForNewInput = false;
      } else {
        this.value += '' + symbol;
      }
    }
  }

  doOperator(symbol) {
    this.doCalc();
    this.toOperateWith = parseFloat(this.value);
    this.toOperate = symbol;
  }

  doCalc() {
    this.readyForNewInput = true;
    switch (this.toOperate) {
      case '+':
        this.value = '' + (this.toOperateWith + parseFloat(this.value));
        console.log('Rechne: ' + this.toOperateWith + '+' + parseFloat(this.value));
        break;
      case '-':
        console.log('Rechne: ' + this.toOperateWith + '-' + parseFloat(this.value));
        this.value = '' + (this.toOperateWith - parseFloat(this.value));
        break;
      case '*':
        console.log('Rechne: ' + this.toOperateWith + '*' + parseFloat(this.value));
        this.value = '' + (this.toOperateWith * parseFloat(this.value));
        break;
      case '/':
        console.log('Rechne: ' + this.toOperateWith + '/' + parseFloat(this.value));
        this.value = '' + (this.toOperateWith / parseFloat(this.value));
        break;
      default:
        break;
    }
  }
}
