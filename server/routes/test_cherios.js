const cheerio = require('cheerio');


//https://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=105#&date=%2000:00:00&page=2

const axios = require('axios');

axios.get('https://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=105#&date=%2000:00:00&page=2').then(resp => {

    const $ = cheerio.load(resp.data);

    $('li').each(function (i, elem) {

        let test01 = $(this).find('a > img').attr('src')

        if (test01 !== undefined) {
            console.info("image====>", test01);
        }


    });

});


