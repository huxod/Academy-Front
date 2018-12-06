import * as React from 'react';

interface PropsNodeChildB{
    test:''
    nodeBfunc(arg:any):void;
}
export default class NodeChildB extends React.Component<PropsNodeChildB,any>{
    constructor(props:PropsNodeChildB){
        super(props);
       
        this.state={
           
        }
        this.onChange = this.onChange.bind(this);
    }
    public onChange = () =>{
        this.props.nodeBfunc(this.props.children)
    }
    public componentWillReceiveProps=(prevProps:any,prevState:any)=> {
        console.log("componentWillReceiveProps")
        console.log(prevState)
        console.log(prevProps)  
    } 
 
    public render(){
        return(
            <div>
                <button onClick={this.onChange}>test</button>
                {this.props.children}
            </div>
        )
    }
}