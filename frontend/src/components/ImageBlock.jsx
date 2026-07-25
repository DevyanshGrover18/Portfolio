import { useState } from 'react';

const ImageBlock = ({ block, onUpdate, onDelete, isPreview }) => {
  const [isEditing, setIsEditing] = useState(!block.url);

  const handleUrlChange = (e) => {
    onUpdate(block.id, { url: e.target.value });
  };

  const handleCaptionChange = (e) => {
    onUpdate(block.id, { caption: e.target.value });
  };

  const handleUrlSubmit = () => {
    if (block.url) {
      setIsEditing(false);
    }
  };

  // ── PREVIEW MODE: clean article figure, no editing chrome ──
  if (isPreview) {
    if (!block.url) return null; // don't render empty image blocks in preview

    return (
      <div className="image-block">
        <figure style={{ margin: 0 }}>
          <img src={block.url} alt={block.caption || 'Blog image'} className="block-image" />
          {block.caption && (
            <figcaption className="image-caption">{block.caption}</figcaption>
          )}
        </figure>
      </div>
    );
  }

  // ── EDIT MODE: original editing UI ──
  return (
    <div className="image-block">
      {!block.url || isEditing ? (
        <div className="image-input-wrapper">
          <input
            type="text"
            value={block.url || ''}
            onChange={handleUrlChange}
            placeholder="Paste image URL..."
            className="image-url-input"
            onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
            autoFocus
          />
          <button onClick={handleUrlSubmit} className="image-submit-btn">
            Add Image
          </button>
        </div>
      ) : (
        <div className="image-preview-wrapper">
          <img src={block.url} alt={block.caption || 'Blog image'} className="block-image" />

          <div className="image-controls">
            <button onClick={() => setIsEditing(true)} className="edit-image-btn">
              Edit URL
            </button>
            <button onClick={() => onDelete(block.id)} className="delete-btn">
              Delete
            </button>
          </div>

          <input
            type="text"
            value={block.caption || ''}
            onChange={handleCaptionChange}
            placeholder="Add a caption..."
            className="image-caption-input"
          />
        </div>
      )}
    </div>
  );
};

export default ImageBlock;