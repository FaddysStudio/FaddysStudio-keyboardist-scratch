export default class Sequence extends Array {

$steps ( $, length = 16 ) {

this .length = length;

}

$_score () {

const sequence = this;

sequence
.filter ( step => step instanceof Step )
.map ( step => `i 1.${ Date .now () } ${ index } ${ step .duration } ${ step .sample }` );

}

};
