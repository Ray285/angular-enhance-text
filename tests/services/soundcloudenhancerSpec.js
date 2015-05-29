/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Lesser General Public License version 3 or later.
 * See the COPYING file.
 */
 describe('SoundCloudEnhancer', function() {

    var enhancer,
        height,
        width;

    beforeEach(module('bernhardposselt.enhancetext')); 

    beforeEach(inject(function(SoundCloudEnhancer,_$compile_,_$rootScope_,_$httpBackend_) {
        enhancer = SoundCloudEnhancer;
        height = 300;
        width = 200;
        $compile = _$compile_;
        $scope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        var data = {
            html: '<iframe width="100%" height="400" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?visual=true&amp;url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F120935385&amp;show_artwork=true"></iframe>'
        };
        $httpBackend.whenGET("http://soundcloud.com/oembed?url=http://soundcloud.com/generation-bass-1/02-flashback-brujjas-feat")
        .respond(200,data);
        
    }));


    it('should embed soundcloud', function () {
        expect(enhancer('hey https://soundcloud.com/generation-bass-1/02-flashback-brujjas-feat ')).
            toBe('hey <soundcloud-enhancer track="\'generation-bass-1/02-flashback-brujjas-feat\'"></soundcloud-enhancer> ');
    });


    it('should replace soundcloud and set height', function () {
        expect(enhancer('hey https://soundcloud.com/generation-bass-1/02-flashback-brujjas-feat ', height)).
            toBe('hey <soundcloud-enhancer height="300" track="\'generation-bass-1/02-flashback-brujjas-feat\'"></soundcloud-enhancer> ');
    });


    it('should replace soundcloud and set width', function () {
        expect(enhancer('hey https://soundcloud.com/generation-bass-1/02-flashback-brujjas-feat ', height, width)).
            toBe('hey <soundcloud-enhancer height="300" width="200" track="\'generation-bass-1/02-flashback-brujjas-feat\'"></soundcloud-enhancer> ');
    });

    it('Replaces the souncloud directive with the player iframe', function() {
        
        var element = angular.element('<soundcloud-enhancer track="\'generation-bass-1/02-flashback-brujjas-feat\'"></soundcloud-enhancer>');
        $compile(element)($scope);
        $httpBackend.flush();
        $scope.$digest();
        expect(element.html()).toContain('<iframe width="100%" height="400" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?visual=true&amp;url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F120935385&amp;show_artwork=true"></iframe>');
    });

    it('Replaces the souncloud directive with the player iframe and height', function() {
        
        var element = angular.element('<soundcloud-enhancer height="100" track="\'generation-bass-1/02-flashback-brujjas-feat\'"></soundcloud-enhancer>');
        $compile(element)($scope);
        $httpBackend.flush();
        $scope.$digest();
        expect(element.html()).toContain('<iframe width="100%" height="100" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?visual=true&amp;url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F120935385&amp;show_artwork=true"></iframe>');
    });

    it('Replaces the souncloud directive with the player iframe height and width', function() {
        
        var element = angular.element('<soundcloud-enhancer width="20%" height="100%" track="\'generation-bass-1/02-flashback-brujjas-feat\'"></soundcloud-enhancer>');
        $compile(element)($scope);
        $httpBackend.flush();
        $scope.$digest();
        expect(element.html()).toContain('<iframe width="20%" height="100%" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?visual=true&amp;url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F120935385&amp;show_artwork=true"></iframe>');
    });
});