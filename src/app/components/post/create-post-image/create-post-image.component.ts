import { PostResponse } from './../../../models/post-response';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ForumResponse } from 'src/app/models/forum-response';
import { PostPayload } from 'src/app/models/post-payload';
import { ApiStorageService } from 'src/app/services/api-storage.service';
import { ForumService } from 'src/app/services/forum.service';
import { PostService } from 'src/app/services/post.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SubSink } from 'subsink';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-post-image',
  templateUrl: './create-post-image.component.html',
  styleUrls: ['./create-post-image.component.scss']
})
export class CreatePostImageComponent implements OnInit {
  private subs = new SubSink();
  forum: ForumResponse;
  postForm: FormGroup;
  postPayload: PostPayload;
  postType: string;
  errorMessage: string;
  dropFileErrorMessage: string;
  dropFileAccepted: boolean = false;

  filesList: any[] = [];
  fileMessage: string;
  file: File;

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;

  constructor(
    private activatedRouter: ActivatedRoute,
    private forumService: ForumService,
    private postService: PostService,
    private apiStorageService: ApiStorageService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.forumService.findForumByName(this.activatedRouter.snapshot.params['forum-name']).subscribe(
      (forumResponse: ForumResponse) => {
        this.forum = forumResponse;
      }
    );

    this.postForm = this.formBuilder.group({
      postTitle: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(85)]],
      profilePhoto:['', [ 
        Validators.required,
        RxwebValidators.file({maxFiles: 1}),
        RxwebValidators.image({maxHeight:5000,maxWidth:8000}),
        RxwebValidators.extension({extensions:["jpeg","jpg", "png"]})
      ]],       
      postType: ['', Validators.required]
    })

    this.postPayload = {
      title: '',
      content: '',
      contentMarkup: '',
      postType: '',
      forumName: ''
    }
  }

  
  onFileDropped($event) {
    this.errorMessage = "";
    this.dropFileErrorMessage = "";
    let fileName: string = "";
    let acceptableTypes: Array<string> = ['image/jpeg', 'image/jpg', 'image/png'];

    for(let item of $event) {
        if(acceptableTypes.includes(item.type)) {
          fileName = item.name;
          this.file = item;
          this.postForm.get('profilePhoto').clearValidators();
          this.postForm.get('profilePhoto').updateValueAndValidity();
        } else if(!acceptableTypes.includes(item.type)) {
          this.postForm.get('profilePhoto').reset();
          this.postForm.get('profilePhoto').updateValueAndValidity();
          this.postForm.get('profilePhoto').clearValidators();
          this.dropFileErrorMessage = "wrong file type"
          this.file = null;
        } 
    }

    if(this.file != null) {
      this.fileMessage = fileName + " image added";
    }
  }

  fileBrowseHandler(files) {
    this.errorMessage = "";
    this.file = files[0];
    let fileName: string = files[0].name;

    if(this.file != null) {
      this.fileMessage = fileName + " image added";
    }
  }

  deleteFile() {
      this.file = null;
      return;
  }

  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit() {
    if(this.postForm.controls['postType'].value != "" && this.postForm.controls['postTitle'].value != "") {
      this.postPayload.title = this.postForm.controls['postTitle'].value;
      this.postPayload.postType = this.postForm.controls['postType'].value;
      this.postPayload.forumName = this.forum.name;
      this.postPayload.content = 'Image';
 
      this.postType = this.postForm.controls['postType'].value;
      this.postService.addPost(this.postPayload).subscribe(
        (res: PostResponse) => {
          this.apiStorageService.uploadPostImage(this.file, res.title, res.id);
          this.router.navigate(['/forum/', this.forum.name,'sub-forum', this.postType.toLowerCase()])
        }
      );
    } else if(this.postForm.controls['postType'].value == "" && this.postForm.controls['postType'].value == "") {
        this.errorMessage = "Post title and post type is required";
    } else if(this.postForm.controls['postType'].value == "") {
        this.errorMessage = "Post type is required";
    } 

  }
}
