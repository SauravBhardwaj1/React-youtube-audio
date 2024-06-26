import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file
import CustomModal from './components/Modal';
import { Container, Grid, GridItem, Text, Spinner } from '@chakra-ui/react';
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
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [defaultVideosFetched, setDefaultVideosFetched] = useState(false);
    const [error, setError] = useState(null);

    // Fetching default videos
    const fetchDefaultVideos = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(
                `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=10&key=${config.API_KEY}`
            );
            if (!res.ok) {
                throw new Error("Failed to fetch default videos");
            }
            const data = await res.json();
            setVideos(data.items);
            setDefaultVideosFetched(true);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError("Failed to fetch default videos.");
            setDefaultVideosFetched(false);
            setLoading(false);
        }
    };

    // Function to fetch videos from YouTube API
    const searchVideos = async (query) => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${config.API_KEY}`);
            if (!res.ok) {
                throw new Error('Failed to fetch search results');
            }
            const data = await res.json();
            setVideos(data.items);
            setSearchPerformed(true);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch search results.");
            setLoading(false);
        }
    };

    const extractAudioAndPlay = async (videoId, snippet, card) => {
        try {
            setLoading(true);

            // Stop currently playing audio
            if (currentlyPlayingAudio) {
                currentlyPlayingAudio.pause();
                currentlyPlayingAudio.currentTime = 0;
                currentlyPlayingAudio.src = ''; // Clear the src attribute
                setCurrentlyPlayingAudio(null);
            }

            const encodedVideoId = encodeURIComponent(videoId);
            const res = await fetch(`${config.backendURL}/extractAudio`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    videoId,
                    url: `https://www.youtube.com/watch?v=${encodedVideoId}`
                }),
            });

            if (!res.ok) {
                throw new Error(`Failed to extract audio: ${res.status} - ${res.statusText}`);
            }

            // Play the audio file received from the backend
            const audioBlob = await res.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            const audio = new Audio(audioUrl);
            setCurrentlyPlayingAudio(audio);
            audio.play();

            setLoading(false);

            // Update UI to indicate currently playing card
            if (currentlyPlayingCard) {
                currentlyPlayingCard.classList.remove('playing');
            }
            card.classList.add('playing');
            setCurrentlyPlayingCard(card);
            audio.addEventListener('ended', () => {
                card.classList.remove('playing');
            });
        } catch (err) {
            console.error(err);
            setError("Failed to extract and play audio.");
            setLoading(false);
        }
    };

    const handleVideoClick = async (video, card) => {
        const videoId = video.id.videoId || video.id;
        setSelectedVideo(video);
        await extractAudioAndPlay(videoId, video.id, card);
    };

    const handleCloseModal = () => {
        if (currentlyPlayingAudio) {
            currentlyPlayingAudio.pause();
            currentlyPlayingAudio.currentTime = 0;
            currentlyPlayingAudio.src = '';
            setCurrentlyPlayingAudio(null);
        }
        setSelectedVideo(null);
    };

    const handleSearchSubmit = (query) => {
        searchVideos(query);
        console.log('Search query: ' + query);
    };

    useEffect(() => {
         fetchDefaultVideos();
    }, []);

    return (
        <div>
            <Navbar onSubmit={handleSearchSubmit} />
            <Container maxW="container.xl" mt={4}>
                <Grid templateColumns={{ base: "100%", md: "250px 1fr" }} gap={6}>
                    <GridItem>
                        <Sidebar />
                    </GridItem>
                    <GridItem>
                        {loading ? (
                            <Spinner size="xl" />
                        ) : error ? (
                            <Text color="red.500">{error}</Text>
                        ) : videos.length === 0 ? (
                            <Text>
                                {searchPerformed ? "No videos found for your search." : defaultVideosFetched ? "No default videos available." : "Your videos will appear here."}
                            </Text>
                        ) : (
                            <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
                                {videos.map((video, index) => (
                                    <VideoCard
                                        key={video.id || video.id.videoId || index}
                                        video={video}
                                        onClick={(e) => handleVideoClick(video, e.currentTarget)}
                                    />
                                ))}
                            </Grid>
                        )}
                    </GridItem>
                </Grid>
            </Container>
            <CustomModal isOpen={!!selectedVideo} onClose={handleCloseModal} title="Video Details">
                {selectedVideo && (
                    <>
                        <h2>{selectedVideo.snippet.title}</h2>
                        <p>{selectedVideo.snippet.channelTitle}</p>
                        <img src={selectedVideo.snippet.thumbnails.medium.url} alt="" loading="lazy" />
                        <AudioPlayer audioUrl={selectedVideo.audioUrl} audioInstance={currentlyPlayingAudio} />
                    </>
                )}
            </CustomModal>
        </div>
    );
}

export default App;
