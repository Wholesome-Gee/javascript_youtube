// webpack.config.js는 javascript의 구버전 문법만 이해 가능
// npm i webpack webpack-cli -D  먼저 진행
// package.json 세팅 (README #9 참고)

const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // npm i mini-css-extract-plugin -D  관련해서는 #9.5 참고

module.exports = {  // export default의 구문법 
  entry: "./src/client/js/main.js",
  mode: 'development',
  watch: true,
  /*
  9. entry는 압축하고자 하는 파일의 경로
  10. mode가 production이면 npm run assets시 파일의 내용이 한줄로 압축됨, development면 압축안됨
  11. watch는 entry에 ctrl+s가 발생 시 자동으로 기존의 assets폴더를 삭제하고 npm run assets를 실행한다.
  */

  output: {
    filename:"js/main.js",                   
    path: path.resolve(__dirname, 'assets'), 
    clean: true, 
  },
  /*
  19. output > filename은 압축 된 파일 이름
  20. output > path는 압축 된 파일 저장 경로
      __dirname은 현재 프로젝트의 절대경로를 리턴 (C:\Users\jiyon\...\js_youtube)
      path.resolve()는 인수들을 합친 경로를 리턴한다. (C:\Users\jiyon\...\js_youtube\assets)
  21. build를 시작하기 전에 output folder를 전부 비워준다.
  */

  plugins: [ 
    new MiniCssExtractPlugin({      
      filename: "css/styles.css",   
    })
  ],
  /*
  32. 단순히 MiniCssExtractPlugin을 세팅하는 과정이다. 
  33. npm run assets시, assets 폴더안에 css/styles.css가 생성된다.
  */         

  module: {  // webpack에서 사용할 module 정의
    rules: [
      {
        test: /\.js$/,              // 조건: .js로 끝날경우
        use: {                      // 적용시킬 module 정의 (webpack에선 loader라고 한다.)
          loader: 'babel-loader',   // npm i babel-loader @babel/core @babel/preset-env -D
          options: {                // babel-loader 공식 문서대로 options 셋팅
            targets: "defaults",                
            presets: [["@babel/preset-env"]]    
          }                                                                              
        },
      },
      {
        // js에서 import '../scss/styles.scss'가 발견되면 webpack은 해당 경로에 있는 scss를 처리한다. 
        test: /\.scss$/,               
        use: [                         
          // npm i sass sass-loader css-loader style-loader -D
          //"style-loader",    
          // style-loader는 변환된 css파일을 DOM tree에 적용시켜주지만, MiniCssExtractPlugin.loader로 대체된다.(npm run assets시 별도의 css파일을 생성할 수 있기 때문)
          MiniCssExtractPlugin.loader, 
          "css-loader",                
          "sass-loader"                
          /* 
            해당 부분은 역순으로 진행된다.
            webpack은 sass-loader를 통해 scss파일을 css파일로 compile 한다.
            webpack은 css-loader를 통해 css파일 내에 @import, url() 같은 구문을 해석한다.
            webpack은 MiniCssExtractPlugin.loader를 통해 DOM tree에 css파일을 추가하고 output path에(13번 라인) css/styles.css를 생성한다.(19번 라인)
           */
        ]                              
      }
    ]
  }
} 
