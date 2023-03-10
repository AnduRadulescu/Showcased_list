import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MockHandleWorkService } from 'src/app/mocks/serviceMocks/mockHandleWorkService';
import { Work } from 'src/app/model/works';
import { HandleWorkService } from 'src/app/services/handle-work.service';

import { WorkFormComponent } from './work-form.component';

describe('WorkFormComponent', () => {
  let component: WorkFormComponent;
  let fixture: ComponentFixture<WorkFormComponent>;
  let debugElement: DebugElement;
  let handleService: HandleWorkService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkFormComponent ],
      providers: [
        { provide: HandleWorkService, useClass: MockHandleWorkService },
      ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;

    handleService = TestBed.inject(HandleWorkService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //structure testing

  it('should contain a div and inside a text and a button ', () => {
    const divElement = getFirstDivElement();

    expect(divElement[0].children[0].nativeNode.innerText).toBe("Add work");
    expect(divElement[0].children[1].attributes['type']).toBe('button');
  });

  it('should contain a div and inside it a form ', () => {
    const divElement = getFirstDivElement();

    expect(divElement[1].children[0].properties['localName']).toBe("form");
  });

  it('should form should contain 3 input fields, 1 textarea, 2 buttons ', () => {
    const form = getForm();

    expect(form.nativeNode[0].localName).toBe('input');
    expect(form.nativeNode[1].localName).toBe('input');
    expect(form.nativeNode[2].localName).toBe('textarea');
    expect(form.nativeNode[3].localName).toBe('input');
    expect(form.nativeNode[4].localName).toBe('button');
    expect(form.nativeNode[5].localName).toBe('button');
  });

  it('should contain only save btn if work is not defined', () => {
    const form = getForm();

    expect(form.nativeNode[4].innerHTML).toBe('Save ');
  });

  it('should contain only edit if work is defined', () => {
    component.work = mockWork;

    fixture.detectChanges();
    const form = getForm();

    expect(form.nativeNode[4].innerHTML).toBe('Edit ');
  });

  it('should add work', () => {
    spyOn(handleService, 'addWork').and.callThrough();
    const saveBtn = getSaveBtn();

    saveBtn.triggerEventHandler('click');

    expect(handleService.addWork).toHaveBeenCalled();
  });

  it('should add work', () => {
    component.work = mockWork;
    spyOn(handleService, 'editWork').and.callThrough();
    fixture.detectChanges();
    const editBtn = getEditBtn();

    editBtn.triggerEventHandler('click');

    expect(handleService.editWork).toHaveBeenCalled();
  });

  function getFirstDivElement(): DebugElement[] {
    return debugElement.queryAll(By.css('div'));
  }

  function getForm(): DebugElement {
    return debugElement.query(By.css('form'));
  }

  function getSaveBtn(): DebugElement {
    return debugElement.query(By.css('.btn-success'));
  }

  function getEditBtn(): DebugElement {
    return debugElement.query(By.css('.btn-primary'));
  }

  const mockWork = {
    name: 'foo',
    link: 'bar',
    description: 'foo.bar',
    img: 'img',
  } as Work;

});
