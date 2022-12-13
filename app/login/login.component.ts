import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private http: HttpClient) { }
  public validate:boolean = false;
  public loginForm !: FormGroup;
  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('',[Validators.required,Validators.email]),
        password: new FormControl('',[Validators.required,Validators.minLength(6)])
      }
    );
  }
  get formValue(){
    return this.loginForm.controls;
  }
  public errorMessage: string = '';
  onLogin(){
    this.http.post('http://localhost:3000/login',{
      user:this.loginForm.value.email,
      pass: this.loginForm.value.password
    }).subscribe(data =>{
      sessionStorage.setItem("isLogin",'true');
      this.router.navigateByUrl('/studentdetails');
      this.validate = true;
    },(error:HttpErrorResponse)=>{
      this.errorMessage=error.error
    })
    console.log(this.loginForm.value)
  }
}
