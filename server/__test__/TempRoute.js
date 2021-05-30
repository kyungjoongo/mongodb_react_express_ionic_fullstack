/*


//todo: 하단것은 작동 안되거나 사용하지 않는것들입니다
//todo: 하단것은 작동 안되거나 사용하지 않는것들입니다
//todo: 하단것은 작동 안되거나 사용하지 않는것들입니다
//todo: 하단것은 작동 안되거나 사용하지 않는것들입니다
//todo: 하단것은 작동 안되거나 사용하지 않는것들입니다
//todo: 하단것은 작동 안되거나 사용하지 않는것들입니다
import faceRoutes from "../routes/RouteFaceReconize";

faceRoutes.get('/naver_image/', function (req, last_response, next) {
    let query = req.query.query;
    let api_url = 'https://openapi.naver.com/v1/search/image?display=20&start=1' + '&sort=sim&query=' + encodeURI(query); // json 결과
    let striptags = require('striptags');
    let prettyjson = require('prettyjson');


    request({
        url: api_url,
        headers: {'X-Naver-Client-Id': 'e8G6hWbcN1XdeCN9DIgQ', 'X-Naver-Client-Secret': 'wCcRnTYrhN'},
        method: 'GET'
    }, function (err, _response, body) {
        //it works!

        let blogArrray = JSON.parse(body);
        for (let i = 0; i < blogArrray.items.length; i++) {
            console.log('##############' + striptags(blogArrray.items[i].title))
            let title = striptags(blogArrray.items[i].title);
            let link = blogArrray.items[i].link.replace('&amp;', '&')
            blogArrray.items[i].title = title;
            blogArrray.items[i].link = link;
        }
        console.log(prettyjson.render(blogArrray.items, {noColor: true}));
        last_response.json(blogArrray.items)
    });
});


faceRoutes.get('/google_face_detect', function (req, res) {
    client.faceDetection('E:\\instagram_pictures\\Screenshot 2018-03-14 at 11.17.50.png').then(results => {
        const faces = results[0].faceAnnotations;
        let arrResult = [];
        console.log('Faces:');
        faces.forEach((face, i) => {
            console.log(`  Face #${i + 1}:`);

            /!*face.joyLikelihood= face.joyLikelihood.replace('VERY', '매우').replace('LIKELY', '그렇다').replace('UN', '안').replace('_', ' ')
            face.angerLikelihood= face.angerLikelihood.replace('VERY', '매우').replace('LIKELY', '그렇다').replace('UN', '안').replace('_', ' ')
            face.sorrowLikelihood= face.sorrowLikelihood.replace('VERY', '매우').replace('LIKELY', '그렇다').replace('UN', '안').replace('_', ' ')
            face.surpriseLikelihood= face.surpriseLikelihood.replace('VERY', '매우').replace('LIKELY', '그렇다').replace('UN', '안').replace('_', ' ')*!/


            /!*   console.log(`    기쁨: ${face.joyLikelihood}`);
               console.log(`    화남: ${face.angerLikelihood}`);
               console.log(`    슬픔: ${face.sorrowLikelihood}`);
               console.log(`    놀람: ${face.surpriseLikelihood}`);*!/

            arrResult.push({
                'smile': face.joyLikelihood,
                'anger': face.angerLikelihood,
                'sorrow': face.sorrowLikelihood,
                'nolram': face.surpriseLikelihood
            })


        });

        console.log(arrResult)

        res.json(arrResult);
    }).catch(err => {
        console.error('ERROR:', err);
    });
});

faceRoutes.get('/google_image_search', function (req, res) {
    let _query = req.query.q;
    const client = new imageSearch('007828852513579057554:b1l_axphzqs', 'AIzaSyAlfytAQccsUnNgLWXsC9RIB3DrJsElRhU');
    let options = {page: 1, type: 'face'};
    client.search(_query, options).then(images => {
        client.search(_query, {page: 2}).then(images2 => {
            let combinedResult = images.concat(images2)
            res.json(combinedResult);
        })
    }).catch(error => console.log(error))

});

/!**
 * todo: 작동이 안되고 있음...
 *!/
faceRoutes.post('/face_upload_new', function (req, last_response, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    let name = req.files.sampleFile.name;
    let postFixRandNo = Math.floor((Math.random() * 111111111111) + 1);

    let baseUrl = './public/images/' //@todo:remote
    //let baseUrl = './images/'
    let fixedName = 'temp_image' + postFixRandNo + '.jpg'

    console.log('fixedName--->', fixedName);

    let fullImagePath = baseUrl + fixedName

    console.log(fixedName);


    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(fullImagePath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }


        let api_url = 'http://www.pictriev.com/facedbj.php?findface&image=' + hostname + '/images/' + fixedName


        try {
            request.get({
                url: api_url,
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {

                    if (body.toString().includes('FILE NOT FOUND')) {
                        console.log("sldfklsdkflkdsf====>파일없다");
                    } else {
                        console.log(JSON.parse(body))

                        let __result = JSON.parse(body);

                        console.log(__result.imageid)

                        let imageId = __result.imageid;

                        console.log('imageId===>' + imageId);

                        let requestUir = 'http://www.pictriev.com/facedbj.php?whoissim&imageid=' + imageId.trim() + '&faceid=0&lang=ko'

                        request.get({
                            url: requestUir,
                        }, (error, response, body) => {
                            if (!error && response.statusCode == 200) {

                                if (body.toString().includes("FILE NOT FOUND")) {
                                    console.log("sldfklsdkflkdsf====>", '파일없당');
                                } else {
                                    console.log(JSON.parse(body))

                                    let result2 = JSON.parse(body);
                                    let fianlResult = []
                                    if (result2.result != 'FAIL') {

                                        let celubList = result2.attrs
                                        let age = result2.age;
                                        let gender = result2.gender;

                                        celubList.forEach(item => {
                                            fianlResult.push({
                                                celub: item[2],
                                                score: Math.ceil(item[1] * 100),
                                                img: 'http://www.pictriev.com/imgj.php?facex=' + item[3],
                                                age: result2.age,
                                                gender: result2.gender[0],
                                                genderPercentage: Math.ceil(result2.gender[1] * 100),
                                            })
                                        })

                                        console.log('live--->', fianlResult);

                                        last_response.json(fianlResult)
                                    } else {
                                        fianlResult.push({
                                            result: 'fail'
                                        })
                                        last_response.json(fianlResult)
                                    }

                                }

                            } else {
                                last_response.json(response)
                            }
                        }).on('error', function (err) {
                            console.error(err)
                        }).pipe(fs.createWriteStream('error!!!!!!'))
                    }
                } else {
                    throw new Error(error)
                }
            });
        } catch (e) {
            last_response.json(e.message)
        }


    });
});*/
