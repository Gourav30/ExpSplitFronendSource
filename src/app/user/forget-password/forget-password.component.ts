import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserHttpService } from 'src/app/user-http.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  public email: any;
  public resetPasswordToken: any;
  public password: any;

  constructor(

    public toastr: ToastrService,
    public service: UserHttpService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  //send code is start
  public sendToken = () => {
    if (!this.email) {
      this.toastr.warning('Enter Your Email');
    }
    else {
      this.service.sendResetToken(this.email).subscribe(
        data => {
          this.toastr.success(data.message);

        },
        err => {
          this.toastr.error('some error occured');
        }
      )
    }
  }
  //send code is end

  //resetpassword code start
  public resetpassword = () => {
    if (!this.resetPasswordToken) {
      this.toastr.warning('Enter Your reset Code');
    }
    else if (!this.password) {
      this.toastr.warning('Enter Your password');
    }
    else {
      let data = {
        password: this.password,
        resetPasswordToken: this.resetPasswordToken
      }

      this.service.resetPassword(data).subscribe(
        data => {
          this.toastr.success(data.message);
          setTimeout(()=>{
            this.router.navigate(['/login']);
          },1000)
        },
        err => {
          this.toastr.error('some error occured');
        }
      )
    }
  }
  //resetpassword code end
}
