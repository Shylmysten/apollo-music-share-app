import React from "react";
import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid, useMediaQuery, Hidden } from '@material-ui/core';
import songReducer from "./reducer";

export const SongContext = React.createContext({
  song: {
    id: 'f8040162-1565-42df-ad95-bb1a96ccc1b5',
    title: 'Mine All Mine',
    artist: 'Van Halen',
    thumbnail: 'http://img.youtube.com/vi/IVH7mHldMOo/0.jpg',
    url: 'https://www.youtube.com/watch?v=IVH7mHldMOo',
    duration: 315
  },
  isPlaying: false
})


function App() {
  const initalSongState = React.useContext(SongContext);
  const [state, dispatch] = React.useReducer(songReducer, initalSongState);
  const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));
  return (
     <SongContext.Provider value={{ state, dispatch}}>
     <Hidden only="xs">
        <Header />
     </Hidden>
        <Grid container spacing={3}>
          <Grid style={{
            paddingTop: greaterThanSm ? 80 : 10
          }} item xs={12} md={7}>
            <AddSong />
            <SongList />
          </Grid>
          <Grid style={ greaterThanMd ? {
            position: 'fixed',
            width: '100%',
            right: 0,
            top: 70
          } : {
            position: 'fixed',
            width: '100%',
            left: 0,
            bottom: 0
          }} item xs={12} md={5}>
            <SongPlayer />
          </Grid>
        </Grid>
     </SongContext.Provider>
  );
}

export default App;
