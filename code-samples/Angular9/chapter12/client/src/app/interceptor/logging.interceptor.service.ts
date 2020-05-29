import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, of } from "rxjs";
import {catchError} from "rxjs/operators";
import {LoggingService} from "./logging.service";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor(private loggingService: LoggingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.loggingService.log(`Logging Interceptor: ${err.error.message}`);
          return of(new HttpResponse({body:{message: err.error.message}}));
         })
      );
  }
}
