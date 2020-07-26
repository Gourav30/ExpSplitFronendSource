import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { UserHttpService } from 'src/app/user-http.service';
import { userData } from '../../shared/userData';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
    user: userData;

  constructor(private _route: ActivatedRoute, private UserHttpService: UserHttpService,
    private router: Router, private toastr: ToastrService) {
    this.user = this.UserHttpService.userValue;
  }

  ngOnInit() {
  }
  //logout code start
  public logout = () => {
    Cookie.delete('authToken');
    Cookie.delete('_id');
    Cookie.delete('userId');
    Cookie.delete('userName');
    this.toastr.success('logout successfully');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
  //logout code end

}
