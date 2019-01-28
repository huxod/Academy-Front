import * as React from 'react';
import { Segment, List, Header, Icon, ListItem, Button} from 'semantic-ui-react';

import * as Cookies from 'js-cookie';


export default class User extends React.Component<any,any> {
 public  edit ={
   'login':false,
   'name':false,
   'lastName':false,
   'email':false,
   'password':false
 }
 public user ={}
  constructor(props: any) {
    super(props)
    this.state = {
      edit:{
        'login':false,
        'name':false,
        'lastName':false,
        'email':false,
        'password':false
      },
      isLoad:true,
      user:{},
      URL:  window.location.protocol+'//'+window.location.hostname+':'+ window.location.port
    }
  }

  public componentWillMount(){
    this.setState({ isLoad: true });

    fetch(this.state.URL+'/users/'+Cookies.get('user'))
      .then(response => response.json())
      .then(data => this.setState({ user: data, isLoad: false }))
      .catch(error => this.setState({isLoad:error}));
  }
  //Update User Info
  public updateUser = async () => {
    const settings = {
        method: 'PUT', headers: {Accept: 'application/json','Content-Type': 'application/json'},
        body:JSON.stringify(this.user)
    };
    const data = await fetch(this.state.URL+'/users/'+this.state.user.id, settings)
        .then(response => response.json())
        .then(json => {
            return json;
        })
        .catch(e => {
            return e
        });
        Cookies.set('user',this.state.user.login)
    return data;
}
  //Test
  public SetValue = (p:string) =>{
    this.user = this.state.user
  if(this.edit[p] == true)  {
    this.setState({user:this.user})
   this.updateUser();
  }

  console.log("SetValue "+p+" edit " + this.edit[p])

  this.edit[p] == false ?(
  this.edit[p] = true) :
  this.edit[p] = false 

  this.setState({edit:this.edit})  
  console.log("SetValue "+p+" edit state " + this.state.edit[p])
  
  }
  public handleChange = (e:any) =>{
    this.user[e.target.name] = e.target.value
  }
  public render() {
    const { } = this.props;

    if (this.state.isLoad !== false ) {
      return <h1>Loading...</h1>
    }
    return (
      <Segment>
        <Header as='h2' icon>
          <Icon name='settings' />
          Account Settings
          <Header.Subheader>Manage your account settings and set e-mail preferences.</Header.Subheader>
        </Header>
        <List>
        <ListItem>
            <List.Content floated="left" className="user_table"><h3>Login :</h3></List.Content>
            {this.edit['login'] ?
            <List.Content floated="left" className="user_table"><h3><input name="login" onChange={this.handleChange} placeholder={this.state.user.login} /></h3></List.Content>
            :
            <List.Content floated="left" className="user_table"><h3>{this.state.user.login}</h3></List.Content>}
            <Button size="mini" basic color='teal'onClick={() => this.SetValue('login')}>{this.edit['login'] ? "Save" : "Edit"}</Button>       
          </ListItem>

          <ListItem>
            <List.Content floated="left" className="user_table"><h3>Name :</h3></List.Content>
            {this.edit['name'] ?
            <List.Content floated="left" className="user_table"><h3><input name="name"  onChange={this.handleChange} placeholder={this.state.user.name} /></h3></List.Content>
            :
            <List.Content floated="left" className="user_table"><h3>{this.state.user.name}</h3></List.Content>}
            <Button size="mini" basic color='teal'onClick={() => this.SetValue('name')}>{this.edit['name'] ? "Save" : "Edit"}</Button>       
          </ListItem>

          <ListItem>
            <List.Content floated="left" className="user_table"><h3>Last Name :</h3></List.Content>
            {this.edit['lastName'] ?
            <List.Content floated="left" className="user_table"><h3><input name="lastName" onChange={this.handleChange} placeholder={this.state.user.lastName} /></h3></List.Content>
            :
            <List.Content floated="left" className="user_table"><h3>{this.state.user.lastName}</h3></List.Content>}
            <Button size="mini" basic color='teal'onClick={() => this.SetValue('lastName')}>{this.edit['lastName'] ? "Save" : "Edit"}</Button>       
          </ListItem>

          <ListItem>
            <List.Content floated="left" className="user_table"><h3>Email address :</h3></List.Content>
            {this.edit['email'] ?
            <List.Content floated="left" className="user_table"><h3><input name="email" onChange={this.handleChange} placeholder={this.state.user.email} /></h3></List.Content>
            :
            <List.Content floated="left" className="user_table"><h3>{this.state.user.email}</h3></List.Content>}
            <Button size="mini" basic color='teal'  onClick={() => this.SetValue('email')}>{this.edit['email'] ? "Save" : "Edit"}</Button>       
          </ListItem>
          <ListItem>
            <List.Content floated="left" className="user_table"><h3>Pssword :</h3></List.Content>
            {this.edit['password'] ?
            <List.Content floated="left" className="user_table"><h3><input name="password" type="password" onChange={this.handleChange} placeholder='password' /></h3></List.Content>
            :
            <List.Content floated="left" className="user_table"><h3>********</h3></List.Content>}
            <Button size="mini" basic color='teal'  onClick={() => this.SetValue('password')}>{this.edit['password'] ? "Save" : "Edit"}</Button>       
          </ListItem>
        </List>
        
      </Segment>
    );
  }
}