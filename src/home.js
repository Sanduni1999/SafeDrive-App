import React, { useState, useRef, useEffect } from "react";
import { Form, Input, Button, DatePicker, Typography, AutoComplete } from "antd";
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

const GoogleMaps = ({ origin, destination }) => {
  const [directions, setDirections] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCogGxOqTC9CsAAC3nyRL9Up9hgfS4yyR0",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <SkeletonButton />;
  }

  const onDirectionsCallback = (result, status) => {
    if (status === "OK") {
      setDirections(result);
    }
  };

  return (
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {origin && destination && (
          <DirectionsService
            options={{
              destination,
              origin,
              travelMode: "DRIVING",
            }}
            callback={(result, status) => {
              if (status === "OK") {
                setDirections(result);
              }
            }}
          />
        )}
        {directions && <DirectionsRenderer options={{ directions }} />}
      </GoogleMap>
  );
};


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
    libraries: ["places"],
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
    setOrigin(data);
  };

  const onChangeDestination = (data) => {
    setOrigin(data);
  };

  // useEffect(() => {
  //   // No need to return anything here
  // }, [originFinal, destinationFinal])

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
            showTime={{ defaultValue: dayjs("00:00", "HH:mm") }}
          />
        </Form.Item>

        <Form.Item
          name="origin"
          label="Origin Location"
          rules={[
            {
              required: true,
              message: "Please input the destination location!",
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

      <GoogleMaps origin={originFinal} destination={destinationFinal} />
      {/* {originFinal && destinationFinal && (
        <GoogleMaps origin={originFinal} destination={destinationFinal} />
      )} */}
    </div>
  );
};

export default AccidentPronePage;
