var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('me', 'sprites/dude.png');
    this.load.image('coin', 'sprites/coin.png')
}

coinCounter = 0;
playerconfig = {
    rightSpeed: 160,
    leftSpeed: -160,
    jumpForce: -350
};

let platforms;
let player;

function create() {
    player = this.physics.add.sprite(100, 400, 'me');
    player.setCollideWorldBounds(false);
    player.setBounce(0.2);

    platforms = this.physics.add.staticGroup();
    platforms.create(200, 580, 'ground').setScale(10, 1).refreshBody();
    this.add.text(100, 500, 'move with ← and →, jump with ↑', { fontFamily: 'Arial', fontSize: '10px', color: '#ffffff' });
    platforms.create(400, 480, 'ground').setScale(4, 1).refreshBody();
    platforms.create(600, 380, 'ground').setScale(4, 1).refreshBody();
    platforms.create(400, 280, 'ground').setScale(4, 1).refreshBody();
    platforms.create(800, 280, 'ground').setScale(4, 1).refreshBody();
    platforms.create(600, 180, 'ground').setScale(4, 1).refreshBody();
    platforms.create(800, 80, 'ground').setScale(4, 1).refreshBody();
    platforms.create(1200, 80, 'ground').setScale(8, 1).refreshBody();
    platforms.create(1450, -20, 'ground').setScale(2).refreshBody();
    platforms.create(1550, -120, 'ground').setScale(2).refreshBody();
    platforms.create(1650, -220, 'ground').setScale(2).refreshBody();
    platforms.create(1900, -200, 'ground').setScale(8, 1).refreshBody();
    platforms.create(2150, -100, 'ground').setScale(8, 1).refreshBody();
    platforms.create(2500, -100, 'ground').setScale(1, 5).refreshBody();
    platforms.create(2700, -90, 'ground').setScale(1, 5).refreshBody();
    platforms.create(2900, -110, 'ground').setScale(1, 5).refreshBody();
    platforms.create(3100, -80, 'ground').setScale(1, 5).refreshBody();
    platforms.create(3300, 0, 'ground').setScale(4, 1).refreshBody();
    platforms.create(3500, 100, 'ground').setScale(4, 1).refreshBody();
    platforms.create(3700, 200, 'ground').setScale(4, 1).refreshBody();
    platforms.create(3900, 300, 'ground').setScale(4, 1).refreshBody();
    this.add.text(3875, 230, 'jump up with the power up\n            ←', { fontFamily: 'Arial', fontSize: '10px', color: '#ffffff' });
    platforms.create(4000, -400, 'ground').setScale(4, 1).refreshBody();
    platforms.create(4400, -400, 'ground').setScale(4, 1).refreshBody();
    this.add.text(4350, -500, 'it\'s there →\njump with it, is large', { fontFamily: 'Arial', fontSize: '10px', color: '#ffffff' })
    platforms.create(5600, -400, 'ground').setScale(4, 1).refreshBody();
    platforms.create(5700, -400, 'ground').setScale(4, 1).refreshBody();
    platforms.create(5800, -400, 'ground').setScale(4, 1).refreshBody();
    platforms.create(5900, -400, 'ground').setScale(4, 1).refreshBody();
    platforms.create(6000, -400, 'ground').setScale(4, 1).refreshBody();
    platforms.create(6400, -400, 'ground').setScale(4).refreshBody();

    coins  = this.physics.add.staticGroup();
    coins.create(230, 540, 'coin').setScale(0.5).refreshBody();
    coins.create(630, 340, 'coin').setScale(0.5).refreshBody();
    this.add.text(600, 300, 'look it ↓  collet this coin', { fontFamily: 'Arial', fontSize: '10px', color: '#ffffff' });
    coins.create(615, 140, 'coin').setScale(0.5).refreshBody();
    coins.create(1230, 40, 'coin').setScale(0.5).refreshBody();
    this.add.text(1200, -150, 'power ups types: \ncoin adder\nspeed adder\nsuper jump', { fontFamily: 'Arial', fontSize: '10px', color: '#ffffff' });
    coins.create(1550, -170, 'coin').setScale(0.5).refreshBody();
    coins.create(2900, -220, 'coin').setScale(0.5).refreshBody();
    coins.create(3315, -40, 'coin').setScale(0.5).refreshBody();
    coins.create(5800, -440, 'coin').setScale(0.5).refreshBody();
    coins.create(5850, -440, 'coin').setScale(0.5).refreshBody();
    coins.create(5900, -440, 'coin').setScale(0.5).refreshBody();

    powerups = this.physics.add.staticGroup();
    powerups.create(2020, -142, 'coinpowerup').setScale(0.5, 1).refreshBody().setData('type', 'coin');
    powerups.create(790, 230, 'speedpowerup').setScale(0.5, 1).refreshBody().setData('type', 'speedUp')
    this.add.text(800, 240, ' ← and this, is one power up', { fontFamily: 'Arial', fontSize: '10px', color: '#ffffff' });
    powerups.create(2900, -350, 'coinpowerup').setScale(0.5, 1).refreshBody().setData('type', 'coin');
    powerups.create(3900, 260, 'speedpowerup').setScale(0.5, 1).refreshBody().setData('type', 'jumpUp');
    powerups.create(4410, -452, 'speedpowerup').setScale(0.5, 1).refreshBody().setData('type', 'speedUp');
    powerups.create(6350, -480, 'coinpowerup').setScale(0.5, 1).refreshBody().setData('type', 'coin');
    powerups.create(6160, -600, 'coinpowerup').setScale(0.5, 1).refreshBody().setData('type', 'coin');

    flag = this.physics.add.staticGroup();
    flag.create(6440, -500).setScale(0.6, 1.2).refreshBody();

     // Configura a câmera para seguir o jogador
    camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(-Infinity, -Infinity, Infinity, Infinity);  // Define os limites da câmera para o tamanho do mundo do jogo

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, coins, collectCoin, null, this);
    this.physics.add.collider(player, powerups, colletPW, null, this);
    this.physics.add.collider(player, flag, win, null, this);

    coinText = this.add.text(30, 30, 'coins: ' + coinCounter, { fontFamily: 'Arial', fontSize: '20px', color: '#ffffff' });
}

