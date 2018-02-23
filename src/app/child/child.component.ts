import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AppService} from '../app.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit, OnDestroy {
  @Input() message: string;
  @Output() toParentEmit = new EventEmitter<string>();
  @ViewChild('msgAnother') msgAnother: ElementRef;
  myMsgSubscription: Subscription;
  myMsg: string;
  msgToParentViaViewChild = 'Hello Parent using view child';
  parentMsg = '';
  constructor(private appService: AppService) { }

  onSend() {
    console.log(this.parentMsg);
    this.toParentEmit.emit(this.parentMsg);
  }

  ngOnInit() {
    this.myMsgSubscription = this.appService.toChild
      .subscribe((msg: string) => this.myMsg = msg);
  }

  ngOnDestroy() {
    this.myMsgSubscription.unsubscribe();
  }

  onSendAnother() {
    this.appService.toAnotherComponent.next(this.msgAnother.nativeElement.value);
    this.msgAnother.nativeElement.value = ''
  }
}
