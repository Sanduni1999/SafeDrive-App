import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Typography,
  AutoComplete,
} from "antd";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import SkeletonButton from "antd/es/skeleton/Button";
import axios from "axios";
import { UnorderedListOutlined } from "@ant-design/icons";

const { Title } = Typography;
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 6.863117,
  lng: 79.900803,
};

var wayPoints = [];

const GoogleMaps = ({ origin, destination, successCallback, queryDt }) => {
  const [directions, setDirections] = useState(null);
  const [markers, setMarkers] = useState([]);
  let count = React.useRef(0);
  let count1 = React.useRef(0);

  const directionsCallback = (result, status) => {
    console.log(result);
    wayPoints = [];
    if (result !== null && count.current < 1) {
      count.current += 1;
      console.log("****" + status + " " + Object.keys(result).includes("routes"))
      if (status === "OK" && Object.keys(result).includes("routes")) {
        console.log("****")
        if (
          result.routes.length > 0 &&
          result.routes[0]["overview_path"] &&
          result.routes[0]["overview_path"].length > 0
        ) {
       
          result.routes[0]["overview_path"].forEach((element) => {
            const json = {
              Lat: element.lat(),
              Long: element.lng(),
              Day: queryDt().day,
              Time: queryDt().time,
              Weather: 1,
              Light: 1,
              Sex: global.userData.sex,
              Age: (new Date().getFullYear() - new Date(global.userData.dateOfBirth.toDate()).getFullYear()),
              Vehicle_type: global.userData.vehicleType,
              Vehicle_age: (new Date().getFullYear() - global.userData.yearOfManufacture),
            };
            console.log(json)
            wayPoints.push(json);
          });

        }
        setDirections(result);
      }
    } else {
      count.current = 0;
    }

    if(wayPoints.length > 0){
      predWeather(wayPoints)
    }
  };

  const predWeather = (wayPoints) => {
    const url =`http://api.openweathermap.org/data/2.5/forecast?lat=${wayPoints[0].Lat}&lon=${wayPoints[0].Long}&appid=b331c99907035539ce3b056166ac8f72`
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then((result) => {
      console.log(result)
      if(result != null && Object.keys(result).includes("list") && result.list.length > 0){
        var ms = queryDt().ms
        var currentWeather = null
        var weather = null
        console.log(ms)
        for(var i =1; i < result.list.length; i++){
          console.log(result.list[i-1].dt)
          if(ms >= parseInt(result.list[i-1].dt+"000") && ms <= parseInt(result.list[i].dt+"000")){
            if(ms - parseInt(result.list[i-1].dt+"000") < parseInt(result.list[i].dt - ms+"000")){
              currentWeather = result.list[i-1].weather[0].main
              weather = result.list[i-1]
              break
            } else if(ms - parseInt(result.list[i-1].dt+"000") > parseInt(result.list[i].dt - ms+"000")){
              currentWeather = result.list[i].weather[0].main
              weather = result.list[i-1]
              break
            } else {
              currentWeather = result.list[i-1].weather[0].main
              weather = result.list[i-1]
              break
            }
          }
        }

        console.log(currentWeather)
        console.log(weather)

        if(currentWeather != null){
          wayPoints.map((e) => {e.Weather = (currentWeather.toLowerCase() === "rain" ? 2 : 1)})
          console.log(wayPoints[0])
          getPreditions(wayPoints)
        }
      }
    })
    .catch(err => {
      console.log(err)
    })
  }



  const getPreditions = (wayPoints) => {
    count1.current = 0
    axios
    .post("http://127.0.0.1:5000/predict", { wp: wayPoints })
    .then((res) => {
      console.log(res);
      if (Object.keys(res.data).includes("result")) {
        var arr = [];

        res.data.result.forEach((e) => {
          if (e.pred != 5) {
            e.color = "blue";
            arr.push(e);
          }
        });

        console.log("ARR " + arr)
        if(count1.current < 1){
        setMarkers(arr);
          count1.current += 1 
        }
      }
    })
    .catch(err => console.error(err));
  } 

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      {origin && destination && (
        <DirectionsService
          options={{
            destination,
            origin,
            travelMode: "DRIVING",
          }}
          callback={directionsCallback}
          
        />
      )}
      {markers &&
        markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker["lat"], lng: marker["lng"] }}
          />
        ))}
      {directions && <DirectionsRenderer options={{ directions }} />}
    </GoogleMap>
  );
};

export default React.memo(GoogleMaps);
