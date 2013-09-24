/**
 * Created with JetBrains WebStorm.
 * User: plepers
 * Date: 24/09/13
 * Time: 18:29
 * To change this template use File | Settings | File Templates.
 */


var sequencer = new Tweequencer();



var seq = sequencer.sequence( 0.2, 0.4 );

seq.callback = function( p ) {
    foo.progress = p;
}

seq.bind( foo, "progress" );

