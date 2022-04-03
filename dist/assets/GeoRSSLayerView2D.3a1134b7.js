import{K as p,cU as c,cc as g,cZ as w,c_ as f,c$ as m,Z as d,a0 as u}from"./index.ab15bc04.js";import{f as V,u as b}from"./LayerView.00833560.js";import{i as S}from"./GraphicContainer.e154f00b.js";import{r as _}from"./BaseGraphicContainer.85a2dee8.js";import"./Container.eaeadb22.js";import"./Utils.74f9282d.js";import"./enums.84480fc7.js";import"./enums.457e23f9.js";import"./Texture.b30343f5.js";import"./VertexElementDescriptor.0406f2d4.js";import"./CIMSymbolHelper.63cee507.js";import"./BidiEngine.b9926823.js";import"./MaterialKey.9467dbe0.js";import"./GeometryUtils.e53da643.js";import"./projectionSupport.7571f701.js";import"./json.da51edc4.js";import"./VertexArrayObject.cc747ff8.js";import"./FeatureContainer.f52842b8.js";import"./TileContainer.ef410674.js";import"./WGLContainer.7a493591.js";import"./pixelUtils.749c08fa.js";import"./ProgramTemplate.0c38b6c3.js";import"./StyleDefinition.809d5a5e.js";import"./config.bd364997.js";import"./GeometryUtils.5ea26345.js";import"./earcut.91e104de.js";import"./visualVariablesUtils.3b95df02.js";import"./visualVariablesUtils.a0d78ec3.js";import"./Matcher.8ed3fb39.js";import"./tileUtils.3e5b6016.js";import"./TileClipper.3d33065b.js";import"./Geometry.e891c191.js";import"./ExpandedCIM.a556261b.js";import"./quantizationUtils.8032b3a5.js";import"./devEnvironmentUtils.f51567b1.js";import"./schemaUtils.322ed0ee.js";import"./createSymbolSchema.1a852330.js";import"./MD5.67d7a872.js";import"./util.672d1599.js";import"./ComputedAttributeStorage.7e9351cc.js";import"./vec3f32.8179e08f.js";let l=class extends V(b){constructor(){super(...arguments),this._graphicsViewMap={},this._popupTemplates=new Map,this.graphicsViews=[]}async hitTest(e,t){if(!this.graphicsViews.length)return null;const a=this.graphicsViews.reverse().map(i=>i.hitTest(e));return(await Promise.all(a)).flat().filter((i,r)=>(i&&(i.popupTemplate=this._popupTemplates.get(this.graphicsViews[r]),i.layer=this.layer,i.sourceLayer=this.layer),!!i))}update(e){if(this.graphicsViews)for(const t of this.graphicsViews)t.processUpdate(e)}attach(){this.handles.add([p(this.layer,"featureCollections",e=>{this._clear();for(const{popupInfo:t,featureSet:a,layerDefinition:i}of e){const r=c.fromJSON(a),h=new g(r.features),n=i.drawingInfo,y=t?w.fromJSON(t):null,o=f(n.renderer),s=new _({requestUpdateCallback:()=>this.requestUpdate(),view:this.view,graphics:h,renderer:o,container:new S(this.view.featuresTilingScheme)});this._graphicsViewMap[r.geometryType]=s,this._popupTemplates.set(s,y),r.geometryType!=="polygon"||this.layer.polygonSymbol?r.geometryType!=="polyline"||this.layer.lineSymbol?r.geometryType!=="point"||this.layer.pointSymbol||(this.layer.pointSymbol=o.symbol):this.layer.lineSymbol=o.symbol:this.layer.polygonSymbol=o.symbol,this.graphicsViews.push(s),this.container.addChild(s.container)}}),p(this.layer,"polygonSymbol",e=>{this._graphicsViewMap.polygon.renderer=new m({symbol:e})}),p(this.layer,"lineSymbol",e=>{this._graphicsViewMap.polyline.renderer=new m({symbol:e})}),p(this.layer,"pointSymbol",e=>{this._graphicsViewMap.point.renderer=new m({symbol:e})})],"georsslayerview")}detach(){this.handles.remove("georsslayerview"),this._clear()}moveStart(){}moveEnd(){}viewChange(){for(const e of this.graphicsViews)e.viewChange()}_clear(){this.container.removeAllChildren();for(const e of this.graphicsViews)e.destroy();this._graphicsViewMap={},this._popupTemplates.clear(),this.graphicsViews.length=0}};l=d([u("esri.views.2d.layers.GeoRSSLayerView2D")],l);const he=l;export{he as default};
