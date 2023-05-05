import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import L from "leaflet";
import Script from "react-load-script";
import WindJSLeaflet from "wind-js-leaflet";
import HeatmapOverlay from "heatmap.js/plugins/leaflet-heatmap";
import "leaflet/dist/leaflet.css";

function DashboardRender() {
  //   const [lat, setLat] = useState(39.923568)
  //   const [lng, setLng] = useState(116.403335)120.28,31.48
  const [position, setPosition] = useState([31.48, 120.28]);
  const [zoom, setZoom] = useState(5);
  const [value, setValue] = useState("");
  useEffect(() => {
    //   const map = L.map("map", {
    //     center: position,
    //     zoom,
    //   });
    //   const imageURL3 =
    //     "https://t0.tianditu.gov.cn/img_w/wmts?" +
    //     "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
    //     "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&transparent=true" +
    //     "&tk=852ce03dc83fae5150f1b2ec9c347edb";
    //   // const imgLayer = L.tileLayer(imageURL3, {
    //   //   subdomains: ["mt0", "mt1", "mt2", "mt3"],
    //   // }).addTo(map); https://t0.tianditu.gov.cn/cia_w/wmts?tk=75f0434f240669f4a2df6359275146d2&
    //   // SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&transparent=true&TILEMATRIX=13&TILEROW=3353&TILECOL=6854
    //   const ciaURL =
    //     "https://t0.tianditu.gov.cn/cia_c/wmts?" +
    //     "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
    //     "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&transparent=true" +
    //     "&tk=852ce03dc83fae5150f1b2ec9c347edb";
    //   // const ciaLayer = L.tileLayer(ciaURL, {
    //   //   attribution: "Map data © OpenStreetMap contributors",
    //   // }).addTo(map);
    //   const mapLayers = {
    //     卫星图: L.layerGroup([
    //       L.tileLayer(ciaURL, {
    //         attribution: "Map data © OpenStreetMap contributors",
    //       }),
    //       L.tileLayer(imageURL3, {
    //         subdomains: ["mt0", "mt1", "mt2", "mt3"],
    //       }),
    //     ]).addTo(map),
    //     矢量图: L.layerGroup([
    //       L.tileLayer(
    //         `https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&transparent=true&tk=852ce03dc83fae5150f1b2ec9c347edb&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}`,
    //         {
    //           subdomains: ["mt0", "mt1", "mt2", "mt3"],
    //         }
    //       ),
    //       L.tileLayer(
    //         "https://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&transparent=true&tk=852ce03dc83fae5150f1b2ec9c347edb&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
    //         {
    //           attribution: "Map data © OpenStreetMap contributors",
    //         }
    //       ),
    //     ]),
    //   };
    //   const layerControl = L.control
    //     .layers(
    //       mapLayers,
    //       {},
    //       {
    //         position: "topright",
    //         collapsed: true,
    //       }
    //     )
    //     .addTo(map);
    //   L.marker(position).addTo(map);
    //   console.log("[ WindJSLeaflet ] >", WindJSLeaflet);
    //   const handleError = function (err) {
    //     console.log("handleError...");
    //     console.log(err);
    //   };

    //   WindJSLeaflet.init({
    //     localMode: true, //true，则加载本地风场数据源
    //     map: map, //地图对象
    //     layerControl: layerControl, //地图底图切换控件
    //     useNearest: false,
    //     timeISO: null,
    //     nearestDaysLimit: 7,
    //     displayValues: true,
    //     displayOptions: {
    //       displayPosition: "bottomleft",
    //       displayEmptyString: "No wind data",
    //     },
    //     overlayName: "风场图", //叠加风场图图层名称

    //     // https://github.com/danwild/wind-js-server
    //     //加载在线风场图数据源
    //     pingUrl: "http://localhost:7000/alive",
    //     latestUrl: "http://localhost:7000/latest",
    //     nearestUrl: "http://localhost:7000/nearest",
    //     errorCallback: handleError,
    //   });
    //   // setTimeout(() => {
    //   //   console.log("[ e ] >", L.heatLayer);
    //   // });

    //   // console.log('[ $ ] >', $)
    //   heatLoad(layerControl);
    initMap();
  }, []);

  const initMap = () => {
    const map = L.map("map", {
      center: position,
      zoom,
    });
    const imageURL3 =
      "https://t0.tianditu.gov.cn/img_w/wmts?" +
      "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
      "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&transparent=true" +
      "&tk=852ce03dc83fae5150f1b2ec9c347edb";
    // const imgLayer = L.tileLayer(imageURL3, {
    //   subdomains: ["mt0", "mt1", "mt2", "mt3"],
    // }).addTo(map); https://t0.tianditu.gov.cn/cia_w/wmts?tk=75f0434f240669f4a2df6359275146d2&
    // SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&transparent=true&TILEMATRIX=13&TILEROW=3353&TILECOL=6854
    const ciaURL =
      "https://t0.tianditu.gov.cn/cia_c/wmts?" +
      "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
      "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&transparent=true" +
      "&tk=852ce03dc83fae5150f1b2ec9c347edb";
    // const ciaLayer = L.tileLayer(ciaURL, {
    //   attribution: "Map data © OpenStreetMap contributors",
    // }).addTo(map);
    const mapLayers = {
      卫星图: L.layerGroup([
        L.tileLayer(ciaURL, {
          attribution: "Map data © OpenStreetMap contributors",
        }),
        L.tileLayer(imageURL3, {
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }),
      ]).addTo(map),
      矢量图: L.layerGroup([
        L.tileLayer(
          `https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&transparent=true&tk=852ce03dc83fae5150f1b2ec9c347edb&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}`,
          {
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
          }
        ),
        L.tileLayer(
          "https://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&transparent=true&tk=852ce03dc83fae5150f1b2ec9c347edb&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
          {
            attribution: "Map data © OpenStreetMap contributors",
          }
        ),
      ]),
    };
    const layerControl = L.control
      .layers(
        mapLayers,
        {},
        {
          position: "topright",
          collapsed: true,
        }
      )
      .addTo(map);
    L.marker(position).addTo(map);
    console.log("[ WindJSLeaflet ] >", WindJSLeaflet);
    const handleError = function (err) {
      console.log("handleError...");
      console.log(err);
    };

    WindJSLeaflet.init({
      localMode: true, //true，则加载本地风场数据源
      map: map, //地图对象
      layerControl: layerControl, //地图底图切换控件
      useNearest: false,
      timeISO: null,
      nearestDaysLimit: 7,
      displayValues: true,
      displayOptions: {
        displayPosition: "bottomleft",
        displayEmptyString: "No wind data",
      },
      overlayName: "风场图", //叠加风场图图层名称

      // https://github.com/danwild/wind-js-server
      //加载在线风场图数据源
      pingUrl: "http://localhost:7000/alive",
      latestUrl: "http://localhost:7000/latest",
      nearestUrl: "http://localhost:7000/nearest",
      errorCallback: handleError,
    });
    // setTimeout(() => {
    //   console.log("[ e ] >", L.heatLayer);
    // });

    // console.log('[ $ ] >', $)
    heatLoad(layerControl);
  };

  const heatLoad = (layerControl) => {
    const cfg = {
      radius: 2,
      maxOpacity: 0.8,
      scaleRadius: true,
      useLocalExtrema: true,
      latField: "lat",
      lngField: "lng",
      valueField: "count",
      gradient: {
        // 0.99: "rgba(255,0,0,0.4)",
        // 0.9: "rgba(255,255,0,1)",
        // 0.8: "rgba(0,255,0,1)",
        // 0.5: "rgba(0,255,255,1)",
        // 0: "rgba(0,0,255,1)",
        // 0.99: "rgb(190, 65, 18, 1)",
        // 0.91: "rgb(190, 65, 18, 1)",
        0.84: "rgb(149, 137, 211, 1)",
        0.77: "rgb(150, 209, 216, 1)",
        0.70: "rgb(129, 204, 197, 1)",
        0.63: "rgb(103, 180, 186, 1)",
        0.56: "rgb(95, 143, 197, 1)",
        0.49: "rgb(80, 140, 62, 1)",
        0.42: "rgb(121, 146, 28, 1)",
        0.35: "rgb(171, 161, 14, 1)",
        0.28: "rgb(223, 177, 6, 1)",
        0.21: "rgb(243, 150, 6, 1)",
        0.14: "rgb(236, 95, 21, 1)",
        0.07: "rgb(190, 65, 18, 1)",
        0: "rgba(138, 43, 10, 1)",
      },
    };
    // if (data[i].value <= -20) {
    //   fillStyle = "rgb(149, 137, 211)";
    // } else if (data[i].value < -15) {
    //   fillStyle = "rgb(150, 209, 216)";
    // } else if (data[i].value < -10) {
    //   fillStyle = "rgb(129, 204, 197)";
    // } else if (data[i].value <= -5) {
    //   fillStyle = "rgb(103, 180, 186)";
    // } else if (data[i].value <= 0) {
    //   fillStyle = "rgb(95, 143, 197)";
    // } else if (data[i].value <= 5) {
    //   fillStyle = "rgb(80, 140, 62)";
    // } else if (data[i].value <= 10) {
    //   fillStyle = "rgb(121, 146, 28)";
    // } else if (data[i].value <= 15) {
    //   fillStyle = "rgb(171, 161, 14)";
    // } else if (data[i].value <= 20) {
    //   fillStyle = "rgb(223, 177, 6)";
    // } else if (data[i].value <= 25) {
    //   fillStyle = "rgb(243, 150, 6)";
    // } else if (data[i].value <= 30) {
    //   fillStyle = "rgb(236, 95, 21)";
    // } else if (data[i].value <= 35) {
    //   fillStyle = "rgb(190, 65, 18)";
    // } else if (data[i].value <= 40) {
    //   fillStyle = "rgb(138, 43, 10)";
    // }
    let testData = {
      max: 8,
      data: [],
    };
    // eslint-disable-next-line no-undef
    $.getJSON("wrf.json", function (data) {
      const heatmapLayer = new HeatmapOverlay(cfg);
      layerControl.addOverlay(heatmapLayer, "热力图");
      // {"lng":116.419242,"lat":39.915891,"count":1}
      const heat = [];
      for (const v of data) {
        heat.push({
          lng: Number(v.longitude),
          lat: Number(v.latitude),
          count: Number(v.value),
        });
      }
      testData.data = heat;
      heatmapLayer.setData(testData);
      console.log("[ testData ] >", data);
    });
  };

  const loadWindy = (e) => {
    const options = {
      // Required: API key
      key: "KBX0NFqnMA8uaRFAmVZZAILCazWdqcqX", // REPLACE WITH YOUR KEY !!!

      // Put additional console output
      verbose: true,

      // Optional: Initial state of the map
      lat: position[0],
      lon: position[1],
      zoom,
    };
    window.windyInit(options, (windyAPI) => {
      // windyAPI is ready, and contain 'map', 'store',
      // 'picker' and other usefull stuff
      //   const { map } = windyAPI;
      // .map is instance of Leaflet map
      //   const map = L.map("map", {
      //     center: position,
      //     zoom,
      //   });
      //   const imageURL3 =
      //     "https://t0.tianditu.gov.cn/img_w/wmts?" +
      //     "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
      //     "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&transparent=true" +
      //     "&tk=852ce03dc83fae5150f1b2ec9c347edb";
      //   const imgLayer = L.tileLayer(imageURL3, {
      //     subdomains: ["mt0", "mt1", "mt2", "mt3"],
      //   }).addTo(map);
      //   const ciaURL =
      //     "https://t0.tianditu.gov.cn/cia_c/wmts?" +
      //     "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles" +
      //     "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&transparent=true" +
      //     "&tk=852ce03dc83fae5150f1b2ec9c347edb";
      //   const ciaLayer = L.tileLayer(ciaURL, {
      //     attribution: "Map data © OpenStreetMap contributors",
      //   }).addTo(map);
      //   ciaLayer.bringToFront();
      //   L.marker(position).addTo(map);
      // L.popup()
      //     .setLatLng(position)
      //     .setContent('Hello World')
      //     .openOn(map);
    });
  };

  const onChange = ({ target: { value } }) => {
    setValue(value);
    console.log("[ value ] >", value);
    if (value === "") {
      initMap();
    } else {
      loadWindy();
    }
  };

  return (
    <>
      <Script
        url="https://api.windy.com/assets/map-forecast/libBoot.js"
        onLoad={(e) => loadWindy(e)}
      />
      {/* <Script url="https://code.jquery.com/jquery-3.6.4.slim.min.js" integrity="sha256-a2yjHM4jnF9f54xUQakjZGaqYs/V1CYvWpoqZzC2/Bw=" crossorigin="anonymous" /> */}
      <Script url="https://cdn.jsdelivr.net/npm/leaflet.heat/dist/leaflet-heat.js" />
      <Radio.Group
        options={[
          { label: "普通", value: "" },
          { label: "Windy", value: "windy" },
        ]}
        onChange={onChange}
        value={value}
        optionType="button"
      />
      {/* <div id="windy" className="h-[90vh] w-full" style={{display: value === "windy" ? "block" : "none"}}></div> */}
      <div
        id="map"
        className="h-[90vh] w-full"
        style={{ display: value !== "windy" ? "block" : "none" }}
      ></div>
      {/* {
        value === "windy" ? <div id="windy" className="h-[90vh] w-full"></div> : <div id="map" className="h-[90vh] w-full"></div>
      } */}

      {/* <MapContainer className="h-[90%] w-full" center={position} zoom={zoom}>
          <TileLayer
            attribution='Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer> */}
    </>
  );
}

export default DashboardRender;
