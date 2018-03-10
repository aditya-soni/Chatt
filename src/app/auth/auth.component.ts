import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  // loggedIn:Boolean = false;
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit() {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}
