
(function(define, global) {
    'use strict';

    define(function (require) {

        var _ease_none = function( p ){
            return p;
        };

        function Sequence( offset, duration ) {

            this._progress = .0;
            this._offset = offset;
            this._duration = duration;

            this._callbacks = [];
            this._bindings = [];

            this._ease = _ease_none;

        }

        Sequence.prototype = {

            getProgress : function() {
                return this._progress;
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

            },

            ease : function( easeFunc ) {
                this._ease = easeFunc || _ease_none;
                return this;
            },

            // --------
            // Privates
            // --------

            _update : function( progress ) {
                var i, l, p;
                var binding;

                p = ( progress - this._offset ) / this._duration;
                if( p > 1.0 ) p = 1.0;
                else if( p < 0.0 ) p = 0.0;

                p = this._ease( p );

                if( p === this._progress )
                    return;

                this._progress = p;

                for( i=0, l=this._callbacks.length; i<l; i++ ) {
                    this._callbacks[i]( p );
                }
                for( i=0, l=this._bindings.length; i<l; i++ ) {
                    binding = this._bindings[i];
                    binding.target[binding.prop] = p;
                }
            }

        };



        function Tweeks() {
            this._progress = .0;
            this._sequences = [];

            Object.defineProperty(this, "progress", {
                get : function () {
                    return this._progress;
                },
                set : function (p) {
                    this.setProgress( p );
                }
            });
        };

        Tweeks.prototype = {

            setProgress : function( p ) {

                var i, l, seqs;

                if( this._progress === p )
                    return;

                this._progress = p;
                seqs = this._sequences;

                for( i = 0, l = seqs.length; i<l; i++ )
                    seqs[i]._update( p );

            },

            /*
             *
             */
            add : function( offset, duration ) {
                var seq = new Sequence( offset, duration );
                this._sequences.push( seq );
                seq._update( this._progress );
                return seq;
            },


            /*
             *
             */
            map : function( array ) {
                var i, l;
                var res = [];

                for (i = 0, l = array.length; i < l; i+=4) {
                    res.push( this.add( array[i], array[i+1]).bind(array[i+2], array[i+3] ) );
                }
                return res;
            },

            /*
             *
             */
            dispose : function() {
                this._sequences = null;
            }


        };

        return Tweeks;

    });
})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); }, this);