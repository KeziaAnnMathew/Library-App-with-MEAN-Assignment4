import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from '../library.service';
import { UserModel } from '../user.model';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { CustomValidationService } from '../custom-validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide=true;
  hidea=true;
  userItem=new UserModel('','','','','');
  confirmpassword='';
  registerForm:FormGroup
  constructor(private libraryService:LibraryService,private router:Router,private formBuilder:FormBuilder,private customValidator:CustomValidationService) { }

  ngOnInit(): void {
    this.registerForm =this.formBuilder.group({
      'fname':[this.userItem.fname,[Validators.required]],
      'lname':[this.userItem.lname,[Validators.required]],
      'username':[this.userItem.username,[Validators.required]],
      'email':[this.userItem.email,[Validators.required,Validators.email]],
      'password':[this.userItem.password,[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      'confirmpassword':[this.confirmpassword,[Validators.required]]
    },{
      validator:this.customValidator.passwordMatchValidator('password','confirmpassword')
    })
  }
  Adduser(){
    this.libraryService.newUser(this.userItem);
    alert("successfully Registered");
    this.router.navigate(['/login']);
  }

}
