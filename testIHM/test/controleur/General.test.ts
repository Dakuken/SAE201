/**
 * @jest-environment jsdom
 */
import ViderAllChild from '../../src/controleur/General';

test('test si on vide tout les enfant ', () => {
    let div = document.createElement('div');
    for (let i = 0; i <= 10; i ++) {
        let p = document.createElement('p');
        let div2 = document.createElement('div');
        div2.appendChild(p);
        div.appendChild(div2);
    }
    ViderAllChild(div);
    expect(div.childElementCount).toBe(0);
});
