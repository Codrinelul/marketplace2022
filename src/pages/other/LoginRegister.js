import React, { Fragment, Component } from "react";
import MetaTags from "react-meta-tags";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
import { Link } from "react-router-dom";

export default class LoginRegister extends Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    };

    axios.post('register', data).then(
      res => {
        localStorage.setItem('token', res.data.token)
        console.log(res)
        this.setState({
          message: res.data.errors.email,
          message1: res.data.errors.firstname,
          message2: res.data.errors.lastname,
          message3: res.data.errors.password,
          message4: res.data.status
        })



        console.log(res.data.errors[0]);

      }
    )




  }
  componentDidMount() {

    axios.get('user').then(
      res => {
        this.setState({
          user: res.data
        })
        console.log(res);

      },
      err => console.log(err)
    )
  }
  render() {
    let error = '';
    let error1 = "";
    let error2 = "";
    let error3 = "";
    let error4 = "";
    const isLoggedIn = this.state.user;
    if (this.state.message) {
      error = (
        <div className="alert-danger-text" role="alert">
          {this.state.message}
        </div>
      )
    }
    if (this.state.message1) {
      error1 = (
        <div className="alert-danger-text" role="alert">
          {this.state.message1}
        </div>
      )
    }
    if (this.state.message2) {
      error2 = (
        <div className="alert-danger-text" role="alert">
          {this.state.message2}
        </div>
      )
    }
    if (this.state.message3) {
      error3 = (
        <div className="alert-danger-text" role="alert">
          {this.state.message3}
        </div>
      )
    }
    if (this.state.message4) {
      error4 = (
        <div className="alert-danger-text" role="alert">
          {this.state.message4}
        </div>
      )
    }


    return (
      <Fragment>
        <MetaTags>
          <title>Flone | Login</title>
          <meta
            name="description"
            content="Compare page of flone react minimalist eCommerce template."
          />
        </MetaTags>

        <LayoutOne headerTop="visible">
          {/* breadcrumb */}
          <Breadcrumb />
          <div className="login-register-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                  <div className="login-register-wrapper">
                    <Tab.Container defaultActiveKey="register">
                      <Nav variant="pills" className="login-register-tab-list">
                        <Nav.Item>
                          <Nav.Link eventKey="register">
                            <h4>Register</h4>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="login" href="/login">
                            <h4>Login</h4>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="register">
                          <div className="login-form-container">
                            <div className="login-register-form">
                              {isLoggedIn ?
                                (
                                  <div className="login-register-form mb-20 pb-20">
                                    <h3 className=" mb-20 pb-20">You are logged in!</h3>

                                    <Link className="UploadButton mt-40-b" to={process.env.PUBLIC_URL + "/home-fashion-three"}   >Ok</Link>

                                    {/* onClick={() => { refreshPage()} */}
                                  </div>
                                )
                                :
                                (<form onSubmit={this.handleSubmit}>
                                  {error4}
                                  <input
                                    label='FirstName' name="firstname" onChange={e => this.firstname = e.target.value} placeholder='Enter firstname' type='text' required
                                  /> {error1}
                                  <input
                                    label='LastName' name="lastname" onChange={e => this.lastname = e.target.value} placeholder='Enter lastname' type='text' required
                                  />{error2}
                                  <input
                                    label='Email' name="email" onChange={e => this.email = e.target.value} placeholder='Enter Email' type='email' required
                                  /> {error}
                                  <input
                                    label='Password' name="password" onChange={e => this.password = e.target.value} placeholder='Enter password' type='password' required
                                  />{error3}


                                  <div className="button-box">
                                    <button type="submit" href='/login'>
                                      <span>Register</span>
                                    </button>
                                  </div>
                                </form>)}
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LayoutOne>
      </Fragment >
    );
  };
};

