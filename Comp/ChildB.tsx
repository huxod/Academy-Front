import * as React from 'react';
import NodeChildB from './NodeChildB';

interface PropsChildB{
    text:'',
    fnChildB():void,
}
export default class ChildB extends React.Component<PropsChildB,any>{
    constructor(props:PropsChildB){
        super(props);
    }

    public render(){
        return(
            
               <div>
                    <NodeChildB nodeBfunc={this.props.fnChildB} test={this.props.text}/>
                    <p>{this.props.text}</p>
               </div>
            
        )
    }
}