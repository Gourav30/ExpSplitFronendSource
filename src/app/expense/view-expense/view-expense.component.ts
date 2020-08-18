import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseHttpService } from 'src/app/expense-http.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-view-expense',
  templateUrl: './view-expense.component.html',
  styleUrls: ['./view-expense.component.css']
})
export class ViewExpenseComponent implements OnInit {

  public p: number = 1;
  public count : number = 10;

  public expenseId: any;
  public paidByUsers = [];
  public spentByUsers =[];
  public expenseData;
  public expenseName: any;
  public expenseAmount: any;
  public expenseHistoryData;

  constructor(private actRoute: ActivatedRoute,
    private expenseHttpService: ExpenseHttpService,public location: Location)
     { }


  ngOnInit() {
    this.expenseId=this.actRoute.snapshot.paramMap.get('expenseId');

    this.getSingleExpenseDetails(this.expenseId);

    this.getExpenseHistory(this.expenseId);

  }


  public getExpenseHistory=(expenseId) =>{

    this.expenseHttpService.getExpenseHistory(expenseId).subscribe((apiresponse) => {
    this.expenseHistoryData=apiresponse.data;
    console.log("expenseHistoryData "+ JSON.stringify(this.expenseHistoryData))

  }
    )}

  public getSingleExpenseDetails = (expenseId) => {

    this.expenseHttpService.getSingleExpenseDetails(expenseId).subscribe((apiresponse) => {
      this.expenseData=apiresponse.data;

      let array1=apiresponse.data.paidBy;
      console.log("Expense paidBy:"+JSON.stringify(array1))
      array1.forEach(element => {
        this.paidByUsers.push({'userName':element.user.firstName,'amountLent':element.amountLent})
      });

      let array2=apiresponse.data.usersInvolved;
      array2.forEach(element => {
        this.spentByUsers.push({'userName':element.user.firstName,'amountSpent':element.amountSpent})
      });

      this.expenseAmount  = apiresponse.data.expenseAmount;
      this.expenseName  = apiresponse.data.expenseTitle;
    //  console.log('users: ' + this.users);
    });
  }
  public goBack() {
    this.location.back();
  }
}
