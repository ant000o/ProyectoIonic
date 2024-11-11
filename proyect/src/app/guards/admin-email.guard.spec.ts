import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminEmailGuard } from './admin-email.guard';

describe('adminEmailGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminEmailGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
