class NPC {
    constructor(x, y, speed) {
        this.speed = speed;
        this.x = x;
        this.y = y;
    }
    set img(img) {
        this._img = img;
        this.width = characterSize;
        this.height = (this.width * img.height) / img.width;
    }
    get img() {
        return this._img;
    }
    move() {
        if (currentCar.x - this.x >= this.speed) this.x += this.speed / 10;
        if (currentCar.x - this.x <= -this.speed) this.x -= this.speed / 10;
        this.cornerX = this.x + this.width;
        this.cornerY = this.y + this.height;
        this.y += this.speed;
        g_ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
class Enemy extends NPC {
    constructor(x, y, key, speed) {
        super(x, y, speed);
        this.img = images["enemy" + key];
    }
}
class Helper extends NPC {
    constructor(x, y, key, speed) {
        super(x, y, speed);
        this.img = images["helper1"];
    }
    hide() {
        this.x -= g_canvas.width;
    }
}
