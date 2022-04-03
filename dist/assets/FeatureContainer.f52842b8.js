import{L as k,b$ as it,a_ as rt,O as at,M as nt,b6 as ot,y as ht,r as E,t as p,s as dt,bU as F,B as x,d as G,g as _,e as Q,bi as j,bV as ut,c0 as R,D as z,aQ as lt,x as v,c1 as ct,V as _t,be as pt,c2 as Et}from"./index.ab15bc04.js";import{p as V,_ as X,a2 as A,A as L,B as P,a8 as N,a9 as I,ac as $,ad as xt,L as ft,K as Rt,ae as vt,af as gt}from"./enums.84480fc7.js";import{r as mt,o as yt}from"./TileContainer.ef410674.js";import{n as Tt,l as bt,f as U}from"./visualVariablesUtils.3b95df02.js";import{f as y,i as St,K as B,Z as q}from"./Utils.74f9282d.js";import{D as Z,P as H,G as J,L as W,M as kt,Y as Dt,V as Ct}from"./enums.457e23f9.js";import{D as zt}from"./VertexArrayObject.cc747ff8.js";import{u as tt}from"./Texture.b30343f5.js";class wt{acquire(t){return{refCount:1,version:-1,labelMat2d:k(),tileMat3:k(),dvs:k()}}release(t){}}class b extends mt{constructor(t,e,s){super(t,e,s,V,V)}destroy(){super.destroy(),this._transforms&&b.TransformCache.release(this.key.hash)}setTransform(t,e){const s=e/(t.resolution*t.pixelRatio),i=this.transforms.tileMat3,[r,a]=t.toScreenNoRotation([0,0],[this.x,this.y]),o=this.width/this.rangeX*s,n=this.height/this.rangeY*s;it(i,o,0,0,0,n,0,r,a,1),rt(this.transforms.dvs,t.displayViewMat3,i);const d=this.transforms.labelMat2d,l=t.getScreenTransform(d,e),c=ht();at(c,[this.x,this.y],l),nt(d,c),ot(d,t.viewMat2d,d)}_createTransforms(){return b.TransformCache.acquire(this.key.hash)}}b.TransformCache=new wt;const T=2147483647;class f{constructor(t){this._head=t,this._cursor=t}static from(t,e=0,s=t.byteLength/h.BYTES_PER_RECORD-e){const i=new h(new Int32Array(t,e*h.BYTES_PER_RECORD,s*h.ELEMENTS_PER_RECORD));return new f(i)}size(){let t=this._cursor,e=0;for(;t;)e+=t.size(),t=t._link;return e}get id(){return this._cursor.id}set id(t){this._cursor.id=t}get materialKey(){return this._cursor.materialKey}set materialKey(t){this._cursor.materialKey=t}get insertAfter(){return this._cursor.insertAfter}get indexFrom(){return this._cursor.indexFrom}set indexFrom(t){this._cursor.indexFrom=t}get indexCount(){return this._cursor.indexCount}set indexCount(t){this._cursor.indexCount=t}get vertexFrom(){return this._cursor.vertexFrom}set vertexFrom(t){this._cursor.vertexFrom=t}get vertexCount(){return this._cursor.vertexCount}set vertexCount(t){this._cursor.vertexCount=t}get sortKey(){return this._cursor.sortKey}set sortKey(t){this._cursor.sortKey=t}get index(){return this._cursor._indexStart+this._cursor._index}seekIndex(t){let e=t;for(this._cursor=this._head;this._cursor;){const s=this._cursor.size();if(e<s)return this._cursor._index=e,!0;e-=s,this._cursor=this._cursor._link}return!1}forEach(t){const e=this.getCursor();for(;e.next();)t(e)}link(t){if(!this._head)return void(this._head=t._head);let e=this._head;for(;e._link;)e=e._link;e._link=t._head,e._link._indexStart=e._indexStart+e.size()}getCursor(){return this.copy()}lookup(t){for(this._cursor=this._head;this._cursor&&!this._cursor.lookup(t);){if(!this._cursor._link)return!1;this._cursor=this._cursor._link}return!!this._cursor}copy(){var t;const e=new f((t=this._head)==null?void 0:t.copy());if(!e._head)return e;let s=e._head,i=e._head._link;for(;i;)s._link=i.copy(),s=i,i=s._link;return e}next(){return!!this._cursor&&(!!this._cursor.next()||!!this._cursor._link&&(this._cursor=this._cursor._link,this.next()))}peekId(){var t;return(t=this._cursor.peekId())!=null?t:this._cursor._link.peekId()}delete(t){let e=this._head,s=null;for(;e;){if(e.delete(t))return e.isEmpty()&&(E(s)&&(s._link=e._link),e===this._head&&(this._head=e._link),e===this._cursor&&(this._cursor=e._link)),!0;s=e,e=e._link}return!1}}f.ELEMENTS_PER_RECORD=X,f.BYTES_PER_RECORD=f.ELEMENTS_PER_RECORD*Int32Array.BYTES_PER_ELEMENT;class h{constructor(t){this._link=null,this._index=-1,this._indexStart=0,this._deletedCount=0,this._offsets={instance:null},this._packedRecords=t}static from(t,e=0,s=t.byteLength/this.BYTES_PER_RECORD-e){return new h(new Int32Array(t,e*this.BYTES_PER_RECORD,s*this.ELEMENTS_PER_RECORD))}delete(t){const e=this._index,s=this.lookup(t);if(s)for(this.id=T,++this._deletedCount;this.next()&&this.id===t;)this.id=T,++this._deletedCount;return this._index=e,s}isEmpty(){return this._deletedCount===this.size()}link(t){this._link?this._link.link(t):this._link=t}lookup(t){if(p(this._offsets.instance)){this._offsets.instance=new Map;const s=this.copy();s._index=-1;let i=0;for(;s.next();)s.id!==i&&(this._offsets.instance.set(s.id,s._index),i=s.id)}if(!this._offsets.instance.has(t))return!1;const e=this._index;return this._index=this._offsets.instance.get(t),this.id!==T||(this._index=e,!1)}get id(){return this._packedRecords[this._index*h.ELEMENTS_PER_RECORD]}set id(t){this._packedRecords[this._index*h.ELEMENTS_PER_RECORD]=t}get materialKey(){return this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+1]}set materialKey(t){this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+1]=t}get insertAfter(){return this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+2]}get indexFrom(){return this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+3]}set indexFrom(t){this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+3]=t}get indexCount(){return this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+4]}set indexCount(t){this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+4]=t}get vertexFrom(){return this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+5]}set vertexFrom(t){this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+5]=t}get vertexCount(){return this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+6]}set vertexCount(t){this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+6]=t}get sortKey(){return this._packedRecordsF32||(this._packedRecordsF32=new Float32Array(this._packedRecords.buffer)),this._packedRecordsF32[this._index*h.ELEMENTS_PER_RECORD+7]}set sortKey(t){this._packedRecordsF32||(this._packedRecordsF32=new Float32Array(this._packedRecords.buffer)),this._packedRecordsF32[this._index*h.ELEMENTS_PER_RECORD+7]=t}get index(){return this._index}size(){return this._packedRecords.length/h.ELEMENTS_PER_RECORD}next(){for(;++this._index<this.size()&&this.id===T;);return this._index<this.size()}peekId(){const t=(this._index+1)*h.ELEMENTS_PER_RECORD;return t>=this._packedRecords.length?0:this._packedRecords[t]}getCursor(){return this.copy()}copy(){const t=new h(this._packedRecords);return t._indexStart=this._indexStart,t._link=this._link,t._index=this._index,t._offsets=this._offsets,t._deletedCount=this._deletedCount,t}}h.ELEMENTS_PER_RECORD=X,h.BYTES_PER_RECORD=h.ELEMENTS_PER_RECORD*Int32Array.BYTES_PER_ELEMENT;const w=dt.getLogger("esri.views.2d.engine.webgl.AttributeStoreView"),D=Tt(bt,w);class K{constructor(t,e,s){this._texture=null,this._lastTexture=null,this._fbos={},this.texelSize=4;const{buffer:i,pixelType:r,textureOnly:a}=t,o=y(r);this.shared=s,this.pixelType=r,this.size=e,this.textureOnly=a,a||(this.data=new o(_(i))),this._resetRange()}destroy(){x(this._texture,t=>t.dispose());for(const t in this._fbos)x(this._fbos[t],e=>{t==="0"&&e.detachColorTexture(),e.dispose()}),this._fbos[t]=null;this._texture=null}get _textureDesc(){return{target:kt.TEXTURE_2D,wrapMode:Z.CLAMP_TO_EDGE,pixelFormat:H.RGBA,dataType:this.pixelType,samplingMode:W.NEAREST,width:this.size,height:this.size}}setData(t,e,s){const i=U(t),r=_(this.data),a=i*this.texelSize+e;!r||a>=r.length||(r[a]=s,this.dirtyStart=Math.min(this.dirtyStart,i),this.dirtyEnd=Math.max(this.dirtyEnd,i))}getData(t,e){if(p(this.data))return null;const s=U(t)*this.texelSize+e;return!this.data||s>=this.data.length?null:this.data[s]}getTexture(t){return z(this._texture,()=>this._initTexture(t))}getFBO(t,e=0){if(p(this._fbos[e])){const s={colorTarget:Dt.TEXTURE,depthStencilTarget:Ct.NONE},i=e===0?this.getTexture(t):this._textureDesc;this._fbos[e]=new zt(t,s,i)}return this._fbos[e]}get locked(){return!(this.pixelType!==J.UNSIGNED_BYTE||!this.shared||this.textureOnly||!G("esri-atomics")||!this.data)&&Atomics.load(this.data,0)===1}get hasDirty(){const t=this.dirtyStart;return this.dirtyEnd>=t}updateTexture(t,e){if(!this.locked){try{const s=this.dirtyStart,i=this.dirtyEnd;if(!this.hasDirty)return;this._resetRange();const r=_(this.data).buffer,a=this.getTexture(t),o=4,n=(s-s%this.size)/this.size,d=(i-i%this.size)/this.size,l=n,c=this.size,g=d,m=n*this.size*o,S=(c+g*this.size)*o-m,M=y(this.pixelType),et=new M(r,m*M.BYTES_PER_ELEMENT,S),st=this.size,O=g-l+1;if(O>this.size)return void w.error(new Q("mapview-webgl","Out-of-bounds index when updating AttributeData"));a.updateData(0,0,l,st,O,et)}catch{}e()}}update(t){const{data:e,start:s,end:i}=t;if(E(e)){const r=this.data,a=s*this.texelSize;for(let o=0;o<e.length;o++){const n=1<<o%this.texelSize;t.layout&n&&(r[a+o]=e[o])}}this.dirtyStart=Math.min(this.dirtyStart,s),this.dirtyEnd=Math.max(this.dirtyEnd,i)}resize(t,e){const s=this.size;if(this.size=e,this.textureOnly)return void(s!==this.size&&(this._lastTexture=this._texture,this._texture=null));const i=y(this.pixelType);this.destroy(),this.data=new i(_(t.buffer))}_resetRange(){this.dirtyStart=2147483647,this.dirtyEnd=0}_initTexture(t){const e=new tt(t,this._textureDesc,z(this.data,void 0));if(E(this._lastTexture)&&this._fbos[0]){const s=this._lastTexture.descriptor.width,i=this._lastTexture.descriptor.height,r=this._lastTexture.descriptor.dataType,a=this._lastTexture.descriptor.pixelFormat,o=this.getFBO(t),n=St(r),d=new(y(r))(new ArrayBuffer(s*i*n*this.texelSize)),l=t.getBoundFramebufferObject(),{x:c,y:g,width:m,height:S}=t.getViewport();t.bindFramebuffer(o),o.readPixels(0,0,s,i,a,r,d),e.updateData(0,0,0,2*s,i/2,d),t.setViewport(c,g,m,S),t.bindFramebuffer(l)}return this.destroy(),this._texture=e,this._texture}}class Mt{constructor(t){this._onUpdate=t,this._initialized=!1,this._forceNextUpload=!1,this._locked=!1}initialize(t){const{blocks:e,shared:s,size:i}=t;if(this.shared=s,this.size=i,D("Initializing AttributeStoreView",t),p(this._data))this._data=F(e,r=>new K(r,i,s));else for(let r=0;r<this._data.length;r++){const a=this._data[r],o=e[r];E(o)&&(p(a)?this._data[r]=new K(o,i,s):a.resize(o,i))}this._initialized=!0}destroy(){x(this._data,t=>F(t,e=>e.destroy())),x(this._defaultTexture,t=>t.dispose())}isEmpty(){const t=this._data;return p(t)}isUpdating(){const t=E(this._pendingAttributeUpdate),e=t;return G("esri-2d-log-updating")&&console.log(`Updating AttributeStoreView ${e}
  -> hasPendingUpdate ${t}`),e}getBlock(t){return p(this._data)?null:this._data[t]}setLabelMinZoom(t,e){this.setData(t,0,1,e)}getLabelMinZoom(t){return this.getData(t,0,1,255)}getFilterFlags(t){return this.getData(t,0,0,0)}getVVSize(t){return this.getData(t,A,0,0)}getData(t,e,s,i){if(!this._data)return 0;const r=_(this._data)[e];if(p(r))return 0;const a=r.getData(t,s);return E(a)?a:i}setData(t,e,s,i){const r=_(this._data)[e];_(r).setData(t,s,i)}lockTextureUpload(){this._locked=!0}unlockTextureUpload(){this._locked=!1}forceTextureUpload(){this._forceNextUpload=!0}async requestUpdate(t){if(this._pendingAttributeUpdate)return void w.error(new Q("mapview-webgl","Tried to update attribute data with a pending update"));const e=j();return D("AttributeStoreView Update Requested",t),this._pendingAttributeUpdate={data:t,resolver:e},e.promise}update(){if(this._initialized&&E(this._pendingAttributeUpdate)){const{data:t,resolver:e}=this._pendingAttributeUpdate,s=_(this._data);for(let i=0;i<t.blocks.length;i++){const r=t.blocks[i],a=s[i];x(a,o=>x(r,n=>{D(`Updating block ${i}`,n),o.update(n)}))}this._pendingAttributeUpdate=null,e(),this._onUpdate()}}bindTextures(t,e=!0){this.update();const s=this._getDefaultTexture(t);if(!this._initialized)return t.bindTexture(s,L),void(e&&(t.bindTexture(s,P),t.bindTexture(s,N),t.bindTexture(s,I),t.bindTexture(s,$)));const i=_(this._data);this._locked&&!this._forceNextUpload||(ut(i,r=>r.updateTexture(t,()=>this._onUpdate())),this._forceNextUpload=!1),t.bindTexture(R(i[xt],s,r=>r.getTexture(t)),L),e&&(t.bindTexture(R(i[ft],s,r=>r.getTexture(t)),$),t.bindTexture(R(i[Rt],s,r=>r.getTexture(t)),P),t.bindTexture(R(i[A],s,r=>r.getTexture(t)),N),t.bindTexture(R(i[vt],s,r=>r.getTexture(t)),I))}_getDefaultTexture(t){if(p(this._defaultTexture)){const e={wrapMode:Z.CLAMP_TO_EDGE,pixelFormat:H.RGBA,dataType:J.UNSIGNED_BYTE,samplingMode:W.NEAREST,width:1,height:1};this._defaultTexture=new tt(t,e,new Uint8Array(4))}return this._defaultTexture}}function C(u,t){const e=t.length;if(u<t[0].value||e===1)return t[0].size;for(let s=1;s<e;s++)if(u<t[s].value){const i=(u-t[s-1].value)/(t[s].value-t[s-1].value);return t[s-1].size+i*(t[s].size-t[s-1].size)}return t[e-1].size}function Y(u,t,e=0){if(p(t))return u[e+0]=0,u[e+1]=0,u[e+2]=0,void(u[e+3]=0);const{r:s,g:i,b:r,a}=t;u[e+0]=s*a/255,u[e+1]=i*a/255,u[e+2]=r*a/255,u[e+3]=a}class Ot{constructor(){this.symbolLevels=[],this.vvColorValues=new Float32Array(8),this.vvColors=new Float32Array(32),this.vvOpacityValues=new Float32Array(8),this.vvOpacities=new Float32Array(8),this.vvSizeMinMaxValue=new Float32Array(4),this.ddColors=new Float32Array(32),this.ddBackgroundColor=new Float32Array(4),this.ddActiveDots=new Float32Array(8),this._vvMaterialParameters={vvSizeEnabled:!1,vvColorEnabled:!1,vvRotationEnabled:!1,vvRotationType:"geographic",vvOpacityEnabled:!1}}getSizeVVFieldStops(t){const e=this._vvSizeFieldStops;switch(e.type){case"static":return e;case"level-dependent":return z(e.levels[t],()=>{let s=1/0,i=0;for(const n in e.levels){const d=parseFloat(n),l=Math.abs(t-d);l<s&&(s=l,i=d)}if(s===1/0)return{sizes:new Float32Array([0,0,0,0,0,0]),values:new Float32Array([0,0,0,0,0,0])};const r=2**((t-i)/2),a=_(e.levels[i]),o=new Float32Array(a.values);return o[2]*=r,o[3]*=r,{sizes:_(a.sizes),values:o}})}}get vvMaterialParameters(){return this._vvMaterialParameters}update(t){E(this._vvInfo)&&this._updateVisualVariables(this._vvInfo.vvRanges,t)}setInfo(t,e,s){this._updateEffects(s),this._vvInfo=e,t.type==="dot-density"&&this._updateDotDensityInfo(t)}getVariation(){return{ddDotBlending:this.ddDotBlending,outsideLabelsVisible:this.outsideLabelsVisible,oesTextureFloat:lt().supportsTextureFloat}}getVariationHash(){return(this.ddDotBlending?1:0)|(this.outsideLabelsVisible?1:0)<<1}_updateEffects(t){E(t)?this.outsideLabelsVisible=t.excludedLabelsVisible:this.outsideLabelsVisible=!1}_updateVisualVariables(t,e){const s=this._vvMaterialParameters;if(s.vvOpacityEnabled=!1,s.vvSizeEnabled=!1,s.vvColorEnabled=!1,s.vvRotationEnabled=!1,!t)return;const i=t.size;if(i){if(s.vvSizeEnabled=!0,i.minMaxValue){const n=i.minMaxValue;let d,l;if(B(n.minSize)&&B(n.maxSize))if(q(n.minSize)&&q(n.maxSize))d=v(n.minSize),l=v(n.maxSize);else{const c=e.scale;d=v(C(c,n.minSize.stops)),l=v(C(c,n.maxSize.stops))}this.vvSizeMinMaxValue.set([n.minDataValue,n.maxDataValue,d,l])}if(i.scaleStops&&(this.vvSizeScaleStopsValue=v(C(e.scale,i.scaleStops.stops))),i.unitValue){const n=ct(e.spatialReference)/_t[i.unitValue.unit];this.vvSizeUnitValueToPixelsRatio=n/e.resolution}i.fieldStops&&(this._vvSizeFieldStops=i.fieldStops)}const r=t.color;r&&(s.vvColorEnabled=!0,this.vvColorValues.set(r.values),this.vvColors.set(r.colors));const a=t.opacity;a&&(s.vvOpacityEnabled=!0,this.vvOpacityValues.set(a.values),this.vvOpacities.set(a.opacities));const o=t.rotation;o&&(s.vvRotationEnabled=!0,s.vvRotationType=o.type)}_updateDotDensityInfo(t){const e=t.attributes;this.ddDotValue=t.dotValue,this.ddDotScale=t.referenceScale,this.ddDotSize=t.dotSize,this.ddDotBlending=t.dotBlendingEnabled,this.ddSeed=t.seed;for(let s=0;s<gt;s++){const i=s>=e.length?new pt([0,0,0,0]):e[s].color;Y(this.ddColors,i,4*s)}for(let s=0;s<8;s++)this.ddActiveDots[s]=s<t.attributes.length?1:0;Y(this.ddBackgroundColor,t.backgroundColor)}}class Ut extends yt{constructor(t){super(t),this._rendererInfo=new Ot,this._materialItemsRequestQueue=new Et,this.attributeView=new Mt(()=>this.onAttributeStoreUpdate())}destroy(){this.removeAllChildren(),this.children.forEach(t=>t.destroy()),this.attributeView.destroy(),this._materialItemsRequestQueue.clear()}setRendererInfo(t,e,s){this._rendererInfo.setInfo(t,e,s),this.requestRender()}async getMaterialItems(t,e){if(!t||t.length===0)return null;const s=j();return this._materialItemsRequestQueue.push({items:t,abortOptions:e,resolver:s}),this.requestRender(),s.promise}doRender(t){if(t.context.capabilities.enable("textureFloat"),t.context.capabilities.enable("vao"),this._materialItemsRequestQueue.length>0){let e=this._materialItemsRequestQueue.pop();for(;e;)this._processMaterialItemRequest(t,e),e=this._materialItemsRequestQueue.pop()}super.doRender(t)}renderChildren(t){for(const e of this.children)e.commit(t);this._rendererInfo.update(t.state),super.renderChildren(t)}createRenderParams(t){const e=super.createRenderParams(t);return e.rendererInfo=this._rendererInfo,e.attributeView=this.attributeView,e}onAttributeStoreUpdate(){}_processMaterialItemRequest(t,{items:e,abortOptions:s,resolver:i}){const{painter:r,pixelRatio:a}=t,o=e.map(n=>r.textureManager.rasterizeItem(n.symbol,a,n.glyphIds,s));Promise.all(o).then(n=>{if(!this.stage)return void i.reject();const d=n.map((l,c)=>({id:e[c].id,mosaicItem:l}));i.resolve(d)},i.reject)}}export{b as c,f as i,Ut as o};
