
import React, { useEffect, Fragment, Component, lazy } from "react";
import MetaTags from "react-meta-tags";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import axios from "axios";



export default class LoginSignIn extends Component {

    // refreshPage = () => {
    //     window.location.reload();
    // }
    state = {};
    handleSubmit = e => {
        e.preventDefault();
        const data = {

            email: this.email,
            password: this.password
        };
        useEffect(
            axios.post('login', data).then(
                res => {
                    localStorage.setItem('token', res.data.token)
                    console.log(res)
                    this.setState({
                        message: res.data.message
                    });

                    console.log(res.data.message);
                    this.setState({
                        loggedIn: true,

                    });
                    window.location.reload();

                }
            )
            , []);
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
        const HomeFashionThree = lazy(() => import("../home/HomeFashionThree"));

        let error = '';
        const isLoggedIn = this.state.user;

        if (this.state.message) {
            error = (
                <div className="alert-danger-text " role="alert">
                    {this.state.message}
                </div>
            )
        }
        // if (this.state.loggedIn) {
        //     return (
        //         // <Router>
        //         //     <Switch>
        //         //         <Redirect exact from="/login" to="/home-fashion-three" />
        //         //         <Route component={HomeFashionThree} exact path={process.env.PUBLIC_URL + "/home-fashion-three"} />
        //         //     </Switch>
        //         // </Router>
        //         // <Route exact path={process.env.PUBLIC_URL + "/home-fashion-three"}>
        //         //     {loggedIn ? <Redirect to="/home-fashion-three" /> : console.log(err)}
        //         // </Route>
        //         // 
        //         // <div className="login-register-form">
        //         //     
        //         // </div>
        //         <Fragment>
        //             <MetaTags>
        //                 <title>Flone | Login</title>
        //                 <meta
        //                     name="description"
        //                     content="Compare page of flone react minimalist eCommerce template."
        //                 />
        //             </MetaTags>

        //             <LayoutOne headerTop="visible">
        //                 {/* breadcrumb */}
        //                 <Breadcrumb />
        //                 <div className="login-register-area pt-100 pb-100">
        //                     <div className="container">
        //                         <div className="row">
        //                             <div className="col-lg-7 col-md-12 ml-auto mr-auto">
        //                                 <div className="login-register-wrapper">
        //                                     <Tab.Container defaultActiveKey="login">
        //                                         <Nav variant="pills" className="login-register-tab-list">
        //                                             <Nav.Item>
        //                                                 <Nav.Link eventKey="login">
        //                                                     <h4>Login</h4>
        //                                                 </Nav.Link>
        //                                             </Nav.Item>
        //                                             <Nav.Item>
        //                                                 <Nav.Link eventKey="register" href="/login-register">
        //                                                     <h4>Register</h4>
        //                                                 </Nav.Link>
        //                                             </Nav.Item>
        //                                         </Nav>
        //                                         <Tab.Content>
        //                                             <Tab.Pane eventKey="login">
        //                                                 <div className="login-form-container">
        //                                                     <div className="login-register-form">
        //                                                         <h3>You are loggedin</h3>
        //                                                         <button className="UploadButton"  >
        //                                                             <Link to={process.env.PUBLIC_URL + "/"} onClick={() => { refreshPage(); }} >Ok</Link>
        //                                                         </button>

        //                                                     </div>
        //                                                 </div>
        //                                             </Tab.Pane>

        //                                         </Tab.Content>
        //                                     </Tab.Container>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </LayoutOne>
        //         </Fragment >

        //     )

        // setTimeout(function () { window.location.reload(); }, 10);

        // }
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
                                        <Tab.Container defaultActiveKey="login">
                                            <Nav variant="pills" className="login-register-tab-list">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="login">
                                                        <h4>Login</h4>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="register" href="/login-register">
                                                        <h4>Register</h4>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="login">
                                                    <div className="login-form-container">
                                                        <div className="login-register-form">
                                                            {isLoggedIn ?
                                                                (
                                                                    <div className="login-register-form">
                                                                        <h3>You are logged in!</h3>
                                                                        <button className="UploadButton"  >
                                                                            <Link to={process.env.PUBLIC_URL + "/"}   >Ok</Link>
                                                                        </button>
                                                                        {/* onClick={() => { refreshPage()} */}
                                                                    </div>
                                                                )
                                                                :
                                                                (

                                                                    <form onSubmit={this.handleSubmit} >
                                                                        {error}
                                                                        <input
                                                                            label='Email'
                                                                            name="email"

                                                                            onChange={e => this.email = e.target.value}
                                                                            placeholder='Enter Email' type='email' required
                                                                        />
                                                                        <input
                                                                            label='Password'
                                                                            name="password"

                                                                            onChange={e => this.password = e.target.value}
                                                                            placeholder='Enter password' type='password'
                                                                            required
                                                                        />

                                                                        <div className="button-box">
                                                                            <div className="login-toggle-btn">
                                                                                <input type="checkbox" />
                                                                                <label className="ml-10">Remember me</label>
                                                                                <Link to={process.env.PUBLIC_URL + "/"}>
                                                                                    Forgot Password?
                                                                                </Link>
                                                                            </div>
                                                                            <button type="submit" >
                                                                                <span>Login</span>
                                                                            </button>
                                                                        </div>

                                                                    </form>
                                                                )}

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
    }
};

