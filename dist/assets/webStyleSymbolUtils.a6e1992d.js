import{bw as d,bx as w,gH as N,bz as u,gI as S,bu as P,e as j,by as O,bA as p,bB as v,gJ as x,gK as f,gL as g,bv as B}from"./index.ab15bc04.js";import{c as z,a as h}from"./devEnvironmentUtils.f51567b1.js";function I(e,t,a,l){return e.name?e.styleName&&e.styleName==="Esri2DPointSymbolsStyle"?E(e,t,l):P(e,t,l).then(o=>A(o,e.name,t,a,l)):Promise.reject(new j("symbolstyleutils:style-symbol-reference-name-missing","Missing name in style symbol reference"))}function A(e,t,a,l,o){const b=e.data,y={portal:a&&a.portal||O.getDefault(),url:u(e.baseUrl),origin:"portal-item"},n=b.items.find(r=>r.name===t);if(!n){const r=`The symbol name '${t}' could not be found`;return Promise.reject(new j("symbolstyleutils:symbol-name-not-found",r,{symbolName:t}))}let m=p(v(n,l),y),i=n.thumbnail&&n.thumbnail.href;const c=n.thumbnail&&n.thumbnail.imageData;z()&&(m=h(m),i=h(i));const U={portal:a.portal,url:u(S(m)),origin:"portal-item"};return d(m,o).then(r=>{const $=l==="cimRef"?w(r.data):r.data,s=N($,U);if(s&&x(s)){if(i){const D=p(i,y);s.thumbnail=new f({url:D})}else c&&(s.thumbnail=new f({url:`data:image/png;base64,${c}`}));e.styleUrl?s.styleOrigin=new g({portal:a.portal,styleUrl:e.styleUrl,name:t}):e.styleName&&(s.styleOrigin=new g({portal:a.portal,styleName:e.styleName,name:t}))}return s})}function E(e,t,a){const l=B.replace(/\{SymbolName\}/gi,e.name);return d(l,a).then(o=>{const b=w(o.data);return N(b,{portal:t.portal,url:u(S(l)),origin:"portal-item"})})}export{A as fetchSymbolFromStyle,I as resolveWebStyleSymbol};
