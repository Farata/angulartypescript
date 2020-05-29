import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';
import {Component} from "@angular/core";

@Component({
  selector: 'app-root',
  template: `<h1>Reading a file: {{percentDone}}% done</h1>
  `})
export class AppComponent{

  mydata: any;
  percentDone: number;


  constructor(private httpClient: HttpClient) {

    const req = new HttpRequest('GET',
                               './data/48MB_DATA.json', {
      reportProgress: true
    });

      httpClient.request(req)
      .subscribe(data => {
        if (data.type === HttpEventType.DownloadProgress) {
          this.percentDone = Math.round(100 * data.loaded / data.total);
          console.log(`Read ${this.percentDone}% of ${data.total} bytes`);
        } else {
          this.mydata = data
        }
      });
  }
}
