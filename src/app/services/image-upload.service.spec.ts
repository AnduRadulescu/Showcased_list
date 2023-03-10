import { TestBed } from '@angular/core/testing';

import { ImageUploadService } from './image-upload.service';

describe('ImageUploadService', () => {
  let service: ImageUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should select file', () => {
    const mockHtmlEvent = createMockHtmlInputEventWith('image/jpeg');

    service.selectFile(mockHtmlEvent);

    expect(service.message).toBe("");
  });

  it('should return if type of file is not image', () => {
    const mockHtmlEvent = createMockHtmlInputEventWith('');

    service.selectFile(mockHtmlEvent);

    expect(service.message).toBe("Only images are supported");
  });

  it('should return if there are no files', () => {
    const mockHtmlEvent = createMockHtmlElementWithNoFiles();

    service.selectFile(mockHtmlEvent);

    expect(service.message).toBe("You must select an image");
  });

  function createMockHtmlInputEventWith(type: string){
    const blob = new Blob([], {type: type});
    return {
      target: {
        files: [ blob ]
      },
    }
  }

  function createMockHtmlElementWithNoFiles(){
    return {
      target: {
        files: []
      },
    }
  }
});
