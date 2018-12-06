import * as React from 'react';
import usersList from './UserList'
import ShowUsersList from './ShowUserList';
import AddUser from './AddUser';

export default class Users extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state={
            users:usersList,
        }
    }
    public send =()=>  {  
        (async () => {
            const rawResponse = await fetch('http://localhost:8080//good-beer-update', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.state.users)
            });
            const content = await rawResponse.json();
          
            console.log(content);
          })();
        }
    
    public onSubmit = (e:any,nameU:string,emailU:string) =>{     
        this.setState({users:[...this.state.users,{
            id:this.state.users[this.state.users.length-1].id+1,
            name:nameU,
            email:emailU
        }]}); 
          
    }
    public removeItem = (e:any) =>{
        const array = [...this.state.users]; // make a separate copy of the array 
        array.splice(array.findIndex(i => i.id === +e.target.value),1)
        this.setState({users:[...array]});   
    }
    public componentDidUpdate=(prevProps:any,prevState:any)=> {

        console.log("componentDidUpdate UsersLearn")
        console.log(prevState)
        console.log(prevProps)
      
      } 
      public componentWillUpdate=(prevProps:any,prevState:any)=> {
  
          console.log("componentWillUpdate UsersLearn")
          console.log(prevState)
          console.log(prevProps)
        
      } 
    public render(){
        return(
            <div>
                <h2>Hello Administrator</h2>
                <h1>User List</h1>
                <ShowUsersList userList={this.state.users} removeItem={this.removeItem} />
                <AddUser onSubmit={this.onSubmit}/>
                <button onClick={this.send}>Send</button>
                <br />
            </div>
        )
    }
}