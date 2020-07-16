var request = require('request');
var fs = require('fs');
var Bagpipe = require('bagpipe');

let urlList = [
    "https://publish-pic-cpu.baidu.com/bf2cbd5a-b3ab-45af-8e00-314dc1ae1d35.jpeg@w_228,h_152",
    "https://publish-pic-cpu.baidu.com/9c5fa92b-e021-49f6-bacf-170f8b6af074.jpeg@w_228,h_152",
    "https://publish-pic-cpu.baidu.com/f4f3af37-a95d-477e-a316-56f4c40cbf94.jpeg@w_228,h_152",
    "https://publish-pic-cpu.baidu.com/8e265b59-1297-4f9c-9ad9-c9d2b3062c7a.jpeg@w_228,h_152",
    "https://nspt.bdstatic.com/5bcdf674-c20d-4d35-aeb4-585f5c170d73.png@w_228,h_152",
];
// for (let i = 0; i < urlList.length; i++) {
//     //采用request模块，向服务器发起一次请求，获取图片资源
//     request.head(urlList[i], function (err, res, body) {
//         if (err) {
//             console.log(err);
//         }
//     });
//     let currName = urlList[i].split("com/")[1]+ ".jpg";
//     console.log(currName);
//     request(urlList[i]).pipe(fs.createWriteStream('./../../photos/' + currName));     //通过流的方式，把图片写到本地/photos目录下，并用新闻的标题和图片的标题作为图片的名称。
// }
var Bagpipe = require('bagpipe');
var bagpipe = new Bagpipe(100);

for (let i = 0; i < urlList.length; i++) {
    bagpipe.push(downloadFile, urlList[i], function (err, data) {
        console.log(data);
    });
}

function downloadFile(imgPath, callback) {
    let currName = imgPath.split("com/")[1] + ".jpg";
    let fileDownloadPath = './../../photos/' + currName;
    let exist = fs.existsSync(fileDownloadPath);
    if (!exist) {
        let writeStream = fs.createWriteStream(fileDownloadPath);
        let readStream = request(imgPath);
        readStream.pipe(writeStream);
        readStream.on('end', function () {
            readStream.end();
            callback(null, 'success');
            console.log(`文件下载成功${fileDownloadPath}`);
        });
        readStream.on('error', function (error) {
            writeStream.end();
            fs.unlinkSync(fileDownloadPath);
            console.log(`错误信息:${error}`);
            // 下载失败的，重新下载TODO
            readStream.end();
            callback(null, 'fail');
            setTimeout(() => {
                bagpipe.push(downloadFile, imgPath, function (err, data) {
                });
            }, 5000);
        })
        writeStream.on("finish", function () {
            readStream.end();
            writeStream.end();
        }).on('error', function (err) {
                readStream.end();
                writeStream.end();
                console.log(`文件写入失败}`);
            });
    } else {
        console.log('this file is existed');
    }
}

