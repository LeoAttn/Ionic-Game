/**
 * Created by bluedragonfly on 4/3/16.
 */
import {Component} from 'angular2/core'
import {Observable} from 'rxjs';
import {Store} from '../store';


@Component({
    selector: 'UI',
    template: `
        <div>Money {{money | async}}$</div>
        <div>{{name | async}}</div>
    `
})

export class UI {
    constructor(store:Store) {
        this.store = store;
        this.name = this.store.state.map(state => state.hero.name);
        this.money = this.store.state.map(state => state.hero.money);
    }
}


