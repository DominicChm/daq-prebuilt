// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".root.svelte-1xsfvof{width:100%;height:100%;background-color:var(--cds-layer);user-select:none;padding:.5rem\r\n    }svg.svelte-1xsfvof{width:100%;height:100%}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}