// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".root.svelte-1vwz7l5{height:100%;display:flex;flex-direction:column}.content.svelte-1vwz7l5{background:#f4f4f4;height:100%;width:100%}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}