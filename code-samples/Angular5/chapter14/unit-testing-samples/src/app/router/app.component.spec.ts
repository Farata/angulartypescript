import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import {TestBed, fakeAsync, async, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {AppComponent} from './app.component';
import {ProductDetailComponent} from './product.detail.component';
import {routes} from './app.routing';
import {HomeComponent} from './home.component';

describe('Router app AppComponent', () => {
  let fixture;
  let router: Router;
  let location: Location;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes(routes)],
        declarations: [
          AppComponent, ProductDetailComponent, HomeComponent
        ]
      }).compileComponents();
    }));

  beforeEach(fakeAsync(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    router.navigateByUrl('/');
    tick();
    fixture.detectChanges();
  }));

  it('can navigate and pass params to the product detail view', fakeAsync(() => {
    const productLink = fixture.debugElement.query(By.css('#product'));
    productLink.triggerEventHandler('click', { button: 0 });
    tick();
    fixture.detectChanges();
    expect(location.path()).toEqual('/product/1234');
  }));
});
