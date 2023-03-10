import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockHandleWorkService } from '../mocks/serviceMocks/mockHandleWorkService';
import { HandleWorkService } from '../services/handle-work.service';

import { WorksListMainComponent } from './works-list-main.component';

describe('WorksListMainComponent', () => {
  let component: WorksListMainComponent;
  let fixture: ComponentFixture<WorksListMainComponent>;
  let debugElement: DebugElement;
  let handleService: HandleWorkService;
  let ngModal: NgbModal

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksListMainComponent ],
      providers: [
        { provide: HandleWorkService, useClass: MockHandleWorkService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorksListMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;

    handleService = TestBed.inject(HandleWorkService);
    ngModal = TestBed.inject(NgbModal);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //structure testing
  it('should have a div as first element and inside it a label with Text', () => {
    const divs = getFirstDivElements();

    expect(divs[0].children[0].nativeNode.textContent).toBe('Example digital workers');
    expect(divs[0].children[0].nativeNode.localName).toBe('label');
  });

  it('should have a div as second element and inside it should be 3 buttons, add, hide and unhide', () => {
    const divs = getFirstDivElements();

    expect(divs[1].children.length).toBe(3);
    expect(divs[1].children[0].nativeNode.localName).toBe('button');
    expect(divs[1].children[0].nativeNode.textContent).toBe('Add work');
    expect(divs[1].children[1].nativeNode.localName).toBe('button');
    expect(divs[1].children[1].nativeNode.textContent).toBe('Hide works');
    expect(divs[1].children[2 ].nativeNode.localName).toBe('button');
    expect(divs[1].children[2].nativeNode.textContent).toBe('Unhide works');
  });

  it('should contain 3 div elements as work', () => {
    const works = getWorks();

    expect(works.length).toBe(3);
  });

  //logic testing
  it('should open ng modal when adding ', () => {
    spyOn(ngModal, 'open')
    const addBtn = getAddWorkBtn();

    addBtn.triggerEventHandler('click');

    expect(ngModal.open).toHaveBeenCalled();
  });

  it('should open ng modal when adding ', () => {
    spyOn(ngModal, 'open')
    const addBtn = getAddWorkBtn();

    addBtn.triggerEventHandler('click');

    expect(ngModal.open).toHaveBeenCalled();
  });

  it('should hide every selected work ', () => {
    spyOn(handleService, 'checkIfIsSelectedToBeHidden').and.returnValue(true);
    component.selectForHideWorks(0);
    const hideBtn = getHideWorkBtn();

    hideBtn.triggerEventHandler('click');
    fixture.detectChanges();

    const works = getWorks();
    expect(works[0].attributes['class']).toBe('mt-2 hideWork');
    expect(works[1].attributes['class']).toBe('mt-2 hideWork');
    expect(works[2].attributes['class']).toBe('mt-2 hideWork');
  });

  it('should unHide every selected work ', () => {
    spyOn(handleService, 'checkIfIsSelectedToBeHidden').and.returnValue(true);

    //hide all elements
    getHideWorkBtn().triggerEventHandler('click');
    fixture.detectChanges();
    //unhide all elements
    getUnHideWorkBtn().triggerEventHandler('click');

    const works = getWorks();
    expect(works[0].attributes['class']).toBe('mt-2');
    expect(works[1].attributes['class']).toBe('mt-2');
    expect(works[2].attributes['class']).toBe('mt-2');
  });

  it('should edit work ', () => {
    spyOn(ngModal, 'open').and.callThrough();
    const editBtn = getEditWork();

    editBtn.triggerEventHandler('click');

    expect(ngModal.open).toHaveBeenCalled();
  });

  it('should delete work ', () => {
    spyOn(handleService, 'deleteWork')
    const deleteBtn = getDeleteWork();

    deleteBtn.triggerEventHandler('click');

    expect(handleService.deleteWork).toHaveBeenCalled();
  });

  function getFirstDivElements(): DebugElement[] {
    return debugElement.queryAll(By.css('div'));
  }

  function getAddWorkBtn(): DebugElement {
    return debugElement.query(By.css('.btn-success'));
  }

  function getHideWorkBtn(): DebugElement {
    return debugElement.query(By.css('.btn-warning'));
  }

  function getUnHideWorkBtn(): DebugElement {
    return debugElement.query(By.css('.btn-dark'));
  }

  function getWorks(): DebugElement[]{
    return debugElement.queryAll(By.css('.mt-2'));
  }

  function getEditWork(): DebugElement{
    return debugElement.query(By.css('.btn-primary'));
  }

  function getDeleteWork(): DebugElement{
    return debugElement.query(By.css('.btn-danger'));
  }

});
