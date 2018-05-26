import {Injectable} from "@angular/core";
import {tap} from 'rxjs/operators';
import {Observable, from} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataService{

    mydata:any;

    constructor(private http:HttpClient){}

    loadData(): Observable<string[]> {
      console.log("In DataService.loadData()");

        if (this.mydata){
            return from(this.mydata);  // return the cached data
        } else
        {
            return this.http.get<string[]>("./assets/48MB_DATA.json")
              .pipe(
                tap(data => this.mydata = data) // store the data in the var mydata
              );
        }
    }
}
