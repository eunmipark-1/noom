# Noom

Zoom Clone using NodeJS, WebRTC and Websockets.

https 처리 해주어야 로컬환경에서 여러 단말기에서 접근 가능했음. 

server.js에서 https import 하고 암호화 옵션 설정한다. 

 openssl genrsa -out key.pem (암호화 키 만들기기)

 openssl req -new -key key.pem -out csr.pe키 (암호화 코드 확보 )

 적당한 옵션으로 암호화진행 

 openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem (공개키 생성)

 rm csr.pem

이후 https://localhost:3000으로 접근하면 
크롬에서 보안 경고 메세지 나온다, 화면을 click 하고 thisisunsafe 라고 입력한다. 

 https://localhost:3000 으로 서버가 작동함을 확인한 수 
 다른 PC 에서 https://내부 IP:3000  으로 접근 가능하였다. 
 