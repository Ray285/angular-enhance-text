/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Lesser General Public License version 3 or later.
 * See the COPYING file.
 */

 describe('SmileyEnhancer', function() {

    var smileyEnhancer,
        options;

    beforeEach(module('bernhardposselt.enhancetext'));

    beforeEach(inject(function(SmileyEnhancer) {
        smileyEnhancer = SmileyEnhancer;
        options = {
            ':)': '/test/smile.png',
            ';)': '/test/smile1.png'
        };
    }));

    it('should replace smilies', function() {
        expect(smileyEnhancer('This is a test :) hehe', options)).
            toBe('This is a test <img alt=":)" src="/test/smile.png"/> hehe');
    });


    it('should not replace smilies inside words', function() {
        expect(smileyEnhancer('This is a test s:)', options)).
            toBe('This is a test s:)');
    });


    it('should replace smilies if text is only the smiley', function() {
        expect(smileyEnhancer(':)', options)).
            toBe('<img alt=":)" src="/test/smile.png"/>');
    });


    it('should replace smilies at the end of the text', function() {
        expect(smileyEnhancer('hey :)', options)).
            toBe('hey <img alt=":)" src="/test/smile.png"/>');
    });


    it('should replace smilies at the start of a new line', function() {
        expect(smileyEnhancer('hey \n:)', options)).
            toBe('hey \n<img alt=":)" src="/test/smile.png"/>');
    });


    it('should replace smilies at the start of a new line and more', function() {
        expect(smileyEnhancer('hey \n:) sup', options)).
            toBe('hey \n<img alt=":)" src="/test/smile.png"/> sup');
    });


    it('should replace smilies between new lines', function() {
        expect(smileyEnhancer('hey \n:)\n ', options)).
            toBe('hey \n<img alt=":)" src="/test/smile.png"/>\n ');
    });


    it('should replace smilies before a newline', function() {
        expect(smileyEnhancer('hey :)\nsome more', options)).
            toBe('hey <img alt=":)" src="/test/smile.png"/>\nsome more');
    });

    it('should replace 2 smilies seperated with a newline', function() {
        expect(smileyEnhancer(':)\n:)', options)).
            toBe('<img alt=":)" src="/test/smile.png"/>\n' +
                 '<img alt=":)" src="/test/smile.png"/>');
    });

    it('should replace 2 smilies on same line', function() {
        expect(smileyEnhancer(':) ;)', options)).
            toBe('<img alt=":)" src="/test/smile.png"/> ' +
            '<img alt=";)" src="/test/smile1.png"/>');
    });


    it('should replace 5 smilies', function () {
        expect(smileyEnhancer(':)\n:)\n:)\n:)\n:)', options)).
            toBe('<img alt=":)" src="/test/smile.png"/>\n' +
            '<img alt=":)" src="/test/smile.png"/>\n' +
            '<img alt=":)" src="/test/smile.png"/>\n' +
            '<img alt=":)" src="/test/smile.png"/>\n' +
            '<img alt=":)" src="/test/smile.png"/>');
    });


 });