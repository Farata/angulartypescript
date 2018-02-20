import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {Observable} from "rxjs/Observable";

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
  {{response$ | async}}
  `})
export class AppComponent {

  response$: Observable<string>;

  constructor(private httpClient: HttpClient) {}

  addProduct(formValue){
    this.response$=this.httpClient.post<{message: string}>("/api/product",
      formValue)
      .map (data=> data.message)
  }
}
