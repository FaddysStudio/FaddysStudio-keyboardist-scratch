import Scenarist from '@faddys/scenarist';
import command from '@faddys/command';
import Keyboard from './keyboard.js';

import { createInterface, emitKeypressEvents } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

export default await Scenarist ( new class Sequencer extends Keyboard {

$_producer ( $ ) {

input .setRawMode ( true );

emitKeypressEvents ( input );

this .processor = $;

input .on ( 'keypress', async ( _, { sequence } ) => {

try {

const { resolution } = await this .processor ( sequence );

console .log ( resolution );

} catch ( _ ) {}

} );

process .on ( 'exit', code => console .log ( '#exit', code ) );

}

$_director ( $, key ) {

if ( isNaN ( key = parseInt ( key ) ) || key < 1 || key > 9 )
throw -1;

return 'i "synthesizer" 0 1 ${ this .staff [ key ] } 100';

}

clef = {

treble: [ 'E', 4 ],
alto: [ 'F', 3 ],
tenor: [ 'D', 3 ],
bass: [ 'G', 2 ]

}

$q () { process .exit () }

} );
