//module that fetches the data and transforms it
'use strict';

let FlickrFetcher = {

    transformPhotoObj: function(photoObj) {
        return {
            title: photoObj.title,
            url: ['https://farm',
            photoObj.farm,
            '.staticflickr.com/',
            photoObj.server,
            '/',
            photoObj.id,
            '_',
            photoObj.secret,
            '_b.jpg'
            ].join('')
        }
    },
    fetchFlickrData: function(apiKey, fetch) {
        
    }
}

module.exports = FlickrFetcher;
