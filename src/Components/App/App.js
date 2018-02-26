import React, { Component } from 'react';

import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      searchResults:[
        {name:'Reminder', artist: 'Weeknd', album: 'Starboy', uri:'1' },
        {name:'I Aint Mad at Ya', artist: 'Tupac', album: 'Tupac Greatest Hits' , uri:'2' },
        {name:'', artist: '', album: '' , uri:'3'}
      ],
      playlistName: 'My Playlist',
      playlistTracks: []
    };
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
  }
/*
addTrack(track){
    let matchFound = false;
this.state.playlistTracks.forEach(playlistTrack =>{
  if(playlistTrack.id===track.id){
    matchFound = true;
  }
});
 if (!matchFound) {
     this.state.playlistTracks.push(track);
     this.setState({playlistTracks:this.state.playlistTracks})
   }
}
*/

addTrack(track) {
    if (!this.state.playlistTracks.find(x => x.id === track.id)) {
      this.state.playlistTracks.push(track);
      this.setState({
        playlistTracks: this.state.playlistTracks
      })
    }
  }




removeTrack(track){
  this.state.playlistTracks =
  this.state.playlistTracks.filter(playlistTrack => playlistTrack.id!==track.id );
  this.setState({playlistTracks:this.state.playlistTracks});
}

updatePlaylistName(name){
  this.setState({playlistName: name});
}

/*
savePlaylist(){
  Spotify.savePlaylist()
  this.setState({playlistName: 'New Playlist'});
  this.setState({searchResults: []});
}
*/
savePlaylist() {
    let playlistName = this.state.playlistName;
    let tracks = Array.from(this.state.playlistTracks, x => x.uri);
    Spotify.savePlaylist(playlistName, tracks);
    this.setState({
      playlistTracks: [],
      playlistName: 'New Playlist'
    })
  }

search(term){
  Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
}

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
              <SearchBar onSearch={this.search()}/>
              <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
              <Playlist playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
              </div>
            </div>
        </div>
    );
  }
}

export default App;
