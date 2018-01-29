import {Resolve} from "@angular/router";
import {DataService} from "./data.service";
import {Injectable} from "@angular/core";
import { Observable} from "rxjs/Observable";

@Injectable()
export class DataResolver implements Resolve<string[]>{

    constructor ( private dataService: DataService){}

    resolve(): Observable<string[]>{
        return this.dataService.loadData();
    }
}