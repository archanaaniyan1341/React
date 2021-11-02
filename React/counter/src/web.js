import { useState } from 'react';

import './web.css';

function Web() {
  const [name, setName] = useState('');

  return (
    <div className="Web">
      {/* <input
        placeholder="Enter your name"
        onChange={(event) => setName(event.target.value)}
        value={name}
      ></input>
      <div className="greeting">Hello {name}!</div>
      //check the global variable value to render or not the feature
      {window.showSearchResult ? (
        <search-result name-attribute={name}></search-result>
      ) : null} */}
      {/* <my-el src="https://ckeditor.com/blog/implementing-single-file-web-components/"></my-el> */}
      {/* <x-component>xccccccc</x-component> */}
      {/* <embedded-webview src="https://www.hl7.org/fhir/bundle.html"></embedded-webview> */}
      <div>
      <user-card name="John Doe" avatar="">
        <div slot="email">johndoe@gmail.com</div>
        <div slot="phone">555-555-5555</div>
      </user-card>
      </div>
      
    </div>
  );
}

export default Web;