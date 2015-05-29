app.factory('SoundCloudEnhancer', function () {
    return function (text, height, width) {
        var regex = /https?:\/\/(?:[0-9A-Z-]+\.)?soundcloud.com\/([a-zA-Z0-9-\/]+)*/gi;
        var dimensions = getDimensionsHtml(height, width);
        var html = '<soundcloud-enhancer ' + dimensions + 
            'track="\'$1\'"></soundcloud-enhancer>';
        return text.replace(regex, html);
    };
});
app.service('GetSoundcloud',function($http){
    this.get = function (url) {
        return $http({
                    method: 'GET',
                    url: 'http://soundcloud.com/oembed?url=http://soundcloud.com/'+url, 
                    withCredentials: false,
                });
            };
});
app.directive('soundcloudEnhancer', function (GetSoundcloud) {
    return {
        restrict: 'E',
        scope: {
            track: '=?'
        },
        link: function (scope, element, attrs) {
            var url = scope.track;
            var createDOM = function(html){
                element[0].innerHTML = html;
                var iframe = element[0].getElementsByTagName('iframe')[0];
                var width = attrs.width ? attrs.width : '100%';
                var height = attrs.height ? attrs.height : 400;
                iframe.setAttribute('width', width);
                iframe.setAttribute('height', height);
            };
            GetSoundcloud.get(url)
            .success(function(data){
                createDOM(data.html);
            });
        }
    };
});