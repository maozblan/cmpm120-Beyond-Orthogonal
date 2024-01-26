class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    init() {
        this.PLAYER_VELOCITY = 5
    }

    preload() {
        // the fewer loads the better, why texture atlas is powerful
        this.load.spritesheet('character', './assets/spritesheets/Character_002.png', {
            frameWidth: 48
        })
    }

    create() {
        this.cameras.main.setBackgroundColor(0xDDDDDD)
    
        // add player sprite
        this.player = this.add.sprite(width/2, height/2, 'character', 1).setScale(2)

        // set up cursor
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        // left right, a little bit of hierarchy, left takes precidence
        if (cursors.left.isDown) {
            this.player.x -= this.PLAYER_VELOCITY
        } else if (cursors.right.isDown) {
            this.player.x += this.PLAYER_VELOCITY
        }

        // up down
        if (cursors.up.isDown) {
            this.player.y -= this.PLAYER_VELOCITY
        } else if (cursors.down.isDown) {
            this.player.y += this.PLAYER_VELOCITY
        }
    }
}