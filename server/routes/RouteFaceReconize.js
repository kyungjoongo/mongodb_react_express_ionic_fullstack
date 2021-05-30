import httpStatus from "../utils/httpStatus";
const express = require('express');
const sightengine = require('sightengine')('721699261', '6hprE685aFhJT8UcFQg3');
const axios = require('axios');
const faceRoutes = express.Router();
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const client_ids = ['IJ3GDacUbH4O_zfaMbCQ', '6nGjq4U_Cojcmgly0Fuy', '7DhO7J70Biy2Jz1xa6mX']
const client_secrets = ['uTURoZKF9N', '7nT2n8KYbV', 'cNuri56BWk']
const translate = require('translate');
translate.engine = 'google';
translate.key = 'AIzaSyAV-2b3UNzzvFsXWJzOjVTtaRnd1GHLlEU';
//let hostname = 'http://kyungjoon2.ipdisk.co.kr:5001' //@todo://localhost
let hostname = 'http://celme.kyungjoongo.shop'
let baseUrl = './public/images/'

//todo: ###############
//todo: naver face 분석
//todo: ###############
faceRoutes.post('/face_engine_a', function (req, res, next) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    let file1 = req.files.file1;
    let postFixRandNo = Math.floor((Math.random() * 500) + 1);
    let fixedName = 'temp_image' + postFixRandNo + '.jpg'


    file1.mv(baseUrl + fixedName, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        let api_url = 'https://openapi.naver.com/v1/vision/celebrity'; // 유명인 인식
        let _formData = {
            image: fs.createReadStream(baseUrl + fixedName)
        };

        let randClientIdNo = Math.floor((Math.random() * 3) + 0);

        try {
            let _req = request.post({
                url: api_url, formData: _formData,
                headers: {
                    'X-Naver-Client-Id': client_ids[randClientIdNo],
                    'X-Naver-Client-Secret': client_secrets[randClientIdNo]
                }
            }).on('response', function (response) {
                console.log(response.statusCode) // 200
                console.log(response.headers['content-type'])
            })

            console.log(request.head);
            _req.pipe(res); // 브라우저로 출력
        } catch (e) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: e.toString()});
        }

    });
});


//todo: ###################
//todo: sightengine
//todo: ###################
faceRoutes.post('/face_engine_b', function (req, res, next) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }


    let file1 = req.files.file1;
    let postFixRandNo = Math.floor((Math.random() * 500) + 1);

    let fixedName = 'temp_image' + postFixRandNo + '.jpg'

    file1.mv(baseUrl + fixedName, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        let imageFullUri = baseUrl + fixedName
        try {
            sightengine.check(['celebrities']).set_file(imageFullUri).then(function (result) {
                res.json(result)

            })
        } catch (e) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: e.toString()});
        }
    });
});


//todo: ###############
//todo: starbyface.com
//todo: ###############
faceRoutes.post('/face_engine_c', function (req, res, next) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    let file1 = req.files.file1;
    let postFixRandNo = Math.floor((Math.random() * 111111111111) + 1);

    let fixedName = 'temp_image' + postFixRandNo + '.jpg'
    let fullImagePath = baseUrl + fixedName
    console.log(fixedName);

    // Use the mv() method to place the file somewhere on your server
    file1.mv(fullImagePath, async (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        let api_url = 'https://starbyface.com/Home/LooksLike?url=' + hostname + '/images/' + fixedName
        try {
            let _result = await axios({
                method: 'post',
                url: api_url,
                timeout: 15 * 1000,
            }).then(response => {

                let body = response.data;
                let $ = cheerio.load(body);

                let results = [];
                $('.candidate').each(function () {

                    let image = $(this).find('.img-thumbnail').attr('src')
                    let percentage = $(this).find('.progress-bar').attr('similarity');
                    let name = $(this).find('.candidate-main > p ').text();
                    let className = $(this).parent().attr('id')

                    results.push({
                        image: image,
                        percentage: percentage,
                        name: name,
                        className: className,
                    })
                });

                console.log("results===>", results);
                return results;
            })

            res.json(_result)
        } catch (e) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: e.toString()});
        }

    });
});


export default faceRoutes;
