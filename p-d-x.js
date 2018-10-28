import { PD } from './p-d.js';
import { define } from 'xtal-latx/define.js';
//const attrib_filter = 'attrib-filter';
export class PDX extends PD {
    static get is() { return 'p-d-x'; }
    parseMapping(mapTokens, cssSelector) {
        const splitPropPointer1 = mapTokens[1].split(';');
        splitPropPointer1.forEach(token => {
            const splitPropPointer = token.split(':');
            this._cssPropMap.push({
                cssSelector: cssSelector,
                propTarget: splitPropPointer[0],
                propSource: splitPropPointer.length > 0 ? splitPropPointer[1] : undefined
            });
        });
    }
    commit(target, map, val) {
        if (map.propSource === '.' && map.propTarget === '.') {
            Object.assign(target, val);
            return;
        }
        const targetPath = map.propTarget;
        if (targetPath.startsWith('.')) {
            const cssClass = targetPath.substr(1);
            const method = val ? 'add' : 'remove';
            target.classList[method](cssClass);
        }
        else if (targetPath.indexOf('.') > -1) {
            const pathTokens = targetPath.split('.');
            // const lastToken = pathTokens.pop();
            this.createNestedProp(target, pathTokens, val);
        }
        else {
            target[targetPath] = val;
        }
    }
    createNestedProp(target, pathTokens, val) {
        const firstToken = pathTokens.shift();
        const tft = target[firstToken];
        const returnObj = { [firstToken]: tft ? tft : {} };
        let tc = returnObj[firstToken]; //targetContext
        const lastToken = pathTokens.pop();
        pathTokens.forEach(token => {
            let newContext = tc[token];
            if (!newContext) {
                newContext = tc[token] = {};
            }
            tc = newContext;
        });
        if (tc[lastToken] && typeof (val) === 'object') {
            Object.assign(tc[lastToken], val);
        }
        else {
            tc[lastToken] = val;
        }
        //this controversial line is to force the target to see new properties, even though we are updating nested properties.
        //In some scenarios, this will fail (like if updating element.dataset), but hopefully it's okay to ignore such failures 
        try {
            Object.assign(target, returnObj);
        }
        catch (e) { }
        ;
    }
    attchEvListnrs() {
        if (this._on[0] !== '[') {
            super.attchEvListnrs();
            return;
        }
        const prevSibling = this.getPSib();
        if (!prevSibling)
            return;
        const split = this._on.split(',').map(s => s.substr(1, s.length - 2));
        const config = {
            attributes: true,
            attributeFilter: split
        };
        this._attributeObserver = new MutationObserver(mutationRecords => {
            const values = {};
            split.forEach(attrib => {
                values[attrib] = prevSibling.getAttribute(attrib);
            });
            const fakeEvent = {
                mutationRecords: mutationRecords,
                values: values,
                target: prevSibling
            };
            this._hndEv(fakeEvent);
        });
        this._attributeObserver.observe(prevSibling, config);
    }
    disconnect() {
        if (this._attributeObserver)
            this._attributeObserver.disconnect();
    }
    disconnectedCallback() {
        this.disconnect();
        super.disconnectedCallback();
    }
}
define(PDX);
//# sourceMappingURL=p-d-x.js.map