currentframe = 0;
function update() {
    keys = this.input.keyboard.createCursorKeys();

    if (keys.up.isDown && player.body.touching.down) {
        player.setVelocityY(playerconfig.jumpForce);
    }

    if (keys.left.isDown) {
        player.setVelocityX(playerconfig.leftSpeed);
    } else if (keys.right.isDown) {
        player.setVelocityX(playerconfig.rightSpeed);
    } else {
        player.setVelocityX(0);
    }

    if (player.y > 1000) {
         this.add.text(player.x - 125, player.y - 50, 'GAME OVER\nyou fall', { fontFamily: 'Arial', fontSize: '50px', color: '#ff0000' });
        this.scene.pause();
    }

    coinText.y = player.y - 270 / 4 * 3;
    coinText.x = player.x - 350 / 4 * 3;
    coinText.setText('coins: ' + coinCounter);
}
setInterval(() => currentframe += 0.1, 100);

function collectCoin(player, coin) {
    coin.disableBody(true, true);
    coinCounter += 1;
}

function colletPW(player, powerup) {
    switch(powerup.getData('type')) {
        case 'coin':
            coinCounter += 10;
            break;
        case 'speedUp':
            playerconfig.rightSpeed = 500;
            playerconfig.leftSpeed = -500;
            setTimeout(() => {
                playerconfig.leftSpeed = -160;
                playerconfig.rightSpeed = 160;
            }, 3000);
            break;
        case 'jumpUp':
            playerconfig.jumpForce = -700;
            setTimeout(() => {
                playerconfig.jumpForce = -350;
            }, 3000);
            break;
    }
    powerup.disableBody(true, true);
}

function win(player, flag) {
    this.add.text(player.x - 125, player.y - 50, 'YOU WIN!!!\ncoins: ' + coinCounter + '\ntime: ' + currentframe.toFixed(1) + 's', { fontFamily: 'Arial', fontSize: '50px', color: '#ffff00' });
    this.scene.pause();
}
