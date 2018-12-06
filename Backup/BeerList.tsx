import * as React from 'react';



class BeerList extends React.Component<{}, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            isLoading: false
        }
    }
    public componentDidMount() {
        this.setState({ isLoading: true });
        fetch("http://localhost:8080/users")
            .then(response => response.json().then(data => this.setState({ users: data, isLoading: false })));

    }
    public render() {
        const { users, isLoading } = this.state;
        if (isLoading) {
            return <p>Loading....</p>
        }
        return (
            <div>
                <h2>Users :)</h2>
                {users.map((user: any) =>
                    <div key={user.id}>
                        <br />
                        <p>
                            {user.name}
                        </p>
                        <br />

                        <br />
                    </div>
                )}
            </div>);
    }
}
export default BeerList;
