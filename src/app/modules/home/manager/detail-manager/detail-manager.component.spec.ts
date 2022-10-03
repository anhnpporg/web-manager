import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailManagerComponent } from './detail-manager.component';

describe('DetailManagerComponent', () => {
  let component: DetailManagerComponent;
  let fixture: ComponentFixture<DetailManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
