import Scenarist from '@faddys/scenarist';
import Processor from '@faddys/keyboardist/processor';

export const scenario = new class Staff extends Processor {

url = import .meta .url

tempo = 120

$tempo ( $, value ) {

if ( isNaN ( parseFloat ( value ) ) )
throw Object .assign ( Error ( `The provided tempo (${ value }) is not a number` ), {

code: ( process .exitCode = -1 )

} );

this .tempo = parseFloat ( value );

}

};

export const $ = await Scenarist ( scenario );
