import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Eye, Pencil, Save } from "lucide-react";
import ParagraphBlock from "../components/ParagraphBlock";
import ImageBlock from "../components/ImageBlock";
import DragHandle from "../components/DragHandle";
import GlobalBackground from "../components/GlobalBackground";
import { postService } from "../services/postService";
import "../styles/blogEditor.css";

const SortableBlock = ({
  block,
  activeBlockId,
  setActiveBlockId,
  updateBlock,
  deleteBlock,
  isPreview,
  addBlock,
  index,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="block-wrapper">
      <div className="block-content-wrapper">
        {!isPreview ? (
          <div className="drag-handle-wrapper" {...attributes} {...listeners}>
            <DragHandle isDragging={isDragging} />
          </div>
        ) : null}

        <div className="block-content">
          {block.type === "paragraph" ? (
            <ParagraphBlock
              block={block}
              isActive={activeBlockId === block.id}
              onActivate={setActiveBlockId}
              onUpdate={updateBlock}
              onDelete={deleteBlock}
              isPreview={isPreview}
            />
          ) : null}

          {block.type === "image" ? (
            <ImageBlock
              block={block}
              onUpdate={updateBlock}
              onDelete={deleteBlock}
              isPreview={isPreview}
            />
          ) : null}
        </div>
      </div>

      {!isPreview ? (
        <div className="block-add-section">
          <button onClick={() => addBlock("paragraph", index)} className="add-block-btn">
            + Text
          </button>
          <button onClick={() => addBlock("image", index)} className="add-block-btn">
            + Image
          </button>
        </div>
      ) : null}
    </div>
  );
};

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [blocks, setBlocks] = useState([{ id: "1", type: "paragraph", content: null }]);
  const [activeBlockId, setActiveBlockId] = useState("1");
  const [isPreview, setIsPreview] = useState(false);
  const [postId, setPostId] = useState(id || null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(id));

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }, [title, isPreview]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPost = async () => {
      try {
        const data = await postService.getAdminPost(id);
        const post = data.data;

        setTitle(post.title || "");
        setCoverImage(post.coverImage || "");
        setBlocks(
          post.blocks?.length
            ? post.blocks
            : [{ id: "1", type: "paragraph", content: null }],
        );
        setActiveBlockId(post.blocks?.[0]?.id || "1");
      } catch (err) {
        alert(`Failed to load post: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const generateId = () => Math.random().toString(36).slice(2, 11);

  const addBlock = (type, index) => {
    const newBlock = {
      id: generateId(),
      type,
      content: type === "paragraph" ? null : undefined,
      url: type === "image" ? "" : undefined,
      caption: type === "image" ? "" : undefined,
    };

    setBlocks((current) => {
      const updated = [...current];
      updated.splice(index + 1, 0, newBlock);
      return updated;
    });
    setActiveBlockId(newBlock.id);
  };

  const updateBlock = (blockId, data) => {
    setBlocks((current) =>
      current.map((block) => (block.id === blockId ? { ...block, ...data } : block)),
    );
  };

  const deleteBlock = (blockId) => {
    if (blocks.length === 1) {
      return;
    }

    const index = blocks.findIndex((block) => block.id === blockId);
    const nextBlocks = blocks.filter((block) => block.id !== blockId);

    setBlocks(nextBlocks);

    if (index > 0) {
      setActiveBlockId(blocks[index - 1].id);
    } else if (nextBlocks.length > 0) {
      setActiveBlockId(nextBlocks[0].id);
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) {
      return;
    }

    setBlocks((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const payload = { title, coverImage, blocks };
      let result;

      if (postId) {
        result = await postService.update(postId, payload);
      } else {
        result = await postService.create(payload);
        setPostId(result.data._id);
      }

      alert(`Post ${postId ? "updated" : "created"} successfully.`);
      navigate("/admin/blogs");
    } catch (err) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="blog-editor-page">
        <GlobalBackground />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            flexDirection: "column",
            gap: "1rem",
            color: "#666",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              border: "3px solid rgba(255,215,0,0.15)",
              borderTopColor: "#FFD700",
              borderRadius: "50%",
              animation: "blogs_spin 0.75s linear infinite",
            }}
          />
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-editor-page">
      <GlobalBackground />

      <div className="blog-editor">
        <div className="editor-toolbar">
          <div className="toolbar-content">
            <div className="toolbar-left">
              <h3 className="editor-title">Blog Editor</h3>
            </div>
            <div className="toolbar-right">
              <button onClick={() => setIsPreview(!isPreview)} className="mode-toggle">
                <span className="toggle-icon">{isPreview ? <Pencil /> : <Eye />}</span>
                {isPreview ? "Edit" : "Preview"}
              </button>
              <button onClick={handleSave} className="save-button" disabled={isSaving}>
                <span className="toggle-icon">
                  <Save />
                </span>
                {isSaving ? "Saving..." : postId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>

        <div className={`cover-banner ${coverImage ? "has-image" : ""}`}>
          {coverImage ? <img src={coverImage} alt="Cover" className="cover-banner-img" /> : null}

          {!isPreview ? (
            <div className={`cover-banner-edit ${coverImage ? "over-image" : ""}`}>
              <input
                type="text"
                value={coverImage}
                onChange={(event) => setCoverImage(event.target.value)}
                placeholder="Paste a cover image URL..."
                className="cover-banner-input"
              />
              {coverImage ? (
                <button className="cover-remove-btn" onClick={() => setCoverImage("")}>
                  Remove
                </button>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className={`editor-container ${isPreview ? "preview-mode" : ""}`}>
          <div className="editor-header">
            <textarea
              ref={titleRef}
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                event.target.style.height = "auto";
                event.target.style.height = `${event.target.scrollHeight}px`;
              }}
              placeholder="Untitled"
              className="title-input"
              disabled={isPreview}
              rows={1}
            />
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={blocks.map((block) => block.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="blocks-container">
                {blocks.map((block, index) => (
                  <SortableBlock
                    key={block.id}
                    block={block}
                    index={index}
                    activeBlockId={activeBlockId}
                    setActiveBlockId={setActiveBlockId}
                    updateBlock={updateBlock}
                    deleteBlock={deleteBlock}
                    isPreview={isPreview}
                    addBlock={addBlock}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
