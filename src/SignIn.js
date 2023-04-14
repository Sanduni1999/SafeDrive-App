import { Form, Input, Button, Typography, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "./assets/logo.png";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import PageRoutes from "./constants/page_routes";

const { Title } = Typography;

const SignIn = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  // const handleSignUpClick = () => {
  //   window.location.href = SignUp;
  // };
  const navigate = useNavigate();

  const abc = () => {
    fetch("hello").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
               console.log(data);
            })
        );

    // fetch({ url: "http://127.0.0.1:5000/hello", method: "GET" })
    //   .then((val) => {
    //     console.log("Hi" + val.body);

    //     val.json().then(res => {
    //       console.log("DATA  + " + res);

    //     })
    //     .catch(err => console.log(err))
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // fetch({url: "http://localhost:5000/hello", method: "GET"}).then((val)=>{console.log("Hi"+JSON.parse(val))}).catch(err =>{console.log(err)})
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
            <Button
              type="primary"
              onClick={() => navigate(PageRoutes.HOME)}
              block
            >
              Sign In
            </Button>
          </Form.Item>

          {/* <div style={{ textAlign: "center", marginBottom: 32 }}>
            New user? <a href={SignUp}>Sign Up</a>
          </div> */}

          <div style={{ textAlign: "center", marginBottom: 32 }}>
            New user?{" "}
            <a
              href="#"
              onClick={
                // ()=> navigate(PageRoutes.SIGN_UP)
                () => abc()
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
