import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionUsuarioPage } from './gestion-usuario.page';

describe('GestionUsuarioPage', () => {
  let component: GestionUsuarioPage;
  let fixture: ComponentFixture<GestionUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
