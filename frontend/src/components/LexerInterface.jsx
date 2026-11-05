import { useState, useCallback, useMemo, useRef } from 'react';
import { analyze } from '@lexer/analyzer.js';
import { Tokens } from '@lexer/tokens.js';
import '../styles/style.css';
import styles from '../styles/inlineStyles';
import '../styles/fonts.css';

import CodeEditor from './CodeEditor';
import TokenBreakdown from './tokenBreakdown';
import ResultsTable from './resultsTable';
import PlaintextOutput from './plaintextOutput';

import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import logo from '../assets/logo.svg';

// kulay ng bawat token sa table at badges
function getTokenColor(token) {
  if (token && (token.endsWith('_OPERATOR') || token.endsWith('_OP') || token === Tokens.OPERATOR)) {
    return '#ffb072';
  }
  switch (token) {
    case Tokens.KEYWORD:
      return '#c39bff';
    case Tokens.DATA_TYPE:
      return '#ff9ed0';
    case Tokens.IDENTIFIER:
      return '#6fd9a0';
    case Tokens.INTEGER_LIT:
    case Tokens.FLOAT_LIT:
    case Tokens.STRING_LIT:
    case Tokens.CHAR_LIT:
      return '#8ebcff';
    case Tokens.DELIMITER:
      return '#aab2c0';
    case Tokens.INDENT:
    case Tokens.DEDENT:
      return '#38bdf8';
    case Tokens.ERROR:
      return '#ff8a7a';
    default:
      return '#ecebe6';
  }
}

// category para sa table badge at filtering
function getTokenCategory(token) {
  if (token && (token.endsWith('_OPERATOR') || token.endsWith('_OP') || token === Tokens.OPERATOR)) {
    return 'operator';
  }
  switch (token) {
    case Tokens.KEYWORD:
    case Tokens.DATA_TYPE:
      return 'keyword';
    case Tokens.IDENTIFIER:
      return 'identifier';
    case Tokens.INTEGER_LIT:
    case Tokens.FLOAT_LIT:
    case Tokens.STRING_LIT:
    case Tokens.CHAR_LIT:
      return 'literal';
    case Tokens.DELIMITER:
      return 'delimiter';
    case Tokens.INDENT:
    case Tokens.DEDENT:
      return 'indentation';
    case Tokens.ERROR:
      return 'error';
    default:
      return 'unknown';
  }
}

