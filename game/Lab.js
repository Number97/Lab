var world = []
var sizeX=200
var sizeY=200

var countdown = 6

var virus = []

var done = 0

var generation = 0
var winningGeneration = 0
var winningCountdownIndex = 0

var switcher = 0

function setup(){
	createCanvas(600,600)
	frameRate(5000)
	noLoop()

	var number;
	for(var j=0;j<sizeY;j++){
		world[j] = []
		for(var i=0;i<sizeX;i++){
			number=noise(i/20,j/20)
			world[j][i] = int(map(number,0,1,4,45));
		}
	}
	//introducing the beginning and the end
	world[0][0]=-2;
	world[sizeY-1][sizeX-1]=-3;

	virus[generation] = []
	virus[generation].push(new Particle(0,0,0,0))
	generation=1
	textSize(20)
	background(0);
	stroke(0);
	strokeWeight(0)
	//afficher les rectangles
	for(var i=0;i<sizeX;i++){
		for(var j=0;j<sizeY;j++){
			if((world[j][i]>=0)&&(done==1))
			{
				fill(255-world[j][i]*8,255-world[j][i]*8,0);
				//strokeWeight(1);
			}
			else if(world[j][i]>=0)
			{
				fill(255-world[j][i]*8);
				//strokeWeight(1);
			}
			else if(world[j][i]==-1)
			{
				fill(255);
				//strokeWeight(1);
			}
			else if(world[j][i]==-2)
			{
				fill(255,0,0);
				//strokeWeight(1);
			}
			else if(world[j][i]==-3)
			{
				fill(0,0,255);
				//strokeWeight(1);
			}
			else if(world[j][i]<=0)
			{
				fill(0,255+world[j][i]*8,0);
				//strokeWeight(1);
			}
			rect(i*width/sizeX,j*height/sizeY,width/sizeX,height/sizeY)
			//fill(200,0,200)
			//text(abs(world[j][i])-4,i*width/sizeX,j*height/sizeY,width/sizeX,height/sizeY)
		}
	}
}

function draw(){
	//basic expanding algorithm
	if(done==0)
	{
		advance()
	}
	else
	{
		stopTest()
	}
}

function advance()
{
	virus[generation] = []
	var x
	var y
	for(var i = 0 ; i < virus[generation-1].length ; i++)
	{
		x = virus[generation-1][i].x
		y = virus[generation-1][i].y

		print(virus[generation-1][i].cd)

		if(virus[generation-1][i].cd>0)
		{
			virus[generation].push(new Particle(virus[generation-1][i].x,virus[generation-1][i].y,i,virus[generation-1][i].cd-1))
		}
		else
		{
			if(x > 0)
			{
				if((world[y][x-1] >= 0) && (world[y][x-1] <= 25))
				{
					virus[generation].push(new Particle(x-1,y,i,abs(world[y][x-1])*3))
					world[y][x-1] = -world[y][x-1]
					fill(0,255+world[y][x-1]*8,0);
					rect((x-1)*width/sizeX,y*height/sizeY,width/sizeX,height/sizeY)
				}
			}
			if(y > 0)
			{
				if((world[y-1][x] >= 0) && (world[y-1][x] <= 25))
				{
					virus[generation].push(new Particle(x,y-1,i,abs(world[y-1][x])*3))
					world[y-1][x] = -world[y-1][x]
					fill(0,255+world[y-1][x]*8,0);
					rect((x)*width/sizeX,(y-1)*height/sizeY,width/sizeX,height/sizeY)
				}
			}

			if(switcher == 1)
			{
				if(x < sizeX-1)
				{
					if((world[y][x+1] >= 0) && (world[y][x+1] <= 25))
					{
						virus[generation].push(new Particle(x+1,y,i,abs(world[y][x+1])*3))
						world[y][x+1] = -world[y][x+1]
						fill(0,255+world[y][x+1]*8,0);
						rect((x+1)*width/sizeX,(y)*height/sizeY,width/sizeX,height/sizeY)
					}
					else if(world[y][x+1] == -3)
					{
						winningGeneration=generation-1
						winningCountdownIndex=i
						done = 1
						i=virus[generation-1].length
					}
				}
				if(y < sizeY-1)
				{
					if((world[y+1][x] >= 0) && (world[y+1][x] <= 25))
					{
						virus[generation].push(new Particle(x,y+1,i,abs(world[y+1][x])*3))
						world[y+1][x] = -world[y+1][x]
						fill(0,255+world[y+1][x]*8,0);
						rect((x)*width/sizeX,(y+1)*height/sizeY,width/sizeX,height/sizeY)
					}
					else if(world[y+1][x] == -3)
					{
						winningGeneration=generation-1
						winningCountdownIndex=i
						done = 1
						i=virus[generation-1].length
					}
				}	
			}

			if(switcher == 0)
			{
				if(y < sizeY-1)
				{
					if((world[y+1][x] >= 0) && (world[y+1][x] <= 25))
					{
						virus[generation].push(new Particle(x,y+1,i,abs(world[y+1][x])*3))
						world[y+1][x] = -world[y+1][x]
						fill(0,255+world[y+1][x]*8,0);
						rect((x)*width/sizeX,(y+1)*height/sizeY,width/sizeX,height/sizeY)
					}
					else if(world[y+1][x] == -3)
					{
						winningGeneration=generation-1
						winningCountdownIndex=i
						done = 1
						i=virus[generation-1].length
					}
				}
				if(x < sizeX-1)
				{
					if((world[y][x+1] >= 0) && (world[y][x+1] <= 25))
					{
						virus[generation].push(new Particle(x+1,y,i,abs(world[y][x+1])*3))
						world[y][x+1] = -world[y][x+1]
						fill(0,255+world[y][x+1]*8,0);
						rect((x+1)*width/sizeX,(y)*height/sizeY,width/sizeX,height/sizeY)
					}
					else if(world[y][x+1] == -3)
					{
						winningGeneration=generation-1
						winningCountdownIndex=i
						done = 1
						i=virus[generation-1].length
					}
				}
			}
		}
	}

	if(switcher == 0)
	{
		swithcer = 1
	}
	if(switcher == 1)
	{
		switcher = 0
	}
	generation++
}

function stopTest()
{
	if(countdown!=0)
	{
		countdown--
	}
	else
	{
		if(winningGeneration==0)
		{
			countdown=-1
		}
		else
		{

			world[virus[winningGeneration][winningCountdownIndex].y][virus[winningGeneration][winningCountdownIndex].x]=abs(world[virus[winningGeneration][winningCountdownIndex].y][virus[winningGeneration][winningCountdownIndex].x])
			fill(255-world[virus[winningGeneration][winningCountdownIndex].y][virus[winningGeneration][winningCountdownIndex].x]*8,255-world[virus[winningGeneration][winningCountdownIndex].y][virus[winningGeneration][winningCountdownIndex].x]*8,0)
			rect((virus[winningGeneration][winningCountdownIndex].x)*width/sizeX,(virus[winningGeneration][winningCountdownIndex].y)*height/sizeY,width/sizeX,height/sizeY)
			winningCountdownIndex=virus[winningGeneration][winningCountdownIndex].previousGenIndex
			winningGeneration--
		}
	}
}

function keyPressed()
{
	if(key == 'q')
	{
		noLoop()
	}
	if(key == 's')
	{
		loop()
	}
}