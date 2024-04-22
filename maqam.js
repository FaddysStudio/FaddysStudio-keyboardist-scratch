export default class Maqam extends Array {

constructor ( ... steps ) {

super ();

this .path = 0;

this .push ( ... steps );

}

push ( ... steps ) {

const maqam = this;

if ( ! steps .length )
return maqam .length;

const step = parseFloat ( steps .shift () );

if ( isNaN ( step ) )
throw TypeError ( `The value (${ step }) provided to step #${ maqam .length } is not a number.` );

maqam .path += step;

super .push ( {

index: maqam .length,
path: maqam .path,
get position () { return this .path * 12 / maqam .path },
get length () { return this .position - ( maqam [ this .index - 1 ] ?.position || 0 ) }

} );

return maqam .push ( ... steps );

}

};
