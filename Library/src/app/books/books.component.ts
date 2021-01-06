import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from '../book.model';
import { LibraryService } from '../library.service';



@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  i:number=0
  books:BookModel[]|any;
  constructor(public libraryService:LibraryService,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.libraryService.getBooks().subscribe((data)=>{
      this.books= JSON.parse(JSON.stringify(data));
      
  })
}
getBookfn(item:BookModel){
  this.router.navigate([`/books/${item._id}`]);
}
deleteBookfn(item:BookModel){
  if(confirm("Are you sure you want to delete")){
  for(this.i=0;this.i<this.books.length;this.i++){
    if(item._id==this.books[this.i]._id){
      this.books.splice(this.i,1);
    }
  }
  this.libraryService.deleteBook(item._id).subscribe(()=>{
  })
  this.router.navigate(['/books']);
}
else{
  this.router.navigate(['/books']);
}
}
editBookfn(item:BookModel){
  this.router.navigate([`/editbook/${item._id}`]);
}
logoutUser(){
  localStorage.removeItem('token');
  localStorage.removeItem('admin');
  this.router.navigate(['/'])
}
}
