import React, { useEffect, useState } from "react";

const CRYPTOPANIC_API_KEY = "e59ec7289a377f45bd30cc48dcc6d35cbf5169fd"; // Replace with your CryptoPanic API key

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:5000/api/news");
        const data = await res.json();
        setArticles(data.results || []);
      } catch (err) {
        setError("Failed to load news.");
        setArticles([]);
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <div style={{
      background: "var(--card-bg, #222)",
      color: "var(--text-color, #fff)",
      borderRadius: 10,
      padding: 20,
      margin: "20px 0"
    }}>
      <h3 style={{ marginBottom: 16 }}>Recent Crypto News</h3>
      {loading ? (
        <div>Loading news...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {articles.map((article, idx) => (
            <li key={idx} style={{ marginBottom: 18 }}>
              <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: "#f2a900", fontWeight: 600, textDecoration: "none" }}>
                {article.title}
              </a>
              <div style={{ fontSize: 12, color: "#aaa" }}>
                {article.domain} &middot; {new Date(article.published_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsFeed;
