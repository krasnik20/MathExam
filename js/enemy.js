class NPC 
{
    constructor(x, y, speed)
    {
        this.img = new Image();
        this.width = g_canvas.width / 6;
        this.height = this.width * 1.4;
        this.speed = speed;
        this.x = x;
        this.y = y;
    }
    move()
    {
        this.cornerX = this.x + this.width;
        this.cornerY = this.y + this.height;
        this.y += this.speed;
        g_ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
class Enemy extends NPC
{
    constructor(x, y, key, speed)
    {
        super(x,y,speed);
        this.img.src = "images/enemycar" + key + ".png";
    }
}
class Helper extends NPC
{
    constructor(x, y, key, speed)
    {
        super(x,y, speed);
        this.img.src = "images/helper1.png"
    }
    hide()
    {
        this.x*=-1;
    }
}