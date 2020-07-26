import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpenseHttpService } from 'src/app/expense-http.service';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Location } from '@angular/common';
import { expenseData } from 'src/app/shared/expenseData';
import { GroupHttpService } from 'src/app/group-http.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css'],
  providers: [SocketService]
})
export class EditExpenseComponent implements OnInit {

  public expenseData;
  public expenseId;

  public expenseTitle: any;
  public expenseDescription: any;
  public expenseAmount: number;
  public paidBy = [];
  public usersInvolved = [];
  public createdBy: any;
  public updatedBy: any;
  public groupId: any;
  public groupName: string;

  public userId;
  public amountSpent: number;
  public amountLent: number;
  public allGroupUsers: any;
  public paidBySelectedUsers = [];
  public usersInvolvedSelected = [];

  constructor(public _route: ActivatedRoute, public router: Router,
    public expenseHttpService: ExpenseHttpService,
    public groupHttpService: GroupHttpService,
    public socketService: SocketService, public toastr: ToastrService,
    public location: Location) { }

  ngOnInit() {
    this.userId = Cookie.get('userId');
    this.updatedBy = Cookie.get('userId');
    this.expenseId = this._route.snapshot.paramMap.get('expenseId');
    this.getSingleExpenseDetails(this.expenseId);
  }


  public getSingleExpenseDetails = (expenseId) => {

    this.expenseHttpService.getSingleExpenseDetails(expenseId).subscribe((apiresponse) => {

      this.expenseData = apiresponse.data;
      this.groupId = apiresponse.data.groupId;
      this.expenseTitle = apiresponse.data.expenseTitle;
      this.expenseDescription = apiresponse.data.expenseDescription;
      this.expenseAmount = apiresponse.data.expenseAmount;

      this.getSingleGroupDetails(this.groupId);
      this.getAllUsersForGroup(this.groupId);
    })
  }


  public getSingleGroupDetails = (groupId) => {
    this.groupHttpService.getSingleGroupDetails(groupId).subscribe((apiresponse) => {
      this.groupName = apiresponse.data.groupName;
      console.log('group name - ' + this.groupName);
    })
  }
  public getAllUsersForGroup = (groupId) => {
    this.groupHttpService.getAllUsersForAGroup(groupId).subscribe((apiresponse) => {
      console.log('group' + apiresponse);
      this.allGroupUsers = apiresponse.data.users;
    });
  }


  // Edit code start

  public editExpense = () => {

    this.paidBy = [];
    this.usersInvolved = [];
    //this.updatedBy = '';

    let noOfPaidUsers = this.paidBySelectedUsers.length;

    this.amountLent = this.expenseAmount / noOfPaidUsers;

    console.log("paidBySelectedUsers" + this.paidBySelectedUsers)
    this.paidBySelectedUsers.forEach(element => {
      this.paidBy.push({ user: element, amountLent: this.amountLent })
    });

    console.log("paidBy" + this.paidBy);

    let noOfUsersInvolved = this.usersInvolvedSelected.length;

    this.amountSpent = this.expenseAmount / noOfUsersInvolved;

    this.usersInvolvedSelected.forEach(element => {
      this.usersInvolved.push({ user: element, amountSpent: this.amountSpent })
    });

      this.expenseData.expenseTitle = this.expenseTitle,
      this.expenseData.expenseDescription = this.expenseDescription,
      this.expenseData.expenseAmount = this.expenseAmount,
      this.expenseData.updatedBy = this.updatedBy,
      this.expenseData.paidBy = this.paidBy,
      this.expenseData.usersInvolved = this.usersInvolved


    this.expenseHttpService.updateExpense(this.expenseData).subscribe(
      data => {

        this.toastr.success(data.message);

        setTimeout(() => {
          this.router.navigate([`/viewgroup/${data.data.groupId}`]);
        }, 1000)
      },
      err => {
        this.toastr.error('some error occured');
      }
    )
  }
  //edit code is end


  //Delete code start

  public deleteExpense = () => {

    this.expenseHttpService.deleteExpense(this.expenseId).subscribe(

      data => {
        this.toastr.success(data.message);
        this.router.navigate(['/userdashboard']);
      },
      err => {
        this.toastr.error('some error occured');
      }
    )
  }

  public goBack() {
    this.location.back();
  }

  //Delete code end


  //logout code start

  public logout = () => {
    this.socketService.exitsocket();
    this.socketService.disconnectedSocket();
    Cookie.delete('authToken');
    Cookie.delete('userId');
    Cookie.delete('userName');
    this.toastr.success('logout successfully');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }

  // logout code end
}
