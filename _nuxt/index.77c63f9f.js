import{H as N,o as F,I as G,J as z,K as ce,L as ie,c as b,r as f,M as ve,D as O,_ as fe,m as E,q as H,s as W,N as U,O as K,P as I,Q as de,R as pe,S as he,v as me,x as ge,T as ye,U as xe,V as we,t as D}from"./entry.4e128aa7.js";function q(t){return ce()?(ie(t),!0):!1}function J(t){return typeof t=="function"?t():z(t)}const _e=typeof window<"u"&&typeof document<"u",be=Object.prototype.toString,Se=t=>be.call(t)==="[object Object]",ze=()=>{};function Me(t,e=!0){N()?F(t):e?t():G(t)}function $(t){var e;const r=J(t);return(e=r==null?void 0:r.$el)!=null?e:r}const Y=_e?window:void 0;function w(...t){let e,r,o,s;if(typeof t[0]=="string"||Array.isArray(t[0])?([r,o,s]=t,e=Y):[e,r,o,s]=t,!e)return ze;Array.isArray(r)||(r=[r]),Array.isArray(o)||(o=[o]);const l=[],i=()=>{l.forEach(c=>c()),l.length=0},u=(c,v,d,p)=>(c.addEventListener(v,d,p),()=>c.removeEventListener(v,d,p)),a=O(()=>[$(e),J(s)],([c,v])=>{if(i(),!c)return;const d=Se(v)?{...v}:v;l.push(...r.flatMap(p=>o.map(h=>u(c,p,h,d))))},{immediate:!0,flush:"post"}),n=()=>{a(),i()};return q(n),n}function Re(){const t=f(!1);return N()&&F(()=>{t.value=!0}),t}function Te(t){const e=Re();return b(()=>(e.value,!!t()))}function Q(t,e,r={}){const{window:o=Y,...s}=r;let l;const i=Te(()=>o&&"ResizeObserver"in o),u=()=>{l&&(l.disconnect(),l=void 0)},a=b(()=>Array.isArray(t)?t.map(v=>$(v)):[$(t)]),n=O(a,v=>{if(u(),i.value&&o){l=new ResizeObserver(e);for(const d of v)d&&l.observe(d,s)}},{immediate:!0,flush:"post",deep:!0}),c=()=>{u(),n()};return q(c),{isSupported:i,stop:c}}function Ce(t,e={}){const{reset:r=!0,windowResize:o=!0,windowScroll:s=!0,immediate:l=!0}=e,i=f(0),u=f(0),a=f(0),n=f(0),c=f(0),v=f(0),d=f(0),p=f(0);function h(){const g=$(t);if(!g){r&&(i.value=0,u.value=0,a.value=0,n.value=0,c.value=0,v.value=0,d.value=0,p.value=0);return}const y=g.getBoundingClientRect();i.value=y.height,u.value=y.bottom,a.value=y.left,n.value=y.right,c.value=y.top,v.value=y.width,d.value=y.x,p.value=y.y}return Q(t,h),O(()=>$(t),g=>!g&&h()),s&&w("scroll",h,{capture:!0,passive:!0}),o&&w("resize",h,{passive:!0}),Me(()=>{l&&h()}),{height:i,bottom:u,left:a,right:n,top:c,width:v,x:d,y:p,update:h}}function Le(t,e={width:0,height:0},r={}){const{window:o=Y,box:s="content-box"}=r,l=b(()=>{var a,n;return(n=(a=$(t))==null?void 0:a.namespaceURI)==null?void 0:n.includes("svg")}),i=f(e.width),u=f(e.height);return Q(t,([a])=>{const n=s==="border-box"?a.borderBoxSize:s==="content-box"?a.contentBoxSize:a.devicePixelContentBoxSize;if(o&&l.value){const c=$(t);if(c){const v=o.getComputedStyle(c);i.value=Number.parseFloat(v.width),u.value=Number.parseFloat(v.height)}}else if(n){const c=Array.isArray(n)?n:[n];i.value=c.reduce((v,{inlineSize:d})=>v+d,0),u.value=c.reduce((v,{blockSize:d})=>v+d,0)}else i.value=a.contentRect.width,u.value=a.contentRect.height},r),O(()=>$(t),a=>{i.value=a?e.width:0,u.value=a?e.height:0}),{width:i,height:u}}const Oe={page:t=>[t.pageX,t.pageY],client:t=>[t.clientX,t.clientY],screen:t=>[t.screenX,t.screenY],movement:t=>t instanceof Touch?null:[t.movementX,t.movementY]};function Pe(t={}){const{type:e="page",touch:r=!0,resetOnTouchEnds:o=!1,initialValue:s={x:0,y:0},window:l=Y,target:i=l,scroll:u=!0,eventFilter:a}=t;let n=null;const c=f(s.x),v=f(s.y),d=f(null),p=typeof e=="function"?e:Oe[e],h=m=>{const C=p(m);n=m,C&&([c.value,v.value]=C,d.value="mouse")},g=m=>{if(m.touches.length>0){const C=p(m.touches[0]);C&&([c.value,v.value]=C,d.value="touch")}},y=()=>{if(!n||!l)return;const m=p(n);n instanceof MouseEvent&&m&&(c.value=m[0]+l.scrollX,v.value=m[1]+l.scrollY)},T=()=>{c.value=s.x,v.value=s.y},M=a?m=>a(()=>h(m),{}):m=>h(m),R=a?m=>a(()=>g(m),{}):m=>g(m),P=a?()=>a(()=>y(),{}):()=>y();if(i){const m={passive:!0};w(i,["mousemove","dragover"],M,m),r&&e!=="movement"&&(w(i,["touchstart","touchmove"],R,m),o&&w(i,"touchend",T,m)),u&&e==="page"&&w(l,"scroll",P,{passive:!0})}return{x:c,y:v,sourceType:d}}function $e(t,e={}){const{handleOutside:r=!0,window:o=Y}=e,{x:s,y:l,sourceType:i}=Pe(e),u=f(t??(o==null?void 0:o.document.body)),a=f(0),n=f(0),c=f(0),v=f(0),d=f(0),p=f(0),h=f(!0);let g=()=>{};return o&&(g=O([u,s,l],()=>{const y=$(u);if(!y)return;const{left:T,top:M,width:R,height:P}=y.getBoundingClientRect();c.value=T+o.pageXOffset,v.value=M+o.pageYOffset,d.value=P,p.value=R;const m=s.value-c.value,C=l.value-v.value;h.value=R===0||P===0||m<0||C<0||m>R||C>P,(r||!h.value)&&(a.value=m,n.value=C)},{immediate:!0}),w(document,"mouseleave",()=>{h.value=!0})),{x:s,y:l,sourceType:i,elementX:a,elementY:n,elementPositionX:c,elementPositionY:v,elementHeight:d,elementWidth:p,isOutside:h,stop:g}}function Ve(t={}){const{touch:e=!0,drag:r=!0,capture:o=!1,initialValue:s=!1,window:l=Y}=t,i=f(s),u=f(null);if(!l)return{pressed:i,sourceType:u};const a=v=>()=>{i.value=!0,u.value=v},n=()=>{i.value=!1,u.value=null},c=b(()=>$(t.target)||l);return w(c,"mousedown",a("mouse"),{passive:!0,capture:o}),w(l,"mouseleave",n,{passive:!0,capture:o}),w(l,"mouseup",n,{passive:!0,capture:o}),r&&(w(c,"dragstart",a("mouse"),{passive:!0,capture:o}),w(l,"drop",n,{passive:!0,capture:o}),w(l,"dragend",n,{passive:!0,capture:o})),e&&(w(c,"touchstart",a("touch"),{passive:!0,capture:o}),w(l,"touchend",n,{passive:!0,capture:o}),w(l,"touchcancel",n,{passive:!0,capture:o})),{pressed:i,sourceType:u}}function Ae(t,e){const{containerStyle:r,wrapperProps:o,scrollTo:s,calculateRange:l,currentList:i,containerRef:u}="itemHeight"in e?He(e,t):Ee(e,t);return{list:i,scrollTo:s,containerProps:{ref:u,onScroll:()=>{l()},style:r},wrapperProps:o}}function Z(t){const e=f(null),r=Le(e),o=f([]),s=ve(t);return{state:f({start:0,end:10}),source:s,currentList:o,size:r,containerRef:e}}function ee(t,e,r){return o=>{if(typeof r=="number")return Math.ceil(o/r);const{start:s=0}=t.value;let l=0,i=0;for(let u=s;u<e.value.length;u++){const a=r(u);if(l+=a,i=u,l>o)break}return i-s}}function te(t,e){return r=>{if(typeof e=="number")return Math.floor(r/e)+1;let o=0,s=0;for(let l=0;l<t.value.length;l++){const i=e(l);if(o+=i,o>=r){s=l;break}}return s+1}}function ne(t,e,r,o,{containerRef:s,state:l,currentList:i,source:u}){return()=>{const a=s.value;if(a){const n=r(t==="vertical"?a.scrollTop:a.scrollLeft),c=o(t==="vertical"?a.clientHeight:a.clientWidth),v=n-e,d=n+c+e;l.value={start:v<0?0:v,end:d>u.value.length?u.value.length:d},i.value=u.value.slice(l.value.start,l.value.end).map((p,h)=>({data:p,index:h+l.value.start}))}}}function se(t,e){return r=>typeof t=="number"?r*t:e.value.slice(0,r).reduce((s,l,i)=>s+t(i),0)}function oe(t,e,r){O([t.width,t.height,e],()=>{r()})}function le(t,e){return b(()=>typeof t=="number"?e.value.length*t:e.value.reduce((r,o,s)=>r+t(s),0))}const ke={horizontal:"scrollLeft",vertical:"scrollTop"};function re(t,e,r,o){return s=>{o.value&&(o.value[ke[t]]=r(s),e())}}function Ee(t,e){const r=Z(e),{state:o,source:s,currentList:l,size:i,containerRef:u}=r,a={overflowX:"auto"},{itemWidth:n,overscan:c=5}=t,v=ee(o,s,n),d=te(s,n),p=ne("horizontal",c,d,v,r),h=se(n,s),g=b(()=>h(o.value.start)),y=le(n,s);oe(i,e,p);const T=re("horizontal",p,h,u),M=b(()=>({style:{height:"100%",width:`${y.value-g.value}px`,marginLeft:`${g.value}px`,display:"flex"}}));return{scrollTo:T,calculateRange:p,wrapperProps:M,containerStyle:a,currentList:l,containerRef:u}}function He(t,e){const r=Z(e),{state:o,source:s,currentList:l,size:i,containerRef:u}=r,a={overflowY:"auto"},{itemHeight:n,overscan:c=5}=t,v=ee(o,s,n),d=te(s,n),p=ne("vertical",c,d,v,r),h=se(n,s),g=b(()=>h(o.value.start)),y=le(n,s);oe(i,e,p);const T=re("vertical",p,h,u),M=b(()=>({style:{width:"100%",height:`${y.value-g.value}px`,marginTop:`${g.value}px`}}));return{calculateRange:p,scrollTo:T,containerStyle:a,wrapperProps:M,currentList:l,containerRef:u}}const We=["onClick"],Ye={__name:"VScroll",props:{list:{default(){return[]}},itemSize:{default:32},overscan:{default:20}},setup(t){const e=t,r=f(),{width:o,height:s,top:l}=Ce(r),i=f(),u=b(()=>e.itemSize*e.list.length),a=b(()=>u.value-s.value),n=f(0),c=f(!1),v=f(170),d=x=>{c.value=!0,c.value&&(n.value=n.value+x.deltaY,setTimeout(()=>{c.value=!1},v.value))};O(n,()=>{n.value<0&&(n.value=0),Math.abs(n.value)>=a.value&&(n.value=a.value)});const p=b(()=>s.value/u.value),h=b(()=>{let x=s.value*p.value;return x<=20&&(x=20),x}),g=f(0);O(n,()=>{if(h.value<=20){let x=n.value/a.value;g.value=(s.value-20)*x}else g.value=n.value*p.value});const{pressed:y}=Ve(),{y:T,elementY:M}=$e(r),R=f(!1),P=f(null),m=f(null),C=()=>{R.value=!0,P.value=M.value,m.value=g.value},ae=()=>{const x=s.value-h.value;n.value=a.value*(M.value/x)};O(T,()=>{if(R.value&&P.value){if(T.value>=l.value&&T.value<=l.value+s.value){const x=s.value-h.value,A=P.value-m.value;n.value=a.value*((M.value-A)/x)}M.value<0&&(n.value=0),M.value>s.value&&(n.value=a.value)}}),O(y,()=>{!y.value&&R.value&&(R.value=!1,P.value=null)});const B=b(()=>Math.ceil(s.value/e.itemSize)),k=f([]),ue=()=>{if(k.value=[],e.list.length<=B.value+e.overscan*2){for(let _=0;_<e.list.length;_++){let S=_;const L=e.list[S];L._stat={position:S*e.itemSize},k.value.push(L)}return}let x=Math.floor(e.list.length-(u.value-n.value)/e.itemSize);const A=x-e.overscan,V=e.list.length-(x+B.value)-e.overscan,X=A<0?e.overscan-Math.abs(A):V<0?e.overscan+(Math.abs(V%e.overscan)==0?e.overscan:Math.abs(V%e.overscan)):e.overscan,j=V<0?e.overscan-Math.abs(V):A<0?e.overscan+(Math.abs(A%e.overscan)==0?e.overscan:Math.abs(A%e.overscan)):e.overscan;for(let _=0;_<X;_++){let S=x-(_+1);const L=e.list[S];L._stat={position:S*e.itemSize,index:S},k.value.push(L)}for(let _=0;_<B.value;_++){let S=x+_;const L=e.list[S];L._stat={position:S*e.itemSize,index:S},k.value.push(L)}for(let _=0;_<j;_++){let S=x+B.value+_;const L=e.list[S];L._stat={position:S*e.itemSize,index:S},k.value.push(L)}return`${j},${X}`};return O(n,async()=>{await G(),ue()},{immediate:!0}),F(()=>{}),(x,A)=>(E(),H("div",{ref_key:"container",ref:r,class:"overflow-hidden relative-position",onWheel:d,draggable:!1},[W("div",{ref_key:"scroller",ref:i,style:I({transition:z(c)?`${z(v)}ms`:"0ms",transform:`translateY(-${z(n)}px)`,userSelect:z(R)?"none":"auto"})},[(E(!0),H(U,null,K(z(k),(V,X)=>(E(),H("div",{class:"absolute full-width",style:I([{height:`${e.itemSize}px`,top:`${V._stat.position}px`},{"box-shadow":"0 0 0 1px inset black"}])},[de(x.$slots,"default",{item:V,index:V._stat.index},void 0,!0)],4))),256))],4),W("div",{class:"scrollbar",onClick:he(ae,["self"])},[W("div",{class:pe(["thumb",z(R)?"bg-green":"bg-grey-10"]),style:I({height:`${h.value}px`,transform:`translateY(${z(g)}px)`,transition:z(c)?`${z(v)}ms`:"0ms"}),onPointerdownCapture:C},null,38)],8,We)],544))}},Be=fe(Ye,[["__scopeId","data-v-d19f79f9"]]),Ie={class:"bg-red flex flex-center"},Xe={class:"flex",style:{width:"150px"}},Fe={__name:"index",setup(t){const e=Array.from(Array(100559).keys(),n=>({name:n+1})),r=f(Array.from(Array(100559).keys(),n=>({name:n+1}))),o=f(""),s=Array.from(Array(99999).keys()).map(n=>({height:n%2===0?42:84,size:n%2===0?"small":"large"}));b(()=>s.filter(n=>n.size.startsWith(o.value.toLowerCase())));const{list:l,containerProps:i,wrapperProps:u,scrollTo:a}=Ae(r,{itemHeight:32,overscan:40});return(n,c)=>{const v=Be;return E(),H("div",Ie,[me(v,{list:z(e),style:{height:"450px",width:"100px"}},{default:ge(({item:d,index:p,topIndex:h})=>[W("div",Xe,D(d.name)+" "+D(p),1)]),_:1},8,["list"]),W("div",we(z(i),{style:{height:"450px",width:"500px"}}),[W("div",ye(xe(z(u))),[(E(!0),H(U,null,K(z(l),({index:d,data:p})=>(E(),H("div",{key:d,style:I([{"box-shadow":"0 0 0 1px inset black"},{height:"32px",display:"flex",justifyContent:"center",alignItems:"center"}])}," Row "+D(d),1))),128))],16)],16)])}}};export{Fe as default};