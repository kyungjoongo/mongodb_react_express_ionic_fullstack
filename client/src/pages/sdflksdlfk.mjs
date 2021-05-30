import cheerio from "cheerio";
import _ from 'lodash'

import iconv from 'iconv-lite'

import jsonp from 'jsonp'

// jsonp('https://news.naver.com/main/list.nhn?mode=LS2D&mid=shm&sid2=230&sid1=105&date=20210329&page=2', null, (err, data) => {
//
//
//
// })

jsonp('https://news.naver.com/main/list.nhn?mode=LS2D&mid=shm&sid2=230&sid1=105&date=20210329&page=2',  { method: 'Get' }, (err, data) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log(data);
    }
});


async function test() {
    let response = await jsonp('https://news.naver.com/main/list.nhn?mode=LS2D&mid=shm&sid2=230&sid1=105&date=20210329&page=2', { method: 'Get' })

    let _results = response.data;

    const decoded = iconv.decode(_results, 'EUC-KR');

    let $ = cheerio.load(decoded);

    let results = []
    $('ul > li').each(function (index, element) {

        let test = $(this).html();

        let href = $(this).find('a').attr('href');
        let title = $(this).find('img').attr('alt')
        let image = $(this).find('img').attr('src')
        let date = $(this).find('.date').text();
        //lede
        let content = $(this).find('.lede').text();

        if (!_.isEmpty(title) && image.toString().includes('origin')) {
            // console.log("temp-===>", title);
            // console.log("image-===>", image);
            // console.log("image-===>", image.toString().replace('nf106_72', 'w647'));

            console.log("temp-===>", content);
            results.push({
                title: title,
                image: image.toString().replace('nf106_72', 'w647'),
                date: date,
                content: content
            })
        }
    })

    console.log("temp-===>", results);
}



