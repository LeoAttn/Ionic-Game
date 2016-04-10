import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {StorageService} from './storage-service';
import {HeroService} from './components/hero-service';
import {ShopService} from './components/shop-service';
//import {SpellService} from './components/spellService';
import {Store} from './store';

@App({
    viewProviders: [
        Store,
        ShopService,
        StorageService,
        //SpellService,
        HeroService
    ],
    template: '<ion-nav [root]="rootPage"></ion-nav>',
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
    static get parameters() {
        return [[Platform]];
    }

    constructor(platform) {
        this.rootPage = TabsPage;

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }


}
