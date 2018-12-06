import * as React from 'react';
import { inject, observer } from 'mobx-react'
import Users from './Users';

// Testing Component
@inject('BirdStore')
@observer
export default class Parent extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            usersArray: [],
            name: '',
            email: ''
        }
    }
    public componentWillMount() {
        this.props.BirdStore.loadData('/good-beer');
    }
    public onChangeName = (e: any) => {
        this.setState({ name: e.target.value });
    }
    public onChangeEmail = (e: any) => {
        this.setState({ email: e.target.value })
    }
    public submit = (e: any) => {
        console.log("ID Bazy",this.props.BirdStore.usersLenght+1);
        const arr = {
            id:this.props.BirdStore.usersLenght+1,
            name: this.state.name,
            password: 'test',
            email: this.state.email
        }
        this.props.BirdStore.addItem(arr);
        this.props.BirdStore.addNewItem(arr, '/good-beer-update');
        this.setState({ name: '', email: '' })

        e.preventDefault();
    }
    public render() {

        return (
            <div>
                <br />
                <form onSubmit={this.submit}>
                    <input type="text" name="name" value={this.state.name} placeholder="Enter name" onChange={this.onChangeName} />
                    <input type="text" name="email" value={this.state.email} placeholder="Enter email" onChange={this.onChangeEmail} />
                    <button>Add</button>
                </form>
                <br />
                <Users userList={this.props.BirdStore.users} />
            </div>
        );
    }    
}