import * as React from 'react';
import { observer, inject } from 'mobx-react';

interface UserList{
    userList:[{
      id:string
      name:string,
      email:string
    }]
    save:void
  }
  @inject('BirdStore')
  @observer
  export default class Users extends React.Component<any,{isEdit:number},UserList> {
    public valuesUpdate ={
      id:0,
      name:'',
      email:''
    };
    constructor(props:UserList){
      super(props)
      this.state = {
        isEdit:-9999,
      }
    }
    public delItem = (e:any) =>{
      e.preventDefault();
      this.props.BirdStore.deleteItem(e.target.value);
      this.props.BirdStore.deleteData(e.target.value,'/good-beer-delete/')
    }
    public editItem = (e:any) =>{
      this.setState({isEdit: +e.target.getAttribute('data-key')})
      e.preventDefault();
    }
    public handleChangeName = (e:any) =>{
      this.valuesUpdate.name = e.target.value
      e.preventDefault();
    }
    public handleChangeEmail = (e:any) =>{
      this.valuesUpdate.email = e.target.value
      e.preventDefault();
    }
    public saveItem = (e:any) =>{
      this.valuesUpdate.id = this.props.BirdStore.users[e.target.getAttribute('data-key')].id;
      this.props.BirdStore.users[e.target.getAttribute('data-key')] = this.valuesUpdate
      this.setState({isEdit:-2})
      this.props.BirdStore.addNewItem(this.valuesUpdate, '/good-beer-update');
    }
    public render() {
      const {} = this.props;
      if (this.props.BirdStore.isLoad === true) {
          return <h1>Loading...</h1>
      }
      return (
        <div>
          <ul className='UserList'>
            {this.props.userList.map((users:any,i:any) => this.state.isEdit === i ?
            (<li  key={i} className='UserList__row'>
            <div className='UserList__row__grand__element --container'>
              <h3 className='UserList__row__element --name'>
                <span>{users.id}</span>  {users.name}
                <input className='UserList__row__element --name-input'data-key={i} type="text" defaultValue={users.name} onChange={this.handleChangeName} />
              </h3>   
              <h3 className='UserList__row__element --email'>   {users.email}
                <input className='UserList__row__element --email-input' data-key={i} type="text" defaultValue={users.email} onChange={this.handleChangeEmail} />
              </h3> 
            </div>
            <button value={users.id} onClick={this.delItem}>Delete</button>
            <button data-key={i} onClick={this.saveItem}>Save</button>
          </li>) :
              (<li  key={i} className='UserList__row'>
                <div className='UserList__row__grand__element --container'>
                  <h3 className='UserList__row__element --name'><span>{users.id}</span>  {users.name}</h3>   
                  <h3 className='UserList__row__element --email'>   {users.email}</h3> 
                </div>
                <button value={users.id} onClick={this.delItem}>Delete</button>
                <button data-key={i} onClick={this.editItem}>Edit</button>
              </li>)
            )}
            </ul>   
        </div>
      );
    }
  }