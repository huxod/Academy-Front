import * as React from 'react';

interface UserList{
  userList:[{
    id:string,
    name:string,
    email:string
  }],
  removeItem(e:any):void;
}

export default class ShowUsersList extends React.Component<UserList,{},any> {
  constructor(props:UserList){
    super(props)
  }
    public render() {
         
        return (
          <div>
            <ul className='UserList'>
              {this.props.userList.map((users) =>
                <li  key={users.id} className='UserList__row'>
                  <span className='UserList__row__element--id'>   {users.id} </span>
                  <span className='UserList__row__element--name'>   {users.name}</span>   
                  <span className='UserList__row__element--email'>   {users.email}</span> 
                  <button className='UserList__row__element--button' 
                    value={users.id} onClick={this.props.removeItem} > X </button>
                </li>
              )}
              </ul>
          </div>
        );
  }
}
