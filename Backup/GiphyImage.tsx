import * as React from 'react';

interface GiphyImageProps{
    name:string;
}
class GiphyImage
    extends React.Component<GiphyImageProps, any> {
    constructor(props:GiphyImageProps){
        super(props);
        this.state={
            giphyUrl:'',
            isLoading: true
        }
    }
    
    public componentDidMount(){
        const giphyApi = 'http://api.giphy.com/v1/gifs/search?api_key=C5iGh2ApQAmF73zsNMepRtF3EhHKkMtl&limit=1&q=';
        fetch(giphyApi + this.props.name)
            .then(response => response.json().then(josn => {this.setState({giphyUrl:josn.data[0].images.original_still.url})}));

    }
  public render() {
      const {giphyUrl, isLoading} = this.state;
      if(!isLoading){
         return <p>Loading image....</p>
      }
      return (<div>
          <img src={giphyUrl} alt={this.props.name} />
        <br/>
        
        <br/>
      </div>);

  }
}
export default GiphyImage
;
