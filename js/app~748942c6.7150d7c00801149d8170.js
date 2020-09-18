!function(e){function t(t){for(var r,i,l=t[0],s=t[1],c=t[2],u=0,p=[];u<l.length;u++)i=l[u],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&p.push(a[i][0]),a[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(d&&d(t);p.length;)p.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,l=1;l<n.length;l++){var s=n[l];0!==a[s]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={0:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var l=window.webpackJsonp=window.webpackJsonp||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var d=s;o.push([161,1,2,3,4]),n()}({138:function(e,t,n){var r=n(55),a=n(139);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},139:function(e,t,n){(t=n(56)(!1)).push([e.i,'body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}code{font-family:source-code-pro,Menlo,Monaco,Consolas,"Courier New",monospace}',""]),e.exports=t},140:function(e,t,n){var r=n(55),a=n(141);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);e.exports=a.locals||{}},141:function(e,t,n){(t=n(56)(!1)).push([e.i,".App{text-align:center}.App-logo{height:40vmin;pointer-events:none}@media(prefers-reduced-motion: no-preference){.App-logo{animation:App-logo-spin infinite 20s linear}}.App-header{background-color:#282c34;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:calc(10px + 2vmin);color:#fff}.App-link{color:#61dafb}.Viewer-div{overflow-x:scroll !important}@keyframes App-logo-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",""]),e.exports=t},147:function(e,t){},149:function(e,t){},161:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n.n(r),o=n(73),i=n.n(o),l=(n(138),n(140),n(12));function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class c extends r.Component{constructor(e){super(e),s(this,"createD3Data",e=>{this.state.data=this.recurseD3Data(e)}),s(this,"recurseD3Data",(function e(t,n=""){let r={name:"",children:null,value:0,color:n,score:" "};void 0!==t.attributes&&null!==t.attributes&&(r.name=t.attributes.TEXT);let a="";if(null!=t.attributes.SCORE&&(a="\n"+t.attributes.SCORE),0===t.elements.length){let e=parseInt(t.attributes.CREATED);r={name:t.attributes.TEXT,value:e,color:n,score:a}}else{console.log(t.attributes),null!=t.elements[0].attributes.COLOR&&(n=t.elements[0].attributes.COLOR);let o=[];for(let r=0;r<t.elements.length;r++)"node"===t.elements[r].name&&o.push(e(t.elements[r],n));r={name:t.attributes.TEXT,children:o,color:n,score:a}}return r})),s(this,"constructTree",()=>{const e=10,t=10,n=40,r=window.innerWidth,a=r/20,o=l.c().x(e=>e.y).y(e=>e.x),i=l.e().nodeSize([30,a]).separation((function(e,t){function n(e){if(null==e.children)return 0;let t=e.children.length;for(let r=0;r<e.children.length;r++)t+=n(e.children[r]);return t}let r=0;if(null!=e.children&&(r=n(e)),null!=t.children){let e=n(t);e>r&&(r=e)}return e.parent==t.parent?1+r/1.5:1})),s=l.b(this.state.data);s.x0=a/2,s.y0=0,s.descendants().forEach((e,t)=>{e.id=t,e._children=e.children,e.depth&&(e.children=null)});const c=l.d("svg").attr("viewBox",[-n,-e,r,30]).style("font","10px sans-serif").style("user-select","none"),d=c.append("g").attr("fill","none").attr("stroke","#555").attr("stroke-opacity",.4).attr("stroke-width",1.5),u=c.append("g").attr("cursor","pointer").attr("pointer-events","all");return function a(p){const f=l.a&&l.a.altKey?2500:250,h=s.descendants().reverse(),m=s.links();i(s);let y=s,g=s;s.eachBefore(e=>{e.x<y.x&&(y=e),e.x>g.x&&(g=e)});const x=g.x-y.x+e+t,v=c.transition().duration(f).attr("viewBox",[-n,y.x-e,r,x]).tween("resize",window.ResizeObserver?null:()=>()=>c.dispatch("toggle")),b=u.selectAll("g").data(h,e=>e.id),w=b.enter().append("g").attr("transform",e=>`translate(${p.y0},${p.x0})`).attr("fill-opacity",0).attr("stroke-opacity",0);w.append("circle").attr("r",2.5).attr("fill",e=>e._children?"#555":"#999").attr("stroke-width",10).style("fill",e=>e.data.color).on("click",e=>{e.children=e.children?null:e._children,a(e)}),w.append("text").attr("dy","0.31em").attr("x",e=>e._children?-6:6).attr("text-anchor",e=>e._children?"end":"start").text(e=>e.data.name).style("fill",e=>e.data.color).on("click",e=>{e.data.name.includes("http")&&window.open(e.data.name,"_blank"),a(e)}).clone(!0).lower().attr("stroke-linejoin","round").attr("stroke-width",3).attr("stroke","white"),w.append("text").style("font","5px times").attr("dy","0.31em").attr("x",e=>e._children?-10:10).attr("y",10).attr("text-anchor",e=>e._children?"end":"start").text(e=>e.data.score).style("fill",e=>e.data.color).on("click",e=>{e.data.name.includes("http")&&window.open(e.data.name,"_blank"),a(e)}).clone(!0).lower().attr("stroke-linejoin","round").attr("stroke-width",3).attr("stroke","white"),b.merge(w).transition(v).attr("transform",e=>`translate(${e.y},${e.x})`).attr("fill-opacity",1).attr("stroke-opacity",1),b.exit().transition(v).remove().attr("transform",e=>`translate(${p.y},${p.x})`).attr("fill-opacity",0).attr("stroke-opacity",0);const k=d.selectAll("path").data(m,e=>e.target.id),O=k.enter().append("path").attr("d",e=>{const t={x:p.x0,y:p.y0};return o({source:t,target:t})});k.merge(O).transition(v).attr("d",o),k.exit().transition(v).remove().attr("d",e=>{const t={x:p.x,y:p.y};return o({source:t,target:t})}),s.eachBefore(e=>{e.x0=e.x,e.y0=e.y})}(s),c.node()}),s(this,"render",()=>a.a.createElement("div",{className:"Viewer-div"},a.a.createElement("svg",{className:"Viewer-svg",style:{height:window.innerHeight-20},id:"svg"}))),this.state={textFile:e.textFile,data:null,tree:null}}componentDidMount(){const e=n(142).xml2js(this.state.textFile,{ignoreComment:!0,alwaysChildren:!0});this.createD3Data(e.elements[0].elements[0]),this.state.tree=this.constructTree()}}var d=c;function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class p extends r.Component{constructor(e){super(e),u(this,"showFile",async e=>{e.preventDefault();const t=new FileReader;t.onload=async e=>{const t=e.target.result;this.setState({isUploaded:!0,textFile:t})},t.readAsText(e.target.files[0])}),u(this,"render",()=>a.a.createElement("div",null,this.state.isUploaded?a.a.createElement(d,{textFile:this.state.textFile}):a.a.createElement("div",null,a.a.createElement("input",{type:"file",onChange:e=>this.showFile(e)})))),this.state={isUploaded:!1,textFile:""}}}var f=p;i.a.render(a.a.createElement(f,null),document.getElementById("root"))}});
//# sourceMappingURL=app~748942c6.7150d7c00801149d8170.js.map