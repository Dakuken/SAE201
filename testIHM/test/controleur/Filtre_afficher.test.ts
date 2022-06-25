/**
 * @jest-environment jsdom
 */
import AfficheFiltre from '../../src/controleur/Filtre_afficher';

test('test si init select bien le bon bouton et si il ajoute bien la classe', () => {
    // configure le body du document
    document.body.innerHTML = `<div>
        <input id="Btn_Ensemble" />
            <span id="username" />
            <button id="button" />
    </div>`;
    let filtre = new AfficheFiltre();
    filtre.init();
    expect((<HTMLInputElement>document.querySelector('[id=Btn_Ensemble]')).getAttribute('class')).toBe('Selection_Filtre');
});

test('verification des ajout des id avec bonne valeur ', () => {
    document.body.innerHTML = `<div>
    <input id="Btn_Ensemble" class="Selection_Filtre" />
    <input id="Btn_NumInt" />
        <span id="username" class="show"/>
        <button id="button" />
    <div>  </div>
    </div>`;
    let filtre = new AfficheFiltre();
    const button = <HTMLInputElement>document.querySelector('[id=button]');
    const previous = <HTMLInputElement>document.querySelector('.Selection_Filtre');
    filtre.selectFiltre(button, <HTMLSpanElement>document.querySelector('[id=username]'));
    expect(previous.getAttribute('class')).toBe('');
    expect(button.getAttribute('class')).toBe('Selection_Filtre');
});

test('verification des ajout des id avec bonne valeur ', () => {
    document.body.innerHTML = `<div>
    <input id="Btn_Ensemble"/>
    <input id="Btn_NumInt" />
        <span id="username" />
        <button id="button" />
    <div>  </div>
    </div>`;
    let filtre = new AfficheFiltre();
    const buttonExistePas = <HTMLInputElement>document.querySelector('[id=button]');
    expect(() => { filtre.selectFiltre(buttonExistePas, <HTMLSpanElement>document.querySelector('[id=username]')); }).toThrowError();
});

test('verification de l affichage du filtre erreur ', () => {
    document.body.innerHTML = `<div>
    <input id="Btn_Ensemble"/>
    <input id="Btn_NumInt" />
        <span id="bidule" />
        <button id="button" />
    <div>  </div>
    </div>`;
    let filtre = new AfficheFiltre();
    let span = (<HTMLSpanElement>document.querySelector('[id=username]'));
    console.log(span);

    expect(() => { filtre.show_hideFiltre(<HTMLSpanElement>document.querySelector('[id=username]')); }).toThrowError();
});
