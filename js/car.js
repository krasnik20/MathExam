class Car {
    constructor(img, speed) {
        this.img = img;
        this.width = characters.size;
        this.height = (this.width * img.height) / img.width;
        this.x = g_canvas.width / 2 - this.width / 2;
        this.y = (g_canvas.height * 4) / 5;
        this.speed = speed;
    }
    move() {
        if (keys["left"]) this.x -= this.speed;
        if (keys["right"]) this.x += this.speed;
        if (keys["up"]) this.y -= this.speed;
        if (keys["down"]) this.y += this.speed;
        if (keys["touch"]) {
            let centerX = this.x + this.width / 2;
            let centerY = this.y + this.height / 2;
            if (Math.abs(this.destX - centerX) > this.speed)
                this.x += this.destX - centerX > 0 ? this.speed : -this.speed;
            if (Math.abs(this.destY - centerY) > this.speed)
                this.y += this.destY - centerY > 0 ? this.speed : -this.speed;
        }
        if (this.y > g_canvas.height - 20 - this.height)
            this.y -= this.speed;
        if (this.y < 50) this.y += this.speed;
        if (this.x < 10) this.x += this.speed;
        if (this.x > g_canvas.width - 10 - this.width) this.x -= this.speed;
        g_ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.cornerX = this.x + this.width;
        this.cornerY = this.y + this.height;
    }
    collision(enemy) {
        let errorw = 0;
        let errorh = 0;
        if (this.x <= enemy.cornerX - errorw &&
            this.x >= enemy.x + errorw &&
            (this.cornerY >= enemy.y + errorh && this.cornerY <= enemy.cornerY - errorh ||
                this.y >= enemy.y + errorh && this.y <= enemy.cornerY - errorh))
            return true;
        if (this.cornerX <= enemy.cornerX - errorw &&
            this.cornerX >= enemy.x + errorw &&
            (this.cornerY >= enemy.y + errorh && this.cornerY <= enemy.cornerY - errorh ||
                this.y >= enemy.y + errorh && this.y <= enemy.cornerY - errorh))
            return true;
        return false;
    }
    setDestination(x, y) {
        this.destX = x;
        this.destY = y;
    }
}
