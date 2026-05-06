/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let i=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const r=this.t;if(e&&void 0===t){const e=void 0!==r&&1===r.length;e&&(t=s.get(r)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(r,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,r,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[s+1],t[0]);return new i(s,t,r)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return(t=>new i("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:o,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:m}=Object,p=globalThis,f=p.trustedTypes,g=f?f.emptyScript:"",u=p.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},_=(t,e)=>!o(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),s=this.getPropertyDescriptor(t,r,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){const{get:s,set:i}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);i?.call(this,e),this.requestUpdate(t,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const r of e)this.createProperty(r,t[r])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const r=this._$Eu(t,e);void 0!==r&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((r,s)=>{if(e)r.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),i=t.litNonce;void 0!==i&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}})(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(void 0!==s&&!0===r.reflect){const i=(void 0!==r.converter?.toAttribute?r.converter:y).toAttribute(e,r.type);this._$Em=t,null==i?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(t,e){const r=this.constructor,s=r._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=r.getPropertyOptions(s),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const n=i.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,r,s=!1,i){if(void 0!==t){const n=this.constructor;if(!1===s&&(i=this[t]),r??=n.getPropertyOptions(t),!((r.hasChanged??_)(i,e)||r.useDefault&&r.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,r))))return;this.C(t,e,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:s,wrapped:i},n){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==i||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,r]of t){const{wrapped:t}=r,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,r,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,u?.({ReactiveElement:x}),(p.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,w=t=>t,A=$.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+C,N=`<${k}>`,T=document,M=()=>T.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,U="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,z=/>/g,P=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,H=/"/g,B=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...r)=>({_$litType$:t,strings:e,values:r}))(1),j=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),G=new WeakMap,V=T.createTreeWalker(T,129);function Y(t,e){if(!I(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const r=t.length-1,s=[];let i,n=2===e?"<svg>":3===e?"<math>":"",a=O;for(let e=0;e<r;e++){const r=t[e];let o,c,l=-1,d=0;for(;d<r.length&&(a.lastIndex=d,c=a.exec(r),null!==c);)d=a.lastIndex,a===O?"!--"===c[1]?a=L:void 0!==c[1]?a=z:void 0!==c[2]?(B.test(c[2])&&(i=RegExp("</"+c[2],"g")),a=P):void 0!==c[3]&&(a=P):a===P?">"===c[0]?(a=i??O,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,o=c[1],a=void 0===c[3]?P:'"'===c[3]?H:D):a===H||a===D?a=P:a===L||a===z?a=O:(a=P,i=void 0);const h=a===P&&t[e+1].startsWith("/>")?" ":"";n+=a===O?r+N:l>=0?(s.push(o),r.slice(0,l)+S+r.slice(l)+C+h):r+C+(-2===l?e:h)}return[Y(t,n+(t[r]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class q{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let i=0,n=0;const a=t.length-1,o=this.parts,[c,l]=K(t,e);if(this.el=q.createElement(c,r),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&o.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=l[n++],r=s.getAttribute(t).split(C),a=/([.?@])?(.*)/.exec(e);o.push({type:1,index:i,name:a[2],strings:r,ctor:"."===a[1]?tt:"?"===a[1]?et:"@"===a[1]?rt:X}),s.removeAttribute(t)}else t.startsWith(C)&&(o.push({type:6,index:i}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let r=0;r<e;r++)s.append(t[r],M()),V.nextNode(),o.push({type:2,index:++i});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===k)o.push({type:2,index:i});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)o.push({type:7,index:i}),t+=C.length-1}i++}}static createElement(t,e){const r=T.createElement("template");return r.innerHTML=t,r}}function Z(t,e,r=t,s){if(e===j)return e;let i=void 0!==s?r._$Co?.[s]:r._$Cl;const n=R(e)?void 0:e._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),void 0===n?i=void 0:(i=new n(t),i._$AT(t,r,s)),void 0!==s?(r._$Co??=[])[s]=i:r._$Cl=i),void 0!==i&&(e=Z(t,i._$AS(t,e.values),i,s)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);V.currentNode=s;let i=V.nextNode(),n=0,a=0,o=r[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new Q(i,i.nextSibling,this,t):1===o.type?e=new o.ctor(i,o.name,o.strings,this,t):6===o.type&&(e=new st(i,this,t)),this._$AV.push(e),o=r[++a]}n!==o?.index&&(i=V.nextNode(),n++)}return V.currentNode=T,s}p(t){let e=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),R(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>I(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,s="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=q.createElement(Y(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new J(s,this),r=t.u(this.options);t.p(e),this.T(r),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new q(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,s=0;for(const i of t)s===e.length?e.push(r=new Q(this.O(M()),this.O(M()),this,this.options)):r=e[s],r._$AI(i),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,i){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=i,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=F}_$AI(t,e=this,r,s){const i=this.strings;let n=!1;if(void 0===i)t=Z(this,t,e,0),n=!R(t)||t!==this._$AH&&t!==j,n&&(this._$AH=t);else{const s=t;let a,o;for(t=i[0],a=0;a<i.length-1;a++)o=Z(this,s[r+a],e,a),o===j&&(o=this._$AH[a]),n||=!R(o)||o!==this._$AH[a],o===F?t=F:t!==F&&(t+=(o??"")+i[a+1]),this._$AH[a]=o}n&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class rt extends X{constructor(t,e,r,s,i){super(t,e,r,s,i),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??F)===j)return;const r=this._$AH,s=t===F&&r!==F||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==F&&(r===F||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const it=$.litHtmlPolyfillSupport;it?.(q,Q),($.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,r)=>{const s=r?.renderBefore??e;let i=s._$litPart$;if(void 0===i){const t=r?.renderBefore??null;s._$litPart$=i=new Q(e.insertBefore(M(),t),t,void 0,r??{})}return i._$AI(t),i})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const ot=nt.litElementPolyfillSupport;ot?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");const ct={alarm_control_panel:"mdi:shield-lock",binary_sensor:"mdi:radiobox-marked",camera:"mdi:cctv",climate:"mdi:thermostat",cover:"mdi:garage",device_tracker:"mdi:map-marker",fan:"mdi:fan",light:"mdi:lightbulb",lock:"mdi:lock",media_player:"mdi:play-box-multiple",person:"mdi:account",sensor:"mdi:gauge",switch:"mdi:toggle-switch-variant",sun:"mdi:white-balance-sunny",weather:"mdi:weather-partly-cloudy"},lt={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:alert-octagon",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"},dt={armed_away:"mdi:shield-lock",armed_custom_bypass:"mdi:shield-edit",armed_home:"mdi:shield-home",armed_night:"mdi:shield-moon",armed_vacation:"mdi:shield-airplane",arming:"mdi:shield-sync",disarmed:"mdi:shield-off",pending:"mdi:shield-alert",triggered:"mdi:shield-alert"},ht={armed_away:"ARMED AWAY",armed_custom_bypass:"ARMED CUSTOM",armed_home:"ARMED HOME",armed_night:"ARMED NIGHT",armed_vacation:"ARMED VACATION",clear_night:"CLEAR NIGHT","clear-night":"CLEAR NIGHT",closed:"CLOSED",disarmed:"DISARMED",home:"HOME",idle:"IDLE",inactive:"INACTIVE",locked:"LOCKED",not_home:"AWAY",off:"OFF",on:"ON",open:"OPEN",pending:"PENDING",playing:"PLAYING",triggered:"TRIGGERED",unavailable:"UNAVAILABLE",unknown:"UNKNOWN",unlocked:"UNLOCKED"},mt=new Set(["unavailable","unknown"]),pt=t=>String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),ft=(t,e=[],r=[])=>{const s=t?.states?Object.keys(t.states):[];return i=[...e,...r,...s],[...new Set(i.filter(Boolean))];var i},gt=t=>Boolean(t&&!mt.has(String(t.state??"").toLowerCase())),ut=t=>gt(t)&&""!==String(t.state??"").trim()&&!Number.isNaN(Number(t.state)),vt=(t,e=[],r=[],{domains:s=[],filter:i}={})=>{if(t?.states)for(const n of ft(t,e,r)){const e=t.states[n];if(!e)continue;const[r]=n.split(".");if((!s.length||s.includes(r))&&(!i||i(e)))return n}},yt=(t,e=[],r=[],{count:s=1,domains:i=[],filter:n}={})=>{if(!t?.states||s<1)return[];const a=[];for(const o of ft(t,e,r)){const e=t.states[o];if(!e)continue;const[r]=o.split(".");if((!i.length||i.includes(r))&&((!n||n(e))&&(a.push(o),a.length>=s)))break}return a},_t=({title:t="ALLSPARK FEED",subtitle:e="SURVEILLANCE CAMERA",accent:r="#e31e24",secondary:s="#1e3a8a"}={})=>{const i=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">\n    <defs>\n      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">\n        <stop offset="0%" stop-color="#060914"/>\n        <stop offset="100%" stop-color="#121d3a"/>\n      </linearGradient>\n      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">\n        <stop offset="0%" stop-color="${r}"/>\n        <stop offset="100%" stop-color="${s}"/>\n      </linearGradient>\n    </defs>\n    <rect width="800" height="450" fill="url(#bg)"/>\n    <g opacity="0.18" stroke="${r}" stroke-width="1">\n      <path d="M0 112h800"/>\n      <path d="M0 225h800"/>\n      <path d="M0 338h800"/>\n      <path d="M200 0v450"/>\n      <path d="M400 0v450"/>\n      <path d="M600 0v450"/>\n    </g>\n    <rect x="32" y="32" width="736" height="386" rx="18" fill="none" stroke="${r}" stroke-width="6"/>\n    <polygon points="96,96 228,96 266,134 266,246 228,284 96,284 58,246 58,134" fill="url(#accent)" opacity="0.94"/>\n    <text x="162" y="208" fill="#ffffff" font-family="Arial, sans-serif" font-size="84" font-weight="800" text-anchor="middle">TF</text>\n    <text x="320" y="178" fill="#ffffff" font-family="Arial, sans-serif" font-size="54" font-weight="800">${pt(t)}</text>\n    <text x="320" y="236" fill="#d8deed" font-family="Arial, sans-serif" font-size="28" letter-spacing="4">${pt(e)}</text>\n    <text x="320" y="302" fill="#8ea0c5" font-family="Arial, sans-serif" font-size="20" letter-spacing="3">TRANSFORMERS ALLSPARK UI</text>\n  </svg>`;return`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(i)}`},bt=n`
  :host {
    --transformers-primary-color: #e31e24;
    --transformers-secondary-color: #1e3a8a;
    --transformers-accent-color: #fbbf24;
    --transformers-background-color: #0a0e27;
    --transformers-panel-color: #1a1f3a;
    --transformers-border-color: #e31e24;
    --transformers-text-color: #ffffff;
    --transformers-muted-text-color: rgba(255, 255, 255, 0.78);
    --transformers-glow-color: rgba(227, 30, 36, 0.6);
    --transformers-font-g1: 'Transformers G1', 'Arial Black', sans-serif;
    --transformers-font-movie: 'Transformers Movie', 'Arial Black', sans-serif;
    --transformers-theme-font-family: var(--transformers-card-font-family, var(--transformers-font-movie));
    --transformers-theme-header-font: var(--transformers-header-font-family, var(--transformers-theme-font-family));
    --transformers-resolved-font-family: var(--transformers-theme-font-family);
    --transformers-resolved-header-font: var(--transformers-theme-header-font);
    --transformers-grid-opacity: 0.15;
    display: block;
  }

  .card {
    background: linear-gradient(135deg, var(--transformers-background-color) 0%, #0f1632 100%);
    color: var(--transformers-text-color);
    border: 3px solid var(--transformers-border-color);
    border-left: 6px solid var(--transformers-border-color);
    box-shadow:
      0 0 20px var(--transformers-glow-color),
      inset 0 0 30px rgba(227, 30, 36, 0.1),
      inset 4px 0 8px rgba(30, 58, 138, 0.3);
    padding: 20px;
    position: relative;
    overflow: hidden;
    clip-path: polygon(
      0 0,
      calc(100% - 12px) 0,
      100% 12px,
      100% 100%,
      12px 100%,
      0 calc(100% - 12px)
    );
  }

  .card.font-g1 {
    --transformers-resolved-font-family: var(--transformers-font-g1);
    --transformers-resolved-header-font: var(--transformers-font-g1);
  }

  .card.font-movie {
    --transformers-resolved-font-family: var(--transformers-font-movie);
    --transformers-resolved-header-font: var(--transformers-font-movie);
  }

  .card.font-theme {
    --transformers-resolved-font-family: var(--transformers-theme-font-family);
    --transformers-resolved-header-font: var(--transformers-theme-header-font);
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      linear-gradient(90deg, var(--transformers-border-color) 1px, transparent 1px),
      linear-gradient(0deg, var(--transformers-border-color) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: var(--transformers-grid-opacity);
    pointer-events: none;
    z-index: 1;
  }

  .card::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(30, 58, 138, 0.3),
      rgba(30, 58, 138, 0.2)
    );
    pointer-events: none;
    z-index: 1;
  }

  .card-content {
    position: relative;
    z-index: 2;
    font-family: var(--transformers-resolved-font-family);
  }

  .card-header {
    font-family: var(--transformers-resolved-header-font);
    font-size: 1.1em;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--transformers-border-color);
    font-weight: bold;
    text-shadow:
      0 0 10px var(--transformers-glow-color),
      2px 2px 4px rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
  }

  .card-header::before {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 8px solid var(--transformers-border-color);
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    filter: drop-shadow(0 0 4px var(--transformers-glow-color));
  }

  .card-header::after {
    content: '';
    position: absolute;
    right: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, var(--transformers-accent-color), transparent);
  }

  .status-indicator {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 8px;
    position: relative;
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
  }

  .status-indicator::before {
    content: '';
    position: absolute;
    inset: 0;
    background: currentColor;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .status-ok {
    color: #10b981;
    filter: drop-shadow(0 0 4px #10b981);
  }

  .status-warning {
    color: var(--transformers-accent-color);
    filter: drop-shadow(0 0 4px var(--transformers-accent-color));
  }

  .status-error {
    color: var(--transformers-primary-color);
    filter: drop-shadow(0 0 4px var(--transformers-primary-color));
  }

  .status-inactive {
    color: rgba(255, 255, 255, 0.55);
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.2));
  }

  .card.theme-decepticon {
    --transformers-primary-color: #7c3aed;
    --transformers-secondary-color: #4c1d95;
    --transformers-accent-color: #a78bfa;
    --transformers-border-color: #7c3aed;
    --transformers-glow-color: rgba(124, 58, 237, 0.6);
  }

  .card.theme-autobot {
    --transformers-primary-color: #e31e24;
    --transformers-secondary-color: #1e3a8a;
    --transformers-border-color: #e31e24;
    --transformers-glow-color: rgba(227, 30, 36, 0.6);
  }

  .transformers-icon,
  .transformers-icon-text {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    filter: drop-shadow(0 0 2px var(--transformers-glow-color));
  }

  .transformers-icon ha-icon,
  .transformers-inline-icon ha-icon {
    --mdc-icon-size: 1em;
    width: 1em;
    height: 1em;
  }

  .blinking-cursor {
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  .tech-divider {
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--transformers-border-color),
      var(--transformers-accent-color),
      var(--transformers-border-color),
      transparent
    );
    margin: 16px 0;
    position: relative;
  }

  .tech-divider::before,
  .tech-divider::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: var(--transformers-accent-color);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    top: -2px;
  }

  .tech-divider::before {
    left: 0;
  }

  .tech-divider::after {
    right: 0;
  }
