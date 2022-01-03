
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


export default class AccountDropdown extends Component {
    handleClick = e => {
        e.currentTarget.nextSibling.classList.toggle("active");
    };


    state = {};
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
        const refreshPage = () => {
            window.location.reload();
        }
        const isLoggedIn = this.state.user;

        // let buttons;
        // if (this.state.user) {
        //     buttons = (<div className="account-dropdown">
        //         <ul>
        //             <li>
        //                 <Link to={process.env.PUBLIC_URL + "/"} onClick={() => { localStorage.clear(); refreshPage(); }} >Logout</Link>
        //             </li>
        //             <li>
        //                 <Link to={process.env.PUBLIC_URL +  "/my-account"}>
        //                     My account
        //                 </Link>
        //             </li>
        //         </ul>
        //     </div >)
        // } else {
        //     buttons = (<div className="account-dropdown">
        //         <ul>
        //             <li>
        //                 <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
        //             </li>
        //             <li>
        //                 <Link to={process.env.PUBLIC_URL + "/login-register"}>
        //                     Register
        //                 </Link>
        //             </li>

        //         </ul>
        //     </div>)
        // }
        return (


            <div className="same-style account-setting d-none d-lg-block">
                <button
                    className="account-setting-active"
                    onClick={this.handleClick}
                >
                    <i className="pe-7s-user-female" />
                </button>
                {/* {buttons} */}
                {isLoggedIn ?
                    (<div className="account-dropdown">
                        <ul>
                            <li>
                                <Link to={process.env.PUBLIC_URL + "/"} onClick={() => { localStorage.clear(); refreshPage(); }} >Logout</Link>
                            </li>
                            <li>
                                <Link to={process.env.PUBLIC_URL + "/my-account"}>
                                    My account
                                </Link>
                            </li>
                        </ul>
                    </div >)
                    :
                    (<div className="account-dropdown">
                        <ul>
                            <li>
                                <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
                            </li>
                            <li>
                                <Link to={process.env.PUBLIC_URL + "/login-register"}>
                                    Register
                                </Link>
                            </li>

                        </ul>
                    </div>)


                }
            </div>
        )
    }
}