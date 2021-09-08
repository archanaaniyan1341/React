
/**
 * copyright ©2020
 * fileName: index.js
 * function: File responsible for creating the layout
 * web cocket events handling
 * generating the DOM structure corresponding to the JSON Data fetched
 * rendering the Markup into the page
 * starts with the dependency Imports following
 */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Responsive, WidthProvider } from "react-grid-layout";
import { setGridDefaults } from "../../actions";
import { LAYOUTS_URI, SOCKET_URI } from "../../app-constants";
import api from "../../actions/api";
import Header from "../header/header";
import Components from "../";
import "./grid-res.css";
import "./grid.css";


/**
 * file responsible for creating the layout
 * @param {object} props Component props
 * @param {bool} props.submitting Shows if form submitting is in progress
 * @param {function} props.handleSubmit Form submit callback function
 */

 /**
 * variable declaration Global constants
 */
const ResponsiveGridLayout = WidthProvider(Responsive);
const MAX_ROWS = 30; 
const MAX_COLS = 12;
const WS = new WebSocket(SOCKET_URI);  

/**
 * layouts component for holding multiple layouts
 * the layouts are decided based on the JSON response from the server.
 */
const Layouts = () => { 
/**
 * variable declaration function scope 
 */ 
let isConfigured = false;

const dispatch = useDispatch();
const user = useSelector((state) => state.user);
const passedParams = useParams();
const patientId = passedParams.patientId;
const gridSettingsInitialValue = useSelector((state) => state.grid);
const [gridSettings, setGridSettings] = useState(gridSettingsInitialValue);  
const [markup, setMarkup] = useState();  
const params = {
  "role": user.role || localStorage.getItem("userRole"),
  "patientId": passedParams.patientId ? passedParams.patientId : "",
  "pathwayId": passedParams.pathwayId ? passedParams.pathwayId : ""
};

/**
 * web socket onopen event handling.
 * this will trigger once the web socket opens.
 */
WS.onopen = () => { 
  console.log("connected websocket main component");
};

/**
 * web socket onmessage event handling.
 * this will trigger once the web socket sends message to UI.
 */
WS.onmessage = (message) => {
  if(JSON.parse(message.data).pathwayId === passedParams.pathwayId && passedParams.patientId && passedParams.pathwayId) {
    setMarkup(<div className="modal"><div id="msg">Spinner!<button>Close</button></div>
    <div id="olay"></div></div>)
    getLayoutInfo("New layout");
  }
  else {
    console.log("[Waring] PathwayId not matched.")
  }
}

/**
 * web socket onerror event handling.
 * this will trigger once the web socket has some error.
 */
WS.onerror = err => {
  console.error(
      "Socket encountered error: ",
      err.message,
      "Closing socket"
  );
  WS.close();
};

/**
 * web socket onclose event handling.
 * this will trigger once the web socket closes.
 */
WS.onclose = e => {
  console.log("[Waring] Socket is closed", e.reason);
};

/**
 * useEffect function acts like a loader function in React.
 * which is executing the { getLayoutInfo } method.
 */
useEffect(() => { 
  getLayoutInfo();
}, isConfigured? [gridSettings] : [patientId]);

/**
 * function responsible for getting the Layout info from the JSON. 
 * setting the markup with the Responsive grid layout and the JSON Data in a state variable.
 */
const getLayoutInfo = () => {
  api.getData(LAYOUTS_URI, params, transformData)
  .then((response)=>{
    isConfigured = true;
    let tempState = {...gridSettings};
    tempState.layouts.lg = response.data.layouts;
      setGridSettings(tempState);
      setMarkup(
        <div>
          <Header/>
          {
            (gridSettings && gridSettings.layouts && passedParams.patientId && passedParams.pathwayId) ? (<ResponsiveGridLayout
            layouts={gridSettings.layouts}
            onBreakpointChange={onBreakpointChange}
            measureBeforeMount={true}
            compactType={"horizontal"}
            preventCollision={true}
            rowHeight={30}
            margin={[5, 5]}
            autoSize={true}
            isDraggable={false}
            isResizable={false}
          >
            {generateDOM(gridSettings.layouts.lg)}
          </ResponsiveGridLayout>) : (<div>{generateDOM(gridSettings.layouts.lg)}</div>)
        }
      </div>)
  })
  .catch((error) => {
      console.log(error)
  });
}

/**
 * callback function passed to the API call which is responsible to transform the response.
 * the function accepts the data and transforms according to the use.
 * @param {object} data the response data.
 */
const transformData = (data) => {
  data = JSON.parse(data);
  let offset = {
    rowOffset: MAX_ROWS/data.rows,
    columnOffset: MAX_COLS/data.columns
  }
  let varMap = {"row":"y","column":"x","rowSpan":"h","columnSpan":"w","id":"i"};
  data.layouts.map((item, index) => {
    for(let key in item) {        
      if(varMap[key] && key !== "component") {
        if(key.indexOf("row") !== -1) {
          item[varMap[key]] = item[key]*offset.rowOffset;
        }
        else if(key.indexOf("column") !== -1) {
          item[varMap[key]] = item[key]*offset.columnOffset;
        }
        else if(key.indexOf("id") !== -1) {
          item[varMap[key]] = ""+index;
        }
        else {
          item[varMap[key]] = item[key];
        }       
        delete item[key];
      }          
    }  
    return item;    
  });   
  return data;
}

/**
 * to detect the change in the breakpoint of the viewport responsiveness
 * the function accepts the breakpoint and set the grid defaults in redux the store.
 * @param {String} breakpoint.
 */
const onBreakpointChange = (breakpoint) => {
  gridSettings.currentBreakpoint = breakpoint;
  dispatch(setGridDefaults(gridSettings));
};

/**
 * the function responsible for generating the DOM with which components are to be fixed and where to be fixed
 * the function accepts the layouts data and place the components wisely.
 * @param {object} layouts the layouts data.
 */
const generateDOM = (layouts) => {
  return layouts.map((l, i) => {
    return  <div key={i}>
              {Components(l)}
          </div>;
  });
};
    return markup || (<div key="default-item"></div>);
};

export default Layouts;
