import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http'
import { LibraryService } from './library.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }
  intercept(req:any,next:any){
    let  authService=this.injector.get(LibraryService)
    // let  addService=this.injector.get(LibraryService)
    let tokenizedrequest=req.clone(
      {
        setHeaders:{
          Authorization:`Bearer ${authService.getToken()}`
        }
      }
    )
    return next.handle(tokenizedrequest)
  }
}
