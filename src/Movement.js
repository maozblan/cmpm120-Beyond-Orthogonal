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
        let playerVector = new Phaser.Math.Vector2(0, 0)

        // left right, a little bit of hierarchy, left takes precidence
        if (cursors.left.isDown) {
            playerVector.x = -1
        } else if (cursors.right.isDown) {
            playerVector.x = 1
        }

        // up down
        if (cursors.up.isDown) {
            playerVector.y = -1
        } else if (cursors.down.isDown) {
            playerVector.y = 1
        }

        // normalize the vector to calculate the unit vector
        playerVector.normalize()
        this.player.x += playerVector.x * this.PLAYER_VELOCITY
        this.player.y += playerVector.y * this.PLAYER_VELOCITY
    }
}