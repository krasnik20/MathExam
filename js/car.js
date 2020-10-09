class Car {
    constructor(img, speed) {
        this.img = img;
        this.width = characters.size;
        this.height = (this.width * img.height) / img.width;
        this.x = g_canvas.width / 2 - this.width / 2;
        this.y = (g_canvas.height * 4) / 5;
        this.speed = speed;
        //console.log("Player:", this.height, " ", this.speed);
    }
    move() {
        if (g_direction == LEFT) this.x -= this.speed;
        if (g_direction == RIGHT) this.x += this.speed;
        if (g_direction == UP) this.y -= this.speed;
        if (g_direction == DOWN) this.y += this.speed;
        if (g_direction == TOUCH) {
            if (Math.abs(this.destX - this.x) > this.speed)
                this.x +=
                    this.destX - this.x > 0 ? this.speed : -this.speed;
            if (Math.abs(this.destY - this.y) > this.speed)
                this.y +=
                    this.destY - this.y > 0
                        ? +this.speed
                        : -this.speed;
        }
        if (this.y > g_canvas.height - 20 - this.height)
            this.y -= this.speed;
        if (this.y < 50) this.y += this.speed;
        if (this.x < 10) this.x += this.speed;
        if (this.x > g_canvas.width - 10 - this.width) this.x -= this.speed;
        g_ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    collision(enemy) {
        let errorw = this.width / 15;
        let errorh = this.height / 25;
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
