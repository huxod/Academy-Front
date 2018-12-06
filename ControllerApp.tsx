import * as React from 'react'
import DataBaseLinks from './DataBaseLinks';


export default class ControllerApp extends React.Component{
    constructor(props:any){
        super(props);
        this.state ={
          
        }
    }
        public componentDidMount=()=> {
            console.log('componentDidMount ControllerApp')
        } 
        public componentDidUpdate=(prevProps:any,prevState:any)=> {   
            console.log("componentDidUpdate ControllerApp")
            console.log(prevState)
            console.log(prevProps)      
        } 
        public componentWillUpdate=(prevProps:any,prevState:any)=> {
            console.log("componentWillUpdate ControllerApp")
            console.log(prevState)
            console.log(prevProps)  
        } 
    public render(){
        return(
            <DataBaseLinks />
        )
    }
}