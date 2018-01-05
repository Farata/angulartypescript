import {Injectable} from "@angular/core";

@Injectable()
export abstract class LoggingService {

  abstract log(message: string): void;
}
