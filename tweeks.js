
(function(define, global) {
    'use strict';
    define(function (require) {



        function Sequence( offset, duration ) {

            this._progress = .0;
            this._offset = offset;
            this._duration = duration;

            this._callbacks = [];
            this._bindings = [];

        }

        Sequence.prototype = {

            _update : function( progress ) {
                var i, l, p;
                var binding;

                this._progress = p = progress * this._duration + this._offset;

                for( i=0, l=this._callbacks.length; i<l; i++ ) {
                    this._callbacks[i]( p );
                }
                for( i=0, l=this._bindings.length; i<l; i++ ) {
                    binding = this._bindings[i];
                    binding.target[binding.prop] = p;
                }
            },

            bind : function( target, prop ) {
                if( typeof target === 'function' ) {
                    this._callbacks.push( target );
                    target( this._progress );
                } else if( typeof prop !== 'undefined' ){
                    this._bindings.push( {
                        target:target,
                        prop:prop
                    } );
                    target[prop] = this._progress;
                } else
                    throw new TypeError();

            }

        }



        function Tweeks() {
            this._progress = .0;
            this._sequences = [];

            Object.defineProperty(this, "progress", {
                get : function () {
                    return this._progress;
                },
                set : function (p) {
                    this._setProgress( p );
                }
            });
        }

        Tweeks.prototype = {

            _setProgress : function( p ) {

                var i, l;

                if( this._progress === p )
                    return;

                this._progress = p;

                for( i = 0, l = this._sequences.length; i<l; i++ )
                    seq._update( p );

            },

            /*
             *
             */
            add : function( offset, duration ) {
                var seq = new Sequence( offset, duration );
                this._sequences.push( seq );
                seq._update( this._progress );
            },

            /*
             *
             */
            dispose : function() {

            }


        }

    });
})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); }, this);