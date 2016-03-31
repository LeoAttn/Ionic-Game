import {Component, IONIC_DIRECTIVES} from 'angular2/core'
import {Hello, Toto} from './hello'

@Component({
    selector: 'app',
    template: `
        <h1>App</h1>
        <hello></hello>
        <toto></toto>
    `,
    directives: [Hello, Toto, IONIC_DIRECTIVES]
})
export class App1 {
}
