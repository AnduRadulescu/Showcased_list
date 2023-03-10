import { ImageUploadService } from './../../services/image-upload.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Work } from 'src/app/model/works';
import { HandleWorkService } from 'src/app/services/handle-work.service';

@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.css'],
})
export class WorkFormComponent {

  public work: Work | null = null;
  public workIndex: number;
  public workForm: FormGroup;

  constructor(private ngModal: NgbModal, private handleWorkService: HandleWorkService, public imageUpload: ImageUploadService){}

  ngOnInit(){
    this.initializeForm();
  }

  ngOnDestroy(){
    this.imageUpload.url = null;
  }

  addWork(){
    const work = {
      name: this.workForm.value.name,
      link: this.workForm.value.link,
      description: this.workForm.value.description,
      img: this.imageUpload.url ?? null,
    } as Work;

    this.handleWorkService.addWork(work);
    this.ngModal.dismissAll();
  }

  editWork(){
    const work = {
      name: this.workForm.value.name,
      link: this.workForm.value.link,
      description: this.workForm.value.description,
      img: this.imageUpload.url ?? this.work?.img,
    } as Work;
    this.handleWorkService.editWork(work, this.workIndex);
    this.ngModal.dismissAll();
  }

  closeAddWork(){
    this.ngModal.dismissAll();
  }

  private initializeForm(){
    this.workForm = new FormGroup({
      name: new FormControl(this.work? this.work.name: ''),
      link: new FormControl(this.work? this.work.link: ''),
      description: new FormControl(this.work? this.work.description: ''),
      hidden: new FormControl(false),
      img: new FormControl(this.work? this.work.img: null),
    });
  }
}
