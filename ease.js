/**
 * User: plepers
 * Date: 26/09/13 14:12
 */


(function(define, global) {
    'use strict';

    define(function (require) {


        var Ease = {

            none: function ( k ) {

                    return k;

            },

            inQuad: function ( k ) {

                return k * k;

            },

            outQuad: function ( k ) {

                return k * ( 2 - k );

            },

            inOutQuad: function ( k ) {

                if ( ( k *= 2 ) < 1 ) return 0.5 * k * k;
                return - 0.5 * ( --k * ( k - 2 ) - 1 );

            },


            inCubic: function ( k ) {

                return k * k * k;

            },

            outCubic: function ( k ) {

                return --k * k * k + 1;

            },

            inOutCubic: function ( k ) {

                if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k;
                return 0.5 * ( ( k -= 2 ) * k * k + 2 );

            },


            inQuart: function ( k ) {

                return k * k * k * k;

            },

            outQuart: function ( k ) {

                return 1 - ( --k * k * k * k );

            },

            inOutQuart: function ( k ) {

                if ( ( k *= 2 ) < 1) return 0.5 * k * k * k * k;
                return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );

            },



            inQuint: function ( k ) {

                return k * k * k * k * k;

            },

            outQuint: function ( k ) {

                return --k * k * k * k * k + 1;

            },

            inOutQuint: function ( k ) {

                if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k * k * k;
                return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );

            },



            inSine: function ( k ) {

                return 1 - Math.cos( k * Math.PI / 2 );

            },

            outSine: function ( k ) {

                return Math.sin( k * Math.PI / 2 );

            },

            inOutSine: function ( k ) {

                return 0.5 * ( 1 - Math.cos( Math.PI * k ) );

            },


            inExpo: function ( k ) {

                return k === 0 ? 0 : Math.pow( 1024, k - 1 );

            },

            outExpo: function ( k ) {

                return k === 1 ? 1 : 1 - Math.pow( 2, - 10 * k );

            },

            inOutExpo: function ( k ) {

                if ( k === 0 ) return 0;
                if ( k === 1 ) return 1;
                if ( ( k *= 2 ) < 1 ) return 0.5 * Math.pow( 1024, k - 1 );
                return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );

            },


            inCirc: function ( k ) {

                return 1 - Math.sqrt( 1 - k * k );

            },

            outCirc: function ( k ) {

                return Math.sqrt( 1 - ( --k * k ) );

            },

            inOutCirc: function ( k ) {

                if ( ( k *= 2 ) < 1) return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
                return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);

            },


            inElastic: function ( k ) {

                var s, a = 0.1, p = 0.4;
                if ( k === 0 ) return 0;
                if ( k === 1 ) return 1;
                if ( !a || a < 1 ) { a = 1; s = p / 4; }
                else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
                return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );

            },

            outElastic: function ( k ) {

                var s, a = 0.1, p = 0.4;
                if ( k === 0 ) return 0;
                if ( k === 1 ) return 1;
                if ( !a || a < 1 ) { a = 1; s = p / 4; }
                else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
                return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

            },

            inOutElastic: function ( k ) {

                var s, a = 0.1, p = 0.4;
                if ( k === 0 ) return 0;
                if ( k === 1 ) return 1;
                if ( !a || a < 1 ) { a = 1; s = p / 4; }
                else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
                if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
                return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

            },



            inBack: function ( k ) {

                var s = 1.70158;
                return k * k * ( ( s + 1 ) * k - s );

            },

            outBack: function ( k ) {

                var s = 1.70158;
                return --k * k * ( ( s + 1 ) * k + s ) + 1;

            },

            inOutBack: function ( k ) {

                var s = 1.70158 * 1.525;
                if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
                return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );

            },



            inBounce: function ( k ) {

                return 1 - Ease.outBounce( 1 - k );

            },

            outBounce: function ( k ) {

                if ( k < ( 1 / 2.75 ) ) {

                    return 7.5625 * k * k;

                } else if ( k < ( 2 / 2.75 ) ) {

                    return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;

                } else if ( k < ( 2.5 / 2.75 ) ) {

                    return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;

                } else {

                    return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;

                }

            },

            inOutBounce: function ( k ) {

                if ( k < 0.5 ) return Ease.inBounce( k * 2 ) * 0.5;
                return Ease.outBounce( k * 2 - 1 ) * 0.5 + 0.5;

            }


        };

        return Ease;

    });
})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); }, this);