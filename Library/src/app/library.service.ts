import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BookModel} from './book.model'
import { AuthorModel } from './author.model';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  readonly baseurl='http://localhost:3000';
  constructor(private http:HttpClient) { }
  getBooks(){
    return this.http.get(this.baseurl)
  }
  getBook(_id:string){
    return this.http.get(this.baseurl+`/books/${_id}`)
  }
  newBook(item:BookModel,file:File){
    
    const formdata=new FormData();
    formdata.append('img',file);
    formdata.append('title',item.title);
    formdata.append('author',item.author);
    formdata.append('genre',item.genre);
    formdata.append('details',item.details);
    formdata.append('link',item.link);
    return this.http.post(this.baseurl+`/addbook`,formdata)
    .subscribe(data=>{console.log(data)})
  }
  deleteBook(_id:string){
    return this.http.delete(this.baseurl+`/books/deletebook/${_id}`)
  }
  editBook(_id:string,item:BookModel,file:File){
    const formdata=new FormData();
    formdata.append('img',file);
    formdata.append('title',item.title);
    formdata.append('author',item.author);
    formdata.append('genre',item.genre);
    formdata.append('details',item.details);
    formdata.append('link',item.link);
    return this.http.put(this.baseurl+`/books/editbook/${_id}`,formdata)
    .subscribe((data)=>{
      console.log(data);
    })
  }
  getAuthors(){
    return this.http.get(this.baseurl+`/authors`)
  }
  getAuthor(_id:string){
    return this.http.get(this.baseurl+`/authors/${_id}`)
  }
  newAuthor(item:AuthorModel,file:File){
    const formdata=new FormData();
    formdata.append('img',file);
    formdata.append('name',item.name);
    formdata.append('book',item.book);
    formdata.append('genre',item.genre);
    formdata.append('details',item.details);
    formdata.append('link',item.link);
    return this.http.post(this.baseurl+`/addauthor`,formdata)
    .subscribe(data=>{console.log(data)})
  }
  deleteAuthor(_id:string){
    return this.http.delete(this.baseurl+`/authors/deleteauthor/${_id}`)
  }
  editAuthor(_id:string,item:AuthorModel,file:File){
    const formdata=new FormData();
    formdata.append('img',file);
    formdata.append('name',item.name);
    formdata.append('book',item.book);
    formdata.append('genre',item.genre);
    formdata.append('details',item.details);
    formdata.append('link',item.link);
    return this.http.put(this.baseurl+`/authors/editauthor/${_id}`,formdata)
    .subscribe((data)=>{
      console.log(data);
    })
  }
  newUser(item:UserModel){
    return this.http.post(this.baseurl+`/adduser`,{"user":item})
    .subscribe(data=>{console.log(data)})
  }
  validateUser(user:any){
    return this.http.post<any>(this.baseurl+`/validateuser`,{"user":user})
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  adminlogg(){
    return !!localStorage.getItem('admin')
  }
  getToken(){
    return localStorage.getItem('token')
  }
}
