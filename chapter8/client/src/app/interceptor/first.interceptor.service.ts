import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class FirstInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // clone and modify your HTTPRequest here using req.clone()

    console.log("I intercepted your HTTP request!" + JSON.stringify(req));

    return next.handle(req);  // typically you return the cloned request here
  }
}
