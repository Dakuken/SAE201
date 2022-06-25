/**
 * @jest-environment jsdom
 */
import Filtre from '../../src/controleur/Filtre';

test('on verifie si element n est pas undefined ou null', () => {
    let filtre = new Filtre();
    expect(() => { filtre.filtreBase(document.querySelector('pouet pouet ')); }).toThrowError();
});

test('on verifie si min = max ', () => {
    let filtre = new Filtre();
    document.body.innerHTML = `<div>
        <input id="Btn_Ensemble" value="1" />
    </div>`;
    expect(() => { filtre.filtreDate(document.querySelector('[id=Btn_Ensemble]'), document.querySelector('[id=Btn_Ensemble]')); }).toThrowError();
});

test('on verifie si element1 est undefined ou null ', () => {
    let filtre = new Filtre();
    document.body.innerHTML = `<div>
        <input id="bidule" value="5"/>
        <input id="Btn_2" value="5"/>
    </div>`;
    expect(() => { filtre.filtreDate(document.querySelector('[id=Btn_1]'), document.querySelector('[id=Btn_2]')); }).toThrowError();
});

test('on verifie si element2 est undefined ou null ', () => {
    let filtre = new Filtre();
    document.body.innerHTML = `<div>
        <input id="Btn_1" value="5"/>
        <input id="bidule"  value="5"/>
    </div>`;
    expect(() => { filtre.filtreDate(document.querySelector('[id=Btn_1]'), document.querySelector('[id=Btn_2]')); }).toThrowError();
});
