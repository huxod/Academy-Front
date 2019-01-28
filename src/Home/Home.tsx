import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import LessonEdit from '../Lesson/LessonEdit';

export default class Home extends React.Component{
    public render(){
        return (<Segment>
            <h1>Home</h1>
            <LessonEdit />
        </Segment>)
    }
}