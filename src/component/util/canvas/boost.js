export default class Boost{
    constructor(pos,length,speed,brush,color){
        this.pos={
            x:pos.x,
            y:pos.y
        }
        this.speed=speed;
        this.brush=brush;
        this.color=color;
        this.length=length;
        this.lengthVelocity=1;
        this.drop=false;
        this.maxLenght=40+Math.random()*40;
    }

    draw(){
        this.brush.fillStyle=this.color;
        this.brush.fillRect(this.pos.x,this.pos.y,10,this.length);
    }

    tick(){
        this.pos.y+=this.speed;
        if(this.length>this.maxLenght){
            this.lengthVelocity=-this.speed;
            this.speed*=3;
            this.drop=true;
         }
         this.length+=this.lengthVelocity*3;

    }
}