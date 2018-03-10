import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  signInForm:FormGroup;
  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

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
    // console.log(this.signInForm.value);
    this.authService.signInUser(this.signInForm.value.email,this.signInForm.value.password).subscribe(
      (response)=>{
        // console.log(response)
        localStorage.setItem('token',response.token);
        localStorage.setItem('userId',response.userId);
        sessionStorage.setItem('token',response.token)
        this.router.navigate(['/']);
      },
      (err)=>console.error(err)
    )
    this.signInForm.reset();
  }

}
