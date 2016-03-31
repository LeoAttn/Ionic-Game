/**
 * Created by bluedragonfly on 3/31/16.
 */
import {Injectable} from 'angular2/core'
import {StorageService} from './storage-service'
import {Observable} from 'rxjs'

@Injectable()
export class HeroService{
    constructor(storage:StorageService){
        this.nameData = Observable.fromPromise(storage.initOrGet("playerName", ""));
        this.moneyData = Observable.fromPromise(storage.initOrGet("playerMoney", 10000));
        this.attackDamageData = Observable.fromPromise(storage.initOrGet("playerDamage", 1));
        this.levelData = Observable.fromPromise(storage.initOrGet("playerLevel", 1));
        this.spellsData = Observable.fromPromise(storage.initOrGet("equippedSpells", ['','','','','']));//@Need to test this
        this.data = Observable.zip(this.nameData, this.moneyData, this.attackDamageData, this.levelData, this.spellsData, function(name,money, attackDamage,level, spells){
            return ({name,money,attackDamage,level,spells});
        });
    }
}

