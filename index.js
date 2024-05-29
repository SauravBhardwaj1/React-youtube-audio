const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/',function(req,res){
    res.send("Welcome to YouTube backend!");
    console.log("Welcome to youtube backend!");
})



// Serve static audio files from the 'audio' directory
app.use('/audio', express.static(path.join(__dirname, 'audio')));

app.post('/extractAudio', async (req, res) => {
    try {
        const { videoId } = req.body;
        console.log("videoID", videoId);

        if (!videoId) {
            throw new Error('Missing videoId in request body');
        }

        // Get video info from YouTube
        const info = await ytdl.getInfo(videoId);

        // Choose audio format
        const audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });

        if (!audioFormat) {
            throw new Error('No suitable audio format found');
        }

        // Set Content-Type header to indicate audio stream
        res.setHeader('Content-Type', 'audio/mpeg');

        // Stream audio data directly to client response
        ytdl.downloadFromInfo(info, { format: audioFormat }).pipe(res);
    } catch (error) {
        console.error('Error extracting audio:', error.message);
        res.status(500).json({ error: 'Extraction failed', message: error.message });
    }
});



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});