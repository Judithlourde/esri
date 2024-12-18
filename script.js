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

// const queryUrl = "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Canada_Stats/FeatureServer/0";

// fetch(`${queryUrl}?where=Status='Completed'&outFields=*&f=json`)
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(err => console.error(err));