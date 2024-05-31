import { Dot } from "./dot.js";
import { Func } from "./function.js";
const width = 800;
const height = 600;

let c = document.getElementById("canv");
/**@type {CanvasRenderingContext2D} */
export let ctx = c.getContext("2d");



export let origin = {
    x:width/2,
    y:height/2
}
export let data = {
    width :width,
    height : height,
    scale : 50,

}

let point = [];
let range;
let nov = true;

let curve = true;

let dif = parseInt(document.getElementById("dif").value)/100;

let parmX = parseInt(document.getElementById("parmX").value)/1000;
let parmY = parseInt(document.getElementById("parmY").value)/1000;


range = parseInt(document.getElementById("range").value)*10;
data.scale = parseInt(document.getElementById("scale").value);

export const getFun = () =>{
    nov = document.getElementById("good").checked ;
    curve = document.getElementById("curve").checked ;
    //console.log(nov);
    return document.getElementById("ex").value;
}

const generatePoint= () =>{
    let interval = width/data.scale;
    range = interval/range;
    for(let i=-interval/2; i<=interval/2; i+=range){
        let temp = new Dot(data);
        temp.setCoord(i,Func.racunFunkcija(getFun(),i));
        
        let idx = point.length;
        if(nov && idx >=2){
            if(Dot.k(point[idx-1],temp) < dif){
                continue;
            }
        }
        point.push(temp);

    }
    //console.log("Point:"+point.length);
    document.getElementById("points").innerHTML = `Rendered Points:${point.length}`
}


const randomGeneratePoint= () =>{
    let interval = width/data.scale;
    for(let i=-interval/2; i<=interval/2; i+=range){
        let temp = new Dot(data);
        temp.setCoord(i,Func.racunFunkcija(getFun(),i));
        
        let idx = point.length;
        if(nov && idx >=2){
            if(Dot.k(point[idx-1],temp) < dif){
                continue;
            }
        }
        point.push(temp);
        range = getRandomNumber(range/1.5,range*1.5);
    }
    //console.log("Point:"+point.length);
    document.getElementById("points").innerHTML = `Rendered Points:${point.length}`
}


function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

const draw = () =>{
    
    for(let i=0;i<point.length-1; i++){
        Dot.DrawLine(point[i],point[i+1]);
    }
}

const sliderRefresh= () =>{
    range = parseInt(document.getElementById("range").value)*10;
    data.scale = parseInt(document.getElementById("scale").value);
    dif = parseInt(document.getElementById("dif").value)/100;
    parmX = parseInt(document.getElementById("parmX").value)/1000;
    parmY = parseInt(document.getElementById("parmY").value)/1000;
    ctx.reset();
    point = [];
    generatePoint();
   //randomGeneratePoint();
  //  draw();
    console.log(curve)
    if(curve)
        Dot.drawCurveFromArray(point,parmX,parmY);
    else
        Dot.drawLineFromArray(point);
    console.log(`ParmX:${parmX}`)
    console.log(`ParmY:${parmY}`)
   // console.log(`Range:${range}`)
    //console.log(`Scale:${data.scale}`)
    //console.log(`Dif:${dif}`)
    
}

export const test = () =>{
    ctx.translate(0.5, 0.5);
    let dot_A = new Dot(data);
    let dot_B = new Dot(data);

    dot_A.setCoord(0,0);
    dot_B.setCoord(1,2);

    // Dot.DrawLine(dot_A,dot_B);
    generatePoint();
    Dot.drawLineFromArray(point);
    console.log(point)

    // ctx.beginPath();
    // ctx.arc(origin.x, origin.y, 10, 0, 2 * Math.PI);
    // ctx.stroke();

}




document.getElementById("range").addEventListener('input',sliderRefresh);
document.getElementById("scale").addEventListener('input',sliderRefresh);
document.getElementById("dif").addEventListener('input',sliderRefresh);
document.getElementById("gumb").addEventListener('click',sliderRefresh);
document.getElementById("good").addEventListener('input',sliderRefresh);


document.getElementById("ex").addEventListener('input',sliderRefresh);

document.getElementById("curve").addEventListener('input',sliderRefresh);
document.getElementById("parmX").addEventListener('input',sliderRefresh);
document.getElementById("parmY").addEventListener('input',sliderRefresh);
test()