import {Injectable} from "@angular/core";
import 'rxjs/add/operator/do';
import { Observable} from "rxjs/Observable";
import 'rxjs/add/observable/from';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataService{

    mydata:any;

    constructor(private http:HttpClient){}

    loadData(): Observable<string[]> {
      console.log("In DataService.loadData()");

        if (this.mydata){
            return Observable.from(this.mydata);  // return the cached data
        } else
        {
            return this.http.get<string[]>("./assets/48MB_DATA.json")
                .do(data => this.mydata = data); // store the data in the var mydata
        }
    }
}
