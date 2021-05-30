const axios = require('axios');

let videoCount = 1;
let channleId = 'UCuiM9mzDJi1_R15rHepZyGg'

async function getList(pNextPageToken = '') {
    let data = [];
    if (pNextPageToken !== '') {
        data = await axios.get('https://www.googleapis.com/youtube/v3/search?order=' +
            `date&part=snippet&channelId=${channleId}` +
            `&maxResults=${videoCount}&key=AIzaSyCPbYILKYI5whU_AkHcNuFqmppYr6dsKW8` +
            '&pageToken=' + pNextPageToken).then(resp => {
            return resp.data;
        });
    } else {
        data = await axios.get('https://www.googleapis.com/youtube/v3/search?order=' +
            'date&part=snippet&channelId=UCuiM9mzDJi1_R15rHepZyGg' +
            `&maxResults=${videoCount}&key=AIzaSyCPbYILKYI5whU_AkHcNuFqmppYr6dsKW8`
        ).then(resp => {
            return resp.data;
        });
    }
    return data;
}

function makeList(items) {
    let newResults = []
    items.map(item => {
        let itemOne = {
            videoId: item.id.videoId,
            title: item.snippet.title,
            thumbnails: item.snippet.thumbnails.high,
            channleId: channleId,
        }
        newResults.push(
            itemOne
        )
    })

    return newResults;
}

async function main() {
    let result = await getList();

    console.log("result-===>", makeList(result.items));

    let lastIndex = result.pageInfo.totalResults / 50
    for (let i = 0; i < Math.floor(lastIndex); i++) {
        result = await getList(result.nextPageToken);
    }
}


main();

//CDIQAA
//CDIQAA
