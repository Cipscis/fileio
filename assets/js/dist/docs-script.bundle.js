(()=>{"use strict";var e;function t(t){return t=t??e.Text,new Promise(((n,r)=>{function a(e){const t=this;t.readyState===FileReader.DONE&&(t.result?n(t.result):t.error?r(t.error):r(new DOMException("Error parsing file")))}function i(n){const i=new FileReader;switch(i.addEventListener("load",a),i.addEventListener("error",(()=>{i.abort(),i.error?r(i.error):r(new DOMException("Error parsing file"))})),t){case e.ArrayBuffer:i.readAsArrayBuffer(n);break;case e.BinaryString:i.readAsBinaryString(n);break;case e.DataUrl:i.readAsDataURL(n);break;case e.Text:i.readAsText(n);break;default:r(new RangeError(`FileIO: Unrecognised readMethod ${t}`))}}if(window.showOpenFilePicker)window.showOpenFilePicker().then((async([a])=>{if("file"===a.kind){const r=await a.getFile();t===e.File?n(r):i(r)}else r()})).catch(r);else{function r(r){const a=this.files;if(a&&a.length>0){const r=a[0];t===e.File?n(r):i(r)}}const a=document.createElement("input");a.type="file",a.addEventListener("change",r),a.click()}}))}function n(e,t){let n;return n=void 0===e?"":"string"!=typeof e?""+e:e,(t?.sanitise??!1)&&n.match(/^[=\-+@]/)&&(n="\t"+e),n.match(/,|"|\n/)&&(n=n.replace(/"/g,'""'),n='"'+n+'"'),n}let r;function a(e,t){e instanceof File?function(e,t){if(!(e instanceof File))throw new TypeError("FileIO: save file requires a File");const n=t?.filename||e.name||"file";if(t?.saveAs&&window.showSaveFilePicker)showSaveFilePicker({suggestedName:n}).then((async t=>{const n=await t.createWritable();await n.write(e),await n.close()}));else if(navigator.msSaveBlob)navigator.msSaveBlob(e,n);else{const t=new FileReader;t.addEventListener("load",(function(){if(t.readyState===FileReader.DONE){if(!t.result)throw t.error?t.error:new DOMException("Error parsing file");o(t.result,n)}})),t.addEventListener("error",(()=>{throw t.abort(),t.error?t.error:new DOMException("Error parsing file")})),t.readAsDataURL(e)}}(e,t):e instanceof Blob?i(e,t):function(e,t){let r=t?.filename||"file",a=t?.type||"text/plain";switch(a){case"json":a="application/json";break;case"csv":a="text/csv"}"application/json"===a?(e=JSON.stringify(e),r=s(r,"json")):"text/csv"===a&&("string"!=typeof e&&(e=function(e,t){return(t=t||{}).transpose=t.transpose||!1,t.sanitise=t.sanitise||!1,function(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].join(","));return t.join("\n")}(function(e,t){for(const r of e)for(let e=0;e<r.length;e++)r[e]=n(r[e],t);return e}(function(e,t){const n=t?.transpose??!1,r=e.reduce(((e,t)=>Math.max(e,t.length)),0),a=n?r:e.length,i=n?e.length:r,o=[];for(let t=0;t<a;t++){const r=[];for(let a=0;a<i;a++){const i=n?a:t,o=n?t:a;let s=e[i][o];o>=e[i].length&&(s=""),r.push(s)}o.push(r)}return o}(e,t),t))}(e,t)),r=s(r,"csv")),i(new Blob([e],{type:a}),t)}(e,t)}function i(e,t){if(!(e instanceof Blob))throw new TypeError("FileIO: save blob requires a Blob");const n=t?.filename||"file";t?.saveAs&&window.showSaveFilePicker?showSaveFilePicker({suggestedName:n}).then((async t=>{const n=await t.createWritable();await n.write(e),await n.close()})):navigator.msSaveBlob?navigator.msSaveBlob(e,n):o(URL.createObjectURL(e),n)}function o(e,t){r=r||document.createElement("a"),r.href=e,r.download=t,r.click(),URL.revokeObjectURL(e)}function s(e,t){return new RegExp("\\."+t+"$").test(e)||(e+="."+t),e}!function(e){e.ArrayBuffer="arrayBuffer",e.BinaryString="binaryString",e.DataUrl="dataUrl",e.Text="text",e.File="file"}(e||(e={}));let c=!1;const l=()=>{c=!c;const e=document.querySelector(".js-save-as-value");e&&(e.innerText=c.toString())};document.querySelectorAll(".js-save-as-toggle").forEach((e=>e.addEventListener("click",l)));const f=e=>{document.querySelectorAll(".js-fileio-image").forEach((t=>t.src=e))};document.querySelectorAll(".js-load-image").forEach((n=>n.addEventListener("click",(()=>{t(e.DataUrl).then(f)}))));const u=()=>{a("Hey look, the file has some content!",{filename:"test file.txt",type:"text/plain",saveAs:c})};document.querySelectorAll(".js-save-data").forEach((e=>e.addEventListener("click",u)));const d=()=>{console.log("test"),a({text:1,foo:"bar"},{filename:"test json",type:"json",saveAs:c})};document.querySelectorAll(".js-save-json").forEach((e=>e.addEventListener("click",d)));const v=()=>{a([["even numbers",0,2,4,6,8,10,12,14,16,18,20,22,24],["odd numbers",1,3,5,7,9],["prime numbers, up to ten",2,3,5,7]],{filename:"test csv",type:"csv",saveAs:c,transpose:!0})};document.querySelectorAll(".js-save-csv").forEach((e=>e.addEventListener("click",v)));const h=async()=>{a(await t(e.File),{saveAs:c})};document.querySelectorAll(".js-save-file").forEach((e=>e.addEventListener("click",h)))})();
//# sourceMappingURL=docs-script.bundle.js.map