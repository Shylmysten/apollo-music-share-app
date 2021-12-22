# Apollo Music Player
*by **Tony Boswell***


## Forward
I wanted to see if I could learn React Hooks with this project through a course I took from Reed Barger. The project was a simple music player,  that took either a YouTube or SoundCloud Link and created a list of songs, that could be added to a play queue. The Player was a lot more complex than I thought it would be, and added quite a few packages/libraries that I have never used before. While I don't think I'm quite there yet with a full understanding of hooks, I think i have been introduced to the basic concepts, which will help me to further develop my understanding of what Hooks do for React in some of my other projects.

## How To Use

Simply point your browser to https://shylmysten.github.io/apollo-music-share-app/
or clone this repository: https://github.com/Shylmysten/apollo-music-share-app.git

 - When the page finishes loading, the music player is ready to start accepting urls for songs
 - Enter a YouTube or SoundCloud Url and click the Add button to add it to your list of songs on under the input
 - To add the song to your player Queue, simply click the magenta disk icon in the song card you want to add to your queue
 - To play a song, you can either click the play button on the sound card to select that song, or click the player's play button
 - You can skip to the next or previous song in your queue by selecting the next or previous buttons
 - The player also allows you to skip ahead in the song by dragging the slider anywhere in the song you want it to play from
 - When the Current song playing has completed, the player will automatically play the next song in your queue
 - The Songs currently populating the list are being pulled in via Hasura

## TODOS:

 - add a mutation that would allow me to remove items from the database so the player starts empty

## Attributions

**Coursework and Code from Reed Barger's React Bootcamp https://reactbootcamp.com/
