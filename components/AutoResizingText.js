import React, { useEffect, useRef, useState } from 'react';

const AutoResizingText = ({ htmlContent }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(60); // Initial max font size

  useEffect(() => {
    const resizeText = () => {
      const container = containerRef.current;
      const textEl = textRef.current;
      if (!container || !textEl) return;

      let currentFontSize = 60;
      textEl.style.fontSize = `${currentFontSize}px`;

      while (
        (textEl.scrollHeight > container.clientHeight ||
          textEl.scrollWidth > container.clientWidth) &&
        currentFontSize > 10
      ) {
        currentFontSize -= 1;
        textEl.style.fontSize = `${currentFontSize}px`;
      }

      setFontSize(currentFontSize);
    };

    resizeText();

    const observer = new ResizeObserver(resizeText);
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [htmlContent]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100px',
        overflow: 'hidden',
      }}
    >
      <div
        ref={textRef}
        style={{ fontSize: `${fontSize}px`, lineHeight: '1.2' }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default AutoResizingText;
