import { IfcViewerAPI } from "web-ifc-viewer";

require([
    "esri/Map", // Map object
    "esri/views/MapView", // Map View
    "esri/layers/FeatureLayer", // For adding feature layers
    "esri/views/SceneView"
    ], function (MapEsri, MapView, FeatureLayer, SceneView) {
    // Step 1: Create the map
    const map = new MapEsri({
        // Options: "streets", "satellite", etc.
        basemap: "topo-vector"
    });

    // Step 2: Set up the view
    const view = new MapView({
        container: "viewDiv", // Div ID where the map will display
        map: map,
        center: [-100, 60], // Centered on Canada
        zoom: 5, // Longitude, Latitude
        
        // camera: {
        //     position: [10.7522, 59.9139], // Longitude, Latitude, Elevation
        //     tilt: 45
        // }
    });

    // Step 3: Add a Feature Layer
    // const featureLayer = new FeatureLayer({
    //   url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/LA_Trails/FeatureServer/0",
    // });

    const featureLayer = new FeatureLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Canada_Stats/FeatureServer/0"
    });

    // Add the layer to the map
    map.add(featureLayer);

    // Step 4: Add interactivity
    view.when((r) => {
      console.log("Map and view are ready!");
      console.log(r.camera.position);
    });

    
});

// Initialize IFC.js Viewer
const ifcViewer = new IfcViewerAPI({ container: document.getElementById("ifcContainer"), backgroundColor: new THREE.Color(0xffffff) });
ifcViewer.addAxes(); // Add axes helper
ifcViewer.addGrid(); // Add grid helper
ifcViewer.IFC.setWasmPath("https://unpkg.com/web-ifc/"); // Load WebAssembly path

// Load an IFC file
async function loadIfc() {
  await ifcViewer.IFC.loadIfcUrl('C:\Users\JudithLourderajPeter\Downloads\ARK - Rådstua_som bygget.ifc');
}

loadIfc();


// const queryUrl = "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Canada_Stats/FeatureServer/0";

// fetch(`${queryUrl}?where=Status='Completed'&outFields=*&f=json`)
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(err => console.error(err));