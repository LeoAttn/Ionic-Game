import {Component} from 'angular2/core'

@Component({
    selector: 'hello',
    template: `
        <input #name (keyup)="1" />
        <h1>HELLO {{name.value}} !</h1>
    `
})
export class Hello {
}

@Component({
    selector: 'toto',
    template: `
        <h2>{{message}} TOTO !</h2>
        <h3>{{date()}}</h3>
    `
})
export class Toto {
    constructor() {
        this.message = 'Bonjour'
    }

    date() {
        return new Date()
    }
}