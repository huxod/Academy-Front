import * as React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Users from './Users/User';
import ShowUsersList from './Users/ShowUserList';


interface LearnRouterProps {
  routerLink: []
}

export default class LearnRouter extends React.Component<LearnRouterProps, any>{
  constructor(props: LearnRouterProps) {
    super(props);
    this.state = {
      arrayBuffer: this.props.routerLink
    }
    this.HomeView = this.HomeView.bind(this);
  }
  public componentDidUpdate = () => {
    console.log('componentDidUpdate LearnRouter')

  }
  public HomeView = () => <Users ref={User => ShowUsersList} />;
  public render() {
    return (
      <div>

        <BrowserRouter>

          <div>

            <ul className="menu">
              <li className="menu__item">
                <Link to="/">Home </Link>
              </li>
              {this.state.arrayBuffer.map((item: any) =>
                <li className="menu__item" key={item.id}>
                  <Link to={"/" + item.name} >{item.name}</Link>
                </li>
              )}
            </ul>
            <section className="content">
              <Route exact={true} path="/" component={this.HomeView} />
            </section>
            {this.state.arrayBuffer.map((item: any) =>
              <section className="content" key={item.id}>
                <Route path={"/" + item.name} render={() => (<div><div>{item.email}</div></div>)} />
              </section>
            )}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}  