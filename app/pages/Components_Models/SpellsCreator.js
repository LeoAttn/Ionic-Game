/**
 * Created by Guillaume on 25/03/2016.
 */
import {IONIC_DIRECTIVES, Modal,Alert, NavController} from 'ionic-angular'
import {Component, Input} from 'angular2/core'
import {SpellModal} from './spell-modal'
import {Store} from '../../store'

@Component({
    selector: 'spell',
    template: `
      <ion-card-header>
        {{spell.name}}
      </ion-card-header>
      <ion-card-content>
         <button class="button button-dark" (click)=showModal(spell)>Info</button>
      </ion-card-content>
  `,
    directives: [IONIC_DIRECTIVES]
})

export class SpellComponent {
    @Input() spell;

    constructor(nav:NavController, store :Store){
        this.nav = nav
        this.store = store
    }

    showModal(spell) {
        const modal = Modal.create(SpellModal, {spell: this.spell});
        this.nav.present(modal)
    }

}

