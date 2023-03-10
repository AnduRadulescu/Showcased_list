import { HandleWorkService } from './../services/handle-work.service';
import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Work } from '../model/works';
import { WorkFormComponent } from './work-form/work-form.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-works-list-main',
  templateUrl: './works-list-main.component.html',
  styleUrls: ['./works-list-main.component.css']
})
export class WorksListMainComponent {

  public works$: Observable<Work[]>
  @ViewChildren('works') workElements: QueryList<any>;;

  constructor(private ngModal: NgbModal, public handleWorkService: HandleWorkService){}

  ngOnInit(){
    this.works$ = this.handleWorkService.works$;
  }

  addWork(){
    this.ngModal.open(WorkFormComponent, {size: 'lg', centered: true});
  }

  edit(work: Work, index: number){
    const modalRef =  this.ngModal.open(WorkFormComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.work = work;
    modalRef.componentInstance.workIndex = index;
  }

  deleteWork(index: number){
    this.handleWorkService.deleteWork(index);
  }

  selectForHideWorks(index: number){
    this.handleWorkService.hideWork(index);
  }

  hideWorks(){
    this.workElements.forEach((element: ElementRef, index) => {
      if(this.handleWorkService.checkIfIsSelectedToBeHidden(index)){
        element.nativeElement.classList.add('hideWork');
      }
    });
  }

  unHideWorks(){
    this.workElements.forEach((element: ElementRef, index) => {
      if(this.handleWorkService.checkIfIsSelectedToBeHidden(index)){
        element.nativeElement.classList.remove('hideWork');
      }
    });
  }

  public returnClassBasedOnWorkSelected(index: number, class1: string, calss2: string): string{
    return this.handleWorkService.checkIfIsSelectedToBeHidden(index)? class1 : calss2;
  }
}
