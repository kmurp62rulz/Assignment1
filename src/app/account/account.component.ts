import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

//defines user details stored in session that are used on the page
export class AccountComponent implements OnInit {

  username = sessionStorage.getItem('username');
  age = sessionStorage.getItem('age');
  email = sessionStorage.getItem('email');
  role = sessionStorage.getItem('role');
  session = null;

  constructor(private router: Router) { }

  //checks to see if there is information stored in session to start the session
  ngOnInit(){
    if (sessionStorage.length == 0){
      this.session = false;
      this.router.navigateByUrl('');
    } else {
      this.session = true;
    }
  }

//makes the details stored in session strings that can be updated
  public updateDetails() {

    sessionStorage.setItem('username', this.username.toString());
    sessionStorage.setItem('email', this.email.toString());
    sessionStorage.setItem('role', this.role.toString());
    
    this.router.navigateByUrl('profile');
  }

  //clears the sessions details and logs out the user returning them to the login page
  logout() {
    console.log('logged out');
    this.session = false;
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('');
  }


  //checks that the user is the appropriate role to access this page, if not sends them to a page with access denied message
  valid() {
    if (sessionStorage.getItem('role') == 'User') {
      
      this.router.navigateByUrl('/block');
    } else {
      this.router.navigateByUrl('/create');
    }
    
  }
}