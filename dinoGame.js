const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageNames = ['bird', 'cactus', 'dino'];

// グローバルな game オブジェクト
const game = {
  counter: 0,
  enemys: [],
  image: {},
  isGameOver: true,
  score: 0,
  timer: null
};

// 複数画像読み込み
let imageLoadCounter = 0;
for (const imageName of imageNames) {
  const imagePath = `image/${imageName}.png`;
  game.image[imageName] = new Image();
  game.image[imageName].src = imagePath;
  game.image[imageName].onload = () => {
    imageLoadCounter += 1;
    if (imageLoadCounter === imageNames.length) {
      console.log('画像のロードが完了しました。');
      init();
    }
  }
}

function init() {
  game.counter = 0;
  game.enemys = [];
  game.isGameOver = false;
  game.score = 0;
  createDino();
  game.timer = setInterval(ticker, 30);
}

function ticker() {
  // 画面をクリア
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // TODO 敵キャラクタの生成

  // キャラクタの移動
  moveDino();

  // 描画
  drawDino();// 恐竜の描画

  // TODo あたり判定

  // カウンタの更新
  game.counter = (game.counter + 1) % 1000000;
}

function createDino() {
  game.dino = {
    x: game.image.dino.width / 2,
    y: canvas.height - game.image.dino.height / 2,
    moveY: 0,
    width: game.image.dino.width,
    height: game.image.dino.height,
    image: game.image.dino
  }
}

function moveDino() {
  game.dino.y += game.dino.y;
  if (game.dino.y >= canvas.height - game.dino.height / 2) {
    game.dino.y = canvas.height - game.dino.height / 2;
    game.dino.moveY = 0;
  } else {
    game.dino.moveY += 3;
  }
}

function drawDino() {
  ctx.drawImage(game.image.dino, game.dino.x - game.dino.width / 2, game.dino.y - game.dino.height / 2);
}

document.onkeydown = function (e) {
  if (e.key === ' ' && game.dino.moveY === 0) {
    game.dino.moveY = -41;
  }
};
