import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://eliandro-yt-backend.netlify.app/.netlify/functions/server/download', { youtubeUrl }, { responseType: 'blob' });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            // Obter o nome do arquivo do cabeçalho Content-Disposition
            const contentDisposition = response.headers['content-disposition'];
            const fileName = contentDisposition.split(';')[1].trim().split('=')[1].replace(/"/g, '');

            link.setAttribute('download', `${fileName}.mp4`);
            document.body.appendChild(link);
            link.click();

            setMessage('Vídeo baixado com sucesso! Verifique seu navegador para download.');
        } catch (error) {
            setMessage('Erro ao baixar o vídeo.');
            console.error('Erro ao enviar requisição:', error);
        }
    };

    return (
        <div className="App">
            <h1 className="title">Eliandro YouTube Video Downloader</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="url-input"
                    placeholder="Insira a URL do vídeo do YouTube"
                    required
                />
                <button type="submit" className="download-button">Baixar</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default App;
