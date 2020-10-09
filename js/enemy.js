class NPC {
    constructor(x, y, speed) {
        this.speed = speed;
        this.x = x;
        this.y = y;
    }
    set img(img) {
        this._img = img;
        this.width = characters.size;
        this.height = this.width * img.height / img.width;
    }
    get img() {
        return this._img;
    }
    move() {
        if (this.cornerY > 0) {
            let dx = this.speed / 5 * (this.x - currentCar.x) / g_canvas.width;
            this.x -= dx;
            this.y += Math.sqrt(this.speed ** 2 - dx ** 2);
        } else this.y += this.speed;
        this.cornerX = this.x + this.width;
        this.cornerY = this.y + this.height;
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
        this.x -= g_canvas.width * 2;
    }
}
