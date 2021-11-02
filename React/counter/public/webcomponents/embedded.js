
  var fetchHeaders = new Headers({
    Accept: 'text/html'
  });
  
var fetchOptions = {
  cache: 'default',
  headers:fetchHeaders,
  method: 'GET',
  mode: 'no-cors'
};
class EmbeddedWebview extends HTMLElement {
    connectedCallback() {
      fetch(this.getAttribute('src'),fetchOptions)
        .then(response => response.html())
        .then(html => {
          const shadow = this.attachShadow({ mode: 'closed' });
          shadow.innerHTML = html;
        });
    }
  }
  
  window.customElements.define(
    'embedded-webview',
    EmbeddedWebview
  );