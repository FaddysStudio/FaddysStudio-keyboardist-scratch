import Scenarist from '@faddys/scenarist';
import { spawn} from 'node:child_process';
import { createInterface, Interface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

export default await Scenarist ( {

$_producer ( $ ) {

if ( process .argv [ 1 ] !== new URL ( import .meta .url ) .pathname )
return;

this .interactive = true;

const line = process .argv .slice ( 2 );

if ( line .length )
return $ ( ... line );

(

this .interface = createInterface ( { input, output } )
.on ( 'line', line => $ ( ... line .trim () .split ( /\s+/ ) ) )
.on ( 'error', error => console .error ( error .message ) )

) .prompt ();

},

async $_director ( $, ... line ) {

const command = await new Promise ( async ( resolution, rejection ) => {

this .command = spawn( 'bash', [ '-c', ... line ] )
.on ( 'error', error => rejection ( 'Bad command' ) );

resolution ( await this .read () );

} );

if ( this .interactive )
this .print ();

if ( typeof this ?.interface ?.prompt === 'function' )
this .interface .prompt ();

},

async read () {

const { command } = this;
command .output = [];
command .error = [];

for await ( const line of createInterface ( { input: command .stdout } ) )
command .output .push ( line );

for await ( const line of createInterface ( { input: command .stderr } ) )
command .error .push ( line );

return this .command;

},

print () {

const { command } = this;

if ( command .output .length ) {

console .log ( `#output ${ command .output .length } line${ command .output .length === 1 ? '' : 's' }` );
command .output .forEach ( line => console .log ( line ) );

}

if ( command .error .length ) {

console .error ( `#error ${ command .error .length } line${ command .error .length === 1 ? '' : 's' }` );
command .error .forEach ( line => console .error ( line ) );

}

}

} );
