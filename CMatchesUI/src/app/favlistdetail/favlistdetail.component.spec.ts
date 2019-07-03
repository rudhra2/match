import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavlistdetailComponent } from './favlistdetail.component';

describe('FavlistdetailComponent', () => {
  let component: FavlistdetailComponent;
  let fixture: ComponentFixture<FavlistdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavlistdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavlistdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
