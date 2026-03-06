import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

function App() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setImageUrl("");
        if (!text.trim()) {
            setError("Informe um texto ou URL para gerar o QR Code.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}/qrcode`, {
                text,
            });
            setImageUrl(response.data.url);
        } catch (err) {
            console.error(err);
            if (!err.response) {
                setError("Falha de conexão com a API. Verifique se o backend está rodando e se o CORS/proxy está configurado.");
            } else {
                setError("Não foi possível gerar o QR Code. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <div className="bg-blob bg-blob-1" />
            <div className="bg-blob bg-blob-2" />
            <div className="bg-blob bg-blob-3" />

            <nav className="navbar">
                <div className="navbar-inner">
                    <div className="nav-brand">
                        <span className="nav-logo">⬡</span>
                        <span className="nav-name">QRCode Generator</span>
                    </div>
                    <div className="nav-links">
                        <a className="nav-link" href="https://github.com/leofwingert/qrcode-generator" target="_blank" rel="noreferrer">GitHub</a>
                    </div>
                </div>
            </nav>

            <section className="hero">
                <h1 className="hero-title">
                    Transforme qualquer texto em<br />
                    um <span className="hero-gradient-text">QR Code</span>
                </h1>
            </section>

            <main className="main-card">
                <div className="card-glow" />
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="label-text" htmlFor="qr-input">
                            <span className="label-icon">🔗</span>
                            Texto ou URL
                        </label>
                        <div className="input-wrapper">
                            <input
                                id="qr-input"
                                type="text"
                                value={text}
                                className="input"
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Cole uma URL, texto, chave Pix, número de pedido..."
                            />
                            <button
                                type="submit"
                                className="button"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="button-label">
                                        <span className="button-spinner" />
                                        Gerando...
                                    </span>
                                ) : (
                                    <span className="button-label">
                                        Gerar QR Code
                                        <span className="button-arrow">→</span>
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="error">
                            <span className="error-icon">⚠</span>
                            {error}
                        </div>
                    )}
                </form>

            </main>

            {imageUrl && (
                <section className="result-card">
                    <div className="result-success-bar">
                        <span className="result-check">✓</span>
                        QR Code gerado com sucesso!
                    </div>
                    <div className="result-body">
                        <div className="qr-wrapper">
                            <img
                                src={imageUrl}
                                alt="QR Code gerado"
                                className="qr-image"
                            />
                            <div className="qr-corner qr-corner-tl" />
                            <div className="qr-corner qr-corner-tr" />
                            <div className="qr-corner qr-corner-bl" />
                            <div className="qr-corner qr-corner-br" />
                        </div>
                        <div className="result-info">
                            <div className="result-title">Seu QR Code está pronto</div>
                            <div className="result-url-box">
                                <span className="result-url-label">URL da imagem</span>
                                <a className="result-url" href={imageUrl} target="_blank" rel="noreferrer">
                                    {imageUrl}
                                </a>
                            </div>
                            <div className="result-actions">
                                <a
                                    className="result-btn"
                                    href={imageUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Abrir imagem ↗
                                </a>
                                <button
                                    className="result-btn result-btn-outline"
                                    onClick={() => navigator.clipboard.writeText(imageUrl)}
                                >
                                    Copiar URL
                                </button>
                            </div>
                            <p className="result-hint">
                                Clique com o botão direito na imagem para salvar ou use os botões acima.
                            </p>
                        </div>
                    </div>
                </section>
            )}

            <footer className="footer">
                <span>Feito com Java 21 + Spring Boot + React</span>
                <span className="footer-sep">•</span>
                <span>QR Code Generator</span>
            </footer>
        </div>
    );
}

export default App;
