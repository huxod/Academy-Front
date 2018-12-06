import * as React from 'react';
import { observer, inject } from 'mobx-react';
interface UserEdit {
  userEdit: []
}
@inject('BirdStore')
@observer
export default class SubEx extends React.Component<any,any,UserEdit> {
  constructor(props: UserEdit) {
    super(props)
    this.state = {
      isEdit:'false'
    }
  }
  public delItem = (e: any) => {
    e.preventDefault();
    this.props.BirdStore.deleteItem(e.target.value);
    this.props.BirdStore.deleteData(e.target.value, '/good-beer-delete/')
  }
  public render() {
    const { } = this.props
    return (
      <div>
        <ul className='User'>
          {this.props.userEdit.map((users: any, i: any) =>
            <li key={i} className='UserList__row'>
              <div className='UserList__row__grand__element --container'>
                <h3 className='UserList__row__element --name'><span>{users}</span> {this.state.isEdit}  {users.name}</h3>
                <h3 className='UserList__row__element --email'>   {users.email}</h3>
              </div>
              <button value={users.id} onClick={this.delItem}>Delete</button>
            </li>
          )}
        </ul>

      </div>
    );
  }
}