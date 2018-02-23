import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppService} from '../app.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-another-component',
  templateUrl: './another-component.component.html',
  styleUrls: ['./another-component.component.css']
})
export class AnotherComponentComponent implements OnInit, OnDestroy {
  myMsgSubscription: Subscription;
  myMsg: string;
  @ViewChild('msgToParent') parentMsg: ElementRef;
  @ViewChild('msgToChild') childMsg: ElementRef;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.myMsgSubscription = this.appService.toAnotherComponent
      .subscribe((msg: string) => this.myMsg = msg);
  }

  ngOnDestroy() {
    this.myMsgSubscription.unsubscribe();
  }

  onSendToParent() {
    this.appService.toParent.next(this.parentMsg.nativeElement.value);
    this.parentMsg.nativeElement.value = '';
  }

  onSendToChild() {
    this.appService.toChild.next(this.childMsg.nativeElement.value);
    this.childMsg.nativeElement.value = '';
  }
}
