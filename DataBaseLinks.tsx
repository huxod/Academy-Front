  import * as React from 'react'
  import LearnRouter from 'src/LearnRouter'

  export default class DataBaseLinks extends React.Component<{},any>{

    constructor(props:any){
      super(props);
      
      this.state ={
        arrayBuffer:null
      }
    }

    public componentDidMount=()=> {
      
      (async () => {
        await fetch('http://localhost:8080/good-beer',{
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      })
      .then(response => response.json())
      .then(data => this.setState({arrayBuffer:data})).catch((error)=>{
          console.error(error)
      });
      
      console.log('Show Content from DataBaseLinks:')
      console.log(this.state.arrayBuffer);
    
    })();
  
      } 
      public componentDidUpdate=(prevProps:any,prevState:any)=> {

        console.log("componentDidUpdate DataBaseLinks")
        console.log(prevState)
        console.log(prevProps)
      
      } 
      public componentWillUpdate=(prevProps:any,prevState:any)=> {

          console.log("componentWillUpdate DataBaseLinks")
          console.log(prevState)
          console.log(prevProps)
        
      } 
    public render() { 
      
      if ( this.state.arrayBuffer === null){
        return 'Lioading!!'
      }
      return (
          <div>
            
              {/* <ul className='UserList'>
                {this.state.arrayBuffer.map((users:any) =>
                  <li  key={users.id} className='UserList__row'>
                    <span className='UserList__row__element--id'>   {users.id} </span>
                    <span className='UserList__row__element--name'>   {users.name}</span>   
                    <span className='UserList__row__element--email'>   {users.email}</span> 
                  </li>
                )}
                </ul> */}
                
                <LearnRouter routerLink={this.state.arrayBuffer}/>
        </div>
      );
    }
  }  