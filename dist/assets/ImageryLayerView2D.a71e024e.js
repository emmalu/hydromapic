import{s as $,Z as s,_ as n,a0 as f,X as q,j as D,cx as b,r as x,cT as z,cn as T,t as k,d1 as A,g as U,cr as g,cu as _,C,cE as M,e as P,cJ as O,a8 as R,d2 as j,d3 as E,cc as V}from"./index.ab15bc04.js";import{_ as N,d as J}from"./RasterVFDisplayObject.0bd0380c.js";import{f as L,u as G}from"./LayerView.00833560.js";import{r as H}from"./BaseGraphicContainer.85a2dee8.js";import{n as W}from"./HighlightGraphicContainer.28ca9904.js";import{d as X}from"./pixelUtils.749c08fa.js";import{t as Z}from"./BitmapContainer.c33a1913.js";import{s as K}from"./Container.eaeadb22.js";import{i as Q}from"./Bitmap.d09e4001.js";import{S as Y}from"./ExportStrategy.209ef5d3.js";import{B as ee}from"./rasterProjectionHelper.c212e021.js";import{g as te,d as ie}from"./dataUtils.4aa41020.js";import{b as re,d as se}from"./WGLContainer.7a493591.js";import{I as S}from"./Utils.74f9282d.js";import{d as ae}from"./popupUtils.9c4a8a05.js";import{i as ne}from"./RefreshableLayerView.82b80800.js";import"./VertexArrayObject.cc747ff8.js";import"./Texture.b30343f5.js";import"./enums.457e23f9.js";import"./VertexElementDescriptor.0406f2d4.js";import"./CIMSymbolHelper.63cee507.js";import"./BidiEngine.b9926823.js";import"./enums.84480fc7.js";import"./MaterialKey.9467dbe0.js";import"./GeometryUtils.e53da643.js";import"./projectionSupport.7571f701.js";import"./json.da51edc4.js";import"./FeatureContainer.f52842b8.js";import"./TileContainer.ef410674.js";import"./visualVariablesUtils.3b95df02.js";import"./visualVariablesUtils.a0d78ec3.js";import"./Matcher.8ed3fb39.js";import"./tileUtils.3e5b6016.js";import"./TileClipper.3d33065b.js";import"./Geometry.e891c191.js";import"./GeometryUtils.5ea26345.js";import"./ExpandedCIM.a556261b.js";import"./quantizationUtils.8032b3a5.js";import"./earcut.91e104de.js";import"./devEnvironmentUtils.f51567b1.js";import"./schemaUtils.322ed0ee.js";import"./createSymbolSchema.1a852330.js";import"./MD5.67d7a872.js";import"./util.672d1599.js";import"./ComputedAttributeStorage.7e9351cc.js";import"./vec3f32.8179e08f.js";import"./ProgramTemplate.0c38b6c3.js";import"./StyleDefinition.809d5a5e.js";import"./config.bd364997.js";const oe=$.getLogger("esri.views.2d.layers.imagery.ImageryView2D");let h=class extends q{constructor(){super(...arguments),this.attached=!1,this.container=new K,this.updateRequested=!1,this.type="imagery",this._bitmapView=new Z}destroy(){this.attached&&(this.detach(),this.attached=!1),this.updateRequested=!1}get updating(){return!this.attached||this.isUpdating()}update(e){this.strategy.update(e).catch(t=>{D(t)||oe.error(t)})}hitTest(e){return new b({attributes:{},geometry:e.clone(),layer:this.layer})}attach(){this.container.addChild(this._bitmapView);const e=this.layer.version>=10,t=this.layer.version>=10.1?this.layer.imageMaxHeight:2048,i=this.layer.version>=10.1?this.layer.imageMaxWidth:2048;this.strategy=new Y({container:this._bitmapView,imageNormalizationSupported:e,imageMaxHeight:t,imageMaxWidth:i,fetchSource:this._fetchImage.bind(this),requestUpdate:()=>this.requestUpdate()})}detach(){this.strategy.destroy(),this._bitmapView.removeAllChildren(),this.container.removeAllChildren(),this.updateRequested=!1}redraw(){this.strategy.updateExports(e=>{e.source instanceof HTMLImageElement?e.requestRender():this.layer.applyRenderer({pixelBlock:e.source.pixelBlock}).then(t=>{const i=e.source;i.pixelBlock=t.pixelBlock,i.filter=r=>this.layer.applyFilter(r),this.container.requestRender()})})}requestUpdate(){this.updateRequested||(this.updateRequested=!0,this.view.requestUpdate())}isUpdating(){return this.strategy.updating||this.updateRequested}getPixelData(){if(this.updating)return null;const e=this.strategy.bitmaps;if(e.length===1&&e[0].source)return{extent:e[0].source.extent,pixelBlock:e[0].source.originalPixelBlock};if(e.length>1){const t=this.view.extent,i=e.map(a=>a.source).filter(a=>a.extent&&a.extent.intersects(t)).map(a=>({extent:a.extent,pixelBlock:a.originalPixelBlock})),r=X(i,t);return x(r)?{extent:r.extent,pixelBlock:r.pixelBlock}:null}return null}_fetchImage(e,t,i,r){return(r=r||{}).timeExtent=this.timeExtent,r.requestAsImageElement=!0,this.layer.fetchImage(e,t,i,r).then(a=>a.imageElement?a.imageElement:this.layer.applyRenderer(a.pixelData,{signal:r.signal}).then(o=>{const l=new Q(o.pixelBlock,o.extent.clone(),a.pixelData.pixelBlock);return l.filter=m=>this.layer.applyFilter(m),l}))}};s([n()],h.prototype,"attached",void 0),s([n()],h.prototype,"container",void 0),s([n()],h.prototype,"layer",void 0),s([n()],h.prototype,"strategy",void 0),s([n()],h.prototype,"timeExtent",void 0),s([n()],h.prototype,"view",void 0),s([n()],h.prototype,"updateRequested",void 0),s([n()],h.prototype,"updating",null),s([n()],h.prototype,"type",void 0),h=s([f("esri.views.2d.layers.imagery.ImageryView2D")],h);const le=h;class he extends re{constructor(){super(...arguments),this.symbolTypes=["triangle"]}get requiresDedicatedFBO(){return!1}prepareRenderPasses(t){const i=t.registerRenderPass({name:"imagery (vf)",brushes:[se],target:()=>this.children,drawPhase:S.MAP});return[...super.prepareRenderPasses(t),i]}doRender(t){this.visible&&t.drawPhase===S.MAP&&this.symbolTypes.forEach(i=>{t.renderPass=i,super.doRender(t)})}}const pe=$.getLogger("esri.views.2d.layers.imagery.VectorFieldView2D");let y=class extends q{constructor(e){super(e),this.update=z((t,i)=>this._update(t,i).catch(r=>{D(r)||pe.error(r)}))}get updating(){return!!this._loading}redraw(e){if(!this.container.children.length)return;const t=this.container.children[0];t.symbolizerParameters=e,t.invalidateVAO(),this.container.symbolTypes=e.style==="wind_speed"?["scalar","triangle"]:e.style==="simple_scalar"?["scalar"]:["triangle"],this.container.requestRender()}async _update(e,t,i){if(!e.stationary)return;const{extent:r,spatialReference:a}=e.state,o=new T({xmin:r.xmin,ymin:r.ymin,xmax:r.xmax,ymax:r.ymax,spatialReference:a}),[l,m]=e.state.size;this._loading=this.fetchPixels(o,l,m,i);const d=await this._loading;this._addToDisplay(d,t,e.state),this._loading=null}_addToDisplay(e,t,i){if(k(e.pixelBlock))return this.container.children.forEach(l=>l.destroy()),void this.container.removeAllChildren();const{extent:r,pixelBlock:a}=e,o=new N(a);o.offset=[0,0],o.symbolizerParameters=t,o.rawPixelData=e,o.invalidateVAO(),o.x=r.xmin,o.y=r.ymax,o.pixelRatio=i.pixelRatio,o.rotation=i.rotation,o.resolution=i.resolution,o.width=a.width*t.symbolTileSize,o.height=a.height*t.symbolTileSize,this.container.children.forEach(l=>l.destroy()),this.container.removeAllChildren(),this.container.symbolTypes=t.style==="wind_speed"?["scalar","triangle"]:t.style==="simple_scalar"?["scalar"]:["triangle"],this.container.addChild(o)}};s([n()],y.prototype,"fetchPixels",void 0),s([n()],y.prototype,"container",void 0),s([n()],y.prototype,"_loading",void 0),s([n()],y.prototype,"updating",null),y=s([f("esri.views.2d.layers.imagery.ImageryVFStrategy")],y);const de=y;let p=class extends A{constructor(){super(...arguments),this.attached=!1,this.container=new he,this.type="imageryVF",this._dataParameters={exportParametersVersion:0,bbox:"",symbolTileSize:0,time:""},this._fetchpixels=async(e,t,i,r)=>{const a=await this._projectFullExtentPromise,{symbolTileSize:o}=this.layer.renderer,{extent:l,width:m,height:d}=te(e,t,i,o,a);if(x(a)&&!a.intersects(e))return{extent:l,pixelBlock:null};const c={bbox:`${l.xmin}, ${l.ymin}, ${l.xmax}, ${l.ymax}`,exportParametersVersion:this.layer.exportImageServiceParameters.version,symbolTileSize:o,time:JSON.stringify(this.timeExtent||"")};if(this._canReuseVectorFieldData(c)){const u=this.getPixelData();if(x(u)&&`${u.extent.xmin}, ${u.extent.ymin}, ${u.extent.xmax}, ${u.extent.ymax}`===c.bbox)return u}const{pixelData:v}=await this.layer.fetchImage(l,m,d,{timeExtent:this.timeExtent,requestAsImageElement:!1,signal:r});return this._dataParameters=c,k(v.pixelBlock)?{extent:l,pixelBlock:null}:{extent:l,pixelBlock:this.layer.rasterInfo.dataType==="vector-uv"?U(ie(v.pixelBlock,"vector-uv")):v.pixelBlock}}}get updating(){return!this.attached||this._strategy.updating}attach(){this._projectFullExtentPromise=this._getProjectedFullExtent(this.view.spatialReference),this._strategy=new de({container:this.container,fetchPixels:this._fetchpixels}),this.handles.add(g(()=>this.layer.renderer,e=>this._updateSymbolizerParams(e),_),"vector-field-view-update")}detach(){this._strategy.destroy(),this.container.children.forEach(e=>e.destroy()),this.container.removeAllChildren(),this.handles.remove("vector-field-view-update"),this._strategy=this.container=this._projectFullExtentPromise=null}getPixelData(){if(this.updating||!this.container.children.length)return null;const{extent:e,pixelBlock:t}=this.container.children[0].rawPixelData;return{extent:e,pixelBlock:t}}hitTest(e){return new b({attributes:{},geometry:e.clone(),layer:this.layer})}update(e){this._strategy.update(e,this._symbolizerParams)}redraw(){this._updateSymbolizerParams(this.layer.renderer),this._strategy.redraw(this._symbolizerParams)}_canReuseVectorFieldData(e){const t=this._dataParameters.exportParametersVersion===e.exportParametersVersion,i=this._dataParameters.time===e.time,r=this._dataParameters.symbolTileSize===e.symbolTileSize,a=this._dataParameters.bbox===e.bbox;return t&&i&&r&&a}async _getProjectedFullExtent(e){try{return await ee(this.layer.fullExtent,e)}catch{try{const i=(await C(this.layer.url,{query:{option:"footprints",outSR:e.wkid||JSON.stringify(e.toJSON()),f:"json"}})).data.featureCollection.layers[0].layerDefinition.extent;return i?T.fromJSON(i):null}catch{return null}}}_updateSymbolizerParams(e){e.type==="vector-field"&&(this._symbolizerParams=this.layer.symbolizer.generateWebGLParameters({pixelBlock:null}))}};s([n()],p.prototype,"attached",void 0),s([n()],p.prototype,"container",void 0),s([n()],p.prototype,"layer",void 0),s([n()],p.prototype,"timeExtent",void 0),s([n()],p.prototype,"type",void 0),s([n()],p.prototype,"view",void 0),s([n()],p.prototype,"updating",null),p=s([f("esri.views.2d.layers.imagery.VectorFieldView2D")],p);const ce=p,ue=e=>{let t=class extends e{constructor(){super(...arguments),this.view=null}async fetchPopupFeatures(i,r){const{layer:a}=this;if(!i)throw new P("imagerylayerview:fetchPopupFeatures","Nothing to fetch without area",{layer:a});const{popupEnabled:o}=a,l=ae(a,r);if(!o||!x(l))throw new P("imagerylayerview:fetchPopupFeatures","Missing required popupTemplate or popupEnabled",{popupEnabled:o,popupTemplate:l});const m=await l.getRequiredFields(),d=new O;d.timeExtent=this.timeExtent,d.geometry=i,d.outFields=m,d.outSpatialReference=i.spatialReference;const c=this.view.resolution,v=this.view.type==="2d"?new R(c,c,this.view.spatialReference):new R(.5*c,.5*c,this.view.spatialReference),{returnTopmostRaster:u,showNoDataRecords:B}=l.layerOptions||{returnTopmostRaster:!0,showNoDataRecords:!1},F={returnDomainValues:!0,returnTopmostRaster:u,pixelSize:v,showNoDataRecords:B,signal:x(r)?r.signal:null};return a.queryVisibleRasters(d,F).then(I=>I)}canResume(){var i;return!!super.canResume()&&((i=this.timeExtent)==null||!i.isEmpty)}};return s([n()],t.prototype,"layer",void 0),s([n()],t.prototype,"suspended",void 0),s([n(M)],t.prototype,"timeExtent",void 0),s([n()],t.prototype,"view",void 0),t=s([f("esri.views.layers.ImageryLayerView")],t),t};let w=class extends ue(ne(L(G))){constructor(){super(...arguments),this._exportImageVersion=-1,this._highlightGraphics=new j,this.subview=null}get pixelData(){return this.updating?null:"getPixelData"in this.subview?this.subview.getPixelData():null}get updating(){return!!(!this.subview||"updating"in this.subview&&this.subview.updating)}async hitTest(e,t){return this.subview?[this.subview.hitTest(e)]:null}update(e){var t;(t=this.subview)==null||t.update(e)}attach(){this.layer.increaseRasterJobHandlerUsage(),this._setSubView(),this.view&&(this._highlightView=new H({view:this.view,graphics:this._highlightGraphics,requestUpdateCallback:()=>this.requestUpdate(),container:new W(this.view.featuresTilingScheme)}),this.container.addChild(this._highlightView.container)),this.handles.add([g(()=>{var e;return(e=this.layer.blendMode)!=null?e:"normal"},e=>this.subview.container.blendMode=e,_),g(()=>{var e;return(e=this.layer.effect)!=null?e:null},e=>this.subview.container.effect=e,_),g(()=>this.layer.exportImageServiceParameters.version,e=>{e&&this._exportImageVersion!==e&&(this._exportImageVersion=e,this.requestUpdate())},E),g(()=>this.timeExtent,e=>{this.subview.timeExtent=e,"redraw"in this.subview?this.requestUpdate():this.subview.redrawOrRefetch()},E),this.layer.on("redraw",()=>{"redraw"in this.subview?this.subview.redraw():this.subview.redrawOrRefetch()}),g(()=>this.layer.renderer,()=>this._setSubView())],"imagerylayerview-update")}detach(){var e,t;this.layer.decreaseRasterJobHandlerUsage(),this.container.removeAllChildren(),this._detachSubview(this.subview),(e=this.subview)==null||e.destroy(),this.handles.remove("imagerylayerview-update"),this.subview=null,(t=this._highlightView)==null||t.destroy(),this._exportImageVersion=-1}moveStart(){}viewChange(){}moveEnd(){this.requestUpdate()}highlight(e,t){if(!((Array.isArray(e)?e[0]:V.isCollection(e)?e.getItemAt(0):e)instanceof b))return{remove:()=>{}};let i=[];return Array.isArray(e)||V.isCollection(e)?i=e.map(r=>r.clone()):e instanceof b&&(i=[e.clone()]),this._highlightGraphics.addMany(i),{remove:()=>{this._highlightGraphics.removeMany(i)}}}async doRefresh(){this.requestUpdate()}isUpdating(){return!this.subview||this.subview.updating}_setSubView(){var e;if(!this.view)return;const t=(e=this.layer.renderer)==null?void 0:e.type;let i="imagery";if(t==="vector-field"&&this.layer.format==="lerc"?i="imageryVF":t==="flow"&&(i="flow"),this.subview){var r;if(this.subview.type===i)return this._attachSubview(this.subview),void(this.subview.type==="flow"&&this.subview.redrawOrRefetch());this._detachSubview(this.subview),(r=this.subview)==null||r.destroy()}this.subview=i==="imagery"?new le({layer:this.layer,view:this.view,timeExtent:this.timeExtent}):i==="imageryVF"?new ce({layer:this.layer,view:this.view,timeExtent:this.timeExtent}):new J({layer:this.layer,layerView:this}),this._attachSubview(this.subview),this.requestUpdate()}_attachSubview(e){e&&!e.attached&&(e.attach(),e.attached=!0,this.container.addChildAt(e.container,0),e.container.blendMode=this.layer.blendMode,e.container.effect=this.layer.effect)}_detachSubview(e){e!=null&&e.attached&&(this.container.removeChild(e.container),e.detach(),e.attached=!1)}};s([n()],w.prototype,"pixelData",null),s([n({readOnly:!0})],w.prototype,"updating",null),s([n()],w.prototype,"subview",void 0),w=s([f("esri.views.2d.layers.ImageryLayerView2D")],w);const ht=w;export{ht as default};
