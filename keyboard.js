import { spawn } from 'node:child_process';
import { stdin as input } from 'node:process';

const $$ = Symbol .for;

export default class Keyboard extends Array {

constructor ( { maqam, reference = 60, key = 0 } ) {

super ();

const keyboard = this;

Object .assign ( keyboard, {

maqam,
reference: parseFloat ( reference ) || 60,
key: ( key = parseInt ( key ) ) >= 0 && key < 10 ? key : 0,
path: 0,
engine: spawn ( 'csound', [ '-Lstdin', 'index.csd' ] )

} );

keyboard .engine .stderr .pipe ( process .stderr );

if ( keyboard .key < 9 )
keyboard .push ();

keyboard .key = key;
keyboard .path = 0;

if ( keyboard .key > 0 ) {

keyboard .shift ();
keyboard .reference = reference;
keyboard .unshift ();

}

}

delay = 500

$_producer ( $ ) {

const keyboard = this;
const release = () => delete keyboard .status;

for ( let index = 0; index < keyboard .length; index++ )
Object .defineProperty ( keyboard, '$' + index, {

configurable: true,
get () {

[ 1, 2 ] .forEach ( channel => keyboard .score (

`i ${ channel }.1 0 ${1/32} ${ keyboard [ index ] } 127 ${1/64} ${1/64} ${1}`,
`i ${ channel }.2 0 ${1/2} ${ keyboard [ index ] - 12 } 100 ${1/64} ${1/64} ${1/32}`,
`i ${ channel }.3 0 ${1/2} ${ keyboard [ index ] - 36 } 127 ${1/64} ${1/64} ${1/32}`

) );

if ( ! keyboard .status )
return keyboard .status = setTimeout ( release, keyboard .delay );

keyboard .status .refresh ();

}

} );

}

push () {

const keyboard = this;

if ( keyboard .key > 9 )
return keyboard .length;

super .push ( keyboard .reference );

const { maqam } = keyboard;

keyboard .key++;
keyboard .path++;

keyboard .reference += maqam [ ( keyboard .path - 1 ) % maqam .length ] .length;

return keyboard .push ();

}

unshift () {

const keyboard = this;

if ( keyboard .key < 0 )
return keyboard .length;

super .unshift ( keyboard .reference );

const { maqam } = keyboard;

keyboard .key--;
keyboard .path++;

keyboard .reference -= maqam [ maqam .length - ( ( keyboard .path % maqam .length ) || maqam .length ) ] .length;

return keyboard .unshift ();

}


score ( ... statements ) {

this .engine .stdin .write ( statements .join ( '\n' ) + '\n' );

}

[ '$\x03' ] () {

input .destroy ();

this .engine .kill ();

console .error ( 'Yallah, bye bye!' );

}

};
