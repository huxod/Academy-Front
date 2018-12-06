import * as React from 'react';
import './App.css';
import logo from './logo.svg';

// import ControllerApp from 'src/ControllerApp'

import LessonController from 'src/Lesson/LessonController';
import LessonEditor from 'src/Lesson/LessonEditor';
import { Provider } from 'mobx-react';


class App extends React.Component<{}, any> {
    constructor(props:any) {
        super(props);
      }
  public render() {

      return <div className="App">
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <h1 className="App-title">Welcome to React</h1>
          </header>
         
          <br />
          <br />
          <Provider LessonController = {LessonController}>
            <LessonEditor />
          </Provider>
         
        {/* <ControllerApp /> */}
        
      </div>;
  }
}

export default App;
