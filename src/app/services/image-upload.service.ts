import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  public url: string | ArrayBuffer | null;
  message: string = "";
  constructor() { }

  selectFile(event: any) {
		if(!event?.target?.files[0] || event?.target?.files[0].length == 0) {
			this.message = 'You must select an image';
			return;
		}

		let mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
			this.message = "Only images are supported";
			return;
		}

		let reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.message = "";
			this.url = reader.result;
		}
	}
}
