import '../styles/style.css';
import styles from '../styles/inlineStyles'

function TokenBreakdown({isAnalyzed, lexemes, stats, selectedFilter, setSelectedFilter}) {
	return (
		<>
			{isAnalyzed && lexemes.length > 0 && (
        <div style={styles.statsContainer}>
          <div style={styles.statsHeader}>
            <span style={styles.statsTitle}>Token Breakdown & Filter:</span>
            <span style={styles.filterHint}>Click a pill to filter the results table</span>
          </div>
          <div style={styles.pillGroup}>
            <button
              onClick={() => setSelectedFilter('all')}
              style={{
                ...styles.filterPill,
                ...(selectedFilter === 'all' ? styles.filterPillActive : {}),
              }}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setSelectedFilter('keyword')}
              style={{
                ...styles.filterPill,
                ...(selectedFilter === 'keyword' ? styles.filterPillActive : {}),
                color: '#c39bff',
              }}
            >
              Keywords ({stats.keywords})
            </button>
            <button
              onClick={() => setSelectedFilter('identifier')}
              style={{
                ...styles.filterPill,
                ...(selectedFilter === 'identifier' ? styles.filterPillActive : {}),
                color: '#6fd9a0',
              }}
            >
              Identifiers ({stats.identifiers})
            </button>
            <button
              onClick={() => setSelectedFilter('literal')}
              style={{
                ...styles.filterPill,
                ...(selectedFilter === 'literal' ? styles.filterPillActive : {}),
                color: '#8ebcff',
              }}
            >
              Literals ({stats.literals})
            </button>
            <button
              onClick={() => setSelectedFilter('operator')}
              style={{
                ...styles.filterPill,
                ...(selectedFilter === 'operator' ? styles.filterPillActive : {}),
                color: '#ffb072',
              }}
            >
              Operators ({stats.operators})
            </button>
            <button
              onClick={() => setSelectedFilter('delimiter')}
              style={{
                ...styles.filterPill,
                ...(selectedFilter === 'delimiter' ? styles.filterPillActive : {}),
                color: '#aab2c0',
              }}
            >
              Delimiters ({stats.delimiters})
            </button>
            <button
              onClick={() => setSelectedFilter('error')}
              style={{
                ...styles.filterPill,
                ...(selectedFilter === 'error' ? styles.filterPillActive : {}),
                ...(stats.errors > 0 ? styles.filterPillErrorActive : { color: '#ff8a7a' }),
              }}
            >
              Errors ({stats.errors})
            </button>
          </div>
        </div>
      )}
		</>
	)
}

export default TokenBreakdown;
