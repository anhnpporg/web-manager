import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineIngredientComponent } from './medicine-ingredient.component';

describe('MedicineIngredientComponent', () => {
  let component: MedicineIngredientComponent;
  let fixture: ComponentFixture<MedicineIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineIngredientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
