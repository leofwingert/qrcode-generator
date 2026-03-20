import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
const STORAGE_THEME_KEY = "qr-theme";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem(STORAGE_THEME_KEY);
    const initialTheme =
      storedTheme ||
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem(STORAGE_THEME_KEY, nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setImageUrl("");

    if (!text.trim()) {
      setError("Informe um texto ou URL para gerar o QR Code.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/qrcode`, { text });
      setImageUrl(response.data.url);
    } catch (err) {
      console.error(err);
      if (!err.response) {
        setError("Falha de conexão com a API. Verifique se o backend está rodando.");
      } else {
        setError("Não foi possível gerar o QR Code. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <section className="hero">
        <h2>Qr Code</h2>
        <p>Transforme qualquer texto em QR Code.</p>
      </section>

      <main className="card">
        <form className="form" onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="qr-input">
            Texto ou URL
          </label>
          <div className="field-row">
            <input
              id="qr-input"
              type="text"
              value={text}
              className="input"
              onChange={(event) => setText(event.target.value)}
              placeholder="Cole uma URL, texto, chave Pix ou código de pedido..."
            />
            <button type="submit" className="submit" disabled={loading}>
              {loading ? "Gerando..." : "Gerar QR Code"}
            </button>
          </div>
          {error && <div className="error">{error}</div>}
        </form>
      </main>

      {imageUrl && (
        <section className="card">
          <div className="result-header">
            <h3>Resultado</h3>
            <span className="status">gerado com sucesso</span>
          </div>
          <div className="result-content">
            <div className="qr-frame">
              <img src={imageUrl} alt="QR Code gerado" className="qr-image" />
            </div>
            <div className="result-meta">
              <p>{imageUrl}</p>
              <div className="actions">
                <a className="btn" href={imageUrl} target="_blank" rel="noreferrer">
                  Abrir imagem
                </a>
                <button
                  type="button"
                  className="btn"
                  onClick={() => navigator.clipboard.writeText(imageUrl)}
                >
                  Copiar URL
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
