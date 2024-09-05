import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CasomalPage } from './casomal.page';

describe('CasomalPage', () => {
  let component: CasomalPage;
  let fixture: ComponentFixture<CasomalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CasomalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
