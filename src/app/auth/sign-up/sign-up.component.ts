import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm:FormGroup;
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'firstName' : new FormControl(null,Validators.required),
      'lastName' : new FormControl(null,Validators.required),
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'password' : new FormControl(null,[Validators.required]),
    });
  }

  onSubmit(){
    if(!this.signUpForm.valid){
      return alert('Please fill the form')
    }
    this.authService.signUpUser(this.signUpForm.value).subscribe(
      (result)=>{console.log(result)},
      (err)=>{
        if(err.error.code===11000){
          alert('User already taken')
        }
      }
    )
    this.signUpForm.reset()
  }
}
