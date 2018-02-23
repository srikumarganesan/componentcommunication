import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ChildComponent} from '../child/child.component';
import {Subscription} from 'rxjs/Subscription';
import {AppService} from '../app.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
  sendToChild = '';
  msgFromChildEmitTxt = '';
  msgFromChildviaViewChild = '';
  myMsgSubscription: Subscription;
  myMsg: string;
  @ViewChild(ChildComponent) child;
  @ViewChild('msgAnother') msgAnother: ElementRef;

  onClickSend($event) {
    console.log(this.sendToChild);
    console.log($event);
  }

  onMsgAnother() {
    this.appService.toAnotherComponent.next(this.msgAnother.nativeElement.value);
    this.msgAnother.nativeElement.value = '';
  }

  msgFromChildEmit(msg: string) {
    console.log(msg);
    this.msgFromChildEmitTxt = msg;
  }

  ngAfterViewInit() {
    this.msgFromChildviaViewChild = this.child.msgToParentViaViewChild;
  }
  constructor(private appService: AppService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.myMsgSubscription = this.appService.toParent
      .subscribe((msg: string) => this.myMsg = msg);
  }

  ngOnDestroy() {
    this.myMsgSubscription.unsubscribe();
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

}
