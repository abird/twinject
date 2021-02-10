const e={transparent:"transparent",current:"currentColor",black:"#000",white:"#fff",rose:"fff1f2,ffe4e6,fecdd3,fda4af,fb7185,f43f5e,e11d48,be123c,9f1239,881337",pink:"fdf2f8,fce7f3,fbcfe8,f9a8d4,f472b6,ec4899,db2777,be185d,9d174d,831843",fuchsia:"fdf4ff,fae8ff,f5d0fe,f0abfc,e879f9,d946ef,c026d3,a21caf,86198f,701a75",purple:"faf5ff,f3e8ff,e9d5ff,d8b4fe,c084fc,a855f7,9333ea,7e22ce,6b21a8,581c87",violet:"f5f3ff,ede9fe,ddd6fe,c4b5fd,a78bfa,8b5cf6,7c3aed,6d28d9,5b21b6,4c1d95",indigo:"eef2ff,e0e7ff,c7d2fe,a5b4fc,818cf8,6366f1,4f46e5,4338ca,3730a3,312e81",blue:"eff6ff,dbeafe,bfdbfe,93c5fd,60a5fa,3b82f6,2563eb,1d4ed8,1e40af,1e3a8a",lightBlue:"f0f9ff,e0f2fe,bae6fd,7dd3fc,38bdf8,0ea5e9,0284c7,0369a1,075985,0c4a6e",cyan:"ecfeff,cffafe,a5f3fc,67e8f9,22d3ee,06b6d4,0891b2,0e7490,155e75,164e63",teal:"f0fdfa,ccfbf1,99f6e4,5eead4,2dd4bf,14b8a6,0d9488,0f766e,115e59,134e4a",emerald:"ecfdf5,d1fae5,a7f3d0,6ee7b7,34d399,10b981,059669,047857,065f46,064e3b",green:"f0fdf4,dcfce7,bbf7d0,86efac,4ade80,22c55e,16a34a,15803d,166534,14532d",lime:"f7fee7,ecfccb,d9f99d,bef264,a3e635,84cc16,65a30d,4d7c0f,3f6212,365314",yellow:"fefce8,fef9c3,fef08a,fde047,facc15,eab308,ca8a04,a16207,854d0e,713f12",amber:"fffbeb,fef3c7,fde68a,fcd34d,fbbf24,f59e0b,d97706,b45309,92400e,78350f",orange:"fff7ed,ffedd5,fed7aa,fdba74,fb923c,f97316,ea580c,c2410c,9a3412,7c2d12",red:"fef2f2,fee2e2,fecaca,fca5a5,f87171,ef4444,dc2626,b91c1c,991b1b,7f1d1d",warmGray:"fafaf9,f5f5f4,e7e5e4,d6d3d1,a8a29e,78716c,57534e,44403c,292524,1c1917",trueGray:"fafafa,f5f5f5,e5e5e5,d4d4d4,a3a3a3,737373,525252,404040,262626,171717",gray:"f9fafb,f3f4f6,e5e7eb,d1d5db,9ca3af,6b7280,4b5563,374151,1f2937,111827",coolGray:"f9fafb,f3f4f6,e5e7eb,d1d5db,9ca3af,6b7280,4b5563,374151,1f2937,111827",blueGray:"f8fafc,f1f5f9,e2e8f0,cbd5e1,94a3b8,64748b,475569,334155,1e293b,0f172a"},t={"light-blue":"lightBlue","warm-gray":"warmGray","true-gray":"trueGray","blue-gray":"blueGray"},r=(e,t)=>e.split("|").includes(t),o=({type:e,prop:t,B:r,C:o,D:n},i)=>{let a=b(r,o,n);if(a){if(i)return i(a);if(a.startsWith("#")){const r=`--tw-${e}-opacity`;let o=`${r}: 1;`;return a=g(a,`var(${r})`),`${o} ${t}: ${a}`}return`${t}: ${a}`}},n=({type:e,B:t,C:r})=>"opacity"===t&&`--tw-${e}-opacity: ${r/100}`,i=e=>({start:"flex-start",end:"flex-end",between:"space-between",around:"space-around",evenly:"space-evenly"}[e]||e),a=(e,t)=>{if("px"===e)return t?"-1px":"1px";const r=+e;return isNaN(r)?void 0:r?r/4*(t?-1:1)+"rem":"0px"},l=({A:e,BC:t})=>`${e}: ${t}`,s=(e,t,o,n)=>r(t,e)?o:n,c=(e,t,r,o)=>e===t?r:o,d=(e,t)=>{if("full"===e)return t?"-100%":"100%";const[r,o]=e.split("/");if(o){const e=((e,t)=>Math.round(1e6*(e/t*100+Number.EPSILON))/1e6+"%")(r,o);return t?"-"+e:e}},f=(e,t)=>e&&0!==t&&"0px"!==t?"-"+t:t,p=(e,t,r)=>e in t&&(r?r(t[e]):t[e]),u=(e,t,r)=>{const o=a(e,t);return o&&(r?r(o):o)},m=(e,t,r)=>{const o=d(e,t);return o&&(r?r(o):o)};function b(r,o,n){let i=n?`${r}-${o}`:r,a=n||o,l=e[t[i]||i];if(l){const e=l.split(",");if(e.length>1){l="#"+e[Math.trunc(a/100)]}return l}}function g(e,t){let r=e.replace("#","");return r=3===r.length?r+r:r,`rgba(${[0,2,4].map((e=>parseInt(r.substr(e,2),16))).join(", ")}, ${t})`}const w=({cls:e})=>`display: ${"hidden"===e?"none":e}`,h=e=>`position: ${e.A}`,x=({A:e,B:t,neg:r})=>{let o={full:"100%",auto:t,px:"1px"}[t]||d(t)||a(t)||t;return`${e}: ${f(r,o)}`},$=({A:e})=>`visibility: ${"visible"===e?e:"hidden"}`,v=({A:e,B:t,C:r})=>{const o="col"===e?"column":e;return"auto"===t?`grid-${o}: auto`:"span"===t?"full"===r?`grid-${o}: 1 / -1`:`grid-${o}: span ${r} / span ${r}`:s(t,"start|end",`grid-${o}-${t}: ${r}`)},y=(e,{A:t,B:r,neg:o})=>{r=a(r,o)||r;const n=t[1];if(n){let t={t:"top",r:"right",b:"bottom",l:"left",y:["top","bottom"],x:["left","right"]}[n];if(Array.isArray(t))return`${e}-${t[0]}: ${r}; ${e}-${t[1]}: ${r}`;e+="-"+t}return`${e}: ${r}`},B=e=>y("margin",e),k=e=>y("padding",e),C=({cls:e,A:t,B:r,C:o,BC:n})=>{const i=o?n:r;if(i){if("align"===t)return`vertical-align: ${i}`;if("whitespace"===t)return`white-space: ${i}`}if([t,r].includes("antialiased")){const[e,t]=r?["auto","auto"]:["antialiased","grayscale"];return`-webkit-font-smoothing: ${e}; -moz-osx-font-smoothing: ${t}`}return p(e,{italic:"font-style: italic",underline:"text-decoration: underline","line-through":"text-decoration: line-through","no-underline":"text-decoration: none",uppercase:"text-transform: uppercase",lowercase:"text-transform: lowercase",capitalize:"text-transform: capitalize","normal-case":"text-transform: none",truncate:"overflow: hidden; text-overflow: ellipsis; white-space: nowrap","break-normal":"overflow-wrap: normal; word-break: normal","break-words":"overflow-wrap: break-word","break-all":"word-break: break-all"})||p(e,{ordinal:"ordinal","slashed-zero":"slashed-zero","lining-nums":"numeric-figure","oldstyle-nums":"numeric-figure","proportional-nums":"numeric-spacing","tabular-nums":"numeric-spacing","diagonal-fractions":"numeric-fraction","stacked-fractions":"numeric-fraction"},(t=>({initrule:".ordinal, .slashed-zero, .lining-nums, .oldstyle-nums, .proportional-nums, .tabular-nums, .diagonal-fractions, .stacked-fractions {--tw-ordinal: var(--tw-empty,/*!*/ /*!*/); --tw-slashed-zero: var(--tw-empty,/*!*/ /*!*/); --tw-numeric-figure: var(--tw-empty,/*!*/ /*!*/); --tw-numeric-spacing: var(--tw-empty,/*!*/ /*!*/); --tw-numeric-fraction: var(--tw-empty,/*!*/ /*!*/); font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}",initgroup:"numvar",declarations:`--tw-${t}: ${e}`})))||c(e,"normal-nums","font-variant-numeric: normal")},z=({A:e,B:t})=>c(t,"current",`${e}: currentColor`,`stroke-width: ${t}`),A=({B:e,C:t})=>{const r={t:["tl","tr"],r:["tr","br"],b:["br","bl"],l:["tl","bl"]}[e];if(r)return`${A({B:r[0],C:t})}; ${A({B:r[1],C:t})}`;const o={tl:"top-left",tr:"top-right",br:"bottom-right",bl:"bottom-left"}[e];o&&(e=t);let n={none:"0px",sm:"0.125rem",[void 0]:"0.25rem",md:"0.375rem",lg:"0.5rem",xl:"0.75rem","2xl":"1rem","3xl":"1.5rem",full:"9999px"}[e];return o?`border-${o}-radius: ${n}`:`border-radius: ${n}`},j=({A:e,B:t})=>{const r="w"===e?0:1,o=["width","height"][r];return p(t,{auto:["width: auto","height: auto"],px:["width: 1px","height: 1px"],full:["width: 100%","height: 100%"],screen:["width: 100vw","height: 100vh"],min:["width: -webkit-min-content; width: min-content"],max:["width: -webkit-max-content; width: max-content"]},(e=>e[r]))||m(t,!1,(e=>`${o}: ${e}`))||u(t,!1,(e=>`${o}: ${e}`))},S=e=>`align-${e.A}: ${i(e.B)}`,N=({A:e,B:t,C:r,D:o})=>{let n=b(t,r,o);if(!n)return;let i="rgba(0, 0, 0, 0)";switch("current"===t?i="rgba(255, 255, 255, 0)":n.startsWith("#")&&(i=g(n,0)),e){case"from":return`--tw-gradient-from: ${n}; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, ${i})`;case"via":return`--tw-gradient-stops: var(--tw-gradient-from), ${n}, var(--tw-gradient-to, ${i})`;case"to":return`--tw-gradient-to: ${n}`}},D={box:({B:e})=>`box-sizing: ${e}-box`,hidden:w,block:w,inline:({B:e,C:t,BC:r})=>`display: ${t?r:e?`inline-${e}`:"inline"}`,table:({cls:e,B:t})=>/auto|fixed/.test(t)?`table-layout: ${t}`:`display: ${e}`,flow:w,contents:w,float:l,clear:l,object:({BC:e})=>s(e,"contain|cover|fill|none|scale-down",`object-fit: ${e}`,`object-position: ${e.replace("-"," ")}`),overflow:({B:e,C:t})=>s(e,"ellipsis|clip",`text-overflow: ${e}`,`overflow${t?"-"+e:""}: ${t||e}`),overscroll:({B:e,C:t})=>{let r="";return t&&(r="-"+e,e=t),`overscroll-behavior${r}: ${e}`},static:h,fixed:h,absolute:h,relative:h,sticky:e=>"position: -webkit-sticky; "+h(e),inset:({B:e,C:t,neg:r})=>{let o;return"x"===e?(o="right|left",e=t):"y"===e?(o="top|bottom",e=t):o="top|right|bottom|left",o.split("|").map((t=>x({A:t,B:e,neg:r}))).join("; ")},top:x,right:x,bottom:x,left:x,visible:$,invisible:$,z:e=>`z-index: ${e.B}`,grid:({B:e,C:t,D:r})=>{if(e){if("flow"===e)return"col"===t&&(t="column"),"grid-auto-flow: "+(t+(r?" "+r:""));{let r;return"cols"===e&&(e="columns"),r="none"===t?t:`repeat(${t}, minmax(0, 1fr))`,`grid-template-${e}: ${r}`}}return"display: grid"},col:v,row:v,auto:({B:e,C:t})=>{const o="cols"===e?"columns":e;let n;return n="auto"===t?t:r("min|max",t)?`-webkit-${t}-content; grid-auto-${o}: ${t}-content`:"minmax(0, 1fr)",`grid-auto-${o}: ${n}`},gap:({B:e,C:t})=>`${{x:"column-gap",y:"row-gap"}[e]||"gap"}: ${a(t||e)}`,m:B,mx:B,my:B,mt:B,mr:B,mb:B,ml:B,p:k,px:k,py:k,pt:k,pr:k,pb:k,pl:k,space:({B:e,C:t,neg:r})=>({postclass:" > :not([hidden]) ~ :not([hidden])",declarations:(()=>{const o=a(t,r);return o?"reverse"===t?`--tw-space-${e}-reverse: 1`:"x"===e?`--tw-space-x-reverse: 0; margin-right: calc(${o} * var(--tw-space-x-reverse)); margin-left: calc(${o} * calc(1 - var(--tw-space-x-reverse)))`:`--tw-space-y-reverse: 0; margin-top: calc(${o} * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(${o} * var(--tw-space-y-reverse))`:"reverse"===t?`--tw-space-${e}-reverse: 1`:void 0})()}),text:({B:e,C:t,D:r})=>{const i={xs:[.75,1],sm:[.875,1.25],base:[1,1.5],lg:[1.125,1.75],xl:[1.25,1.75],"2xl":[1.5,2],"3xl":[1.875,2.25],"4xl":[2.25,2.5],"5xl":[3,0],"6xl":[3.75,0],"7xl":[4.5,0],"8xl":[6,0],"9xl":[8,0]},a=i[e];if(a){const[e,t]=a;return`font-size: ${e}rem; line-height: ${t?t+"rem":1}`}return p(e,i,(([e,t])=>`font-size: ${e}rem; line-height: ${t?t+"rem":1}`))||s(e,"left|right|center|justify",`text-align: ${e}`)||o({type:"text",prop:"color",B:e,C:t,D:r})||n({type:"text",B:e,C:t})},font:e=>p(e.B,{sans:'font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',serif:'font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',mono:'font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'})||p(e.B,{thin:"100",extralight:"200",light:"300",normal:"400",medium:"500",semibold:"600",bold:"700",extrabold:"800",black:"900"},(e=>`font-weight: ${e}`)),italic:C,not:e=>({italic:"font-style: normal","sr-only":"position: static; width: auto; height: auto; padding: 0; margin: 0; overflow: visible; clip: auto; white-space: normal"}[e.BC]),tracking:e=>p(e.B,{tighter:-.05,tight:-.025,normal:0,wide:.025,wider:.05,widest:.1},(e=>`letter-spacing: ${e}em`)),leading:e=>p(e.B,{none:1,tight:1.25,snug:1.375,normal:1.5,relaxed:1.625,loose:2,3:".75rem"},(e=>`line-height: ${e}`))||u(e.B,!1,(e=>`line-height: ${e}`)),underline:C,line:C,list:({B:e})=>`list-style-${r("inside|outside",e)?"position":"type"}: ${e}`,no:C,uppercase:C,lowercase:C,capitalize:C,normal:C,truncate:C,align:C,whitespace:C,break:C,antialiased:C,subpixel:C,placeholder:e=>({postclass:"::placeholder",declarations:n({type:e.A,...e})||o({type:e.A,prop:"color",...e})}),ordinal:C,slashed:C,lining:C,oldstyle:C,proportional:C,tabular:C,diagonal:C,stacked:C,rounded:A,border:({B:e,C:t,D:r})=>{let i={t:"top",r:"right",b:"bottom",l:"left"}[e];return e&&!i&&isNaN(e)?s(e,"collapse|separate",`border-collapse: ${e}`)||o({type:"border",prop:"border-color",B:e,C:t,D:r})||n({type:"border",B:e,C:t})||s(e,"solid|dashed|dotted|double|none",`border-style: ${e}`):(i?(e=t,i+="-"):i="",e||(e=1),`border-${i}width: ${e}px`)},ring:({A:e,B:t,C:r,D:o})=>{switch(t){case"opacity":return"--tw-ring-opacity: "+r/100;case"inset":return"--tw-ring-inset: inset";case"transparent":return"--tw-ring-color: transparent";case"current":return"--tw-ring-color: currentColor"}let n=!1;"offset"===t&&(n=!0,t=r,r=o,o=void 0);let i=b(t,r,o);return i?n?`--tw-ring-offset-color: ${i}`:`--tw-ring-opacity: 1; --tw-ring-color: ${g(i,"var(--tw-ring-opacity)")}`:(t||(t=3),n?`--tw-ring-offset-width: ${t}px`:`--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(${t}px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)`)},divide:({A:e,B:t,C:n,D:i})=>({postclass:" > :not([hidden]) ~ :not([hidden])",declarations:"opacity"===t?"--tw-divide-opacity: "+n/100:r("x|y",t)?"reverse"===n?`--tw-divide-${t}-reverse: 1`:(n||(n=1),"x"===t?`--tw-divide-x-reverse: 0; border-right-width: calc(${n}px * var(--tw-divide-x-reverse)); border-left-width: calc(${n}px * calc(1 - var(--tw-divide-x-reverse)))`:`--tw-divide-y-reverse: 0; border-top-width: calc(${n}px * calc(1 - var(--tw-divide-y-reverse))); border-bottom-width: calc(${n}px * var(--tw-divide-y-reverse))`):o({B:t,C:n,D:i},(e=>s(t,"transparent|current",`border-color: ${e}`,`--tw-divide-opacity: 1; border-color: ${g(e,"var(--tw-divide-opacity)")}`)))||s(t,"solid|dashed|dotted|double|none",`border-style: ${t}`)}),transition:({B:e})=>{let t=`transition-property: ${{[void 0]:"background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",colors:"background-color, border-color, color, fill, stroke",shadow:"box-shadow"}[e]||e}`;return"none"!==e&&(t+="; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms"),t},duration:e=>`transition-duration: ${e.B}ms`,ease:({BC:e})=>`transition-timing-function: ${{in:"cubic-bezier(0.4, 0, 1, 1)",out:"cubic-bezier(0, 0, 0.2, 1)","in-out":"cubic-bezier(0.4, 0, 0.2, 1)"}[e]||e}`,delay:e=>`transition-delay: ${e.B}ms`,animate:({B:e})=>p(e,{spin:["spin 1s linear infinite","@keyframes spin {to{transform: rotate(360deg)}}"],ping:["ping 1s cubic-bezier(0, 0, 0.2, 1) infinite","@keyframes ping {75%, 100% {transform: scale(2); opacity: 0}}"],pulse:["pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite","@keyframes pulse {50% {opacity: .5}}"],bounce:["bounce 1s infinite","@keyframes bounce { 0%, 100% {transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1)} 50% {transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1)}}"]},(([t,r])=>({initrule:r,initgroup:"animate"+e,declarations:`animation: ${t}`})))||c(e,"none","animation: none"),scale:({B:e,C:t})=>{const r=(e,t)=>`--tw-scale-${e}: ${(t/100).toString().replace("0.",".")}`;return s(e,"x|y",r(e,t),`${r("x",e)}; ${r("y",e)}`)},rotate:e=>`--tw-rotate: ${f(e.neg,e.B)}deg`,translate:({B:e,C:t,neg:r})=>m(t,r,(t=>`--tw-translate-${e}: ${t}`))||u(t,r,(t=>`--tw-translate-${e}: ${t}`)),skew:({B:e,C:t,neg:r})=>`--tw-skew-${e}: ${r?-t:t}deg`,origin:e=>`transform-origin: ${e.BC.replace("-"," ")}`,transform:({B:e})=>{if("none"===e)return"transform: none";const t="var(--tw-translate-x)",r="var(--tw-translate-y)";return`--tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; transform: ${"gpu"!==e?`translateX(${t}) translateY(${r})`:`translate3d(${t}, ${r}, 0)`} rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`},appearance:()=>"-webkit-appearance: none; appearance: none",cursor:l,outline:e=>`outline: 2px ${"none"===e.B?"solid transparent":`dotted ${e.B}`}; outline-offset: 2px`,pointer:e=>`pointer-events: ${e.C}`,resize:e=>`resize: ${e.B?{y:"vertical",x:"horizontal"}[e.B]||"none":"both"}`,select:e=>`-webkit-user-select: ${e.B}; user-select: ${e.B}`,sr:()=>"position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0",shadow:({B:e})=>`--tw-shadow: ${{sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",reg:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",md:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",lg:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",xl:"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)","2xl":"0 25px 50px -12px rgba(0, 0, 0, 0.25)",inner:"inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",none:"0 0 #0000"}[e||"reg"]}; box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)`,opacity:e=>"opacity: "+e.B/100,flex:({BC:e})=>({undefined:"display: flex",row:"flex-direction: row","row-reverse":"flex-direction: row-reverse",col:"flex-direction: column","col-reverse":"flex-direction: column-reverse",wrap:"flex-wrap: wrap","wrap-reverse":"flex-wrap: wrap-reverse",nowrap:"flex-wrap: nowrap",1:"flex: 1 1 0%",auto:"flex: 1 1 auto",initial:"flex: 0 1 auto",none:"flex: none",grow:"flex-grow: 1","grow-0":"flex-grow: 0",shrink:"flex-shrink: 1","shrink-0":"flex-shrink: 0"}[e]),order:({B:e})=>`order: ${{first:-9999,last:9999,none:"0"}[e]||e}`,justify:({B:e,C:t})=>s(e,"items|self",t&&`justify-${e}: ${t}`,`justify-content: ${i(e)}`),content:S,items:S,self:S,place:({B:e,C:t})=>{if(r("content|items|self",e)){return`place-${e}: ${{between:"space-between",around:"space-around",evenly:"space-evenly"}[t]||t}`}},w:j,h:j,min:({cls:e})=>({"min-w-0":"min-width: 0px","min-w-full":"min-width: 100%","min-w-min":"min-width: -webkit-min-content; min-width: min-content","min-w-max":"min-width: -webkit-max-content; min-width: max-content","min-h-0":"min-height: 0px","min-h-full":"min-height: 100%","min-h-screen":"min-height: 100vh"}[e]),max:({B:e,C:t,D:r})=>{if("w"===e){return`max-width: ${{0:"0rem",xs:"20rem",sm:"24rem",md:"28rem",lg:"32rem",xl:"36rem","2xl":"42rem","3xl":"48rem","4xl":"56rem","5xl":"64rem","6xl":"72rem","7xl":"80rem",full:"100%",none:"none",min:"-webkit-min-content; max-width: min-content",max:"-webkit-max-content; max-width: max-content",prose:"65ch","screen-sm":"640px","screen-md":"768px","screen-lg":"1024px","screen-xl":"1280px","screen-2xl":"1536px"}[r?t+"-"+r:t]}`}const o={px:"1px",full:"100%",screen:"100vh"};return t in o?`max-height: ${o[t]}`:`max-height: ${a(t)}`},bg:({B:e,C:t,D:i,BC:a})=>{if("gradient"===e){return`background-image: linear-gradient(to ${{t:"top",tr:"top right",r:"right",br:"bottom right",b:"bottom",bl:"bottom left",l:"left",tl:"top left"}[i]}, var(--tw-gradient-stops))`}if("repeat"===e||"repeat"===t){return`background-repeat: ${t?r("round|space",t)?t:a:e}`}return c(e,"clip",c(t,"text","-webkit-background-clip: text; background-clip: text",`background-clip: ${t}-box`))||c(e,"none","background-image: none")||s(e,"fixed|local|scroll",`background-attachment: ${e}`)||s(e,"top|bottom|left|right|center",`background-position: ${t?`${e} ${t}`:e}`)||s(e,"auto|cover|contain",`background-size: ${e}`)||o({type:"bg",prop:"background-color",B:e,C:t,D:i})||n({type:"bg",B:e,C:t})},from:N,to:N,via:N,stroke:z,fill:z},M=["blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}","button{background-color:transparent;background-image:none}","button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}","fieldset{margin:0;padding:0}","ol,ul{list-style:none;margin:0;padding:0}",'html{font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";line-height:1.5}',"body{font-family:inherit;line-height:inherit}","*,::after,::before{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e4e4e7 currentColor}","hr{border-top-width:1px}","img{border-style:solid}","textarea{resize:vertical}","input::placeholder,textarea::placeholder{opacity:1;color:#a1a1aa}","[role=button],button{cursor:pointer}","table{border-collapse:collapse}","h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}","a{color:inherit;text-decoration:inherit}","button,input,optgroup,select,textarea{padding:0;line-height:inherit;color:inherit}",'code,kbd,pre,samp{font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace}',"audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}","img,video{max-width:100%;height:auto}"],E={sm:640,md:768,lg:1024,xl:1280,"2xl":1536},I=e=>r("hover|focus|active|group-hover|group-focus|focus-within|focus-visible|motion-safe|motion-reduce|disabled|visited|checked|first|last|odd|even",e);function R(e){const t=e.replace(/\\/g,"");let[r,o]=t.split(" ");r=r.split("::")[0];const n=r.split(":");r=n.pop(),I(r)&&(r=n.pop());let i,a,l,s,c=function(e){const t=(e=e.replace(/\\/g,"")).split("-");t[0]||t.shift();let[r,o,...n]=t;const i=D[r];if(!i)return;const a=r,l=o,s=n[0],c=n[1],d=s?`${l}-${s}`:l,f=e.startsWith("-");return i({cls:e,A:a,B:l,C:s,BC:d,D:c,neg:f})}(r);if("object"==typeof c&&({initrule:i,initgroup:l,declarations:c,postclass:a}=c),c){let t=e,r=n.pop();t=t.replace(/\//g,"\\/").replace(/\./g,"\\.").replace(/:/g,"\\:").replace(/^(\d)/,"\\3$1");let o="";if(I(r)){if(r.startsWith("group"))o=`.${r.replace("-",":")} `;else{const e={first:"first-child",last:"last-child",odd:"nth-child(odd)",even:"nth-child(2n)"}[r];e&&(r=e),t+=":"+r}r=n.pop()}s=`${o}.${t}${a||""} {${c}}`,r&&E[r]&&(s=`@media (min-width: ${E[r]}px) {${s}}`)}return{rule:s,declarations:c,initrule:i,initgroup:l,postclass:a}}const G=new Set,T=new Set;function U(e){for(const t of e.split(" "))t&&L(t)}function L(e){G.has(e)||(!function(e){const{rule:t,initrule:r,initgroup:o,postclass:n}=R(e);r&&(T.has(o)||(X(r),T.add(o)));t&&X(t)}(e),G.add(e))}let F,W;function Y(){if(!F&&"undefined"!=typeof window){for(let e of document.styleSheets)if("twinject"===e.title){let t=e.rules||e.cssRules;for(let e in t)G.add(e.selectorText);return e}const e=document.createElement("style");e.title="twinject",e.appendChild(document.createTextNode("")),document.head.appendChild(e),F=e.sheet,M.forEach((e=>X(e)))}return F}function X(e){const t=Y();try{t.insertRule(e,t.cssRules.length)}catch(t){console.log("Error:",t,"inserting:",e)}}function H(){"undefined"!=typeof window&&(W=new MutationObserver((function(e){e.forEach((function(e){e.addedNodes&&e.addedNodes.forEach((e=>{if(e.getAttribute){const t=e.getAttribute("class");t&&U(t)}}))}))}))),W&&W.observe(document,{subtree:!0,childList:!0})}H();const O={addClasses:U,getRule:R,disableAutoInstall:function(){W&&W.disconnect()},enableAutoInstall:function(){W||H(),W&&W.observe(document,{subtree:!0,childList:!0}),console.log("Twinject observing:",W)}};"undefined"!=typeof window&&(window.twinject=O),"undefined"!=typeof module&&module.exports&&(module.exports=O),console.log("Twinject installed");