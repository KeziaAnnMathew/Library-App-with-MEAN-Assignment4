import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  title:string|undefined='';
  author:any;
  id:string='';
  constructor(public libraryService:LibraryService, private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number 
      this.getSingleauthor(this.id);       
    });
  }
  getSingleauthor(id:string){
    this.libraryService.getAuthor(id)
    .subscribe((data)=>{
      this.author= JSON.parse(JSON.stringify(data));
  })
  }
  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    this.router.navigate(['/'])
  }

}
