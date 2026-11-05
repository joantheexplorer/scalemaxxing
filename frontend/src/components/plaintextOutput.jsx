import '../styles/style.css';
import styles from '../styles/inlineStyles'

function PlaintextOutput({isAnalyzed, lexemes, filteredLexemes, selectedFilter, handleCopy, copyMessage }) {
	return (
		<>
			{isAnalyzed && lexemes.length > 0 && (
        <details style={styles.details}>
          <summary style={styles.summary}>
            Plain Text Output ({filteredLexemes.length}{' '}
            {selectedFilter !== 'all' ? `filtered ${selectedFilter}` : ''} token
            {filteredLexemes.length !== 1 ? 's' : ''})
          </summary>
          <div style={styles.plainActions}>
            <button onClick={handleCopy} style={styles.button}>
              Copy Plain Text
            </button>
            {copyMessage && <span style={styles.copyMsg}>{copyMessage}</span>}
          </div>
          <pre style={styles.pre}>
            {filteredLexemes
              .map(
                (lex) =>
                  `${String(lex.value).padEnd(20)} : ${lex.token.padEnd(15)} [Line ${lex.line}, Col ${lex.col}]`
              )
              .join('\n')}
          </pre>
        </details>
      )}
		</>
	)
}

export default PlaintextOutput;
