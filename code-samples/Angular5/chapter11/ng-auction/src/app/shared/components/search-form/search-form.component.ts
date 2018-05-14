import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'nga-search-form',
  styleUrls: [ './search-form.component.scss' ],
  templateUrl: './search-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent {
  @Output() search = new EventEmitter();
  readonly matcher = new ShowOnFormInvalidStateMatcher();
  readonly searchForm: FormGroup;

  constructor(fb: FormBuilder, private router: Router) {
    this.searchForm = fb.group({
      title   : [, Validators.minLength(2)],
      minPrice: [, Validators.min(0)],
      maxPrice: [, [Validators.min(0), Validators.max(10000)]]
    }, {
      validator: [ minLessThanMaxValidator ]
    });
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      this.search.emit();
      this.router.navigate([ '/search-results' ], {
        queryParams: withoutEmptyValues(this.searchForm.value)
      });
    }
  }
}

/** Error when either control or the form is invalid. */
export class ShowOnFormInvalidStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
    return !!((control && control.invalid) || (form && form.hasError('minLessThanMax')));
  }
}

/**
 * Removes properties with empty values (everything that's
 * considered a "falsy" value in JavaScript) from the original object.
 *
 * See: https://developer.mozilla.org/en-US/docs/Glossary/Falsy
 */
function withoutEmptyValues(object: any): any {
  return Object.keys(object).reduce((queryParams: any, key) => {
    if (object[key]) { queryParams[key] = object[key]; }
    return queryParams;
  }, {});
}

/**
 * If both values - min and max prices are specified,
 * make sure that the min is less or equal to the max.
 */
function minLessThanMaxValidator(group: FormGroup): ValidationErrors | null {
  const minPrice = group.controls['minPrice'].value;
  const maxPrice = group.controls['maxPrice'].value;

  if (minPrice && maxPrice) {
    return minPrice <= maxPrice ? null : { minLessThanMax: true };
  } else {
    return null;
  }
}
