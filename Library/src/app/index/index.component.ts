import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from '../book.model';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  title:string ="Athenaeum";
  books:BookModel[] | undefined;
  constructor(public libraryService:LibraryService, private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
   this.libraryService.getBooks().subscribe((data)=>{
     this.books= JSON.parse(JSON.stringify(data));
   })
  }
  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    this.router.navigate(['/'])
  }

}
