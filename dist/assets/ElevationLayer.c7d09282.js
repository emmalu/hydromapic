var $=Object.defineProperty,T=Object.defineProperties;var b=Object.getOwnPropertyDescriptors;var v=Object.getOwnPropertySymbols;var L=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable;var g=(r,e,t)=>e in r?$(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,d=(r,e)=>{for(var t in e||(e={}))L.call(e,t)&&g(r,t,e[t]);if(v)for(var t of v(e))x.call(e,t)&&g(r,t,e[t]);return r},y=(r,e)=>T(r,b(e));import{s as S,cA as k,dF as I,dG as D,r as p,k as m,g as E,dH as V,dI as C,dJ as j,dK as M,dL as O,e as A,aU as N,C as _,dk as P,Z as a,_ as o,dM as U,dN as H,dx as J,a0 as q,dO as F}from"./index.ab15bc04.js";import{s as z}from"./ArcGISCachedService.f9b899fb.js";import"./TilemapCache.ded4b79f.js";const G=S.getLogger("esri.core.workers.WorkerHandle");class K{constructor(e,t,s,n={}){this._mainMethod=t,this._listeners=[],this._promise=k(e,y(d({},n),{schedule:s})).then(h=>{if(this._thread===void 0){this._thread=h,this._promise=null,n.hasInitialize&&this.broadcast({},"initialize");for(const u of this._listeners)this._connectListener(u)}else h.close()}),this._promise.catch(h=>G.error(`Failed to initialize ${e} worker: ${h}`))}on(e,t){const s={removed:!1,eventName:e,callback:t,threadHandle:null};return this._listeners.push(s),this._connectListener(s),I(()=>{s.removed=!0,D(this._listeners,s),this._thread&&p(s.threadHandle)&&s.threadHandle.remove()})}destroy(){this._thread&&(this._thread.close(),this._thread=null),this._promise=null}invoke(e,t){return this.invokeMethod(this._mainMethod,e,t)}invokeMethod(e,t,s){if(this._thread){const n=this.getTransferList(t,e);return this._thread.invoke(e,t,{transferList:n,signal:s})}return this._promise?this._promise.then(()=>(m(s),this.invokeMethod(e,t,s))):Promise.reject(null)}broadcast(e,t){return this._thread?Promise.all(this._thread.broadcast(t,e)).then(()=>{}):this._promise?this._promise.then(()=>this.broadcast(e,t)):Promise.reject()}get promise(){return this._promise}_connectListener(e){this._thread&&this._thread.on(e.eventName,e.callback).then(t=>{e.removed||(e.threadHandle=t)})}}class f extends K{constructor(e=null){super("LercWorker","_decode",e,{strategy:"dedicated"}),this.schedule=e,this.ref=0}decode(e,t,s){return e&&e.byteLength!==0?this.invoke({buffer:e,options:t},s):Promise.resolve(null)}getTransferList(e){return[e.buffer]}release(){--this.ref<=0&&(c.forEach((e,t)=>{e===this&&c.delete(t)}),this.destroy())}}const c=new Map;function Z(r=null){let e=c.get(E(r));return e||(p(r)?(e=new f(t=>r.schedule(t)),c.set(r,e)):(e=new f,c.set(null,e))),++e.ref,e}const w=S.getLogger("esri.layers.ElevationLayer");let i=class extends z(V(C(j(M(F))))){constructor(...r){super(...r),this.copyright=null,this.heightModelInfo=null,this.path=null,this.opacity=1,this.operationalLayerType="ArcGISTiledElevationServiceLayer",this.sourceJSON=null,this.type="elevation",this.url=null,this.version=null,this._lercDecoder=Z()}normalizeCtorArgs(r,e){return typeof r=="string"?d({url:r},e):r}destroy(){this._lercDecoder=O(this._lercDecoder)}set minScale(r){this.constructed&&w.warn(`${this.declaredClass}.minScale support has been removed (since 4.5)`)}get minScale(){}set maxScale(r){this.constructed&&w.warn(`${this.declaredClass}.maxScale support has been removed (since 4.5)`)}get maxScale(){}readVersion(r,e){let t=e.currentVersion;return t||(t=9.3),t}load(r){const e=p(r)?r.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Image Service"],supportsData:!1,validateItem:t=>{for(let s=0;s<t.typeKeywords.length;s++)if(t.typeKeywords[s].toLowerCase()==="elevation 3d layer")return!0;throw new A("portal:invalid-layer-item-type","Invalid layer item type '${type}', expected '${expectedType}' ",{type:"Image Service",expectedType:"Image Service Elevation 3D Layer"})}},r).catch(N).then(()=>this._fetchImageService(e))),Promise.resolve(this)}fetchTile(r,e,t,s){const n=p((s=s||{signal:null}).signal)?s.signal:s.signal=new AbortController().signal,h={responseType:"array-buffer",signal:n},u={noDataValue:s.noDataValue,returnFileInfo:!0};return this.load().then(()=>this._fetchTileAvailability(r,e,t,s)).then(()=>_(this.getTileUrl(r,e,t),h)).then(l=>this._lercDecoder.decode(l.data,u,n)).then(l=>({values:l.pixelData,width:l.width,height:l.height,maxZError:l.fileInfo.maxZError,noDataValue:l.noDataValue,minValue:l.minValue,maxValue:l.maxValue}))}getTileUrl(r,e,t){const s=!this.tilemapCache&&this.supportsBlankTile,n=P(y(d({},this.parsedUrl.query),{blankTile:!s&&null}));return`${this.parsedUrl.path}/tile/${r}/${e}/${t}${n?"?"+n:""}`}async queryElevation(r,e){const{ElevationQuery:t}=await import("./ElevationQuery.32999015.js");return m(e),new t().query(this,r,e)}async createElevationSampler(r,e){const{ElevationQuery:t}=await import("./ElevationQuery.32999015.js");return m(e),new t().createSampler(this,r,e)}_fetchTileAvailability(r,e,t,s){return this.tilemapCache?this.tilemapCache.fetchAvailability(r,e,t,s):Promise.resolve("unknown")}async _fetchImageService(r){if(this.sourceJSON)return this.sourceJSON;const e={query:d({f:"json"},this.parsedUrl.query),responseType:"json",signal:r},t=await _(this.parsedUrl.path,e);t.ssl&&(this.url=this.url.replace(/^http:/i,"https:")),this.sourceJSON=t.data,this.read(t.data,{origin:"service",url:this.parsedUrl})}get hasOverriddenFetchTile(){return!this.fetchTile.__isDefault__}};a([o({json:{read:{source:"copyrightText"}}})],i.prototype,"copyright",void 0),a([o({readOnly:!0,type:U})],i.prototype,"heightModelInfo",void 0),a([o({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],i.prototype,"path",void 0),a([o({type:["show","hide"]})],i.prototype,"listMode",void 0),a([o({json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}}})],i.prototype,"minScale",null),a([o({json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}}})],i.prototype,"maxScale",null),a([o({json:{read:!1,write:!1,origins:{"web-document":{read:!1,write:!1}}}})],i.prototype,"opacity",void 0),a([o({type:["ArcGISTiledElevationServiceLayer"]})],i.prototype,"operationalLayerType",void 0),a([o()],i.prototype,"sourceJSON",void 0),a([o({json:{read:!1},value:"elevation",readOnly:!0})],i.prototype,"type",void 0),a([o(H)],i.prototype,"url",void 0),a([o()],i.prototype,"version",void 0),a([J("version",["currentVersion"])],i.prototype,"readVersion",null),i=a([q("esri.layers.ElevationLayer")],i),i.prototype.fetchTile.__isDefault__=!0;const X=i;export{X as default};