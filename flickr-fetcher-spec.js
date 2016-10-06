//code to test flickr-fetcher.js

'use strict';
const expect = require('chai').expect,
    FlickrFetcher = require('./flickr-fetcher.js');

// describe('FlickrFetcher', function() {
//     it ('should exist', function() {
//         var FlickrFetcher = require('./flickr-fetcher.js');
//         expect(FlickrFetcher).to.not.be.undefined;
//     });
// });

// describe('#photoObjToURL()', function() {
//     it ('should take a photo obj from FLickr and return a string', function() {
//         let input = {
//             id:       '24770505034',
//             owner:    '97248275@N03',
//             secret:   '31a9986429',
//             server:   '1577',
//             farm:     2,
//             title:    '20160229090898',
//             ispublic: 1,
//             isfriend: 0,
//             isfamily: 0
//         };
//         let expected = 'https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg';
//         let actual = FlickrFetcher.photoObjToURL(input);
//         expect(actual).to.eql(expected);
//
//         input = {
//            id:       '24770504484',
//            owner:    '97248275@N03',
//            secret:   '69dd90d5dd',
//            server:   '1451',
//            farm:     2,
//            title:    '20160229090903',
//            ispublic: 1,
//            isfriend: 0,
//            isfamily: 0
//        };
//        expected = 'https://farm2.staticflickr.com/1451/24770504484_69dd90d5dd_b.jpg';
//        actual = FlickrFetcher.photoObjToURL(input);
//        expect(actual).to.eql(expected);
//     });
// });

describe('#transformPhotoObj()', function() {
    it('should take photo obj and return obj with only title and URL', function() {
        let input = {
                id: '25373736106',
                owner: '99117316@N03',
                secret: '146731fcb7',
                server: '1669',
                farm: 2,
                title: 'Dog goes to desperate measure to avoid walking on a leash',
                ispublic: 1,
                isfriend: 0,
                isfamily: 0
            },
            expected = {
                title: 'Dog goes to desperate measure to avoid walking on a leash',
                url: 'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg'
            },
            actual = FlickrFetcher.transformPhotoObj(input);
        expect(actual).to.eql(expected);
    });
});

describe('#fetchFlickrData()', function() {
    it ('should take an API key and fetcher function argument and return a promise for JSON data.',
        function(done) {
            let apiKey = 'does not matter much what this is right now',
                fakeData = {
                    'photos': {
                        'page': 1,
                        'pages': 2872,
                        'perpage': 100,
                        'total': '287170',
                        'photo': [{
                            'id': '24770505034',
                            'owner': '97248275@N03',
                            'secret': '31a9986429',
                            'server': '1577',
                            'farm': 2,
                            'title': '20160229090898',
                            'ispublic': 1,
                            'isfriend': 0,
                            'isfamily': 0
                        }, {
                            'id': '24770504484',
                            'owner': '97248275@N03',
                            'secret': '69dd90d5dd',
                            'server': '1451',
                            'farm': 2,
                            'title': '20160229090903',
                            'ispublic': 1,
                            'isfriend': 0,
                            'isfamily': 0
                        }]
                    }
                },
                fakeFetcher = function(url) {
                    var expectedURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
                        apiKey + '&text=pugs&format=json&nojsoncallback=1'
                    expect(url).to.equal(expectedURL)
                    return Promise.resolve(fakeData);
                };
            FlickrFetcher.fetchFlickrData(apiKey, fakeFetcher).then(function(actual) {
                expect(actual).to.eql(fakeData);
                done();
            });

        });
});
