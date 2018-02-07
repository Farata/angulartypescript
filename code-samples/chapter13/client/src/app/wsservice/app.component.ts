import {Component} from "@angular/core";
import {WebSocketService} from "./websocket.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  providers: [ WebSocketService ],
  template: `<h1>Angular client for a WebSocket server</h1>
  {{messageFromServer}}<br>
  <button (click)="sendMessageToServer()">Send Message to Server</button>
  <button (click)="closeSocket()">Disconnect</button>  
  `})
export class AppComponent{

  messageFromServer: string;
  wsSubscription: Subscription;

  constructor(private wsService: WebSocketService) {

    this.wsSubscription = this.wsService.createObservableSocket("ws://localhost:8085")
      .subscribe(
        data => {
          this.messageFromServer = data;
        },
        err => console.log( err),
        () =>  console.log( 'The observable stream is complete')
      );
  }

  sendMessageToServer(){
    const status = this.wsService.sendMessage("Hello from client");
    console.log(status);
  }

  closeSocket(){
    this.wsSubscription.unsubscribe();  // Close the Websocket
  }
}
