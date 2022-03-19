// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "main.svelte-qojrye{height:100%;display:flex;flex-direction:column}div.svelte-qojrye{flex:1;flex-basis:0;overflow:hidden}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}