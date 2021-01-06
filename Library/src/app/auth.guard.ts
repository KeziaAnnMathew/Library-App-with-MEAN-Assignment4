import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {LibraryService} from './library.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private libraryservice:LibraryService,private router:Router){}
  canActivate():boolean{
    if(this.libraryservice.loggedIn())
    {
      return true;
    }
    else{
      this.router.navigate['/login']
      return false
    }
  }
  
}
