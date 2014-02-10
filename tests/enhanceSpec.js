/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Affero General Public License version 3 or later.
 * See the COPYING file.
 */

 describe('enhanceText', function() {

    var provider;

    beforeEach(module('bernhardposselt.enhancetext', 
        function (enhanceTextFilterProvider) {
            provider = enhanceTextFilterProvider;
        })
    );

    it('should not change a normal string', inject(function($filter) {  
        var filter = $filter('enhanceText');
        expect(filter('This is a test')).toBe('This is a test');
    }));

    it('should replace smilies', inject(function ($filter) {
        provider.setSmilies({
            ':)': '/test/smile.png'
        });
        
        var filter = $filter('enhanceText');
        expect(filter('This is a test :)')).
            toBe('This is a test <img alt=":)" src="/test/smile.png"/>');
    }));

});