import {Component} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  template: `<h1>Add new product</h1>
     <form #f="ngForm" (ngSubmit) = "addProduct(f.value)" >
       Title: <input id="productTitle" name="title" ngModel>
       <br>
       Price: <input id="productPrice" name="price" ngModel>
       <br>
       <button type="submit">Add product</button>
     </form>
     {{response}}
  `})
export class AppComponent {

  response: string;

  constructor(private httpClient: HttpClient) {}

  addProduct(formValue){

    this.response='';

    this.httpClient.post<string>("/api/product",
                                 formValue)
      .subscribe(
        data =>  this.response = data['message'],
        (err: HttpErrorResponse) =>
            this.response = `Can't add product. Error code:
              ${err.message} ${err.error.message}`
      );
  }
}
