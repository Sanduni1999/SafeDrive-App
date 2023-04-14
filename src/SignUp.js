import { Form, Input, Button, Typography, Row, Col, Select } from 'antd';
import { UserOutlined, LockOutlined, CalendarOutlined, CarOutlined } from '@ant-design/icons';
import logo from "./assets/logo.png";

const { Title } = Typography;
const { Option } = Select;

const SignUp = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={8}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <img src={logo} alt="Logo" width={150} />
        </div>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>
          Create your account
        </Title>
        <Form
          name="normal_signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            rules={[{ required: true, message: 'Please input your date of birth!' }]}
          >
            <Input prefix={<CalendarOutlined />} placeholder="Date of Birth" />
          </Form.Item>
          <Form.Item
            name="vehicleType"
            rules={[{ required: true, message: 'Please select your vehicle type!' }]}
          >
            <Select prefix={<CarOutlined />} placeholder="Vehicle Type">
              <Option value="car">Car</Option>
              <Option value="motorcycle">Motorcycle</Option>
              <Option value="truck">Truck</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="yearOfManufacture"
            rules={[
              { required: true, message: 'Please input the year of manufacture!' },
              { pattern: /^[0-9]{4}$/, message: 'Please enter a valid 4-digit year!' }
            ]}
          >
            <Input prefix={<CalendarOutlined />} placeholder="Year of Manufacture" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SignUp;
