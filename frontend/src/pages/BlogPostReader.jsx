import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateHTML } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import Navbar from '../components/Navbar';
import GlobalBackground from '../components/GlobalBackground';
import '../styles/blogPost.css';

const lowlight = createLowlight(common);

const extensions = [
  StarterKit.configure({ codeBlock: false }),
  CodeBlockLowlight.configure({ lowlight }),
];

const BlogPostReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [postRes, allRes] = await Promise.all([
          fetch(`${BASE}/api/posts/${id}`),
          fetch(`${BASE}/api/posts?published=true&limit=10`),
        ]);

        const postData = await postRes.json();
        const allData = await allRes.json();

        if (!postData.success) throw new Error(postData.message);

        setPost(postData.data);
        setOtherPosts(allData.data?.filter(p => p._id !== id) || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const renderBlocks = (blocks = []) =>
    blocks.map((block) => {
      if (block.type === 'paragraph') {
        const html = block.content ? generateHTML(block.content, extensions) : '';
        return (
          <div
            key={block.id}
            className="blogpost_block blogpost_paragraph"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
      if (block.type === 'image' && block.url) {
        return (
          <figure key={block.id} className="blogpost_block blogpost_figure">
            <img src={block.url} alt={block.caption || ''} className="blogpost_img" />
            {block.caption && <figcaption className="blogpost_caption">{block.caption}</figcaption>}
          </figure>
        );
      }
      return null;
    });

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
    return full.length > 120 ? full.slice(0, 120).trimEnd() + '…' : full;
  };

  if (loading) return (
    <div className="blogpost_page">
      <GlobalBackground />
      <Navbar />
      <div className="blogpost_loading">
        <div className="blogs_spinner" />
        <p>Loading post…</p>
      </div>
    </div>
  );

  if (error || !post) return (
    <div className="blogpost_page">
      <GlobalBackground />
      <div className="blogpost_error">
        <p>{error || 'Post not found.'}</p>
        <button onClick={() => navigate('/blogs')} className="blogpost_back-btn">← Back to blogs</button>
      </div>
    </div>
  );

  return (
    <div className="blogpost_page">
      <GlobalBackground />

      {/* Cover banner */}
      {post.coverImage && (
        <div className="blogpost_cover">
          <img src={post.coverImage} alt={post.title} className="blogpost_cover-img" />
          <div className="blogpost_cover-fade" />
        </div>
      )}

      <div className="blogpost_layout">
        {/* ── Main content (80%) ── */}
        <main className="blogpost_main">
          <button onClick={() => navigate('/blogs')} className="blogpost_back-btn">
            ← All Posts
          </button>

          <header className="blogpost_header">
            <h1 className="blogpost_title">{post.title || 'Untitled'}</h1>
            <p className="blogpost_date">{formatDate(post.createdAt)}</p>
          </header>

          <div className="blogpost_body">
            {renderBlocks(post.blocks)}
          </div>
        </main>

        {/* ── Sidebar (20%) ── */}
        <aside className="blogpost_sidebar">
          <div className="blogpost_sidebar-inner">
            <h3 className="blogpost_sidebar-heading">More Posts</h3>

            {otherPosts.length === 0 && (
              <p className="blogpost_sidebar-empty">No other posts yet.</p>
            )}

            <div className="blogpost_sidebar-list">
              {otherPosts.map((p) => (
                <button
                  key={p._id}
                  className="blogpost_sidebar-card"
                  onClick={() => navigate(`/blogs/${p._id}`)}
                >
                  {p.coverImage && (
                    <img src={p.coverImage} alt={p.title} className="blogpost_sidebar-img" />
                  )}
                  <div className="blogpost_sidebar-info">
                    <span className="blogpost_sidebar-title">{p.title || 'Untitled'}</span>
                    <span className="blogpost_sidebar-date">{formatDate(p.createdAt)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPostReader;
