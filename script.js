require([
    "esri/Map", // Map object
    "esri/views/MapView", // Map View
    "esri/layers/FeatureLayer", // For adding feature layers
  ], function (Map, MapView, FeatureLayer) {
    // Step 1: Create the map
    const map = new Map({
      basemap: "topo-vector", // Options: "streets", "satellite", etc.
    });

    // Step 2: Set up the view
    const view = new MapView({
      container: "viewDiv", // Div ID where the map will display
      map: map,
      center: [-118.80543, 34.027], // Longitude, Latitude
      zoom: 13, // Initial zoom level
    });

    // Step 3: Add a Feature Layer
    const featureLayer = new FeatureLayer({
      url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/LA_Trails/FeatureServer/0",
    });

    // Add the layer to the map
    map.add(featureLayer);

    // Step 4: Add interactivity
    view.when(() => {
      console.log("Map and view are ready!");
    });
  });