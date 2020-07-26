import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseHttpService } from 'src/app/expense-http.service';
import { GroupHttpService } from 'src/app/group-http.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit {

  public p: number = 1;
  public count: number = 10;

  public groupId: any;
  public groupName;
  public users = [];
  public lentArray = [];
  public spentArray = [];
  public expenseList = [];
  public totalExpOfGroup;

  constructor(private actRoute: ActivatedRoute, private expenseHttpService: ExpenseHttpService, private groupHttpService: GroupHttpService) { }

  ngOnInit() {
    this.groupId = this.actRoute.snapshot.paramMap.get('groupId');

    this.getSingleGroupDetails(this.groupId)
    this.getAllExpenseInThisGroup(this.groupId);
    this.groupOutstandingLent(this.groupId)
    this.groupOutstandingSpent(this.groupId)
  }


  public groupOutstandingLent = (groupId) => {
    this.groupHttpService.groupOutstandingLent(groupId).subscribe((apiresponse) => {
      this.lentArray = apiresponse.data;
      console.log("lent" + JSON.stringify(this.lentArray))
    });
  }
  public groupOutstandingSpent = (groupId) => {
    this.groupHttpService.groupOutstandingSpent(groupId).subscribe((apiresponse) => {
      this.spentArray = apiresponse.data;
      console.log("spent" + this.spentArray);

      let tA = 0;
      this.spentArray.forEach(ele => {
        tA += ele.totalAmountSpent;
      })
      this.totalExpOfGroup = tA;

    });

  }

  public getSingleGroupDetails = (groupId) => {
    this.groupHttpService.getSingleGroupDetails(groupId).subscribe((apiresponse) => {
      //console.log('expenses' + apiresponse.data);
      this.groupName = apiresponse.data.groupName;
      this.users = apiresponse.data.users;
      console.log(this.users)

    });
  }


  public getAllExpenseInThisGroup = (groupId) => {
    this.expenseHttpService.getAllExpensesInGroup(groupId).subscribe((apiresponse) => {
      console.log('expenses' + apiresponse.data);
      this.expenseList = apiresponse.data;

    });
  }

}
