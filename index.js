var fs = require('fs'),
    request = require('request-promise'),
    cheerio = require('cheerio'),
    client = require('https'),
    download = require('image-downloader'),
    imageDownloader = require('node-image-downloader');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

// request image
const term_name_array = [
    'bach-ma-khieu-tay-phong',
    'anh-hung-xa-dieu',
    'thien-du',
    'thien-long-bat-bo',
    'vo-lam-ngu-ba',
    'tuyet-son-phi-ho',
    'co-gai-do-long',
    'hiep-khach-hanh',
    'lien-thanh-quyet',
    'tieu-ngao-giang-ho',
    'than-dieu-dai-hiep',
    'bich-huyet-kiem',
    'thu-kiem-an-cuu-luc',
    'phi-ho-ngoai-truyen',
    'loc-dinh-ky',
    'uyen-uong-dao',
    'viet-nu-kiem',
    'on-thuy-an',
    'bach-y-phuong-chan-mi',
    'nu-than-bo',
    'than-chau-ky-hiep',
    'than-tuong-ly-bo-y',
    'anh-hung-vo-le',
    'an-thu-kiem-luc',
    'am-cong',
    'bach-cot-lam',
    'bich-huyet-tay-ngan-thuong',
    'bach-ngoc-lao-ho',
    'ho-hoa-linh',
    'co-lau-quai-kiet',
    'co-tinh-hiep-lu',
    'dai-nhan-vat',
    'danh-kiem-phong-luu',
    'di-kiem-khach',
    'dai-dia-phi-ung',
    'dai-ky-anh-hung-truyen',
    'doan-hon-tuyet-cung',
    'kiem-khi-thu-huong',
    'giang-ho-xao-khach',
    'hoan-lac-anh-hung',
    'tuyet-dai-song-kieu',
    'tieu-thap-nhat-lang',
    'huyet-anh-vu',
    'hong-bao-quai-nhan',
    'kiem-doc-mai-huong',
    'kiem-hoa-yen-vu-giang-nam',
    'tuong-phi-kiem',
    'kiem-khach-hanh',
    'ky-lan-bao-dien',
    'liep-ung-do-cuc',
    'loi-am-ma-cong',
    'long-kiem-truy-hon',
    'luu-tinh-ho-diep-kiem',
    'nguyet-di-tinh-ta',
    'phi-dao-huu-kien-phi-dao',
    'phieu-phong-kiem-vu',
    'phong-linh-trung-dao-thanh',
    'sat-thu-kiem-vuong',
    'tam-thieu-gia-dich-kiem',
    'thai-cuc-do',
    'thai-hoan-khuc',
    'tien-co-bao-kiem',
    'thach-phong-thanh',
    'tieu-thap-nhat-lang',
    'that-lao-kiem',
    'tinh-nhan-tien',
    'that-sat-thu',
    'tuyet-hoa-phong-nguyet',
    'that-tinh-long-vuong',
    'thien-dang',
    'thien-dia-can-khon',
    'thien-kiem-tuyet-dao',
    'thiet-ky-mon',
    'tu-dong',
    'vien-nguyet-loan-dao',
    'vo-lam-tuyet-dia',
    'xich-long-chau',
    'xuyen-tam-lenh',
    'xuan-thu-but',
    'tieu-hon',
    'lac-nhat-dai-ky',
    'thi-kiem-son-trang',
    'tieu-tuyet-so-tinh',
    'truong-an-nhat-chien',
    'kinh-diem-nhat-thuong',
    'nhat-no-bat-kiem',
    'on-nhu-nhat-dao',
    'quan-long-chi-thu',
    'thien-ha-huu-dich',
    'thuong-tam-tieu-tien',
    'thien-ha-vo-dich',
    'trieu-thien-nhat-con',
    'anh-hung-hao-han',
    'duoc-ma-hoang-ha',
    'duong-phuong-nhat-chien',
    'giang-son-nhu-hoa',
    'kiem-khi-truong-giang',
    'luong-quang-hao-kiet',
    'sam-dang-giang-ho',
    'than-chau-vo-dich',
    'thien-ha-huu-tuyet',
    'tich-mich-cao-thu',
    'sat-nhan-dich-tam-khieu',
    'thu-noan',
    'te-kiem',
    'giang-ho-nhan-thoai',
    'nu-bo-khoai',
    'sat-nhan-gia-duong-tram',
    'that-bang-bat-hoi-cuu-lien-minh',
    'phuong-ta-chan',
    'tu-dai-danh-bo-chan-quang-dong',
    'tu-dai-danh-bo-hoi-kinh-su',
    'phan-i-hung-thu',
    'tien-nghich',
    'pham-nhan-tu-tien',
    'y-thien-do-long-ky',
    'tuyet-bat-de-dau',
    'uu-dam-hoa',
    'au-duong-chinh-lan',
    'ban-long-dao',
    'bach-ho-tinh-quan',
    'bach-nhat-quy-hon',
    'bich-nhan-than-quan',
    'du-gia-dai-phap',
    'giang-ho-mong-ky',
    'giang-nam-oan-luc',
    'hac-bach-huong-ho-ky',
    'kim-giap-mon',
    'nga-mi-kiem-khach',
    'ngu-truong-kiem',
    'son-quy',
    'tan-nhuong-thu',
    'trang-tu-tam-kiem',
    'tieu-ngao-trung-hoa',
    'tuyet-ho-cong-tu',
    'tinh-ma',
    'vo-lam-u-linh-ky',
    'tran-thanh-van',
    'an-tri-truy-xu',
    'am-duong-quai-dien',
    'ao-ma-bo-phap',
    'am-duong-than-chuong',
    'bach-cac-mon',
    'bi-thu-tien-kiem',
    'bach-cot-u-linh',
    'can-khon-tuyet-phap',
    'cuu-u-ma-dong',
    'dao-ma-nhi-de',
    'doc-ho-diep',
    'de-an-giang-ho',
    'doc-thu-phat-tam',
    'doat-hon-chung',
    'hac-nho',
    'huyet-thiep-vong-hon-ky',
    'hoa-huyet-than-cong',
    'huyet-thu-sat-lenh',
    'huyet-anh-ma-ton',
    'huyet-y-ky-thu',
    'kim-bai-sach-hon-lenh',
    'kim-dau-van-diem-boi',
    'kim-but-than-hiep',
    'kim-sa-tuyet-menh-chuong',
    'lu-son-ky-nu',
    'ngu-long-tuyet-menh',
    'quy-bao',
    'quy-kiem-vuong',
    'sanh-tu-kieu',
    'tang-hong-linh-diep-ky',
    'than-long-cuu-chuyen',
    'tang-long-dinh',
    'thiet-thu-truc-kiem',
    'thai-duong-huyen-cong',
    'thuy-tinh-cau',
    'that-sat-lenh',
    'truong-kiem-tuong-tu',
    'u-vuong-quy-dien',
    'van-doc-quy-mon',
    'vo-danh-chuong',
    'vong-menh-thien-nhai',
    'xich-bat-vo-tinh',
    'lieu-tan-duong',
    'an-long-dai-hiep',
    'cau-hon',
    'diem-vuong-thoa',
    'dai-sat-tinh',
    'giang-ho-doat-kiep',
    'giao-thien-dinh',
    'hac-bach-long-kiem',
    'huyet-yen-kiep',
    'huyet-anh-nhan',
    'ma-dao-ca',
    'me-tong-tuyet-dao',
    'ma-tieu',
    'mo-dung-chi-ton',
    'ngu-phung-trieu-long',
    'nhat-tuyet-bo',
    'te-hon-cau',
    'than-dao-sat-thu',
    'thanh-long-giao-chu',
    'vo-dien-thu-sinh',
    'luong-vu-sinh',
    'ao-kiem-linh-ky',
    'binh-tung-hiep-anh-luc',
    'cai-bang-thap-ac',
    'dai-duong-du-hiep-ky',
    'giang-ho-tam-nu-hiep',
    'hiep-cot-dan-tam',
    'hoan-kiem-ky-tinh-luc',
    'long-phung-bao-thoa-duyen',
    'that-kiem-ha-thien-son',
    'van-hai-ngoc-cung-duyen',
    'ngoa-long-sinh',
    'am-duong-tam-thu-sinh',
    'bach-thu-thu-sinh',
    'chien-yen-hung-cai',
    'cuong-ta-tuyet-dan',
    'cuong-hiep-ta-kiem',
    'cu-linh-than-chuong',
    'dan-chi-than-cong',
    'dieu-sao-me-hon',
    'giang-ho-ky',
    'giang-tuyet-huyen-suong',
    'han-mai-kim-kiem',
    'hau-thien-hac-pho',
    'hai-no-trieu-am',
    'linh-phong-dich-anh',
    'ma-dao-sat-tinh',
    'mai-hoa-quai-kiet',
    'ma-hoan-lanh-nhan',
    'ngu-hanh-sinh-khac',
    'ngung-suong-kiem',
    'no-tinh-kiem-thu',
    'phi-ung-chuong',
    'quy-kiem-u-linh',
    'thanh-tam-ma-anh',
    'thien-nhai-hiep-lu',
    'that-ky-doat-mang',
    'thuong-nguon-kiem-phap',
    'that-tuyet-ma-kiem',
    'to-thu-kiep',
    'thien-hac-pho',
    'tuy-tam-kiem',
    'thien-huong-tieu',
    'vo-anh-than-chieu',
    'xac-chet-loan-giang-ho',
    'yen-chi-bao-dao',
    'kho-lau-hoa',
    'nghich-thuy-han',
    'tru-tien',
    'toan-chuc-cao-thu',
    'than-mo',
    'thanh-khu',
    'gia-thien',
];

