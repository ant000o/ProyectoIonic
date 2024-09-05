import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CasobienPage } from './casobien.page';

describe('CasobienPage', () => {
  let component: CasobienPage;
  let fixture: ComponentFixture<CasobienPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CasobienPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
