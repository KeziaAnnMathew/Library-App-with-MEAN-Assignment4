import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorModel } from '../author.model';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  i:number=0;
  authors:AuthorModel[]|any
  constructor(public libraryService:LibraryService,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.libraryService.getAuthors().subscribe((data)=>{
      this.authors= JSON.parse(JSON.stringify(data));
      
  })
}
getAuthorfn(item:AuthorModel){
  this.router.navigate([`/authors/${item._id}`]);
}
deleteAuthorfn(item:AuthorModel){
  if(confirm("Are you sure you want to delete")){
  for(this.i=0;this.i<this.authors.length;this.i++){
    if(item._id==this.authors[this.i]._id){
      this.authors.splice(this.i,1);
    }
  }
  this.libraryService.deleteAuthor(item._id).subscribe(()=>{
  })
  this.router.navigate(['/authors']);
}
else{
  this.router.navigate(['/authors']);
}
}
editAuthorfn(item:AuthorModel){
  this.router.navigate([`/editauthor/${item._id}`]);
}
logoutUser(){
  localStorage.removeItem('token');
  localStorage.removeItem('admin');
  this.router.navigate(['/'])
}
}

