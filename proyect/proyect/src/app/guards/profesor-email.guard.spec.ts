import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { profesorEmailGuard } from './profesor-email.guard';

describe('profesorEmailGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => profesorEmailGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
