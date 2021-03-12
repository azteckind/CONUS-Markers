import React, {useEffect, useState} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
//import * as conusData from "./data/CONUS=V2-1.geojson"; -> did not like * as
//import conusData from "./data/CONUS_v2-1.geojson"; -> did not like geojson file extension
import conusData from "./data/CONUS_v2-1.json";

export default function App() {
  //Centering the viewport to the middle of the USA
  const [viewport, setViewport] = useState ({
    latitude: 44.58,
    longitude: -103.46,
    zoom: 10,
    width: "100vw",
    height: "100vh"
  });

  //Creating a new state to keep track of which base you've clicked on
  const [selectedBase, setSelectedBase] = useState(null);

  //Setting up an Escape option to close out the pop-up
  useEffect(() => {
    const listener = e => {
      if(e.key === "Escape") {
        setSelectedBase(null);
      }
    };
    window.addEventListener("keydown", listener)

    return() => {
      window.addEventListener("keydown", listener);
    }
  }, []);
  
  //console.log(conusData)
  return (<div>
    <ReactMapGL {...viewport}
    mapboxApiAccessToken="pk.eyJ1IjoiYXp0ZWNraW5kIiwiYSI6ImNrbTB2NDA2bTAxeDQzMW12bHM5Zng0ZDkifQ.M2ow_v8f3muxTlnYeWWFgA"
    mapStyle="mapbox://styles/azteckind/ckm2dl6sy0w8v17qyh3id9j8d"
    onViewportChange={setViewport}
    >

      {conusData.features.map(conus => (
        <Marker key={conus.properties.Name}
        latitude={conus.geometry.coordinates[1]}
        longitude={conus.geometry.coordinates[0]}>
          <button className="marker-btn"
          onClick={e => {
            e.preventDefault();
            //setSelectedBase(null) 
            setSelectedBase(conus)
          }}>
            <img src="/marker-editor.svg" alt="Marker"/>
          </button>
        </Marker>
      ))}

      {selectedBase && (
        <Popup 
        latitude={selectedBase.geometry.coordinates[1]}
        longitude={selectedBase.geometry.coordinates[0]}
        onClose={() => {
          setSelectedBase(null);
        }}>
          <div>
            <h2>
              {selectedBase.properties.Name}
            </h2>
            <p>
              {selectedBase.properties.Location}
            </p>
          </div>
        </Popup>
      )}
     </ReactMapGL>
  </div>
  );
}