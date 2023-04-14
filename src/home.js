import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Typography } from "antd";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


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

  const directionsCallback = (result) => {
    if (result !== null) {
      setDirections(result);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCogGxOqTC9CsAAC3nyRL9Up9hgfS4yyR0">
      <GoogleMap
        key={"AIzaSyCogGxOqTC9CsAAC3nyRL9Up9hgfS4yyR0"}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        {origin && destination && (
          <DirectionsService
            options={{
              destination: destination,
              origin: origin,
              travelMode: "DRIVING",
            }}
            callback={directionsCallback}
          />
        )}

        {directions && (
          <DirectionsRenderer
            options={{
              directions: directions,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

const AccidentPronePage = () => {
  const [form] = Form.useForm();
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  // const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  //   // Can not select days before today and today
  //   return current && current < dayjs().endOf('day');
  // };
  
  // const disabledDateTime = () => ({
  //   disabledHours: () => range(0, 24).splice(4, 20),
  //   disabledMinutes: () => range(30, 60),
  //   disabledSeconds: () => [55, 56],
  // });

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    setOrigin(values.origin);
    setDestination(values.destination);
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
            // disabledDate={disabledDate}
            // disabledTime={disabledDateTime}
            showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
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
          <Input placeholder="Enter the origin location" />
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
          <Input placeholder="Enter the destination" />
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
