import { Form, Input, Button, Typography, Row, Col, Select, DatePicker } from 'antd';
import { UserOutlined, LockOutlined, CalendarOutlined, CarOutlined } from '@ant-design/icons';
import logo from "./assets/logo.png";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import PageRoutes from "./constants/page_routes";
import dayjs from 'dayjs';

const firebaseConfig = {
  apiKey: "AIzaSyCo4DzDYh59P-ugwFHy8ai6GczFX0Gh1v4",
  authDomain: "accidentpronelocation.firebaseapp.com",
  projectId: "accidentpronelocation",
  storageBucket: "accidentpronelocation.appspot.com",
  messagingSenderId: "1045136166697",
  appId: "1:1045136166697:web:58c5bd8005ad8062b37138",
  measurementId: "G-PNYRC173DB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const { Title } = Typography;
const { Option } = Select;

const SignUp = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", dayjs(values.yearOfManufacture.$d, 'YYYY'));
    if (values.password == values.confirmPassword) {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(async (userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          await setDoc(doc(db, "users", user.uid), {
            email: values.email,
            dateOfBirth: values.dateOfBirth.$d,
            sex: parseInt(values.sex),
            vehicleType: parseInt(values.vehicleType),
            yearOfManufacture: values.yearOfManufacture.$y,
          })
          .then(() => {
            console.log("Document successfully written!");
            navigate(PageRoutes.SIGN_IN);
          });
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    } else {
      console.log("Passwords do not match!");
      alert("Passwords do not match!");
    }
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
            rules={[{ required: true, type: "email", message: 'Please input your email!' }]}
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
            rules={[
              { required: true, message: 'Please input your date of birth!', type: 'date' }
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              placeholder="Date of Birth"
              defaultValue={dayjs('2004', 'YYYY')}
            />
            
          </Form.Item>

          <Form.Item
            name="sex"
            rules={[{ required: true, message: 'Please select your gender!' }]}
          >
            <Select prefix={<UserOutlined />} placeholder="Gender">
              <Option value="1">Male</Option>
              <Option value="2">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="vehicleType"
            rules={[{ required: true, message: 'Please select your vehicle type!' }]}
          >
            <Select prefix={<CarOutlined />} placeholder="Vehicle Type">
              <Option value="1">Car</Option>
              <Option value="2">Van/Jeep</Option>
              <Option value="3">Lorry</Option>
              <Option value="4">Bicycle</Option>
              <Option value="5">Motor Cycle</Option>
              <Option value="6">Three Wheeler</Option>
              <Option value="7">Bus</Option>
              <Option value="8">Tractor</Option>
              <Option value="9">Animal drawn vehicle</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="yearOfManufacture"
            rules={[
              { required: true, message: 'Please input the year of manufacture!' }
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY"
              placeholder="Year of Manufacture"
              picker="year"
            />
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
