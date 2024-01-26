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

    }
}