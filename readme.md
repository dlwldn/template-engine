# # 테스트 방법
1. npm install을 사용하여 필요한 모듈들 설치
```
> npm install
```
2. nodemon을 글로벌로 설치하거나, 다른 자바스크립트 실행기를 사용하여 app.js 실행 (포트 3000)
```
> nodemon app.js
```
3. 로그인, 회원가입, 사용자정보 이렇게 사용할 수 있으며, 테스트를위해 토큰만료시간을 accessToken 10초, refreshToken 15초로 설정하였습니다.

-----

# # 학습하고자 한 내용

 - ## 템플릿 엔진을 사용한 SSR 및 서버의 기본적인 지식 이해

    ### *SSR의 특징*

        - 서버에서 페이지를 그려서 클라이언트로 보낸 후 화면에 표시하는 기법
        - 서버에서 미리 페이지를 그려서 보내주기 때문에 페이지를 그리는 시간을 단축 할 수 있다. (사용자 입장에선 화면에 유의미한 정보가 표시되는 시간이 빨라짐)
        - 페이지 안에 컨텐츠가 다 표시되어 있으므로 검색로봇이 찾기에 좋음
        - 그러므로 주로 쓰는 목적은 '검색엔진 최적화', '빠른 페이지 렌더링'
        - 하지만 페이지를 이동할 때마다 서버에 새로운 페이지를 요청하고, 프로젝트의 복잡도가 높아진다는 단점이 있음.
    
    ### *템플릿 엔진이란 ?*

        자바스크립트를 사용하여 HTML을 렌더링 할 수 있게 해준다.
        즉 SSR에서 HTML을 좀 더 쉽게 작성 할 수 있게 해주는 express 뷰 엔진이다.


 - ## jwt토큰 방식을 이용한 로그인 (토큰 발급, 인증, 만료시 재발급)

    ### *jwt란?*

        - 클라이언트와 서버의 통신을 할 때 권한을 인가하기 위해 사용하는 토큰
        - 헤더.페이로드.서명(aaaaa.bbbbb.ccccc) 이렇게 3부분으로 이루져 있는것이 특징
    
    ### *jwt 인증방식*
        1. 사용자가 로그인을 합니다.
        2. 서버에서 사용자를 확인 후, 권한 인증을 위한 정보를 payload에 넣어 accessToken, refreshToken을 생성
        3. 생성한 토큰을 클라이언트에 반환 (클라이언트는 이 토큰을 저장)
        4. 클라이언트는 저장한 토큰을 권한 인증이 필요한 요청을 할때마다  accessToken을 헤더에 실어 보냄
        5. 서버는 헤더의 토큰을 검증하고 payload의 값을 디코딩하여 사용자의 권한을 확인 후 데이터를 반환
        6. 만약 토큰이 만료되었다면 서버는 클라이언트에게 만료되었다는 응답을 보냄
        7. 클라이언트는 만료된 토큰을 재발급 받기위해 만료된 accessToken과 refreshToken을 함께 헤더에 실어 서버에게 새로은 토큰 발급 요청
        8. 서버는 받은 토큰 모두 검증 한 후, refreshToken이 만료되지 않았다면 새로운 accessToken을 발급하여 클라이언트에게 반환(만약 refreshToken도 만료되었다면 새로 로그인 시킴)

 - ## pug의 기초적인 사용법 및 활용 (일반적인 HTML 작성법과는 다르지만 매우 친숙한!!!)

    ### 기초적인 문법
        - pug는 html의 태그방법이 아닌 탭으로 구분해서 작성

            html
                body
                    div.content

        - extends를 사용하여 공통적인 레이아웃부분을 분리 할 수 있음 (layout.pug 참고)
        - 스크립트를 같이 사용할 수 있으며, 변수도 선언 가능

            div.content
            - const name = 'jiwoo';
            div #{name} // 에러없이 jiwoo가 화면에 그려짐.
    
        등등 다른 것도 많지만 사용할 때 한번 보면 바로 이해 가능할 정도로 익숙함!

