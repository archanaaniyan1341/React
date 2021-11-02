function readSrc(el, url) {
    var fetchHeaders = new Headers({
      Accept: 'application/json'
    });

    var fetchOptions = {
      cache: 'default',
      headers: fetchHeaders,
      method: 'GET',
      mode: 'no-cors'
    };

    return fetch(url, fetchOptions).then(
      (resp) => {
        if (resp.ok) {
          return resp.json();
        }
        else {
          return {
            error: true,
            status: resp.status
          }
        }
      }
    ).catch(
      (err) => {
        console.error(err);
      }
    );
  }

  class MyEl extends HTMLElement {
    static get observedAttributes() {
      return ['src'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
      if (oldVal !== newVal) {
        this.innerHtml = '';
        readSrc(this, newVal).then(
          data => {
            this.innerHTML = `<pre>
${JSON.stringify(data,0,2)}
            </pre>`;
          }
        );
      }
    }
  }

  // Define our web component
  customElements.define('my-el', MyEl);