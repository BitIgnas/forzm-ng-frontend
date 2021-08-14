import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { ForumPayload } from './../../../models/forum-payload';
import { ForumResponse } from './../../../models/forum-response';
import { ForumService } from './../../../services/forum.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  forumForm: FormGroup;
  forumPayload: ForumPayload;
  filesList: any[] = [];
  errorMessage: string;
  file: File;

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;

  constructor(
    private apiStorage: ApiStorageService,
    private forumService: ForumService,
    private sharing: RegisterStateService,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.forumForm = this.formBuilder.group({
      forumName: ['', Validators.compose([Validators.pattern(/^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/), Validators.required])],
      forumGameType: ['', Validators.required],
      forumDescription: ['', [Validators.required, Validators.maxLength(140), Validators.minLength(4)]],
      profilePhoto:['', [ RxwebValidators.extension({extensions:["jpeg","jpg", "png", "jfif"]})]
      ]
    })

    this.forumPayload = {
      name: '',
      forumGameType: '',
      description: ''
    }
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
      this.forumForm.get('profilePhoto').reset();
      this.forumForm.get('profilePhoto').updateValueAndValidity();
      this.forumForm.get('profilePhoto').clearValidators();
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
    this.forumPayload.name = this.forumForm.controls['forumName'].value;
    this.forumPayload.forumGameType = this.forumForm.controls['forumGameType'].value;
    this.forumPayload.description = this.forumForm.controls['forumDescription'].value;

    if(this.file != null) {
      this.forumService.createForum(this.forumPayload).subscribe(
        (response) => {
          this.router.navigate(['/forum/all']);
          this.apiStorage.uploadForumImage(this.file, this.forumPayload.name);
        },
        (error: HttpErrorResponse) => {
          if(error.status == 409) {
            this.errorMessage = "Forum already exists";
          }
        }      
      );
    } else {
      this.forumService.createForum(this.forumPayload).subscribe(
        (response) => {
          this.router.navigate(['/forum/all']);
        },
        (error: HttpErrorResponse) => {
          if(error.status == 409) {
            this.errorMessage = "Forum already exists";
          }
        }
      );
    }
  }
}