`;class xt extends at{static get properties(){return{hass:{type:Object},config:{type:Object}}}setConfig(t){if(!t||"object"!=typeof t)throw new Error("Invalid configuration");this.config=t}getCardSize(){return 3}_hasStates(){return Boolean(this.hass&&this.hass.states)}_normalizeEntityConfig(t){return"string"==typeof t?{entity:t}:t||{}}_getEntity(t){if(t&&this._hasStates())return this.hass.states[t]}_getFontStyle(t=this.config){const e=String(t?.font_style||"theme").toLowerCase();return["theme","g1","movie"].includes(e)?e:"theme"}_cardClasses(t=[]){return["card",`font-${this._getFontStyle()}`,...t.filter(Boolean)].join(" ")}_getEntityName(t,e=""){return e||t?.attributes?.friendly_name||t?.entity_id||"UNKNOWN"}_getFriendlyStateText(t){if(null==t)return"UNKNOWN";const e=String(t);return ht[e]||e.replace(/[_-]+/g," ").toUpperCase()}_getEntityStateText(t,{includeUnit:e=!0}={}){if(!t)return"UNAVAILABLE";const r=t.state,s=e&&t.attributes?.unit_of_measurement||"";if(null==r||""===r)return"UNKNOWN";const i=Number(r);if(!Number.isNaN(i)&&""!==String(r).trim())return`${r}${s?` ${s}`:""}`.trim();const n=this._getFriendlyStateText(r);return s?`${n} ${s}`.trim():n}_getSeverityClass(t){if(!t)return"status-error";const e=String(t.state||"").toLowerCase();return"unavailable"===e||"unknown"===e||"problem"===e||"triggered"===e?"status-error":e.includes("pending")||e.includes("arming")||e.includes("warning")||"low"===e?"status-warning":["on","open","active","home","playing","locked","armed_away","armed_home","armed_night","armed_custom_bypass","armed_vacation"].includes(e)?"status-ok":["off","closed","inactive","idle","disarmed","not_home","unlocked"].includes(e)?"status-inactive":"status-ok"}_isActiveState(t){return"status-ok"===this._getSeverityClass(t)}_getWeatherIcon(t){return lt[t]||"mdi:weather-partly-cloudy"}_getDefaultIcon(t){if(!t?.entity_id)return"mdi:flash";const[e]=t.entity_id.split("."),r=String(t.state||"").toLowerCase();return"weather"===e?this._getWeatherIcon(r):"alarm_control_panel"===e?dt[r]||ct[e]:"light"===e?"on"===r?"mdi:lightbulb-on":"mdi:lightbulb":"binary_sensor"===e?"on"===r?"motion"===t.attributes?.device_class?"mdi:motion-sensor":"mdi:check-circle":"door"===t.attributes?.device_class?"mdi:door-closed":"mdi:radiobox-blank":"lock"===e?"unlocked"===r?"mdi:lock-open-variant":"mdi:lock":ct[e]||"mdi:flash"}_resolveIcon(t,e){return e||(t?.attributes?.icon?t.attributes.icon:this._getDefaultIcon(t))}_renderIcon(t,e="transformers-icon"){return t?"string"==typeof t&&t.startsWith("mdi:")?W`<span class="${e} transformers-inline-icon"><ha-icon .icon=${t}></ha-icon></span>`:W`<span class="${e} transformers-icon-text">${t}</span>`:W``}_openMoreInfo(t){t&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}_callService(t,e={}){if(!t||!this.hass)return;const[r,s]=t.split(".");r&&s&&this.hass.callService(r,s,e)}_navigate(t){t&&(window.history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed")))}}customElements.define("transformers-status-card",class extends xt{static get styles(){return[bt,n`
        .status-grid {
          display: grid;
          gap: 12px;
        }

        .status-item {
          display: flex;
          align-items: center;
          padding: 10px 12px;
          background: linear-gradient(
            90deg,
            rgba(227, 30, 36, 0.1) 0%,
            rgba(30, 58, 138, 0.05) 100%
          );
          border-left: 3px solid var(--transformers-border-color);
          position: relative;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
        }

        .status-label {
          flex: 1;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 0.85em;
          letter-spacing: 1.5px;
          font-family: var(--transformers-resolved-font-family);
        }

        .status-value {
          font-family: var(--transformers-resolved-font-family);
          font-size: 1.05em;
          margin-left: 8px;
          text-align: right;
        }

        .system-status {
          margin-top: 16px;
          padding: 14px;
          border: 2px solid var(--transformers-secondary-color);
          background: linear-gradient(
            135deg,
            rgba(30, 58, 138, 0.2) 0%,
            rgba(227, 30, 36, 0.1) 100%
          );
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
        }

        .system-status-header {
          font-size: 0.75em;
          margin-bottom: 8px;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .system-message {
          font-family: var(--transformers-resolved-font-family);
          line-height: 1.6;
          font-weight: bold;
        }

        .card.theme-red {
          --transformers-primary-color: #dc2626;
          --transformers-border-color: #dc2626;
          --transformers-glow-color: rgba(220, 38, 38, 0.6);
        }

        .card.theme-yellow {
          --transformers-primary-color: #fbbf24;
          --transformers-border-color: #fbbf24;
          --transformers-glow-color: rgba(251, 191, 36, 0.6);
        }
      `]}render(){if(!this.config)return W``;const t=this.config.entities||[],e=this.config.title||"SYSTEM STATUS",r=this.config.message||"ALL SYSTEMS OPERATIONAL",s=!1!==this.config.show_message,i=this.config.theme||"autobot";return W`
      <div class="${this._cardClasses([`theme-${i}`])}">
        <div class="card-content">
          <div class="card-header">${e}</div>
          <div class="status-grid">
            ${t.map(t=>this._renderEntity(t))}
          </div>
          ${s?W`
                <div class="system-status">
                  <div class="system-status-header">SYSTEM MESSAGE</div>
                  <div class="system-message">> ${r}</div>
                </div>
              `:""}
        </div>
      </div>
    `}_renderEntity(t){const e=this._normalizeEntityConfig(t),r=e.entity,s=this._getEntity(r);return s?W`
      <div class="status-item" @click=${()=>this._openMoreInfo(r)}>
        <span class="status-indicator ${this._getSeverityClass(s)}"></span>
        <span class="status-label">${this._getEntityName(s,e.name)}</span>
        <span class="status-value">${this._getEntityStateText(s)}</span>
      </div>
    `:W`
        <div class="status-item">
          <span class="status-indicator status-error"></span>
          <span class="status-label">${r||"UNKNOWN"}</span>
          <span class="status-value">UNAVAILABLE</span>
        </div>
      `}static getStubConfig(t,e=[],r=[]){const s=yt(t,e,r,{count:3,domains:["binary_sensor","sensor","number","input_number","light","switch","lock","alarm_control_panel"],filter:gt});return{type:"custom:transformers-status-card",title:"SYSTEM STATUS",entities:s.length?s:[{entity:"binary_sensor.front_door",name:"MAIN ENTRANCE"},{entity:"sensor.temperature_living_room",name:"AMBIENT TEMP"}],message:"ALL SYSTEMS OPERATIONAL",show_message:!0,theme:"autobot",font_style:"theme"}}});customElements.define("transformers-sensor-card",class extends xt{static get styles(){return[bt,n`
        .sensor-display {
          text-align: center;
          padding: 20px;
        }

        .sensor-value {
          font-size: 3em;
          font-weight: bold;
          font-family: var(--transformers-resolved-font-family);
          text-shadow: 0 0 10px var(--transformers-glow-color);
          margin: 16px 0;
        }

        .sensor-unit {
          font-size: 0.38em;
          margin-left: 8px;
          opacity: 0.82;
        }

        .progress-container {
          margin-top: 20px;
          background: rgba(0, 0, 0, 0.4);
          height: 24px;
          border: 1px solid var(--transformers-border-color);
          position: relative;
          overflow: hidden;
          clip-path: polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px);
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--transformers-border-color), var(--transformers-accent-color));
          transition: width 0.3s ease;
          box-shadow: 0 0 10px var(--transformers-glow-color);
        }
      `]}render(){if(!this.config)return W``;const t=this._getEntity(this.config.entity);if(!t)return W`
        <div class="${this._cardClasses()}">
          <div class="card-content">
            <div class="card-header">${this.config.name||"SENSOR ERROR"}</div>
            <div class="sensor-display">
              <div class="sensor-value">UNAVAILABLE</div>
            </div>
          </div>
        </div>
      `;const e=this._getEntityName(t,this.config.name),r=Number(t.state),s=this.config.unit||t.attributes.unit_of_measurement||"",i=!1!==this.config.show_graph,n=Number(this.config.max||100),a=!Number.isNaN(r)&&n>0?Math.max(0,Math.min(r/n*100,100)):0;return W`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${e}</div>
          <div class="sensor-display">
            <div class="sensor-value">
              ${t.state}
              ${s?W`<span class="sensor-unit">${s}</span>`:""}
            </div>
            ${i?W`
                  <div class="progress-container">
                    <div class="progress-bar" style="width: ${a}%"></div>
                  </div>
                `:""}
          </div>
        </div>
      </div>
    `}static getStubConfig(t,e=[],r=[]){const s=t=>ut(t)&&Number(t.state)>=0,i=vt(t,e,r,{domains:["sensor","number","input_number"],filter:s})||vt(t,e,r,{filter:s}),n=i?t?.states?.[i]:void 0,a=n?.attributes?.unit_of_measurement||"",o=Number(n?.state);return{type:"custom:transformers-sensor-card",...i?{entity:i}:{entity:"sensor.cpu_temperature",name:"CORE TEMPERATURE"},show_graph:!0,max:"%"===a?100:a.includes("°")?50:Number.isNaN(o)?100:Math.max(100,20*Math.ceil(o/10)),font_style:"theme"}}});customElements.define("transformers-button-card",class extends xt{static get styles(){return[bt,n`
        .buttons-container {
          display: grid;
          gap: 12px;
        }

        .buttons-container.columns-1 { grid-template-columns: 1fr; }
        .buttons-container.columns-2 { grid-template-columns: repeat(2, 1fr); }
        .buttons-container.columns-3 { grid-template-columns: repeat(3, 1fr); }

        .button {
          padding: 16px;
          background: linear-gradient(135deg, rgba(227, 30, 36, 0.3) 0%, rgba(30, 58, 138, 0.2) 100%);
          border: 2px solid var(--transformers-border-color);
          color: var(--transformers-text-color);
          font-family: var(--transformers-resolved-font-family);
          font-size: 0.9em;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
        }

        .button:hover {
          box-shadow: 0 0 15px var(--transformers-glow-color);
          transform: translateY(-2px);
        }

        .button.active {
          background: linear-gradient(135deg, var(--transformers-border-color) 0%, var(--transformers-secondary-color) 100%);
          box-shadow: 0 0 20px var(--transformers-glow-color);
        }

        .button.status-warning {
          border-color: var(--transformers-accent-color);
        }

        .button.status-error {
          border-color: var(--transformers-primary-color);
        }

        .button-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
          font-size: 1.2em;
        }

        .button-icon ha-icon {
          --mdc-icon-size: 1.2em;
        }

        .button-state {
          display: block;
          font-size: 0.75em;
          margin-top: 6px;
          opacity: 0.8;
          letter-spacing: 1px;
        }
      `]}render(){if(!this.config)return W``;const t=this.config.title||"CONTROL PANEL",e=Math.min(Math.max(this.config.columns||1,1),3),r=this.config.buttons||[];return W`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${t}</div>
          <div class="buttons-container columns-${e}">
            ${r.map(t=>this._renderButton(t))}
          </div>
        </div>
      </div>
    `}_renderButton(t){const e=this._getEntity(t.entity),r=this._resolveIcon(e,t.icon),s=e?this._getEntityStateText(e):"",i=e?this._getSeverityClass(e):"status-inactive",n=!!e&&this._isActiveState(e);return W`
      <button class="button ${i} ${n?"active":""}" @click=${()=>this._handleButtonClick(t)}>
        ${r?W`<span class="button-icon">${this._renderIcon(r,"button-icon")}</span>`:""}
        ${t.name||this._getEntityName(e,"BUTTON")}
        ${t.show_state&&s?W`<span class="button-state">${s}</span>`:""}
      </button>
    `}_handleButtonClick(t){if(t.tap_action)return void this._handleTapAction(t.tap_action,t);if(t.service)return void this._callService(t.service,t.service_data||{});if(!t.entity)return;const e=t.action||"toggle";"toggle"===e?this._callService("homeassistant.toggle",{entity_id:t.entity}):"turn_on"===e?this._callService("homeassistant.turn_on",{entity_id:t.entity}):"turn_off"===e?this._callService("homeassistant.turn_off",{entity_id:t.entity}):"more-info"===e&&this._openMoreInfo(t.entity)}_handleTapAction(t,e){"navigate"===t.action?this._navigate(t.navigation_path):"url"===t.action?window.open(t.url_path,"_blank","noopener"):"more-info"===t.action&&e.entity?this._openMoreInfo(e.entity):"call-service"===t.action?this._callService(t.service,t.service_data||{}):"toggle"===t.action&&e.entity&&this._callService("homeassistant.toggle",{entity_id:e.entity})}static getStubConfig(t,e=[],r=[]){const s=yt(t,e,r,{count:2,domains:["light","switch","fan","cover","lock","media_player","input_boolean","climate"],filter:gt}),i=s.length?s.map(t=>({entity:t,show_state:!0})):[{name:"ILLUMINATION",show_state:!0},{name:"BEVERAGE SYS",show_state:!0}];return{type:"custom:transformers-button-card",title:"CONTROL PANEL",columns:Math.min(Math.max(i.length,1),2),buttons:i,font_style:"theme"}}});customElements.define("transformers-text-card",class extends xt{static get styles(){return[bt,n`
        .text-content {
          padding: 12px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--transformers-secondary-color);
          font-family: var(--transformers-resolved-font-family);
          line-height: 1.8;
        }

        .text-content.size-small { font-size: 0.85em; }
        .text-content.size-medium { font-size: 1em; }
        .text-content.size-large { font-size: 1.2em; }

        .text-content.align-left { text-align: left; }
        .text-content.align-center { text-align: center; }
        .text-content.align-right { text-align: right; }

        .text-prompt {
          color: var(--transformers-accent-color);
          margin-right: 8px;
        }

        .text-line {
          margin: 4px 0;
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        .typing-effect {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 2s steps(40);
        }
      `]}render(){if(!this.config)return W``;const t=this.config.title||"MESSAGE",e=this.config.size||"medium",r=this.config.align||"left",s=!1!==this.config.show_prompt,i=this.config.typing_effect||!1,n=this._resolveContent().split("\n");return W`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${t}</div>
          <div class="text-content size-${e} align-${r} ${i?"typing-effect":""}">
            ${n.map(t=>W`
                <div class="text-line">
                  ${s&&t.trim()?W`<span class="text-prompt">></span>`:""}
                  ${t}
                </div>
              `)}
          </div>
        </div>
      </div>
    `}_resolveContent(){let t=this.config.content||"";const e=this._getEntity(this.config.entity);if(e&&this.config.state_content&&(t=this.config.state_content[e.state]||this.config.state_content.default||t),!e||!t)return t;let r=t.replace(/\{\{state\}\}/g,e.state).replace(/\{\{friendly_name\}\}/g,e.attributes.friendly_name||this.config.entity).replace(/\{\{unit\}\}/g,e.attributes.unit_of_measurement||"");const s=Array.from(r.matchAll(/\{\{attribute\.([^}]+)\}\}/g));for(const t of s){const s=t[1],i=e.attributes[s]??"";r=r.replace(t[0],String(i))}return r}static getStubConfig(t,e=[],r=[]){const s=vt(t,e,r,{domains:["sensor","weather","binary_sensor","light","alarm_control_panel"],filter:gt});return{type:"custom:transformers-text-card",title:"SYSTEM NOTICE",...s?{entity:s,content:"{{friendly_name}} :: {{state}} {{unit}}"}:{content:"ATTENTION: ALL AUTOBOTS\nMISSION BRIEFING AT 0800 HOURS"},size:"medium",align:"left",show_prompt:!0,typing_effect:!1,font_style:"theme"}}});customElements.define("transformers-gauge-card",class extends xt{static get styles(){return[bt,n`
        .gauge-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }

        .gauge-svg {
          width: 200px;
          height: 200px;
        }

        .gauge-background {
          fill: none;
          stroke: rgba(255, 255, 255, 0.1);
          stroke-width: 12;
        }

        .gauge-progress {
          fill: none;
          stroke: var(--transformers-border-color);
          stroke-width: 12;
          stroke-linecap: round;
          filter: drop-shadow(0 0 8px var(--transformers-glow-color));
          transition: stroke-dashoffset 0.5s ease;
        }

        .gauge-progress.severity-yellow {
          stroke: var(--transformers-accent-color);
        }

        .gauge-progress.severity-red {
          stroke: #dc2626;
        }

        .gauge-value {
          font-size: 2.5em;
          font-weight: bold;
          font-family: var(--transformers-resolved-font-family);
          text-shadow: 0 0 10px var(--transformers-glow-color);
          margin-top: 16px;
        }

        .gauge-unit {
          font-size: 0.4em;
          margin-left: 4px;
        }
      `]}render(){if(!this.config)return W``;const t=this._getEntity(this.config.entity);if(!t)return W`
        <div class="${this._cardClasses()}">
          <div class="card-content">
            <div class="card-header">${this.config.name||"GAUGE ERROR"}</div>
            <div class="gauge-container"><div class="gauge-value">N/A</div></div>
          </div>
        </div>
      `;const e=this._getEntityName(t,this.config.name),r=Number(t.state),s=Number.isNaN(r)?0:r,i=this.config.unit||t.attributes.unit_of_measurement||"",n=Number(this.config.min??0),a=Number(this.config.max??100),o=void 0!==this.config.decimals?this.config.decimals:1,c=a>n?Math.min(Math.max((s-n)/(a-n),0),1):0,l=2*Math.PI*80,d=l*(1-c);let h="";return this.config.severity&&(this.config.severity.red&&s>=this.config.severity.red?h="severity-red":this.config.severity.yellow&&s>=this.config.severity.yellow&&(h="severity-yellow")),W`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${e}</div>
          <div class="gauge-container">
            <svg class="gauge-svg" viewBox="0 0 200 200">
              <circle class="gauge-background" cx="100" cy="100" r="${80}"></circle>
              <circle
                class="gauge-progress ${h}"
                cx="100"
                cy="100"
                r="${80}"
                stroke-dasharray="${l}"
                stroke-dashoffset="${d}"
                transform="rotate(-90 100 100)"
              ></circle>
            </svg>
            <div class="gauge-value">${s.toFixed(o)}${i?W`<span class="gauge-unit">${i}</span>`:""}</div>
          </div>
        </div>
      </div>
    `}static getStubConfig(t,e=[],r=[]){const s=t=>ut(t)&&Number(t.state)>=0,i=vt(t,e,r,{domains:["sensor","number","input_number"],filter:s})||vt(t,e,r,{filter:s}),n=i?t?.states?.[i]:void 0,a=n?.attributes?.unit_of_measurement||"",o=Number(n?.state),c="%"===a?100:a.includes("°")?50:Number.isNaN(o)?100:Math.max(100,20*Math.ceil(o/10));return{type:"custom:transformers-gauge-card",...i?{entity:i}:{entity:"sensor.cpu_usage",name:"CPU LOAD"},min:0,max:c,decimals:1,severity:{yellow:Math.round(.7*c),red:Math.round(.9*c)},font_style:"theme"}}});customElements.define("transformers-clock-card",class extends xt{static get styles(){return[bt,n`
        .clock-display {
          text-align: center;
          padding: 24px;
        }

        .time-display {
          font-size: 3.5em;
          font-weight: bold;
          font-family: var(--transformers-resolved-font-family);
          text-shadow: 0 0 15px var(--transformers-glow-color);
          letter-spacing: 4px;
          margin: 16px 0;
        }

        .date-display {
          font-size: 1.2em;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 12px;
          opacity: 0.9;
        }

        .timezone-display {
          font-size: 0.9em;
          margin-top: 8px;
          opacity: 0.7;
        }

        .time-separator {
          animation: blink 1s infinite;
        }
      `]}constructor(){super(),this._time=new Date,this._interval=void 0}connectedCallback(){super.connectedCallback(),this._time=new Date,this._interval=setInterval(()=>{this._time=new Date,this.requestUpdate()},1e3)}disconnectedCallback(){super.disconnectedCallback(),this._interval&&(clearInterval(this._interval),this._interval=void 0)}render(){if(!this.config)return W``;const t=this.config.title||"SYSTEM TIME",e=!1!==this.config.format_24h,r=!1!==this.config.show_seconds,s=!1!==this.config.show_date,i=this.config.show_timezone||!1,n=e?String(this._time.getHours()).padStart(2,"0"):String(this._time.getHours()%12||12).padStart(2,"0"),a=String(this._time.getMinutes()).padStart(2,"0"),o=String(this._time.getSeconds()).padStart(2,"0"),c=e?"":this._time.getHours()>=12?" PM":" AM",l=this._time.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).toUpperCase(),d=Intl.DateTimeFormat().resolvedOptions().timeZone;return W`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${t}</div>
          <div class="clock-display">
            <div class="time-display">
              ${n}<span class="time-separator">:</span>${a}${r?W`<span class="time-separator">:</span>${o}`:""}${c}
            </div>
            ${s?W`<div class="date-display">${l}</div>`:""}
            ${i?W`<div class="timezone-display">${d}</div>`:""}
          </div>
        </div>
      </div>
    `}static getStubConfig(){return{type:"custom:transformers-clock-card",title:"SYSTEM TIME",format_24h:!0,show_seconds:!0,show_date:!0,show_timezone:!1,font_style:"theme"}}});customElements.define("transformers-glance-card",class extends xt{static get styles(){return[bt,n`
        .glance-grid {
          display: grid;
          gap: 16px;
        }

        .glance-grid.columns-2 { grid-template-columns: repeat(2, 1fr); }
        .glance-grid.columns-3 { grid-template-columns: repeat(3, 1fr); }
        .glance-grid.columns-4 { grid-template-columns: repeat(4, 1fr); }
        .glance-grid.columns-5 { grid-template-columns: repeat(5, 1fr); }

        .glance-item {
          text-align: center;
          padding: 16px;
          background: linear-gradient(135deg, rgba(227, 30, 36, 0.1) 0%, rgba(30, 58, 138, 0.05) 100%);
          border: 1px solid var(--transformers-border-color);
          clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .glance-item:hover {
          box-shadow: 0 0 10px var(--transformers-glow-color);
        }

        .glance-icon {
          margin-bottom: 8px;
          font-size: 1.8em;
        }

        .glance-icon ha-icon {
          --mdc-icon-size: 1.8em;
        }

        .glance-name {
          font-size: 0.75em;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
          opacity: 0.8;
        }

        .glance-state {
          font-size: 1.05em;
          font-weight: bold;
          font-family: var(--transformers-resolved-font-family);
          margin-top: 8px;
        }
      `]}render(){if(!this.config)return W``;const t=this.config.entities||[],e=Math.min(Math.max(this.config.columns||Math.min(Math.max(t.length,2),4),2),5);return W`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${this.config.title||"SYSTEM GLANCE"}</div>
          <div class="glance-grid columns-${e}">
            ${t.map(t=>this._renderEntity(t))}
          </div>
        </div>
      </div>
    `}_renderEntity(t){const e=this._normalizeEntityConfig(t),r=this._getEntity(e.entity);if(!r)return W`
        <div class="glance-item">
          <div class="glance-state">N/A</div>
          ${!1!==this.config.show_name?W`<div class="glance-name">${e.entity||"UNKNOWN"}</div>`:""}
        </div>
      `;const s=this._resolveIcon(r,e.icon);return W`
      <div class="glance-item" @click=${()=>this._openMoreInfo(e.entity)}>
        <div class="glance-icon ${this._getSeverityClass(r)}">${this._renderIcon(s,"glance-icon")}</div>
        <div class="glance-state">${this._getEntityStateText(r)}</div>
        ${!1!==this.config.show_name?W`<div class="glance-name">${this._getEntityName(r,e.name)}</div>`:""}
      </div>
    `}static getStubConfig(t,e=[],r=[]){const s=yt(t,e,r,{count:4,domains:["sensor","binary_sensor","light","switch","lock","device_tracker","person","weather"],filter:gt});return{type:"custom:transformers-glance-card",title:"SYSTEM OVERVIEW",entities:s.length?s:["sensor.temperature","sensor.humidity","light.living_room","binary_sensor.motion"],columns:Math.min(Math.max(s.length||2,2),4),show_name:!0,font_style:"theme"}}});customElements.define("transformers-light-card",class extends xt{static get styles(){return[bt,n`
        .light-container {
          padding: 16px;
        }

        .light-status {
          text-align: center;
          margin-bottom: 20px;
        }

        .light-icon {
          font-size: 3em;
          margin-bottom: 12px;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .light-icon ha-icon {
          --mdc-icon-size: 3em;
        }

        .light-icon.on {
          filter: drop-shadow(0 0 15px var(--transformers-accent-color));
          color: var(--transformers-accent-color);
        }

        .light-name {
          font-size: 1.1em;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }

        .light-state {
          font-size: 0.9em;
          opacity: 0.8;
        }

        .toggle-button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, rgba(227, 30, 36, 0.3) 0%, rgba(30, 58, 138, 0.2) 100%);
          border: 2px solid var(--transformers-border-color);
          color: var(--transformers-text-color);
          font-family: var(--transformers-resolved-font-family);
          font-size: 1em;
          font-weight: bold;
          text-transform: uppercase;
          cursor: pointer;
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
        }

        .toggle-button.on {
          background: linear-gradient(135deg, var(--transformers-border-color) 0%, var(--transformers-secondary-color) 100%);
        }

        .brightness-control {
          margin-top: 16px;
        }

        .brightness-label {
          font-size: 0.85em;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
        }

        .brightness-slider {
          width: 100%;
          height: 8px;
          -webkit-appearance: none;
          appearance: none;
          background: rgba(255, 255, 255, 0.1);
          outline: none;
          border: 1px solid var(--transformers-border-color);
        }

        .brightness-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: var(--transformers-border-color);
          cursor: pointer;
          clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
          box-shadow: 0 0 8px var(--transformers-glow-color);
        }
      `]}render(){if(!this.config)return W``;const t=this._getEntity(this.config.entity);if(!t)return W`
        <div class="${this._cardClasses()}">
          <div class="card-content">
            <div class="card-header">${this.config.name||"LIGHT ERROR"}</div>
            <div class="light-container"><div class="light-status">UNAVAILABLE</div></div>
          </div>
        </div>
      `;const e="on"===String(t.state).toLowerCase(),r=t.attributes.brightness||0,s=Math.round(r/255*100),i=void 0!==t.attributes.brightness||!!(1&(t.attributes.supported_features||0)),n=this._resolveIcon(t,this.config.icon),a=this._getEntityName(t,this.config.name);return W`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${a}</div>
          <div class="light-container">
            <div class="light-status">
              <div class="light-icon ${e?"on":""}">${this._renderIcon(n,"light-icon")}</div>
              <div class="light-name">${a}</div>
              <div class="light-state">${this._getEntityStateText(t,{includeUnit:!1})}</div>
            </div>
            <button class="toggle-button ${e?"on":""}" @click=${()=>this._toggleLight()}>
              ${e?"TURN OFF":"TURN ON"}
            </button>
            ${e&&i?W`
                  <div class="brightness-control">
                    <div class="brightness-label">
                      <span>BRIGHTNESS</span>
                      <span>${s}%</span>
                    </div>
                    <input
                      type="range"
                      class="brightness-slider"
                      min="0"
                      max="100"
                      .value=${String(s)}
                      @input=${t=>this._setBrightness(t.target.value)}
                    />
                  </div>
                `:""}
          </div>
        </div>
      </div>
    `}_toggleLight(){this._callService("light.toggle",{entity_id:this.config.entity})}_setBrightness(t){const e=Math.round(Number(t)/100*255);this._callService("light.turn_on",{entity_id:this.config.entity,brightness:e})}static getStubConfig(t,e=[],r=[]){const s=vt(t,e,r,{domains:["light"],filter:gt});return{type:"custom:transformers-light-card",...s?{entity:s}:{entity:"light.living_room",name:"MAIN ILLUMINATION"},font_style:"theme"}}});customElements.define("transformers-picture-card",class extends xt{static get styles(){return[bt,n`
        .picture-container {
          position: relative;
          overflow: hidden;
        }

        .picture-image {
          width: 100%;
          height: auto;
          display: block;
          filter: contrast(1.2) brightness(0.9) sepia(0.1) hue-rotate(-10deg);
          border: 2px solid var(--transformers-border-color);
        }

        .picture-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(227, 30, 36, 0.1) 0%, rgba(30, 58, 138, 0.1) 100%);
          pointer-events: none;
        }

        .picture-caption {
          margin-top: 12px;
          padding: 8px;
          background: rgba(0, 0, 0, 0.5);
          border-left: 3px solid var(--transformers-border-color);
          font-family: var(--transformers-resolved-font-family);
          font-size: 0.9em;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .picture-timestamp {
          margin-top: 8px;
          font-size: 0.75em;
          opacity: 0.7;
          text-align: right;
        }
      `]}connectedCallback(){super.connectedCallback(),this._syncRefreshTimer()}disconnectedCallback(){super.disconnectedCallback(),this._stopRefresh()}updated(t){super.updated?.(t),t.has("config")&&this._syncRefreshTimer()}_syncRefreshTimer(){this._stopRefresh(),this.config?.camera_refresh_interval&&(this._refreshInterval=setInterval(()=>this.requestUpdate(),1e3*this.config.camera_refresh_interval))}_stopRefresh(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=void 0)}render(){if(!this.config)return W``;const t=this.config.title||"VISUAL FEED",e=this.config.caption||"",r=this.config.show_timestamp||!1,s=this._getImageUrl(),i=(new Date).toLocaleString("en-US",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"});return W`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${t}</div>
          <div class="picture-container">
            ${s?W`
                  <img class="picture-image" src="${s}" alt="${e||t}" />
                  <div class="picture-overlay"></div>
                `:W`<div style="padding: 40px; text-align: center; opacity: 0.5;">NO IMAGE SOURCE</div>`}
          </div>
          ${e?W`<div class="picture-caption">> ${e}</div>`:""}
          ${r?W`<div class="picture-timestamp">CAPTURED: ${i}</div>`:""}
        </div>
      </div>
    `}_getImageUrl(){if(this.config.entity){const t=this._getEntity(this.config.entity);if(t?.attributes?.entity_picture){const e=t.attributes.entity_picture;return this.config.camera_refresh_interval?`${e}${e.includes("?")?"&":"?"}t=${Date.now()}`:e}}return this.config.image||""}static getStubConfig(t,e=[],r=[]){const s=vt(t,e,r,{domains:["camera"],filter:t=>gt(t)&&Boolean(t.attributes?.entity_picture)});return{type:"custom:transformers-picture-card",title:"VISUAL FEED",...s?{entity:s,caption:(s?t?.states?.[s]?.attributes?.friendly_name:void 0)||"SURVEILLANCE CAMERA 01"}:{image:_t({title:"ALLSPARK FEED",subtitle:"SURVEILLANCE CAMERA"}),caption:"SURVEILLANCE CAMERA 01"},show_timestamp:!0,font_style:"theme"}}});customElements.define("transformers-weather-card",class extends xt{static get styles(){return[bt,n`
        .weather-container {
          padding: 12px;
        }

        .current-weather {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          background: linear-gradient(135deg, rgba(227, 30, 36, 0.1) 0%, rgba(30, 58, 138, 0.05) 100%);
          border-left: 3px solid var(--transformers-border-color);
          margin-bottom: 16px;
          gap: 20px;
        }

        .weather-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 3em;
        }

        .weather-icon ha-icon {
          --mdc-icon-size: 3em;
        }

        .weather-info {
          flex: 1;
        }

        .weather-temp {
          font-size: 2.5em;
          font-weight: bold;
          font-family: var(--transformers-resolved-font-family);
          text-shadow: 0 0 10px var(--transformers-glow-color);
        }

        .weather-condition {
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
          font-size: 0.9em;
        }

        .weather-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 12px;
        }

        .weather-detail {
          padding: 8px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--transformers-secondary-color);
          font-size: 0.85em;
        }

        .detail-label {
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.8em;
          opacity: 0.8;
          margin-bottom: 4px;
        }

        .detail-value {
          font-family: var(--transformers-resolved-font-family);
          font-weight: bold;
        }

        .forecast-container {
          margin-top: 16px;
        }

        .forecast-title {
          font-size: 0.85em;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--transformers-border-color);
        }

        .forecast-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
          gap: 8px;
        }

        .forecast-day {
          text-align: center;
          padding: 12px 8px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--transformers-secondary-color);
          clip-path: polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px);
        }

        .forecast-date {
          font-size: 0.75em;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .forecast-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5em;
          margin: 4px 0;
        }

        .forecast-icon ha-icon {
          --mdc-icon-size: 1.5em;
        }

        .forecast-temp {
          font-size: 0.85em;
          font-family: var(--transformers-resolved-font-family);
          margin-top: 4px;
        }
      `]}render(){if(!this.config)return W``;const t=this._getEntity(this.config.entity);if(!t)return W`
        <div class="${this._cardClasses()}">
          <div class="card-content">
            <div class="card-header">${this.config.name||"WEATHER ERROR"}</div>
            <div class="weather-container">UNAVAILABLE</div>
          </div>
        </div>
      `;const e=this._getEntityName(t,this.config.name||"WEATHER"),r=!1!==this.config.show_forecast,s=this.config.forecast_days||5;return W`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${e}</div>
          <div class="weather-container">
            ${this._renderCurrentWeather(t)}
            ${r?this._renderForecast(t,s):""}
          </div>
        </div>
      </div>
    `}_renderCurrentWeather(t){const e=t.attributes.temperature,r=this.hass?.config?.unit_system?.temperature||"",s=t.attributes.humidity,i=t.attributes.pressure,n=t.attributes.wind_speed,a=this.hass?.config?.unit_system?.wind_speed||"",o=t.attributes.wind_bearing;return W`
      <div class="current-weather">
        <div class="weather-icon ${this._getSeverityClass(t)}">${this._renderIcon(this._resolveIcon(t),"weather-icon")}</div>
        <div class="weather-info">
          <div class="weather-temp">${e??"--"}${void 0!==e&&r?W`°${r}`:""}</div>
          <div class="weather-condition">${this._getFriendlyStateText(t.state)}</div>
        </div>
      </div>
      <div class="weather-details">
        ${void 0!==s?W`<div class="weather-detail"><div class="detail-label">HUMIDITY</div><div class="detail-value">${s}%</div></div>`:""}
        ${void 0!==i?W`<div class="weather-detail"><div class="detail-label">PRESSURE</div><div class="detail-value">${i} hPa</div></div>`:""}
        ${void 0!==n?W`<div class="weather-detail"><div class="detail-label">WIND SPEED</div><div class="detail-value">${n} ${a}</div></div>`:""}
        ${void 0!==o?W`<div class="weather-detail"><div class="detail-label">WIND DIR</div><div class="detail-value">${this._getWindDirection(o)}</div></div>`:""}
      </div>
    `}_renderForecast(t,e){const r=(t.attributes.forecast||[]).slice(0,e);return r.length?W`
      <div class="forecast-container">
        <div class="forecast-title">FORECAST</div>
        <div class="forecast-grid">
          ${r.map(t=>this._renderForecastDay(t))}
        </div>
      </div>
    `:W``}_renderForecastDay(t){const e=t.datetime||t.datetime_iso||t.date,r=(e?new Date(e):new Date).toLocaleDateString("en-US",{weekday:"short"}).toUpperCase(),s=this.hass?.config?.unit_system?.temperature||"",i=this._getWeatherIcon(t.condition);return W`
      <div class="forecast-day">
        <div class="forecast-date">${r}</div>
        <div class="forecast-icon">${this._renderIcon(i,"forecast-icon")}</div>
        <div class="forecast-temp">${t.temperature??"--"}${void 0!==t.temperature&&s?W`°${s}`:""}</div>
      </div>
    `}_getWindDirection(t){const e=["N","NE","E","SE","S","SW","W","NW"];return e[Math.round(t%360/45)%e.length]}static getStubConfig(t,e=[],r=[]){const s=vt(t,e,r,{domains:["weather"],filter:gt});return{type:"custom:transformers-weather-card",...s?{entity:s}:{entity:"weather.home",name:"ATMOSPHERIC CONDITIONS"},show_forecast:!0,forecast_days:5,font_style:"theme"}}});customElements.define("transformers-alarm-card",class extends xt{static get styles(){return[bt,n`
        .alarm-container {
          padding: 16px;
        }

        .alarm-status {
          text-align: center;
          padding: 20px;
          margin-bottom: 20px;
          background: linear-gradient(135deg, rgba(227, 30, 36, 0.2) 0%, rgba(30, 58, 138, 0.1) 100%);
          border: 2px solid var(--transformers-border-color);
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
        }

        .alarm-status.armed {
          border-color: #dc2626;
        }

        .alarm-status.pending {
          border-color: #fbbf24;
        }

        .alarm-status.triggered {
          border-color: #dc2626;
          animation: alarm-flash 1s infinite;
        }

        @keyframes alarm-flash {
          0%, 50% { opacity: 1; }
          25%, 75% { opacity: 0.5; }
        }

        .alarm-state {
          font-size: 2em;
          font-weight: bold;
          font-family: var(--transformers-resolved-header-font);
          text-transform: uppercase;
          letter-spacing: 3px;
          text-shadow: 0 0 10px var(--transformers-glow-color);
        }

        .code-display {
          margin: 16px 0;
          padding: 12px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid var(--transformers-border-color);
          text-align: center;
          font-family: var(--transformers-resolved-font-family);
          font-size: 1.5em;
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .keypad {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 16px;
        }

        .key,
        .action-button {
          padding: 14px;
          background: linear-gradient(135deg, rgba(227, 30, 36, 0.2) 0%, rgba(30, 58, 138, 0.1) 100%);
          border: 2px solid var(--transformers-border-color);
          color: var(--transformers-text-color);
          font-family: var(--transformers-resolved-font-family);
          font-weight: bold;
          cursor: pointer;
          clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
        }

        .key {
          font-size: 1.3em;
        }

        .action-buttons {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 16px;
        }
      `]}constructor(){super(),this._code=""}render(){if(!this.config)return W``;const t=this._getEntity(this.config.entity),e=this.config.title||"SECURITY SYSTEM";if(!t)return W`
        <div class="${this._cardClasses()}">
          <div class="card-content">
            <div class="card-header">${e}</div>
            <div class="alarm-container"><div class="alarm-status"><div class="alarm-state">UNAVAILABLE</div></div></div>
          </div>
        </div>
      `;const r=!1!==this.config.show_keypad,s=this._getAlarmClass(t.state);return W`
      <div class="${this._cardClasses()}">
        <div class="card-content">
          <div class="card-header">${e}</div>
          <div class="alarm-container">
            <div class="alarm-status ${s}">
              <div class="alarm-state">${this._getFriendlyStateText(t.state)}</div>
            </div>

            ${r?W`
                  <div class="code-display">${this._code?"•".repeat(this._code.length):"ENTER CODE"}</div>
                  <div class="keypad">
                    ${[1,2,3,4,5,6,7,8,9,"CLR",0,"OK"].map(t=>W`<button class="key" @click=${()=>this._handleKeyPress(t)}>${t}</button>`)}
                  </div>
                `:""}

            <div class="action-buttons">
              ${"disarmed"===t.state?W`
                    <button class="action-button" @click=${()=>this._armAway()}>ARM AWAY</button>
                    <button class="action-button" @click=${()=>this._armHome()}>ARM HOME</button>
                  `:W`<button class="action-button" @click=${()=>this._disarm()}>DISARM</button>`}
            </div>
          </div>
        </div>
      </div>
    `}_getAlarmClass(t){return"triggered"===t?"triggered":String(t).includes("pending")||String(t).includes("arming")?"pending":String(t).includes("armed")?"armed":""}_handleKeyPress(t){"CLR"===t?this._code="":"OK"!==t&&(this._code+=t.toString()),this.requestUpdate()}_armAway(){this._callService("alarm_control_panel.alarm_arm_away",{entity_id:this.config.entity,code:this._code||void 0}),this._code="",this.requestUpdate()}_armHome(){this._callService("alarm_control_panel.alarm_arm_home",{entity_id:this.config.entity,code:this._code||void 0}),this._code="",this.requestUpdate()}_disarm(){this._callService("alarm_control_panel.alarm_disarm",{entity_id:this.config.entity,code:this._code||void 0}),this._code="",this.requestUpdate()}static getStubConfig(t,e=[],r=[]){return{type:"custom:transformers-alarm-card",title:"SECURITY SYSTEM",entity:vt(t,e,r,{domains:["alarm_control_panel"],filter:gt})||"alarm_control_panel.home",show_keypad:!0,font_style:"theme"}}});[{type:"transformers-status-card",name:"Transformers Status Card",description:"Display multiple entities with dynamic Transformers-style status indicators.",preview:!0},{type:"transformers-sensor-card",name:"Transformers Sensor Card",description:"Display a single sensor with optional progress visualization.",preview:!0},{type:"transformers-button-card",name:"Transformers Button Card",description:"Control entities and services with Home Assistant-driven icons and states.",preview:!0},{type:"transformers-text-card",name:"Transformers Text Card",description:"Display static or entity-driven text in a Transformers terminal style.",preview:!0},{type:"transformers-gauge-card",name:"Transformers Gauge Card",description:"Display numeric sensor values in a circular Transformers gauge.",preview:!0},{type:"transformers-clock-card",name:"Transformers Clock Card",description:"Display current time and date with G1 or Movie typography.",preview:!0},{type:"transformers-glance-card",name:"Transformers Glance Card",description:"Show multiple entity states with dynamic Home Assistant icons.",preview:!0},{type:"transformers-light-card",name:"Transformers Light Card",description:"Control a light with dynamic icon, state, and brightness handling.",preview:!0},{type:"transformers-picture-card",name:"Transformers Picture Card",description:"Display images or camera feeds with Transformers-inspired styling.",preview:!0},{type:"transformers-weather-card",name:"Transformers Weather Card",description:"Display current conditions and forecast with Home Assistant-driven weather icons.",preview:!0},{type:"transformers-alarm-card",name:"Transformers Alarm Card",description:"Control alarm panels with dynamic state styling and keypad input.",preview:!0}].forEach(t=>{window.customCards=window.customCards||[],window.customCards.some(e=>e.type===t.type)||window.customCards.push(t)}),console.info("%c TRANSFORMERS ALLSPARK UI %c v0.1.0 ","color: #e31e24; background: #000; font-weight: bold;","color: #000; background: #e31e24; font-weight: bold;");
//# sourceMappingURL=transformers-cards.js.map
