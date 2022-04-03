import{cr as a,cV as p,r as n,g,cx as m,cc as l,Z as v,a0 as V}from"./index.ab15bc04.js";import{f as I,u as H}from"./LayerView.00833560.js";import{i as b}from"./GraphicContainer.e154f00b.js";import{r as A}from"./BaseGraphicContainer.85a2dee8.js";import"./Container.eaeadb22.js";import"./Utils.74f9282d.js";import"./enums.84480fc7.js";import"./enums.457e23f9.js";import"./Texture.b30343f5.js";import"./VertexElementDescriptor.0406f2d4.js";import"./CIMSymbolHelper.63cee507.js";import"./BidiEngine.b9926823.js";import"./MaterialKey.9467dbe0.js";import"./GeometryUtils.e53da643.js";import"./projectionSupport.7571f701.js";import"./json.da51edc4.js";import"./VertexArrayObject.cc747ff8.js";import"./FeatureContainer.f52842b8.js";import"./TileContainer.ef410674.js";import"./WGLContainer.7a493591.js";import"./pixelUtils.749c08fa.js";import"./ProgramTemplate.0c38b6c3.js";import"./StyleDefinition.809d5a5e.js";import"./config.bd364997.js";import"./GeometryUtils.5ea26345.js";import"./earcut.91e104de.js";import"./visualVariablesUtils.3b95df02.js";import"./visualVariablesUtils.a0d78ec3.js";import"./Matcher.8ed3fb39.js";import"./tileUtils.3e5b6016.js";import"./TileClipper.3d33065b.js";import"./Geometry.e891c191.js";import"./ExpandedCIM.a556261b.js";import"./quantizationUtils.8032b3a5.js";import"./devEnvironmentUtils.f51567b1.js";import"./schemaUtils.322ed0ee.js";import"./createSymbolSchema.1a852330.js";import"./MD5.67d7a872.js";import"./util.672d1599.js";import"./ComputedAttributeStorage.7e9351cc.js";import"./vec3f32.8179e08f.js";const c=["routeInfo","directionLines","directionPoints","polygonBarriers","polylineBarriers","pointBarriers","stops"],C=Object.freeze({remove(){},pause(){},resume(){}});let e=class extends I(H){constructor(){super(...arguments),this._graphicsViews=new Map,this._highlightIds=new Map}attach(){for(const i of c)this.handles.add(a(()=>n(this.layer[i])?i==="routeInfo"?[g(this.layer[i])]:g(this.layer[i]).toArray():null,t=>this._createGraphicsView(i,t),p),i)}detach(){this._destroyGraphicsViews()}highlight(i){let t;return typeof i=="number"?t=[i]:i instanceof m?t=[i.uid]:Array.isArray(i)&&i.length>0?t=typeof i[0]=="number"?i:i.map(s=>s&&s.uid):l.isCollection(i)&&(t=i.map(s=>s&&s.uid).toArray()),t=t.filter(s=>s!=null),t.length?(this._addHighlight(t),{remove:()=>this._removeHighlight(t)}):C}async hitTest(i,t){if(this.suspended||!this._graphicsViews.size)return Promise.resolve(null);const s=Array.from(this._graphicsViews.values()).reverse().map(r=>r.hitTest(i)).flat().filter(r=>!!r);for(const r of s)r.layer=this.layer,r.sourceLayer=this.layer;return s}moveStart(){}moveEnd(){}update(i){for(const t of this._graphicsViews.values())t.processUpdate(i)}viewChange(){for(const i of this._graphicsViews.values())i.viewChange()}isUpdating(){for(const i of this._graphicsViews.values())if(i.updating)return!0;return!1}_createGraphicsView(i,t){this._destroyGraphicsView(i);const s=this.view,r=()=>this.requestUpdate(),d=new l(n(t)?t.map(u=>{const{attributes:f,geometry:_,symbol:y,popupInfo:w}=u.toPortalJSON();return m.fromJSON({attributes:f,geometry:_,symbol:y,popupTemplate:w})}):[]),o=new b(s.featuresTilingScheme),h=new A({container:o,graphics:d,requestUpdateCallback:r,view:s});this._graphicsViews.set(i,h),this.container.addChildAt(o,c.indexOf(i)),this._updateHighlight(),this.handles.add([a(()=>h.updating,()=>this.notifyChange("updating"),p)],`updating-${i}`)}_destroyGraphicsView(i){if(!this._graphicsViews.has(i))return;const t=this._graphicsViews.get(i);this.container.removeChild(t.container),t.destroy(),this.handles.remove(`updating-${i}`),this._graphicsViews.delete(i)}_destroyGraphicsViews(){this.container.removeAllChildren();for(const[i,t]of this._graphicsViews.entries())this.handles.remove(i),t.destroy();this._graphicsViews.clear()}_addHighlight(i){for(const t of i)if(this._highlightIds.has(t)){const s=this._highlightIds.get(t);this._highlightIds.set(t,s+1)}else this._highlightIds.set(t,1);this._updateHighlight()}_removeHighlight(i){for(const t of i)if(this._highlightIds.has(t)){const s=this._highlightIds.get(t)-1;s===0?this._highlightIds.delete(t):this._highlightIds.set(t,s)}this._updateHighlight()}_updateHighlight(){const i=Array.from(this._highlightIds.keys());for(const t of this._graphicsViews.values())t.setHighlight(i)}};e=v([V("esri.views.2d.layers.RouteLayerView2D")],e);const di=e;export{di as default};
