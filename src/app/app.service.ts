import {Subject} from 'rxjs/Subject';

export class AppService {
  toAnotherComponent = new Subject();
  toParent = new Subject();
  toChild = new Subject();

  sendToAnotherComponent(msg: string) {
    this.toAnotherComponent.next(msg);
  }

  sendToParent(msg: string) {
    this.toParent.next(msg);
  }

  sendToChild(msg: string) {
    this.toChild.next(msg);
  }
}
