
(function(define, global) { 'use strict';
    define(function (require) {



        function Sequence() {

            this._progress = .0;

            this.callback = null;
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

            },

            /*
             *
             */
            dispose : function() {

            }


        }

    });
})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); }, this);