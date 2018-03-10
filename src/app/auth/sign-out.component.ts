import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-sign-out',
  template: `<button type='button' (click)="logOut()" class="btn btn-danger"> Log Out</button> `
})
export class SignOutComponent implements OnInit {

  constructor(
      private router:Router,
      private authService:AuthService
  ) { }

  ngOnInit() {
    //   localStorage.removeItem('token');/
  }

  logOut(){
      this.authService.logOutUser();
      this.router.navigate(['/auth']);
  }
}
