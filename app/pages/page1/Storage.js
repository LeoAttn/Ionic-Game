import {Storage, LocalStorage} from 'ionic-angular';

export class StoreDamages {
    constructor() {
        this.local = new Storage(LocalStorage);
        this.local.set('damages', 0);
    }

    addDamages(nb) {
        this.local.get('damages')
            .then(damages => this.local.set('damages', parseInt(damages) + nb)
        )
    }

    getDamages() {
        return this.local.get('damages');
    }
}