import Scenarist from '@faddys/scenarist';
import command from '@faddys/command';
import maqam from './faddys.js';
import Staff from './staff.js';

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

const { resolution } = await $ ( sequence );

console .log ( resolution );

} catch ( _ ) {}

}

[ '$\x03' ] () {

input .destroy ();

return 'Yallah, bye bye!';

}

$_director = new Staff ( { maqam } )

clef = {

treble: [ 'E', 4 ],
alto: [ 'F', 3 ],
tenor: [ 'D', 3 ],
bass: [ 'G', 2 ]

}

} );
