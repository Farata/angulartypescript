import {Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataResolver implements Resolve<string[]>{

    constructor ( private httpClient: HttpClient){}

    resolve(): Observable<string[]>{

        console.log("In Resolver");

      return this.httpClient.get<string[]>("./assets/48MB_DATA.json");
    }
}
