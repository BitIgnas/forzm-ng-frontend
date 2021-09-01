import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiStorageService } from './../../services/api-storage.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-profile-change-avatar',
  templateUrl: './profile-change-avatar.component.html',
  styleUrls: ['./profile-change-avatar.component.scss']
})
export class ProfileChangeAvatarComponent implements OnInit {
  @Input() username: string;
  avatarPhotoForm: FormGroup;

  filesList: any[] = [];
  errorMessage: string;
  file: File;

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;

  constructor(
    private storageService: ApiStorageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.avatarPhotoForm = this.formBuilder.group({
      profilePhoto:['', [ 
          RxwebValidators.file({maxFiles: 1}),
          RxwebValidators.image({maxHeight:2000,maxWidth:2000}),
          RxwebValidators.extension({extensions:["jpeg","jpg", "png"]})
        ]       
      ], 
  });
  }

  onFileDropped($event) {
    this.errorMessage = "";
    this.file = $event;

    if(this.filesList.length == 0) {
      this.prepareFilesList($event);
    }
  }

  fileBrowseHandler(files) {
    this.errorMessage = "";
    this.file = files;

    if(this.filesList.length == 0) {
      this.prepareFilesList(files);
    }
  }

  deleteFile(index: number) {
    if (this.filesList[index].progress < 100) {
      console.log("Upload in progress...");
      return;
    }
      this.filesList.splice(index, 1);
      this.file = null;
      return;
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.filesList.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.filesList[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.filesList[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  prepareFilesList(files) {
    if(this.filesList.length < 1) {
      for (const item of files) {
        item.progress = 0;
        this.filesList.push(item);
  
        this.file = item;
      }
    } else {
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  onSubmit() {
    if(this.avatarPhotoForm.controls['profilePhoto'].value) {
      this.storageService.updateUserProfile(this.file, this.username);
      window.location.reload();
    } else {
      this.errorMessage = "Profile avatar cannot be empty";
    }
  }

  cancelForm() {
    window.location.reload();
  }

}
