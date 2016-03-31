/**
 * Created by bluedragonfly on 3/31/16.
 */
import {Injectable} from 'angular2/core'
import {StorageService} from './storage-service'

@Injectable()
export class HeroService{
    constructor(storage:StorageService){
        this.name = storage.initOrGet("playerName", "");
        this.money = storage.initOrGet("playerMoney", 0);
        this.attackDamage = storage.initOrGet("playerDamage", 1);
        this.level = storage.initOrGet("playerLevel", 1);
        this.spells = storage.initOrGet("equippedSpells", []);//@Need to test this
    }
}

