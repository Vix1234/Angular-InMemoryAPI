import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private httpClient: HttpClient) { }
  headers = new HttpHeaders().set('Content-Type','application/json');

  getBooks(){
    return this.httpClient.get('api/books', {
      headers: this.headers
    })
  }

  storeBook(book){
    return this.httpClient.post('api/books', book, {
      headers: this.headers
    })

  }

  deleteBook(id){
    return this.httpClient.delete('api/books/' + id,{
      headers: this.headers
    })
  }

  editBook(book){
    return this.httpClient.post('api/books/', book, {
      headers: this.headers
    })
  }
}
