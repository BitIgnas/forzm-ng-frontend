import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

constructor() { }

  convertHtmlToText(value: any): string {
   const temp = document.createElement('div');
    temp.innerHTML = value;
    return temp.textContent || temp.innerText || '';
  }

  prepareUrlPostTitle(title: string) {
    return title.split("?").join("%3F")
  }

}
