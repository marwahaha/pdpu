import { P } from './p.js';
import { define } from 'xtal-latx/define.js';
import { PDNavDown } from './PDNavDown.js';
const m = 'm';
/**
 * `p-d`
 *  Pass data from one element down the DOM tree to other elements
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export class PD extends P {
    constructor() {
        super(...arguments);
        this._pdNavDown = [];
        //_hasMax!: boolean;
        this._m = Infinity;
    }
    static get is() { return 'p-d'; }
    get m() {
        return this._m;
    }
    set m(val) {
        this.attr(m, val.toString());
    }
    static get observedAttributes() {
        return super.observedAttributes.concat([m]);
    }
    pass(e) {
        this._lastEvent = e;
        this.attr('pds', '🌩️');
        //this.passDown(this.nextElementSibling, e, 0);
        let count = 0;
        this._pdNavDown.forEach(pdnd => {
            count += this.applyProps(pdnd);
        });
        this.attr('pds', '👂');
        this.attr('mtch', count.toString());
    }
    applyProps(pd) {
        const matches = pd.getMatches();
        matches.forEach(el => {
            this._cssPropMap.filter(map => map.cssSelector === pd.match).forEach(map => {
                this.setVal(this._lastEvent, el, map);
            });
        });
        return matches.length;
    }
    attributeChangedCallback(name, oldVal, newVal) {
        switch (name) {
            case m:
                if (newVal !== null) {
                    this._m = parseInt(newVal);
                    //this._hasMax = true;
                }
                else {
                    //this._hasMax = false;
                }
        }
        super.attributeChangedCallback(name, oldVal, newVal);
        this.onPropsChange();
    }
    connectedCallback() {
        super.connectedCallback();
        this._upgradeProperties([m]);
        this._connected = true;
        this.attr('pds', '📞');
        const bndApply = this.applyProps.bind(this);
        this._cssPropMap.forEach(pm => {
            const pdnd = new PDNavDown(this, pm.cssSelector, nd => bndApply(nd), this.m);
            pdnd.root = this;
            pdnd.init();
            this._pdNavDown.push(pdnd);
        });
        this.onPropsChange();
    }
}
define(PD);
//# sourceMappingURL=p-d.js.map