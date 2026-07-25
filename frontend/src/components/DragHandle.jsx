const DragHandle = ({ isDragging }) => {
  return (
    <div className={`drag-handle ${isDragging ? 'dragging' : ''}`}>
      <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
        <circle cx="8" cy="2" r="1.5" fill="currentColor" />
        <circle cx="2" cy="8" r="1.5" fill="currentColor" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
        <circle cx="2" cy="14" r="1.5" fill="currentColor" />
        <circle cx="8" cy="14" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
};

export default DragHandle;