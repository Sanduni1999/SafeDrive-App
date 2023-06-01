import React, { useState, useRef, useEffect } from "react";
import { Form, Input, Button, DatePicker, Typography, AutoComplete } from "antd";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
import {PLACES_LIST} from './MapConfigurations.js';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import SkeletonButton from "antd/es/skeleton/Button";
import GoogleMaps from './gmaps.js'
import axios from "axios";
import moment from "moment/moment.js";

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

var datetime = {
  time: 0,
  day: 0
}

const AccidentPronePage = () => {
  const [form] = Form.useForm();
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [originFinal, setOriginFinal] = useState(null);
  const [destinationFinal, setDestinationFinal] = useState(null);
  
  const [directionsRequest, setDirectionsRequest] = useState(null);


  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    
    setOriginFinal(values.origin);
    setDestinationFinal(values.destination);
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCogGxOqTC9CsAAC3nyRL9Up9hgfS4yyR0",
    libraries: PLACES_LIST,
  });

  const autocompleteService = isLoaded ? new window.google.maps.places.AutocompleteService() : null;

  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    if (autocompleteService) {
      autocompleteService.getPlacePredictions({ input: searchText }, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const newOptions = results.map((result) => ({
            value: result.description,
          }));
          setOptions(newOptions);
        } else {
          setOptions([]);
        }
      });
    }
  };

  const onChangeOrigin = (data) => {
    console.log(data)
    setOrigin(data);
  };

  const onChangeDestination = (data) => {
    setOrigin(data);
  };


  const setResponseMarkers = (res) => {

  }

  const getDatetime = () => {
    return datetime
  }

  return (
    <div style={{ padding: "32px" }}>
      <Title level={4}>Enter trip details</Title>

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="datetime"
          label="Date & Time"
          rules={[
            {
              required: true,
              message: "Please select a date and time!",
            },
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm"
            disabledDate={(current) => current.isBefore(moment().subtract(1,"day"))}
            showTime={{ defaultValue: dayjs("00:00", "HH:mm") }}
            onChange={(date, dateString) => {
              datetime.day = date.day() === 0 ? 7 : date.day()
              datetime.time = parseFloat(date.hour() + "." + date.minute())
              datetime.ms =  date.valueOf()
              console.log(date +  " " + dateString + " " + JSON.stringify(datetime))
              console.log(datetime)
            }}
          />
        </Form.Item>

        <Form.Item
          name="origin"
          label="Origin Location"
          rules={[
            {
              required: true,
              message: "Please input the origin location!",
            },
          ]}
        >
          <AutoComplete
            value={origin}
            options={options}
            onSearch={onSearch}
            onChange={onChangeOrigin}
            placeholder="Enter the origin"
          />
        </Form.Item>

        <Form.Item
          name="destination"
          label="Destination Location"
          rules={[
            {
              required: true,
              message: "Please input the destination location!",
            },
          ]}
        >
          <AutoComplete
            value={destination}
            options={options}
            onSearch={onSearch}
            onChange={onChangeDestination}
            placeholder="Enter the destination"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <GoogleMaps origin={originFinal} destination={destinationFinal} queryDt = {getDatetime}/>
    </div>
  );
};

export default AccidentPronePage;
