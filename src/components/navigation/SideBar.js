import React from 'react';
import { Link } from "react-router-dom";
import ProfilePic from "../views/users/kapila.jpeg";
import { connect } from 'react-redux';
import { signOutAction, fetchUser } from '../../actions';
import jwt_decode from "jwt-decode";


class SideBar extends React.Component {

    componentDidMount() {
        const token = sessionStorage.getItem('user');
        const user = jwt_decode(token);
        this.props.fetchUser(user.user.userId)
    }
    submit = (values) => {
        this.props.signOutAction();
    }
    navibarLinks() {
        const token = sessionStorage.getItem('user');
        const user = jwt_decode(token);
        if (!this.props.user) {
            return (
                <div className="ui placeholder">
                    <div className="medium line"></div>
                    <div className="medium line"></div>
                    <div className="medium line"></div>
                    <div className="short line"></div>
                    <div className="short line"></div>
                    <div className="short line"></div>
                    <div className="very short line"></div>
                    <div className="very short line"></div>
                    <div className="very short line"></div>
                </div>
            )
        }
        if (user.user.userRole === "Admin") {
            return [
                <div key={Math.random()} id="sidebar">
                    <div className="ui sidebar visible thin inverted vertical menu">
                        <Link to={"/"} className="item">
                            <i className="home icon"></i>
                            Dashboard
                        </Link>
                        <Link to={"/employee"} className="item">
                            <i className="user circle icon"></i>
                            Users
                        </Link>
                        <Link to={"/sales-dashboard"} className="item">
                            <i className="bullhorn icon"></i>
                            Sales
                        </Link>
                        <Link to={"/inventory-dashboard"} className="item">
                            <i className="cubes icon"></i>
                            Inventory
                        </Link>
                        <Link to={"/production-dashboard"} className="item">
                            <i className="pallet icon"></i>
                            Production
                        </Link>
                        <Link to={"/approvals-dashboard"} className="item">
                            <i className="tasks icon"></i>
                            Approvals
                        </Link>
                        <Link to={"/hr-dashboard"} className="item">
                            <i className="address card icon"></i>
                            HR
                        </Link>                       
                        <Link to={"/statistics"} className="item">
                            <i className="chart bar icon"></i>
                           Statistics 
                        </Link>
                        <Link to={"/settings"} className="item">
                            <i className="th list icon"></i>
                            Master Data
                        </Link>
                        <Link to={"/system-settings"} className="item">
                            <i className="cogs icon"></i>
                            Settings
                        </Link>
                    </div>
                    <div className="ui top fixed menu">
                        <div className="right menu">
                            <Link to="/userprofile" className="ui label">
                                <img className="ui right spaced avatar image" src={this.props.user.avatar} alt={"user profile"} />
                                {this.props.user.userName}
                            </Link>
                            <div className="item">
                                <button onClick={this.submit} className="ui primary button">Logout</button>
                            </div>
                        </div>
                    </div>

                </div>
            ]
        } else if (user.user.userRole === "Cash Controller") {
            return [
                <div key={Math.random()} id="sidebar">
                    <div className="ui sidebar visible thin inverted vertical menu">
                        <Link to={"/"} className="item">
                            <i className="home icon"></i>
                            Dashboard
                        </Link>
                        <Link to={"/sales-dashboard"} className="item">
                            <i className="bullhorn icon"></i>
                            Sales
                        </Link>
                    </div>
                    <div className="ui top fixed menu">
                        <div className="right menu">
                            <Link to="/userprofile" className="ui label">
                                <img className="ui right spaced avatar image" src={this.props.user.avatar} alt={"user profile"} />
                                {this.props.user.userName}
                            </Link>
                            <div className="item">
                                <button onClick={this.submit} className="ui primary button">Logout</button>
                            </div>
                        </div>
                    </div>

                </div>
            ]
        }

    }
    render() {
        return (
            <div>
                {this.navibarLinks()}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const token = sessionStorage.getItem('user');
    const userToken = jwt_decode(token);
    const user = state.users[userToken.user.userId]
    return { errorMessage: state.auth.error, user: user };
}
export default connect(mapStateToProps, { signOutAction, fetchUser })(SideBar);