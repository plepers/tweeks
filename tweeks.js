
(function(define, global) { 'use strict';
    define(function (require) {



        function Sequence() {

            this._progress = .0;
            this._offset = .0;
            this._duration = .0;

            this._callbacks = [];
            this._bindings = [];
        }

        Sequence.prototype = {

            _update : function( p ) {
                this._progress = p * this._duration + this._offset;
            },

            bind : function( target, prop ) {
                if( typeof target === 'function' )
                    this._callbacks.push( target );
                else if( typeof prop !== 'undefined' )
                    this._bindings.push( {
                        target:target,
                        prop:prop
                    } );
                else
                    throw new TypeError();

            }

        }



        function Tweeks() {
            this._progress = .0;
            this._sequences = [];
        }

        Tweeks.prototype = {

            /*
             *
             */
            add : function( start, end ) {
                var seq = new Sequence( start, end );
                this._sequences.push( seq );
            },

            /*
             *
             */
            dispose : function() {

            }


        }

    });
})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); }, this);