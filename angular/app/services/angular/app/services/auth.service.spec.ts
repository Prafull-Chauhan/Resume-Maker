import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should authenticate user and store JWT in localStorage', () => {
    const mockResponse = { token: 'mock-jwt-token', user: { email: 'test@example.com' } };

    service.login({ email: 'test@example.com', password: 'password123' }).subscribe(res => {
      expect(res.token).toBe('mock-jwt-token');
      expect(service.getToken()).toBe('mock-jwt-token');
      expect(service.isLoggedIn()).toBeTrue();
    });

    const req = httpMock.expectOne('http://localhost:5000/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});