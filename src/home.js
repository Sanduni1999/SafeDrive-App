import React, { useState, useRef, useEffect } from "react";
import { Form, Input, Button, DatePicker, Typography } from "antd";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import SkeletonButton from "antd/es/skeleton/Button";
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import LocationSearchInput from "./components/locationinput";

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

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    setOrigin(values.origin);
    setDestination(values.destination);
  };

  this.state = { address: '' };

  function handleChange(address) {
    this.setState({ address });
  };

  function handleSelect(address) {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

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
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
          />
        </Form.Item>

        <Form.Item
          name="address"
          label="Origin Location"
        >
          
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
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
          {/* <Autocomplete> */}
          <Input placeholder="Enter the destination" />
          {/* </Autocomplete> */}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <GoogleMaps origin={origin} destination={destination} />
    </div>
  );
};

export default AccidentPronePage;
