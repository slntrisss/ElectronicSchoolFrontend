import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginSuccess = 'http://localhost:4200/student';
  private loginPage = 'http://localhost:4200';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  public login(form: NgForm) : void{
    let login = form.value;
    this.loginService.checkCredentials(login).subscribe(
      response => {
        if(response === true) {
          window.location.href = this.loginSuccess
          console.log('Success')
        }
        else
          window.location.href = this.loginPage
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }
}
