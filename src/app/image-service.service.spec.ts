/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImageServiceService } from './image-service.service';

describe('Service: ImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageServiceService]
    });
  });

  it('should ...', inject([ImageServiceService], (service: ImageServiceService) => {
    expect(service).toBeTruthy();
  }));
});
