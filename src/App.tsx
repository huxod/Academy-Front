/// <reference path='./index.d.ts'/>
import * as React from 'react';
import './App.css';
import logo from './logo.svg';
import { Grid, Row, Col} from 'react-bootstrap';
import { Menu, Placeholder, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Routing from './Routing';

class App extends React.Component<{}, any> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to Academy Learn</h1>
            </header>
            <Grid>
                <Row>
                    <Col xsHidden md={2}>
                    </Col>
                    <Col xs={8} md={8}>
                    <Placeholder></Placeholder>
                    <Segment inverted>
                        <Menu pointing secondary inverted>
                            <Menu.Item 
                                as={Link}
                                to='/'
                                name='home'  
                            />
                            <Menu.Item
                                as={Link}
                                to='/login'
                                name='Login'
                            />
                            <Menu.Item 
                                as={Link}
                                to='/user'
                                name='User'
                            />
                            <Menu.Menu position='right'>
                                <Menu.Item
                                    as={Link}
                                    to='/lesson'
                                    name='Lesson'
                                />
                                <Menu.Item
                                    as={Link}
                                    to='/signup'
                                    name='Sign Up'
                                />
                                <Menu.Item  
                                    as={Link}
                                    to='/logout'
                                    name='Logout' 
                                />
                            </Menu.Menu>
                        </Menu>
                        </Segment>
                        <Placeholder></Placeholder>
                    </Col>
                    <Col xsHidden md={2}>
                    </Col>
                </Row>
                <Row>
                    <Col xsHidden md={2}></Col>
                    <Col xs={8} md={8}>
                        <Routing />
                    </Col>
                    <Col xsHidden md={2}></Col>
                </Row>
            </Grid>
            <Segment vertical inverted><p>Copyright: Hubert Langier</p></Segment>
        </div>        
    }
}
export default App;
