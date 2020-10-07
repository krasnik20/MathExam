class Car {
    constructor(img, forwardSpeed, backwardSpeed, turnSpeed) {
        this.img = img;
        this.width = characterSize;
        this.height = (this.width * img.height) / img.width;
        this.x = g_canvas.width / 2 - this.width / 2;
        this.y = (g_canvas.height * 4) / 5;
        this.forwardSpeed = forwardSpeed;
        this.backwardSpeed = backwardSpeed;
        this.turnSpeed = turnSpeed;
        console.log(this.img.height);
        console.log(this.img.width);
    }
    move() {
        if (g_direction == LEFT) this.x -= this.turnSpeed;
        if (g_direction == RIGHT) this.x += this.turnSpeed;
        if (g_direction == UP) this.y -= this.forwardSpeed;
        if (g_direction == DOWN) this.y += this.backwardSpeed;
        if (g_direction == TOUCH) {
            if (Math.abs(this.destX - this.x) > this.turnSpeed)
                this.x +=
                    this.destX - this.x > 0 ? this.turnSpeed : -this.turnSpeed;
            if (Math.abs(this.destY - this.y) > this.forwardSpeed)
                this.y +=
                    this.destY - this.y > 0
                        ? +this.backwardSpeed
                        : -this.forwardSpeed;
        }
        if (this.y > g_canvas.height - 20 - this.height)
            this.y -= this.backwardSpeed;
        if (this.y < 50) this.y += this.forwardSpeed;
        if (this.x < 10) this.x += this.turnSpeed;
        if (this.x > g_canvas.width - 10 - this.width) this.x -= this.turnSpeed;
        g_ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    collision(enemy) {
        let error = this.width / 12;
        if (
            this.x <= enemy.cornerX - error &&
            this.x >= enemy.x + error &&
            ((this.cornerY >= enemy.y + error &&
                this.cornerY <= enemy.cornerY - error) ||
                (this.y >= enemy.y + error && this.y <= enemy.cornerY - error))
        )
            return true;
        if (
            this.cornerX <= enemy.cornerX - error &&
            this.cornerX >= enemy.x + error &&
            ((this.cornerY >= enemy.y + error &&
                this.cornerY <= enemy.cornerY - error) ||
                (this.y >= enemy.y + error && this.y <= enemy.cornerY - error))
        )
            return true;
        return false;
    }
    setDestination(x, y) {
        this.destX = x;
        this.destY = y;
    }
}
