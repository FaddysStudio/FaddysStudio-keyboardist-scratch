import Scenarist from '@faddys/scenarist';
import { spawn} from 'node:child_process';
import { createInterface, Interface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

export default async ( ... command ) => ( ( await $ ( ... command ) ) .resolution );

const $ = await Scenarist ( {

$_producer ( $ ) {

if ( process .argv [ 1 ] !== new URL ( import .meta .url ) .pathname )
return;

this .interactive = true;

const line = process .argv .slice ( 2 );

if ( line .length )
return $ ( ... line );

(

this .interface = createInterface ( { input, output } )
.on ( 'line', line => $ ( line ) )
.on ( 'error', error => console .error ( error .message ) )

) .prompt ();

for ( const signal of [ 'SIGINT' ] )
process .on ( signal, () => this .command .kill ( signal ) );

},

$_director ( $, ... line ) {

return new Promise ( async ( resolution, rejection ) => {

this .command = spawn( 'bash', [ '-c', line .join ( ' ' ), "Faddy's Command" ] )
.on ( 'error', error => rejection ( 'Bad command' ) )
.on ( 'spawn', () => this .read () )
.on ( 'exit', async () => {

resolution ( this .command );

if ( this .interface )
this .interface .prompt ();

} );

} );

},

read () {

const { command } = this;
command .output = [];
command .error = [];

createInterface ( { input: command .stdout } )
.on ( 'line', line => {

command .output .push ( line );

if ( this .interactive )
console .log ( line );

} );

createInterface ( { input: command .stderr } )
.on ( 'line', line => {

command .error .push ( line );

if ( this .interactive )
console .error ( line );

} );

}

} );
