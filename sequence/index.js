import Scenarist from '@faddys/scenarist';
import Processor from '@faddys/keyboardist/processor';
import command from '@faddys/keyboardist/command';
import environment from '@faddys/keyboardist/environment';
import { parse } from 'node:path';
import { createHash } from 'node:crypto';

const $$ = Symbol .for;

export const scenario = new class Sequence extends Processor {

url = import .meta .url

async $_director ( $, name, ... steps ) {

if ( steps .length )
return $ ( $$ ( 'score' ), ... steps );

const directory = `${ environment .sequence }/${ name }`;

await command ( `mkdir -p ${ directory }` );

}

score = []

async $_score ( $, ... steps ) {

if ( ! steps .length )
return $ ();

const { score } = this;
const note = steps .shift ();
const key = note [ 0 ];

if ( ! Sequence .scale .includes ( key ) )
throw `Incorrect key ${ key }. A key must be one of ${ Sequence .scale .join ( ', ' ) }`;

const rythm = isNaN ( parseInt ( steps [ 0 ] ) ) ? [ 1 ] : steps .shift () .split ( '/' );

if ( rythm .length > 2 || rythm .filter ( data => ! isNaN ( parseInt ( data ) ) ) .length !== rythm .length )
throw Object .assign ( Error ( `Invalid rythm ${ rythm .join ( '/' ) }` ), { code: -1 } );

//score .push ( `i 13.${ Date .now () } ${ step } ${ 1 } ${ sample }` );

}

static scale = [ 'c', 'd', 'e', 'f', 'g', 'a', 'b' ]

};

export const $ = await Scenarist ( scenario );
