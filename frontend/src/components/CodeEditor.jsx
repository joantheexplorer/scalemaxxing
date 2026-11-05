import '../styles/style.css';
import styles from '../styles/inlineStyles';

function CodeEditor ({gutterRef, lineCount, textareaRef, sourceCode, handleInputChange, handleScroll, handleKeyDown, handleAnalyze, handleFileUpload, handleClear, isAnalyzed, stats }) {
	return (
		<div>
			<div style={styles.editorContainer}>
        <div ref={gutterRef} style={styles.gutter}>
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} style={styles.gutterLine}>
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          value={sourceCode}
          onChange={handleInputChange}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          placeholder="Type or paste ScaleMAXXING code here, or upload a .txt test file..."
          spellCheck={false}
          style={styles.textarea}
        />
      </div>

      {/* Toolbar Controls */}
      <div style={styles.toolbar}>
        <button onClick={handleAnalyze} style={{ ...styles.button, ...styles.buttonPrimary }}>
          Analyze
        </button>
        <label style={styles.button}>
          Upload .txt
          <input
            type="file"
            accept=".txt,.smx, .xx"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
        <button onClick={handleClear} style={styles.button}>
          Clear
        </button>

        {/* Status indicator */}
        <span style={styles.statusIndicator}>
          {!isAnalyzed && sourceCode.trim().length > 0 && (
            <span style={styles.pendingBadge}>Analysis pending — click Analyze</span>
          )}
          {isAnalyzed && (
            <span style={styles.analyzedBadge}>
              {stats.total} token{stats.total !== 1 ? 's' : ''} emitted
            </span>
          )}
        </span>
      </div>
		</div>
	)
}

export default CodeEditor;