import { TestBed } from '@angular/core/testing';

import { MyIngredientsListService } from './my-ingredients-list.service';

describe('MyIngredientsListService', () => {
  let service: MyIngredientsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyIngredientsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
