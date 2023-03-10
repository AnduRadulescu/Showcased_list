
import { BehaviorSubject } from 'rxjs';
import { Work } from 'src/app/model/works';


export class MockHandleWorkService {

  private hiddenWorksIndex: Set<number> = new Set();

  public works$: BehaviorSubject<Work[]> = new BehaviorSubject([
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
    ]
  );

  constructor() { }

  addWork(work: Work){
  }

  editWork(work: Work, index: number){
  }

  deleteWork(index: number){
  }

  hideWork(index: number){
  }

  checkIfIsSelectedToBeHidden(index: number){
  }
}
