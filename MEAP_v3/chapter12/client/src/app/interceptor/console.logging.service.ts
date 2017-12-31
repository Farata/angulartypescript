import {Injectable} from "@angular/core";
import {LoggingService} from "./logging.service";

@Injectable()
export class ConsoleLoggingService implements LoggingService{

   log(message:string): void {
        console.log(message);
   }
}
