import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryService } from '../library.service';
import {BookModel} from '../book.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {
  id:string='';
  selectedFile=null;
  editForm:FormGroup;
  constructor( public libraryService:LibraryService,private router:Router,private route:ActivatedRoute,private formBuilder:FormBuilder) { }
  bookItem=new BookModel('','','',null,'','','')
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number    
      this.libraryService.getBook(this.id)
      .subscribe((data)=>{
        this.bookItem= JSON.parse(JSON.stringify(data));
    }) 
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,})[/\\w .-]*/?';
    this.editForm =this.formBuilder.group({
      'title':[this.bookItem.title,[Validators.required]],
      'author':[this.bookItem.author,[Validators.required]],
      'genre':[this.bookItem.genre,[Validators.required]],
      'details':[this.bookItem.details,[Validators.required]],
      'link':[this.bookItem.link,[Validators.required]],
      'img':[this.bookItem.img,[Validators.required]],
    })   
    });

  }
  upload(event){
    this.selectedFile=event.target.files[0]

  }
  EditBookfn(){
    this.libraryService.editBook(this.id,this.bookItem,this.selectedFile);
    alert("successfully edited");
    this.router.navigate(['/books']);
  }
  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    this.router.navigate(['/'])
  }
}
