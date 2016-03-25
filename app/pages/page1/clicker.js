import {Component} from 'angular2/core'
import {StoreDamages} from './Storage'


@Component({
    selector: 'clicker',
    template: `
        <input #count value=0 />
        <button (click)="hit(count)">HIT ME !</button>
    `
})
export class Clicker {
    constructor() {
        this.store = new StoreDamages();
        //count.value = this.store.getDamages();
    }

    hit(count) {
        this.store.addDamages(1);
        this.store.getDamages().then(damages => count.value = damages)
    }
}
