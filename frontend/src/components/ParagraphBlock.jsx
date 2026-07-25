import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { Trash, Code } from 'lucide-react';
import '../styles/paragraphBlock.css'
const lowlight = createLowlight(common);
import { useEffect } from 'react';

const ParagraphBlock = ({ block, isActive, onActivate, onUpdate, onDelete, isPreview }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: block.content || '',
    editable: !isPreview && isActive,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onUpdate(block.id, { content: json });
    },
    editorProps: {
      attributes: {
        class: 'paragraph-editor'
      }
    }
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(!isPreview && isActive);
      if (isActive && !isPreview) {
        editor.commands.focus();
      }
    }
  }, [isActive, isPreview, editor]);

  useEffect(() => {
    if (editor && block.content) {
      editor.commands.setContent(block.content);
    }
  }, []);

  const handleClick = () => {
    if (!isPreview && !isActive) {
      onActivate(block.id);
    }
  };

  // ── PREVIEW MODE: just the content, zero editing chrome ──
  if (isPreview) {
    return (
      <div className="paragraph-block">
        <EditorContent editor={editor} />
      </div>
    );
  }

  // ── EDIT MODE: full editing UI ──
  return (
    <div
      className={`paragraph-block ${isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      {isActive && (
        <div className="editor-toolbar-inline">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor?.isActive('bold') ? 'active' : ''}
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor?.isActive('italic') ? 'active' : ''}
          >
            I
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor?.isActive('heading', { level: 2 }) ? 'active' : ''}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor?.isActive('heading', { level: 3 }) ? 'active' : ''}
          >
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor?.isActive('bulletList') ? 'active' : ''}
          >
            •
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor?.isActive('orderedList') ? 'active' : ''}
          >
            1.
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor?.isActive('codeBlock') ? 'active' : ''}
            title="Code block"
          >
            <Code className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(block.id)}
            className="delete-btn"
          >
            <Trash className="h-5" />
          </button>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  );
};

export default ParagraphBlock;