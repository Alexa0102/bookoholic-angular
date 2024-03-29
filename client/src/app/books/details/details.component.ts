import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { errHandler } from 'src/app/shared/errorHandler';

import { IBook } from 'src/app/shared/interfaces';
import { BookService } from '../book.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  get isLogged(): boolean {
    return this.authService.isLogged();
  }
  
  book: IBook | undefined;
  isAuthor: boolean = false;
  inEditMode: boolean = false;
  token: string | null = localStorage.getItem('token')
  errors: Object | undefined
 
  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.getBook()    
  }
  

  getBook(): void {
    this.book = undefined;
    const id = this.activatedRoute.snapshot.params['id'];
    this.bookService.getOneBook(id).subscribe({
      next: (book) => {
        this.book = book
        if (this.authService.user?._id == book.owner._id) {
          this.isAuthor = true
        } 
        else {
          this.isAuthor = false;
        }
      },
      error: (err) => {
        console.log(err)
        this.router.navigate(['**'])
      }
    })
  }
  editBook(form: NgForm) {
    if (this.authService.user?._id != this.book?.owner._id || !this.token) {
      this.router.navigate(['/'])
    }
    const id = this.book?._id;
    let token = localStorage.getItem('token');
    let value = form.value;
    value.token = token;
    this.bookService.editBook(id, value).subscribe({
      next: (book) => {
        this.book = book
        this.inEditMode = false;
      },
      error: (err) => {
        this.errors = errHandler(err.error?.error)
      }
    })
  }
  deleteBook() {
    // if (this.authService.user?._id != this.book?.owner._id || !this.token) {
    //   console.log(this.authService.user)
    //   this.router.navigate(['/'])
    // }
    const id = this.book?._id;
    // this.bookService.deleteBook(id).subscribe({
    //   next: () =>
    //    this.router.navigate(['/books']),
    //   error: (err) => {
    //     this.errors = err.error?.error
    //   }
    // })
    if (confirm('Are u sure u want to delete this book?')) {
      if (this.authService.user?._id != this.book?.owner._id || !this.token) {
      console.log(this.authService.user)
      this.router.navigate(['/'])
    }
      this.bookService.deleteBook(id).subscribe({
        next: () => 
          this.router.navigate(['/books']),
        error: (err) => {
          this.errors = err.error?.error
        }
      })
    }
  }
}
