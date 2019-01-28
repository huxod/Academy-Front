import * as React from 'react';
import { Segment} from 'semantic-ui-react';




  export default class LessonEdit extends React.Component<{},any>{
    constructor(props:any){
      super(props)
      this.state = {
      }
    }

    public render() {
      return (
        <Segment>
          <h1>Hello Lessons Edit with </h1>
        </Segment>
      );
    }
  }