/**
 * @jest-environment jsdom
 */
import AfficherInfo from '../../src/controleur/Intervention_afficher';

test('init()', () => {
    document.body.innerHTML = '<p id="NoSelect"> </p>';
    let afficher = new AfficherInfo();
    afficher.init();
    expect((<HTMLParagraphElement>document.querySelector('[id=NoSelect]')).getAttribute('style')).toBe('visibility: hidden;');
});

test('noselect undefined', () => {
    document.body.innerHTML = '<p id="No"> </p>';
    let afficher = new AfficherInfo();
    expect(() => { afficher.init(); }).toThrowError();
});

test('selection undefined', () => {
    document.body.innerHTML = '<p id="No"> </p>';
    let afficher = new AfficherInfo();
    expect(() => { afficher.rowSelector(); }).toThrowError();
});

test('afficher modifier noSelect default style', () => {
    document.body.innerHTML = '<p id="NoSelect"> </p>';
    let afficher = new AfficherInfo();
    afficher.init();
    expect((<HTMLParagraphElement>document.querySelector('[id=NoSelect]')).getAttribute('style')).toBe('visibility: hidden;');
});

test('afficher modifier noselect undefined', () => {
    document.body.innerHTML = '<p id="No"> </p>';
    let afficher = new AfficherInfo();
    expect(() => { afficher.Afficher_Modifer(); }).toThrowError();
});