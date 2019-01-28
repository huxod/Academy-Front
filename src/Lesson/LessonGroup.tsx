import * as React from 'react';
import { Segment, Button} from 'semantic-ui-react';
import { Link, RouteProps} from 'react-router-dom';
import * as Cookies from 'js-cookie';


interface RProps extends RouteProps {
  propsRouter:any
}

  export default class LessonGroup extends React.Component< RProps,any> {

    constructor(props:RProps){
      super(props)
      this.state = {
        lessonGroup:[{}],
        userRole:'',
        isEdit:false,
        buttonMessage:'Add Lesson Group',
        isLoad:true,
        // URL:  window.location.protocol+'//'+window.location.hostname+':'+ window.location.port
        URL: 'http://localhost:8080'
      }
    }
    public lessonGroup={
      lessonGroupTitle:''
    }
    public async saveLessonGroup(){
      const settings = {
        method: 'POST', headers: {Accept: 'application/json','Content-Type': 'application/json'},
        body:JSON.stringify(this.lessonGroup)
    };
    const data = await fetch(this.state.URL+'/lessonGroup', settings)
        .then(response => response.json())
        .then(json => console.log(json))
        .then(json => {
            return json;
        })
        .catch(e => {
            return e
        });
    return data;
    }
    public SaveValue = async () =>{
    this.state.isEdit === true && this.lessonGroup.lessonGroupTitle !== undefined ? this.saveLessonGroup() : null

    this.state.isEdit === false ? 
    this.setState({buttonMessage:'Save new Lesson',isEdit:true}) :
    this.setState({buttonMessage:'Add Lesson Group',isEdit:false});

    console.log(this.lessonGroup.lessonGroupTitle);
    }
    public SetValue = (e:any) =>{
      this.lessonGroup.lessonGroupTitle = e.target.value;
      console.log(this.lessonGroup.lessonGroupTitle)
    }
    public componentDidMount(){
      fetch(this.state.URL+'/role/'+Cookies.get('user'))
      .then(response => response.json())
      .then(data => this.setState({userRole:data})).catch(error => this.setState({isLoad:error}));      
  
      fetch(this.state.URL+'/lesson')
        .then(response => response.json())
        .then(data => this.setState({lessonGroup:data,isLoad:false})).catch(error => this.setState({isLoad:error}));      
    }

    public render() {
      if(this.state.isLoad !== false){
        return <h1>Loading...</h1>
      } 
      return (
        <Segment>
          {this.state.lessonGroup.map((ele:any, i:any)=>
            (<div key={i}><h2>{ele.id}  <Link to={this.props.propsRouter.match.url+'/'+ele.id} >{ele.lessonGroupTitle}</Link></h2></div>))}
          {this.state.isEdit === true ? <input name="lessonGroupTitle" onChange={(e)=>this.SetValue(e)}></input>:null}
          {this.state.userRole.map((ele:any,i:any)=> ele.role === 'TEACHER'?
            (<Button  size="mini" basic color='teal' key={i}  onClick={() => this.SaveValue()}>{this.state.buttonMessage}</Button>):null)}
        </Segment>
      );
    }
  }