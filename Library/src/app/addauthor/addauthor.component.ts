import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from '../library.service';
import {AuthorModel} from '../author.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addauthor',
  templateUrl: './addauthor.component.html',
  styleUrls: ['./addauthor.component.css']
})
export class AddauthorComponent implements OnInit {
  addForm:FormGroup
  selectedFile=null;
  constructor(public libraryService:LibraryService,private router:Router,private formBuilder:FormBuilder) { }
  authorItem=new AuthorModel('','','',null,'','','');
  ngOnInit(): void {
    this.addForm =this.formBuilder.group({
      'name':[this.authorItem.name,[Validators.required]],
      'book':[this.authorItem.book,[Validators.required]],
      'genre':[this.authorItem.genre,[Validators.required]],
      'details':[this.authorItem.details,[Validators.required]],
      'link':[this.authorItem.link,[Validators.required]],
      'img':[this.authorItem.img,[Validators.required]],
    })
  }
  upload(event){
    this.selectedFile=event.target.files[0]
  }
  

  addAuthor(){
    this.libraryService.newAuthor(this.authorItem,this.selectedFile);
    alert("successfully added");
    this.router.navigate(['/authors']);
  }
  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    this.router.navigate(['/'])
  }

}
