// Travel map

var imageUrl;

var map = L.map('map', {
    center: [4.2080816, 40.0899583],
    zoom: 2,
    minZoom: 2,
    closePopupOnClick: false
});

const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

const openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
});

const esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/world_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

var points = {
    "type": "FeatureCollection",
    "features": [
        { "type": "Feature", "id": 1, "geometry": { "type": "Point", "coordinates": [-91.266508600611544, 16.404980336165718] }, "properties": { "OBJECTID": 2, "Name": "Laguna Miramar", "Location": "Mexico", "Type": "Natural attraction", "Description": "A pristine blue lake located in the remote southeastern jungles of Mexico. It is recommended to take a small plane in order to see the scene from above.", "ImageUrl": "images/miramar.jpg" } },
        { "type": "Feature", "id": 2, "geometry": { "type": "Point", "coordinates": [-107.65307945447519, 37.491161840448648] }, "properties": { "OBJECTID": 3, "Name": "San Juan National Forest", "Location": "United States", "Type": "Natural attraction", "Description": "A beautiful wilderness that I hope to visit someday. Some great hikes out here.", "ImageUrl": "images/sanjuan.jpg" } },
        { "type": "Feature", "id": 3, "geometry": { "type": "Point", "coordinates": [-76.897672585448504, 42.637648458320307] }, "properties": { "OBJECTID": 5, "Name": "Finger Lakes", "Location": "United States", "Type": "Natural attraction", "Description": "Have always wanted to visit and it's less than a dozen hours away, but haven't had the time yet.", "ImageUrl": "images/fingerlakes.jpg" } },
        { "type": "Feature", "id": 4, "geometry": { "type": "Point", "coordinates": [-1.9828200598752457, 43.315804734046424] }, "properties": { "OBJECTID": 6, "Name": "Basque Country", "Location": "Spain", "Type": "City or Region", "Description": "I'm fascinated by the history of this place.", "ImageUrl": "images/basquecountry.jpg" } },
        { "type": "Feature", "id": 5, "geometry": { "type": "Point", "coordinates": [9.1072502342173749, 40.170322665444424] }, "properties": { "OBJECTID": 8, "Name": "Sardinia", "Location": "Italy", "Type": "City or Region", "Description": "I have already been to Corsica and I've heard Sardinia is just as nice. Also, apparently the food is very unique within Italy.", "ImageUrl": "images/sardinia.jpg" } },
        { "type": "Feature", "id": 6, "geometry": { "type": "Point", "coordinates": [134.74899288891086, -24.020778679464701] }, "properties": { "OBJECTID": 9, "Name": "Australia", "Location": "Australia", "Type": "Country", "Description": "I would love to visit at some point of my life.", "ImageUrl": "images/australia.jpg" } },
        { "type": "Feature", "id": 7, "geometry": { "type": "Point", "coordinates": [-70.651860857912183, -33.448360184284326] }, "properties": { "OBJECTID": 11, "Name": "Santiago", "Location": "Chile", "Type": "City or Region", "Description": "I have friends who live here and I would love to visit them someday.", "ImageUrl": "images/santiago.jpg" } },
        { "type": "Feature", "id": 8, "geometry": { "type": "Point", "coordinates": [16.984421982410339, -21.493534159489364] }, "properties": { "OBJECTID": 12, "Name": "Namibia", "Location": "Namibia", "Type": "Country", "Description": "This is the first country on my list in Africa. Beautiful landscapes.", "ImageUrl": "images/namibia.jpg" } },
        { "type": "Feature", "id": 9, "geometry": { "type": "Point", "coordinates": [114.15560341898241, 22.279719797609946] }, "properties": { "OBJECTID": 13, "Name": "Hong Kong", "Location": "Hong Kong", "Type": "City or Region", "Description": "I've always seen Hong Kong a lot in movies and media and would love to step foot there someday. Also, amazing street food.", "ImageUrl": "images/hongkong.jpg" } },
        { "type": "Feature", "id": 10, "geometry": { "type": "Point", "coordinates": [-155.15840522550846, 58.265413231909463] }, "properties": { "OBJECTID": 14, "Name": "Novarupta", "Location": "United States", "Type": "Natural attraction", "Description": "Site of one of the largest volcanic eruptions in history, extremely remote, a lot of brown bears, and the Valley of the 10,000 Smokes.", "ImageUrl": "images/novarupta.jpg" } },
        { "type": "Feature", "id": 11, "geometry": { "type": "Point", "coordinates": [-93.73321078660345, 16.9414696312552] }, "properties": { "OBJECTID": 1, "Name": "Arco del Tiempo", "Location": "Mexico", "Type": "Natural attraction", "Description": "One of the tallest natural arches in the world at 180 meters. Located in a remote corner of the El Ocote jungle.", "ImageUrl": "images/arcodeltiempo.jpg" } }
    ]
};

/*
var geoJSONMarkerOptions = {
    radius: 8,
    fillColor: "#036bfc",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
};
*/

var customIcon = L.Icon.extend({
    options: {
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [16, 0]
    }
});

var icon = new customIcon({ iconUrl: "images/push-pin.svg" });

const pointsLayer = L.geoJSON(points, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: icon });
    },
    onEachFeature: function (feature, layer) {
        layer.addEventListener("click", () => {

            layer.bindPopup(`<text class="popup-title">${feature.properties.Name}</text><br><b>Location: </b>${feature.properties.Location}<br><b>Type: </b>${feature.properties.Type}<br><b>Description: </b>${feature.properties.Description}<br><img class="popup-img" src="${feature.properties.ImageUrl}">`);
            // The zoom button
            /*<br><div class="zoomTo">Zoom to feature</div>*/
        });
    }
}).addTo(map);

const baseMaps = {
    "OpenStreetMap": osm,
    "OpenTopoMap": openTopoMap,
    "ESRI World Imagery": esriWorldImagery
};

const layerControl = L.control.layers(baseMaps).addTo(map);

/*

var zoomTo = document.getElementsByClassName("zoomTo");
zoomTo.addEventListener("click", function() {
    map.zoomTo([16.9414696312552, -93.73321078660345], 19);
});
*/
