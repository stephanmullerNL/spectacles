import * as Steem from 'steem';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {SteemGlobals} from './models/steemGlobals';

@Injectable()
export class SteemService {
  private _globals = new BehaviorSubject<SteemGlobals>(new SteemGlobals());

  globals$ = this._globals.asObservable();

  constructor() { }

  getDynamicGlobalProperties() {
    return Steem.api.getDynamicGlobalProperties().then(globalProperties => {
      this._globals.next(globalProperties);
    });
  }

}
