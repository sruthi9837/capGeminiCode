import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/data.service';
import { account } from '../interfaces/account'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private bottomarrow: boolean = true;
  private bottomarrowCash: boolean = true;
  private count: number = 5;
  private data: any;
  private accountHeaderHover:string = "";
  private accountNoHeaderHeaderHover:string = "";


  constructor(private _accountService: AccountService) {

  }

  ngOnInit() {
    this._accountService.getData().subscribe(accounts => {
      this.data = accounts;
    });
  }

  sorting(type: string) {
    this.accountHeaderHover = "header-grey";
    this.accountNoHeaderHeaderHover = "";
    if (type == "asc")
      this.bottomarrow = false;
    else
      this.bottomarrow = true
    let AccAmount: any = [];
    this.data.forEach(element => {
      AccAmount.push(+element.Account.split("-")[1]);
    });
    if (type == "asc")
      AccAmount.sort(function (a: number, b: number) { return a - b });
    else
      AccAmount.sort(function (a: number, b: number) { return b - a });
    let arrangedData: any = [];
    this.data.forEach(element => {
      let accountVal = +element.Account.split("-")[1];
      let index = AccAmount.indexOf(accountVal);
      if (arrangedData[index] == undefined)
        arrangedData[index] = element;
      else
        arrangedData[index + 1] = element;
    });
    this.data = arrangedData;

  }

  sortingCash(type: string) {
    this.accountHeaderHover = "";
    this.accountNoHeaderHeaderHover = "header-grey";
    if (type == "asc")
      this.bottomarrowCash = false;
    else
      this.bottomarrowCash = true;

    let AccAmount: any = [];
    this.data.forEach(element => {
      let cash = element.Available_Cash.split(" ")[1];
      cash = cash.replace(/,/g, '');
      AccAmount.push(+cash);
    });
    if (type == "asc")
      AccAmount.sort(function (a: number, b: number) { return a - b });
    else
      AccAmount.sort(function (a: number, b: number) { return b - a });
    let arrangedData: any = [];
    this.data.forEach(element => {
      let accountVal = element.Available_Cash.split(" ")[1];
      accountVal = accountVal.replace(/,/g, '');
      let index = AccAmount.indexOf(+accountVal);
      if (arrangedData[index] == undefined)
        arrangedData[index] = element;
      else
        arrangedData[index + 1] = element;
    });
    this.data = arrangedData;
  }

  loadMoreRecords() {
    this.count = this.data.length;
  }


}
