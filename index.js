import Scenarist from '@faddys/scenarist';
import command from '@faddys/command';
import maqam from './faddys.js';
import Keyboard from './keyboard.js';

import { createInterface, emitKeypressEvents } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const $$ = Symbol .for;

export default await Scenarist ( new class Sequencer {

$_producer ( $ ) {

input .setRawMode ( true );

emitKeypressEvents ( input );

input .on ( 'keypress', ( _, { sequence } ) => $ ( $$ ( 'processor' ), sequence ) );

process .on ( 'exit', code => console .log ( '#exit', code ) );

}

async $_processor ( $, sequence ) {

try {

await $ ( sequence );

} catch ( _ ) {
console .error ( _ );

}

}

$_director = new Keyboard ( { maqam } )

} );
