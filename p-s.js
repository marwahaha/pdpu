import { PDX } from './p-d-x.js';
export class PS extends PDX {
    static get is() { return 'p-s'; }
    pass(e) {
        this.passDown(e.target, e, 0);
    }
}
if (!customElements.get(PS.is))
    customElements.define(PS.is, PS);
//# sourceMappingURL=p-s.js.map