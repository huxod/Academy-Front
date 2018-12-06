import * as React from 'react'
interface AddUserProps{
    onSubmit(e:any,name:string,email:string):void;
}
export default class AddUser extends React.Component<AddUserProps,any>{
    constructor(props:any){
        super(props);
        this.state = {
            name:'',
            email:''
        }
    }
    public handleChangeName = (e:any) =>{
        this.setState({name:e.target.value})
    }
    public handleChangeEmail= (e:any) => {
        this.setState({email:e.target.value})
    }
    public handleUpdate = (e:any) => {
        console.log("Name: "+this.state.name)

        this.props.onSubmit(this, this.state.name , this.state.email);
        this.setState({name:''});
        this.setState({email:''});
    }
    public render(){
        return(
            <div>
                <div>
                    <label htmlFor="name">Enter user name: </label>
                    <input type="text" name='name' id='name' value={this.state.name} onChange={this.handleChangeName}/>
                </div>
                <div>
                    <label htmlFor="email">Enter user email: </label>
                    <input type="text" name='email' id='email' value={this.state.email} onChange={this.handleChangeEmail}/>
                </div>
                <button onClick={this.handleUpdate}>Add new user</button>
            </div>
        )
    }
}