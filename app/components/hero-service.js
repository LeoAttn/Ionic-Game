/**
 * Created by bluedragonfly on 3/31/16.
 */
import {Injectable} from 'angular2/core'
import {StorageService} from './storage-service'
import {Observable} from 'rxjs'

@Injectable()
export class HeroService {
    constructor(storage:StorageService) {
        this.name = storage.initOrGet("playerName", "");
        this.money = storage.initOrGet("playerMoney", 10000).map(x => parseInt(x));
        this.attackDamage = storage.initOrGet("playerDamage", 1).map(x => parseInt(x));
        this.level = storage.initOrGet("playerLevel", 15).map(x => parseInt(x));
        this.spells = storage.initOrGet("equippedSpells", []);//@Need to test this
        this.data = Observable.zip(this.name, this.money, this.attackDamage, this.level, this.spells,
            function (name, money, attackDamage, level, spells) {
                return ({name, money, attackDamage, level, spells});
            });
    }
}

