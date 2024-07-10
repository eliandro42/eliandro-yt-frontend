import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://eliandro-yt-backend.netlify.app/.netlify/functions/server/download', { youtubeUrl });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Erro ao baixar o vídeo.');
            console.error('Erro ao enviar requisição:', error);
        }
    };

    return (
        <div className="App">
            <h1>Eliandro YouTube Video Downloader</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="Insira a URL do vídeo do YouTube"
                    required
                />
                <button type="submit">Baixar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default App;
