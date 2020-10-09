function Waddling_State () {
    if (controller.right.isPressed()) {
        duck.x += 5
    }
    if (!(duck.isHittingTile(CollisionDirection.Bottom))) {
        state = "Falling"
    }
    if (controller.left.isPressed()) {
        duck.x += -5
    }
    if (!(controller.anyButton.isPressed())) {
        state = "Idle"
    }
}
function track_prev_state () {
    if (state != prev_state) {
        first_time = true
        prev_state = state
    } else {
        first_time = false
    }
}
function Idiling_State () {
    if (first_time) {
        animation.runImageAnimation(
        duck,
        [img`
            . . . . . . . . . . b 5 b . . . 
            . . . . . . . . . b 5 b . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 5 5 5 5 5 b . . . 
            . . . . b b 5 d 1 f 5 5 d f . . 
            . . . . b 5 5 1 f f 5 d 4 c . . 
            . . . . b 5 5 d f b d d 4 4 . . 
            . b b b d 5 5 5 5 5 4 4 4 4 4 b 
            b d d d b b d 5 5 4 4 4 4 4 b . 
            b b d 5 5 5 b 5 5 5 5 5 5 b . . 
            c d c 5 5 5 5 d 5 5 5 5 5 5 b . 
            c b d c d 5 5 b 5 5 5 5 5 5 b . 
            . c d d c c b d 5 5 5 5 5 d b . 
            . . c b d d d d d 5 5 5 b b . . 
            . . . c c c c c c c c b b . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . b 5 b . . . . . 
            . . . . . . . . . b 5 b . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 5 5 5 5 5 b . . . 
            . . . . b b 5 d 1 f 5 5 d f . . 
            . . . . b 5 5 1 f f 5 d 4 c . . 
            . . . . b 5 5 d f b d d 4 4 . . 
            b b b b d 5 5 5 5 5 4 4 4 4 4 b 
            b d d 5 b b d 5 5 4 4 4 4 4 c . 
            c d c 5 5 5 5 d 5 5 5 5 5 5 b . 
            c b d c d 5 5 b 5 5 5 5 5 5 b . 
            . c d d c c b d 5 5 5 5 5 d b . 
            . . c b d d d d d 5 5 5 b b . . 
            . . . c c c c c c c c b b . . . 
            . . . . . . . . . . . . . . . . 
            `],
        500,
        true
        )
        last_time_in_idle = game.runtime()
    }
    if (controller.up.isPressed()) {
        state = "Jumping"
    }
    if (game.runtime() - last_time_in_idle > 10000) {
        state = "Sleeping"
    }
    if (controller.right.isPressed() || controller.left.isPressed()) {
        state = "Waddling"
    }
}
function Jumping_state () {
    if (first_time) {
        duck.vy = -175
        duck.setFlag(SpriteFlag.Ghost, true)
    }
    if (duck.vy > 0) {
        duck.setFlag(SpriteFlag.Ghost, false)
        state = "Falling"
    }
}
function Sleeping_State () {
    if (first_time) {
        animation.runImageAnimation(
        duck,
        [img`
            ..........b5b.......
            ffffff...b5b........
            ....f.bbbbbb........
            ..ff.bb55555b.......
            .f..bb5bbb55bb......
            f...b55bbb5d4c......
            fffff55cccdd44......
            .bbbd5555544444b....
            bdddbbd5544444b.....
            bbd555b555555b......
            cdc5555d555555b.....
            cbdcd55b555555b.....
            .cddccbd55555db.....
            ..cbddddd555bb......
            ...ccccccccbb.......
            ....................
            `,img`
            ffffff..............
            ....f.......b5b.....
            ..ff.......b5b......
            .f.....bbbbbbb......
            f......bb55555b.....
            fffff.bb5bbb55bb....
            ......b55bbb5d4c....
            ...bbbb55cccdd44....
            ..bdddd5555544444b..
            ..bbd5bbd5544444b...
            ..cdc555b555555bb...
            ..cbdcd55b555555b...
            ...cddccbd55555db...
            ....cbddddd555bb....
            .....ccccccccbb.....
            ....................
            `],
        500,
        true
        )
    }
    if (controller.B.isPressed()) {
        state = "Idle"
    }
}
function Falling_State () {
    if (first_time) {
        animation.runImageAnimation(
        duck,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . b 5 5 b . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 5 5 5 5 5 b . . . 
            . b b b b b 5 5 5 5 5 5 5 b . . 
            . b d 5 b 5 5 5 5 5 5 5 5 b . . 
            . . b 5 5 b 5 d 1 f 5 d 4 f . . 
            . . b d 5 5 b 1 f f 5 4 4 c . . 
            b b d b 5 5 5 d f b 4 4 4 4 b . 
            b d d c d 5 5 b 5 4 4 4 4 4 4 b 
            c b d d d d d 5 5 5 5 5 5 5 b . 
            . c d d d d d d 5 5 5 5 5 d b . 
            . . c b d d d d d 5 5 5 b b . . 
            . . . c c c c c c c c b b . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . b 5 b . . . 
            . . . . . . . . . b 5 b . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 5 5 5 5 5 b . . . 
            . b b b b b 5 5 5 5 5 5 5 b . . 
            . b d 5 b 5 5 5 5 5 5 5 5 b . . 
            . . b 5 5 b 5 d 1 f 5 d 4 f . . 
            . . b d 5 5 b 1 f f 5 4 4 c . . 
            b b d b 5 5 5 d f b 4 4 4 4 4 b 
            b d d c d 5 5 b 5 4 4 4 4 4 b . 
            c d d d c c b 5 5 5 5 5 5 5 b . 
            c b d d d d d 5 5 5 5 5 5 5 b . 
            . c d d d d d d 5 5 5 5 5 d b . 
            . . c b d d d d d 5 5 5 b b . . 
            . . . c c c c c c c c b b . . . 
            `],
        500,
        true
        )
    }
    if (duck.isHittingTile(CollisionDirection.Bottom)) {
        state = "Idle"
    }
}
let last_time_in_idle = 0
let duck: Sprite = null
let first_time = false
let state = ""
let prev_state = ""
prev_state = "Nothing"
state = "Idle"
first_time = true
duck = sprites.create(img`
    . . . . . . . . . . b 5 b . . . 
    . . . . . . . . . b 5 b . . . . 
    . . . . . . . . . b c . . . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . . . . b b 5 d 1 f 5 5 d f . . 
    . . . . b 5 5 1 f f 5 d 4 c . . 
    . . . . b 5 5 d f b d d 4 4 . . 
    b d d d b b d 5 5 5 4 4 4 4 4 b 
    b b d 5 5 5 b 5 5 4 4 4 4 4 b . 
    b d c 5 5 5 5 d 5 5 5 5 5 b . . 
    c d d c d 5 5 b 5 5 5 5 5 5 b . 
    c b d d c c b 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `, SpriteKind.Player)
duck.ay = 200
tiles.setTilemap(tiles.createTilemap(hex`0a0008000101010101010101010101010101010101010101010101010101010101010101010202020201010101010101010101010101010101010101010101010202020202020202020203030303030303030303`, img`
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . 2 2 2 2 . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 
    `, [myTiles.transparency16,myTiles.tile1,sprites.castle.tilePath2,sprites.castle.tilePath5], TileScale.Sixteen))
forever(function () {
    track_prev_state()
    duck.say(state)
    if (state == "Idle") {
        Idiling_State()
    } else if (state == "Jumping") {
        Jumping_state()
    } else if (false) {
        Falling_State()
    } else if (state == "Sleeping") {
        Sleeping_State()
    } else if (state == "Waddling") {
        Waddling_State()
    }
})
