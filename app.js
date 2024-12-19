import { Color } from 'three';
import { IfcViewerAPI } from 'web-ifc-viewer';
import {IfcAPI,IFCSPACE} from "web-ifc/web-ifc-api";
const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });
// viewer.IFC.loader.ifcManager.applyWebIfcConfig({
//     COORDINATE_TO_ORIGIN: true,
//     USE_FAST_BOOLS: true,
// });

// Create grid and axes
viewer.axes.setAxes();
viewer.grid.setGrid();

const input = document.getElementById("file-input");

input.addEventListener("change",
    async (changed) => {
        await viewer.IFC.loader.ifcManager.applyWebIfcConfig({
            COORDINATE_TO_ORIGIN: true,
            USE_FAST_BOOLS: true,
        });
        const file = changed.target.files[0];
        const ifcURL = URL.createObjectURL(file);
        viewer.IFC.loadIfcUrl(ifcURL);
    },
    false
);

async function loadIfc() {
    await viewer.IFC.loader.ifcManager.applyWebIfcConfig({
        COORDINATE_TO_ORIGIN: true,
        USE_FAST_BOOLS: true,
    });

    // Load the model
    const model = await viewer.IFC.loadIfcUrl('../IFC/04.ifc');
    const properties =  await viewer.IFC.properties.serializeAllProperties(model);
    console.log(properties);
    // Add dropped shadow and post-processing efect
    // await viewer.shadowDropper.renderShadow(model.modelID);
    // viewer.context.renderer.postProduction.active = true;
    // console.log(model);

    const file = new File(properties, 'properties');
    console.log(file);
    const fileLink = URL.createObjectURL(file);
    console.log(fileLink.json);
    // const link = document.createElement('a');
    // document.body.appendChild(link);
    // link.href = URL.createObjectURL(file);
    // link.download = 'properties.json';
    // link.click();
    // link.remove();
}

// loadIfc();

window.ondblclick = async () => await viewer.IFC.selector.pickIfcItem(true);
window.onmousemove = async () => await viewer.IFC.selector.prePickIfcItem();

window.ondblclick = () => viewer.IFC.selector.pickIfcItem();
window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();
viewer.clipper.active = true;

window.onkeydown = (event) => {
    if (event.code === "KeyP") {
        viewer.clipper.createPlane();
    } else if (event.code === "KeyO") {
        viewer.clipper.deletePlane();
    }
};

const ifcFileLocation = "test.ifc";
let modelID = 0;

/**
* resolve a Uint8Array().
*
* @param string url location of your ifc file
* @returns {Promise}
*/
function getIfcFile(url) {
    return new Promise((resolve, reject) => {
            var oReq = new XMLHttpRequest();
            oReq.responseType = "arraybuffer";
            oReq.addEventListener("load", () => {
                resolve(new Uint8Array(oReq.response));
            });
            oReq.open("GET", url);
            oReq.send();
    });
}

/**
* Get all IFCSPACE from ifc file
* @param integer modelID
* @returns array
*/

const ifcapi = new IfcAPI();
function getAllSpaces(modelID) {
    // Get all the propertyset lines in the IFC file
    let lines = ifcapi.GetLineIDsWithType(modelID, IFCSPACE);
    let lineSize = lines.size();
    let spaces = [];
    for (let i = 0; i < lineSize; i++) {
        // Getting the ElementID from Lines
        let relatedID = lines.get(i);
        // Getting Element Data using the relatedID
        let relDefProps = ifcapi.GetLine(modelID, relatedID);
        spaces.push(relDefProps);

    }
    return spaces;
}

ifcapi.Init().then(() => {
    getIfcFile(ifcFileLocation).then( (ifcData) => {
        modelID = ifcapi.OpenModel(ifcData);
        let isModelOpened = ifcapi.IsModelOpen(modelID);
        console.log({isModelOpened});
        let spaces = getAllSpaces(modelID);
        console.log({spaces});
        console.log(spaces.map(a => a.LongName.value));
        ifcapi.CloseModel(modelID);
    });
});

async function init() {
    await viewer.IFC.setWasmPath(wasmPath);
    const model = await viewer.IFC.loadIfcUrl(url);
    const properties =  await viewer.IFC.properties.serializeAllProperties(model);
    console.log(properties);
}

