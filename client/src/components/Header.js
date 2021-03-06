import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from './Payments';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login with google</a>
                    </li>
                );
            default:
                return [
                    <li key="staticKey0">
                        <Payments />
                    </li>,
                    <li key="staticKey1" style={{ margin: '0 10px' }}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="staticKey2">
                        <a href="/api/logout">Logout</a>
                    </li>
                ];
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <div className="row">
                        <div className="col s12">
                            <Link
                                to={this.props.auth ? '/surveys' : '/'}
                                className="left brand-logo"
                            >
                                Emaily
                            </Link>
                            <ul className="right">
                                {this.renderContent()}
                                {/* <li>
                                    <a>Login with Google</a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

// function mapStateToProps(state) {
//     return { auth: state.auth };
// }

// es6 refactor
function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);
