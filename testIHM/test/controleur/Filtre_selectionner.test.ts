/**
 * @jest-environment jsdom
 */
import SelectionFiltre from '../../src/controleur/Filtre_selectionner';

test('on verifie le constructor, selector', () => {
    expect(() => { new SelectionFiltre('', 'a'); }).toThrowError();
});

test('on verifie le constructor, part', () => {
    expect(() => { new SelectionFiltre('a', ''); }).toThrowError();
});

test('test contructor avec bonne valeur pour part', () => {
    document.body.innerHTML = `<div>
        <input id="Btn_Ensemble" />
            <span id="username" />
            <button id="button" />
    </div>`;
    let select = new SelectionFiltre('Btn_Ensemble', 'username');
    expect(select.part).toBe('username');
});

test('test contructor avec bonne valeur pour selector', () => {
    document.body.innerHTML = `<div>
        <input id="Btn_Ensemble" />
            <span id="username" />
            <button id="button" />
    </div>`;
    let select = new SelectionFiltre('Btn_Ensemble', 'username');
    expect(select.selector.id).toBe('Btn_Ensemble');
});

test('test contructor avec mauvaise valeur pour part', () => {
    document.body.innerHTML = `<div>
        <input id="Btn_Ensemble" />
            <span id="bidule" />
            <button id="button" />
    </div>`;
    expect(() => { new SelectionFiltre('Btn_Ensemble', 'username'); }).toThrowError();
});

test('test contructor avec mauvaise valeur pour selector', () => {
    document.body.innerHTML = `<div>
        <input id="Btn_bidule" />
            <span id="username" />
            <button id="button" />
    </div>`;
    expect(() => { new SelectionFiltre('Btn_Ensemble', 'username'); }).toThrowError();
});
