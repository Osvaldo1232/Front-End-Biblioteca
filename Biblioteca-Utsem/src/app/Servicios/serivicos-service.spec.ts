import { TestBed } from '@angular/core/testing';

import { SerivicosService } from './serivicos-service';

describe('SerivicosService', () => {
  let service: SerivicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerivicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
