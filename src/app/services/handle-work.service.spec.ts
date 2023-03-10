import { TestBed } from '@angular/core/testing';
import { Work } from '../model/works';

import { HandleWorkService } from './handle-work.service';

describe('HandleWorkService', () => {
  let service: HandleWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add data to works list',() => {
    service.addWork(mockWork);
    service.works$.subscribe((works: Work[]) => {
      expect(works.length).toBe(4);
    })
  });

  it('should edit existing work', () => {
    service.editWork(mockWork, 2)

    service.works$.subscribe((works: Work[]) => {
      expect(works[2]).toBe(mockWork);
    });
  });

  it('should delete work', () => {
    service.deleteWork(2);


    service.works$.subscribe((works: Work[]) => {
      expect(works.length).toBe(2);
      works.forEach((work: Work) => {
      });
    })
  });

  it('should hide add works from selection list', () => {
    service.hideWork(2);

    expect(service.checkIfIsSelectedToBeHidden(2)).toBeTruthy();
  });

  it('should hide remove works from selection list if index exists already in the set', () => {
    service.hideWork(2);
    service.hideWork(0);
    service.hideWork(2);

    expect(service.checkIfIsSelectedToBeHidden(0)).toBeTruthy();
    expect(service.checkIfIsSelectedToBeHidden(2)).toBeFalsy();
  });

  it('should check wrok is selected', () => {
    service.hideWork(0);
    service.hideWork(2);

    expect(service.checkIfIsSelectedToBeHidden(0)).toBeTruthy();
    expect(service.checkIfIsSelectedToBeHidden(2)).toBeTruthy();
  });

  const mockWork = {
    name: 'DIGITAL AZUREIT ADMIN',
    link: 'www.google.com',
    description: "This Digital Azure IT Admin supports an IT Cloud Engineer/Administrator in User Management, Instance Creation, and generating Utilization Reports for the company's Azure usage.",
    hidden: false,
    img: null,
  } as Work;
});
