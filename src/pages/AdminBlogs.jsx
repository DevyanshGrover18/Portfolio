import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Eye,
  EyeOff,
  LogOut,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import GlobalBackground from "../components/GlobalBackground";
import { clearAdminToken } from "../services/adminAuth";
import { postService } from "../services/postService";
import "../styles/adminBlogs.css";

const DeleteModal = ({ post, onConfirm, onCancel, isDeleting }) => (
  <div className="admin_blog_modal-backdrop" onClick={onCancel}>
    <div className="admin_blog_modal" onClick={(event) => event.stopPropagation()}>
      <div className="admin_blog_modal-icon">
        <AlertTriangle size={28} />
      </div>
      <h3 className="admin_blog_modal-title">Delete Post?</h3>
      <p className="admin_blog_modal-body">
        <strong>"{post.title || "Untitled"}"</strong> will be permanently deleted.
        This cannot be undone.
      </p>
      <div className="admin_blog_modal-actions">
        <button onClick={onCancel} className="admin_blog_modal-cancel" disabled={isDeleting}>
          Cancel
        </button>
        <button onClick={onConfirm} className="admin_blog_modal-confirm" disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  </div>
);

const Toast = ({ message, type, onDone }) => {
  useEffect(() => {
    const timer = setTimeout(onDone, 3000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return <div className={`admin_blog_toast admin_blog_toast--${type}`}>{message}</div>;
};

const AdminBlogs = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => setToast({ message, type });

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await postService.getAdminPosts({ limit: 100 });
      setPosts(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleTogglePublish = async (post) => {
    setTogglingId(post._id);

    try {
      await postService.update(post._id, { published: !post.published });
      setPosts((current) =>
        current.map((item) =>
          item._id === post._id ? { ...item, published: !item.published } : item,
        ),
      );
      showToast(`Post ${post.published ? "unpublished" : "published"} successfully`);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    setIsDeleting(true);

    try {
      await postService.delete(deleteTarget._id);
      setPosts((current) => current.filter((post) => post._id !== deleteTarget._id));
      showToast("Post deleted successfully");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleLogout = () => {
    clearAdminToken();
    navigate("/admin/login", { replace: true });
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const getExcerpt = (blocks = []) => {
    const paragraph = blocks.find((block) => block.type === "paragraph" && block.content);
    if (!paragraph?.content?.content) {
      return "No content yet.";
    }

    const texts = [];

    const walk = (nodes) => {
      for (const node of nodes || []) {
        if (node.type === "text") {
          texts.push(node.text);
        }

        if (node.content) {
          walk(node.content);
        }
      }
    };

    walk(paragraph.content.content);

    const excerpt = texts.join(" ").trim();
    return excerpt.length > 140 ? `${excerpt.slice(0, 140).trimEnd()}...` : excerpt || "No content yet.";
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getExcerpt(post.blocks).toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "published" && post.published) ||
      (filter === "draft" && !post.published);

    return matchesSearch && matchesFilter;
  });

  const counts = {
    all: posts.length,
    published: posts.filter((post) => post.published).length,
    draft: posts.filter((post) => !post.published).length,
  };

  return (
    <div className="admin_blog_page">
      <GlobalBackground />

      {toast ? (
        <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />
      ) : null}

      {deleteTarget ? (
        <DeleteModal
          post={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          isDeleting={isDeleting}
        />
      ) : null}

      <div className="admin_blog_container">
        <div className="admin_blog_header">
          <div className="admin_blog_header-left">
            <h1 className="admin_blog_page-title">
              Post <span className="admin_blog_title-highlight">Manager</span>
            </h1>
            <p className="admin_blog_page-subtitle">
              Create, edit, publish and delete your blog posts
            </p>
          </div>

          <div className="admin_blog_header-actions">
            <button className="admin_blog_logout-btn" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </button>
            <button className="admin_blog_new-btn" onClick={() => navigate("/admin/editor")}>
              <Plus size={18} />
              New Post
            </button>
          </div>
        </div>

        <div className="admin_blog_stats">
          {["all", "published", "draft"].map((key) => (
            <button
              key={key}
              className={`admin_blog_stat-pill ${filter === key ? "active" : ""}`}
              onClick={() => setFilter(key)}
            >
              <span className="admin_blog_stat-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
              <span className="admin_blog_stat-count">{counts[key]}</span>
            </button>
          ))}
        </div>

        <div className="admin_blog_search-wrapper">
          <Search size={18} className="admin_blog_search-icon" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="admin_blog_search-input"
          />
          {searchQuery ? (
            <button onClick={() => setSearchQuery("")} className="admin_blog_search-clear">
              <X size={15} />
            </button>
          ) : null}
        </div>

        {loading ? (
          <div className="blogs_state">
            <div className="blogs_spinner" />
            <p>Loading posts...</p>
          </div>
        ) : null}

        {error && !loading ? (
          <div className="blogs_state blogs_state--error">
            <p>Failed to load: {error}</p>
            <button onClick={fetchPosts} className="admin_blog_retry-btn">
              Retry
            </button>
          </div>
        ) : null}

        {!loading && !error ? (
          <>
            <div className="admin_blog_grid">
              {filteredPosts.map((post, index) => (
                <article
                  key={post._id}
                  className={`admin_blog_card ${post.published ? "admin_blog_card--published" : "admin_blog_card--draft"}`}
                  style={{ animationDelay: `${index * 0.04}s` }}
                >
                  <div className="admin_blog_card-image">
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title} />
                    ) : (
                      <div className="admin_blog_card-image-placeholder">
                        <span>No Cover</span>
                      </div>
                    )}
                    <div className="admin_blog_card-image-overlay" />

                    <span
                      className={`admin_blog_badge ${post.published ? "admin_blog_badge--live" : "admin_blog_badge--draft"}`}
                    >
                      {post.published ? "Live" : "Draft"}
                    </span>
                  </div>

                  <div className="admin_blog_card-body">
                    <div className="admin_blog_card-meta">
                      <span className="admin_blog_card-date">{formatDate(post.createdAt)}</span>
                      {post.updatedAt !== post.createdAt ? (
                        <span className="admin_blog_card-edited">
                          edited {formatDate(post.updatedAt)}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="admin_blog_card-title">{post.title || "Untitled"}</h3>
                    <p className="admin_blog_card-excerpt">{getExcerpt(post.blocks)}</p>
                  </div>

                  <div className="admin_blog_card-actions">
                    <button
                      className="admin_blog_action-btn admin_blog_action-btn--view"
                      onClick={() => navigate(`/blogs/${post._id}`)}
                      disabled={!post.published}
                      title={post.published ? "View post" : "Publish to view"}
                    >
                      <Eye size={15} />
                      <span>View</span>
                    </button>

                    <button
                      className="admin_blog_action-btn admin_blog_action-btn--edit"
                      onClick={() => navigate(`/admin/editor/${post._id}`)}
                      title="Edit post"
                    >
                      <Pencil size={15} />
                      <span>Edit</span>
                    </button>

                    <button
                      className={`admin_blog_action-btn ${post.published ? "admin_blog_action-btn--unpublish" : "admin_blog_action-btn--publish"}`}
                      onClick={() => handleTogglePublish(post)}
                      disabled={togglingId === post._id}
                      title={post.published ? "Unpublish" : "Publish"}
                    >
                      {togglingId === post._id ? (
                        <span className="admin_blog_btn-spinner" />
                      ) : post.published ? (
                        <EyeOff size={15} />
                      ) : (
                        <Eye size={15} />
                      )}
                      <span>{post.published ? "Unpublish" : "Publish"}</span>
                    </button>

                    <button
                      className="admin_blog_action-btn admin_blog_action-btn--delete"
                      onClick={() => setDeleteTarget(post)}
                      title="Delete post"
                    >
                      <Trash2 size={15} />
                      <span>Delete</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 ? (
              <div className="admin_blog_empty">
                {searchQuery || filter !== "all" ? (
                  <p>No posts match your filter.</p>
                ) : (
                  <>
                    <p>No posts yet.</p>
                    <button className="admin_blog_new-btn" onClick={() => navigate("/admin/editor")}>
                      <Plus size={16} /> Create your first post
                    </button>
                  </>
                )}
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AdminBlogs;
