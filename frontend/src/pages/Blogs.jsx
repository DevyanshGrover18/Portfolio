import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/blogs.css';
import GlobalBackground from '../components/GlobalBackground';
import Navbar from '../components/Navbar';

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/api/posts?published=true&limit=50`
        );
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        setBlogs(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.blocks?.some(b =>
      b.type === 'paragraph' &&
      JSON.stringify(b.content).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const getExcerpt = (blocks = []) => {
    const para = blocks.find(b => b.type === 'paragraph' && b.content);
    if (!para?.content?.content) return '';
    const texts = [];
    const walk = (nodes) => {
      for (const node of nodes || []) {
        if (node.type === 'text') texts.push(node.text);
        if (node.content) walk(node.content);
      }
    };
    walk(para.content.content);
    const full = texts.join(' ');
    return full.length > 160 ? full.slice(0, 160).trimEnd() + '…' : full;
  };

  return (
    <div className="blogs_page">
      <GlobalBackground />
      <Navbar />

      <div className="blogs_container">
        <div className="blogs_header">
          <h1 className="blogs_page-title">
            Meet the <span className="blogs_title-highlight">Blogger</span> in Me
          </h1>
          <p className="blogs_page-subtitle">
            Insights, tutorials, and thoughts on modern web development & more
          </p>
        </div>

        <div className="blogs_search-container">
          <div className="blogs_search-wrapper">
            <svg className="blogs_search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search blogs by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blogs_search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="blogs_search-clear">✕</button>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="blogs_state">
            <div className="blogs_spinner" />
            <p>Loading posts…</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="blogs_state blogs_state--error">
            <p>Failed to load posts: {error}</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <>
            <div className="blogs_grid">
              {filteredBlogs.map((blog) => (
                <article key={blog._id} className="blogs_card">
                  <div className="blogs_image-wrapper">
                    {blog.coverImage
                      ? <img src={blog.coverImage} alt={blog.title} className="blogs_image" />
                      : <div className="blogs_image-placeholder" />
                    }
                    <div className="blogs_overlay" />
                  </div>

                  <div className="blogs_content">
                    <div className="blogs_meta">
                      <span className="blogs_date">{formatDate(blog.createdAt)}</span>
                    </div>

                    <h3 className="blogs_title">{blog.title || 'Untitled'}</h3>
                    <p className="blogs_excerpt">{getExcerpt(blog.blocks)}</p>

                    <div className="blogs_footer">
                      <button
                        className="blogs_read-more-btn"
                        onClick={() => navigate(`/blogs/${blog._id}`)}
                      >
                        <span>Read More</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredBlogs.length === 0 && (
              <div className="blogs_no-blogs">
                <p>No blogs found{searchQuery ? ` matching "${searchQuery}"` : ''}.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blogs;