import React from "react";
import { 
    Card, 
    CardActions, 
    CardContent, 
    CardMedia, 
    CircularProgress, 
    IconButton, 
    Typography,
    makeStyles
} from "@material-ui/core";
import { Delete, Pause, PlayArrow, Save } from "@material-ui/icons";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import { GET_SONGS } from "../graphql/subscriptions";
import { SongContext } from "../App";
import { ADD_OR_REMOVE_FROM_QUEUE, DELETE_SONG } from "../graphql/mutations";

function SongList() {
    const { data, loading, error } = useSubscription(GET_SONGS);

    // const song = {
    //     title: "LUNE",
    //     artist: "MOON",
    //     thumbnail: "https://source.unsplash.com/random/500x500" 
    // }

    if (loading) {
        return (
            <div style={{ 
                display: "flex", 
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 50
            }}>
                <CircularProgress/>
            </div>
        )
    }
    if (error) return <div>Error fetching songs</div>


    return <div>{data.songs.map(song => (
        <Song key={song.id} song={song}/>
    ))}</div>
}

const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(3)
    },
    songInfoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    songInfo: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    thumbnail: {
        width: 140,
        height: 140,
        objectFit: 'cover',
        display: 'block',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top left',
        flex: '1 0 auto'
    }
}))
function Song({ song }) {
    const classes = useStyles();
    const [addOrRemoveFromQueue, ] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
        onCompleted: data => {
            localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue));
        }
    });
    const [deleteSong] = useMutation(DELETE_SONG);
    const { state, dispatch } = React.useContext(SongContext)
    const [currentSongPlaying, setCurrentSongPlaying] = React.useState(false);
    const { thumbnail, artist, title, id } = song;

    React.useEffect(() => {
        const isSongPlaying = state.isPlaying && id === state.song.id;
        setCurrentSongPlaying(isSongPlaying)
    }, [id, state.song.id, state.isPlaying]);

    function handleTogglePlay() {
        dispatch({ type: 'SET_SONG', payload: { song }})
        dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG'});
    }

    function handleAddOrRemoveFromQueue() {
        addOrRemoveFromQueue({
            variables: {input: {...song, __typename: 'Song'}}
        })
    }

    async function handleDeleteSong({ id }) {
        const isConfirmed = window.confirm('Do you want to remove this song from your music library?');
        if (isConfirmed) {
            const data = await deleteSong( { variables: { id }});
            console.log('deleted song', data);
        }
    }

    return (
        <Card className={classes.container}>
            <div className={classes.songInfoContainer}>
                <CardMedia image={thumbnail} className={classes.thumbnail}/>
                <div className={classes.songInfo}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body1" component="p" color="textSecondary">
                            {artist}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={handleTogglePlay} size="small" color="primary">
                            {currentSongPlaying ? <Pause/> : <PlayArrow  />}
                        </IconButton>
                        <IconButton onClick={handleAddOrRemoveFromQueue} size="small" color="secondary">
                            <Save/>
                        </IconButton>
                        <IconButton onClick={() => handleDeleteSong(song)} size="small">
                            <Delete color="error" />
                        </IconButton>
                    </CardActions>
                </div>
            </div>
        </Card>
    )
}

export default SongList;