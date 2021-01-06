import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookModel } from '../book.model';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  addForm:FormGroup;
  selectedFile=null;
  constructor(public libraryService:LibraryService,private router:Router,private formBuilder:FormBuilder) { }
  bookItem=new BookModel('','','',null,'','','');
  ngOnInit(): void {
    // const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,})[/\\w .-]*/?';
    this.addForm =this.formBuilder.group({
      'title':[this.bookItem.title,[Validators.required]],
      'author':[this.bookItem.author,[Validators.required]],
      'genre':[this.bookItem.genre,[Validators.required]],
      'details':[this.bookItem.details,[Validators.required]],
      'link':[this.bookItem.link,[Validators.required]],
      'img':[this.bookItem.img,[Validators.required]],
    })
  }
  upload(event){
    this.selectedFile=event.target.files[0]

  }
  addBook(){
    // console.log(this.bookItem.img.name)
    // this.addForm.get('img').setValue(this.selectedFile)
    this.libraryService.newBook(this.bookItem,this.selectedFile);
    alert("successfully added");
    this.router.navigate(['/books']);
  }
  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }
}
