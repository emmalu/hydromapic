var ee=Object.defineProperty,te=Object.defineProperties;var ie=Object.getOwnPropertyDescriptors;var F=Object.getOwnPropertySymbols;var se=Object.prototype.hasOwnProperty,re=Object.prototype.propertyIsEnumerable;var E=(e,t,i)=>t in e?ee(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,G=(e,t)=>{for(var i in t||(t={}))se.call(t,i)&&E(e,i,t[i]);if(F)for(var i of F(t))re.call(t,i)&&E(e,i,t[i]);return e},B=(e,t)=>te(e,ie(t));import{L as V,an as H,df as ae,s as J,Z as n,_ as u,a0 as T,d1 as le,cT as oe,cq as $,cn as ne,aQ as he,co as ue,cp as ce,r as y,t as de,g as k,a8 as pe,cY as ye,j as C,c9 as q,b$ as me,a_ as fe,cr as x,cE as ge,e as W,cx as Y,dg as be,cu as O,cV as we}from"./index.ab15bc04.js";import{_ as _e,d as ve}from"./RasterVFDisplayObject.0bd0380c.js";import{f as Pe,u as Te}from"./LayerView.00833560.js";import{e as Ie,w as Re,d as Se}from"./WGLContainer.7a493591.js";import{r as X,o as Z}from"./TileContainer.ef410674.js";import{I as z}from"./Utils.74f9282d.js";import{u as xe,l as Ve}from"./pixelUtils.749c08fa.js";import{g as M,u as A,s as Ce,i as ze}from"./RawBlockCache.0d2294ff.js";import{L as Ue,$ as ke,k as j,B as Le}from"./rasterProjectionHelper.c212e021.js";import{r as K}from"./util.672d1599.js";import{j as De}from"./dataUtils.4aa41020.js";import{d as Fe}from"./popupUtils.9c4a8a05.js";import{i as Ee}from"./RefreshableLayerView.82b80800.js";import"./Container.eaeadb22.js";import"./VertexArrayObject.cc747ff8.js";import"./Texture.b30343f5.js";import"./enums.457e23f9.js";import"./VertexElementDescriptor.0406f2d4.js";import"./enums.84480fc7.js";import"./ProgramTemplate.0c38b6c3.js";import"./StyleDefinition.809d5a5e.js";import"./config.bd364997.js";import"./GeometryUtils.5ea26345.js";import"./MaterialKey.9467dbe0.js";import"./earcut.91e104de.js";class Ge extends X{constructor(t,i,s,r,a,l=null){super(t,i,s,r,a),this.bitmap=new Ie(l,null,null),this.bitmap.coordScale=[r,a],this.bitmap.once("isReady",()=>this.ready())}destroy(){super.destroy(),this.bitmap.destroy(),this.bitmap=null,this.stage=null}set stencilRef(t){this.bitmap.stencilRef=t}get stencilRef(){return this.bitmap.stencilRef}setTransform(t,i){super.setTransform(t,i),this.bitmap.transforms.dvs=this.transforms.dvs}_createTransforms(){return{dvs:V(),tileMat3:V()}}onAttach(){this.bitmap.stage=this.stage}onDetach(){this.bitmap.stage=null}}class Be extends Z{constructor(){super(...arguments),this.isCustomTilingScheme=!1}createTile(t){const i=this._getTileBounds(t),[s,r]=this._tileInfoView.tileInfo.size;return new Ge(t,i[0],i[3],s,r)}prepareRenderPasses(t){const i=t.registerRenderPass({name:"imagery (tile)",brushes:[Re.raster],target:()=>this.children.map(s=>s.bitmap),drawPhase:z.MAP});return[...super.prepareRenderPasses(t),i]}doRender(t){this.visible&&t.drawPhase===z.MAP&&super.doRender(t)}_getTileBounds(t){const i=this._tileInfoView.getTileBounds(H(),t);if(this.isCustomTilingScheme&&t.world){const{tileInfo:s}=this._tileInfoView,r=ae(s.spatialReference);if(r){const{resolution:a}=s.lodAt(t.level),l=r/a%s.size[0],o=l?(s.size[0]-l)*a:0;i[0]-=o*t.world,i[2]-=o*t.world}}return i}}const $e=[0,0],Q=J.getLogger("esri.views.2d.layers.ImageryTileLayerView2D");let d=class extends le{constructor(){super(...arguments),this._emptyTilePixelBlock=null,this._tileStrategy=null,this._tileInfoView=null,this._fetchQueue=null,this._blockCacheRegistryUrl=null,this._blockCacheRegistryId=null,this._srcResolutions=null,this.previousLOD=null,this._needBlockCacheUpdate=!1,this._globalSymbolizerParams=null,this._symbolizerParams=null,this._abortController=null,this._isCustomTilingScheme=!1,this._globalUpdateRequested=!1,this.attached=!1,this.container=null,this.layer=null,this.timeExtent=null,this.redrawOrRefetch=oe((e,t)=>!this.previousLOD||this.layerView.suspended?Promise.resolve():e?this.doRefresh():this._redrawImage(t))}get useWebGLForProcessing(){var e;return(e=this._get("useWebGLForProcessing"))==null||e}set useWebGLForProcessing(e){this._set("useWebGLForProcessing",e)}get useProgressiveUpdate(){return this._get("useProgressiveUpdate")==null||this._get("useProgressiveUpdate")}set useProgressiveUpdate(e){if(this._tileStrategy&&this.useProgressiveUpdate!==e){this._tileStrategy.destroy(),this.container.removeAllChildren();const t=this._getCacheSize(e);this._tileStrategy=new $({cachePolicy:"purge",acquireTile:i=>this.acquireTile(i),releaseTile:i=>this.releaseTile(i),cacheSize:t,tileInfoView:this._tileInfoView}),this._set("useProgressiveUpdate",e),this.layerView.requestUpdate()}}update(e){this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume();const{extent:t,resolution:i,scale:s}=e.state,r=this._tileInfoView.getClosestInfoForScale(s);if(this.layer.raster){var a;if(!this.useProgressiveUpdate||this._needBlockCacheUpdate){const l=this._srcResolutions[r.level],o=t.toJSON?t:ne.fromJSON(t);M(this._blockCacheRegistryUrl,this._blockCacheRegistryId,o,i,l,this.layer.raster.ioConfig.sampling)}this._needBlockCacheUpdate=!1,((a=this.previousLOD)==null?void 0:a.level)!==r.level&&(this.previousLOD=r,this._symbolizerParams==null||this.layerView.hasTilingEffects||this._updateSymbolizerParams(),this._tileStrategy.updateCacheSize(0))}}moveEnd(){!this.layerView.hasTilingEffects&&this.useProgressiveUpdate||(this._abortController&&this._abortController.abort(),this._abortController=new AbortController,this._fetchQueue.length===0&&this._redrawImage(this._abortController.signal).then(()=>{this._globalUpdateRequested=!1,this.layerView.requestUpdate()}));const e=this._getCacheSize(this.useProgressiveUpdate);this._tileStrategy.updateCacheSize(e),this.layerView.requestUpdate()}get updating(){return this._fetchQueue.updating||this._globalUpdateRequested||!(!this.updatingHandles||!this.updatingHandles.updating)}attach(){he().supportsTextureFloat||(this.useWebGLForProcessing=!1),this._initializeTileInfo(),this._tileInfoView=new ue(this.layerView.tileInfo,this.layerView.fullExtent);const e=this._computeFetchConcurrency();this._fetchQueue=new ce({tileInfoView:this._tileInfoView,concurrency:e,process:(i,s)=>this._fetchTile1(i,s)});const t=this._getCacheSize(this.useProgressiveUpdate);this._tileStrategy=new $({cachePolicy:"purge",acquireTile:i=>this.acquireTile(i),releaseTile:i=>this.releaseTile(i),cacheSize:t,tileInfoView:this._tileInfoView}),this._updateBlockCacheRegistry()}detach(){this._tileStrategy.destroy(),this._fetchQueue.clear(),this.container.removeAllChildren(),this._fetchQueue=this._tileStrategy=this._tileInfoView=null,A(this._blockCacheRegistryUrl,this._blockCacheRegistryId),this._blockCacheRegistryUrl=this._blockCacheRegistryId=null}acquireTile(e){const t=this.container.createTile(e);return this._enqueueTileFetch(t),this.layerView.requestUpdate(),this._needBlockCacheUpdate=!0,this._globalUpdateRequested=this.layerView.hasTilingEffects||!this.useProgressiveUpdate,t}releaseTile(e){this._fetchQueue.abort(e.key.id),this.container.removeChild(e),e.once("detach",()=>{e.destroy(),this.layerView.requestUpdate()}),this.layerView.requestUpdate()}createEmptyTilePixelBlock(e=null){const t=e==null||e.join(",")===this._tileInfoView.tileInfo.size.join(",");if(t&&y(this._emptyTilePixelBlock))return this._emptyTilePixelBlock;e=e||this._tileInfoView.tileInfo.size;const[i,s]=e,r=new xe({width:i,height:s,pixels:[new Uint8Array(i*s)],mask:new Uint8Array(i*s),pixelType:"u8"});return t&&(this._emptyTilePixelBlock=r),r}_fetchTile1(e,t){const i=!de(t)&&t.signal,s=this.canUseWebGLForProcessing(),{layerView:r}=this,a=!r.tileInfo.isWrappable&&y(Ue(r.view.spatialReference)),l={allowPartialFill:!0,datumTransformation:r.datumTransformation,interpolation:s?"nearest":this.layer.interpolation,registryId:this._blockCacheRegistryId,requestRawData:s,signal:k(i),srcResolution:this._srcResolutions[e.level],timeExtent:r.timeExtent,tileInfo:r.tileInfo,disableWrapAround:a};return this.fetchTile(e,l)}_getCacheSize(e){return e?40:0}_initializeTileInfo(){const e=this.layerView.view.spatialReference,t=new pe({x:this.layerView.fullExtent.xmin,y:this.layerView.fullExtent.ymax,spatialReference:e}),{scales:i,srcResolutions:s,isCustomTilingScheme:r}=ke(this.layer.rasterInfo,e),a=ye.create({spatialReference:e,size:512,scales:i});(a.origin.x===0||a.origin.x>t.x)&&(a.origin=t),this._isCustomTilingScheme=r,this.layerView.set("tileInfo",a),this._srcResolutions=s!=null?s:[]}_computeFetchConcurrency(){const{blockBoundary:e}=this.layer.rasterInfo.storageInfo,t=e[e.length-1];return(t.maxCol-t.minCol+1)*(t.maxRow-t.minRow+1)>64?2:10}async _enqueueTileFetch(e,t){if(!this._fetchQueue.has(e.key.id)){try{const i=await this._fetchQueue.push(e.key),{bandIds:s}=this.layer;let r=!this.useProgressiveUpdate||this.layerView.hasTilingEffects&&!this._globalSymbolizerParams;if(this._globalUpdateRequested&&!this.layerView.moving&&this._fetchQueue.length===0){r=!1;try{await this._redrawImage(this._abortController&&this._abortController.signal)}catch(o){C(o)&&Q.error(o)}this._globalUpdateRequested=!1}!this.canUseWebGLForProcessing()&&this.type!=="rasterVF"||this.layerView.hasTilingEffects||this._symbolizerParams!=null||this._updateSymbolizerParams();const a=this._tileInfoView.getTileCoords($e,e.key),l=this._tileInfoView.getTileResolution(e.key);await this.updateTileSource(e,{source:i,symbolizerParams:this._symbolizerParams,globalSymbolizerParams:this._globalSymbolizerParams,suspended:r,bandIds:s,coords:a,resolution:l}),e.once("attach",()=>this.layerView.requestUpdate()),this.container.addChild(e)}catch(i){C(i)||Q.error(i)}this.layerView.requestUpdate()}}async _redrawImage(e){if(this.container.children.length===0)return;await this.updatingHandles.addPromise(this.layer.updateRenderer()),this.layerView.hasTilingEffects?await this._updateGlobalSymbolizerParams(e):(this._updateSymbolizerParams(),this._globalSymbolizerParams=null);const t=this.container.children.map(async i=>this.updateTileSymbolizerParameters(i,{local:this._symbolizerParams,global:this._globalSymbolizerParams}));await q(t),this.container.requestRender()}async _updateGlobalSymbolizerParams(e){const t={srcResolution:this._srcResolutions[this.previousLOD.level],registryId:this._blockCacheRegistryId,signal:e},i=await this.layer.fetchPixels(this.layerView.view.extent,this.layerView.view.width,this.layerView.view.height,t);if(!i||!i.pixelBlock)return;const s=this.layer.symbolizer.generateWebGLParameters({pixelBlock:Ve(i.pixelBlock,this.layer.bandIds),isGCS:this.layerView.view.spatialReference.isGeographic,resolution:{x:this.previousLOD.resolution,y:this.previousLOD.resolution},bandIds:this.layer.bandIds});!this.canUseWebGLForProcessing()&&s&&s.type==="stretch"&&this.layer.renderer&&this.layer.renderer.type==="raster-stretch"&&(s.factor=s.factor.map(r=>255*r),s.outMin=Math.round(255*s.outMin),s.outMax=Math.round(255*s.outMax)),this._globalSymbolizerParams=s}_updateSymbolizerParams(){this._symbolizerParams=this.layer.symbolizer.generateWebGLParameters({pixelBlock:null,isGCS:this.layerView.view.spatialReference.isGeographic,resolution:{x:this.previousLOD.resolution,y:this.previousLOD.resolution},bandIds:this.layer.bandIds})}_updateBlockCacheRegistry(e=!1){const{url:t,rasterInfo:i,raster:s}=this.layer,{multidimensionalDefinition:r}=this.layer.normalizeRasterFetchOptions({multidimensionalDefinition:this.layer.multidimensionalDefinition,timeExtent:this.layerView.timeExtent}),a=i!=null&&i.multidimensionalInfo?s.getSliceIndex(r):null,l=ze(t,a);if(l!==this._blockCacheRegistryUrl){if(this._blockCacheRegistryUrl!=null&&A(this._blockCacheRegistryUrl,this._blockCacheRegistryId),this._blockCacheRegistryId=Ce(l,this.layer.raster.rasterInfo),e){const o=this._tileInfoView.getClosestInfoForScale(this.layerView.view.scale),c=this._srcResolutions[o.level];M(l,this._blockCacheRegistryId,this.layerView.view.extent,this.layerView.view.resolution,c,this.layer.raster.ioConfig.sampling)}this._blockCacheRegistryUrl=l}}async doRefresh(){await this.updatingHandles.addPromise(this.layer.updateRenderer()),this.layerView.hasTilingEffects||this._updateSymbolizerParams(),this._updateBlockCacheRegistry(!0),this._fetchQueue.reset();const e=[];this._tileStrategy.tiles.forEach(t=>e.push(this._enqueueTileFetch(t))),await q(e)}};n([u()],d.prototype,"_fetchQueue",void 0),n([u()],d.prototype,"_globalUpdateRequested",void 0),n([u()],d.prototype,"attached",void 0),n([u()],d.prototype,"container",void 0),n([u()],d.prototype,"layer",void 0),n([u()],d.prototype,"layerView",void 0),n([u()],d.prototype,"type",void 0),n([u()],d.prototype,"useWebGLForProcessing",null),n([u()],d.prototype,"useProgressiveUpdate",null),n([u()],d.prototype,"timeExtent",void 0),n([u()],d.prototype,"updating",null),d=n([T("esri.views.2d.layers.imagery.BaseImageryTileSubView2D")],d);let w=class extends d{constructor(){super(...arguments),this.container=null,this.layer=null,this.type="raster"}attach(){super.attach(),this.container=new Be(this._tileInfoView),this.container.isCustomTilingScheme=this._isCustomTilingScheme}detach(){super.detach(),this.container.removeAllChildren(),this.container=null}canUseWebGLForProcessing(){return this.useWebGLForProcessing&&this.layer.symbolizer.canRenderInWebGL&&!(this.layer.interpolation==="majority"&&K(this.layer))}fetchTile(e,t){return this.layer.fetchTile(e.level,e.row,e.col,t)}async updateTileSource(e,t){const{bandIds:i}=this.layer,s=this._getLayerInterpolation(),r=this.canUseWebGLForProcessing(),{source:a,symbolizerParams:l,globalSymbolizerParams:o,suspended:c,coords:g,resolution:p}=t,{bitmap:h}=e;if([h.x,h.y]=g,h.resolution=p,a&&y(a)&&y(a.pixelBlock)){const m={extent:a.extent,pixelBlock:a.pixelBlock};if(h.rawPixelData=m,r)h.source=a.pixelBlock,h.isRendereredSource=!1;else{const f=await this.layer.applyRenderer(m,(o==null?void 0:o.type)==="stretch"?o:null);h.source=f,h.isRendereredSource=!0}h.symbolizerParameters=r?l:null,r?h.transformGrid||(h.transformGrid=a.transformGrid):h.transformGrid=null}else{const m=this.createEmptyTilePixelBlock();h.source=m,h.symbolizerParameters=r?l:null,h.transformGrid=null}h.bandIds=r?i:null,h.width=this._tileInfoView.tileInfo.size[0],h.height=this._tileInfoView.tileInfo.size[1],h.interpolation=s,h.suspended=c,h.invalidateTexture()}async updateTileSymbolizerParameters(e,t){const{local:i,global:s}=t,{bandIds:r}=this.layer,a=this._getLayerInterpolation(),l=this.canUseWebGLForProcessing(),{bitmap:o}=e,{rawPixelData:c}=o;!l&&y(c)?(o.source=await this.layer.applyRenderer(c,(s==null?void 0:s.type)==="stretch"?s:null),o.isRendereredSource=!0):(o.isRendereredSource&&y(c)&&(o.source=c.pixelBlock),o.isRendereredSource=!1),o.symbolizerParameters=l?s||i:null,o.bandIds=l?r:null,o.interpolation=a,o.suspended=!1}_getLayerInterpolation(){const e=this.layer.renderer.type;if(e==="raster-colormap"||e==="unique-value"||e==="class-breaks")return"nearest";const{interpolation:t}=this.layer,{renderer:i}=this.layer;return i.type==="raster-stretch"&&i.colorRamp!=null?t==="bilinear"||t==="cubic"?"bilinear":"nearest":t}};n([u()],w.prototype,"container",void 0),n([u()],w.prototype,"layer",void 0),n([u()],w.prototype,"type",void 0),w=n([T("esri.views.2d.layers.imagery.ImageryTileView2D")],w);const qe=w;class We extends X{constructor(t,i,s,r,a,l=null){super(t,i,s,r,a),this.tileData=new _e(l),this.tileData.coordScale=[r,a],this.tileData.once("isReady",()=>this.ready())}destroy(){super.destroy(),this.tileData.destroy(),this.tileData=null,this.stage=null}set stencilRef(t){this.tileData.stencilRef=t}get stencilRef(){return this.tileData.stencilRef}_createTransforms(){return{dvs:V(),tileMat3:V()}}setTransform(t,i){super.setTransform(t,i);const s=i/(t.resolution*t.pixelRatio),r=this.transforms.tileMat3,[a,l]=this.tileData.offset,o=[this.x+a*i,this.y-l*i],[c,g]=t.toScreenNoRotation([0,0],o),{symbolTileSize:p}=this.tileData.symbolizerParameters,h=Math.round((this.width-this.tileData.offset[0])/p)*p,m=Math.round((this.height-this.tileData.offset[1])/p)*p,f=h/this.rangeX*s,I=m/this.rangeY*s;me(r,f,0,0,0,I,0,c,g,1),fe(this.transforms.dvs,t.displayViewMat3,r),this.tileData.transforms.dvs=this.transforms.dvs}onAttach(){this.tileData.stage=this.stage}onDetach(){this.tileData.stage=null}}class Oe extends Z{constructor(){super(...arguments),this.isCustomTilingScheme=!1,this.symbolTypes=["triangle"]}createTile(t){const i=this._tileInfoView.getTileBounds(H(),t),[s,r]=this._tileInfoView.tileInfo.size;return new We(t,i[0],i[3],s,r)}prepareRenderPasses(t){const i=t.registerRenderPass({name:"imagery (vf tile)",brushes:[Se],target:()=>this.children.map(s=>s.tileData),drawPhase:z.MAP});return[...super.prepareRenderPasses(t),i]}doRender(t){this.visible&&t.drawPhase===z.MAP&&this.symbolTypes.forEach(i=>{t.renderPass=i,super.doRender(t)})}}let _=class extends d{constructor(){super(...arguments),this._handle=null,this.container=null,this.layer=null,this.type="rasterVF"}canUseWebGLForProcessing(){return!1}async fetchTile(e,t){t=B(G({},t),{interpolation:"nearest",requestProjectedLocalDirections:!0});const i=await this.layer.fetchTile(e.level,e.row,e.col,t);return this.layer.rasterInfo.dataType==="vector-magdir"&&i!=null&&i.pixelBlock&&(i.pixelBlock=await this.layer.convertVectorFieldData(i.pixelBlock,t)),i}updateTileSource(e,t){const i=t.symbolizerParams,{tileData:s}=e;s.key=e.key,s.width=this._tileInfoView.tileInfo.size[0],s.height=this._tileInfoView.tileInfo.size[1];const{symbolTileSize:r}=i,{source:a}=t;if(s.offset=this._getTileSymbolOffset(s.key,r),y(a)&&y(a.pixelBlock)){const l={extent:a.extent,pixelBlock:a.pixelBlock};s.rawPixelData=l,s.symbolizerParameters=i,s.source=this._sampleVectorFieldData(a.pixelBlock,i,s.offset)}else{const l=[Math.round((this._tileInfoView.tileInfo[0]-s.offset[0])/r),Math.round((this._tileInfoView.tileInfo[1]-s.offset[1])/r)],o=this.createEmptyTilePixelBlock(l);s.source=o,s.symbolizerParameters=i}return s.invalidateVAO(),Promise.resolve(null)}updateTileSymbolizerParameters(e,t){var i;const s=t.local,{symbolTileSize:r}=s,{tileData:a}=e;a.offset=this._getTileSymbolOffset(a.key,r);const l=a.symbolizerParameters.symbolTileSize;return a.symbolizerParameters=s,y((i=a.rawPixelData)==null?void 0:i.pixelBlock)&&l!==r&&(a.source=this._sampleVectorFieldData(a.rawPixelData.pixelBlock,a.symbolizerParameters,a.offset)),Promise.resolve(null)}attach(){super.attach(),this.container=new Oe(this._tileInfoView),this.container.isCustomTilingScheme=this._isCustomTilingScheme,this._updateSymbolType(this.layer.renderer),this._handle=x(()=>this.layer.renderer,e=>this._updateSymbolType(e))}detach(){super.detach(),this.container.removeAllChildren(),this._handle.remove(),this._handle=null}_getTileSymbolOffset(e,t){const i=e.col*this._tileInfoView.tileInfo.size[0]%t,s=e.row*this._tileInfoView.tileInfo.size[1]%t;return[i>t/2?t-i:-i,s>t/2?t-s:-s]}_sampleVectorFieldData(e,t,i){const{symbolTileSize:s}=t;return De(e,"vector-uv",s,i)}_updateSymbolType(e){e.type==="vector-field"&&(this.container.symbolTypes=e.style==="wind-barb"?["scalar","triangle"]:e.style==="simple-scalar"?["scalar"]:["triangle"])}};n([u()],_.prototype,"container",void 0),n([u()],_.prototype,"layer",void 0),n([u()],_.prototype,"type",void 0),_=n([T("esri.views.2d.layers.imagery.VectorFieldTileView2D")],_);const Me=_,Ae=e=>{let t=class extends e{constructor(){super(...arguments),this._rasterFieldPrefix="Raster.",this.layer=null,this.view=null,this.tileInfo=null}get fullExtent(){return this._getfullExtent()}_getfullExtent(){return this.projectFullExtent(this.view.spatialReference)}get hasTilingEffects(){return this.layer.renderer&&"dynamicRangeAdjustment"in this.layer.renderer&&this.layer.renderer.dynamicRangeAdjustment}get datumTransformation(){return j(k(this.layer.fullExtent),this.view.spatialReference,!0)}supportsSpatialReference(i){return!!this.projectFullExtent(i)}projectFullExtent(i){const s=k(this.layer.fullExtent),r=j(s,i,!1);return Le(s,i,r)}async fetchPopupFeatures(i,s){const{layer:r}=this;if(!i)return Promise.reject(new W("imageryTileLayerView:fetchPopupFeatures","Nothing to fetch without area",{layer:r}));const{popupEnabled:a}=r,l=Fe(r,s);if(!a||!y(l))throw new W("imageryTileLayerView:fetchPopupFeatures","Missing required popupTemplate or popupEnabled",{popupEnabled:a,popupTemplate:l});const o=[],{value:c,magdirValue:g}=await r.identify(i,{timeExtent:this.timeExtent});let p="";if(c&&c.length){var h,m;p=r.type==="imagery-tile"&&r.hasStandardTime()&&c[0]!=null?c.map(S=>r.getStandardTimeValue(S)).join(", "):c.join(", ");const f={ObjectId:0},I="Raster.ServicePixelValue";f[I]=this._formatAttributeValue(p,I);const U=(h=r.rasterInfo)==null||(m=h.attributeTable)==null?void 0:m.features;if(U&&U.length>0){const S=U.filter(b=>{const P=b.attributes.value||b.attributes.Value||b.attributes.VALUE;return String(P)===p});if(S.length>0){const b=S[0];if(b){for(const P in b.attributes)if(b.attributes.hasOwnProperty(P)){const D=this._rasterFieldPrefix+P;f[D]=this._formatAttributeValue(b.attributes[P],D)}}}}const L=r.rasterInfo.dataType;L!=="vector-magdir"&&L!=="vector-uv"||(f["Raster.Magnitude"]=g==null?void 0:g[0],f["Raster.Direction"]=g==null?void 0:g[1]);const R=new Y(this.fullExtent.clone(),null,f);R.layer=r,R.sourceLayer=R.layer,o.push(R)}return o}_formatAttributeValue(i,s){if(typeof i=="string"){const r=this.layer.popupTemplate&&this.layer.popupTemplate.fieldInfos,a=this._getFieldInfo(r,s),l=a&&a.format;if(l){let o,c;return i.trim().indexOf(",")>-1?(o=",",c=o+" ",this._formatDelimitedString(i,o,c,l)):i.trim().indexOf(" ")>-1?(o=c=" ",this._formatDelimitedString(i,o,c,l)):this._formatNumberFromString(i,l)}}return i}_getFieldInfo(i,s){if(!i||!i.length||!s)return;const r=s.toLowerCase();let a;return i.some(l=>!(!l.fieldName||l.fieldName.toLowerCase()!==r&&l.fieldName.toLowerCase()!==r.replace(/ /g,"_"))&&(a=l,!0)),a}_formatDelimitedString(i,s,r,a){return i&&s&&r&&a?i.trim().split(s).map(l=>this._formatNumberFromString(l,a)).join(r):i}_formatNumberFromString(i,s){if(!i||!s)return i;const r=Number(i);return isNaN(r)?i:s.format(r)}};return n([u()],t.prototype,"layer",void 0),n([u(ge)],t.prototype,"timeExtent",void 0),n([u()],t.prototype,"view",void 0),n([u()],t.prototype,"fullExtent",null),n([u()],t.prototype,"tileInfo",void 0),n([u({readOnly:!0})],t.prototype,"hasTilingEffects",null),t=n([T("esri.views.layers.ImageryTileLayerView")],t),t},N=J.getLogger("esri.views.2d.layers.ImageryTileLayerView2D");let v=class extends Ae(Ee(Pe(Te))){constructor(){super(...arguments),this._useWebGLForProcessing=!0,this._useProgressiveUpdate=!0,this.subview=null}get useWebGLForProcessing(){return this._useWebGLForProcessing}set useWebGLForProcessing(e){this._useWebGLForProcessing=e,this.subview&&"useWebGLForProcessing"in this.subview&&(this.subview.useWebGLForProcessing=e)}get useProgressiveUpdate(){return this._useWebGLForProcessing}set useProgressiveUpdate(e){this._useProgressiveUpdate=e,this.subview&&"useProgressiveUpdate"in this.subview&&(this.subview.useProgressiveUpdate=e)}update(e){this.subview.update(e),this.notifyChange("updating")}isUpdating(){return!this.subview||this.subview.updating}attach(){this.layer.increaseRasterJobHandlerUsage(),this._updateSubview(),this.handles.add([be(this.layer,["bandIds","renderer","interpolation","multidimensionalDefinition"],(e,t,i)=>{const s=i==="multidimensionalDefinition",r=i==="interpolation"&&(e==="majority"||t==="majority")&&K(this.layer),a=i==="renderer"&&t.type!==e.type;a&&this._updateSubview();const l=s||r||a;this.subview.redrawOrRefetch(l).catch(o=>{C(o)||N.error(o)}),this.notifyChange("updating")}),x(()=>{var e;return(e=this.layer.blendMode)!=null?e:"normal"},e=>{this.subview.container.blendMode=e},O),x(()=>{var e;return(e=this.layer.effect)!=null?e:null},e=>{this.subview.container.effect=e},O),x(()=>this.timeExtent,()=>{this.subview.timeExtent=this.timeExtent,this.subview.redrawOrRefetch(!0).catch(e=>{C(e)||N.error(e)})},we)],"attach")}detach(){var e;this.handles.remove("attach"),this.layer.decreaseRasterJobHandlerUsage(),this._detachSubview(this.subview),(e=this.subview)==null||e.destroy(),this.subview=null}moveStart(){this.requestUpdate()}viewChange(){this.requestUpdate()}moveEnd(){this.subview.moveEnd()}async hitTest(e,t){return[new Y({attributes:{},geometry:e.clone()})]}doRefresh(){return this.subview.doRefresh()}_updateSubview(){const e=this.layer.renderer.type==="vector-field"?"rasterVF":this.layer.renderer.type==="flow"?"flow":"raster";if(this.subview){var t;if(this.subview.type===e)return void this._attachSubview(this.subview);this._detachSubview(this.subview),(t=this.subview)==null||t.destroy(),this.subview=null}const{layer:i}=this;let s;s=e==="rasterVF"?new Me({layer:i,layerView:this}):e==="flow"?new ve({layer:i,layerView:this}):new qe({layer:i,layerView:this}),"useWebGLForProcessing"in s&&(s.useWebGLForProcessing=this._useWebGLForProcessing),"useProgressiveUpdate"in s&&(s.useProgressiveUpdate=this._useProgressiveUpdate),"previousLOD"in s&&(s.previousLOD=this.subview&&"previousLOD"in this.subview&&this.subview.previousLOD),this._attachSubview(s),this.subview=s,this.requestUpdate()}_attachSubview(e){e&&!e.attached&&(e.attach(),e.attached=!0,this.container.addChildAt(e.container,0),e.container.blendMode=this.layer.blendMode,e.container.effect=this.layer.effect)}_detachSubview(e){e!=null&&e.attached&&(this.container.removeChild(e.container),e.detach(),e.attached=!1)}};n([u()],v.prototype,"subview",void 0),n([u()],v.prototype,"useWebGLForProcessing",null),n([u()],v.prototype,"useProgressiveUpdate",null),v=n([T("esri.views.2d.layers.ImageryTileLayerView2D")],v);const gt=v;export{gt as default};
