import{r as h,a1 as $e,J as X,o as J,a3 as ve,v as p,b as t,a2 as z,a as Q,d as G,aD as fe,u as N,aE as Z,aF as Te,ad as E,aB as ee,j as K,aG as ue,aH as me,ab as ge,aI as Ue,aJ as Fe,aK as Le,af as He,z as Ee,A as Ne,B as Oe,aL as De,m as Ge,C as Me,ag as ze,aM as We,G as je,aC as ye,aN as Ye,aO as qe,ah as Je,E as Ke,F as Xe,H as Qe,aP as Ze,T as I,W as j,X as te,aQ as et,ap as tt,K as at,R as he,aR as lt,f as q,ai as ae,a6 as nt,a8 as T,g as ot,U as le,O as st,k as H,at as ut,a9 as it,aw as ie,ak as rt,aS as re,D as ct,Y,S as dt,w as M,az as vt,aT as ft,p as mt,n as ce,$ as gt,am as yt,aU as ht,c as Vt,M as xt,N as Ct,P as bt,t as It,y as St,ar as kt}from"./index.25dc8da7.js";import{h as W,i as Ve,a as xe,f as Ce,g as be,b as pt,u as _t,d as At,V as wt,e as Pt}from"./VCounter.42da3637.js";const Rt={__name:"talkingAvatar",props:{utterances:{type:Array,default:()=>["Alo, Mundo!"]},lang:{type:String,default:"pt-BR"}},emits:["end"],setup(e,{emit:g}){const l=e,a=m=>new URL(m,import.meta.url).href,n=h(null),o=$e({}),s=window.speechSynthesis,r=new window.SpeechSynthesisUtterance,b=h(!1),d=h(0),S=[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:3,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2},{x:3,y:2}],y=512,u=512,V=h(.2),x=h(null),i=h(null),c=h([]),C=h(0),v=h(0);X(()=>{console.log("utterances: ",l.utterances),d.value=0,C.value=0,f()});function _(){r.onstart=m=>{console.log("Starting, about to speak "+m.charLength+" caracteres."),b.value=!0,A()},r.onend=m=>{d.value=0,clearTimeout(x.value),$(),v.value=0,C.value+=1,C.value<l.utterances.length?U(l.utterances[C.value]):(console.log(">>>End of talking<<<"),g("end")),b.value=!1,console.log("Finished in "+m.elapsedTime+" seconds.")}}function P(m){const k=["AEI","FV","O","HJ","CDGKNSTXYZ","BMP","R","U","I","L","QW"];var B=0,F=0;return k.forEach(w=>{w.includes(m)&&(F=B),B++}),F}function L(m){c.value=[];const k=/(?:[cC][hH]|[lL][lL]|[rR][rR]|[qQ][uU]|[mnñvzsyjhxwMNÑVZSYJHXW]|[fpbtdkgcFPBTDKGC][lrLR]?|[lrLR])?(?:[iuüIUÜ][eaoéáóEAOÉÁÓ][iyuIYU]|[aáAÁ][hH]?[uúUÚ][aáAÁ]|[iuüIUÜ][hH]?[eaoéáóEAOÉÁÓ]|[eaoéáóEAOÉÁÓ][hH]?[iyuIYU]|[iíIÍ][hH]?[uúUÚ]|[uúüUÚÜ][hH]?[iíyIÍY]|[ieaouíéáóúüIEAOUÍÉÁÓÚÜ])(?:(?:(?:(?:[nmNM]|[rR](?![rR]))s?(?![ieaouíéáóúüIEAOUÍÉÁÓÚÜ]))|(?:(?:[mnñvzsyjhxwMNÑVZSYJHXW]|[lL](?![lL]))(?![ieaouíéáóúüIEAOUÍÉÁÓÚÜ]))|(?:(?:[fpbtdkgFPBTDKG]|[cC](?![hH]))(?![lrLR]?[ieaouíéáóúüIEAOUÍÉÁÓÚÜ])))(?!\s|$))?(?:[ndrlsxNDRLSX](?=\s|$))?/gm;var B=m.normalize("NFD").replace(/[\u0300-\u036f]/g,"");B=B.toUpperCase(),B.split(" ").forEach(w=>{w.match(k).forEach(O=>{c.value.push(P(O.charAt())),c.value.push(P(O.slice(-1)))})})}function A(){x.value=setTimeout(()=>{d.value=c.value[v.value],v.value-1<c.value.length?v.value++:d.value=0,d.value||(d.value=0),$(),A()},100)}function $(){try{o.value.drawImage(i.value,S[d.value].x*y,S[d.value].y*u,y,u,0,0,y*V.value,u*V.value)}catch(m){console.log("In drawTile() - Error: ",m," tileIdx: ",d.value," tilesPos lenght: ",S.length)}}async function U(m){v.value=0,await L(m),r.text=m,r.lang=l.lang,r.volume=1,await s.speak(r)}function f(){o.value=n.value.getContext("2d"),i.value=new Image,i.value.src=a("../../assets/avatar/spriteSheet_phonemes.png"),i.value.onload=()=>{R()}}async function R(){_(),setTimeout(()=>{U(l.utterances[C.value])},500)}return(m,k)=>(J(),ve(W,{justify:"center"},{default:p(()=>[t(z,null,{default:p(()=>[Q("canvas",{id:"canvas",ref_key:"canvas",ref:n,width:220,height:220},null,512)]),_:1})]),_:1}))}};const Bt=G({name:"VCardActions",setup(e,g){let{slots:l}=g;return fe({VBtn:{variant:"text"}}),N(()=>{var a;return t("div",{class:"v-card-actions"},[(a=l.default)==null?void 0:a.call(l)])}),{}}}),$t=Z("v-card-subtitle"),Ie=Z("v-card-title"),Tt=Te({name:"VCardItem",props:{appendAvatar:String,appendIcon:E,prependAvatar:String,prependIcon:E,subtitle:String,title:String,...ee()},setup(e,g){let{slots:l}=g;return N(()=>{var a,n,o,s,r;const b=!!(e.prependAvatar||e.prependIcon||l.prepend),d=!!(e.appendAvatar||e.appendIcon||l.append),S=!!(e.title||l.title),y=!!(e.subtitle||l.subtitle);return t("div",{class:"v-card-item"},[b&&t(K,{key:"prepend",defaults:{VAvatar:{density:e.density,icon:e.prependIcon,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon}}},{default:()=>{var u;return[t("div",{class:"v-card-item__prepend"},[(u=(a=l.prepend)==null?void 0:a.call(l))!=null?u:t(ue,null,null)])]}}),t("div",{class:"v-card-item__content"},[S&&t(Ie,{key:"title"},{default:()=>{var u;return[(u=(n=l.title)==null?void 0:n.call(l))!=null?u:e.title]}}),y&&t($t,{key:"subtitle"},{default:()=>{var u;return[(u=(o=l.subtitle)==null?void 0:o.call(l))!=null?u:e.subtitle]}}),(s=l.default)==null?void 0:s.call(l)]),d&&t(K,{key:"append",defaults:{VAvatar:{density:e.density,icon:e.appendIcon,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon}}},{default:()=>{var u;return[t("div",{class:"v-card-item__append"},[(u=(r=l.append)==null?void 0:r.call(l))!=null?u:t(ue,null,null)])]}})])}),{}}}),Se=Z("v-card-text"),Ut=G({name:"VCard",directives:{Ripple:me},props:{appendAvatar:String,appendIcon:E,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:E,ripple:Boolean,subtitle:String,text:String,title:String,...ge(),...Ue(),...ee(),...Fe(),...Le(),...He(),...Ee(),...Ne(),...Oe(),...De(),...Ge(),...Me({variant:"elevated"})},setup(e,g){let{attrs:l,slots:a}=g;const{themeClasses:n}=ze(e),{borderClasses:o}=We(e),{colorClasses:s,colorStyles:r,variantClasses:b}=je(e),{densityClasses:d}=ye(e),{dimensionStyles:S}=Ye(e),{elevationClasses:y}=qe(e),{loaderClasses:u}=Je(e),{locationStyles:V}=Ke(e),{positionClasses:x}=Xe(e),{roundedClasses:i}=Qe(e),c=Ze(e,l),C=I(()=>e.link!==!1&&c.isLink.value),v=I(()=>!e.disabled&&e.link!==!1&&(e.link||c.isClickable.value));return N(()=>{var _,P,L;const A=C.value?"a":e.tag,$=!!(a.title||e.title),U=!!(a.subtitle||e.subtitle),f=$||U,R=!!(a.append||e.appendAvatar||e.appendIcon),m=!!(a.prepend||e.prependAvatar||e.prependIcon),k=!!(a.image||e.image),B=f||m||R,F=!!(a.text||e.text);return j(t(A,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":v.value},n.value,o.value,s.value,d.value,y.value,u.value,x.value,i.value,b.value],style:[r.value,S.value,V.value],href:c.href.value,onClick:v.value&&c.navigate},{default:()=>[k&&t(K,{key:"image",defaults:{VImg:{cover:!0,src:e.image}}},{default:()=>{var w;return[t("div",{class:"v-card__image"},[(w=(_=a.image)==null?void 0:_.call(a))!=null?w:t(et,null,null)])]}}),t(tt,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:a.loader}),B&&t(Tt,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:a.item,prepend:a.prepend,title:a.title,subtitle:a.subtitle,append:a.append}),F&&t(Se,{key:"text"},{default:()=>{var w;return[(w=(P=a.text)==null?void 0:P.call(a))!=null?w:e.text]}}),(L=a.default)==null?void 0:L.call(a),a.actions&&t(Bt,null,{default:a.actions}),at(v.value,"v-card")]}),[[te("ripple"),v.value]])}),{}}});const ke=Symbol.for("vuetify:selection-control-group"),ne=he({color:String,disabled:Boolean,error:Boolean,id:String,inline:Boolean,falseIcon:E,trueIcon:E,ripple:{type:Boolean,default:!0},multiple:{type:Boolean,default:null},name:String,readonly:Boolean,modelValue:null,type:String,valueComparator:{type:Function,default:lt},...ge(),...ee()},"v-selection-control-group"),Ft=G({name:"VSelectionControlGroup",props:{defaultsTarget:{type:String,default:"VSelectionControl"},...ne()},emits:{"update:modelValue":e=>!0},setup(e,g){let{slots:l}=g;const a=q(e,"modelValue"),n=ae(),o=I(()=>e.id||`v-selection-control-group-${n}`),s=I(()=>e.name||o.value);return nt(ke,{modelValue:a}),fe({[e.defaultsTarget]:{color:T(e,"color"),disabled:T(e,"disabled"),density:T(e,"density"),error:T(e,"error"),inline:T(e,"inline"),modelValue:a,multiple:I(()=>!!e.multiple||e.multiple==null&&Array.isArray(a.value)),name:s,falseIcon:T(e,"falseIcon"),trueIcon:T(e,"trueIcon"),readonly:T(e,"readonly"),ripple:T(e,"ripple"),type:T(e,"type"),valueComparator:T(e,"valueComparator")}}),N(()=>{var r;return t("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline}],"aria-labelled-by":e.type==="radio"?o.value:void 0,role:e.type==="radio"?"radiogroup":void 0},[(r=l.default)==null?void 0:r.call(l)])}),{}}}),pe=he({label:String,trueValue:null,falseValue:null,value:null,...ne()},"v-selection-control");function Lt(e){const g=it(ke,void 0),{densityClasses:l}=ye(e),a=q(e,"modelValue"),n=I(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),o=I(()=>e.falseValue!==void 0?e.falseValue:!1),s=I(()=>!!e.multiple||e.multiple==null&&Array.isArray(a.value)),r=I({get(){const y=g?g.modelValue.value:a.value;return s.value?y.some(u=>e.valueComparator(u,n.value)):e.valueComparator(y,n.value)},set(y){if(e.readonly)return;const u=y?n.value:o.value;let V=u;s.value&&(V=y?[...ie(a.value),u]:ie(a.value).filter(x=>!e.valueComparator(x,n.value))),g?g.modelValue.value=V:a.value=V}}),{textColorClasses:b,textColorStyles:d}=rt(I(()=>r.value&&!e.error&&!e.disabled?e.color:void 0)),S=I(()=>r.value?e.trueIcon:e.falseIcon);return{group:g,densityClasses:l,trueValue:n,falseValue:o,model:r,textColorClasses:b,textColorStyles:d,icon:S}}const _e=ot()({name:"VSelectionControl",directives:{Ripple:me},inheritAttrs:!1,props:pe(),emits:{"update:modelValue":e=>!0},setup(e,g){let{attrs:l,slots:a}=g;const{densityClasses:n,icon:o,model:s,textColorClasses:r,textColorStyles:b,trueValue:d}=Lt(e),S=ae(),y=I(()=>e.id||`input-${S}`),u=h(!1),V=h(!1),x=h();function i(v){u.value=!0,(!re||re&&v.target.matches(":focus-visible"))&&(V.value=!0)}function c(){u.value=!1,V.value=!1}function C(v){s.value=v.target.checked}return N(()=>{var v,_;const P=a.label?a.label({label:e.label,props:{for:y.value}}):e.label,[L,A]=le(l);return t("div",H({class:["v-selection-control",{"v-selection-control--dirty":s.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":u.value,"v-selection-control--focus-visible":V.value,"v-selection-control--inline":e.inline},n.value]},L),[t("div",{class:["v-selection-control__wrapper",r.value],style:b.value},[(v=a.default)==null?void 0:v.call(a),j(t("div",{class:["v-selection-control__input"]},[o.value&&t(st,{key:"icon",icon:o.value},null),t("input",H({ref:x,checked:s.value,disabled:e.disabled,id:y.value,onBlur:c,onFocus:i,onInput:C,"aria-readonly":e.readonly,type:e.type,value:d.value,name:e.name,"aria-checked":e.type==="checkbox"?s.value:void 0},A),null),(_=a.input)==null?void 0:_.call(a,{model:s,textColorClasses:r,textColorStyles:b,props:{onFocus:i,onBlur:c,id:y.value}})]),[[te("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),P&&t(Ve,{for:y.value,clickable:!0},{default:()=>[P]})])}),{isFocused:u,input:x}}});function Ht(e){return ut(e,Object.keys(_e.props))}const de=G({name:"VRadio",props:{...pe({falseIcon:"$radioOff",trueIcon:"$radioOn"})},setup(e,g){let{slots:l}=g;return N(()=>t(_e,H(e,{class:"v-radio",type:"radio"}),l)),{}}});const Et=G({name:"VRadioGroup",inheritAttrs:!1,props:{height:{type:[Number,String],default:"auto"},...xe(),...ct(ne(),["multiple"]),trueIcon:{type:E,default:"$radioOn"},falseIcon:{type:E,default:"$radioOff"},type:{type:String,default:"radio"}},emits:{"update:modelValue":e=>!0},setup(e,g){let{attrs:l,slots:a}=g;const n=ae(),o=I(()=>e.id||`radio-group-${n}`),s=q(e,"modelValue");return N(()=>{const[r,b]=le(l),[d,S]=Ce(e),[y,u]=Ht({...e,multiple:!1}),V=a.label?a.label({label:e.label,props:{for:o.value}}):e.label;return t(be,H({class:"v-radio-group"},r,d,{modelValue:s.value,"onUpdate:modelValue":x=>s.value=x,id:o.value}),{...a,default:x=>{let{id:i,isDisabled:c,isReadonly:C}=x;return t(Y,null,[V&&t(Ve,{for:i.value,clickable:!0},{default:()=>[V]}),t(Ft,H(y,{id:i.value,defaultsTarget:"VRadio",trueIcon:e.trueIcon,falseIcon:e.falseIcon,type:e.type,disabled:c.value,readonly:C.value},b,{modelValue:s.value,"onUpdate:modelValue":v=>s.value=v}),a)])}})}),{}}});const Nt=G({name:"VTextarea",directives:{Intersect:dt},inheritAttrs:!1,props:{autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,hint:String,persistentHint:Boolean,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,...xe(),...pt()},emits:{"click:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,g){let{attrs:l,emit:a,slots:n}=g;const o=q(e,"modelValue"),{isFocused:s,focus:r,blur:b}=_t(e),d=I(()=>typeof e.counterValue=="function"?e.counterValue(o.value):(o.value||"").toString().length),S=I(()=>{if(l.maxlength)return l.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function y(f,R){var m,k;!e.autofocus||!f||(m=R[0].target)==null||(k=m.focus)==null||k.call(m)}const u=h(),V=h(),x=h(""),i=h(),c=I(()=>s.value||e.persistentPlaceholder),C=I(()=>e.messages.length?e.messages:c.value||e.persistentHint?e.hint:"");function v(){if(i.value!==document.activeElement){var f;(f=i.value)==null||f.focus()}s.value||r()}function _(f){v(),a("click:control",f)}function P(f){f.stopPropagation(),v(),ce(()=>{o.value="",gt(e["onClick:clear"],f)})}function L(f){o.value=f.target.value}const A=h();function $(){!e.autoGrow||ce(()=>{if(!A.value||!V.value)return;const f=getComputedStyle(A.value),R=getComputedStyle(V.value.$el),m=parseFloat(f.getPropertyValue("--v-field-padding-top"))+parseFloat(f.getPropertyValue("--v-input-padding-top"))+parseFloat(f.getPropertyValue("--v-field-padding-bottom")),k=A.value.scrollHeight,B=parseFloat(f.lineHeight),F=Math.max(parseFloat(e.rows)*B+m,parseFloat(R.getPropertyValue("--v-input-control-height"))),w=parseFloat(e.maxRows)*B+m||1/0;x.value=yt(ht(k!=null?k:0,F,w))})}X($),M(o,$),M(()=>e.rows,$),M(()=>e.maxRows,$),M(()=>e.density,$);let U;return M(A,f=>{if(f)U=new ResizeObserver($),U.observe(A.value);else{var R;(R=U)==null||R.disconnect()}}),vt(()=>{var f;(f=U)==null||f.disconnect()}),N(()=>{const f=!!(n.counter||e.counter||e.counterValue),R=!!(f||n.details),[m,k]=le(l),[{modelValue:B,...F}]=Ce(e),[w]=At(e);return t(be,H({ref:u,modelValue:o.value,"onUpdate:modelValue":D=>o.value=D,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-text-field--flush-details":["plain","underlined"].includes(e.variant)}],"onClick:prepend":e["onClick:prepend"],"onClick:append":e["onClick:append"]},m,F,{focused:s.value,messages:C.value}),{...n,default:D=>{let{isDisabled:O,isDirty:oe,isReadonly:Ae,isValid:we}=D;return t(wt,H({ref:V,style:{"--v-textarea-control-height":x.value},"onClick:control":_,"onClick:clear":P,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:"textbox"},w,{active:c.value||oe.value,dirty:oe.value||e.dirty,focused:s.value,error:we.value===!1}),{...n,default:Pe=>{let{props:{class:se,...Re}}=Pe;return t(Y,null,[e.prefix&&t("span",{class:"v-text-field__prefix"},[e.prefix]),j(t("textarea",H({ref:i,class:se,value:o.value,onInput:L,autofocus:e.autofocus,readonly:Ae.value,disabled:O.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:v,onBlur:b},Re,k),null),[[te("intersect"),{handler:y},null,{once:!0}]]),e.autoGrow&&j(t("textarea",{class:[se,"v-textarea__sizer"],"onUpdate:modelValue":Be=>o.value=Be,ref:A,readonly:!0,"aria-hidden":"true"},null),[[ft,o.value]]),e.suffix&&t("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:R?D=>{var O;return t(Y,null,[(O=n.details)==null?void 0:O.call(n,D),f&&t(Y,null,[t("span",null,null),t(Pt,{active:e.persistentCounter||s.value,value:d.value,max:S.value},n.counter)])])}:void 0})}),mt({},u,V,i)}}),Ot={id:"app"},Dt=Q("span",{class:"ml-10 mt-10 text-h5 text-lg-h4 text-decoration-underline text-break"},"Avatar que fala um texto",-1),zt={__name:"VoicesAPI",setup(e){const g=x=>new URL(x,import.meta.url).href,l=h(null),a=window.speechSynthesis,n=h(!1),o=h(!0),s=h(""),r=h("pt-BR"),b=h(0),d=h([]);function S(){return s.value?y(s.value):["Muitas vezes achamos que estamos prontos","Mas, na maioria das vezes","\xC9 fato que n\xE3o estamos"]}function y(x){let i=[],c=x.match(/[^.?,!]+[.?,!]?/g);if(c)for(let C=0,v=c.length;C<v;++C){let _=c[C].trim(),P=(_.match(/[.?,!]/g)||[]).length;_.length-P>0&&i.push(_)}return i}function u(){console.log("Linguagem selecionada: ",r.value)}async function V(){const C=l.value.getContext("2d"),v=new Image;v.src=g("../../assets/avatar/spriteSheet_phonemes.png"),v.onload=()=>{C.drawImage(v,0,0,512,512,0,0,512*.2,512*.2)}}return X(()=>{n.value=!1,V(),d.value=a.getVoices(),d.value.length&&(o.value=!1,b.value=d.value[14],console.log("voice list: ",d.value),console.log("voice list [0]: ",d.value[0]),console.log("voice list [14]: ",d.value[14])),a.onvoiceschanged=()=>{d.value=a.getVoices(),o.value=!1}}),(x,i)=>(J(),Vt("div",Ot,[t(Ut,{class:"mx-auto"},{default:p(()=>[t(Ie,null,{default:p(()=>[Dt]),_:1}),t(Se,{class:"text-left"},{default:p(()=>[t(W,null,{default:p(()=>[t(z,{cols:"6"},{default:p(()=>[t(Et,{modelValue:r.value,"onUpdate:modelValue":i[0]||(i[0]=c=>r.value=c),onChange:i[1]||(i[1]=c=>u())},{default:p(()=>[t(de,{label:"Portugu\xEAs (BR)",value:"pt-BR"}),t(de,{label:"Ingl\xEAs (USA)",value:"en-US"})]),_:1},8,["modelValue"])]),_:1})]),_:1}),t(W,null,{default:p(()=>[t(z,{cols:"4"},{default:p(()=>[t(Nt,{modelValue:s.value,"onUpdate:modelValue":i[2]||(i[2]=c=>s.value=c),label:"Text",outlined:"",clearable:""},null,8,["modelValue"])]),_:1})]),_:1}),t(W,null,{default:p(()=>[t(z,{cols:"2"},{default:p(()=>[t(xt,{disabled:n.value,onClick:i[3]||(i[3]=Ct(c=>n.value=!0,["stop"]))},{default:p(()=>[bt("speak")]),_:1},8,["disabled"])]),_:1})]),_:1}),t(W,{justify:"center"},{default:p(()=>[t(z,null,{default:p(()=>[n.value?(J(),ve(It(Rt),{key:0,lang:r.value,utterances:S(),onEnd:i[4]||(i[4]=c=>n.value=!1)},null,8,["lang","utterances"])):St("",!0),j(Q("canvas",{ref_key:"canvas",ref:l,width:220,height:220},null,512),[[kt,!n.value]])]),_:1})]),_:1})]),_:1})]),_:1})]))}};export{zt as default};
