import * as React from 'react';
import {Segment, Form, Button, Icon, Label} from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';


export default class Signup extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state={
            users:{
                login:'',
                email:'',
                password:'',
                name:'',
                lastName:''
            },
            signin:false,
            message_l:"",
            message_e:"",
            showLabelLogin:false,
            showLabelEmail:false,
            URL:  window.location.protocol+'//'+window.location.hostname+':'+ window.location.port,// "http://localhost:8080/",
            hash:'48f370a772c7496f6c9d2e6d92e920c87dd00a5c'
        }
    }
    public showMessage = (val:string, message:string, inputName:string, error:boolean) =>{
        
        val == this.state.hash && inputName =='login' && error == true ? this.setState({message_l:message , showLabelLogin:true}):
        inputName == 'login' && error == false ? this.setState({message_l:message,showLabelLogin:true}):
        this.setState({message_l:null,showLabelLogin:false});
      
        val == this.state.hash && inputName =='email' && error == true ? this.setState({message_e:message , showLabelEmail:true}):
        inputName == 'email' && error == false ? this.setState({message_e:message,showLabelEmail:true}):
        this.setState({showLabelEmail:false});

        inputName = '';
    }
    public submit = (e:any) =>{
        e.preventDefault();
        console.log(this.state.URL)
        let usr = this.state.users;

        Object.keys(usr).forEach((key:any) => e.target[key].value == '' ? usr[key] = null : usr[key] = e.target[key].value);
    
        usr.login == null || usr.email == null || usr.password == null ? console.log("Login or Email or Password: null"): 
        
        (async () => {
            const response = await fetch(this.state.URL+'/users', {
                method: 'POST',
                headers: {'Accept': 'application/json','Content-Type': 'application/json'},
                body: JSON.stringify(usr)})
                try {
                    response.ok
                    response.status >= 200 && response.status < 300 ?
                    this.setState({signin:true}):console.error("Wrong response");
                    
                } catch (error) {
                    console.error(response.statusText)
                }
        })();
    }

    public onBlur = (e:any) =>{
        let inputName = e.target.name
        let val = e.target.value;
        val == ''?val=this.state.hash:val;

        console.log("Value "+e.target.name );
        inputName == 'login' || inputName == 'email'?
        (async () => {
            const response = await fetch(this.state.URL + "/users/" +val,
                { method: 'GET', headers: {'Accept': 'application/json','Content-Type': 'application/json'}}
            )
            try {
                console.log('Response GetData OK');
                await response.json();
                this.showMessage(val,'This '+inputName+' is allready use',inputName,false)
            } catch (error) {
                this.showMessage(val , 'This ' + inputName + ' is Empty' , inputName , true)

                inputName='';
            }       
        })() : 
        null
    }

    public render() {
        return (
            <Segment>
                <form className='ui form' onSubmit={this.submit}>
                    <Form.Field>
                        {this.state.showLabelLogin == true ? (<Label color='red' pointing='below'>{this.state.message_l}</Label>) : null} 
                        <input placeholder='Login *' name='login' 
                         onBlur={this.onBlur}/>
                    </Form.Field>
                    <Form.Field>
                        {this.state.showLabelEmail == true ? (<Label color='red' pointing='below'>{this.state.message_e}</Label>) : null}
                        <input type="email" placeholder='Email *' name='email'
                        onBlur={this.onBlur}/>
                    </Form.Field>
                    <Form.Field>
                        <input type="password" placeholder='Password *' name='password' />
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='Name' name='name' />
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='Last Name' name='lastName' />
                    </Form.Field>
                    <Button fluid color='green' ><Icon name='sign-in' />Sign Up</Button>
                </form>
                {this.state.signin == true?<Redirect to="/login" />:null}
            </Segment>
        );
    }
}