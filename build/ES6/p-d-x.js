import{PD}from"./p-d.js";import{define}from"./node_modules/xtal-latx/define.js";export class PDX extends PD{static get is(){return"p-d-x"}parseMapping(mapTokens,cssSelector){const splitPropPointer1=mapTokens[1].split(";");splitPropPointer1.forEach(token=>{const splitPropPointer=token.split(":");this._cssPropMap.push({cssSelector:cssSelector,propTarget:splitPropPointer[0],propSource:0<splitPropPointer.length?splitPropPointer[1]:void 0})})}commit(target,map,val){if("."===map.propSource&&"."===map.propTarget){Object.assign(target,val);return}const targetPath=map.propTarget;if(targetPath.startsWith(".")){const cssClass=targetPath.substr(1),method=val?"add":"remove";target.classList[method](cssClass)}else if(-1<targetPath.indexOf(".")){const pathTokens=targetPath.split(".");this.createNestedProp(target,pathTokens,val)}else{target[targetPath]=val}}createNestedProp(target,pathTokens,val){const firstToken=pathTokens.shift(),tft=target[firstToken],returnObj={[firstToken]:tft?tft:{}};let targetContext=returnObj[firstToken];const lastToken=pathTokens.pop();pathTokens.forEach(token=>{let newContext=targetContext[token];if(!newContext){newContext=targetContext[token]={}}targetContext=newContext});targetContext[lastToken]=val;try{Object.assign(target,returnObj)}catch(e){}}attchEvListnrs(){if("["!==this._on[0]){super.attchEvListnrs();return}const prevSibling=this.getPSib();if(!prevSibling)return;const split=this._on.split(",").map(s=>s.substr(1,s.length-2));this._attributeObserver=new MutationObserver(mutationRecords=>{const values={};split.forEach(attrib=>{values[attrib]=prevSibling.getAttribute(attrib)});this._hndEv({mutationRecords:mutationRecords,values:values,target:prevSibling})});this._attributeObserver.observe(prevSibling,{attributes:!0,attributeFilter:split})}disconnect(){if(this._attributeObserver)this._attributeObserver.disconnect()}disconnectedCallback(){this.disconnect();super.disconnectedCallback()}}define(PDX);