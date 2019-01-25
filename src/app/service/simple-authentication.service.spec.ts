import { TestBed } from '@angular/core/testing';

import { SimpleAuthenticationService } from './simple-authentication.service';

describe('SimpleAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimpleAuthenticationService = TestBed.get(SimpleAuthenticationService);
    expect(service).toBeTruthy();
  });
});
