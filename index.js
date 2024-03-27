#!/usr/bin/env node

import Scenarist from '@faddys/scenarist';
import { createInterface, emitKeypressEvents } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { writeFile } from 'node:fs/promises';

const $$ = Symbol .for;

await Scenarist ( {

$_producer ( $ ) {

const args = process .argv .slice ( 2 );

if ( ! args .length )
$ ( $$ ( 'display' ) );

else
$ ( $$ ( 'process' ), ... args );

},

$_display ( $ ) {

createInterface ( { input, output, prompt: '' } )
.on ( 'line', async line => await $ ( ... line .trim () .split ( /\s+/ ) ) )
.on ( 'error', error => console .error ( error .message ) )
.on ( 'close', () => console .log ( "la howlla wala quowa ela belah" ) );

},

$_process ( $, response, ... prompt ) {

createInterface ( {

input, output,
prompt: prompt .join ( ' ' ) + ': '

} )
.once (

'line',
async function handle ( line ) {

await writeFile ( response || `k-response_${ Date .now () }`, line, 'utf8' );

this .close ();

}

) .prompt ();

}

} );
