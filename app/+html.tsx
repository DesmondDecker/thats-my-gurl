import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

// Web-only HTML shell. Shows a visible message if the app crashes or never starts,
// so a blank page can't hide the cause.
const guard = `
(function(){
  function show(msg){
    var d=document.getElementById('tmg-debug');
    if(!d){d=document.createElement('pre');d.id='tmg-debug';
      d.style.cssText='position:fixed;left:0;right:0;bottom:0;max-height:50vh;overflow:auto;margin:0;padding:12px;background:#fff0f5;color:#a84d66;font:12px/1.4 monospace;white-space:pre-wrap;z-index:99999;border-top:2px solid #d95f8d';
      document.body.appendChild(d);}
    d.textContent+=msg+'\\n';
  }
  window.addEventListener('error',function(e){show('Error: '+e.message+(e.filename?' ('+e.filename+':'+e.lineno+')':''))});
  window.addEventListener('unhandledrejection',function(e){show('Promise error: '+(e.reason&&e.reason.message||e.reason))});
  setTimeout(function(){
    var r=document.getElementById('root');
    if(!r||r.innerHTML.length<50){show('App did not draw anything after 5 seconds. root length: '+(r?r.innerHTML.length:'no #root')+'. Scripts: '+[].map.call(document.scripts,function(s){return s.src}).join(', '))}
  },5000);
})();
`;

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>That's My Gurl</title>
        <ScrollViewStyleReset />
        <script dangerouslySetInnerHTML={{ __html: guard }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

