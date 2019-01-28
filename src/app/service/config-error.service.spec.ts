import { TestBed } from '@angular/core/testing';

import { ConfigErrorService } from './config-error.service';

describe('ConfigErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigErrorService = TestBed.get(ConfigErrorService);
    expect(service).toBeTruthy();
  });
});
