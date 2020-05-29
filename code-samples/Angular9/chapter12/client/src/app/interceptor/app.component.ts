import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

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
      .pipe(
        map (data=> data.message)
      );
  }
}
