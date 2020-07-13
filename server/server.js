
var video1 = document.getElementById("v1");
var video2 = document.getElementById("v2");
var canvas = document.getElementById("c");

//キャンバスに書き込む
setInterval(function () {
  canvas.getContext("2d").drawImage(video1, 0, 0, 320, 180);
  canvas.getContext("2d").drawImage(video2, 320, 0, 320, 180);
}, 1000 / 30);

//相手に送信する映像を入れる
let localStream = canvas.captureStream(60);

//Peer作成
//keyにSkyWayのAPIキーを入力してください
const peer = new Peer({
  key: '29c7db49-2944-4015-a2d7-085c8e213ad5',
  debug: 3
});

peer.on('open', () => {
  document.getElementById('my-id').textContent = peer.id;
});

//着信処理
peer.on('call', mediaConnection => {
  mediaConnection.answer(localStream);
  setEventListener(mediaConnection);
});
