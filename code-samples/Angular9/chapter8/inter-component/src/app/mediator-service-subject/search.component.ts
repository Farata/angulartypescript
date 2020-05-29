import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators'

import {StateService} from './state.service';

@Component({
  selector: "search",
  template: `
      <input type="text" placeholder="Enter product" [formControl]="searchInput">
    `
})
export class SearchComponent {

  searchInput: FormControl;

  constructor(private state: StateService){
    this.searchInput = new FormControl('');

    this.searchInput.valueChanges
      .pipe(debounceTime(300))
      .subscribe(searchValue => this.state.searchCriteria = searchValue);
  }
}
