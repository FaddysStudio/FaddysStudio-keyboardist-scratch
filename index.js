#!/usr/bin/env node

import Scenarist from '@faddys/scenarist';
import { argv, cwd } from 'node:process';
import { readdir, mkdir } from 'node:fs/promises';
import { scenario as $sequence } from '@faddys/keyboardist/sequence';
import { scenario as $kit } from '@faddys/keyboardist/kit';

const $$ = Symbol .for;

await Scenarist ( {

async $_producer ( $ ) {

try {

await $ ( ... argv .slice ( 2 ) );

} catch ( error ) {

console .error ( '#keyboardist', '#error', error .message );

}

},

async $init ( $ ) {

const contents = await readdir ( cwd (), { withFileTypes: true } );
const names = contents .map ( ( { name } ) => name );
const index = names .indexOf ( '.keyboardist' );
const initialized = index < 0 ? false : contents [ index ] .isDirectory ();

if ( initialized )
return $ ( $$ ( 'info' ), "Project has already been initialized" ); 

await mkdir ( cwd () + '/.keyboardist' );

return $ ( $$ ( 'info' ), "Project has been initialized successfully" );

},

$sequence,
$kit,

$_info ( $, ... message ) { console .log ( "#keyboardist", "#info", ... message ) }

} );
