/**
 * Created by nalantianyi on 2017/2/15.
 */
import React, {Component, PropTypes} from 'react';
import {IndexLink} from 'react-router';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Helmet from 'react-helmet';
import {Spin} from '../../components';
import config from '../../config';

class Main extends Component {
    //eslint-disable-line
    static propTypes = {
        children: PropTypes.any.isRequired
    };

    render() {
        require('./Main.scss');
        return (
            <div>
                <Helmet {...config.app.head}></Helmet>
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <IndexLink to="/"><span>{config.app.title}</span></IndexLink>
                        </Navbar.Brand>
                        <Navbar.Toggle></Navbar.Toggle>
                    </Navbar.Header>

                    <Navbar.Collapse>
                        <Nav navbar>
                            <LinkContainer to="/counter">
                                <NavItem eventKey={1}>计数器</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>
                <Spin></Spin>
                <div>
                    {React.cloneElement(this.props.children, this.props)}
                </div>
            </div>
        );
    }
}
export default Main;