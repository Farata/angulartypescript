import { Injectable } from '@angular/core';
import { Observable, Subject, NextObserver  } from 'rxjs';

@Injectable()
export class WebSocketService {
  create(url: string): Subject<any> {
    const ws = new WebSocket(url);

    const observable = new Observable<any>(observer => {
      ws.onmessage = observer.next.bind(observer);
      ws.onclose = observer.complete.bind(observer);
      ws.onerror = observer.error.bind(observer);
      return ws.close.bind(ws);
    });

    const observer: NextObserver<any> = {
      next: message => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(message);
        }
      }
    };

    return Subject.create(observer, observable);
  }
}
