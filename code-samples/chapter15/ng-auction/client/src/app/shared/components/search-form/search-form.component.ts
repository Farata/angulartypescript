import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { Search } from '../../../store/actions';


@Component({
  selector: 'nga-search-form',
  styleUrls: [ './search-form.component.scss' ],
  templateUrl: './search-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent {
  readonly matcher = new ShowOnFormInvalidStateMatcher();
  readonly searchForm: FormGroup;

  constructor(
    private readonly store: Store<any>,
    fb: FormBuilder
  ) {
    this.searchForm = fb.group({
      title: [ , Validators.minLength(2) ],
      minPrice: [ , Validators.min(0) ],
      maxPrice: [ , Validators.min(0) ]
    }, {
      validator: [ minLessThanMaxValidator ]
    });
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      this.store.dispatch(new Search({
        params: withoutEmptyValues(this.searchForm.value)
      }));
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
    return Object.assign(queryParams, object[ key ] ? { [ key ]: object[ key ] } : {});
  }, {});
}

/**
 * If both values - min and max prices are specified,
 * make sure that the min is less or equal to the max.
 */
function minLessThanMaxValidator(group: FormGroup): ValidationErrors | null {
  const minPrice = group.controls[ 'minPrice' ].value;
  const maxPrice = group.controls[ 'maxPrice' ].value;

  if (minPrice && maxPrice) {
    return minPrice <= maxPrice ? null : { minLessThanMax: true };
  } else {
    return null;
  }
}
