(function(){function define(custEl){let tagName=custEl.is;if(customElements.get(tagName)){console.warn("Already registered "+tagName);return}customElements.define(tagName,custEl)}const disabled="disabled";function XtallatX(superClass){return class extends superClass{constructor(){super(...arguments);this._evCount={}}static get observedAttributes(){return[disabled]}get disabled(){return this._disabled}set disabled(val){this.attr(disabled,val,"")}attr(name,val,trueVal){const v=val?"set":"remove";this[v+"Attribute"](name,trueVal||val)}to$(n){const mod=n%2;return(n-mod)/2+"-"+mod}incAttr(name){const ec=this._evCount;if(name in ec){ec[name]++}else{ec[name]=0}this.attr("data-"+name,this.to$(ec[name]))}attributeChangedCallback(name,oldVal,newVal){switch(name){case disabled:this._disabled=null!==newVal;break;}}de(name,detail,asIs){const eventName=name+(asIs?"":"-changed"),newEvent=new CustomEvent(eventName,{detail:detail,bubbles:!0,composed:!1});this.dispatchEvent(newEvent);this.incAttr(eventName);return newEvent}_upgradeProperties(props){props.forEach(prop=>{if(this.hasOwnProperty(prop)){let value=this[prop];delete this[prop];this[prop]=value}})}}}const on="on",noblock="noblock",iff="if",to="to";class P extends XtallatX(HTMLElement){constructor(){super();this._addedSMO=!1;this._connected=!1}get on(){return this._on}set on(val){this.attr(on,val)}get to(){return this._to}set to(val){this.attr(to,val)}get noblock(){return this._noblock}set noblock(val){this.attr(noblock,val,"")}get if(){return this._if}set if(val){this.attr(iff,val)}get input(){return this._input}set input(val){this._input=val}static get observedAttributes(){return super.observedAttributes.concat([on,to,noblock,iff])}attributeChangedCallback(name,oldVal,newVal){const f="_"+name;switch(name){case iff:case on:this[f]=newVal;break;case to:this._destIsNA="{NA}"===newVal;if(newVal.endsWith("}"))newVal+=";";this._to=newVal;this.parseTo();if(this._lastEvent)this._handleEvent(this._lastEvent);break;case noblock:this[f]=null!==newVal;break;}super.attributeChangedCallback(name,oldVal,newVal)}getPreviousSib(){let prevSibling=this;while(prevSibling&&prevSibling.tagName.startsWith("P-")){prevSibling=prevSibling.previousElementSibling}return prevSibling}connectedCallback(){this.style.display="none";this._upgradeProperties([on,to,noblock,"input",iff]);setTimeout(()=>this.doFake(),50)}doFake(){if(!this._if&&!this.hasAttribute("skip-init")){let lastEvent=this._lastEvent;if(!lastEvent){lastEvent={target:this.getPreviousSib(),isFake:!0}}if(this._handleEvent)this._handleEvent(lastEvent)}if(!this._addedSMO&&this.addMutationObserver){this.addMutationObserver(this,!1);this._addedSMO=!0}}detach(prevSibling){prevSibling.removeEventListener(this._on,this._boundHandleEvent)}disconnectedCallback(){const prevSibling=this.getPreviousSib();if(prevSibling&&this._boundHandleEvent)this.detach(prevSibling);this.disconnect()}_handleEvent(e){if(this.hasAttribute("debug"))debugger;if(!e)return;if(e.stopPropagation&&!this._noblock)e.stopPropagation();if(this._if&&!e.target.matches(this._if))return;this._lastEvent=e;if(!this._cssPropMap){return}this.pass(e)}attachEventListeners(){const prevSibling=this.getPreviousSib();if(!prevSibling)return;if(this._boundHandleEvent){return}else{this._boundHandleEvent=this._handleEvent.bind(this)}prevSibling.addEventListener(this._on,this._boundHandleEvent);prevSibling.removeAttribute("disabled")}onPropsChange(){if(!this._connected||!this._on||!this._to)return;this.attachEventListeners()}parseMapping(mapTokens,cssSelector){const splitPropPointer=mapTokens[1].split(":");this._cssPropMap.push({cssSelector:cssSelector,propTarget:splitPropPointer[0],propSource:0<splitPropPointer.length?splitPropPointer[1]:void 0})}parseTo(){if(this._cssPropMap&&this._to===this._lastTo)return;this._lastTo=this._to;this._cssPropMap=[];const splitPassDown=this._to.split("};"),onlyOne=2>=splitPassDown.length;splitPassDown.forEach(passDownSelectorAndProp=>{if(!passDownSelectorAndProp)return;const mapTokens=passDownSelectorAndProp.split("{");let cssSelector=mapTokens[0];if(!cssSelector&&onlyOne){cssSelector="*";this._m=1;this._hasMax=!0}this.parseMapping(mapTokens,cssSelector)})}setVal(e,target,map){const gpfp=this.getPropFromPath.bind(this),propFromEvent=map.propSource?gpfp(e,map.propSource):gpfp(e,"detail.value")||gpfp(e,"target.value");this.commit(target,map,propFromEvent)}commit(target,map,val){target[map.propTarget]=val}getPropFromPath(val,path){if(!path||"."===path)return val;return this.getProp(val,path.split("."))}getProp(val,pathTokens){let context=val,firstToken=!0;const cp="composedPath";pathTokens.forEach(token=>{if(context){if(firstToken&&context[cp]){firstToken=!1;const cpath=token.split(cp+"_");if(1===cpath.length){context=context[cpath[0]]}else{context=context[cp]()[parseInt(cpath[1])]}}else{context=context[token]}}});return context}disconnect(){if(this._sibObs)this._sibObs.disconnect()}}const m="m",p_d_if="p-d-if",_addedSMO="_addedSMO";class PD extends P{static get is(){return"p-d"}get m(){return this._m}set m(val){this.attr(m,val.toString())}static get observedAttributes(){return super.observedAttributes.concat([m])}pass(e){this.passDown(this.nextElementSibling,e,0)}passDown(start,e,count){let nextSib=start;while(nextSib){if("SCRIPT"!==nextSib.tagName){this._cssPropMap.forEach(map=>{if("*"===map.cssSelector||nextSib.matches&&nextSib.matches(map.cssSelector)){count++;this.setVal(e,nextSib,map)}const fec=nextSib.firstElementChild;if(this.id&&fec&&nextSib.hasAttribute(p_d_if)){if(this.matches(nextSib.getAttribute(p_d_if))){this.passDown(fec,e,count);let addedSMOTracker=nextSib[_addedSMO];if(!addedSMOTracker)addedSMOTracker=nextSib[_addedSMO]={};if(!addedSMOTracker[this.id]){if(null!==nextSib)this.addMutObs(nextSib,!0);nextSib[_addedSMO][this.id]=!0}}}})}if(this._hasMax&&count>=this._m)break;nextSib=nextSib.nextElementSibling}}attributeChangedCallback(name,oldVal,newVal){switch(name){case m:if(null!==newVal){this._m=parseInt(newVal);this._hasMax=!0}else{this._hasMax=!1}}super.attributeChangedCallback(name,oldVal,newVal);this.onPropsChange()}connectedCallback(){super.connectedCallback();this._upgradeProperties([m]);this._connected=!0;this.onPropsChange()}addMutObs(baseElement,isParent){let elementToObserve=isParent?baseElement:baseElement.parentElement;if(!elementToObserve)return;this._sibObs=new MutationObserver(()=>{if(!this._lastEvent)return;this._handleEvent(this._lastEvent)});this._sibObs.observe(elementToObserve,{childList:!0})}}define(PD);class PDX extends PD{static get is(){return"p-d-x"}parseMapping(mapTokens,cssSelector){const splitPropPointer1=mapTokens[1].split(";");splitPropPointer1.forEach(token=>{const splitPropPointer=token.split(":");this._cssPropMap.push({cssSelector:cssSelector,propTarget:splitPropPointer[0],propSource:0<splitPropPointer.length?splitPropPointer[1]:void 0})})}commit(target,map,val){if("."===map.propSource&&"."===map.propTarget){Object.assign(target,val);return}const targetPath=map.propTarget;if(targetPath.startsWith(".")){const cssClass=targetPath.substr(1),method=val?"add":"remove";target.classList[method](cssClass)}else if(-1<targetPath.indexOf(".")){const pathTokens=targetPath.split(".");this.createNestedProp(target,pathTokens,val)}else{target[targetPath]=val}}createNestedProp(target,pathTokens,val){const firstToken=pathTokens.shift(),tft=target[firstToken],returnObj={[firstToken]:tft?tft:{}};let targetContext=returnObj[firstToken];const lastToken=pathTokens.pop();pathTokens.forEach(token=>{let newContext=targetContext[token];if(!newContext){newContext=targetContext[token]={}}targetContext=newContext});targetContext[lastToken]=val;try{Object.assign(target,returnObj)}catch(e){}}attachEventListeners(){if("["!==this._on[0]){super.attachEventListeners();return}const prevSibling=this.getPreviousSib();if(!prevSibling)return;const split=this._on.split(",").map(s=>s.substr(1,s.length-2));this._attributeObserver=new MutationObserver(mutationRecords=>{const values={};split.forEach(attrib=>{values[attrib]=prevSibling.getAttribute(attrib)});this._handleEvent({mutationRecords:mutationRecords,values:values,target:prevSibling})});this._attributeObserver.observe(prevSibling,{attributes:!0,attributeFilter:split})}disconnect(){if(this._attributeObserver)this._attributeObserver.disconnect()}disconnectedCallback(){this.disconnect();super.disconnectedCallback()}}define(PDX);class PU extends P{static get is(){return"p-u"}pass(e){this._cssPropMap.forEach(map=>{const cssSel=map.cssSelector;let targetElement;const split=cssSel.split("/"),id=split[split.length-1];if(cssSel.startsWith("/")){targetElement=self[id]}else{const len=cssSel.startsWith("./")?0:split.length,host=this.getHost(this,0,split.length);if(host){if(host.shadowRoot){targetElement=host.shadowRoot.getElementById(id);if(!targetElement)targetElement=host.querySelector("#"+id)}else{targetElement=host.querySelector("#"+id)}}else{throw"Target Element Not found"}}this.setVal(e,targetElement,map)})}getHost(el,level,maxLevel){let parent=el;while(parent=parent.parentElement){if(11===parent.nodeType){const newLevel=level+1;if(newLevel>=maxLevel)return parent.host;return this.getHost(parent.host,newLevel,maxLevel)}else if("HTML"===parent.tagName){return parent}}}connectedCallback(){super.connectedCallback();this._connected=!0;this.onPropsChange()}}define(PU);class PDestal extends PDX{constructor(){super(...arguments);this._previousValues={}}static get is(){return"p-destal"}getPreviousSib(){let parent=this;while(parent=parent.parentNode){if(11===parent.nodeType){return parent.host}else if(-1<parent.tagName.indexOf("-")){return parent}else if("HTML"===parent.tagName){this.watchLocation();return null}}}doFakeEvent(){const split=this._on.split(","),searchParams=new URLSearchParams(location.search);let changedVal=!1;split.forEach(param=>{const trimmedParam=param.substr(1,param.length-2),searchParm=searchParams.get(trimmedParam);if(!changedVal&&searchParm!==this._previousValues[trimmedParam]){changedVal=!0}this._previousValues[trimmedParam]=searchParm});if(changedVal){const fakeEvent={target:this._previousValues};this._handleEvent(fakeEvent)}}watchLocation(){window.addEventListener("popstate",()=>{this.doFakeEvent()});this.doFakeEvent()}}define(PDestal);class PS extends PDX{static get is(){return"p-s"}pass(e){this.passDown(e.target,e,0)}}define(PS)})();