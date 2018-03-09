import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-out',
  template: `<button type='button' class="btn btn-danger"> Log Out</button> `
})
export class SignOutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
