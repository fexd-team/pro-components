var Mt=(Qe,ke,Ce)=>new Promise(($e,Ie)=>{var f=ze=>{try{I(Ce.next(ze))}catch(et){Ie(et)}},at=ze=>{try{I(Ce.throw(ze))}catch(et){Ie(et)}},I=ze=>ze.done?$e(ze.value):Promise.resolve(ze.value).then(f,at);I((Ce=Ce.apply(Qe,ke)).next())});(self.webpackChunk=self.webpackChunk||[]).push([[801],{33417:function(Qe,ke,Ce){var $e=Ce(14224);ke.formatArgs=f,ke.save=at,ke.load=I,ke.useColors=Ie,ke.storage=ze(),ke.destroy=function(){var le=!1;return function(){le||(le=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}}(),ke.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Ie(){return typeof window!="undefined"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs)?!0:typeof navigator!="undefined"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)?!1:typeof document!="undefined"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window!="undefined"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator!="undefined"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator!="undefined"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function f(le){if(le[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+le[0]+(this.useColors?"%c ":" ")+"+"+Qe.exports.humanize(this.diff),!!this.useColors){var G="color: "+this.color;le.splice(1,0,G,"color: inherit");var oe=0,Se=0;le[0].replace(/%[a-zA-Z%]/g,function(tt){tt!=="%%"&&(oe++,tt==="%c"&&(Se=oe))}),le.splice(Se,0,G)}}ke.log=console.debug||console.log||function(){};function at(le){try{le?ke.storage.setItem("debug",le):ke.storage.removeItem("debug")}catch(G){}}function I(){var le;try{le=ke.storage.getItem("debug")}catch(G){}return!le&&typeof $e!="undefined"&&"env"in $e&&(le={NODE_ENV:"production",PUBLIC_PATH:"/pro-components/"}.DEBUG),le}function ze(){try{return localStorage}catch(le){}}Qe.exports=Ce(12367)(ke);var et=Qe.exports.formatters;et.j=function(le){try{return JSON.stringify(le)}catch(G){return"[UnexpectedJSONParseError]: "+G.message}}},12367:function(Qe,ke,Ce){var $e=Ce(93525).default;function Ie(f){I.debug=I,I.default=I,I.coerce=Se,I.disable=le,I.enable=et,I.enabled=G,I.humanize=Ce(54610),I.destroy=tt,Object.keys(f).forEach(function(K){I[K]=f[K]}),I.names=[],I.skips=[],I.formatters={};function at(K){for(var ie=0,je=0;je<K.length;je++)ie=(ie<<5)-ie+K.charCodeAt(je),ie|=0;return I.colors[Math.abs(ie)%I.colors.length]}I.selectColor=at;function I(K){var ie,je=null,wt,rt;function Be(){for(var mt=arguments.length,Re=new Array(mt),it=0;it<mt;it++)Re[it]=arguments[it];if(Be.enabled){var Me=Be,Je=Number(new Date),St=Je-(ie||Je);Me.diff=St,Me.prev=ie,Me.curr=Je,ie=Je,Re[0]=I.coerce(Re[0]),typeof Re[0]!="string"&&Re.unshift("%O");var ut=0;Re[0]=Re[0].replace(/%([a-zA-Z%])/g,function(ft,ve){if(ft==="%%")return"%";ut++;var Pt=I.formatters[ve];if(typeof Pt=="function"){var M=Re[ut];ft=Pt.call(Me,M),Re.splice(ut,1),ut--}return ft}),I.formatArgs.call(Me,Re);var jt=Me.log||I.log;jt.apply(Me,Re)}}return Be.namespace=K,Be.useColors=I.useColors(),Be.color=I.selectColor(K),Be.extend=ze,Be.destroy=I.destroy,Object.defineProperty(Be,"enabled",{enumerable:!0,configurable:!1,get:function(){return je!==null?je:(wt!==I.namespaces&&(wt=I.namespaces,rt=I.enabled(K)),rt)},set:function(Re){je=Re}}),typeof I.init=="function"&&I.init(Be),Be}function ze(K,ie){var je=I(this.namespace+(typeof ie=="undefined"?":":ie)+K);return je.log=this.log,je}function et(K){I.save(K),I.namespaces=K,I.names=[],I.skips=[];var ie,je=(typeof K=="string"?K:"").split(/[\s,]+/),wt=je.length;for(ie=0;ie<wt;ie++)je[ie]&&(K=je[ie].replace(/\*/g,".*?"),K[0]==="-"?I.skips.push(new RegExp("^"+K.slice(1)+"$")):I.names.push(new RegExp("^"+K+"$")))}function le(){var K=[].concat($e(I.names.map(oe)),$e(I.skips.map(oe).map(function(ie){return"-"+ie}))).join(",");return I.enable(""),K}function G(K){if(K[K.length-1]==="*")return!0;var ie,je;for(ie=0,je=I.skips.length;ie<je;ie++)if(I.skips[ie].test(K))return!1;for(ie=0,je=I.names.length;ie<je;ie++)if(I.names[ie].test(K))return!0;return!1}function oe(K){return K.toString().substring(2,K.toString().length-2).replace(/\.\*\?$/,"*")}function Se(K){return K instanceof Error?K.stack||K.message:K}function tt(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return I.enable(I.load()),I}Qe.exports=Ie},63827:function(){"use strict"},66726:function(Qe,ke,Ce){"use strict";Qe=Ce.nmd(Qe);var $e=Ce(91620).lW;(Ie=>{var f=Object.defineProperty,at=Object.defineProperties,I=Object.getOwnPropertyDescriptor,ze=Object.getOwnPropertyDescriptors,et=Object.getOwnPropertyNames,le=Object.getOwnPropertySymbols,G=Object.prototype.hasOwnProperty,oe=Object.prototype.propertyIsEnumerable,Se=(i,s,l)=>s in i?f(i,s,{enumerable:!0,configurable:!0,writable:!0,value:l}):i[s]=l,tt=(i,s)=>{for(var l in s||(s={}))G.call(s,l)&&Se(i,l,s[l]);if(le)for(var l of le(s))oe.call(s,l)&&Se(i,l,s[l]);return i},K=(i,s)=>at(i,ze(s)),ie=(i,s)=>{for(var l in s)f(i,l,{get:s[l],enumerable:!0})},je=(i,s,l,m)=>{if(s&&typeof s=="object"||typeof s=="function")for(let S of et(s))!G.call(i,S)&&S!==l&&f(i,S,{get:()=>s[S],enumerable:!(m=I(s,S))||m.enumerable});return i},wt=i=>je(f({},"__esModule",{value:!0}),i),rt=(i,s,l)=>new Promise((m,S)=>{var T=p=>{try{A(l.next(p))}catch(W){S(W)}},v=p=>{try{A(l.throw(p))}catch(W){S(W)}},A=p=>p.done?m(p.value):Promise.resolve(p.value).then(T,v);A((l=l.apply(i,s)).next())}),Be={};ie(Be,{analyzeMetafile:()=>mn,analyzeMetafileSync:()=>Lt,build:()=>un,buildSync:()=>gn,default:()=>Kt,formatMessages:()=>hn,formatMessagesSync:()=>pn,initialize:()=>vn,serve:()=>fn,transform:()=>dn,transformSync:()=>Gt,version:()=>Rt}),Ie.exports=wt(Be);function mt(i){let s=m=>{if(m===null)l.write8(0);else if(typeof m=="boolean")l.write8(1),l.write8(+m);else if(typeof m=="number")l.write8(2),l.write32(m|0);else if(typeof m=="string")l.write8(3),l.write(Me(m));else if(m instanceof Uint8Array)l.write8(4),l.write(m);else if(m instanceof Array){l.write8(5),l.write32(m.length);for(let S of m)s(S)}else{let S=Object.keys(m);l.write8(6),l.write32(S.length);for(let T of S)l.write(Me(T)),s(m[T])}},l=new it;return l.write32(0),l.write32(i.id<<1|+!i.isRequest),s(i.value),ut(l.buf,l.len-4,0),l.buf.subarray(0,l.len)}function Re(i){let s=()=>{switch(l.read8()){case 0:return null;case 1:return!!l.read8();case 2:return l.read32();case 3:return Je(l.read());case 4:return l.read();case 5:{let v=l.read32(),A=[];for(let p=0;p<v;p++)A.push(s());return A}case 6:{let v=l.read32(),A={};for(let p=0;p<v;p++)A[Je(l.read())]=s();return A}default:throw new Error("Invalid packet")}},l=new it(i),m=l.read32(),S=(m&1)===0;m>>>=1;let T=s();if(l.ptr!==i.length)throw new Error("Invalid packet");return{id:m,isRequest:S,value:T}}var it=class{constructor(i=new Uint8Array(1024)){this.buf=i,this.len=0,this.ptr=0}_write(i){if(this.len+i>this.buf.length){let s=new Uint8Array((this.len+i)*2);s.set(this.buf),this.buf=s}return this.len+=i,this.len-i}write8(i){let s=this._write(1);this.buf[s]=i}write32(i){let s=this._write(4);ut(this.buf,i,s)}write(i){let s=this._write(4+i.length);ut(this.buf,i.length,s),this.buf.set(i,s+4)}_read(i){if(this.ptr+i>this.buf.length)throw new Error("Invalid packet");return this.ptr+=i,this.ptr-i}read8(){return this.buf[this._read(1)]}read32(){return St(this.buf,this._read(4))}read(){let i=this.read32(),s=new Uint8Array(i),l=this._read(s.length);return s.set(this.buf.subarray(l,l+i)),s}},Me,Je;if(typeof TextEncoder!="undefined"&&typeof TextDecoder!="undefined"){let i=new TextEncoder,s=new TextDecoder;Me=l=>i.encode(l),Je=l=>s.decode(l)}else if(typeof $e!="undefined")Me=i=>{let s=$e.from(i);return s instanceof Uint8Array||(s=new Uint8Array(s)),s},Je=i=>{let{buffer:s,byteOffset:l,byteLength:m}=i;return $e.from(s,l,m).toString()};else throw new Error("No UTF-8 codec found");function St(i,s){return i[s++]|i[s++]<<8|i[s++]<<16|i[s++]<<24}function ut(i,s,l){i[l++]=s,i[l++]=s>>8,i[l++]=s>>16,i[l++]=s>>24}function jt(i){if(i+="",i.indexOf(",")>=0)throw new Error(`Invalid target: ${i}`);return i}var ft=()=>null,ve=i=>typeof i=="boolean"?null:"a boolean",Pt=i=>typeof i=="boolean"||typeof i=="object"&&!Array.isArray(i)?null:"a boolean or an object",M=i=>typeof i=="string"?null:"a string",nt=i=>i instanceof RegExp?null:"a RegExp object",lt=i=>typeof i=="number"&&i===(i|0)?null:"an integer",Nt=i=>typeof i=="function"?null:"a function",Fe=i=>Array.isArray(i)?null:"an array",st=i=>typeof i=="object"&&i!==null&&!Array.isArray(i)?null:"an object",nn=i=>i instanceof WebAssembly.Module?null:"a WebAssembly.Module",rn=i=>typeof i=="object"&&i!==null?null:"an array or an object",Vt=i=>typeof i=="object"&&!Array.isArray(i)?null:"an object or null",zt=i=>typeof i=="string"||typeof i=="boolean"?null:"a string or a boolean",sn=i=>typeof i=="string"||typeof i=="object"&&i!==null&&!Array.isArray(i)?null:"a string or an object",on=i=>typeof i=="string"||Array.isArray(i)?null:"a string or an array",Bt=i=>typeof i=="string"||i instanceof Uint8Array?null:"a string or a Uint8Array";function c(i,s,l,m){let S=i[l];if(s[l+""]=!0,S===void 0)return;let T=m(S);if(T!==null)throw new Error(`"${l}" must be ${T}`);return S}function Ne(i,s,l){for(let m in i)if(!(m in s))throw new Error(`Invalid option ${l}: "${m}"`)}function an(i){let s=Object.create(null),l=c(i,s,"wasmURL",M),m=c(i,s,"wasmModule",nn),S=c(i,s,"worker",ve);return Ne(i,s,"in initialize() call"),{wasmURL:l,wasmModule:m,worker:S}}function Wt(i){let s;if(i!==void 0){s=Object.create(null);for(let l of Object.keys(i)){let m=i[l];if(typeof m=="string"||m===!1)s[l]=m;else throw new Error(`Expected ${JSON.stringify(l)} in mangle cache to map to either a string or false`)}}return s}function $t(i,s,l,m,S){let T=c(s,l,"color",ve),v=c(s,l,"logLevel",M),A=c(s,l,"logLimit",lt);T!==void 0?i.push(`--color=${T}`):m&&i.push("--color=true"),i.push(`--log-level=${v||S}`),i.push(`--log-limit=${A||0}`)}function Ut(i,s,l){let m=c(s,l,"legalComments",M),S=c(s,l,"sourceRoot",M),T=c(s,l,"sourcesContent",ve),v=c(s,l,"target",on),A=c(s,l,"format",M),p=c(s,l,"globalName",M),W=c(s,l,"mangleProps",nt),ce=c(s,l,"reserveProps",nt),H=c(s,l,"mangleQuoted",ve),k=c(s,l,"minify",ve),fe=c(s,l,"minifySyntax",ve),be=c(s,l,"minifyWhitespace",ve),X=c(s,l,"minifyIdentifiers",ve),O=c(s,l,"drop",Fe),x=c(s,l,"charset",M),E=c(s,l,"treeShaking",ve),B=c(s,l,"ignoreAnnotations",ve),$=c(s,l,"jsx",M),re=c(s,l,"jsxFactory",M),we=c(s,l,"jsxFragment",M),a=c(s,l,"jsxImportSource",M),C=c(s,l,"jsxDev",ve),J=c(s,l,"define",st),y=c(s,l,"logOverride",st),w=c(s,l,"supported",st),b=c(s,l,"pure",Fe),R=c(s,l,"keepNames",ve),ae=c(s,l,"platform",M);if(m&&i.push(`--legal-comments=${m}`),S!==void 0&&i.push(`--source-root=${S}`),T!==void 0&&i.push(`--sources-content=${T}`),v&&(Array.isArray(v)?i.push(`--target=${Array.from(v).map(jt).join(",")}`):i.push(`--target=${jt(v)}`)),A&&i.push(`--format=${A}`),p&&i.push(`--global-name=${p}`),ae&&i.push(`--platform=${ae}`),k&&i.push("--minify"),fe&&i.push("--minify-syntax"),be&&i.push("--minify-whitespace"),X&&i.push("--minify-identifiers"),x&&i.push(`--charset=${x}`),E!==void 0&&i.push(`--tree-shaking=${E}`),B&&i.push("--ignore-annotations"),O)for(let U of O)i.push(`--drop:${U}`);if(W&&i.push(`--mangle-props=${W.source}`),ce&&i.push(`--reserve-props=${ce.source}`),H!==void 0&&i.push(`--mangle-quoted=${H}`),$&&i.push(`--jsx=${$}`),re&&i.push(`--jsx-factory=${re}`),we&&i.push(`--jsx-fragment=${we}`),a&&i.push(`--jsx-import-source=${a}`),C&&i.push("--jsx-dev"),J)for(let U in J){if(U.indexOf("=")>=0)throw new Error(`Invalid define: ${U}`);i.push(`--define:${U}=${J[U]}`)}if(y)for(let U in y){if(U.indexOf("=")>=0)throw new Error(`Invalid log override: ${U}`);i.push(`--log-override:${U}=${y[U]}`)}if(w)for(let U in w){if(U.indexOf("=")>=0)throw new Error(`Invalid supported: ${U}`);i.push(`--supported:${U}=${w[U]}`)}if(b)for(let U of b)i.push(`--pure:${U}`);R&&i.push("--keep-names")}function Ht(i,s,l,m,S){var T;let v=[],A=[],p=Object.create(null),W=null,ce=null,H=null;$t(v,s,p,l,m),Ut(v,s,p);let k=c(s,p,"sourcemap",zt),fe=c(s,p,"bundle",ve),be=c(s,p,"watch",Pt),X=c(s,p,"splitting",ve),O=c(s,p,"preserveSymlinks",ve),x=c(s,p,"metafile",ve),E=c(s,p,"outfile",M),B=c(s,p,"outdir",M),$=c(s,p,"outbase",M),re=c(s,p,"tsconfig",M),we=c(s,p,"resolveExtensions",Fe),a=c(s,p,"nodePaths",Fe),C=c(s,p,"mainFields",Fe),J=c(s,p,"conditions",Fe),y=c(s,p,"external",Fe),w=c(s,p,"loader",st),b=c(s,p,"outExtension",st),R=c(s,p,"publicPath",M),ae=c(s,p,"entryNames",M),U=c(s,p,"chunkNames",M),P=c(s,p,"assetNames",M),ne=c(s,p,"inject",Fe),q=c(s,p,"banner",st),ee=c(s,p,"footer",st),V=c(s,p,"entryPoints",rn),me=c(s,p,"absWorkingDir",M),te=c(s,p,"stdin",st),ge=(T=c(s,p,"write",ve))!=null?T:S,ye=c(s,p,"allowOverwrite",ve),De=c(s,p,"incremental",ve)===!0,se=c(s,p,"mangleCache",st);if(p.plugins=!0,Ne(s,p,`in ${i}() call`),k&&v.push(`--sourcemap${k===!0?"":`=${k}`}`),fe&&v.push("--bundle"),ye&&v.push("--allow-overwrite"),be)if(v.push("--watch"),typeof be=="boolean")H={};else{let d=Object.create(null),D=c(be,d,"onRebuild",Nt);Ne(be,d,`on "watch" in ${i}() call`),H={onRebuild:D}}if(X&&v.push("--splitting"),O&&v.push("--preserve-symlinks"),x&&v.push("--metafile"),E&&v.push(`--outfile=${E}`),B&&v.push(`--outdir=${B}`),$&&v.push(`--outbase=${$}`),re&&v.push(`--tsconfig=${re}`),we){let d=[];for(let D of we){if(D+="",D.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${D}`);d.push(D)}v.push(`--resolve-extensions=${d.join(",")}`)}if(R&&v.push(`--public-path=${R}`),ae&&v.push(`--entry-names=${ae}`),U&&v.push(`--chunk-names=${U}`),P&&v.push(`--asset-names=${P}`),C){let d=[];for(let D of C){if(D+="",D.indexOf(",")>=0)throw new Error(`Invalid main field: ${D}`);d.push(D)}v.push(`--main-fields=${d.join(",")}`)}if(J){let d=[];for(let D of J){if(D+="",D.indexOf(",")>=0)throw new Error(`Invalid condition: ${D}`);d.push(D)}v.push(`--conditions=${d.join(",")}`)}if(y)for(let d of y)v.push(`--external:${d}`);if(q)for(let d in q){if(d.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${d}`);v.push(`--banner:${d}=${q[d]}`)}if(ee)for(let d in ee){if(d.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${d}`);v.push(`--footer:${d}=${ee[d]}`)}if(ne)for(let d of ne)v.push(`--inject:${d}`);if(w)for(let d in w){if(d.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${d}`);v.push(`--loader:${d}=${w[d]}`)}if(b)for(let d in b){if(d.indexOf("=")>=0)throw new Error(`Invalid out extension: ${d}`);v.push(`--out-extension:${d}=${b[d]}`)}if(V)if(Array.isArray(V))for(let d of V)A.push(["",d+""]);else for(let[d,D]of Object.entries(V))A.push([d+"",D+""]);if(te){let d=Object.create(null),D=c(te,d,"contents",Bt),pe=c(te,d,"resolveDir",M),xe=c(te,d,"sourcefile",M),z=c(te,d,"loader",M);Ne(te,d,'in "stdin" object'),xe&&v.push(`--sourcefile=${xe}`),z&&v.push(`--loader=${z}`),pe&&(ce=pe+""),typeof D=="string"?W=Me(D):D instanceof Uint8Array&&(W=D)}let F=[];if(a)for(let d of a)d+="",F.push(d);return{entries:A,flags:v,write:ge,stdinContents:W,stdinResolveDir:ce,absWorkingDir:me,incremental:De,nodePaths:F,watch:H,mangleCache:Wt(se)}}function ln(i,s,l,m){let S=[],T=Object.create(null);$t(S,s,T,l,m),Ut(S,s,T);let v=c(s,T,"sourcemap",zt),A=c(s,T,"tsconfigRaw",sn),p=c(s,T,"sourcefile",M),W=c(s,T,"loader",M),ce=c(s,T,"banner",M),H=c(s,T,"footer",M),k=c(s,T,"mangleCache",st);return Ne(s,T,`in ${i}() call`),v&&S.push(`--sourcemap=${v===!0?"external":v}`),A&&S.push(`--tsconfig-raw=${typeof A=="string"?A:JSON.stringify(A)}`),p&&S.push(`--sourcefile=${p}`),W&&S.push(`--loader=${W}`),ce&&S.push(`--banner=${ce}`),H&&S.push(`--footer=${H}`),{flags:S,mangleCache:Wt(k)}}function cn(i){let s=new Map,l=new Map,m=new Map,S=new Map,T=null,v=0,A=0,p=new Uint8Array(16*1024),W=0,ce=y=>{let w=W+y.length;if(w>p.length){let R=new Uint8Array(w*2);R.set(p),p=R}p.set(y,W),W+=y.length;let b=0;for(;b+4<=W;){let R=St(p,b);if(b+4+R>W)break;b+=4,O(p.subarray(b,b+R)),b+=R}b>0&&(p.copyWithin(0,b,W),W-=b)},H=y=>{T={reason:y?": "+(y.message||y):""};const w="The service was stopped"+T.reason;for(let b of s.values())b(w,null);s.clear();for(let b of S.values())b.onWait(w);S.clear();for(let b of m.values())try{b(new Error(w),null)}catch(R){console.error(R)}m.clear()},k=(y,w,b)=>{if(T)return b("The service is no longer running"+T.reason,null);let R=v++;s.set(R,(ae,U)=>{try{b(ae,U)}finally{y&&y.unref()}}),y&&y.ref(),i.writeToStdin(mt({id:R,isRequest:!0,value:w}))},fe=(y,w)=>{if(T)throw new Error("The service is no longer running"+T.reason);i.writeToStdin(mt({id:y,isRequest:!1,value:w}))},be=(y,w)=>rt(this,null,function*(){try{switch(w.command){case"ping":{fe(y,{});break}case"on-start":{let b=l.get(w.key);b?fe(y,yield b(w)):fe(y,{});break}case"on-resolve":{let b=l.get(w.key);b?fe(y,yield b(w)):fe(y,{});break}case"on-load":{let b=l.get(w.key);b?fe(y,yield b(w)):fe(y,{});break}case"serve-request":{let b=S.get(w.key);b&&b.onRequest&&b.onRequest(w.args),fe(y,{});break}case"serve-wait":{let b=S.get(w.key);b&&b.onWait(w.error),fe(y,{});break}case"watch-rebuild":{let b=m.get(w.key);try{b&&b(null,w.args)}catch(R){console.error(R)}fe(y,{});break}default:throw new Error("Invalid command: "+w.command)}}catch(b){fe(y,{errors:[gt(b,i,null,void 0,"")]})}}),X=!0,O=y=>{if(X){X=!1;let b=String.fromCharCode(...y);if(b!=="0.14.54")throw new Error(`Cannot start service: Host version "0.14.54" does not match binary version ${JSON.stringify(b)}`);return}let w=Re(y);if(w.isRequest)be(w.id,w.value);else{let b=s.get(w.id);s.delete(w.id),w.value.error?b(w.value.error,{}):b(null,w.value)}},x=(y,w,b,R,ae)=>rt(this,null,function*(){let U=[],P=[],ne={},q={},ee=0,V=0,me=[],te=!1;w=[...w];for(let se of w){let F={};if(typeof se!="object")throw new Error(`Plugin at index ${V} must be an object`);const d=c(se,F,"name",M);if(typeof d!="string"||d==="")throw new Error(`Plugin at index ${V} is missing a name`);try{let D=c(se,F,"setup",Nt);if(typeof D!="function")throw new Error("Plugin is missing a setup function");Ne(se,F,`on plugin ${JSON.stringify(d)}`);let pe={name:d,onResolve:[],onLoad:[]};V++;let z=D({initialOptions:y,resolve:(L,Y={})=>{if(!te)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof L!="string")throw new Error("The path to resolve must be a string");let Z=Object.create(null),Te=c(Y,Z,"pluginName",M),Ee=c(Y,Z,"importer",M),Pe=c(Y,Z,"namespace",M),qe=c(Y,Z,"resolveDir",M),Le=c(Y,Z,"kind",M),de=c(Y,Z,"pluginData",ft);return Ne(Y,Z,"in resolve() call"),new Promise((Ue,We)=>{const _e={command:"resolve",path:L,key:b,pluginName:d};Te!=null&&(_e.pluginName=Te),Ee!=null&&(_e.importer=Ee),Pe!=null&&(_e.namespace=Pe),qe!=null&&(_e.resolveDir=qe),Le!=null&&(_e.kind=Le),de!=null&&(_e.pluginData=R.store(de)),k(ae,_e,(ct,Ge)=>{ct!==null?We(new Error(ct)):Ue({errors:dt(Ge.errors,R),warnings:dt(Ge.warnings,R),path:Ge.path,external:Ge.external,sideEffects:Ge.sideEffects,namespace:Ge.namespace,suffix:Ge.suffix,pluginData:R.load(Ge.pluginData)})})})},onStart(L){let Y='This error came from the "onStart" callback registered here:',Z=Tt(new Error(Y),i,"onStart");U.push({name:d,callback:L,note:Z})},onEnd(L){let Y='This error came from the "onEnd" callback registered here:',Z=Tt(new Error(Y),i,"onEnd");P.push({name:d,callback:L,note:Z})},onResolve(L,Y){let Z='This error came from the "onResolve" callback registered here:',Te=Tt(new Error(Z),i,"onResolve"),Ee={},Pe=c(L,Ee,"filter",nt),qe=c(L,Ee,"namespace",M);if(Ne(L,Ee,`in onResolve() call for plugin ${JSON.stringify(d)}`),Pe==null)throw new Error("onResolve() call is missing a filter");let Le=ee++;ne[Le]={name:d,callback:Y,note:Te},pe.onResolve.push({id:Le,filter:Pe.source,namespace:qe||""})},onLoad(L,Y){let Z='This error came from the "onLoad" callback registered here:',Te=Tt(new Error(Z),i,"onLoad"),Ee={},Pe=c(L,Ee,"filter",nt),qe=c(L,Ee,"namespace",M);if(Ne(L,Ee,`in onLoad() call for plugin ${JSON.stringify(d)}`),Pe==null)throw new Error("onLoad() call is missing a filter");let Le=ee++;q[Le]={name:d,callback:Y,note:Te},pe.onLoad.push({id:Le,filter:Pe.source,namespace:qe||""})},esbuild:i.esbuild});z&&(yield z),me.push(pe)}catch(D){return{ok:!1,error:D,pluginName:d}}}const ge=se=>rt(this,null,function*(){switch(se.command){case"on-start":{let F={errors:[],warnings:[]};return yield Promise.all(U.map(d=>rt(this,[d],function*({name:D,callback:pe,note:xe}){try{let z=yield pe();if(z!=null){if(typeof z!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(D)} to return an object`);let L={},Y=c(z,L,"errors",Fe),Z=c(z,L,"warnings",Fe);Ne(z,L,`from onStart() callback in plugin ${JSON.stringify(D)}`),Y!=null&&F.errors.push(...pt(Y,"errors",R,D)),Z!=null&&F.warnings.push(...pt(Z,"warnings",R,D))}}catch(z){F.errors.push(gt(z,i,R,xe&&xe(),D))}}))),F}case"on-resolve":{let F={},d="",D,pe;for(let xe of se.ids)try{({name:d,callback:D,note:pe}=ne[xe]);let z=yield D({path:se.path,importer:se.importer,namespace:se.namespace,resolveDir:se.resolveDir,kind:se.kind,pluginData:R.load(se.pluginData)});if(z!=null){if(typeof z!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(d)} to return an object`);let L={},Y=c(z,L,"pluginName",M),Z=c(z,L,"path",M),Te=c(z,L,"namespace",M),Ee=c(z,L,"suffix",M),Pe=c(z,L,"external",ve),qe=c(z,L,"sideEffects",ve),Le=c(z,L,"pluginData",ft),de=c(z,L,"errors",Fe),Ue=c(z,L,"warnings",Fe),We=c(z,L,"watchFiles",Fe),_e=c(z,L,"watchDirs",Fe);Ne(z,L,`from onResolve() callback in plugin ${JSON.stringify(d)}`),F.id=xe,Y!=null&&(F.pluginName=Y),Z!=null&&(F.path=Z),Te!=null&&(F.namespace=Te),Ee!=null&&(F.suffix=Ee),Pe!=null&&(F.external=Pe),qe!=null&&(F.sideEffects=qe),Le!=null&&(F.pluginData=R.store(Le)),de!=null&&(F.errors=pt(de,"errors",R,d)),Ue!=null&&(F.warnings=pt(Ue,"warnings",R,d)),We!=null&&(F.watchFiles=xt(We,"watchFiles")),_e!=null&&(F.watchDirs=xt(_e,"watchDirs"));break}}catch(z){return{id:xe,errors:[gt(z,i,R,pe&&pe(),d)]}}return F}case"on-load":{let F={},d="",D,pe;for(let xe of se.ids)try{({name:d,callback:D,note:pe}=q[xe]);let z=yield D({path:se.path,namespace:se.namespace,suffix:se.suffix,pluginData:R.load(se.pluginData)});if(z!=null){if(typeof z!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(d)} to return an object`);let L={},Y=c(z,L,"pluginName",M),Z=c(z,L,"contents",Bt),Te=c(z,L,"resolveDir",M),Ee=c(z,L,"pluginData",ft),Pe=c(z,L,"loader",M),qe=c(z,L,"errors",Fe),Le=c(z,L,"warnings",Fe),de=c(z,L,"watchFiles",Fe),Ue=c(z,L,"watchDirs",Fe);Ne(z,L,`from onLoad() callback in plugin ${JSON.stringify(d)}`),F.id=xe,Y!=null&&(F.pluginName=Y),Z instanceof Uint8Array?F.contents=Z:Z!=null&&(F.contents=Me(Z)),Te!=null&&(F.resolveDir=Te),Ee!=null&&(F.pluginData=R.store(Ee)),Pe!=null&&(F.loader=Pe),qe!=null&&(F.errors=pt(qe,"errors",R,d)),Le!=null&&(F.warnings=pt(Le,"warnings",R,d)),de!=null&&(F.watchFiles=xt(de,"watchFiles")),Ue!=null&&(F.watchDirs=xt(Ue,"watchDirs"));break}}catch(z){return{id:xe,errors:[gt(z,i,R,pe&&pe(),d)]}}return F}default:throw new Error("Invalid command: "+se.command)}});let ye=(se,F,d)=>d();P.length>0&&(ye=(se,F,d)=>{(()=>rt(this,null,function*(){for(const{name:D,callback:pe,note:xe}of P)try{yield pe(se)}catch(z){se.errors.push(yield new Promise(L=>F(z,D,xe&&xe(),L)))}}))().then(d)}),te=!0;let De=0;return{ok:!0,requestPlugins:me,runOnEndCallbacks:ye,pluginRefs:{ref(){++De===1&&l.set(b,ge)},unref(){--De===0&&l.delete(b)}}}}),E=(y,w,b,R)=>{let ae={},U=c(w,ae,"port",lt),P=c(w,ae,"host",M),ne=c(w,ae,"servedir",M),q=c(w,ae,"onRequest",Nt),ee,V=new Promise((me,te)=>{ee=ge=>{S.delete(R),ge!==null?te(new Error(ge)):me()}});return b.serve={},Ne(w,ae,"in serve() call"),U!==void 0&&(b.serve.port=U),P!==void 0&&(b.serve.host=P),ne!==void 0&&(b.serve.servedir=ne),S.set(R,{onRequest:q,onWait:ee}),{wait:V,stop(){k(y,{command:"serve-stop",key:R},()=>{})}}};const B="warning",$="silent";let re=y=>{let w=A++;const b=Jt();let R,{refs:ae,options:U,isTTY:P,callback:ne}=y;if(typeof U=="object"){let V=U.plugins;if(V!==void 0){if(!Array.isArray(V))throw new Error('"plugins" must be an array');R=V}}let q=(V,me,te,ge)=>{let ye=[];try{$t(ye,U,{},P,B)}catch(se){}const De=gt(V,i,b,te,me);k(ae,{command:"error",flags:ye,error:De},()=>{De.detail=b.load(De.detail),ge(De)})},ee=(V,me)=>{q(V,me,void 0,te=>{ne(yt("Build failed",[te],[]),null)})};if(R&&R.length>0){if(i.isSync)return ee(new Error("Cannot use plugins in synchronous API calls"),"");x(U,R,w,b,ae).then(V=>{if(!V.ok)ee(V.error,V.pluginName);else try{we(K(tt({},y),{key:w,details:b,logPluginError:q,requestPlugins:V.requestPlugins,runOnEndCallbacks:V.runOnEndCallbacks,pluginRefs:V.pluginRefs}))}catch(me){ee(me,"")}},V=>ee(V,""))}else try{we(K(tt({},y),{key:w,details:b,logPluginError:q,requestPlugins:null,runOnEndCallbacks:(V,me,te)=>te(),pluginRefs:null}))}catch(V){ee(V,"")}},we=({callName:y,refs:w,serveOptions:b,options:R,isTTY:ae,defaultWD:U,callback:P,key:ne,details:q,logPluginError:ee,requestPlugins:V,runOnEndCallbacks:me,pluginRefs:te})=>{const ge={ref(){te&&te.ref(),w&&w.ref()},unref(){te&&te.unref(),w&&w.unref()}};let ye=!i.isWriteUnavailable,{entries:De,flags:se,write:F,stdinContents:d,stdinResolveDir:D,absWorkingDir:pe,incremental:xe,nodePaths:z,watch:L,mangleCache:Y}=Ht(y,R,ae,B,ye),Z={command:"build",key:ne,entries:De,flags:se,write:F,stdinContents:d,stdinResolveDir:D,absWorkingDir:pe||U,incremental:xe,nodePaths:z};V&&(Z.plugins=V),Y&&(Z.mangleCache=Y);let Te=b&&E(ge,b,Z,ne),Ee,Pe,qe=(de,Ue)=>{de.outputFiles&&(Ue.outputFiles=de.outputFiles.map(kt)),de.metafile&&(Ue.metafile=JSON.parse(de.metafile)),de.mangleCache&&(Ue.mangleCache=de.mangleCache),de.writeToStdout!==void 0&&console.log(Je(de.writeToStdout).replace(/\n$/,""))},Le=(de,Ue)=>{let We={errors:dt(de.errors,q),warnings:dt(de.warnings,q)};qe(de,We),me(We,ee,()=>{if(We.errors.length>0)return Ue(yt("Build failed",We.errors,We.warnings),null);if(de.rebuild){if(!Ee){let _e=!1;Ee=()=>new Promise((ct,Ge)=>{if(_e||T)throw new Error("Cannot rebuild");k(ge,{command:"rebuild",key:ne},(Ze,Dt)=>{if(Ze)return Ue(yt("Build failed",[{id:"",pluginName:"",text:Ze,location:null,notes:[],detail:void 0}],[]),null);Le(Dt,(It,yn)=>{It?Ge(It):ct(yn)})})}),ge.ref(),Ee.dispose=()=>{_e||(_e=!0,k(ge,{command:"rebuild-dispose",key:ne},()=>{}),ge.unref())}}We.rebuild=Ee}if(de.watch){if(!Pe){let _e=!1;ge.ref(),Pe=()=>{_e||(_e=!0,m.delete(ne),k(ge,{command:"watch-stop",key:ne},()=>{}),ge.unref())},L&&m.set(ne,(ct,Ge)=>{if(ct){L.onRebuild&&L.onRebuild(ct,null);return}let Ze={errors:dt(Ge.errors,q),warnings:dt(Ge.warnings,q)};qe(Ge,Ze),me(Ze,ee,()=>{if(Ze.errors.length>0){L.onRebuild&&L.onRebuild(yt("Build failed",Ze.errors,Ze.warnings),null);return}Ge.rebuildID!==void 0&&(Ze.rebuild=Ee),Ze.stop=Pe,L.onRebuild&&L.onRebuild(null,Ze)})})}We.stop=Pe}Ue(null,We)})};if(F&&i.isWriteUnavailable)throw new Error('The "write" option is unavailable in this environment');if(xe&&i.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(L&&i.isSync)throw new Error('Cannot use "watch" with a synchronous build');k(ge,Z,(de,Ue)=>{if(de)return P(new Error(de),null);if(Te){let We=Ue,_e=!1;ge.ref();let ct={port:We.port,host:We.host,wait:Te.wait,stop(){_e||(_e=!0,Te.stop(),ge.unref())}};return ge.ref(),Te.wait.then(ge.unref,ge.unref),P(null,ct)}return Le(Ue,P)})};return{readFromStdout:ce,afterClose:H,service:{buildOrServe:re,transform:({callName:y,refs:w,input:b,options:R,isTTY:ae,fs:U,callback:P})=>{const ne=Jt();let q=ee=>{try{if(typeof b!="string"&&!(b instanceof Uint8Array))throw new Error('The input to "transform" must be a string or a Uint8Array');let{flags:V,mangleCache:me}=ln(y,R,ae,$),te={command:"transform",flags:V,inputFS:ee!==null,input:ee!==null?Me(ee):typeof b=="string"?Me(b):b};me&&(te.mangleCache=me),k(w,te,(ge,ye)=>{if(ge)return P(new Error(ge),null);let De=dt(ye.errors,ne),se=dt(ye.warnings,ne),F=1,d=()=>{if(--F===0){let D={warnings:se,code:ye.code,map:ye.map};ye.mangleCache&&(D.mangleCache=ye==null?void 0:ye.mangleCache),P(null,D)}};if(De.length>0)return P(yt("Transform failed",De,se),null);ye.codeFS&&(F++,U.readFile(ye.code,(D,pe)=>{D!==null?P(D,null):(ye.code=pe,d())})),ye.mapFS&&(F++,U.readFile(ye.map,(D,pe)=>{D!==null?P(D,null):(ye.map=pe,d())})),d()})}catch(V){let me=[];try{$t(me,R,{},ae,$)}catch(ge){}const te=gt(V,i,ne,void 0,"");k(w,{command:"error",flags:me,error:te},()=>{te.detail=ne.load(te.detail),P(yt("Transform failed",[te],[]),null)})}};if((typeof b=="string"||b instanceof Uint8Array)&&b.length>1024*1024){let ee=q;q=()=>U.writeFile(b,ee)}q(null)},formatMessages:({callName:y,refs:w,messages:b,options:R,callback:ae})=>{let U=pt(b,"messages",null,"");if(!R)throw new Error(`Missing second argument in ${y}() call`);let P={},ne=c(R,P,"kind",M),q=c(R,P,"color",ve),ee=c(R,P,"terminalWidth",lt);if(Ne(R,P,`in ${y}() call`),ne===void 0)throw new Error(`Missing "kind" in ${y}() call`);if(ne!=="error"&&ne!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${y}() call`);let V={command:"format-msgs",messages:U,isWarning:ne==="warning"};q!==void 0&&(V.color=q),ee!==void 0&&(V.terminalWidth=ee),k(w,V,(me,te)=>{if(me)return ae(new Error(me),null);ae(null,te.messages)})},analyzeMetafile:({callName:y,refs:w,metafile:b,options:R,callback:ae})=>{R===void 0&&(R={});let U={},P=c(R,U,"color",ve),ne=c(R,U,"verbose",ve);Ne(R,U,`in ${y}() call`);let q={command:"analyze-metafile",metafile:b};P!==void 0&&(q.color=P),ne!==void 0&&(q.verbose=ne),k(w,q,(ee,V)=>{if(ee)return ae(new Error(ee),null);ae(null,V.result)})}}}}function Jt(){const i=new Map;let s=0;return{load(l){return i.get(l)},store(l){if(l===void 0)return-1;const m=s++;return i.set(m,l),m}}}function Tt(i,s,l){let m,S=!1;return()=>{if(S)return m;S=!0;try{let T=(i.stack+"").split(`
`);T.splice(1,1);let v=qt(s,T,l);if(v)return m={text:i.message,location:v},m}catch(T){}}}function gt(i,s,l,m,S){let T="Internal error",v=null;try{T=(i&&i.message||i)+""}catch(A){}try{v=qt(s,(i.stack+"").split(`
`),"")}catch(A){}return{id:"",pluginName:S,text:T,location:v,notes:m?[m]:[],detail:l?l.store(i):-1}}function qt(i,s,l){let m="    at ";if(i.readFileSync&&!s[0].startsWith(m)&&s[1].startsWith(m))for(let S=1;S<s.length;S++){let T=s[S];if(T.startsWith(m))for(T=T.slice(m.length);;){let v=/^(?:new |async )?\S+ \((.*)\)$/.exec(T);if(v){T=v[1];continue}if(v=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(T),v){T=v[1];continue}if(v=/^(\S+):(\d+):(\d+)$/.exec(T),v){let A;try{A=i.readFileSync(v[1],"utf8")}catch(H){break}let p=A.split(/\r\n|\r|\n|\u2028|\u2029/)[+v[2]-1]||"",W=+v[3]-1,ce=p.slice(W,W+l.length)===l?l.length:0;return{file:v[1],namespace:"file",line:+v[2],column:Me(p.slice(0,W)).length,length:Me(p.slice(W,W+ce)).length,lineText:p+`
`+s.slice(1).join(`
`),suggestion:""}}break}}return null}function yt(i,s,l){let m=5,S=s.length<1?"":` with ${s.length} error${s.length<2?"":"s"}:`+s.slice(0,m+1).map((v,A)=>{if(A===m)return`
...`;if(!v.location)return`
error: ${v.text}`;let{file:p,line:W,column:ce}=v.location,H=v.pluginName?`[plugin: ${v.pluginName}] `:"";return`
${p}:${W}:${ce}: ERROR: ${H}${v.text}`}).join(""),T=new Error(`${i}${S}`);return T.errors=s,T.warnings=l,T}function dt(i,s){for(const l of i)l.detail=s.load(l.detail);return i}function At(i,s){if(i==null)return null;let l={},m=c(i,l,"file",M),S=c(i,l,"namespace",M),T=c(i,l,"line",lt),v=c(i,l,"column",lt),A=c(i,l,"length",lt),p=c(i,l,"lineText",M),W=c(i,l,"suggestion",M);return Ne(i,l,s),{file:m||"",namespace:S||"",line:T||0,column:v||0,length:A||0,lineText:p||"",suggestion:W||""}}function pt(i,s,l,m){let S=[],T=0;for(const v of i){let A={},p=c(v,A,"id",M),W=c(v,A,"pluginName",M),ce=c(v,A,"text",M),H=c(v,A,"location",Vt),k=c(v,A,"notes",Fe),fe=c(v,A,"detail",ft),be=`in element ${T} of "${s}"`;Ne(v,A,be);let X=[];if(k)for(const O of k){let x={},E=c(O,x,"text",M),B=c(O,x,"location",Vt);Ne(O,x,be),X.push({text:E||"",location:At(B,be)})}S.push({id:p||"",pluginName:W||m,text:ce||"",location:At(H,be),notes:X,detail:l?l.store(fe):-1}),T++}return S}function xt(i,s){const l=[];for(const m of i){if(typeof m!="string")throw new Error(`${JSON.stringify(s)} must be an array of strings`);l.push(m)}return l}function kt({path:i,contents:s}){let l=null;return{path:i,contents:s,get text(){const m=this.contents;return(l===null||m!==s)&&(s=m,l=Je(m)),l}}}var Rt="0.14.54",un=i=>Ft().build(i),fn=()=>{throw new Error('The "serve" API only works in node')},dn=(i,s)=>Ft().transform(i,s),hn=(i,s)=>Ft().formatMessages(i,s),mn=(i,s)=>Ft().analyzeMetafile(i,s),gn=()=>{throw new Error('The "buildSync" API only works in node')},Gt=()=>{throw new Error('The "transformSync" API only works in node')},pn=()=>{throw new Error('The "formatMessagesSync" API only works in node')},Lt=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},bt,_t,Ft=()=>{if(_t)return _t;throw bt?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},vn=i=>{i=an(i||{});let s=i.wasmURL,l=i.wasmModule,m=i.worker!==!1;if(!s&&!l)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(bt)throw new Error('Cannot call "initialize" more than once');return bt=wn(s||"",l,m),bt.catch(()=>{bt=void 0}),bt},wn=(i,s,l)=>rt(void 0,null,function*(){let m;if(s)m=s;else{let A=yield fetch(i);if(!A.ok)throw new Error(`Failed to download ${JSON.stringify(i)}`);m=yield A.arrayBuffer()}let S;if(l){let A=new Blob([`onmessage=((postMessage) => {
      // Copyright 2018 The Go Authors. All rights reserved.
      // Use of this source code is governed by a BSD-style
      // license that can be found in the LICENSE file.
      var __async = (__this, __arguments, generator) => {
        return new Promise((resolve, reject) => {
          var fulfilled = (value) => {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          };
          var rejected = (value) => {
            try {
              step(generator.throw(value));
            } catch (e) {
              reject(e);
            }
          };
          var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
          step((generator = generator.apply(__this, __arguments)).next());
        });
      };
      let onmessage;
      let globalThis = {};
      for (let o = self; o; o = Object.getPrototypeOf(o))
        for (let k of Object.getOwnPropertyNames(o))
          if (!(k in globalThis))
            Object.defineProperty(globalThis, k, { get: () => self[k] });
      "use strict";
      (() => {
        const enosys = () => {
          const err = new Error("not implemented");
          err.code = "ENOSYS";
          return err;
        };
        if (!globalThis.fs) {
          let outputBuf = "";
          globalThis.fs = {
            constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },
            writeSync(fd, buf) {
              outputBuf += decoder.decode(buf);
              const nl = outputBuf.lastIndexOf("\\n");
              if (nl != -1) {
                console.log(outputBuf.substr(0, nl));
                outputBuf = outputBuf.substr(nl + 1);
              }
              return buf.length;
            },
            write(fd, buf, offset, length, position, callback) {
              if (offset !== 0 || length !== buf.length || position !== null) {
                callback(enosys());
                return;
              }
              const n = this.writeSync(fd, buf);
              callback(null, n);
            },
            chmod(path, mode, callback) {
              callback(enosys());
            },
            chown(path, uid, gid, callback) {
              callback(enosys());
            },
            close(fd, callback) {
              callback(enosys());
            },
            fchmod(fd, mode, callback) {
              callback(enosys());
            },
            fchown(fd, uid, gid, callback) {
              callback(enosys());
            },
            fstat(fd, callback) {
              callback(enosys());
            },
            fsync(fd, callback) {
              callback(null);
            },
            ftruncate(fd, length, callback) {
              callback(enosys());
            },
            lchown(path, uid, gid, callback) {
              callback(enosys());
            },
            link(path, link, callback) {
              callback(enosys());
            },
            lstat(path, callback) {
              callback(enosys());
            },
            mkdir(path, perm, callback) {
              callback(enosys());
            },
            open(path, flags, mode, callback) {
              callback(enosys());
            },
            read(fd, buffer, offset, length, position, callback) {
              callback(enosys());
            },
            readdir(path, callback) {
              callback(enosys());
            },
            readlink(path, callback) {
              callback(enosys());
            },
            rename(from, to, callback) {
              callback(enosys());
            },
            rmdir(path, callback) {
              callback(enosys());
            },
            stat(path, callback) {
              callback(enosys());
            },
            symlink(path, link, callback) {
              callback(enosys());
            },
            truncate(path, length, callback) {
              callback(enosys());
            },
            unlink(path, callback) {
              callback(enosys());
            },
            utimes(path, atime, mtime, callback) {
              callback(enosys());
            }
          };
        }
        if (!globalThis.process) {
          globalThis.process = {
            getuid() {
              return -1;
            },
            getgid() {
              return -1;
            },
            geteuid() {
              return -1;
            },
            getegid() {
              return -1;
            },
            getgroups() {
              throw enosys();
            },
            pid: -1,
            ppid: -1,
            umask() {
              throw enosys();
            },
            cwd() {
              throw enosys();
            },
            chdir() {
              throw enosys();
            }
          };
        }
        if (!globalThis.crypto) {
          throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
        }
        if (!globalThis.performance) {
          throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
        }
        if (!globalThis.TextEncoder) {
          throw new Error("globalThis.TextEncoder is not available, polyfill required");
        }
        if (!globalThis.TextDecoder) {
          throw new Error("globalThis.TextDecoder is not available, polyfill required");
        }
        const encoder = new TextEncoder("utf-8");
        const decoder = new TextDecoder("utf-8");
        globalThis.Go = class {
          constructor() {
            this.argv = ["js"];
            this.env = {};
            this.exit = (code) => {
              if (code !== 0) {
                console.warn("exit code:", code);
              }
            };
            this._exitPromise = new Promise((resolve) => {
              this._resolveExitPromise = resolve;
            });
            this._pendingEvent = null;
            this._scheduledTimeouts = /* @__PURE__ */ new Map();
            this._nextCallbackTimeoutID = 1;
            const setInt64 = (addr, v) => {
              this.mem.setUint32(addr + 0, v, true);
              this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);
            };
            const getInt64 = (addr) => {
              const low = this.mem.getUint32(addr + 0, true);
              const high = this.mem.getInt32(addr + 4, true);
              return low + high * 4294967296;
            };
            const loadValue = (addr) => {
              const f = this.mem.getFloat64(addr, true);
              if (f === 0) {
                return void 0;
              }
              if (!isNaN(f)) {
                return f;
              }
              const id = this.mem.getUint32(addr, true);
              return this._values[id];
            };
            const storeValue = (addr, v) => {
              const nanHead = 2146959360;
              if (typeof v === "number" && v !== 0) {
                if (isNaN(v)) {
                  this.mem.setUint32(addr + 4, nanHead, true);
                  this.mem.setUint32(addr, 0, true);
                  return;
                }
                this.mem.setFloat64(addr, v, true);
                return;
              }
              if (v === void 0) {
                this.mem.setFloat64(addr, 0, true);
                return;
              }
              let id = this._ids.get(v);
              if (id === void 0) {
                id = this._idPool.pop();
                if (id === void 0) {
                  id = this._values.length;
                }
                this._values[id] = v;
                this._goRefCounts[id] = 0;
                this._ids.set(v, id);
              }
              this._goRefCounts[id]++;
              let typeFlag = 0;
              switch (typeof v) {
                case "object":
                  if (v !== null) {
                    typeFlag = 1;
                  }
                  break;
                case "string":
                  typeFlag = 2;
                  break;
                case "symbol":
                  typeFlag = 3;
                  break;
                case "function":
                  typeFlag = 4;
                  break;
              }
              this.mem.setUint32(addr + 4, nanHead | typeFlag, true);
              this.mem.setUint32(addr, id, true);
            };
            const loadSlice = (addr) => {
              const array = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              return new Uint8Array(this._inst.exports.mem.buffer, array, len);
            };
            const loadSliceOfValues = (addr) => {
              const array = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              const a = new Array(len);
              for (let i = 0; i < len; i++) {
                a[i] = loadValue(array + i * 8);
              }
              return a;
            };
            const loadString = (addr) => {
              const saddr = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));
            };
            const timeOrigin = Date.now() - performance.now();
            this.importObject = {
              go: {
                "runtime.wasmExit": (sp) => {
                  sp >>>= 0;
                  const code = this.mem.getInt32(sp + 8, true);
                  this.exited = true;
                  delete this._inst;
                  delete this._values;
                  delete this._goRefCounts;
                  delete this._ids;
                  delete this._idPool;
                  this.exit(code);
                },
                "runtime.wasmWrite": (sp) => {
                  sp >>>= 0;
                  const fd = getInt64(sp + 8);
                  const p = getInt64(sp + 16);
                  const n = this.mem.getInt32(sp + 24, true);
                  globalThis.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
                },
                "runtime.resetMemoryDataView": (sp) => {
                  sp >>>= 0;
                  this.mem = new DataView(this._inst.exports.mem.buffer);
                },
                "runtime.nanotime1": (sp) => {
                  sp >>>= 0;
                  setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);
                },
                "runtime.walltime": (sp) => {
                  sp >>>= 0;
                  const msec = new Date().getTime();
                  setInt64(sp + 8, msec / 1e3);
                  this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);
                },
                "runtime.scheduleTimeoutEvent": (sp) => {
                  sp >>>= 0;
                  const id = this._nextCallbackTimeoutID;
                  this._nextCallbackTimeoutID++;
                  this._scheduledTimeouts.set(id, setTimeout(
                    () => {
                      this._resume();
                      while (this._scheduledTimeouts.has(id)) {
                        console.warn("scheduleTimeoutEvent: missed timeout event");
                        this._resume();
                      }
                    },
                    getInt64(sp + 8) + 1
                  ));
                  this.mem.setInt32(sp + 16, id, true);
                },
                "runtime.clearTimeoutEvent": (sp) => {
                  sp >>>= 0;
                  const id = this.mem.getInt32(sp + 8, true);
                  clearTimeout(this._scheduledTimeouts.get(id));
                  this._scheduledTimeouts.delete(id);
                },
                "runtime.getRandomData": (sp) => {
                  sp >>>= 0;
                  crypto.getRandomValues(loadSlice(sp + 8));
                },
                "syscall/js.finalizeRef": (sp) => {
                  sp >>>= 0;
                  const id = this.mem.getUint32(sp + 8, true);
                  this._goRefCounts[id]--;
                  if (this._goRefCounts[id] === 0) {
                    const v = this._values[id];
                    this._values[id] = null;
                    this._ids.delete(v);
                    this._idPool.push(id);
                  }
                },
                "syscall/js.stringVal": (sp) => {
                  sp >>>= 0;
                  storeValue(sp + 24, loadString(sp + 8));
                },
                "syscall/js.valueGet": (sp) => {
                  sp >>>= 0;
                  const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));
                  sp = this._inst.exports.getsp() >>> 0;
                  storeValue(sp + 32, result);
                },
                "syscall/js.valueSet": (sp) => {
                  sp >>>= 0;
                  Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));
                },
                "syscall/js.valueDelete": (sp) => {
                  sp >>>= 0;
                  Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));
                },
                "syscall/js.valueIndex": (sp) => {
                  sp >>>= 0;
                  storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));
                },
                "syscall/js.valueSetIndex": (sp) => {
                  sp >>>= 0;
                  Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));
                },
                "syscall/js.valueCall": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const m = Reflect.get(v, loadString(sp + 16));
                    const args = loadSliceOfValues(sp + 32);
                    const result = Reflect.apply(m, v, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 56, result);
                    this.mem.setUint8(sp + 64, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 56, err);
                    this.mem.setUint8(sp + 64, 0);
                  }
                },
                "syscall/js.valueInvoke": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const args = loadSliceOfValues(sp + 16);
                    const result = Reflect.apply(v, void 0, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, result);
                    this.mem.setUint8(sp + 48, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, err);
                    this.mem.setUint8(sp + 48, 0);
                  }
                },
                "syscall/js.valueNew": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const args = loadSliceOfValues(sp + 16);
                    const result = Reflect.construct(v, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, result);
                    this.mem.setUint8(sp + 48, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, err);
                    this.mem.setUint8(sp + 48, 0);
                  }
                },
                "syscall/js.valueLength": (sp) => {
                  sp >>>= 0;
                  setInt64(sp + 16, parseInt(loadValue(sp + 8).length));
                },
                "syscall/js.valuePrepareString": (sp) => {
                  sp >>>= 0;
                  const str = encoder.encode(String(loadValue(sp + 8)));
                  storeValue(sp + 16, str);
                  setInt64(sp + 24, str.length);
                },
                "syscall/js.valueLoadString": (sp) => {
                  sp >>>= 0;
                  const str = loadValue(sp + 8);
                  loadSlice(sp + 16).set(str);
                },
                "syscall/js.valueInstanceOf": (sp) => {
                  sp >>>= 0;
                  this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);
                },
                "syscall/js.copyBytesToGo": (sp) => {
                  sp >>>= 0;
                  const dst = loadSlice(sp + 8);
                  const src = loadValue(sp + 32);
                  if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(sp + 48, 0);
                    return;
                  }
                  const toCopy = src.subarray(0, dst.length);
                  dst.set(toCopy);
                  setInt64(sp + 40, toCopy.length);
                  this.mem.setUint8(sp + 48, 1);
                },
                "syscall/js.copyBytesToJS": (sp) => {
                  sp >>>= 0;
                  const dst = loadValue(sp + 8);
                  const src = loadSlice(sp + 16);
                  if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(sp + 48, 0);
                    return;
                  }
                  const toCopy = src.subarray(0, dst.length);
                  dst.set(toCopy);
                  setInt64(sp + 40, toCopy.length);
                  this.mem.setUint8(sp + 48, 1);
                },
                "debug": (value) => {
                  console.log(value);
                }
              }
            };
          }
          run(instance) {
            return __async(this, null, function* () {
              if (!(instance instanceof WebAssembly.Instance)) {
                throw new Error("Go.run: WebAssembly.Instance expected");
              }
              this._inst = instance;
              this.mem = new DataView(this._inst.exports.mem.buffer);
              this._values = [
                NaN,
                0,
                null,
                true,
                false,
                globalThis,
                this
              ];
              this._goRefCounts = new Array(this._values.length).fill(Infinity);
              this._ids = /* @__PURE__ */ new Map([
                [0, 1],
                [null, 2],
                [true, 3],
                [false, 4],
                [globalThis, 5],
                [this, 6]
              ]);
              this._idPool = [];
              this.exited = false;
              let offset = 4096;
              const strPtr = (str) => {
                const ptr = offset;
                const bytes = encoder.encode(str + "\\0");
                new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);
                offset += bytes.length;
                if (offset % 8 !== 0) {
                  offset += 8 - offset % 8;
                }
                return ptr;
              };
              const argc = this.argv.length;
              const argvPtrs = [];
              this.argv.forEach((arg) => {
                argvPtrs.push(strPtr(arg));
              });
              argvPtrs.push(0);
              const keys = Object.keys(this.env).sort();
              keys.forEach((key) => {
                argvPtrs.push(strPtr(\`\${key}=\${this.env[key]}\`));
              });
              argvPtrs.push(0);
              const argv = offset;
              argvPtrs.forEach((ptr) => {
                this.mem.setUint32(offset, ptr, true);
                this.mem.setUint32(offset + 4, 0, true);
                offset += 8;
              });
              const wasmMinDataAddr = 4096 + 8192;
              if (offset >= wasmMinDataAddr) {
                throw new Error("total length of command line and environment variables exceeds limit");
              }
              this._inst.exports.run(argc, argv);
              if (this.exited) {
                this._resolveExitPromise();
              }
              yield this._exitPromise;
            });
          }
          _resume() {
            if (this.exited) {
              throw new Error("Go program has already exited");
            }
            this._inst.exports.resume();
            if (this.exited) {
              this._resolveExitPromise();
            }
          }
          _makeFuncWrapper(id) {
            const go = this;
            return function() {
              const event = { id, this: this, args: arguments };
              go._pendingEvent = event;
              go._resume();
              return event.result;
            };
          }
        };
      })();
      onmessage = ({ data: wasm }) => {
        let decoder = new TextDecoder();
        let fs = globalThis.fs;
        let stderr = "";
        fs.writeSync = (fd, buffer) => {
          if (fd === 1) {
            postMessage(buffer);
          } else if (fd === 2) {
            stderr += decoder.decode(buffer);
            let parts = stderr.split("\\n");
            if (parts.length > 1)
              console.log(parts.slice(0, -1).join("\\n"));
            stderr = parts[parts.length - 1];
          } else {
            throw new Error("Bad write");
          }
          return buffer.length;
        };
        let stdin = [];
        let resumeStdin;
        let stdinPos = 0;
        onmessage = ({ data }) => {
          if (data.length > 0) {
            stdin.push(data);
            if (resumeStdin)
              resumeStdin();
          }
        };
        fs.read = (fd, buffer, offset, length, position, callback) => {
          if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {
            throw new Error("Bad read");
          }
          if (stdin.length === 0) {
            resumeStdin = () => fs.read(fd, buffer, offset, length, position, callback);
            return;
          }
          let first = stdin[0];
          let count = Math.max(0, Math.min(length, first.length - stdinPos));
          buffer.set(first.subarray(stdinPos, stdinPos + count), offset);
          stdinPos += count;
          if (stdinPos === first.length) {
            stdin.shift();
            stdinPos = 0;
          }
          callback(null, count);
        };
        let go = new globalThis.Go();
        go.argv = ["", \`--service=\${"0.14.54"}\`];
        if (wasm instanceof WebAssembly.Module) {
          WebAssembly.instantiate(wasm, go.importObject).then((instance) => go.run(instance));
        } else {
          WebAssembly.instantiate(wasm, go.importObject).then(({ instance }) => go.run(instance));
        }
      };
      return (m) => onmessage(m);
    })(postMessage)`],{type:"text/javascript"});S=new Worker(URL.createObjectURL(A))}else{let A=(p=>{var W=(k,fe,be)=>new Promise((X,O)=>{var x=$=>{try{B(be.next($))}catch(re){O(re)}},E=$=>{try{B(be.throw($))}catch(re){O(re)}},B=$=>$.done?X($.value):Promise.resolve($.value).then(x,E);B((be=be.apply(k,fe)).next())});let ce,H={};for(let k=self;k;k=Object.getPrototypeOf(k))for(let fe of Object.getOwnPropertyNames(k))fe in H||Object.defineProperty(H,fe,{get:()=>self[fe]});return(()=>{const k=()=>{const X=new Error("not implemented");return X.code="ENOSYS",X};if(!H.fs){let X="";H.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(O,x){X+=be.decode(x);const E=X.lastIndexOf(`
`);return E!=-1&&(console.log(X.substr(0,E)),X=X.substr(E+1)),x.length},write(O,x,E,B,$,re){if(E!==0||B!==x.length||$!==null){re(k());return}const we=this.writeSync(O,x);re(null,we)},chmod(O,x,E){E(k())},chown(O,x,E,B){B(k())},close(O,x){x(k())},fchmod(O,x,E){E(k())},fchown(O,x,E,B){B(k())},fstat(O,x){x(k())},fsync(O,x){x(null)},ftruncate(O,x,E){E(k())},lchown(O,x,E,B){B(k())},link(O,x,E){E(k())},lstat(O,x){x(k())},mkdir(O,x,E){E(k())},open(O,x,E,B){B(k())},read(O,x,E,B,$,re){re(k())},readdir(O,x){x(k())},readlink(O,x){x(k())},rename(O,x,E){E(k())},rmdir(O,x){x(k())},stat(O,x){x(k())},symlink(O,x,E){E(k())},truncate(O,x,E){E(k())},unlink(O,x){x(k())},utimes(O,x,E,B){B(k())}}}if(H.process||(H.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw k()},pid:-1,ppid:-1,umask(){throw k()},cwd(){throw k()},chdir(){throw k()}}),!H.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!H.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!H.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!H.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");const fe=new TextEncoder("utf-8"),be=new TextDecoder("utf-8");H.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=a=>{a!==0&&console.warn("exit code:",a)},this._exitPromise=new Promise(a=>{this._resolveExitPromise=a}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;const X=(a,C)=>{this.mem.setUint32(a+0,C,!0),this.mem.setUint32(a+4,Math.floor(C/4294967296),!0)},O=a=>{const C=this.mem.getUint32(a+0,!0),J=this.mem.getInt32(a+4,!0);return C+J*4294967296},x=a=>{const C=this.mem.getFloat64(a,!0);if(C===0)return;if(!isNaN(C))return C;const J=this.mem.getUint32(a,!0);return this._values[J]},E=(a,C)=>{if(typeof C=="number"&&C!==0){if(isNaN(C)){this.mem.setUint32(a+4,2146959360,!0),this.mem.setUint32(a,0,!0);return}this.mem.setFloat64(a,C,!0);return}if(C===void 0){this.mem.setFloat64(a,0,!0);return}let y=this._ids.get(C);y===void 0&&(y=this._idPool.pop(),y===void 0&&(y=this._values.length),this._values[y]=C,this._goRefCounts[y]=0,this._ids.set(C,y)),this._goRefCounts[y]++;let w=0;switch(typeof C){case"object":C!==null&&(w=1);break;case"string":w=2;break;case"symbol":w=3;break;case"function":w=4;break}this.mem.setUint32(a+4,2146959360|w,!0),this.mem.setUint32(a,y,!0)},B=a=>{const C=O(a+0),J=O(a+8);return new Uint8Array(this._inst.exports.mem.buffer,C,J)},$=a=>{const C=O(a+0),J=O(a+8),y=new Array(J);for(let w=0;w<J;w++)y[w]=x(C+w*8);return y},re=a=>{const C=O(a+0),J=O(a+8);return be.decode(new DataView(this._inst.exports.mem.buffer,C,J))},we=Date.now()-performance.now();this.importObject={go:{"runtime.wasmExit":a=>{a>>>=0;const C=this.mem.getInt32(a+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(C)},"runtime.wasmWrite":a=>{a>>>=0;const C=O(a+8),J=O(a+16),y=this.mem.getInt32(a+24,!0);H.fs.writeSync(C,new Uint8Array(this._inst.exports.mem.buffer,J,y))},"runtime.resetMemoryDataView":a=>{a>>>=0,this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":a=>{a>>>=0,X(a+8,(we+performance.now())*1e6)},"runtime.walltime":a=>{a>>>=0;const C=new Date().getTime();X(a+8,C/1e3),this.mem.setInt32(a+16,C%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":a=>{a>>>=0;const C=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(C,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(C);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},O(a+8)+1)),this.mem.setInt32(a+16,C,!0)},"runtime.clearTimeoutEvent":a=>{a>>>=0;const C=this.mem.getInt32(a+8,!0);clearTimeout(this._scheduledTimeouts.get(C)),this._scheduledTimeouts.delete(C)},"runtime.getRandomData":a=>{a>>>=0,crypto.getRandomValues(B(a+8))},"syscall/js.finalizeRef":a=>{a>>>=0;const C=this.mem.getUint32(a+8,!0);if(this._goRefCounts[C]--,this._goRefCounts[C]===0){const J=this._values[C];this._values[C]=null,this._ids.delete(J),this._idPool.push(C)}},"syscall/js.stringVal":a=>{a>>>=0,E(a+24,re(a+8))},"syscall/js.valueGet":a=>{a>>>=0;const C=Reflect.get(x(a+8),re(a+16));a=this._inst.exports.getsp()>>>0,E(a+32,C)},"syscall/js.valueSet":a=>{a>>>=0,Reflect.set(x(a+8),re(a+16),x(a+32))},"syscall/js.valueDelete":a=>{a>>>=0,Reflect.deleteProperty(x(a+8),re(a+16))},"syscall/js.valueIndex":a=>{a>>>=0,E(a+24,Reflect.get(x(a+8),O(a+16)))},"syscall/js.valueSetIndex":a=>{a>>>=0,Reflect.set(x(a+8),O(a+16),x(a+24))},"syscall/js.valueCall":a=>{a>>>=0;try{const C=x(a+8),J=Reflect.get(C,re(a+16)),y=$(a+32),w=Reflect.apply(J,C,y);a=this._inst.exports.getsp()>>>0,E(a+56,w),this.mem.setUint8(a+64,1)}catch(C){a=this._inst.exports.getsp()>>>0,E(a+56,C),this.mem.setUint8(a+64,0)}},"syscall/js.valueInvoke":a=>{a>>>=0;try{const C=x(a+8),J=$(a+16),y=Reflect.apply(C,void 0,J);a=this._inst.exports.getsp()>>>0,E(a+40,y),this.mem.setUint8(a+48,1)}catch(C){a=this._inst.exports.getsp()>>>0,E(a+40,C),this.mem.setUint8(a+48,0)}},"syscall/js.valueNew":a=>{a>>>=0;try{const C=x(a+8),J=$(a+16),y=Reflect.construct(C,J);a=this._inst.exports.getsp()>>>0,E(a+40,y),this.mem.setUint8(a+48,1)}catch(C){a=this._inst.exports.getsp()>>>0,E(a+40,C),this.mem.setUint8(a+48,0)}},"syscall/js.valueLength":a=>{a>>>=0,X(a+16,parseInt(x(a+8).length))},"syscall/js.valuePrepareString":a=>{a>>>=0;const C=fe.encode(String(x(a+8)));E(a+16,C),X(a+24,C.length)},"syscall/js.valueLoadString":a=>{a>>>=0;const C=x(a+8);B(a+16).set(C)},"syscall/js.valueInstanceOf":a=>{a>>>=0,this.mem.setUint8(a+24,x(a+8)instanceof x(a+16)?1:0)},"syscall/js.copyBytesToGo":a=>{a>>>=0;const C=B(a+8),J=x(a+32);if(!(J instanceof Uint8Array||J instanceof Uint8ClampedArray)){this.mem.setUint8(a+48,0);return}const y=J.subarray(0,C.length);C.set(y),X(a+40,y.length),this.mem.setUint8(a+48,1)},"syscall/js.copyBytesToJS":a=>{a>>>=0;const C=x(a+8),J=B(a+16);if(!(C instanceof Uint8Array||C instanceof Uint8ClampedArray)){this.mem.setUint8(a+48,0);return}const y=J.subarray(0,C.length);C.set(y),X(a+40,y.length),this.mem.setUint8(a+48,1)},debug:a=>{console.log(a)}}}}run(X){return W(this,null,function*(){if(!(X instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=X,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,H,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[H,5],[this,6]]),this._idPool=[],this.exited=!1;let O=4096;const x=a=>{const C=O,J=fe.encode(a+"\0");return new Uint8Array(this.mem.buffer,O,J.length).set(J),O+=J.length,O%8!==0&&(O+=8-O%8),C},E=this.argv.length,B=[];this.argv.forEach(a=>{B.push(x(a))}),B.push(0),Object.keys(this.env).sort().forEach(a=>{B.push(x(`${a}=${this.env[a]}`))}),B.push(0);const re=O;B.forEach(a=>{this.mem.setUint32(O,a,!0),this.mem.setUint32(O+4,0,!0),O+=8});const we=4096+8192;if(O>=we)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(E,re),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(X){const O=this;return function(){const x={id:X,this:this,args:arguments};return O._pendingEvent=x,O._resume(),x.result}}}})(),ce=({data:k})=>{let fe=new TextDecoder,be=H.fs,X="";be.writeSync=($,re)=>{if($===1)p(re);else if($===2){X+=fe.decode(re);let we=X.split(`
`);we.length>1&&console.log(we.slice(0,-1).join(`
`)),X=we[we.length-1]}else throw new Error("Bad write");return re.length};let O=[],x,E=0;ce=({data:$})=>{$.length>0&&(O.push($),x&&x())},be.read=($,re,we,a,C,J)=>{if($!==0||we!==0||a!==re.length||C!==null)throw new Error("Bad read");if(O.length===0){x=()=>be.read($,re,we,a,C,J);return}let y=O[0],w=Math.max(0,Math.min(a,y.length-E));re.set(y.subarray(E,E+w),we),E+=w,E===y.length&&(O.shift(),E=0),J(null,w)};let B=new H.Go;B.argv=["","--service=0.14.54"],k instanceof WebAssembly.Module?WebAssembly.instantiate(k,B.importObject).then($=>B.run($)):WebAssembly.instantiate(k,B.importObject).then(({instance:$})=>B.run($))},k=>ce(k)})(p=>S.onmessage({data:p}));S={onmessage:null,postMessage:p=>setTimeout(()=>A({data:p})),terminate(){}}}S.postMessage(m),S.onmessage=({data:A})=>T(A);let{readFromStdout:T,service:v}=cn({writeToStdin(A){S.postMessage(A)},isSync:!1,isWriteUnavailable:!0,esbuild:Be});_t={build:A=>new Promise((p,W)=>v.buildOrServe({callName:"build",refs:null,serveOptions:null,options:A,isTTY:!1,defaultWD:"/",callback:(ce,H)=>ce?W(ce):p(H)})),transform:(A,p)=>new Promise((W,ce)=>v.transform({callName:"transform",refs:null,input:A,options:p||{},isTTY:!1,fs:{readFile(H,k){k(new Error("Internal error"),null)},writeFile(H,k){k(null)}},callback:(H,k)=>H?ce(H):W(k)})),formatMessages:(A,p)=>new Promise((W,ce)=>v.formatMessages({callName:"formatMessages",refs:null,messages:A,options:p,callback:(H,k)=>H?ce(H):W(k)})),analyzeMetafile:(A,p)=>new Promise((W,ce)=>v.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof A=="string"?A:JSON.stringify(A),options:p,callback:(H,k)=>H?ce(H):W(k)}))}}),Kt=Be})(Qe)},54610:function(Qe){var ke=1e3,Ce=ke*60,$e=Ce*60,Ie=$e*24,f=Ie*7,at=Ie*365.25;Qe.exports=function(G,oe){oe=oe||{};var Se=typeof G;if(Se==="string"&&G.length>0)return I(G);if(Se==="number"&&isFinite(G))return oe.long?et(G):ze(G);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(G))};function I(G){if(G=String(G),!(G.length>100)){var oe=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(G);if(oe){var Se=parseFloat(oe[1]),tt=(oe[2]||"ms").toLowerCase();switch(tt){case"years":case"year":case"yrs":case"yr":case"y":return Se*at;case"weeks":case"week":case"w":return Se*f;case"days":case"day":case"d":return Se*Ie;case"hours":case"hour":case"hrs":case"hr":case"h":return Se*$e;case"minutes":case"minute":case"mins":case"min":case"m":return Se*Ce;case"seconds":case"second":case"secs":case"sec":case"s":return Se*ke;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return Se;default:return}}}}function ze(G){var oe=Math.abs(G);return oe>=Ie?Math.round(G/Ie)+"d":oe>=$e?Math.round(G/$e)+"h":oe>=Ce?Math.round(G/Ce)+"m":oe>=ke?Math.round(G/ke)+"s":G+"ms"}function et(G){var oe=Math.abs(G);return oe>=Ie?le(G,oe,Ie,"day"):oe>=$e?le(G,oe,$e,"hour"):oe>=Ce?le(G,oe,Ce,"minute"):oe>=ke?le(G,oe,ke,"second"):G+" ms"}function le(G,oe,Se,tt){var K=oe>=Se*1.5;return Math.round(G/Se)+" "+tt+(K?"s":"")}},71803:function(Qe,ke,Ce){"use strict";Ce.d(ke,{XQ:function(){return Jr},cY:function(){return Or},Ik:function(){return jn}});var $e=Ce(66726),Ie=Ce(33417),f=Ce(57689),at=Ce(97326);function I(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ze(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,o)}return n}function et(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?ze(Object(n),!0).forEach(function(o){I(e,o,n[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ze(Object(n)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(n,o))})}return e}function le(e,t){if(e==null)return{};var n={},o=Object.keys(e),r,u;for(u=0;u<o.length;u++)r=o[u],!(t.indexOf(r)>=0)&&(n[r]=e[r]);return n}function G(e,t){if(e==null)return{};var n=le(e,t),o,r;if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(r=0;r<u.length;r++)o=u[r],!(t.indexOf(o)>=0)&&Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}function oe(e,t){return Se(e)||tt(e,t)||K(e,t)||je()}function Se(e){if(Array.isArray(e))return e}function tt(e,t){if(!(typeof Symbol=="undefined"||!(Symbol.iterator in Object(e)))){var n=[],o=!0,r=!1,u=void 0;try{for(var h=e[Symbol.iterator](),g;!(o=(g=h.next()).done)&&(n.push(g.value),!(t&&n.length===t));o=!0);}catch(_){r=!0,u=_}finally{try{!o&&h.return!=null&&h.return()}finally{if(r)throw u}}return n}}function K(e,t){if(e){if(typeof e=="string")return ie(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ie(e,t)}}function ie(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function je(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function wt(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function rt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,o)}return n}function Be(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?rt(Object(n),!0).forEach(function(o){wt(e,o,n[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):rt(Object(n)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(n,o))})}return e}function mt(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(o){return t.reduceRight(function(r,u){return u(r)},o)}}function Re(e){return function t(){for(var n=this,o=arguments.length,r=new Array(o),u=0;u<o;u++)r[u]=arguments[u];return r.length>=e.length?e.apply(this,r):function(){for(var h=arguments.length,g=new Array(h),_=0;_<h;_++)g[_]=arguments[_];return t.apply(n,[].concat(r,g))}}}function it(e){return{}.toString.call(e).includes("Object")}function Me(e){return!Object.keys(e).length}function Je(e){return typeof e=="function"}function St(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function ut(e,t){return it(t)||nt("changeType"),Object.keys(t).some(function(n){return!St(e,n)})&&nt("changeField"),t}function jt(e){Je(e)||nt("selectorType")}function ft(e){Je(e)||it(e)||nt("handlerType"),it(e)&&Object.values(e).some(function(t){return!Je(t)})&&nt("handlersType")}function ve(e){e||nt("initialIsRequired"),it(e)||nt("initialType"),Me(e)&&nt("initialContent")}function Pt(e,t){throw new Error(e[t]||e.default)}var M={initialIsRequired:"initial state is required",initialType:"initial state should be an object",initialContent:"initial state shouldn't be an empty object",handlerType:"handler should be an object or a function",handlersType:"all handlers should be a functions",selectorType:"selector should be a function",changeType:"provided value of changes should be an object",changeField:'it seams you want to change a field in the state which is not specified in the "initial" state',default:"an unknown error accured in `state-local` package"},nt=Re(Pt)(M),lt={changes:ut,selector:jt,handler:ft,initial:ve};function Nt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};lt.initial(e),lt.handler(t);var n={current:e},o=Re(nn)(n,t),r=Re(st)(n),u=Re(lt.changes)(e),h=Re(Fe)(n);function g(){var j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(Q){return Q};return lt.selector(j),j(n.current)}function _(j){mt(o,r,u,h)(j)}return[g,_]}function Fe(e,t){return Je(t)?t(e.current):t}function st(e,t){return e.current=Be(Be({},e.current),t),t}function nn(e,t,n){return Je(t)?t(e.current):Object.keys(n).forEach(function(o){var r;return(r=t[o])===null||r===void 0?void 0:r.call(t,e.current[o])}),n}var rn={create:Nt},Vt=rn,zt={paths:{vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs"}},sn=zt;function on(e){return function t(){for(var n=this,o=arguments.length,r=new Array(o),u=0;u<o;u++)r[u]=arguments[u];return r.length>=e.length?e.apply(this,r):function(){for(var h=arguments.length,g=new Array(h),_=0;_<h;_++)g[_]=arguments[_];return t.apply(n,[].concat(r,g))}}}var Bt=on;function c(e){return{}.toString.call(e).includes("Object")}var Ne=c;function an(e){return e||Ht("configIsRequired"),Ne(e)||Ht("configType"),e.urls?(Wt(),{paths:{vs:e.urls.monacoBase}}):e}function Wt(){console.warn(Ut.deprecation)}function $t(e,t){throw new Error(e[t]||e.default)}var Ut={configIsRequired:"the configuration object is required",configType:"the configuration object should be an object",default:"an unknown error accured in `@monaco-editor/loader` package",deprecation:`Deprecation warning!
    You are using deprecated way of configuration.

    Instead of using
      monaco.config({ urls: { monacoBase: '...' } })
    use
      monaco.config({ paths: { vs: '...' } })

    For more please check the link https://github.com/suren-atoyan/monaco-loader#config
  `},Ht=Bt($t)(Ut),ln={config:an},cn=ln,Jt=function(){for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];return function(r){return n.reduceRight(function(u,h){return h(u)},r)}},Tt=Jt;function gt(e,t){return Object.keys(t).forEach(function(n){t[n]instanceof Object&&e[n]&&Object.assign(t[n],gt(e[n],t[n]))}),et(et({},e),t)}var qt=gt,yt={type:"cancelation",msg:"operation is manually canceled"};function dt(e){var t=!1,n=new Promise(function(o,r){e.then(function(u){return t?r(yt):o(u)}),e.catch(r)});return n.cancel=function(){return t=!0},n}var At=dt,pt=Vt.create({config:sn,isInitialized:!1,resolve:null,reject:null,monaco:null}),xt=oe(pt,2),kt=xt[0],Rt=xt[1];function un(e){var t=cn.config(e),n=t.monaco,o=G(t,["monaco"]);Rt(function(r){return{config:qt(r.config,o),monaco:n}})}function fn(){var e=kt(function(t){var n=t.monaco,o=t.isInitialized,r=t.resolve;return{monaco:n,isInitialized:o,resolve:r}});if(!e.isInitialized){if(Rt({isInitialized:!0}),e.monaco)return e.resolve(e.monaco),At(Lt);if(window.monaco&&window.monaco.editor)return Gt(window.monaco),e.resolve(window.monaco),At(Lt);Tt(dn,mn)(gn)}return At(Lt)}function dn(e){return document.body.appendChild(e)}function hn(e){var t=document.createElement("script");return e&&(t.src=e),t}function mn(e){var t=kt(function(o){var r=o.config,u=o.reject;return{config:r,reject:u}}),n=hn("".concat(t.config.paths.vs,"/loader.js"));return n.onload=function(){return e()},n.onerror=t.reject,n}function gn(){var e=kt(function(n){var o=n.config,r=n.resolve,u=n.reject;return{config:o,resolve:r,reject:u}}),t=window.require;t.config(e.config),t(["vs/editor/editor.main"],function(n){Gt(n),e.resolve(n)},function(n){e.reject(n)})}function Gt(e){kt().monaco||Rt({monaco:e})}function pn(){return kt(function(e){var t=e.monaco;return t})}var Lt=new Promise(function(e,t){return Rt({resolve:e,reject:t})}),bt={config:un,init:fn,__getMonacoInstance:pn},_t=bt,Ft=Object.defineProperty,vn=Object.defineProperties,wn=Object.getOwnPropertyDescriptors,Kt=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,l=(e,t,n)=>t in e?Ft(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||(t={}))i.call(t,n)&&l(e,n,t[n]);if(Kt)for(var n of Kt(t))s.call(t,n)&&l(e,n,t[n]);return e},S=(e,t)=>vn(e,wn(t)),T={esbuildWasmPath:"https://cdn.jsdelivr.net/npm/esbuild-wasm@latest"},v=e=>{Object.assign(T,e)};function A(e){if(typeof e!="string")throw new TypeError(`Path must be a string. Received ${JSON.stringify(e)}`)}var p=46,W=47;function ce(e,t,n,o){let r="",u=0,h=-1,g=0,_;for(let j=0,Q=e.length;j<=Q;++j){if(j<Q)_=e.charCodeAt(j);else{if(o(_))break;_=W}if(o(_)){if(!(h===j-1||g===1))if(h!==j-1&&g===2){if(r.length<2||u!==2||r.charCodeAt(r.length-1)!==p||r.charCodeAt(r.length-2)!==p){if(r.length>2){const N=r.lastIndexOf(n);N===-1?(r="",u=0):(r=r.slice(0,N),u=r.length-1-r.lastIndexOf(n)),h=j,g=0;continue}else if(r.length===2||r.length===1){r="",u=0,h=j,g=0;continue}}t&&(r.length>0?r+=`${n}..`:r="..",u=2)}else r.length>0?r+=n+e.slice(h+1,j):r=e.slice(h+1,j),u=j-h-1;h=j,g=0}else _===p&&g!==-1?++g:g=-1}return r}function H(e){return e===W}function k(e){if(A(e),e.length===0)return".";const t=e.charCodeAt(0)===W,n=e.charCodeAt(e.length-1)===W;return e=ce(e,!t,"/",H),e.length===0&&!t&&(e="."),e.length>0&&n&&(e+="/"),t?`/${e}`:e}function fe(...e){if(e.length===0)return".";let t;for(let n=0,o=e.length;n<o;++n){const r=e[n];A(r),r.length>0&&(t?t+=`/${r}`:t=r)}return t?k(t):"."}function be(e){const t=/(\.[a-zA-Z0-9]+)$/.exec(e);return t?t[1]:""}function X(e,...t){var n;const o=new URL(e,(n=globalThis.location)==null?void 0:n.origin);return o.pathname=fe(o.pathname,...t),o.toString()}var O=e=>{const t=be(e);if(t===".js"||t===".jsx"||t===".ts"||t===".tsx")return"tsx";if(t===".json")return"json";if(t===".css")return"css";throw new Error(`File format not supported for ${e}`)},x=e=>{const t=O(e);return t==="tsx"?"typescript":t},E="-ms-",B="-moz-",$="-webkit-",re="comm",we="rule",a="decl",C="@import",J="@keyframes",y=Math.abs,w=String.fromCharCode,b=Object.assign;function R(e,t){return(((t<<2^q(e,0))<<2^q(e,1))<<2^q(e,2))<<2^q(e,3)}function ae(e){return e.trim()}function U(e,t){return(e=t.exec(e))?e[0]:e}function P(e,t,n){return e.replace(t,n)}function ne(e,t){return e.indexOf(t)}function q(e,t){return e.charCodeAt(t)|0}function ee(e,t,n){return e.slice(t,n)}function V(e){return e.length}function me(e){return e.length}function te(e,t){return t.push(e),e}function ge(e,t){return e.map(t).join("")}var ye=1,De=1,se=0,F=0,d=0,D="";function pe(e,t,n,o,r,u,h){return{value:e,root:t,parent:n,type:o,props:r,children:u,line:ye,column:De,length:h,return:""}}function xe(e,t){return b(pe("",null,null,"",null,null,0),e,{length:-e.length},t)}function z(){return d}function L(){return d=F>0?q(D,--F):0,De--,d===10&&(De=1,ye--),d}function Y(){return d=F<se?q(D,F++):0,De++,d===10&&(De=1,ye++),d}function Z(){return q(D,F)}function Te(){return F}function Ee(e,t){return ee(D,e,t)}function Pe(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function qe(e){return ye=De=1,se=V(D=e),F=0,[]}function Le(e){return D="",e}function de(e){return ae(Ee(F-1,_e(e===91?e+2:e===40?e+1:e)))}function Ue(e){for(;(d=Z())&&d<33;)Y();return Pe(e)>2||Pe(d)>3?"":" "}function We(e,t){for(;--t&&Y()&&!(d<48||d>102||d>57&&d<65||d>70&&d<97););return Ee(e,Te()+(t<6&&Z()==32&&Y()==32))}function _e(e){for(;Y();)switch(d){case e:return F;case 34:case 39:e!==34&&e!==39&&_e(d);break;case 40:e===41&&_e(e);break;case 92:Y();break}return F}function ct(e,t){for(;Y()&&e+d!==47+10;)if(e+d===42+42&&Z()===47)break;return"/*"+Ee(t,F-1)+"*"+w(e===47?e:Y())}function Ge(e){for(;!Pe(Z());)Y();return Ee(e,F)}function Ze(e){return Le(Dt("",null,null,null,[""],e=qe(e),0,[0],e))}function Dt(e,t,n,o,r,u,h,g,_){for(var j=0,Q=0,N=h,he=0,Ke=0,He=0,ue=1,ht=1,Ve=1,Ae=0,ot="",Ct=r,vt=u,Ye=o,Oe=ot;ht;)switch(He=Ae,Ae=Y()){case 40:if(He!=108&&Oe.charCodeAt(N-1)==58){ne(Oe+=P(de(Ae),"&","&\f"),"&\f")!=-1&&(Ve=-1);break}case 34:case 39:case 91:Oe+=de(Ae);break;case 9:case 10:case 13:case 32:Oe+=Ue(He);break;case 92:Oe+=We(Te()-1,7);continue;case 47:switch(Z()){case 42:case 47:te(yn(ct(Y(),Te()),t,n),_);break;default:Oe+="/"}break;case 123*ue:g[j++]=V(Oe)*Ve;case 125*ue:case 59:case 0:switch(Ae){case 0:case 125:ht=0;case 59+Q:Ke>0&&V(Oe)-N&&te(Ke>32?Tn(Oe+";",o,n,N-1):Tn(P(Oe," ","")+";",o,n,N-2),_);break;case 59:Oe+=";";default:if(te(Ye=It(Oe,t,n,j,Q,r,g,ot,Ct=[],vt=[],N),u),Ae===123)if(Q===0)Dt(Oe,t,Ye,Ye,Ct,u,N,g,vt);else switch(he){case 100:case 109:case 115:Dt(e,Ye,Ye,o&&te(It(e,Ye,Ye,0,0,r,g,ot,r,Ct=[],N),vt),r,vt,N,g,o?Ct:vt);break;default:Dt(Oe,Ye,Ye,Ye,[""],vt,0,g,vt)}}j=Q=Ke=0,ue=Ve=1,ot=Oe="",N=h;break;case 58:N=1+V(Oe),Ke=He;default:if(ue<1){if(Ae==123)--ue;else if(Ae==125&&ue++==0&&L()==125)continue}switch(Oe+=w(Ae),Ae*ue){case 38:Ve=Q>0?1:(Oe+="\f",-1);break;case 44:g[j++]=(V(Oe)-1)*Ve,Ve=1;break;case 64:Z()===45&&(Oe+=de(Y())),he=Z(),Q=N=V(ot=Oe+=Ge(Te())),Ae++;break;case 45:He===45&&V(Oe)==2&&(ue=0)}}return u}function It(e,t,n,o,r,u,h,g,_,j,Q){for(var N=r-1,he=r===0?u:[""],Ke=me(he),He=0,ue=0,ht=0;He<o;++He)for(var Ve=0,Ae=ee(e,N+1,N=y(ue=h[He])),ot=e;Ve<Ke;++Ve)(ot=ae(ue>0?he[Ve]+" "+Ae:P(Ae,/&\f/g,he[Ve])))&&(_[ht++]=ot);return pe(e,t,n,r===0?we:g,_,j,Q)}function yn(e,t,n){return pe(e,t,n,re,w(z()),ee(e,2,-2),0)}function Tn(e,t,n,o){return pe(e,t,n,a,ee(e,0,o),ee(e,o+1,-1),o)}function An(e,t,n){switch(R(e,t)){case 5103:return $+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return $+e+e;case 4789:return B+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return $+e+B+e+E+e+e;case 6828:case 4268:return $+e+E+e+e;case 6165:return $+e+E+"flex-"+e+e;case 5187:return $+e+P(e,/(\w+).+(:[^]+)/,$+"box-$1$2"+E+"flex-$1$2")+e;case 5443:return $+e+E+"flex-item-"+P(e,/flex-|-self/g,"")+(U(e,/flex-|baseline/)?"":E+"grid-row-"+P(e,/flex-|-self/g,""))+e;case 4675:return $+e+E+"flex-line-pack"+P(e,/align-content|flex-|-self/g,"")+e;case 5548:return $+e+E+P(e,"shrink","negative")+e;case 5292:return $+e+E+P(e,"basis","preferred-size")+e;case 6060:return $+"box-"+P(e,"-grow","")+$+e+E+P(e,"grow","positive")+e;case 4554:return $+P(e,/([^-])(transform)/g,"$1"+$+"$2")+e;case 6187:return P(P(P(e,/(zoom-|grab)/,$+"$1"),/(image-set)/,$+"$1"),e,"")+e;case 5495:case 3959:return P(e,/(image-set\([^]*)/,$+"$1$`$1");case 4968:return P(P(e,/(.+:)(flex-)?(.*)/,$+"box-pack:$3"+E+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+$+e+e;case 4200:if(!U(e,/flex-|baseline/))return E+"grid-column-align"+ee(e,t)+e;break;case 2592:case 3360:return E+P(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(o,r){return t=r,U(o.props,/grid-\w+-end/)})?~ne(e+(n=n[t].value),"span")?e:E+P(e,"-start","")+e+E+"grid-row-span:"+(~ne(n,"span")?U(n,/\d+/):+U(n,/\d+/)-+U(e,/\d+/))+";":E+P(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(o){return U(o.props,/grid-\w+-start/)})?e:E+P(P(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return P(e,/(.+)-inline(.+)/,$+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(V(e)-1-t>6)switch(q(e,t+1)){case 109:if(q(e,t+4)!==45)break;case 102:return P(e,/(.+:)(.+)-([^]+)/,"$1"+$+"$2-$3$1"+B+(q(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~ne(e,"stretch")?An(P(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return P(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(o,r,u,h,g,_,j){return E+r+":"+u+j+(h?E+r+"-span:"+(g?_:+_-+u)+j:"")+e});case 4949:if(q(e,t+6)===121)return P(e,":",":"+$)+e;break;case 6444:switch(q(e,q(e,14)===45?18:11)){case 120:return P(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+$+(q(e,14)===45?"inline-":"")+"box$3$1"+$+"$2$3$1"+E+"$2box$3")+e;case 100:return P(e,":",":"+E)+e}break;case 5936:switch(q(e,t+11)){case 114:return $+e+E+P(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return $+e+E+P(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return $+e+E+P(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 2903:return $+e+E+e+e;case 5719:case 2647:case 2135:case 3927:case 2391:return P(e,"scroll-","scroll-snap-")+e}return e}function Et(e,t){for(var n="",o=me(e),r=0;r<o;r++)n+=t(e[r],r,e,t)||"";return n}function bn(e,t,n,o){switch(e.type){case C:case a:return e.return=e.return||e.value;case re:return"";case J:return e.return=e.value+"{"+Et(e.children,o)+"}";case we:e.value=e.props.join(",")}return V(n=Et(e.children,o))?e.return=e.value+"{"+n+"}":""}function En(e){var t=me(e);return function(n,o,r,u){for(var h="",g=0;g<t;g++)h+=e[g](n,o,r,u)||"";return h}}function Rn(e,t,n,o){if(e.length>-1&&!e.return)switch(e.type){case a:e.return=An(e.value,e.length,n);return;case J:return Et([xe(e,{value:P(e.value,"@","@"+$)})],o);case we:if(e.length)return ge(e.props,function(r){switch(U(r,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Et([xe(e,{props:[P(r,/:(read-\w+)/,":"+B+"$1")]})],o);case"::placeholder":return Et([xe(e,{props:[P(r,/:(plac\w+)/,":"+$+"input-$1")]}),xe(e,{props:[P(r,/:(plac\w+)/,":"+B+"$1")]}),xe(e,{props:[P(r,/:(plac\w+)/,E+"input-$1")]})],o)}return""})}}var Yn=Ie("code-kitchen:bundler");function Cn(e,t){return`
  (function () {
    let styleEl = document.querySelector("[data-code-kitchen-style-id=${t}]");
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.setAttribute('data-code-kitchen-style-id', "${t}");
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = ${JSON.stringify(e)};
  })()
  `}function Zn(e,t){const n={},o=Et(Ze(e),En([r=>{r.length>-1&&r.type===we&&r.props&&(r.props=(Array.isArray(r.props)?[...r.props]:[r.props]).map(u=>u.replaceAll(/\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*/g,h=>{const g=h.slice(1);return n[g]||(n[g]=g+"_"+t),"."+n[g]})))},bn]));return{contents:`${Cn(o,t)}
    export default ${JSON.stringify(n)}`}}function Xn(e,t){const n=Et(Ze(`.${t}{${e}}`),En([Rn,bn]));return{contents:Cn(n,t)}}function Qn(e,t){const n=Et(Ze(e),En([Rn,bn]));return{contents:Cn(n,t)}}var xn=null,er=()=>Mt(this,null,function*(){try{xn||(xn=$e.initialize({wasmURL:X(T.esbuildWasmPath,"esbuild.wasm")})),yield xn}catch(e){if(!e.toString().includes('Cannot call "initialize" more than once'))throw e}});function tr(e){return $e.formatMessages(e,{kind:"error"}).then(t=>t.join(`

`))}var nr=class{constructor(){this.lines=new Set}log(e){this.lines.add(e)}clear(){this.lines.clear()}},Fn=new nr,rr=[".tsx",".ts",".jsx",".js",""],Dn="playground-input";function ir(e,t){return{name:"resolve",setup(n){n.onStart(()=>{Fn.clear()}),n.onEnd(()=>{Fn.clear()}),n.onResolve({filter:/.*/},o=>{if(/^https?:\/\//.test(o.path))throw new Error("importing HTTP modules is not supported");let r=e.find(u=>u.filename===o.path);if(!r&&o.path.startsWith("./")){for(const u of rr)if(r=e.find(h=>"./"+h.filename===o.path+u),r)break;if(!r)throw new Error(`'${o.path}' not found`)}return r?{path:r.filename,namespace:Dn}:{path:o.path,external:!0}}),n.onLoad({filter:/.*/,namespace:Dn},o=>Mt(this,null,function*(){const r=e.find(u=>u.filename===o.path);if(r)return/\.modules?.css$/.test(r.filename)?Zn(r.code,t):/\.global.css$/.test(r.filename)?Qn(r.code,t):/\.css$/.test(r.filename)?Xn(r.code,t):{contents:r.code,loader:O(r.filename)}}))}}}function sr(e,t){return Mt(this,null,function*(){if(!e.length||e.length===0||!t)return;let n="";try{return yield er(),(yield $e.build({entryPoints:[e[0].filename],format:"cjs",bundle:!0,plugins:[ir(e,t)],incremental:!0,treeShaking:!1,sourcemap:!1,target:"esnext"})).outputFiles.map(u=>u.text).join(`
`)}catch(o){if(o.errors?n=yield tr(o.errors):o instanceof Error?n=o.message:Yn(o),n)throw new Error(n)}})}var or=Ie("code-kitchen:bundler"),ar=(e,t,n)=>class extends f.Component{constructor(){super(...arguments),this.state={error:null}}componentDidCatch(r){n(r)}static getDerivedStateFromError(r){return{error:r}}render(){return this.state.error?null:f.createElement("div",{className:e,style:{display:"contents"}},typeof t=="function"?f.createElement(t,null):t)}},lr=(e,t)=>{const n=Object.keys(t),o=n.map(u=>t[u]);return new Function(...n,e)(...o)},cr=(e,{input:t,scope:n={}},o)=>{try{const r={exports:{}};lr(t,S(m({},n),{exports:r.exports,module:r,React:f}));const u=r.exports.default;return ar(e,u,o)}catch(r){o(r)}},ur=(e,t,n)=>{const[o,r]=f.useState(!1),[u,h]=f.useState(null),[g,_]=f.useState(null);return f.useEffect(()=>{let j=!1;const Q=performance.now();return r(!0),Mt(this,null,function*(){try{const N=yield sr(t,e);if(j||!N)return;r(!1),or(`Bundled code in ${(performance.now()-Q).toFixed()}ms: `,{bundledCode:N});const he=cr(e,{input:N,scope:{require:n}},_);he&&(_(null),h(()=>he))}catch(N){if(j)return;_(N)}}),()=>{j=!0}},[n,t,e]),f.useEffect(()=>()=>{var j;(j=document.querySelector(`[data-code-kitchen-style-id="${e}"]`))==null||j.remove()},[e]),{Preview:u,bundling:o,error:g}},In=Object.keys,fr=typeof WeakSet=="function";function Yt(e,t){return e===t||e!==e&&t!==t}function Mn(e){return e.constructor===Object||e.constructor==null}function Nn(e){return!!e&&typeof e.then=="function"}function Un(e){return!!(e&&e.$$typeof)}function dr(){var e=[];return{add:function(t){e.push(t)},has:function(t){return e.indexOf(t)!==-1}}}var hr=function(e){return e?function(){return new WeakSet}:dr}(fr);function Ln(e){return function(n){var o=e||n;return function(u,h,g,_,j,Q,N){N===void 0&&(N=hr());var he=!!u&&typeof u=="object",Ke=!!h&&typeof h=="object";if(he||Ke){var He=he&&N.has(u),ue=Ke&&N.has(h);if(He||ue)return He&&ue;he&&N.add(u),Ke&&N.add(h)}return o(u,h,N)}}}function mr(e,t,n,o){var r=e.length;if(t.length!==r)return!1;for(;r-- >0;)if(!n(e[r],t[r],r,r,e,t,o))return!1;return!0}function gr(e,t,n,o){var r=e.size===t.size;if(r&&e.size){var u={},h=0;e.forEach(function(g,_){if(r){var j=!1,Q=0;t.forEach(function(N,he){!j&&!u[Q]&&(j=n(_,he,h,Q,e,t,o)&&n(g,N,_,he,e,t,o),j&&(u[Q]=!0)),Q++}),h++,r=j}})}return r}var pr="_owner",vr=Function.prototype.bind.call(Function.prototype.call,Object.prototype.hasOwnProperty);function Vn(e,t,n,o){var r=In(e),u=r.length;if(In(t).length!==u)return!1;if(u)for(var h=void 0;u-- >0;){if(h=r[u],h===pr){var g=Un(e),_=Un(t);if((g||_)&&g!==_)return!1}if(!vr(t,h)||!n(e[h],t[h],h,h,e,t,o))return!1}return!0}function wr(e,t){return e.source===t.source&&e.global===t.global&&e.ignoreCase===t.ignoreCase&&e.multiline===t.multiline&&e.unicode===t.unicode&&e.sticky===t.sticky&&e.lastIndex===t.lastIndex}function yr(e,t,n,o){var r=e.size===t.size;if(r&&e.size){var u={};e.forEach(function(h,g){if(r){var _=!1,j=0;t.forEach(function(Q,N){!_&&!u[j]&&(_=n(h,Q,g,N,e,t,o),_&&(u[j]=!0)),j++}),r=_}})}return r}var br=typeof Map=="function",Er=typeof Set=="function",zn=Object.prototype.valueOf;function Zt(e){var t=typeof e=="function"?e(n):function(o,r,u,h,g,_,j){return n(o,r,j)};function n(o,r,u){if(o===r)return!0;if(o&&r&&typeof o=="object"&&typeof r=="object"){if(Mn(o)&&Mn(r))return Vn(o,r,t,u);var h=Array.isArray(o),g=Array.isArray(r);return h||g?h===g&&mr(o,r,t,u):(h=o instanceof Date,g=r instanceof Date,h||g?h===g&&Yt(o.getTime(),r.getTime()):(h=o instanceof RegExp,g=r instanceof RegExp,h||g?h===g&&wr(o,r):Nn(o)||Nn(r)?o===r:br&&(h=o instanceof Map,g=r instanceof Map,h||g)?h===g&&gr(o,r,t,u):Er&&(h=o instanceof Set,g=r instanceof Set,h||g)?h===g&&yr(o,r,t,u):o.valueOf!==zn||r.valueOf!==zn?Yt(o.valueOf(),r.valueOf()):Vn(o,r,t,u)))}return o!==o&&r!==r}return n}var kn=Zt(),Xr=Zt(function(){return Yt}),Qr=Zt(Ln()),ei=Zt(Ln(Yt)),Ot=Ie("code-kitchen:playground");function Bn(e){if(typeof e!="string")throw new TypeError(`Path must be a string. Received ${JSON.stringify(e)}`)}var _n=46,Xt=47;function Cr(e,t,n,o){let r="",u=0,h=-1,g=0,_;for(let j=0,Q=e.length;j<=Q;++j){if(j<Q)_=e.charCodeAt(j);else{if(o(_))break;_=Xt}if(o(_)){if(!(h===j-1||g===1))if(h!==j-1&&g===2){if(r.length<2||u!==2||r.charCodeAt(r.length-1)!==_n||r.charCodeAt(r.length-2)!==_n){if(r.length>2){const N=r.lastIndexOf(n);N===-1?(r="",u=0):(r=r.slice(0,N),u=r.length-1-r.lastIndexOf(n)),h=j,g=0;continue}else if(r.length===2||r.length===1){r="",u=0,h=j,g=0;continue}}t&&(r.length>0?r+=`${n}..`:r="..",u=2)}else r.length>0?r+=n+e.slice(h+1,j):r=e.slice(h+1,j),u=j-h-1;h=j,g=0}else _===_n&&g!==-1?++g:g=-1}return r}function xr(e){return e===Xt}function kr(e){if(Bn(e),e.length===0)return".";const t=e.charCodeAt(0)===Xt,n=e.charCodeAt(e.length-1)===Xt;return e=Cr(e,!t,"/",xr),e.length===0&&!t&&(e="."),e.length>0&&n&&(e+="/"),t?`/${e}`:e}function Wn(...e){if(e.length===0)return".";let t;for(let n=0,o=e.length;n<o;++n){const r=e[n];Bn(r),r.length>0&&(t?t+=`/${r}`:t=r)}return t?kr(t):"."}function _r(e,...t){var n;const o=new URL(e,(n=globalThis.location)==null?void 0:n.origin);return o.pathname=Wn(o.pathname,...t),o.toString()}var Hn={esbuildWasmPath:"https://cdn.jsdelivr.net/npm/esbuild-wasm@latest",monacoEditorPath:"https://cdn.jsdelivr.net/npm/monaco-editor@latest/min"},Or=e=>{Object.assign(Hn,e),v({esbuildWasmPath:e.esbuildWasmPath})},Sr="file:///",On=null,Sn=null;function jn(){const[e,t]=(0,f.useState)(On);return(0,f.useEffect)(()=>{Sn||(Sn=(()=>Mt(this,null,function*(){var n;Ot("useMonaco: initializing monaco"),_t.config({paths:{vs:_r(Hn.monacoEditorPath,"vs")}});const o=(n=_t.__getMonacoInstance())!=null?n:yield _t.init(),r=o.languages.typescript,u=r.typescriptDefaults,h=o.languages.typescript.javascriptDefaults,g={allowSyntheticDefaultImports:!0,target:r.ScriptTarget.ESNext,allowNonTsExtensions:!0,jsx:r.JsxEmit.Preserve,resolveJsonModule:!0,allowJs:!0,noImplicitThis:!0,module:r.ModuleKind.ES2015,baseUrl:Sr,moduleResolution:r.ModuleResolutionKind.NodeJs,noImplicitAny:!1,suppressImplicitAnyIndexErrors:!0};u.addExtraLib(`
        declare module '*.module.css' {
          const classes: { readonly [key: string]: string }
          export default classes
        }
        declare module '*.modules.css' {
          const classes: { readonly [key: string]: string }
          export default classes
        }
        declare module '*.json' {
          const data: { readonly [key: string]: string }
          export default data
        }
        `),r.javascriptDefaults.setDiagnosticsOptions({noSemanticValidation:!0,noSyntaxValidation:!1}),u.setDiagnosticsOptions({noSyntaxValidation:!1}),u.setEagerModelSync(!0),h.setEagerModelSync(!0),r.javascriptDefaults.setCompilerOptions(g),u.setCompilerOptions(g),On=o,Ot("useMonaco: monaco initialized")}))()),Sn.then(()=>{t(On)})},[]),e}function jr(e,t){const n=jn(),o=(0,f.useRef)(null),[r,u]=(0,f.useState)(0);return(0,f.useEffect)(()=>()=>{o.current&&(o.current.forEach(h=>h.dispose()),o.current=null)},[e]),(0,f.useEffect)(()=>{if(!n)return;const h=g=>n.Uri.file(Wn(e,g));if(o.current)o.current.forEach(g=>{var _;const j=(_=t.find(Q=>h(Q.filename).path===g.uri.path))==null?void 0:_.code;!g.isDisposed()&&g.getValue()!==j&&g.setValue(j!=null?j:"")});else{const g=t.map(_=>n.editor.createModel(_.code,x(_.filename),h(_.filename)));o.current=g,u(_=>_+1)}},[t,e,n]),o.current}function Pr(e,t,n,o,r,u){const h=jn(),g=jr(t,o),[_,j]=(0,f.useState)(null),[Q]=(0,f.useState)(()=>new Map);return(0,f.useEffect)(()=>{if(h&&n.current){const N=h.editor.create(n.current,{minimap:{enabled:!1},scrollBeyondLastLine:!1,automaticLayout:!0,smoothScrolling:!0,scrollbar:{alwaysConsumeMouseWheel:!0,handleMouseWheel:!1}});return j(N),window.__monaco_editors__&&(window.__monaco_editors__[e]=N),N.onDidFocusEditorText(()=>{N==null||N.updateOptions({scrollbar:{handleMouseWheel:!0}})}),N.onDidBlurEditorText(()=>{N==null||N.updateOptions({scrollbar:{handleMouseWheel:!1}})}),()=>{window.__monaco_editors__&&(window.__monaco_editors__[e]=void 0),N.dispose()}}},[e,h,n]),(0,f.useEffect)(()=>{const N=g==null?void 0:g.find(he=>he.uri.path.endsWith(u));if(_&&N&&!N.isDisposed()&&_.getModel()!==N){_.setModel(N);const he=_.onDidChangeModelContent(()=>{r(_.getValue(),u)});return Q.get(u)&&_.restoreViewState(Q.get(u)),()=>{Q.set(u,_.saveViewState()),he.dispose()}}},[u,_,g,r,Q]),_}function $r({id:e,internalId:t,initialFiles:n,files:o,onChange:r}){const u=o.filter(ue=>!ue.hidden).map(ue=>ue.filename),[h,g]=(0,f.useState)(u[0]),_=(0,f.useRef)(null),j=(0,f.useRef)(o);f.useLayoutEffect(()=>{j.current=o});const Q=(0,f.useCallback)((ue,ht)=>{const Ve=[...j.current],Ae=Ve.findIndex(ot=>ot.filename===ht);Ae!==-1&&(Ve[Ae]=S(m({},Ve[Ae]),{code:ue})),kn(Ve,j.current)||(Ot("tab #"+Ae+" changed"),r(Ve))},[r]),N=o.find(ue=>ue.filename===h),he=!kn(n,o),Ke=(0,f.useCallback)(()=>{r(n),Ot("reset")},[r,n]);(0,f.useEffect)(()=>{!N&&o&&(g(u[0]),Ot("change tab to "+u[0]))},[N,h,u,o]);const He=Pr(e,t,_,o,Q,h);return f.createElement("div",{className:"code-kitchen-files-editor-panel","data-dirty":he},f.createElement("div",{className:"code-kitchen-files-editor-panel-header"},f.createElement("div",{className:"code-kitchen-files-editor-panel-header-tabs"},u.map(ue=>f.createElement("div",{role:"button",key:ue,onClick:()=>g(ue),"data-active":h===ue?!0:void 0,className:"code-kitchen-files-editor-panel-header-tab"},ue))),f.createElement("div",{className:"code-kitchen-files-editor-panel-header-actions"},f.createElement("div",{role:"button",onClick:Ke,className:"code-kitchen-action-button","data-action":"reset"},"Reset"))),f.createElement("div",{className:`code-kitchen-monaco-editor-anchor ${He?"":"hidden"}`,ref:_}),!He&&f.createElement("div",{className:"code-kitchen-editor-loading-text"},"loading ..."))}var Jn=e=>f.createElement("svg",m({width:"1em",height:"1em",viewBox:"0 0 24 24"},e),f.createElement("path",{d:"M12 5v14h7V5h-7zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z",fill:"currentColor"})),Tr=e=>f.createElement(Jn,S(m({},e),{style:{transform:"rotate(-90deg)"}})),Ar=e=>f.createElement("svg",m({width:"1em",height:"1em",viewBox:"0 0 24 24"},e),f.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",fill:"currentColor"})),Rr=e=>f.createElement("svg",m({width:"1em",height:"1em",viewBox:"0 0 24 24"},e),f.createElement("path",{d:"M5 5h5v2H7v3H5V5m9 0h5v5h-2V7h-3V5m3 9h2v5h-5v-2h3v-3m-7 3v2H5v-5h2v3h3z",fill:"currentColor"})),Fr=e=>f.createElement("svg",m({width:"1em",height:"1em",viewBox:"0 0 24 24"},e),f.createElement("path",{d:"M14 14h5v2h-3v3h-2v-5m-9 0h5v5H8v-3H5v-2m3-9h2v5H5V8h3V5m11 3v2h-5V5h2v3h3z",fill:"currentColor"})),Dr=e=>f.createElement("svg",m({width:"1em",height:"1em",viewBox:"0 0 24 24"},e),f.createElement("path",{d:"M8.7 15.9L4.8 12l3.9-3.9a.984.984 0 0 0 0-1.4a.984.984 0 0 0-1.4 0l-4.59 4.59a.996.996 0 0 0 0 1.41l4.59 4.6c.39.39 1.01.39 1.4 0a.984.984 0 0 0 0-1.4zm6.6 0l3.9-3.9l-3.9-3.9a.984.984 0 0 1 0-1.4a.984.984 0 0 1 1.4 0l4.59 4.59c.39.39.39 1.02 0 1.41l-4.59 4.6a.984.984 0 0 1-1.4 0a.984.984 0 0 1 0-1.4z",fill:"currentColor"})),Ir=e=>f.createElement("svg",m({width:"1em",height:"1em",viewBox:"0 0 24 24"},e),f.createElement("path",{d:"M19.17 12l-3.88-3.88a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41l-2.88 2.88L17 14.17L19.17 12zM2.1 4.93l3.49 3.49l-2.88 2.88a.996.996 0 0 0 0 1.41L7.3 17.3a.996.996 0 1 0 1.41-1.41L4.83 12L7 9.83L19.07 21.9a.996.996 0 1 0 1.41-1.41L3.51 3.51a.996.996 0 0 0-1.41 0c-.39.4-.39 1.03 0 1.42z",fill:"currentColor"})),Mr=e=>f.createElement("svg",m({width:"1em",height:"1em",viewBox:"0 0 24 24"},e),f.createElement("path",{fill:"currentColor",d:"M21.707 3.707a1 1 0 0 0-1.414-1.414L18.496 4.09a4.252 4.252 0 0 0-5.251.604l-1.068 1.069a1.75 1.75 0 0 0 0 2.474l3.585 3.586a1.75 1.75 0 0 0 2.475 0l1.068-1.068a4.252 4.252 0 0 0 .605-5.25l1.797-1.798Zm-11 8a1 1 0 0 0-1.414-1.414l-1.47 1.47l-.293-.293a.75.75 0 0 0-1.06 0l-1.775 1.775a4.252 4.252 0 0 0-.605 5.25l-1.797 1.798a1 1 0 1 0 1.414 1.414l1.798-1.797a4.252 4.252 0 0 0 5.25-.605l1.775-1.775a.75.75 0 0 0 0-1.06l-.293-.293l1.47-1.47a1 1 0 0 0-1.414-1.414l-1.47 1.47l-1.586-1.586l1.47-1.47Z"})),Nr=e=>f.createElement("svg",m({width:"1em",height:"1em",viewBox:"0 0 20 20"},e),f.createElement("path",{fill:"currentColor",d:"M17.78 3.28a.75.75 0 0 0-1.06-1.06l-2.446 2.445a4.037 4.037 0 0 0-5.128.481l-.3.3a1.49 1.49 0 0 0 0 2.108l3.6 3.6a1.49 1.49 0 0 0 2.107 0l.3-.3a4.037 4.037 0 0 0 .482-5.128L17.78 3.28ZM7.554 8.846a1.49 1.49 0 0 0-2.107 0l-.3.3a4.037 4.037 0 0 0-.481 5.128L2.22 16.72a.75.75 0 1 0 1.06 1.06l2.446-2.446a4.037 4.037 0 0 0 5.128-.48l.3-.3a1.49 1.49 0 0 0 0-2.108l-3.6-3.6Z"})),qn=()=>Math.random().toString(36).replace(/[^a-z]+/g,"").substring(0,5);function Ur(e,t){const[n,o]=f.useState(e);return f.useEffect(()=>{if(t<0)return;const r=setTimeout(()=>{o(e)},t);return()=>{clearTimeout(r)}},[e,t]),n}var Gn=(...e)=>e.filter(t=>t).join(" ");function Qt({title:e,icon:t,onClick:n,className:o}){return f.createElement("div",{role:"button",title:e,className:Gn("code-kitchen-preview-panel-header-action-button",o),onClick:()=>{n(),Ot('ControlButton clicked - "'+e+'"')}},t)}var Lr=({portal:e,children:t})=>{const[n,o]=f.useState(null);return f.useEffect(()=>{if(typeof window!="undefined"&&!e)return;const r=document.createElement("div"),u=document.querySelector(e);return r.classList.add("code-kitchen-portal"),u.appendChild(r),o(r),()=>{r.remove()}},[e]),e?n&&at.createPortal(t,n):f.createElement(f.Fragment,null,t)},Vr=(e,t)=>{const n=JSON.stringify(t);sessionStorage.setItem("code-kitchen:"+e,n)},zr=e=>{sessionStorage.removeItem("code-kitchen:"+e)},Br=e=>{var t;try{return JSON.parse((t=sessionStorage.getItem("code-kitchen:"+e))!=null?t:"undefined")}catch(n){return}},Wr=e=>{let t=0;for(let n=0;n<e.length;++n)t=Math.imul(31,t)+e.charCodeAt(n);return""+(t|0)},Hr=e=>Wr(e||qn());const Jr=f.forwardRef(function({initialFiles:t,require:n,style:o,className:r,name:u,id:h,allowDisconnect:g=!1,live:_=!0,dir:j="h",onChange:Q},N){const[he]=f.useState(()=>"code-kitchen-"+Hr(h!=null?h:qn())),Ke=!!h,[He,ue]=f.useState(t),[ht,Ve]=f.useState(j),[Ae,ot]=f.useState(!0),[Ct,vt]=f.useState(!1),[Ye,Oe]=f.useState(_),[qr,Gr]=f.useState(!1),Pn=f.useRef(!1),Kn=Ae||!Ye,Kr=f.useCallback(Xe=>{typeof Q=="function"&&Q(Xe),ue(Xe),Ke&&(kn(Xe,t)?(zr(he),Pn.current=!1):(Vr(he,Xe),Pn.current=!0))},[Ke,t,he]),Yr=Ur(He,Kn?100:-1),{Preview:en,error:tn,bundling:Zr}=ur(he,Yr,n),$n=tn&&(qr||!en);return f.useEffect(()=>{const Xe=Ke&&Pn.current&&Br(he);ue(Xe||t),Xe&&Ot("Recovered files from sessionStorage")},[Ke,he,t]),f.useImperativeHandle(N,()=>({setFiles:ue})),f.createElement(Lr,{portal:Ct?"body":void 0},f.createElement("div",{id:h,style:o,className:Gn("code-kitchen-root",!Kn&&"code-kitchen-disconnected",r),"data-dir":ht,"data-fullscreen":Ct?!0:void 0,"data-show-error":$n?!0:void 0,"data-show-code":Ye},f.createElement("div",{className:"code-kitchen-preview-panel"},f.createElement("div",{className:"code-kitchen-preview-panel-header"},f.createElement("div",{className:"code-kitchen-preview-panel-header-label"},u),Ye&&g&&f.createElement(Qt,{title:"Toggle Disconnect",icon:Ae?f.createElement(Nr,null):f.createElement(Mr,null),onClick:()=>ot(Xe=>!Xe)}),f.createElement("div",{className:"code-kitchen-spacer"}),f.createElement("div",{className:"code-kitchen-preview-panel-header-actions"},Ye&&f.createElement(Qt,{title:"Toggle Layout",icon:ht==="h"?f.createElement(Tr,null):f.createElement(Jn,null),onClick:()=>Ve(ht==="h"?"v":"h")}),f.createElement(Qt,{title:"Show/Hide Code Editor",icon:Ye?f.createElement(Ir,null):f.createElement(Dr,null),onClick:()=>Oe(Xe=>!Xe)}),f.createElement(Qt,{title:"Toggle fullscreen",icon:Ct?f.createElement(Fr,null):f.createElement(Rr,null),onClick:()=>vt(Xe=>!Xe)}))),f.createElement("div",{className:"code-kitchen-preview-panel-preview-container"},f.createElement("div",{className:"code-kitchen-preview-panel-preview-content"},Zr&&!en?"loading ...":en&&f.createElement(en,null)),tn&&f.createElement("div",{className:"code-kitchen-preview-panel-preview-error",style:{opacity:$n?1:0,pointerEvents:$n?"all":"none"}},f.createElement("pre",null,tn.toString()))),tn&&f.createElement("div",{title:"This preview has errors. Click to show.",className:"code-kitchen-error-toggle",onClick:()=>Gr(Xe=>!Xe)},f.createElement(Ar,null))),Ye&&f.createElement($r,{internalId:he,id:h,initialFiles:t,files:He,onChange:Kr})))})}}]);
