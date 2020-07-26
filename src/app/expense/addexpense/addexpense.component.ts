import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupHttpService } from 'src/app/group-http.service';
import { ExpenseHttpService } from 'src/app/expense-http.service';
import { CookieService } from 'ng2-cookies';
import { expenseData } from 'src/app/shared/expenseData';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocketService } from 'src/app/socket.service';


@Component({
  selector: 'app-addexpense',
  templateUrl: './addexpense.component.html',
  styleUrls: ['./addexpense.component.css'],
  providers: [SocketService, CookieService]
})
export class AddexpenseComponent implements OnInit {


  public expenseTitle: any;
  public expenseDescription: any;
  public expenseAmount: number;
  public PaidBy: Array<object> = [];
  public usersInvolved: Array<object> = [];
  public createdBy: any;
  public groupId: any;
  public groupName: string;

  public user_Id: any;
  public allGroupUsers: any;
  public amountSpent: number;
  public amountLent: number;
  public paidBySelectedUsers: Array<object>;
  public usersInvolvedSelected: Array<object>;
  public userId;

  constructor(public groupHttpService: GroupHttpService, public route: Router,
    public actRoute: ActivatedRoute, public cookieService: CookieService,
    public expenseHttpService: ExpenseHttpService, public socketService: SocketService,
    public toastr: ToastrService
  ) { }


  ngOnInit() {
    this.userId = this.cookieService.get('userId');
    this.groupId = this.actRoute.snapshot.paramMap.get('groupId');
    //console.log(this.groupId);
    this.user_Id = this.cookieService.get('_id');
    this.createdBy = this.user_Id;
    this.getSingleGroupDetails(this.groupId);
    this.getAllUsersForGroup(this.groupId);
  }

  public getSingleGroupDetails = (groupId) => {
    this.groupHttpService.getSingleGroupDetails(groupId).subscribe((apiresponse) => {
      this.groupName = apiresponse.data.groupName;
      //console.log(this.groupName);
    })
  }
  public getAllUsersForGroup = (groupId) => {
    this.groupHttpService.getAllUsersForAGroup(groupId).subscribe((apiresponse) => {
      //console.log('group' + apiresponse);
      this.allGroupUsers = apiresponse.data.users;
    });
  }


  // create expense code start

  public createExpense = () => {
    console.log(this.paidBySelectedUsers, this.usersInvolvedSelected)
    let noOfPaidUsers = this.paidBySelectedUsers.length;

    this.amountLent = this.expenseAmount / noOfPaidUsers;

    this.paidBySelectedUsers.forEach(element => {
      this.PaidBy.push({ user: element, amountLent: Math.round(this.amountLent) })
    });


    let noOfUsersInvolved = this.usersInvolvedSelected.length;

    this.amountSpent = this.expenseAmount / noOfUsersInvolved;

    this.usersInvolvedSelected.forEach(element => {
      this.usersInvolved.push({ user: element, amountSpent: Math.round(this.amountSpent) })
    });

    if (noOfPaidUsers <= 0 || noOfUsersInvolved <= 0) {
      this.toastr.warning('please select dropdowns');
    }
    else {
      const expenseData: expenseData = {
        groupId: this.groupId,
        expenseTitle: this.expenseTitle,
        expenseDescription: this.expenseDescription,
        expenseAmount: this.expenseAmount,
        createdBy: this.createdBy,
        paidBy: this.PaidBy,
        usersInvolved: this.usersInvolved
      };
      console.log(expenseData);
      this.expenseHttpService.createExpense(expenseData).subscribe((apiresponse) => {
        if (apiresponse) {
          console.log('creating exp api response: ' + apiresponse);
          this.toastr.success(apiresponse.message);
          this.route.navigate([`/viewgroup/${this.groupId}`]);
        }

      });
    }
  }
  // create expense code end
}
