export default function ViderAllChild(Parent:HTMLElement) {
    if (Parent !== null && Parent !== undefined) {
        const nbChild = Parent.childElementCount;
        for (let i = 0; i <= nbChild; i ++) {
            const child = Parent.childNodes;
            child.forEach((element) => {
                Parent.removeChild(element);
            });
        }
    }
}
