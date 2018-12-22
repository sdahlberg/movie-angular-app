import { TestBed } from '@angular/core/testing';

import { MovieTitleDataService } from './movie-title-data.service';

describe('MovieTitleDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieTitleDataService = TestBed.get(MovieTitleDataService);
    expect(service).toBeTruthy();
  });
});
