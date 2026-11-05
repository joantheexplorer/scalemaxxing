import '../styles/style.css';
import styles from '../styles/inlineStyles';

function ResultsTable({
  isAnalyzed,
  sourceCode,
  handleAnalyze,
  lexemes,
  filteredLexemes,
  selectedFilter,
  getTokenColor,
  getTokenCategory,
}) {
  return (
    <>
      <div style={styles.resultsContainer}>
        {!isAnalyzed ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyTitle}>
              {sourceCode.trim().length > 0
                ? 'Code entered in editor.'
                : 'No code in editor.'}
            </p>
            <p style={styles.emptySubtitle}>
              {sourceCode.trim().length > 0
                ? 'Click the "Analyze" button above (or press Ctrl+Enter) to generate the token table.'
                : 'Type code, load the sample code, or upload a .txt file, then click Analyze.'}
            </p>
            {sourceCode.trim().length > 0 && (
              <button
                onClick={handleAnalyze}
                style={{ ...styles.button, ...styles.buttonPrimary, marginTop: '12px' }}
              >
                Analyze Now
              </button>
            )}
          </div>
        ) : lexemes.length === 0 ? (
          <p style={styles.muted}>No tokens produced (input was blank or comments only).</p>
        ) : filteredLexemes.length === 0 ? (
          <div style={styles.emptyState}>
            {selectedFilter === 'error' ? (
              <p style={{ color: '#6fd9a0', fontWeight: 600 }}>
                No lexical errors found. All tokens are valid ScaleMAXXING syntax!
              </p>
            ) : (
              <p style={styles.muted}>No tokens found for category: {selectedFilter}</p>
            )}
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.th, width: '40px' }}>#</th>
                <th style={{ ...styles.th, width: '60px' }}>Line</th>
                <th style={{ ...styles.th, width: '60px' }}>Col</th>
                <th style={styles.th}>Lexeme</th>
                <th style={styles.th}>Token</th>
                <th style={styles.th}>Category</th>
              </tr>
            </thead>
            <tbody>
              {filteredLexemes.map((lex, i) => (
                <tr key={i} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                  <td style={{ ...styles.td, color: '#9a9890', textAlign: 'center' }}>{i + 1}</td>
                  <td style={{ ...styles.td, color: '#9a9890', textAlign: 'center' }}>{lex.line}</td>
                  <td style={{ ...styles.td, color: '#9a9890', textAlign: 'center' }}>{lex.col}</td>
                  <td style={{ ...styles.td, ...styles.lexemeCell }} title={lex.message || ''}>
                    {lex.value}
                    {lex.message && (
                      <div
                        style={{
                          fontSize: '0.74rem',
                          color: '#ff8a7a',
                          marginTop: '2px',
                          fontWeight: 'normal',
                          fontStyle: 'italic',
                        }}
                      >
                        {lex.message}
                      </div>
                    )}
                  </td>
                  <td style={{ ...styles.td, color: getTokenColor(lex.token) }}>{lex.token}</td>
                  <td style={{ ...styles.td, ...styles.categoryCell }}>
                    <span
                      style={{
                        ...styles.badge,
                        backgroundColor: getTokenColor(lex.token) + '20',
                        color: getTokenColor(lex.token),
                      }}
                    >
                      {getTokenCategory(lex.token)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default ResultsTable;
