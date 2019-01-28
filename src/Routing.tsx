import { Route, Switch, withRouter} from "react-router-dom";
import * as React from "react";
import Home from "./Home/Home";
import Login from "./AccesComponent/Login";
import Signup from "./AccesComponent/Signup";
import Logout from "./AccesComponent/Logout";
import User from "./Users/User";
import LessonGroup from "./Lesson/LessonGroup";
import Lesson from './Lesson/Lesson';
 class Routing extends React.Component<{}, any> {
    constructor(props: any) {
        super(props);
    }

    public render(){
        return(
               
        <Route>
            <Switch>
                <Route exact path='/'    component={Home}        />
                <Route  path='/login'    component={Login}       />
                <Route  path='/signup'   component={Signup}      />
                <Route  path='/logout'   component={Logout}      />
                <Route  path='/user'     component={User}        />
                <Route exact path='/lesson'   component={(e:any)=><LessonGroup propsRouter={e}/>} />
                <Route  path={'/lesson/:id'}  component={(e:any)=><Lesson propsRouter={e}/>} />
            </Switch>
        </Route>
        
        );
    }
}
export default withRouter(Routing)