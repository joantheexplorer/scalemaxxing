// token types ng ScaleMAXXING
export const Tokens = Object.freeze({
  IDENTIFIER:    'IDENTIFIER',
  KEYWORD:       'KEYWORD',
  DATA_TYPE:     'DATA_TYPE',
  INTEGER_LIT:   'INTEGER_LIT',
  FLOAT_LIT:     'FLOAT_LIT',
  STRING_LIT:    'STRING_LIT',
  CHAR_LIT:      'CHAR_LIT',
  DELIMITER:     'DELIMITER',
  INDENT:        'INDENT',
  DEDENT:        'DEDENT',
  ERROR:         'ERROR',

  // Generic operator tokens (backward compatibility)
  OPERATOR:      'OPERATOR',
  ASSIGN_OP:     'ASSIGN_OP',
  RELATIONAL_OP: 'RELATIONAL_OP',
  LINK_OP:       'LINK_OP',

  // Specific Arithmetic Operators
  PLUS_OPERATOR:                  'PLUS_OPERATOR',
  MINUS_OPERATOR:                 'MINUS_OPERATOR',
  MULTIPLICATION_OPERATOR:        'MULTIPLICATION_OPERATOR',
  DIVISION_OPERATOR:              'DIVISION_OPERATOR',
  MODULO_OPERATOR:                'MODULO_OPERATOR',
  EXPONENTIATION_OPERATOR:        'EXPONENTIATION_OPERATOR',
  FLOOR_DIV_OPERATOR:             'FLOOR_DIV_OPERATOR',
  POWER_OPERATOR:                 'POWER_OPERATOR',

  // Specific Unary / Increment & Decrement Operators
  INCREMENT_OPERATOR:             'INCREMENT_OPERATOR',
  DECREMENT_OPERATOR:             'DECREMENT_OPERATOR',

  // Specific Assignment Operators
  ASSIGNMENT_OPERATOR:            'ASSIGNMENT_OPERATOR',
  ADD_ASSIGN_OPERATOR:            'ADD_ASSIGN_OPERATOR',
  SUB_ASSIGN_OPERATOR:            'SUB_ASSIGN_OPERATOR',
  MULT_ASSIGN_OPERATOR:           'MULT_ASSIGN_OPERATOR',
  DIV_ASSIGN_OPERATOR:            'DIV_ASSIGN_OPERATOR',
  MOD_ASSIGN_OPERATOR:            'MOD_ASSIGN_OPERATOR',
  EXP_ASSIGN_OPERATOR:            'EXP_ASSIGN_OPERATOR',
  FLOOR_DIV_ASSIGN_OPERATOR:      'FLOOR_DIV_ASSIGN_OPERATOR',

  // Specific Relational Operators
  EQUAL_OPERATOR:                 'EQUAL_OPERATOR',
  NOT_EQUAL_OPERATOR:             'NOT_EQUAL_OPERATOR',
  LESS_THAN_OPERATOR:             'LESS_THAN_OPERATOR',
  GREATER_THAN_OPERATOR:          'GREATER_THAN_OPERATOR',
  LESS_THAN_OR_EQUAL_OPERATOR:    'LESS_THAN_OR_EQUAL_OPERATOR',
  GREATER_THAN_OR_EQUAL_OPERATOR: 'GREATER_THAN_OR_EQUAL_OPERATOR',

  // Specific Language-Specific Link Operators
  BIDIRECTIONAL_LINK_OPERATOR:    'BIDIRECTIONAL_LINK_OPERATOR',
  FLOW_LINK_OPERATOR:             'FLOW_LINK_OPERATOR',
  NOT_OPERATOR:                   'NOT_OPERATOR',

  // Lowercase convenience aliases
  plus_operator:                  'PLUS_OPERATOR',
  increment_operator:             'INCREMENT_OPERATOR',
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
export function createLexeme(token, value, line = 1, col = 1, message = null) {
  const result = { token, value, line, col };
  if (message) {
    result.message = message;
  }
  return result;
}