export default function LexerInterface({onAbout, setLightMode, setDarkMode}) {
  const [sourceCode, setSourceCode] = useState('');
  const [lexemes, setLexemes] = useState([]);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [copyMessage, setCopyMessage] = useState('');

  const textareaRef = useRef(null);
  const gutterRef = useRef(null);

  // manual analyze trigger lamang kapag pinindot ang Analyze button o Ctrl+Enter
  const handleAnalyze = useCallback(() => {
    const result = analyze(sourceCode);
    setLexemes(result);
    setIsAnalyzed(true);
  }, [sourceCode]);

  // pag-clear ng editor at pag-reset ng state
  const handleClear = useCallback(() => {
    setSourceCode('');
    setLexemes([]);
    setIsAnalyzed(false);
  }, []);

  // pagbabago sa input: hindi awtomatikong mag-a-analyze
  const handleInputChange = useCallback((e) => {
    setSourceCode(e.target.value);
    setIsAnalyzed(false);
  }, []);

  // file upload: papasok lang ang code sa textarea nang hindi agad nag-aanalyze
  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      setSourceCode(text);
      setIsAnalyzed(false);
    };
    reader.readAsText(file);
    e.target.value = '';
  }, []);

  // synchronized vertical scrolling sa pagitan ng line gutter at textarea
  const handleScroll = useCallback((e) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.target.scrollTop;
    }
  }, []);

  // Ctrl+Enter / Cmd+Enter shortcut pang-analyze
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const textarea = e.currentTarget;
        textarea.setRangeText(
          '\t',
          textarea.selectionStart,
          textarea.selectionEnd,
          'end'
        );
        setSourceCode(textarea.value);
        setIsAnalyzed(false);
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleAnalyze();
      }
    },
    [handleAnalyze]
  );

  // summary statistics ng tokens
  const stats = useMemo(() => {
    let keywords = 0;
    let identifiers = 0;
    let literals = 0;
    let operators = 0;
    let delimiters = 0;
    let errors = 0;

    for (const lex of lexemes) {
      const cat = getTokenCategory(lex.token);
      if (cat === 'keyword') keywords++;
      else if (cat === 'identifier') identifiers++;
      else if (cat === 'literal') literals++;
      else if (cat === 'operator') operators++;
      else if (cat === 'delimiter' || cat === 'indentation') delimiters++;
      else if (cat === 'error') errors++;
    }

    return {
      total: lexemes.length,
      keywords,
      identifiers,
      literals,
      operators,
      delimiters,
      errors,
    };
  }, [lexemes]);

  // filtered tokens base sa napiling category
  const filteredLexemes = useMemo(() => {
    if (selectedFilter === 'all') return lexemes;
    if (selectedFilter === 'error') return lexemes.filter((l) => l.token === Tokens.ERROR);
    return lexemes.filter((l) => {
      const cat = getTokenCategory(l.token);
      return cat === selectedFilter;
    });
  }, [lexemes, selectedFilter]);

  // pag-copy ng plain text output
  const handleCopy = useCallback(async () => {
    const listToCopy = filteredLexemes.length > 0 ? filteredLexemes : lexemes;
    const plainText = listToCopy
      .map(
        (lex) =>
          `${String(lex.value).padEnd(20)} : ${lex.token.padEnd(15)} [Line ${lex.line}, Col ${lex.col}]`
      )
      .join('\n');
    try {
      await navigator.clipboard.writeText(plainText);
      setCopyMessage('Copied!');
    } catch {
      setCopyMessage('Copy failed — select text manually.');
    }
    setTimeout(() => setCopyMessage(''), 2000);
  }, [filteredLexemes, lexemes]);

  // bilang ng linya para sa gutter
  const lineCount = useMemo(() => {
    if (!sourceCode) return 1;
    return sourceCode.split('\n').length;
  }, [sourceCode]);

  return (
    <div style={styles.page} className='lexer-page'>
      {/* Header */}
      <div className='container-flex header-group'>
        <header style={styles.header} className='header-flex'>
          <div><img className='logo' src={logo} alt="Logo"/></div>
          <div>
            <h1 style={styles.title} className='title'>ScaleMAXXING</h1>
            <p style={styles.subtitle}>A unit-aware language by PPL - Group 4</p>
          </div>
        </header>

        <div className='right-settings'>
          <button onClick={onAbout}>About Us</button>
          <div className='header-group container-button'>
            <button className='light' onClick={setLightMode}><MdOutlineLightMode/></button>
            <button className='dark' onClick={setDarkMode}><MdDarkMode /></button>
          </div>
        </div>
      </div>
      
      <div className="container-flex main-container"> 
        {/* Code Editor na may Sticky Synchronized Line Gutter */}
        <CodeEditor 
          gutterRef={gutterRef} 
          lineCount={lineCount}
          textareaRef={textareaRef}
          sourceCode={sourceCode}
          handleInputChange={handleInputChange}
          handleScroll={handleScroll}
          handleKeyDown={handleKeyDown}
          handleAnalyze={handleAnalyze}
          handleFileUpload={handleFileUpload}
          handleClear={handleClear}
          isAnalyzed={isAnalyzed}
          stats={stats}
        />
        
        <div>
          {/* Token Statistics Badges at Real-Time Filter Pills */}
          <TokenBreakdown
            isAnalyzed={isAnalyzed}
            lexemes={lexemes}
            stats={stats}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />

          {/* Results Table Area */}
          <ResultsTable
            isAnalyzed={isAnalyzed}
            sourceCode={sourceCode}
            handleAnalyze={handleAnalyze}
            lexemes={lexemes}
            filteredLexemes={filteredLexemes}
            selectedFilter={selectedFilter}
            getTokenColor={getTokenColor}
            getTokenCategory={getTokenCategory}
          />

          {/* Plain Text Output Drawer */}
          <PlaintextOutput
            isAnalyzed={isAnalyzed}
            lexemes={lexemes}
            filteredLexemes={filteredLexemes}
            selectedFilter={selectedFilter}
            handleCopy={handleCopy}
            copyMessage={copyMessage}
          />
        </div>
      </div>
    </div>
  );
}