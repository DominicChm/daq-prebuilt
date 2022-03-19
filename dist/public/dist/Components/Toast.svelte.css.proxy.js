// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".notifications.svelte-1q759bs{position:fixed;top:4rem;right:1rem;margin:0 auto;padding:0;z-index:9999;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;pointer-events:none}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}