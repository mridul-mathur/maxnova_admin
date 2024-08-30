import{a as _,g as w,ak as D,s as y,m,_ as e,ab as U,r as L,u as z,b as F,j as n,c as N,d as W,w as T,al as A,am as G,S as k,I as K,i as V,L as Z,B as q,an as H,v as J,ao as O,T as Q,W as X}from"./index-ab53a40d.js";import{u as Y,T as B}from"./TextField-1a9e6805.js";import{I as oo}from"./InputAdornment-3822dc90.js";import{B as to}from"./Button-f4a0cf8d.js";import{u as no}from"./useThemeProps-951639bc.js";import{C as io}from"./Card-47baa3b2.js";import"./useFormControl-3a006078.js";function ao(t){return _("MuiCircularProgress",t)}w("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const so=["className","color","disableShrink","size","style","thickness","value","variant"];let b=t=>t,S,M,R,E;const f=44,ro=D(S||(S=b`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),eo=D(M||(M=b`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),lo=t=>{const{classes:o,variant:i,color:a,disableShrink:s}=t,r={root:["root",i,`color${m(a)}`],svg:["svg"],circle:["circle",`circle${m(i)}`,s&&"circleDisableShrink"]};return W(r,ao,o)},co=y("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(t,o)=>{const{ownerState:i}=t;return[o.root,o[i.variant],o[`color${m(i.color)}`]]}})(({ownerState:t,theme:o})=>e({display:"inline-block"},t.variant==="determinate"&&{transition:o.transitions.create("transform")},t.color!=="inherit"&&{color:(o.vars||o).palette[t.color].main}),({ownerState:t})=>t.variant==="indeterminate"&&U(R||(R=b`
      animation: ${0} 1.4s linear infinite;
    `),ro)),go=y("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(t,o)=>o.svg})({display:"block"}),uo=y("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(t,o)=>{const{ownerState:i}=t;return[o.circle,o[`circle${m(i.variant)}`],i.disableShrink&&o.circleDisableShrink]}})(({ownerState:t,theme:o})=>e({stroke:"currentColor"},t.variant==="determinate"&&{transition:o.transitions.create("stroke-dashoffset")},t.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:t})=>t.variant==="indeterminate"&&!t.disableShrink&&U(E||(E=b`
      animation: ${0} 1.4s ease-in-out infinite;
    `),eo)),ho=L.forwardRef(function(o,i){const a=z({props:o,name:"MuiCircularProgress"}),{className:s,color:r="primary",disableShrink:l=!1,size:d=40,style:p,thickness:u=3.6,value:h=0,variant:x="indeterminate"}=a,C=F(a,so),v=e({},a,{color:r,disableShrink:l,size:d,thickness:u,value:h,variant:x}),c=lo(v),I={},P={},j={};if(x==="determinate"){const $=2*Math.PI*((f-u)/2);I.strokeDasharray=$.toFixed(3),j["aria-valuenow"]=Math.round(h),I.strokeDashoffset=`${((100-h)/100*$).toFixed(3)}px`,P.transform="rotate(-90deg)"}return n.jsx(co,e({className:N(c.root,s),style:e({width:d,height:d},P,p),ownerState:v,ref:i,role:"progressbar"},j,C,{children:n.jsx(go,{className:c.svg,ownerState:v,viewBox:`${f/2} ${f/2} ${f} ${f}`,children:n.jsx(uo,{className:c.circle,style:I,ownerState:v,cx:f,cy:f,r:(f-u)/2,fill:"none",strokeWidth:u})})}))}),fo=ho;function mo(t){return _("MuiLoadingButton",t)}const po=w("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]),g=po,xo=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],vo=t=>{const{loading:o,loadingPosition:i,classes:a}=t,s={root:["root",o&&"loading"],startIcon:[o&&`startIconLoading${m(i)}`],endIcon:[o&&`endIconLoading${m(i)}`],loadingIndicator:["loadingIndicator",o&&`loadingIndicator${m(i)}`]},r=W(s,mo,a);return e({},a,r)},Io=t=>t!=="ownerState"&&t!=="theme"&&t!=="sx"&&t!=="as"&&t!=="classes",Po=y(to,{shouldForwardProp:t=>Io(t)||t==="classes",name:"MuiLoadingButton",slot:"Root",overridesResolver:(t,o)=>[o.root,o.startIconLoadingStart&&{[`& .${g.startIconLoadingStart}`]:o.startIconLoadingStart},o.endIconLoadingEnd&&{[`& .${g.endIconLoadingEnd}`]:o.endIconLoadingEnd}]})(({ownerState:t,theme:o})=>e({[`& .${g.startIconLoadingStart}, & .${g.endIconLoadingEnd}`]:{transition:o.transitions.create(["opacity"],{duration:o.transitions.duration.short}),opacity:0}},t.loadingPosition==="center"&&{transition:o.transitions.create(["background-color","box-shadow","border-color"],{duration:o.transitions.duration.short}),[`&.${g.loading}`]:{color:"transparent"}},t.loadingPosition==="start"&&t.fullWidth&&{[`& .${g.startIconLoadingStart}, & .${g.endIconLoadingEnd}`]:{transition:o.transitions.create(["opacity"],{duration:o.transitions.duration.short}),opacity:0,marginRight:-8}},t.loadingPosition==="end"&&t.fullWidth&&{[`& .${g.startIconLoadingStart}, & .${g.endIconLoadingEnd}`]:{transition:o.transitions.create(["opacity"],{duration:o.transitions.duration.short}),opacity:0,marginLeft:-8}})),Lo=y("span",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:(t,o)=>{const{ownerState:i}=t;return[o.loadingIndicator,o[`loadingIndicator${m(i.loadingPosition)}`]]}})(({theme:t,ownerState:o})=>e({position:"absolute",visibility:"visible",display:"flex"},o.loadingPosition==="start"&&(o.variant==="outlined"||o.variant==="contained")&&{left:o.size==="small"?10:14},o.loadingPosition==="start"&&o.variant==="text"&&{left:6},o.loadingPosition==="center"&&{left:"50%",transform:"translate(-50%)",color:(t.vars||t).palette.action.disabled},o.loadingPosition==="end"&&(o.variant==="outlined"||o.variant==="contained")&&{right:o.size==="small"?10:14},o.loadingPosition==="end"&&o.variant==="text"&&{right:6},o.loadingPosition==="start"&&o.fullWidth&&{position:"relative",left:-10},o.loadingPosition==="end"&&o.fullWidth&&{position:"relative",right:-10})),yo=L.forwardRef(function(o,i){const a=no({props:o,name:"MuiLoadingButton"}),{children:s,disabled:r=!1,id:l,loading:d=!1,loadingIndicator:p,loadingPosition:u="center",variant:h="text"}=a,x=F(a,xo),C=Y(l),v=p??n.jsx(fo,{"aria-labelledby":C,color:"inherit",size:16}),c=e({},a,{disabled:r,loading:d,loadingIndicator:v,loadingPosition:u,variant:h}),I=vo(c),P=d?n.jsx(Lo,{className:I.loadingIndicator,ownerState:c,children:v}):null;return n.jsxs(Po,e({disabled:r||d,id:C,ref:i},x,{variant:h,classes:I,ownerState:c,children:[c.loadingPosition==="end"?s:P,c.loadingPosition==="end"?P:s]}))}),Co=yo;function bo(){const t=T(),o=A(),{login:i,isAuthenticated:a}=G(),[s,r]=L.useState(!1),[l,d]=L.useState({username:"",password:""}),p=x=>{d({...l,[x.target.name]:x.target.value})};L.useEffect(()=>{a&&o.replace("/dashboard")},[a]);const u=()=>{i(l.username,l.password)},h=n.jsxs(n.Fragment,{children:[n.jsxs(k,{spacing:3,children:[n.jsx(B,{name:"username",label:"Username",value:l.username,onChange:p}),n.jsx(B,{name:"password",label:"Password",value:l.password,onChange:p,type:s?"text":"password",InputProps:{endAdornment:n.jsx(oo,{position:"end",children:n.jsx(K,{onClick:()=>r(!s),edge:"end",children:n.jsx(V,{icon:s?"eva:eye-fill":"eva:eye-off-fill"})})})}})]}),n.jsx(k,{direction:"row",alignItems:"center",justifyContent:"flex-end",sx:{my:3},children:n.jsx(Z,{variant:"subtitle2",underline:"hover",children:"Forgot password?"})}),n.jsx(Co,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"inherit",onClick:u,children:"Login"})]});return n.jsxs(q,{sx:{...H({color:J(t.palette.background.default,.9),imgUrl:"/assets/background/overlay_4.jpg"}),height:1},children:[n.jsx(O,{sx:{position:"fixed",top:{xs:16,md:24},left:{xs:16,md:24}}}),n.jsx(k,{alignItems:"center",justifyContent:"center",sx:{height:1},children:n.jsxs(io,{sx:{p:5,width:1,maxWidth:420},children:[n.jsx(Q,{variant:"h4",sx:{pb:5},children:"Sign in to MaxNova"}),h]})})]})}function Eo(){return n.jsxs(n.Fragment,{children:[n.jsx(X,{children:n.jsx("title",{children:" Login | Minimal UI "})}),n.jsx(bo,{})]})}export{Eo as default};
