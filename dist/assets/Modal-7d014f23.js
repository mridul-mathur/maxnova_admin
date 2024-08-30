import{_ as m,r as i,c as V,b as ee,av as B,aH as Y,aI as q,j as k,aJ as se,aK as le,aL as A,aM as W,aN as G,au as z,aO as ie,d as ae}from"./index-ab53a40d.js";function ce(e){return typeof e=="string"}function ue(e,n,o){return e===void 0||ce(e)?n:m({},n,{ownerState:m({},n.ownerState,o)})}const de={disableDefaultClasses:!1},fe=i.createContext(de);function pe(e){const{disableDefaultClasses:n}=i.useContext(fe);return o=>n?"":e(o)}function te(e,n=[]){if(e===void 0)return{};const o={};return Object.keys(e).filter(t=>t.match(/^on[A-Z]/)&&typeof e[t]=="function"&&!n.includes(t)).forEach(t=>{o[t]=e[t]}),o}function he(e,n,o){return typeof e=="function"?e(n,o):e}function X(e){if(e===void 0)return{};const n={};return Object.keys(e).filter(o=>!(o.match(/^on[A-Z]/)&&typeof e[o]=="function")).forEach(o=>{n[o]=e[o]}),n}function be(e){const{getSlotProps:n,additionalProps:o,externalSlotProps:t,externalForwardedProps:s,className:r}=e;if(!n){const E=V(o==null?void 0:o.className,r,s==null?void 0:s.className,t==null?void 0:t.className),u=m({},o==null?void 0:o.style,s==null?void 0:s.style,t==null?void 0:t.style),v=m({},o,s,t);return E.length>0&&(v.className=E),Object.keys(u).length>0&&(v.style=u),{props:v,internalRef:void 0}}const l=te(m({},s,t)),a=X(t),d=X(s),p=n(l),h=V(p==null?void 0:p.className,o==null?void 0:o.className,r,s==null?void 0:s.className,t==null?void 0:t.className),g=m({},p==null?void 0:p.style,o==null?void 0:o.style,s==null?void 0:s.style,t==null?void 0:t.style),x=m({},p,o,d,a);return h.length>0&&(x.className=h),Object.keys(g).length>0&&(x.style=g),{props:x,internalRef:p.ref}}const me=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Z(e){var n;const{elementType:o,externalSlotProps:t,ownerState:s,skipResolvingSlotProps:r=!1}=e,l=ee(e,me),a=r?{}:he(t,s),{props:d,internalRef:p}=be(m({},l,{externalSlotProps:a})),h=B(p,a==null?void 0:a.ref,(n=e.additionalProps)==null?void 0:n.ref);return ue(o,m({},d,{ref:h}),s)}function ge(e){return typeof e=="function"?e():e}const Ee=i.forwardRef(function(n,o){const{children:t,container:s,disablePortal:r=!1}=n,[l,a]=i.useState(null),d=B(i.isValidElement(t)?t.ref:null,o);if(Y(()=>{r||a(ge(s)||document.body)},[s,r]),Y(()=>{if(l&&!r)return q(o,l),()=>{q(o,null)}},[o,l,r]),r){if(i.isValidElement(t)){const p={ref:d};return i.cloneElement(t,p)}return k.jsx(i.Fragment,{children:t})}return k.jsx(i.Fragment,{children:l&&se.createPortal(t,l)})});function xe(e){const n=A(e);return n.body===e?W(e).innerWidth>n.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function j(e,n){n?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function J(e){return parseInt(W(e).getComputedStyle(e).paddingRight,10)||0}function ye(e){const o=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,t=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return o||t}function Q(e,n,o,t,s){const r=[n,o,...t];[].forEach.call(e.children,l=>{const a=r.indexOf(l)===-1,d=!ye(l);a&&d&&j(l,s)})}function _(e,n){let o=-1;return e.some((t,s)=>n(t)?(o=s,!0):!1),o}function ve(e,n){const o=[],t=e.container;if(!n.disableScrollLock){if(xe(t)){const l=le(A(t));o.push({value:t.style.paddingRight,property:"padding-right",el:t}),t.style.paddingRight=`${J(t)+l}px`;const a=A(t).querySelectorAll(".mui-fixed");[].forEach.call(a,d=>{o.push({value:d.style.paddingRight,property:"padding-right",el:d}),d.style.paddingRight=`${J(d)+l}px`})}let r;if(t.parentNode instanceof DocumentFragment)r=A(t).body;else{const l=t.parentElement,a=W(t);r=(l==null?void 0:l.nodeName)==="HTML"&&a.getComputedStyle(l).overflowY==="scroll"?l:t}o.push({value:r.style.overflow,property:"overflow",el:r},{value:r.style.overflowX,property:"overflow-x",el:r},{value:r.style.overflowY,property:"overflow-y",el:r}),r.style.overflow="hidden"}return()=>{o.forEach(({value:r,el:l,property:a})=>{r?l.style.setProperty(a,r):l.style.removeProperty(a)})}}function Re(e){const n=[];return[].forEach.call(e.children,o=>{o.getAttribute("aria-hidden")==="true"&&n.push(o)}),n}class Pe{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(n,o){let t=this.modals.indexOf(n);if(t!==-1)return t;t=this.modals.length,this.modals.push(n),n.modalRef&&j(n.modalRef,!1);const s=Re(o);Q(o,n.mount,n.modalRef,s,!0);const r=_(this.containers,l=>l.container===o);return r!==-1?(this.containers[r].modals.push(n),t):(this.containers.push({modals:[n],container:o,restore:null,hiddenSiblings:s}),t)}mount(n,o){const t=_(this.containers,r=>r.modals.indexOf(n)!==-1),s=this.containers[t];s.restore||(s.restore=ve(s,o))}remove(n,o=!0){const t=this.modals.indexOf(n);if(t===-1)return t;const s=_(this.containers,l=>l.modals.indexOf(n)!==-1),r=this.containers[s];if(r.modals.splice(r.modals.indexOf(n),1),this.modals.splice(t,1),r.modals.length===0)r.restore&&r.restore(),n.modalRef&&j(n.modalRef,o),Q(r.container,n.mount,n.modalRef,r.hiddenSiblings,!1),this.containers.splice(s,1);else{const l=r.modals[r.modals.length-1];l.modalRef&&j(l.modalRef,!1)}return t}isTopModal(n){return this.modals.length>0&&this.modals[this.modals.length-1]===n}}function Se(e){return typeof e=="function"?e():e}function Te(e){return e?e.props.hasOwnProperty("in"):!1}const Ce=new Pe;function Ne(e){const{container:n,disableEscapeKeyDown:o=!1,disableScrollLock:t=!1,manager:s=Ce,closeAfterTransition:r=!1,onTransitionEnter:l,onTransitionExited:a,children:d,onClose:p,open:h,rootRef:g}=e,x=i.useRef({}),E=i.useRef(null),u=i.useRef(null),v=B(u,g),[I,w]=i.useState(!h),N=Te(d);let c=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(c=!1);const S=()=>A(E.current),T=()=>(x.current.modalRef=u.current,x.current.mount=E.current,x.current),M=()=>{s.mount(T(),{disableScrollLock:t}),u.current&&(u.current.scrollTop=0)},y=G(()=>{const b=Se(n)||S().body;s.add(T(),b),u.current&&M()}),R=i.useCallback(()=>s.isTopModal(T()),[s]),D=G(b=>{E.current=b,b&&(h&&R()?M():u.current&&j(u.current,c))}),P=i.useCallback(()=>{s.remove(T(),c)},[c,s]);i.useEffect(()=>()=>{P()},[P]),i.useEffect(()=>{h?y():(!N||!r)&&P()},[h,P,N,r,y]);const O=b=>f=>{var C;(C=b.onKeyDown)==null||C.call(b,f),!(f.key!=="Escape"||f.which===229||!R())&&(o||(f.stopPropagation(),p&&p(f,"escapeKeyDown")))},F=b=>f=>{var C;(C=b.onClick)==null||C.call(b,f),f.target===f.currentTarget&&p&&p(f,"backdropClick")};return{getRootProps:(b={})=>{const f=te(e);delete f.onTransitionEnter,delete f.onTransitionExited;const C=m({},f,b);return m({role:"presentation"},C,{onKeyDown:O(C),ref:v})},getBackdropProps:(b={})=>{const f=b;return m({"aria-hidden":!0},f,{onClick:F(f),open:h})},getTransitionProps:()=>{const b=()=>{w(!1),l&&l()},f=()=>{w(!0),a&&a(),r&&P()};return{onEnter:z(b,d==null?void 0:d.props.onEnter),onExited:z(f,d==null?void 0:d.props.onExited)}},rootRef:v,portalRef:D,isTopModal:R,exited:I,hasTransition:N}}const ke=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Ie(e){const n=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(n)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:n}function Fe(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const n=t=>e.ownerDocument.querySelector(`input[type="radio"]${t}`);let o=n(`[name="${e.name}"]:checked`);return o||(o=n(`[name="${e.name}"]`)),o!==e}function we(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Fe(e))}function Oe(e){const n=[],o=[];return Array.from(e.querySelectorAll(ke)).forEach((t,s)=>{const r=Ie(t);r===-1||!we(t)||(r===0?n.push(t):o.push({documentOrder:s,tabIndex:r,node:t}))}),o.sort((t,s)=>t.tabIndex===s.tabIndex?t.documentOrder-s.documentOrder:t.tabIndex-s.tabIndex).map(t=>t.node).concat(n)}function Ae(){return!0}function Me(e){const{children:n,disableAutoFocus:o=!1,disableEnforceFocus:t=!1,disableRestoreFocus:s=!1,getTabbable:r=Oe,isEnabled:l=Ae,open:a}=e,d=i.useRef(!1),p=i.useRef(null),h=i.useRef(null),g=i.useRef(null),x=i.useRef(null),E=i.useRef(!1),u=i.useRef(null),v=B(n.ref,u),I=i.useRef(null);i.useEffect(()=>{!a||!u.current||(E.current=!o)},[o,a]),i.useEffect(()=>{if(!a||!u.current)return;const c=A(u.current);return u.current.contains(c.activeElement)||(u.current.hasAttribute("tabIndex")||u.current.setAttribute("tabIndex","-1"),E.current&&u.current.focus()),()=>{s||(g.current&&g.current.focus&&(d.current=!0,g.current.focus()),g.current=null)}},[a]),i.useEffect(()=>{if(!a||!u.current)return;const c=A(u.current),S=y=>{I.current=y,!(t||!l()||y.key!=="Tab")&&c.activeElement===u.current&&y.shiftKey&&(d.current=!0,h.current&&h.current.focus())},T=()=>{const y=u.current;if(y===null)return;if(!c.hasFocus()||!l()||d.current){d.current=!1;return}if(y.contains(c.activeElement)||t&&c.activeElement!==p.current&&c.activeElement!==h.current)return;if(c.activeElement!==x.current)x.current=null;else if(x.current!==null)return;if(!E.current)return;let R=[];if((c.activeElement===p.current||c.activeElement===h.current)&&(R=r(u.current)),R.length>0){var D,P;const O=!!((D=I.current)!=null&&D.shiftKey&&((P=I.current)==null?void 0:P.key)==="Tab"),F=R[0],L=R[R.length-1];typeof F!="string"&&typeof L!="string"&&(O?L.focus():F.focus())}else y.focus()};c.addEventListener("focusin",T),c.addEventListener("keydown",S,!0);const M=setInterval(()=>{c.activeElement&&c.activeElement.tagName==="BODY"&&T()},50);return()=>{clearInterval(M),c.removeEventListener("focusin",T),c.removeEventListener("keydown",S,!0)}},[o,t,s,l,a,r]);const w=c=>{g.current===null&&(g.current=c.relatedTarget),E.current=!0,x.current=c.target;const S=n.props.onFocus;S&&S(c)},N=c=>{g.current===null&&(g.current=c.relatedTarget),E.current=!0};return k.jsxs(i.Fragment,{children:[k.jsx("div",{tabIndex:a?0:-1,onFocus:N,ref:p,"data-testid":"sentinelStart"}),i.cloneElement(n,{ref:v,onFocus:w}),k.jsx("div",{tabIndex:a?0:-1,onFocus:N,ref:h,"data-testid":"sentinelEnd"})]})}const ne="base";function De(e){return`${ne}--${e}`}function Le(e,n){return`${ne}-${e}-${n}`}function oe(e,n){const o=ie[n];return o?De(o):Le(e,n)}function He(e,n){const o={};return n.forEach(t=>{o[t]=oe(e,t)}),o}const re="Modal";function $e(e){return oe(re,e)}He(re,["root","hidden","backdrop"]);const je=["children","closeAfterTransition","container","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onKeyDown","open","onTransitionEnter","onTransitionExited","slotProps","slots"],Ke=e=>{const{open:n,exited:o}=e;return ae({root:["root",!n&&o&&"hidden"],backdrop:["backdrop"]},pe($e))},Ue=i.forwardRef(function(n,o){var t;const{children:s,closeAfterTransition:r=!1,container:l,disableAutoFocus:a=!1,disableEnforceFocus:d=!1,disableEscapeKeyDown:p=!1,disablePortal:h=!1,disableRestoreFocus:g=!1,disableScrollLock:x=!1,hideBackdrop:E=!1,keepMounted:u=!1,onBackdropClick:v,open:I,slotProps:w={},slots:N={}}=n,c=ee(n,je),S=m({},n,{closeAfterTransition:r,disableAutoFocus:a,disableEnforceFocus:d,disableEscapeKeyDown:p,disablePortal:h,disableRestoreFocus:g,disableScrollLock:x,hideBackdrop:E,keepMounted:u}),{getRootProps:T,getBackdropProps:M,getTransitionProps:y,portalRef:R,isTopModal:D,exited:P,hasTransition:O}=Ne(m({},S,{rootRef:o})),F=m({},S,{exited:P,hasTransition:O}),L=Ke(F),$={};if(s.props.tabIndex===void 0&&($.tabIndex="-1"),O){const{onEnter:H,onExited:K}=y();$.onEnter=H,$.onExited=K}const U=(t=N.root)!=null?t:"div",b=Z({elementType:U,externalSlotProps:w.root,externalForwardedProps:c,getSlotProps:T,className:L.root,ownerState:F}),f=N.backdrop,C=Z({elementType:f,externalSlotProps:w.backdrop,getSlotProps:H=>M(m({},H,{onClick:K=>{v&&v(K),H!=null&&H.onClick&&H.onClick(K)}})),className:L.backdrop,ownerState:F});return!u&&!I&&(!O||P)?null:k.jsx(Ee,{ref:R,container:l,disablePortal:h,children:k.jsxs(U,m({},b,{children:[!E&&f?k.jsx(f,m({},C)):null,k.jsx(Me,{disableEnforceFocus:d,disableAutoFocus:a,disableRestoreFocus:g,isEnabled:D,open:I,children:i.cloneElement(s,$)})]}))})});export{Ue as M};
