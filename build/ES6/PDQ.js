import{XtallatX}from"./node_modules/xtal-latx/xtal-latx.js";export class PDQ{static define(name,fn,adjustClass){class newClass extends XtallatX(HTMLElement){constructor(){super(...arguments);this._connected=!1}connectedCallback(){this._upgradeProperties(["input","disabled"]);this._connected=!0}get input(){return this._input}set input(val){this._input=val;this.value=fn(val);this.onPropsChange()}attributeChangedCallback(name,oldVal,newVal){super.attributeChangedCallback(name,oldVal,newVal);switch(name){case"input":this.input=JSON.parse(newVal);break;default:this.onPropsChange();}}onPropsChange(){if(this._disabled)return;const val=this.value;this.de("value",{value:val});let valueSummary=null;switch(typeof val){case"string":case"boolean":case"number":valueSummary="array:"+val.toString();break;case"object":if(!val)return;if(Array.isArray(val)){valueSummary=val.length}else{valueSummary=Object.keys(val).toString()}}if(null!==valueSummary)this.setAttribute("value-ish",valueSummary)}}if(adjustClass){if(!adjustClass(newClass))return}customElements.define(name,newClass)}static $(str){return str.replace(/(<([^>]+)>)/ig,"")}}customElements.PDQ=PDQ;