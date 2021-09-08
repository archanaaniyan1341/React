import React, { lazy } from "react";
import "./index.css";
import { COMPONENT_TYPES } from "../app-constants"

const importView = props =>{
  let path = props.component.toLowerCase();  
  return lazy(() =>
    import('../third-party/'+path+'/'+path).catch((error) =>
      console.log(error)
    )
  );
}
  
export default  (props, index) => {    
  if (props.component !== "undefined") {
    console.log(props, COMPONENT_TYPES)
    let markup;
    if(props.componentType === COMPONENT_TYPES.COMPONENT || props.componentType == undefined) {
      const View = importView(props);
      markup = <View key={'component_' + index} />;
    }
    if(props.componentType === COMPONENT_TYPES.WEB_COMPONENT) {
      const script = document.createElement('script');
      script.src = props.componentURL;
      script.async = true;
      document.body.appendChild(script);
      markup = <div className="web-component" dangerouslySetInnerHTML={{__html: props.component}}></div>;
    }
    if(props.componentType === COMPONENT_TYPES.FRAME) {
      markup = <div className="frame"><iframe src={props.componentURL}></iframe></div>
    }
    return markup;
  }
};
