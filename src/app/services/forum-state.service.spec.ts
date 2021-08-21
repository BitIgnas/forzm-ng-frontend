/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ForumStateService } from './forum-state.service';

describe('Service: ForumState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForumStateService]
    });
  });

  it('should ...', inject([ForumStateService], (service: ForumStateService) => {
    expect(service).toBeTruthy();
  }));
});
