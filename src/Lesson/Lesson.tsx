import * as React from 'react';
import { Segment} from 'semantic-ui-react';
import { RouteProps } from 'react-router-dom';

interface RProps extends RouteProps {
  propsRouter:any
}
  export default class Lesson extends React.Component<RProps,any,{}> {
    constructor(props:RProps){
      super(props)
      this.state = {
        lesson:[{}],
        isLoad:true,
        errorLog:'',
        // URL:  window.location.protocol+'//'+window.location.hostname+':'+ window.location.port
        URL: 'http://localhost:8080'
      }
    }

    public componentWillMount(){
  
      fetch(this.state.URL+'/lesson/'+this.props.propsRouter.match.params.id)
        .then(response => response.json())
        .then(data => this.setState({lesson:data,isLoad:false})).catch(error => this.setState({isLoad:error,errorLog:error}));
        
    }

    public render() {
      if(this.state.isLoad !== false || this.state.isLoad === this.state.errorLog){
        return <h1>Loading....{this.state.errorLog}</h1>
      } 
      return (
        <Segment>
          <h1>Hello Lessons</h1>
          {this.state.lesson[0] !== undefined? this.state.lesson.map((ele:any, i:any)=>(<Segment key={i}>{ele.title}</Segment>)):<h2>No lesson</h2>}
        </Segment>
      );
    }
  }