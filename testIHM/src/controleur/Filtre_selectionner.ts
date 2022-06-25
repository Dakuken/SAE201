export default class SelectionFiltre {
    constructor(selector: string, part: string) {
        if (selector === '' || part === '') {
            throw new Error('Le selector ou "part" ne peuvent pas être vide');
        }

        this.selector = <HTMLInputElement>(document.querySelector(`[id=${selector}]`));
        if (this.selector === null || this.selector === undefined) {
            throw new Error('Mauvais selector entrée');
        }
        this.part = part;
        this.selectorPart = <HTMLElement>document.querySelector(`[id=${part}]`);
        if (this.selectorPart === null || this.selectorPart === undefined) {
            throw new Error('Mauvaise partie entrée');
        }
    }

    selector: HTMLInputElement;

    part: string;

    selectorPart: HTMLElement;
}
