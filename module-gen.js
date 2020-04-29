const fs = require("fs")
const is_exist_npmjs_name = require("npm-id-lookup")
let module_name = process.argv.length > 2 ? process.argv[2] : '';
let parent_path = process.argv.length > 3 ? process.argv[3] : './';
if(module_name) {
    is_exist_npmjs_name(module_name).then(r => {
        if (r === 200) {
            console.log('이미 존재한다');
        }
        if (r === 404) {
            //
            let package = {
                "name": module_name,
                "version": "1.0.0",
                "description": "",
                "main": module_name + ".js",
                "scripts": {
                    "test": "echo \"Error: no test specified\" && exit 1"
                },
                "keywords": [],
                "author": "",
                "license": "ISC",
            };
            let path = parent_path.concat(module_name);
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }
            let content = ['node_modules/', 'package-lock.json', '.DS_Store', '.git/'].join('\n');
            fs.writeFileSync(path + '/' + '.gitignore', content);
            fs.writeFileSync(path + '/' + '.npmignore', content);
            fs.writeFileSync(path + '/' + 'README.md', '');
            fs.writeFileSync(path + '/' + 'package.json', JSON.stringify(package, undefined, 3));
            fs.writeFileSync(path + '/' + module_name + '.js', 'const fs = require("fs")\nmodule.exports = function(){\n}');
            console.log('아래주소 들어가자')
            console.log('https://github.com/new')
            console.log('아래이름으로 REPO만들고')
            console.log(module_name)
            console.log('커맨드 복사해서 본 폴더에서 실행')
            console.log('cd ' + __dirname + '/' + parent_path + module_name);
            console.log('코드 수정후')
            console.log('의존성 있는것들에 대해서 설치 후')
            console.log('git add . \ngit commit -m "yeah"\ngit push -u origin master')
            console.log('npm publish')
        }
    })



} else {
    console.log('모듈이름 필요합니다');
    console.log('usage> npm index.js 모듈이름 생성할경로');
}