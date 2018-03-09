import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  signInForm:FormGroup;
  constructor() { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'password' : new FormControl(null,[Validators.required]),
    });
  }

  onSubmit(){
    if(!this.signInForm.valid){
      return alert('Please fill the form')
    }
    console.log(this.signInForm.value);
    this.signInForm.reset();
  }

}
