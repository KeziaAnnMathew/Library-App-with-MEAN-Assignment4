import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddauthorComponent } from './addauthor/addauthor.component';
import { AddbookComponent } from './addbook/addbook.component';
import { AuthGuard } from './auth.guard';
import { AuthorComponent } from './author/author.component';
import { AuthorsComponent } from './authors/authors.component';
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books/books.component';
import { EditauthorComponent } from './editauthor/editauthor.component';
import { EditbookComponent } from './editbook/editbook.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{path:'', component:IndexComponent},
{path:'books',canActivate:[AuthGuard], component:BooksComponent},
{path:'authors',canActivate:[AuthGuard], component:AuthorsComponent},
{path:'books/:id', component:BookComponent},
{path:'authors/:id', component:AuthorComponent},
{path:'addbook',canActivate:[AuthGuard],component:AddbookComponent},
{path:'addauthor', canActivate:[AuthGuard], component:AddauthorComponent},
{path:'editbook/:id',canActivate:[AuthGuard], component:EditbookComponent},
{path:'editauthor/:id',canActivate:[AuthGuard], component:EditauthorComponent},
{path:'login', component:LoginComponent},
{path:'signup', component:SignupComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
