import { TestBed } from '@angular/core/testing';

import { UnauthenticatedUserRouteGuardService } from './unauthenticated-user-route-guard.service';

describe('UnauthenticatedUserRouteGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnauthenticatedUserRouteGuardService = TestBed.get(UnauthenticatedUserRouteGuardService);
    expect(service).toBeTruthy();
  });
});
