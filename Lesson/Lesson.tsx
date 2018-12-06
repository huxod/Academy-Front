import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { ListItem, List, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

interface UserList {
  userList: [{
    id: string
    name: string,
    email: string
  }]
  save: void
}
@inject('LessonController')
@observer
export default class Lesson extends React.Component<any, { isEdit: number }, UserList> {
  public valuesUpdate = {
    userId: 0,
    name: '',
    email: '',
    password: ''
  };
  constructor(props: UserList) {
    super(props)
    this.state = {
      isEdit: -9999,
    }
  }
  public delItem = (e: any) => {
    e.preventDefault();
    this.props.LessonController.deleteItem(e.target.value);
    this.props.LessonController.deleteData(e.target.value, '/good-beer-delete/')
  }
  public editItem = (e: any) => {
    this.setState({ isEdit: +e.target.getAttribute('data-key') })
    e.preventDefault();
  }
  public handleChangeName = (e: any) => {
    this.valuesUpdate.name = e.target.value
    e.preventDefault();
  }
  public handleChangeEmail = (e: any) => {
    this.valuesUpdate.email = e.target.value
    e.preventDefault();
  }
  public saveItem = (e: any) => {
    this.valuesUpdate.userId = this.props.LessonController.users[e.target.getAttribute('data-key')].userId;
    this.props.LessonController.users[e.target.getAttribute('data-key')] = this.valuesUpdate
    this.setState({ isEdit: -2 })
    this.props.LessonController.addNewItem(this.valuesUpdate, '/learn-users-update');
  }
  public render() {
    const { } = this.props;
    if (this.props.LessonController.isLoad === true) {
      return <h1>Loading...</h1>
    }
    return (
      <div>
        <List>
          {this.props.userList.map((users: any, i: any) => this.state.isEdit === i ?
            (<ListItem  divider={true} key={i} >
              <div>
                <h3>
                  <span>{users.userId}</span>  {users.name}
                  <input data-key={i} type="text" defaultValue={users.name} onChange={this.handleChangeName} />
                </h3>
                <h3 >   {users.email}
                  <input data-key={i} type="text" defaultValue={users.email} onChange={this.handleChangeEmail} />
                </h3>
              </div>
              <ListItemSecondaryAction >
              <IconButton aria-label="Delete" data-key={i} onClick={this.saveItem}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="Delete" value={users.userId} onClick={this.delItem} >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>) :
            (<ListItem  divider={true} key={i} >
              <div >
                <h3><span>{users.userId}</span>  {users.name}</h3>
                <h3 >   {users.email}</h3>
              </div>
              <ListItemSecondaryAction >
              <IconButton aria-label="Delete" data-key={i} onClick={this.editItem}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="Delete" value={users.userId} onClick={this.delItem} >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            )
          )}
        </List>
      </div>
    );
  }
}