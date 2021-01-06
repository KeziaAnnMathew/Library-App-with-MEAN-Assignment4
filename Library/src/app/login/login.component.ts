import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide=true;
  user={
    uname:'',
    password:''
  }
  errorval:boolean;
  constructor(private libraryservice:LibraryService,private router:Router) { }

  ngOnInit(): void {
  }
  validateUser(){
    this.libraryservice.validateUser(this.user)
    .subscribe(res=>{
      if(res==null){
          this.errorval=true
          setTimeout(()=>{
            this.errorval = false;
       }, 2000);
      }
      if(res.doc,res.token){
        if(res.doc.permission=="admin"){
          localStorage.setItem('token',res.token)
          localStorage.setItem('admin',"admin")
          this.router.navigate(['/']);
        }
        else{
        console.log(res.doc.permission)
        localStorage.setItem('token',res.token)
      this.router.navigate(['/']);
        }
      }
    })
    
  }
}
