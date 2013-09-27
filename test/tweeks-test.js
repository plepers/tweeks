/**
 * User: plepers
 * Date: 25/09/13
 * Time: 16:09
 */
var assert = require("assert");
var sinon = require("sinon");
var Tweeks = require("../tweeks");

describe('Tweeks', function(){


    describe('#constructor', function(){

        it('ctor must be defined', function(){
            Tweeks.should.be.a( 'function' );
        });

        it('ctor must be defined', function(){
            Tweeks.should.be.a( 'function' );
        });
    });


    describe('#prototype', function(){

        it('expose api', function(){
            var tweeks = new Tweeks();
            tweeks.add.should.be.a( 'function' );
            tweeks.dispose.should.be.a( 'function' );
        });
    });


    describe('initial values', function(){

        it('initial progress is 0', function(){
            var tweeks = new Tweeks();
            tweeks.progress.should.be.a( 'number' );
            tweeks.progress.should.equal( 0.0 );
        });

    });



    describe('progress get/set', function(){

        it('progress set/get ok', function(){
            var tweeks = new Tweeks();
            tweeks.progress.should.be.a( 'number' );
            tweeks.progress.should.equal( 0.0 );
            tweeks.progress = 1.0;
            tweeks.progress.should.be.a( 'number' );
            tweeks.progress.should.equal( 1.0 );
            tweeks.progress = .351;
            tweeks.progress.should.be.a( 'number' );
            tweeks.progress.should.equal( .351 );
        });

    });



});

describe('Sequence', function() {

    describe('initial values', function(){

        it("initial progress", function() {
            var tweeks = new Tweeks();
            var s = tweeks.add(0, 1);
            s.getProgress().should.equal( 0 );
            tweeks.progress = .5;
            s.getProgress().should.equal(.5 );
        });

    });

    describe('progress values', function(){

        it( 'just duration', function() {
            var tweeks = new Tweeks();
            var s = tweeks.add(0,.3);
            s.getProgress().should.equal( 0.0 );
            tweeks.progress = 1.0;
            s.getProgress().should.equal( 1.0 );
            tweeks.progress = 0.3;
            s.getProgress().should.equal( 1.0 );
            tweeks.progress = 0.15;
            s.getProgress().should.equal(.6 );
        });


        it( 'and offset', function() {
            var tweeks = new Tweeks();
            var s = tweeks.add(.2,.3);
            s.getProgress().should.equal( 0.0 );
            tweeks.progress = 1.0;
            s.getProgress().should.equal( 1.0 );
            tweeks.progress = 0.2;
            s.getProgress().should.equal( .0 );
            tweeks.progress = 0.5;
            s.getProgress().should.equal( 1.0 );
            tweeks.progress = 0.35;
            s.getProgress().should.be.approximately( .5, 0.00001 );
        });
    });

    describe('callbacks', function(){

        it("are called", function() {

            var cb1 = sinon.spy();
            var cb2 = sinon.spy();
            var cb3 = sinon.spy();

            var tweeks = new Tweeks();
            var s = tweeks.add(0, 1);
            s.bind( cb1 );
            s.bind( cb2 );

            cb1.calledOnce.should.be.true;
            cb2.calledOnce.should.be.true;
            cb1.calledWithExactly( 0.0 ).should.be.true;

            tweeks.progress = .5;
            s.bind( cb3 );

            cb1.calledTwice.should.be.true;
            cb2.calledOnce.should.be.false;
            cb3.calledOnce.should.be.true;

            cb3.calledWithExactly( 0.5).should.be.true;

        });


        it("never called with same value", function() {

            var cb1 = sinon.spy();
            var tweeks = new Tweeks();
            tweeks.progress = .6;
            var s = tweeks.add(0,.5);
            s.bind( cb1 );

            cb1.calledOnce.should.be.true;
            cb1.calledWithExactly( 1.0 ).should.be.true;

            tweeks.progress = .7;
            tweeks.progress = .8;
            tweeks.progress = .6;
            cb1.calledOnce.should.be.true;

        });

    });


    describe('bindings', function(){

        it("are called", function() {

            var obj1 = {bar:.5};
            var obj2 = {bar:.5};
            var obj3 = {bar:.5};

            var tweeks = new Tweeks();
            var s = tweeks.add(0, 1);
            s.bind( obj1, 'bar' );
            s.bind( obj2, 'bar' );

            obj1.bar.should.equal( 0.0 );
            obj2.bar.should.equal( 0.0 );

            tweeks.progress = .5;
            s.bind( obj3, 'bar' );

            obj3.bar.should.equal( .5 );
            obj1.bar.should.equal( .5 );
            obj2.bar.should.equal( .5 );


        });

    });

});
