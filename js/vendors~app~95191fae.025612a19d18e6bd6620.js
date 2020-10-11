/*! For license information please see vendors~app~95191fae.025612a19d18e6bd6620.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{156:function(t,e,i){(function(t){!function(e){e.parser=function(t,e){return new n(t,e)},e.SAXParser=n,e.SAXStream=o,e.createStream=function(t,e){return new o(t,e)},e.MAX_BUFFER_LENGTH=65536;var s,a=["comment","sgmlDecl","textNode","tagName","doctype","procInstName","procInstBody","entity","attribName","attribValue","cdata","script"];function n(t,i){if(!(this instanceof n))return new n(t,i);!function(t){for(var e=0,i=a.length;e<i;e++)t[a[e]]=""}(this),this.q=this.c="",this.bufferCheckPosition=e.MAX_BUFFER_LENGTH,this.opt=i||{},this.opt.lowercase=this.opt.lowercase||this.opt.lowercasetags,this.looseCase=this.opt.lowercase?"toLowerCase":"toUpperCase",this.tags=[],this.closed=this.closedRoot=this.sawRoot=!1,this.tag=this.error=null,this.strict=!!t,this.noscript=!(!t&&!this.opt.noscript),this.state=I.BEGIN,this.strictEntities=this.opt.strictEntities,this.ENTITIES=this.strictEntities?Object.create(e.XML_ENTITIES):Object.create(e.ENTITIES),this.attribList=[],this.opt.xmlns&&(this.ns=Object.create(u)),this.trackPosition=!1!==this.opt.position,this.trackPosition&&(this.position=this.line=this.column=0),b(this,"onready")}e.EVENTS=["text","processinginstruction","sgmldeclaration","doctype","comment","opentagstart","attribute","opentag","closetag","opencdata","cdata","closecdata","error","end","ready","script","opennamespace","closenamespace"],Object.create||(Object.create=function(t){function e(){}return e.prototype=t,new e}),Object.keys||(Object.keys=function(t){var e=[];for(var i in t)t.hasOwnProperty(i)&&e.push(i);return e}),n.prototype={end:function(){R(this)},write:function(t){if(this.error)throw this.error;if(this.closed)return S(this,"Cannot write after close. Assign an onready handler.");if(null===t)return R(this);"object"==typeof t&&(t=t.toString());var i=0,s="";for(;s=G(t,i++),this.c=s,s;)switch(this.trackPosition&&(this.position++,"\n"===s?(this.line++,this.column=0):this.column++),this.state){case I.BEGIN:if(this.state=I.BEGIN_WHITESPACE,"\ufeff"===s)continue;x(this,s);continue;case I.BEGIN_WHITESPACE:x(this,s);continue;case I.TEXT:if(this.sawRoot&&!this.closedRoot){for(var n=i-1;s&&"<"!==s&&"&"!==s;)(s=G(t,i++))&&this.trackPosition&&(this.position++,"\n"===s?(this.line++,this.column=0):this.column++);this.textNode+=t.substring(n,i-1)}"<"!==s||this.sawRoot&&this.closedRoot&&!this.strict?(p(s)||this.sawRoot&&!this.closedRoot||v(this,"Text data outside of root node."),"&"===s?this.state=I.TEXT_ENTITY:this.textNode+=s):(this.state=I.OPEN_WAKA,this.startTagPosition=this.position);continue;case I.SCRIPT:"<"===s?this.state=I.SCRIPT_ENDING:this.script+=s;continue;case I.SCRIPT_ENDING:"/"===s?this.state=I.CLOSE_TAG:(this.script+="<"+s,this.state=I.SCRIPT);continue;case I.OPEN_WAKA:if("!"===s)this.state=I.SGML_DECL,this.sgmlDecl="";else if(p(s));else if(f(h,s))this.state=I.OPEN_TAG,this.tagName=s;else if("/"===s)this.state=I.CLOSE_TAG,this.tagName="";else if("?"===s)this.state=I.PROC_INST,this.procInstName=this.procInstBody="";else{if(v(this,"Unencoded <"),this.startTagPosition+1<this.position){var r=this.position-this.startTagPosition;s=new Array(r).join(" ")+s}this.textNode+="<"+s,this.state=I.TEXT}continue;case I.SGML_DECL:"[CDATA["===(this.sgmlDecl+s).toUpperCase()?(C(this,"onopencdata"),this.state=I.CDATA,this.sgmlDecl="",this.cdata=""):this.sgmlDecl+s==="--"?(this.state=I.COMMENT,this.comment="",this.sgmlDecl=""):"DOCTYPE"===(this.sgmlDecl+s).toUpperCase()?(this.state=I.DOCTYPE,(this.doctype||this.sawRoot)&&v(this,"Inappropriately located doctype declaration"),this.doctype="",this.sgmlDecl=""):">"===s?(C(this,"onsgmldeclaration",this.sgmlDecl),this.sgmlDecl="",this.state=I.TEXT):m(s)?(this.state=I.SGML_DECL_QUOTED,this.sgmlDecl+=s):this.sgmlDecl+=s;continue;case I.SGML_DECL_QUOTED:s===this.q&&(this.state=I.SGML_DECL,this.q=""),this.sgmlDecl+=s;continue;case I.DOCTYPE:">"===s?(this.state=I.TEXT,C(this,"ondoctype",this.doctype),this.doctype=!0):(this.doctype+=s,"["===s?this.state=I.DOCTYPE_DTD:m(s)&&(this.state=I.DOCTYPE_QUOTED,this.q=s));continue;case I.DOCTYPE_QUOTED:this.doctype+=s,s===this.q&&(this.q="",this.state=I.DOCTYPE);continue;case I.DOCTYPE_DTD:this.doctype+=s,"]"===s?this.state=I.DOCTYPE:m(s)&&(this.state=I.DOCTYPE_DTD_QUOTED,this.q=s);continue;case I.DOCTYPE_DTD_QUOTED:this.doctype+=s,s===this.q&&(this.state=I.DOCTYPE_DTD,this.q="");continue;case I.COMMENT:"-"===s?this.state=I.COMMENT_ENDING:this.comment+=s;continue;case I.COMMENT_ENDING:"-"===s?(this.state=I.COMMENT_ENDED,this.comment=F(this.opt,this.comment),this.comment&&C(this,"oncomment",this.comment),this.comment=""):(this.comment+="-"+s,this.state=I.COMMENT);continue;case I.COMMENT_ENDED:">"!==s?(v(this,"Malformed comment"),this.comment+="--"+s,this.state=I.COMMENT):this.state=I.TEXT;continue;case I.CDATA:"]"===s?this.state=I.CDATA_ENDING:this.cdata+=s;continue;case I.CDATA_ENDING:"]"===s?this.state=I.CDATA_ENDING_2:(this.cdata+="]"+s,this.state=I.CDATA);continue;case I.CDATA_ENDING_2:">"===s?(this.cdata&&C(this,"oncdata",this.cdata),C(this,"onclosecdata"),this.cdata="",this.state=I.TEXT):"]"===s?this.cdata+="]":(this.cdata+="]]"+s,this.state=I.CDATA);continue;case I.PROC_INST:"?"===s?this.state=I.PROC_INST_ENDING:p(s)?this.state=I.PROC_INST_BODY:this.procInstName+=s;continue;case I.PROC_INST_BODY:if(!this.procInstBody&&p(s))continue;"?"===s?this.state=I.PROC_INST_ENDING:this.procInstBody+=s;continue;case I.PROC_INST_ENDING:">"===s?(C(this,"onprocessinginstruction",{name:this.procInstName,body:this.procInstBody}),this.procInstName=this.procInstBody="",this.state=I.TEXT):(this.procInstBody+="?"+s,this.state=I.PROC_INST_BODY);continue;case I.OPEN_TAG:f(l,s)?this.tagName+=s:(P(this),">"===s?L(this):"/"===s?this.state=I.OPEN_TAG_SLASH:(p(s)||v(this,"Invalid character in tag name"),this.state=I.ATTRIB));continue;case I.OPEN_TAG_SLASH:">"===s?(L(this,!0),U(this)):(v(this,"Forward-slash in opening tag not followed by >"),this.state=I.ATTRIB);continue;case I.ATTRIB:if(p(s))continue;">"===s?L(this):"/"===s?this.state=I.OPEN_TAG_SLASH:f(h,s)?(this.attribName=s,this.attribValue="",this.state=I.ATTRIB_NAME):v(this,"Invalid attribute name");continue;case I.ATTRIB_NAME:"="===s?this.state=I.ATTRIB_VALUE:">"===s?(v(this,"Attribute without value"),this.attribValue=this.attribName,y(this),L(this)):p(s)?this.state=I.ATTRIB_NAME_SAW_WHITE:f(l,s)?this.attribName+=s:v(this,"Invalid attribute name");continue;case I.ATTRIB_NAME_SAW_WHITE:if("="===s)this.state=I.ATTRIB_VALUE;else{if(p(s))continue;v(this,"Attribute without value"),this.tag.attributes[this.attribName]="",this.attribValue="",C(this,"onattribute",{name:this.attribName,value:""}),this.attribName="",">"===s?L(this):f(h,s)?(this.attribName=s,this.state=I.ATTRIB_NAME):(v(this,"Invalid attribute name"),this.state=I.ATTRIB)}continue;case I.ATTRIB_VALUE:if(p(s))continue;m(s)?(this.q=s,this.state=I.ATTRIB_VALUE_QUOTED):(v(this,"Unquoted attribute value"),this.state=I.ATTRIB_VALUE_UNQUOTED,this.attribValue=s);continue;case I.ATTRIB_VALUE_QUOTED:if(s!==this.q){"&"===s?this.state=I.ATTRIB_VALUE_ENTITY_Q:this.attribValue+=s;continue}y(this),this.q="",this.state=I.ATTRIB_VALUE_CLOSED;continue;case I.ATTRIB_VALUE_CLOSED:p(s)?this.state=I.ATTRIB:">"===s?L(this):"/"===s?this.state=I.OPEN_TAG_SLASH:f(h,s)?(v(this,"No whitespace between attributes"),this.attribName=s,this.attribValue="",this.state=I.ATTRIB_NAME):v(this,"Invalid attribute name");continue;case I.ATTRIB_VALUE_UNQUOTED:if(!N(s)){"&"===s?this.state=I.ATTRIB_VALUE_ENTITY_U:this.attribValue+=s;continue}y(this),">"===s?L(this):this.state=I.ATTRIB;continue;case I.CLOSE_TAG:if(this.tagName)">"===s?U(this):f(l,s)?this.tagName+=s:this.script?(this.script+="</"+this.tagName,this.tagName="",this.state=I.SCRIPT):(p(s)||v(this,"Invalid tagname in closing tag"),this.state=I.CLOSE_TAG_SAW_WHITE);else{if(p(s))continue;_(h,s)?this.script?(this.script+="</"+s,this.state=I.SCRIPT):v(this,"Invalid tagname in closing tag."):this.tagName=s}continue;case I.CLOSE_TAG_SAW_WHITE:if(p(s))continue;">"===s?U(this):v(this,"Invalid characters in closing tag");continue;case I.TEXT_ENTITY:case I.ATTRIB_VALUE_ENTITY_Q:case I.ATTRIB_VALUE_ENTITY_U:var o,c;switch(this.state){case I.TEXT_ENTITY:o=I.TEXT,c="textNode";break;case I.ATTRIB_VALUE_ENTITY_Q:o=I.ATTRIB_VALUE_QUOTED,c="attribValue";break;case I.ATTRIB_VALUE_ENTITY_U:o=I.ATTRIB_VALUE_UNQUOTED,c="attribValue"}";"===s?(this[c]+=B(this),this.entity="",this.state=o):f(this.entity.length?E:T,s)?this.entity+=s:(v(this,"Invalid character in entity name"),this[c]+="&"+this.entity+s,this.entity="",this.state=o);continue;default:throw new Error(this,"Unknown state: "+this.state)}this.position>=this.bufferCheckPosition&&function(t){for(var i=Math.max(e.MAX_BUFFER_LENGTH,10),s=0,n=0,r=a.length;n<r;n++){var o=t[a[n]].length;if(o>i)switch(a[n]){case"textNode":O(t);break;case"cdata":C(t,"oncdata",t.cdata),t.cdata="";break;case"script":C(t,"onscript",t.script),t.script="";break;default:S(t,"Max buffer length exceeded: "+a[n])}s=Math.max(s,o)}var c=e.MAX_BUFFER_LENGTH-s;t.bufferCheckPosition=c+t.position}(this);return this},resume:function(){return this.error=null,this},close:function(){return this.write(null)},flush:function(){var t;O(t=this),""!==t.cdata&&(C(t,"oncdata",t.cdata),t.cdata=""),""!==t.script&&(C(t,"onscript",t.script),t.script="")}};try{s=i(159).Stream}catch(t){s=function(){}}var r=e.EVENTS.filter((function(t){return"error"!==t&&"end"!==t}));function o(t,e){if(!(this instanceof o))return new o(t,e);s.apply(this),this._parser=new n(t,e),this.writable=!0,this.readable=!0;var i=this;this._parser.onend=function(){i.emit("end")},this._parser.onerror=function(t){i.emit("error",t),i._parser.error=null},this._decoder=null,r.forEach((function(t){Object.defineProperty(i,"on"+t,{get:function(){return i._parser["on"+t]},set:function(e){if(!e)return i.removeAllListeners(t),i._parser["on"+t]=e,e;i.on(t,e)},enumerable:!0,configurable:!1})}))}o.prototype=Object.create(s.prototype,{constructor:{value:o}}),o.prototype.write=function(e){if("function"==typeof t&&"function"==typeof t.isBuffer&&t.isBuffer(e)){if(!this._decoder){var s=i(49).StringDecoder;this._decoder=new s("utf8")}e=this._decoder.write(e)}return this._parser.write(e.toString()),this.emit("data",e),!0},o.prototype.end=function(t){return t&&t.length&&this.write(t),this._parser.end(),!0},o.prototype.on=function(t,e){var i=this;return i._parser["on"+t]||-1===r.indexOf(t)||(i._parser["on"+t]=function(){var e=1===arguments.length?[arguments[0]]:Array.apply(null,arguments);e.splice(0,0,t),i.emit.apply(i,e)}),s.prototype.on.call(i,t,e)};var c="http://www.w3.org/XML/1998/namespace",u={xml:c,xmlns:"http://www.w3.org/2000/xmlns/"},h=/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,l=/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/,T=/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,E=/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;function p(t){return" "===t||"\n"===t||"\r"===t||"\t"===t}function m(t){return'"'===t||"'"===t}function N(t){return">"===t||p(t)}function f(t,e){return t.test(e)}function _(t,e){return!f(t,e)}var d,g,A,I=0;for(var D in e.STATE={BEGIN:I++,BEGIN_WHITESPACE:I++,TEXT:I++,TEXT_ENTITY:I++,OPEN_WAKA:I++,SGML_DECL:I++,SGML_DECL_QUOTED:I++,DOCTYPE:I++,DOCTYPE_QUOTED:I++,DOCTYPE_DTD:I++,DOCTYPE_DTD_QUOTED:I++,COMMENT_STARTING:I++,COMMENT:I++,COMMENT_ENDING:I++,COMMENT_ENDED:I++,CDATA:I++,CDATA_ENDING:I++,CDATA_ENDING_2:I++,PROC_INST:I++,PROC_INST_BODY:I++,PROC_INST_ENDING:I++,OPEN_TAG:I++,OPEN_TAG_SLASH:I++,ATTRIB:I++,ATTRIB_NAME:I++,ATTRIB_NAME_SAW_WHITE:I++,ATTRIB_VALUE:I++,ATTRIB_VALUE_QUOTED:I++,ATTRIB_VALUE_CLOSED:I++,ATTRIB_VALUE_UNQUOTED:I++,ATTRIB_VALUE_ENTITY_Q:I++,ATTRIB_VALUE_ENTITY_U:I++,CLOSE_TAG:I++,CLOSE_TAG_SAW_WHITE:I++,SCRIPT:I++,SCRIPT_ENDING:I++},e.XML_ENTITIES={amp:"&",gt:">",lt:"<",quot:'"',apos:"'"},e.ENTITIES={amp:"&",gt:">",lt:"<",quot:'"',apos:"'",AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,aelig:230,agrave:224,aring:229,atilde:227,auml:228,ccedil:231,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,iacute:237,icirc:238,igrave:236,iuml:239,ntilde:241,oacute:243,ocirc:244,ograve:242,oslash:248,otilde:245,ouml:246,szlig:223,thorn:254,uacute:250,ucirc:251,ugrave:249,uuml:252,yacute:253,yuml:255,copy:169,reg:174,nbsp:160,iexcl:161,cent:162,pound:163,curren:164,yen:165,brvbar:166,sect:167,uml:168,ordf:170,laquo:171,not:172,shy:173,macr:175,deg:176,plusmn:177,sup1:185,sup2:178,sup3:179,acute:180,micro:181,para:182,middot:183,cedil:184,ordm:186,raquo:187,frac14:188,frac12:189,frac34:190,iquest:191,times:215,divide:247,OElig:338,oelig:339,Scaron:352,scaron:353,Yuml:376,fnof:402,circ:710,tilde:732,Alpha:913,Beta:914,Gamma:915,Delta:916,Epsilon:917,Zeta:918,Eta:919,Theta:920,Iota:921,Kappa:922,Lambda:923,Mu:924,Nu:925,Xi:926,Omicron:927,Pi:928,Rho:929,Sigma:931,Tau:932,Upsilon:933,Phi:934,Chi:935,Psi:936,Omega:937,alpha:945,beta:946,gamma:947,delta:948,epsilon:949,zeta:950,eta:951,theta:952,iota:953,kappa:954,lambda:955,mu:956,nu:957,xi:958,omicron:959,pi:960,rho:961,sigmaf:962,sigma:963,tau:964,upsilon:965,phi:966,chi:967,psi:968,omega:969,thetasym:977,upsih:978,piv:982,ensp:8194,emsp:8195,thinsp:8201,zwnj:8204,zwj:8205,lrm:8206,rlm:8207,ndash:8211,mdash:8212,lsquo:8216,rsquo:8217,sbquo:8218,ldquo:8220,rdquo:8221,bdquo:8222,dagger:8224,Dagger:8225,bull:8226,hellip:8230,permil:8240,prime:8242,Prime:8243,lsaquo:8249,rsaquo:8250,oline:8254,frasl:8260,euro:8364,image:8465,weierp:8472,real:8476,trade:8482,alefsym:8501,larr:8592,uarr:8593,rarr:8594,darr:8595,harr:8596,crarr:8629,lArr:8656,uArr:8657,rArr:8658,dArr:8659,hArr:8660,forall:8704,part:8706,exist:8707,empty:8709,nabla:8711,isin:8712,notin:8713,ni:8715,prod:8719,sum:8721,minus:8722,lowast:8727,radic:8730,prop:8733,infin:8734,ang:8736,and:8743,or:8744,cap:8745,cup:8746,int:8747,there4:8756,sim:8764,cong:8773,asymp:8776,ne:8800,equiv:8801,le:8804,ge:8805,sub:8834,sup:8835,nsub:8836,sube:8838,supe:8839,oplus:8853,otimes:8855,perp:8869,sdot:8901,lceil:8968,rceil:8969,lfloor:8970,rfloor:8971,lang:9001,rang:9002,loz:9674,spades:9824,clubs:9827,hearts:9829,diams:9830},Object.keys(e.ENTITIES).forEach((function(t){var i=e.ENTITIES[t],s="number"==typeof i?String.fromCharCode(i):i;e.ENTITIES[t]=s})),e.STATE)e.STATE[e.STATE[D]]=D;function b(t,e,i){t[e]&&t[e](i)}function C(t,e,i){t.textNode&&O(t),b(t,e,i)}function O(t){t.textNode=F(t.opt,t.textNode),t.textNode&&b(t,"ontext",t.textNode),t.textNode=""}function F(t,e){return t.trim&&(e=e.trim()),t.normalize&&(e=e.replace(/\s+/g," ")),e}function S(t,e){return O(t),t.trackPosition&&(e+="\nLine: "+t.line+"\nColumn: "+t.column+"\nChar: "+t.c),e=new Error(e),t.error=e,b(t,"onerror",e),t}function R(t){return t.sawRoot&&!t.closedRoot&&v(t,"Unclosed root tag"),t.state!==I.BEGIN&&t.state!==I.BEGIN_WHITESPACE&&t.state!==I.TEXT&&S(t,"Unexpected end"),O(t),t.c="",t.closed=!0,b(t,"onend"),n.call(t,t.strict,t.opt),t}function v(t,e){if("object"!=typeof t||!(t instanceof n))throw new Error("bad call to strictFail");t.strict&&S(t,e)}function P(t){t.strict||(t.tagName=t.tagName[t.looseCase]());var e=t.tags[t.tags.length-1]||t,i=t.tag={name:t.tagName,attributes:{}};t.opt.xmlns&&(i.ns=e.ns),t.attribList.length=0,C(t,"onopentagstart",i)}function w(t,e){var i=t.indexOf(":")<0?["",t]:t.split(":"),s=i[0],a=i[1];return e&&"xmlns"===t&&(s="xmlns",a=""),{prefix:s,local:a}}function y(t){if(t.strict||(t.attribName=t.attribName[t.looseCase]()),-1!==t.attribList.indexOf(t.attribName)||t.tag.attributes.hasOwnProperty(t.attribName))t.attribName=t.attribValue="";else{if(t.opt.xmlns){var e=w(t.attribName,!0),i=e.prefix,s=e.local;if("xmlns"===i)if("xml"===s&&t.attribValue!==c)v(t,"xml: prefix must be bound to "+c+"\nActual: "+t.attribValue);else if("xmlns"===s&&"http://www.w3.org/2000/xmlns/"!==t.attribValue)v(t,"xmlns: prefix must be bound to http://www.w3.org/2000/xmlns/\nActual: "+t.attribValue);else{var a=t.tag,n=t.tags[t.tags.length-1]||t;a.ns===n.ns&&(a.ns=Object.create(n.ns)),a.ns[s]=t.attribValue}t.attribList.push([t.attribName,t.attribValue])}else t.tag.attributes[t.attribName]=t.attribValue,C(t,"onattribute",{name:t.attribName,value:t.attribValue});t.attribName=t.attribValue=""}}function L(t,e){if(t.opt.xmlns){var i=t.tag,s=w(t.tagName);i.prefix=s.prefix,i.local=s.local,i.uri=i.ns[s.prefix]||"",i.prefix&&!i.uri&&(v(t,"Unbound namespace prefix: "+JSON.stringify(t.tagName)),i.uri=s.prefix);var a=t.tags[t.tags.length-1]||t;i.ns&&a.ns!==i.ns&&Object.keys(i.ns).forEach((function(e){C(t,"onopennamespace",{prefix:e,uri:i.ns[e]})}));for(var n=0,r=t.attribList.length;n<r;n++){var o=t.attribList[n],c=o[0],u=o[1],h=w(c,!0),l=h.prefix,T=h.local,E=""===l?"":i.ns[l]||"",p={name:c,value:u,prefix:l,local:T,uri:E};l&&"xmlns"!==l&&!E&&(v(t,"Unbound namespace prefix: "+JSON.stringify(l)),p.uri=l),t.tag.attributes[c]=p,C(t,"onattribute",p)}t.attribList.length=0}t.tag.isSelfClosing=!!e,t.sawRoot=!0,t.tags.push(t.tag),C(t,"onopentag",t.tag),e||(t.noscript||"script"!==t.tagName.toLowerCase()?t.state=I.TEXT:t.state=I.SCRIPT,t.tag=null,t.tagName=""),t.attribName=t.attribValue="",t.attribList.length=0}function U(t){if(!t.tagName)return v(t,"Weird empty close tag."),t.textNode+="</>",void(t.state=I.TEXT);if(t.script){if("script"!==t.tagName)return t.script+="</"+t.tagName+">",t.tagName="",void(t.state=I.SCRIPT);C(t,"onscript",t.script),t.script=""}var e=t.tags.length,i=t.tagName;t.strict||(i=i[t.looseCase]());for(var s=i;e--;){if(t.tags[e].name===s)break;v(t,"Unexpected close tag")}if(e<0)return v(t,"Unmatched closing tag: "+t.tagName),t.textNode+="</"+t.tagName+">",void(t.state=I.TEXT);t.tagName=i;for(var a=t.tags.length;a-- >e;){var n=t.tag=t.tags.pop();t.tagName=t.tag.name,C(t,"onclosetag",t.tagName);var r={};for(var o in n.ns)r[o]=n.ns[o];var c=t.tags[t.tags.length-1]||t;t.opt.xmlns&&n.ns!==c.ns&&Object.keys(n.ns).forEach((function(e){var i=n.ns[e];C(t,"onclosenamespace",{prefix:e,uri:i})}))}0===e&&(t.closedRoot=!0),t.tagName=t.attribValue=t.attribName="",t.attribList.length=0,t.state=I.TEXT}function B(t){var e,i=t.entity,s=i.toLowerCase(),a="";return t.ENTITIES[i]?t.ENTITIES[i]:t.ENTITIES[s]?t.ENTITIES[s]:("#"===(i=s).charAt(0)&&("x"===i.charAt(1)?(i=i.slice(2),a=(e=parseInt(i,16)).toString(16)):(i=i.slice(1),a=(e=parseInt(i,10)).toString(10))),i=i.replace(/^0+/,""),isNaN(e)||a.toLowerCase()!==i?(v(t,"Invalid character entity"),"&"+t.entity+";"):String.fromCodePoint(e))}function x(t,e){"<"===e?(t.state=I.OPEN_WAKA,t.startTagPosition=t.position):p(e)||(v(t,"Non-whitespace before first tag."),t.textNode=e,t.state=I.TEXT)}function G(t,e){var i="";return e<t.length&&(i=t.charAt(e)),i}I=e.STATE,String.fromCodePoint||(d=String.fromCharCode,g=Math.floor,A=function(){var t,e,i=16384,s=[],a=-1,n=arguments.length;if(!n)return"";for(var r="";++a<n;){var o=Number(arguments[a]);if(!isFinite(o)||o<0||o>1114111||g(o)!==o)throw RangeError("Invalid code point: "+o);o<=65535?s.push(o):(t=55296+((o-=65536)>>10),e=o%1024+56320,s.push(t,e)),(a+1===n||s.length>i)&&(r+=d.apply(null,s),s.length=0)}return r},Object.defineProperty?Object.defineProperty(String,"fromCodePoint",{value:A,configurable:!0,writable:!0}):String.fromCodePoint=A)}(e)}).call(this,i(27).Buffer)}}]);
//# sourceMappingURL=vendors~app~95191fae.025612a19d18e6bd6620.js.map