import Stripe from './stripe';
import boost from './boost';
import Boost from './boost';
let brush;
let stripes=[];
let boosts=[];
const stripeSpeed=5;
const stripeLength=5;
function draw(){
    brush.clearRect(0,0,window.innerWidth,window.innerHeight);
    for(let i=0;i<stripes.length;i++){
        stripes[i].draw();
    }
    for(let i=0;i<boosts.length;i++){
        boosts[i].draw();
    }
}

function tick(){
    for(let i=0;i<stripes.length;i++){
        stripes[i].tick();
        if(stripes[i].length<=0) stripes.splice(i,1);
    }

    for(let i=0;i<boosts.length;i++){
        boosts[i].tick();
        if(boosts[i].drop){
            fire({x:boosts[i].pos.x+5,y:boosts[i].pos.y+boosts[i].length});
            boosts[i].drop=false;
        }
        if(boosts[i].length<=0) boosts.splice(i,1);
    }
}

function ignite(){
    tick();
    draw();
    requestAnimationFrame(ignite);
}

const colors=[
    "#00ff99",
    "#82589f",
    "#ff0055",
    "#fff200",
]

const fire=(pos)=>{

    stripes.push(new Stripe(pos,{x:0.5,y:0.5},5,10,1,brush,colors[Math.floor(Math.random()*colors.length)]));
    stripes.push(new Stripe(pos,{x:-0.5,y:0.5},5,10,1,brush,colors[Math.floor(Math.random()*colors.length)]));
    stripes.push(new Stripe(pos,{x:0.5,y:-0.5},5,10,1,brush,colors[Math.floor(Math.random()*colors.length)]));
    stripes.push(new Stripe(pos,{x:-0.5,y:-0.5},5,10,1,brush,colors[Math.floor(Math.random()*colors.length)]));

}

const liftOff=(pos)=>{

    boosts.push(new Boost(pos,1,1,brush,colors[Math.floor(Math.random()*colors.length)]));
}

const setup=(ctx)=>{
brush=ctx;
}
export {setup,ignite,fire,liftOff};