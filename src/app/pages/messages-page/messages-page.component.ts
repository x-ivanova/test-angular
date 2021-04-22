import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Message} from '../../interfaces/message.interface';
// @ts-ignore fake data
import json from '../../fake-data/messages.json';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss']
})
export class MessagesPageComponent{
  isLoadingError = false;
  isDataLoaded = false;

  messages: Array<Message> = [];

  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
    Validators.minLength(10),
    Validators.pattern('[0-9]+'),
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(public apiService: ApiService) {}

  getMessages(): void {
    if (this.phoneFormControl.status === 'VALID') {
      this.apiService.getMessages(this.phoneFormControl.value).subscribe(
        (res: Array<Message>) => {
          this.messages = res;

          // fake data
          this.messages = json;

          this.isDataLoaded = true;
        },
        () => {
          this.isLoadingError = true;
        });
    }
  }

}
