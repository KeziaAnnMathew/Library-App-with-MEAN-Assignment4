import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { BookModel } from '../book.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  title:string|undefined='';
  book:any;
  id:string='';
  constructor(public libraryService:LibraryService, private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number 
      this.getSinglebook(this.id);     
    });
  }
  getSinglebook(id:string){
    this.libraryService.getBook(id)
    .subscribe((data)=>{
      this.book= JSON.parse(JSON.stringify(data));
  })
  }
  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    this.router.navigate(['/'])
  }


}
