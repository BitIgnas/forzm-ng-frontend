import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { RegisterPayload } from 'src/app/models/register-payload';
import { ApiStorageService } from 'src/app/services/api-storage.service';
import { RegisterStateService } from 'src/app/services/register-state.service';

@Component({
  selector: 'app-forum-create-form',
  templateUrl: './forum-create-form.component.html',
  styleUrls: ['./forum-create-form.component.scss']
})
export class ForumCreateFormComponent implements OnInit {

  cregisterState: RegisterPayload;
  fileForm: FormGroup;
  filesList: any[] = [];
  errorMessage: string;
  file: File;

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;

  constructor(
    private apiStorage: ApiStorageService,
    private sharing: RegisterStateService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fileForm = this.formBuilder.group({
      profilePhoto:['', [ 
          RxwebValidators.file({maxFiles: 1}),
          RxwebValidators.image({maxHeight:2000,maxWidth:2000}),
          RxwebValidators.extension({extensions:["jpeg","jpg", "png"]})
        ]       
      ], 
  });

    this.sharing.getUser().subscribe(
      (data: RegisterPayload) => {
    
      },
      (error: string) => {
        console.log(error);
      }
    )
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
      this.fileForm.get('profilePhoto').reset();
      this.fileForm.get('profilePhoto').updateValueAndValidity();
      this.fileForm.get('profilePhoto').clearValidators();
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

  uploadUserProfile() {
    if(this.file != null) {
      
    } else {
      this.errorMessage = "No file was selected"
    }
  }

  skipUserProfile() {
    this.router.navigate(['/register/success']);
  }

}
