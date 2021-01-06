import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorModel } from '../author.model';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-editauthor',
  templateUrl: './editauthor.component.html',
  styleUrls: ['./editauthor.component.css']
})
export class EditauthorComponent implements OnInit {
  editForm:FormGroup;
  selectedFile:File;
  id:string='';
  constructor( public libraryService:LibraryService,private router:Router,private route:ActivatedRoute,private formBuilder:FormBuilder) { }
  authorItem=new AuthorModel('','','',null,'','','')
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number         
      this.libraryService.getAuthor(this.id)
      .subscribe((data)=>{
        this.authorItem= JSON.parse(JSON.stringify(data));
    })    
    });
    // const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,})[/\\w .-]*/?';
    this.editForm =this.formBuilder.group({
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
  EditAuthorfn(){
    this.libraryService.editAuthor(this.id,this.authorItem,this.selectedFile);
    alert("successfully edited");
    this.router.navigate(['/authors']);
  }
  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    this.router.navigate(['/'])
  }

}
