import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describes('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  if('should be created', () => {
    expect(service).toBeTruthy();
  });
});
