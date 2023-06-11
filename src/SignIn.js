import { Form, Input, Button, Typography, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "./assets/logo.png";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import PageRoutes from "./constants/page_routes";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import {db} from './App'

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

const { Title } = Typography;

const SignIn = () => {
  const navigate = useNavigate();

  const onFinish =  (values) => {
    console.log("Received values of form: ", values);
    signInWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      global.user = user
      localStorage.setItem("user",JSON.stringify(user))
      console.log(user.uid)
      userData(user.uid)
      // navigate(PageRoutes.HOME);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  };


  const userData = async (uid) => {
    console.log("datata")
    await getDocs(collection(db, "users"))
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id)
        if (doc.id == uid) {
          console.log(doc.data());
          global.userData = doc.data();
          var firestoreData = doc.data()
          firestoreData.dob = doc.data().dateOfBirth.toDate()
          localStorage.setItem("userData", JSON.stringify(firestoreData))
          console.log(new Date(doc.data().dateOfBirth.toDate()).getFullYear())
          navigate(PageRoutes.HOME);
        }
      });
    })
    .catch((error) => {console.log(error)})
  }

  const abc = () => {
    const json = {
      Lat: 6.880979,
      Long: 79.928094,
      Day: 3,
      Time: 10.36,
      Weather: 1,
      Light: 1,
      Sex: 1,
      Age: 31,
      Vehicle_type: 1,
      Vehicle_age: 1
  }

  var arr = [json, json, json, json]
    axios.post("http://127.0.0.1:5000/predict", {wp: arr})
    .then((res) => {console.log(res.data.result)})

  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
      className="page-background"
    >
      <Col span={8}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img src={logo} alt="Logo" width={150} />
        </div>
        <Title level={5} style={{ textAlign: "center", marginBottom: 32 }}>
          Drive Smarter, Not Harder!
        </Title>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>


          <div style={{ textAlign: "center", marginBottom: 32 }}>
            New user?{" "}
            <a
              href="#"
              onClick={
                ()=> navigate(PageRoutes.SIGN_UP)
                // () => abc()
              }
            >
              Sign Up
            </a>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default SignIn;
