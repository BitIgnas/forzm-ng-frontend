import { Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from "@angular/core";
import { map } from 'rxjs/internal/operators/map';
import { FileCheck } from 'angular-file-validator';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { RegisterStateService } from 'src/app/services/register-state.service';
import { RegisterPayload } from 'src/app/core/models/register-payload';
import { ApiStorageService } from 'src/app/services/api-storage.service';

@Component({
  selector: 'app-register-profile',
  templateUrl: './register-profile.component.html',
  styleUrls: ['./register-profile.component.scss']
})
export class RegisterProfileComponent implements OnInit {

  registerState: RegisterPayload;
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
        this.registerState = data;
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
      this.apiStorage.uploadUserProfile(this.file, this.registerState.username);
      this.router.navigate(['/register/success'])
    } else {
      this.errorMessage = "No file was selected"
    }
  }

  skipUserProfile() {
    this.router.navigate(['/register/success']);
  }
}
