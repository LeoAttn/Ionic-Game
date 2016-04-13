import {App, Platform, MenuController, IonicApp} from 'ionic-angular';
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
    template: `
        <ion-menu id="leftMenu" [content]="content">
          <ion-toolbar>
            <ion-title>Menu</ion-title>
          </ion-toolbar>
          <ion-content>
            <ion-list>
              <button ion-item (click)="menuAction('RESET')">
                Reset
              </button>
            </ion-list>
          </ion-content>
        </ion-menu>
        
        <ion-nav id="nav" #content [root]="rootPage"></ion-nav>
        `,
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
    static get parameters() {
        return [[Platform], [IonicApp], [MenuController], [Store]];
    }

    constructor(platform, app, menu, store) {
        this.app = app;
        this.menu = menu;
        this.store = store;
        this.rootPage = TabsPage;

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }

    menuAction(action) {
        if (action == 'RESET')
            this.store.dispatch({type: "RESET"});

        // close the menu when clicking a link from the menu
        this.menu.close();
    }


}
