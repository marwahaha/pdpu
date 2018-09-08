(function(){function define(custEl){let tagName=custEl.is;if(customElements.get(tagName)){console.warn("Already registered "+tagName);return}customElements.define(tagName,custEl)}const disabled="disabled";function XtallatX(superClass){return class extends superClass{constructor(){super(...arguments);this._evCount={}}static get observedAttributes(){return[disabled]}get disabled(){return this._disabled}set disabled(val){this.attr(disabled,val,"")}attr(name,val,trueVal){const v=val?"set":"remove";this[v+"Attribute"](name,trueVal||val)}to$(n){const mod=n%2;return(n-mod)/2+"-"+mod}incAttr(name){const ec=this._evCount;if(name in ec){ec[name]++}else{ec[name]=0}this.attr("data-"+name,this.to$(ec[name]))}attributeChangedCallback(name,oldVal,newVal){switch(name){case disabled:this._disabled=null!==newVal;break;}}de(name,detail,asIs){const eventName=name+(asIs?"":"-changed"),newEvent=new CustomEvent(eventName,{detail:detail,bubbles:!0,composed:!1});this.dispatchEvent(newEvent);this.incAttr(eventName);return newEvent}_upgradeProperties(props){props.forEach(prop=>{if(this.hasOwnProperty(prop)){let value=this[prop];delete this[prop];this[prop]=value}})}}}customElements.PDQ=class{static define(name,fn,adjustClass){class newClass extends XtallatX(HTMLElement){constructor(){super();this._connected=!1;this.style.display="none"}static get is(){return name}connectedCallback(){this._upgradeProperties(["input","disabled"]);this._connected=!0}get input(){return this._input}set input(val){this._input=val;this.value=fn(val);this.onPropsChange()}attributeChangedCallback(name,oldVal,newVal){super.attributeChangedCallback(name,oldVal,newVal);switch(name){case"input":this.input=JSON.parse(newVal);break;default:this.onPropsChange();}}onPropsChange(){if(this._disabled)return;const val=this.value;this.de("value",{value:val});let valueSummary=null;switch(typeof val){case"string":case"boolean":case"number":valueSummary=val.toString().substr(0,10);break;case"object":if(!val)return;if(Array.isArray(val)){valueSummary=val.length}else{valueSummary=Object.keys(val).toString()}}if(null!==valueSummary)this.setAttribute("value-ish",valueSummary)}}if(adjustClass){if(!adjustClass(newClass))return}define(newClass)}static $(str){return str.replace(/(<([^>]+)>)/ig,"")}}})();