import{XtallatX}from"./node_modules/xtal-latx/xtal-latx.js";const on="on",noblock="noblock";export class Prev extends XtallatX(HTMLElement){get on(){return this._on}set on(val){this.setAttribute(on,val)}get noblock(){return this._noblock}set noblock(val){if(val){this.setAttribute(noblock,"")}else{this.removeAttribute(noblock)}}static get observedAttributes(){return super.observedAttributes.concat([on])}attributeChangedCallback(name,oldVal,newVal){switch(name){case on:this._on=newVal;break;case noblock:}super.attributeChangedCallback(name,oldVal,newVal)}getPreviousSib(){let prevSibling=this;while(prevSibling&&"P-D"===prevSibling.tagName){prevSibling=prevSibling.previousElementSibling}return prevSibling}connectedCallback(){this._upgradeProperties([on])}disconnectedCallback(){const prevSibling=this.getPreviousSib();if(prevSibling&&this._boundHandleEvent)this.detach(prevSibling);this.disconnectSiblingObserver()}attachEventListeners(){const attrFilters=[],prevSibling=this.getPreviousSib();if("eval"===this._on&&"SCRIPT"===prevSibling.tagName){const evalObj=eval(prevSibling.innerText);this._handleEvent(evalObj)}else{if(this._boundHandleEvent){return}else{this._boundHandleEvent=this._handleEvent.bind(this)}this._handleEvent({target:prevSibling});prevSibling.addEventListener(this._on,this._boundHandleEvent);prevSibling.removeAttribute("disabled")}}}