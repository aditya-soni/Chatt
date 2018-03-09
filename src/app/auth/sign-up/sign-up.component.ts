import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm:FormGroup;
  constructor() { }

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
    console.log(this.signUpForm.value);
    this.signUpForm.reset()
  }
}
