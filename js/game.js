function validateNPC(npc, type = Enemy)
{
    return npc == null || npc.y >= g_canvas.height ? 
        new type (
            getRandomInt(0, g_canvas.width),
            - getRandomInt(200,g_canvas.height),
            getRandomInt(1, 6),
            getRandomInt(3,10)
        )
        : npc;
}
getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
function gameInit()
{
    //не нравится
    uploadImages();
    document.body.onkeydown = (event) => {
        if (event.which == UP || event.which == ANOTHERUP)
            g_direction = UP;
        if (event.which == LEFT || event.which == ANOTHERLEFT)
            g_direction = LEFT;
        if (event.which == DOWN || event.which == ANOTHERDOWN)
            g_direction = DOWN;
        if (event.which == RIGHT || event.which == ANOTHERRIGHT)
            g_direction = RIGHT;
    }
    document.body.onkeyup = (event) => g_direction = STAND;
    window.onload = gameMenu;
}
function gameMenu()
{   
    g_ctx.fillStyle = "#111111";
    g_ctx.fillRect(0, 0, g_canvas.width, g_canvas.height); 
    let phrases = ["Herman Terekhov's girl","Lexa228 aka Lehych","Rostiks"];
    for (let i = 0; i < numberOfCars; i++)
    {
        g_ctx.drawImage(images['car'+(i+1)], g_canvas.width / 20, g_canvas.height / numberOfCars * i + g_canvas.height / (numberOfCars * 7), g_canvas.height / numberOfCars / 1.5, g_canvas.height / numberOfCars / 1.5 * 0.538);
        g_ctx.fillStyle = "#555555";
        g_ctx.fillStyle = "#ffffff";
        g_ctx.font = "Normal " + g_canvas.height / 25 + "pt Arial";
        g_ctx.fillText(phrases[i], g_canvas.width / 20 * 8, g_canvas.height / numberOfCars * i + g_canvas.height / (numberOfCars * 7) + 20);
    }
    document.body.onclick = function (event)
    {
        if (event.clientY < g_canvas.height / numberOfCars)
            currentCar = new Car(images['car1'], g_canvas.width / 8, g_canvas.width / 8 * 1.18, 3, 4, 10);
        else if (event.clientY < g_canvas.height / numberOfCars * 2)
            currentCar = new Car(images['car2'], g_canvas.width / 8, g_canvas.width / 8 * 0.47, 10, 7, 15);
        else
            currentCar = new Car(images['car3'], g_canvas.width / 8, g_canvas.width / 8 * 1.44, 20, 7, 20);
        document.body.ontouchmove = (event) => g_direction = TOUCH, currentCar.setDestination(event.clientX, event.clientY);
        gameStart();
    }
}
function gameStart()
{
    enemies = [];
    helper = null;
    g_counter.reset();
    document.body.onclick = function (event) 
    {
        g_pauseButton.clicked(event.clientX, event.clientY);
    }
    gameContinue();
}
function gameContinue()
{
    g_intervalId = setInterval(gameTick, 1000 / FPS);
    g_pauseButton.init();
}
function gamePause()
{
    clearInterval(g_intervalId);
}
function gameTick()
{
    currentCar.cornerX = currentCar.x + currentCar.width;
    currentCar.cornerY = currentCar.y + currentCar.height;
    road.show();
    currentCar.move();
    helper = this.validateNPC(helper, Helper);
    helper.move();
    if(currentCar.collision(helper)) helper.hide(), g_counter.inc();
    for(let i = 0; i < 4; i++)
    {
	    enemies[i] = this.validateNPC(enemies[i]);
	    enemies[i].move();
	    if(currentCar.collision(enemies[i]))
	    {
	    	gameOver();
	    	return;
        }
	}
    g_pauseButton.draw();  
    g_counter.draw();
}
function gameOver()
{
    clearInterval(g_intervalId);
    road.show();
    g_ctx.fillStyle = "#111111";
    g_ctx.fillRect(50, 50, g_canvas.width - 100, g_canvas.height - 100);
    g_ctx.fillStyle = "#ffffff";
    g_ctx.font = "Normal " + g_canvas.width / 12.5 + "pt Arial";
    g_ctx.fillText('odnoznachno', g_canvas.width / 6, g_canvas.height/2);
    g_ctx.font = "Bold " + g_canvas.width / 10 + "pt Arial";
    g_ctx.fillText("dva balla", g_canvas.width / 6, g_canvas.height / 2 + g_canvas.height / 7);
    g_ctx.fillStyle = "#222222";
    g_ctx.fillRect(g_canvas.width / 3, g_canvas.height / 6 * 4, g_canvas.width / 3, 50);
    g_ctx.fillStyle = "#ffffff";
    g_ctx.font = "Normal " + g_canvas.width / 30 + "pt Arial";
    g_ctx.fillText("Peresdat'", g_canvas.width / 3, g_canvas.height / 4 * 2.85);
    document.body.onclick = function(event)
    {
        if (event.clientX > g_canvas.width / 3 && event.clientX < g_canvas.width / 3 * 2 && event.clientY > g_canvas.height / 6 * 4 && event.clientY < g_canvas.height / 6 * 4 + 50)
            gameMenu();
    }
}