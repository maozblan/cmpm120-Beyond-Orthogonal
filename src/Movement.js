class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    init() {
        this.PLAYER_VELOCITY = 350
    }

    preload() {
        // the fewer loads the better, why texture atlas is powerful
        this.load.spritesheet('character', './assets/spritesheets/Character_002.png', {
            frameWidth: 48
        })
    }

    create() {
        this.cameras.main.setBackgroundColor(0xDDDDDD)
    
        // add player as a physics sprite
        this.player = this.physics.add.sprite(width/2, height/2, 'character', 1).setScale(2)
        // stop character from exiting screen
        // since it's a physics sprite, you can the physics body
        this.player.body.setCollideWorldBounds(true);
        
        // fix the padding
        this.player.body.setSize(32, 32).setOffset(8, 16)

        // set up cursor
        cursors = this.input.keyboard.createCursorKeys()

        // usually you set up the animations in a separate loading / booting scene because
        // you only need to make them once
        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            repeat: -1,     // infinitely repeat
            frames: this.anims.generateFrameNumbers('character', {
                start: 1,
                end: 1
            })
        })
        this.anims.create({
            key: 'walk-down',
            frameRate: 5,
            repeat: -1,     // infinitely repeat
            frames: this.anims.generateFrameNumbers('character', {
                start: 0,
                end: 2
            })
        })
    }

    update() {
        let playerVector = new Phaser.Math.Vector2(0, 0)
        let playerDirection = 'down'

        // left right, a little bit of hierarchy, left takes precidence
        if (cursors.left.isDown) {
            playerVector.x = -1
            playerDirection = 'left'
        } else if (cursors.right.isDown) {
            playerVector.x = 1
            playerDirection = 'right'
        }

        // up down
        if (cursors.up.isDown) {
            playerVector.y = -1
            playerDirection = 'up'
        } else if (cursors.down.isDown) {
            playerVector.y = 1
            playerDirection = 'down'
        }

        // normalize the vector to calculate the unit vector
        playerVector.normalize()
        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        let playerMovement
        playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle'

        // pass in boolean for ignore if playing is "don't reset animation if already playing"
        // build up animation string name (programmatically figuring out what animation it is
        // this WOULD NOT SCALE WELL
        this.player.play(playerMovement + '-' + playerDirection, true);
    }
}