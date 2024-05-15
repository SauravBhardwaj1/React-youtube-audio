
import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file
import CustomModal from './components/Modal';
import { Container, Grid, GridItem } from '@chakra-ui/react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import VideoCard from './components/VideoCard';
import config from './config';
import AudioPlayer from './components/AudioPlayer';


function App() {
    
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentlyPlayingAudio, setCurrentlyPlayingAudio] = useState(null);
    const [currentlyPlayingCard, setCurrentlyPlayingCard] = useState(null);
    const [query, setQuery] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDetails, setModalDetails] = useState({
      title: "",
      channel: "",
      thumbnail: "",
      audioUrl: ""
    });

    //Fetching default videos
    const fetchDefaultVideos = async () => {
      try {
        const res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=10&key=${config.API_KEY}&`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch default videos");
        }
        const data = await res.json();
        setVideos(data.items);
      } catch (error) {
        console.error(error);
      }
    };

    // Function to fetch videos from YouTube API
    const searchVideos = async (query) => {
        try {
            setLoading(true);
            const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${config.API_KEY}`);
            if (!res.ok) {
                throw new Error('Failed to fetch search results');
            }
            const data = await res.json();
            setVideos(data.items);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };
    
    const extractAudioAndPlay = async (videoId, snippet, card) => {
      try {
        setLoading(true);
  
        // Stop currently playing audio
        if (currentlyPlayingAudio) {
          currentlyPlayingAudio.pause();
        }
  
        const encodedVideoId = encodeURIComponent(videoId);
        const res = await fetch(`${config.backendURL}/extractAudio`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoId,
            snippet,
            url: `https://www.youtube.com/watch?v=${encodedVideoId}`,
          }),
        });
  
        if (!res.ok) {
          throw new Error(`Failed to extract audio: ${res.status} - ${res.statusText}`);
        }
  
        // Play the audio file received from the backend
        const audioBlob = await res.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
  
        setCurrentlyPlayingAudio(new Audio(audioUrl));
  
        // Hide loading indicator
        setLoading(false);
  
        // Update UI to indicate currently playing card
        if (currentlyPlayingCard) {
          currentlyPlayingCard.classList.remove('playing');
        }
        card.classList.add('playing');
        setCurrentlyPlayingCard(card);
      } catch (err) {
        console.error(err);
        // Handle errors
        setLoading(false);
      }
    };

    const handleVideoClick = async (video) => {
      setSelectedVideo(video);
      await extractAudioAndPlay(video.id, video.snippet);
    };
  
    const handleCloseModal = () => {
      setSelectedVideo(null);
    };

    useEffect(() => {
        // Fetch default videos on component mount
         fetchDefaultVideos();
    }, []);

    const handleSearchSubmit = (query) => {
        // Call searchVideos function with the submitted query
        searchVideos(query);
        console.log('Search query: ' + query);
    };

    return (
      <div>
      <Navbar  onSubmit={handleSearchSubmit} />
      <Container maxW="container.xl" mt={4}>
        <Grid templateColumns={{ base: "100%", md: "250px 1fr" }} gap={6}>
          <GridItem>
            <Sidebar />
          </GridItem>
          <GridItem>
          <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} onClick={() => handleVideoClick(video)} />
              ))}
            </Grid>
          </GridItem>
        </Grid>
      </Container>
      <CustomModal isOpen={!!selectedVideo} onClose={handleCloseModal} title="Video Details">
        {selectedVideo && (
          <>
            <h2>{selectedVideo.snippet.title}</h2>
            <p>{selectedVideo.snippet.channelTitle}</p>
            <img src={selectedVideo.snippet.thumbnails.medium.url} alt="" loading="lazy"/>
            <AudioPlayer audioUrl={selectedVideo.audioUrl} />
          </>
        )}
      </CustomModal>
    </div>
    );
}

export default App;
