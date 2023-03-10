import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Work } from '../model/works';

@Injectable({
  providedIn: 'root'
})
export class HandleWorkService {

  private hiddenWorksIndex: Set<number> = new Set();

  public works$: BehaviorSubject<Work[]> = new BehaviorSubject(
    [
      {
        name: 'DIGITAL AZUREIT ADMIN',
        link: 'www.google.com',
        description: "This Digital Azure IT Admin supports an IT Cloud Engineer/Administrator in User Management, Instance Creation, and generating Utilization Reports for the company's Azure usage.",
        hidden: false,
        img: null,
      } as Work,
      {
        name: 'DIGITAL GOOGLE CLOUD IT ADMIN',
        link: 'www.facebook.com',
        description: "The Digital Google Cloud IT Admin's skills include user management, Virtual Machine (VM) Instance creation, and generating utilization reports for the company's Google Cloud usage.",
        hidden: false,
        img: null,
      } as Work,
      {
        name: 'DIGITAL AWSIT ADMIN',
        link: 'www.linkedin.com',
        description: "This Digital IT Operations Specialist supports an IT Cloud Engineer in User Management, Instance Creation, and generating Utilization Reports for the company's AWS usage.",
        hidden: false,
        img: null,
      } as Work,
      {
        name: 'DIGITAL SAP ACCOUNTS PAYABLE CLERK',
        link: 'www.facebook.com',
        description: "The Digital Google Cloud IT Admin's skills include user management, Virtual Machine (VM) Instance creation, and generating utilization reports for the company's Google Cloud usage.",
        hidden: false,
        img: null,
      } as Work,
      {
        name: 'DIGITAL ORACLE ACCOUNTS PAYABLE CLERK',
        link: 'www.linkedin.com',
        description: "This Digital IT Operations Specialist supports an IT Cloud Engineer in User Management, Instance Creation, and generating Utilization Reports for the company's AWS usage.",
        hidden: false,
        img: null,
      } as Work,
      {
        name: 'DIGITAL ORACLE ACCOUNTS RECEIVABLE CLERK',
        link: 'www.facebook.com',
        description: "The Digital Google Cloud IT Admin's skills include user management, Virtual Machine (VM) Instance creation, and generating utilization reports for the company's Google Cloud usage.",
        hidden: false,
        img: null,
      } as Work,
    ]
  );

  constructor() { }

  addWork(work: Work){
    this.works$.next([...this.works$.value, work]);
  }

  editWork(work: Work, index: number){
    const works: Work[] = this.works$.getValue();
    // update specific work in list from postion (index)
    const editedWorks: Work[] = [...works.slice(0, index), work, ...works.slice(index + 1)];
    this.works$.next(editedWorks);
  }

  deleteWork(index: number){
    const works: Work[] = this.works$.getValue();
    const deleteWroks: Work[] = [...works.slice(0, index), ...works.slice(index + 1)];
    this.works$.next(deleteWroks);
  }

  hideWork(index: number){
    if(this.hiddenWorksIndex.has(index)){
      this.hiddenWorksIndex.delete(index);
    }else{
      this.hiddenWorksIndex.add(index);
    }
  }

  checkIfIsSelectedToBeHidden(index: number){
    return this.hiddenWorksIndex.has(index);
  }
}
