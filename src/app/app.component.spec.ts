import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WorksListMainComponent } from './works-list-main/works-list-main.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        WorksListMainComponent
      ],
    }).compileComponents();
  });

  it(`should have as title 'showcased_list'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('showcased_list');
  });

});
