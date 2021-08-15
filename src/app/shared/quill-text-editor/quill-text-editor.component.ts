import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quill-text-editor',
  templateUrl: './quill-text-editor.component.html',
  styleUrls: ['./quill-text-editor.component.scss']
})
export class QuillTextEditorComponent implements OnInit {

  constructor() { }

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

  ngOnInit(): void {
    
  }

}
