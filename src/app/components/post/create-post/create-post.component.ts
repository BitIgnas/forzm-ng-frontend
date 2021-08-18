import { UtilsService } from './../../../services/utils.service';
import { PostService } from './../../../services/post.service';
import { PostPayload } from './../../../models/post-payload';
import { HtmlToTextPipe } from './../../../core/pipes/html-to-text.pipe';
import { SubSink } from 'subsink';
import { ForumResponse } from 'src/app/models/forum-response';
import { ForumService } from 'src/app/services/forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  forum: ForumResponse;
  postForm: FormGroup;
  postPayload: PostPayload;
  postType: string;
  errorMessage: string;

  textEditorStyle = {
    height: '120px',
    border: '20px'
  }

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }]
    ]
  }

  constructor(
    private activatedRouter: ActivatedRoute,
    private forumService: ForumService,
    private postService: PostService,
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
      textEditor: [''],
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


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit() {
    if(this.postForm.controls['postType'].value != "") {
      this.postPayload.title = this.postForm.controls['postTitle'].value;
      this.postPayload.content = this.utilsService.convertHtmlToText(this.postForm.controls['textEditor'].value);
      this.postPayload.contentMarkup = this.postForm.controls['textEditor'].value;
      this.postPayload.postType = this.postForm.controls['postType'].value;
      this.postPayload.forumName = this.forum.name;

      this.postType = this.postForm.controls['postType'].value;
      this.postService.addPost(this.postPayload).subscribe(
        (res) => {
          this.router.navigate(['/forum/', this.forum.name,'sub-forum', this.postType.toLowerCase()])
        }
      );
    } else {
      this.errorMessage = "Post type is required"
    }

  }

}
