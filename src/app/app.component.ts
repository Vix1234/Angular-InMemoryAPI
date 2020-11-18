import { TranslationWidth } from '@angular/common';
import { Component } from '@angular/core';
import { LibraryService } from './library.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-InMemoryAPI';

  books : any[] = [];
  //dodajemo zbog editovanja
  editing=false;
  book;

  constructor(private libraryService: LibraryService){}

  ngOnInit(){
    this.getBooks();
  }

  getBooks(){
    this.libraryService.getBooks()
      .subscribe(
        (knjige: any[]) => this.books = knjige,
        (greska) => console.log(greska)        
      )
  }

  editBook(book){
    this.editing = true;
    this.book = book;
  }

  finishEditing(author: string, name: string){
    let newBook={
      id: this.book.id,
      name: name,
      author: author
    }

    this.books[this.book.id].name = name;
    this.books[this.book.id].author = author;

    this.libraryService.editBook(newBook)
      .subscribe(
        (response) => console.log('Edited ' + newBook.id),
        (error) => console.log(error)
      )

    this.editing = false;
    this.book = undefined;
  }

  deleteBook(book){
    this.books = this.books.filter(x=> x!== book);
    this.libraryService.deleteBook(book.id)
      .subscribe(
        (response) => console.log('Book deleted'),
        (error) => console.log(error)
      )
  }

  addBook(author: string, name: string){
    let book={
      id: this.books.length,
      name: name,
      author: author
    }

    this.books.push(book);
    this.libraryService.storeBook(book)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )

  }
}
