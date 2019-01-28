import * as React from "react";
import { Segment } from "semantic-ui-react";
import * as Cookies from "js-cookie";

export default class Logout extends React.Component<any,any>{ 
    constructor(props: any) {
        super(props);
        this.state={

        }
    }
public componentDidMount(){
    Cookies.remove('user');
    Cookies.remove('JSESSIONID');
    }
public render() {

    return (
        <Segment>
            <h1>Logout</h1>
        </Segment>
    );
}
}