const imgs = [];

for (let index = 0; index < term_name_array.length; index++) {
    const element = term_name_array[index];
    const url = `https://dtruyen.com/${element}/`
    request(url, (error, response, html) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html); // load HTML
            const object = {}
            $('#story-detail > div.col1 > div.thumb > img').each((index, el) => { 
                const image = $(el).attr('src');
                object.uri = image
                object.filename = `${element}`
                imgs.push(object)
                
                // console.log(image)
                // downloadImage2(image, `${element}.png`, function(){
                //     console.log(`done ${image}`);
                // });
            })

            // download
            imageDownloader({
                imgs:imgs,
                dest: './downloads', //destination folder
              })
                .then((info) => {
                  console.log('all done', info)
                })
                .catch((error, response, body) => {
                  console.log('something goes bad!')
                  console.log(error)
                })
            console.log(imgs)
        }
        else {
            console.log(error);
        }
    });
}
            

// term_name_array.forEach(element => {
//     const url = `https://dtruyen.com/${element}/`
//     console.log(url)
//     // request(url, (error, response, html) => {
//     //     if(!error && response.statusCode == 200) {
//     //         const $ = cheerio.load(html); // load HTML
//     //         const object = {}
//     //         $('#story-detail > div.col1 > div.thumb > img').each((index, el) => { 
//     //             const image = $(el).attr('src');
//     //             object.uri = image
//     //             object.filename = `${element}`
//     //             imgs.push(object)
                
//     //             // console.log(image)
//     //             // downloadImage2(image, `${element}.png`, function(){
//     //             //     console.log(`done ${image}`);
//     //             // });
//     //         })

//     //         // download
//     //         imageDownloader({
//     //             imgs:imgs,
//     //             dest: './downloads', //destination folder
//     //           })
//     //             .then((info) => {
//     //               console.log('all done', info)
//     //             })
//     //             .catch((error, response, body) => {
//     //               console.log('something goes bad!')
//     //               console.log(error)
//     //             })
//     //         console.log(imgs)
//     //     }
//     //     else {
//     //         console.log(error);
//     //     }
//     // });
// });






function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));

            }
        });
    });
}

function downloadImage2(url, filepath) {
    return download.image({
       url,
       dest: filepath 
    });
}
