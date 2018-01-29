import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSuggestionComponent } from './product-suggestion.component';

describe('ProductSuggestionComponent', () => {
  let component: ProductSuggestionComponent;
  let fixture: ComponentFixture<ProductSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
