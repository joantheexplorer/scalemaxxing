// token types ng ScaleMAXXING
export const Tokens = Object.freeze({
  IDENTIFIER:    'IDENTIFIER',
  KEYWORD:       'KEYWORD',
  DATA_TYPE:     'DATA_TYPE',
  INTEGER_LIT:   'INTEGER_LIT',
  FLOAT_LIT:     'FLOAT_LIT',
  STRING_LIT:    'STRING_LIT',
  CHAR_LIT:      'CHAR_LIT',
  OPERATOR:      'OPERATOR',
  ASSIGN_OP:     'ASSIGN_OP',
  RELATIONAL_OP: 'RELATIONAL_OP',
  LINK_OP:       'LINK_OP',
  DELIMITER:     'DELIMITER',
  INDENT:        'INDENT',
  DEDENT:        'DEDENT',
  ERROR:         'ERROR',
});

// mga keywords ayon sa ScaleMAXXING Proposal spec
export const KEYWORDS = Object.freeze({
  // Unit-aware keywords
  dim:    Tokens.KEYWORD,
  unit:   Tokens.KEYWORD,
  pure:   Tokens.KEYWORD,
  weight: Tokens.KEYWORD,

  // Reactive reserved words
  bind:   Tokens.KEYWORD,
  flow:   Tokens.KEYWORD,
  when:   Tokens.KEYWORD,
  snap:   Tokens.KEYWORD,
  halt:   Tokens.KEYWORD,
  emit:   Tokens.KEYWORD,

  // Python-familiar control flow & I/O (Proposal Pages 18–20)
  if:     Tokens.KEYWORD,
  elif:   Tokens.KEYWORD,
  else:   Tokens.KEYWORD,
  for:    Tokens.KEYWORD,
  while:  Tokens.KEYWORD,
  in:     Tokens.KEYWORD,
  range:  Tokens.KEYWORD,
  print:  Tokens.KEYWORD,
  input:  Tokens.KEYWORD,

  // Values
  True:   Tokens.KEYWORD,
  False:  Tokens.KEYWORD,
  None:   Tokens.KEYWORD,

  // Logical operators
  and:    Tokens.KEYWORD,
  or:     Tokens.KEYWORD,
  not:    Tokens.KEYWORD,
});

// mga standard datatypes sa ScaleMAXXING Proposal
export const DATA_TYPES = Object.freeze({
  int:    Tokens.DATA_TYPE,
  float:  Tokens.DATA_TYPE,
  string: Tokens.DATA_TYPE,
  bool:   Tokens.DATA_TYPE,
  void:   Tokens.DATA_TYPE,
});

// convert verbose noise words pabalik sa shorthand keywords (Proposal Page 10)
export const NOISE_WORDS = Object.freeze({
  dimension: 'dim',
  snapshot:  'snap',
  binding:   'bind',
  whenever:  'when',
});

// helper pang-create ng lexeme object na may line, column, at optional error message
// This is useful for error reporting and debugging during the lexical analysis phase of the compiler or interpreter.
export function createLexeme(token, value, line = 1, col = 1, message = null) {
  const result = { token, value, line, col };
  if (message) {
    result.message = message;
  }
  return result;
}
// For the lexeme table
