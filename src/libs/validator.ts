import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
const assert = require( 'assert' );

import { StandardError } from 'src/libs/standard-error';
import { ErrorCodes } from 'src/domain/errors';

const options = Object.freeze( { allErrors: true } );
const ajv = ( new Ajv( { ...options } ) )
ajvErrors(ajv)

export const validateBody = ( body: any, schema: any, dependentSchemas: any[] = [] )=>{

  assert( schema, 'schema must be defined' );

  const validate = ajv.compile( schema );

  if( !validate( body ) ){

    const errors = validate.errors.map( error=>`${ error.message }` );

    throw new StandardError( ErrorCodes.BAD_REQUEST, errors[0] );

  }


};

