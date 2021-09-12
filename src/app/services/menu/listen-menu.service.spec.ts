import { TestBed } from '@angular/core/testing';

import { ListenMenuService } from './listen-menu.service';

describe('ListenMenuService', () => {
  let service: ListenMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListenMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
