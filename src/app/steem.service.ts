import * as Steem from 'steem';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SteemService {
  private _global = new BehaviorSubject({});

  global$ = this._global.asObservable();

  constructor() { }

  getDynamicGlobalProperties() {
    return Steem.api.getDynamicGlobalProperties().then(globalProperties => {
      this._global.next(globalProperties);
    });
  }

}
