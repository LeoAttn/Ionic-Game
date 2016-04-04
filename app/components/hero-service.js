/**
 * Created by bluedragonfly on 3/31/16.
 */
import {Injectable} from 'angular2/core'
import {StorageService} from './../storage-service'
import {Observable} from 'rxjs'

@Injectable()
export class HeroService {
    constructor(storage:StorageService) {
        this.storage = storage;

        this.name = storage.initOrGet("playerName", "");
        this.money = storage.initOrGet("playerMoney", 10000).map(x => parseInt(x));
        this.attackDamage = storage.initOrGet("playerDamage", 1).map(x => parseInt(x));
        this.level = storage.initOrGet("playerLevel", 1).map(x => parseInt(x));
        this.spells = storage.initOrGet("equippedSpells", []);//@Need to test this
        this.data = Observable.zip(this.name, this.money, this.attackDamage, this.level, this.spells,
            function (name, money, attackDamage, level, spells) {
                return ({name, money, attackDamage, level, spells});
            });
    }

    attack(monsterHealth) {
        let damage = 0;
        this.attackDamage.map(attDmg => attDmg = attDmg)
            .subscribe(attDmg => damage = attDmg);
        return monsterHealth - damage;
    }

    levelUp() {
        let nextLevel = 0;
        this.level = Observable.from(this.level
            .map(level => level + 1)
        );
        this.level.subscribe(level => {
            this.storage.set("playerLevel", level);
            nextLevel = level;
        });
        return nextLevel;
    }
}

