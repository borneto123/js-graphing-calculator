import { Dot } from "./dot.js";
import { Func } from "./function.js";
const width = 1000;
const height = 800;

let c = document.getElementById("canv");
/**@type {CanvasRenderingContext2D} */
export let ctx = c.getContext("2d");



export let origin = {
    x:width/2,
    y:height/2
}
let data = {
    width :width,
    height : height,
    scale : 50,

}

let point = [];
let range;
let nov = true;
let dif = parseInt(document.getElementById("dif").value)/100;


range = parseInt(document.getElementById("range").value)/10000;
data.scale = parseInt(document.getElementById("scale").value);

const getFun = () =>{
    nov = document.getElementById("good").checked ;
    //console.log(nov);
    return document.getElementById("ex").value;
}

const generatePoint= () =>{
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

    }
    console.log("Point:"+point.length);
}

const draw = () =>{
    for(let i=0;i<point.length-1; i++){
        Dot.DrawLine(point[i],point[i+1]);
    }
}

const sliderRefresh= () =>{
    range = parseInt(document.getElementById("range").value)/10000;
    data.scale = parseInt(document.getElementById("scale").value);
    dif = parseInt(document.getElementById("dif").value)/100;
    ctx.reset();
    point = [];
    generatePoint();
    draw();
   // console.log(`Range:${range}`)
    //console.log(`Scale:${data.scale}`)
    //console.log(`Dif:${dif}`)

}

export const test = () =>{

    let dot_A = new Dot(data);
    let dot_B = new Dot(data);

    dot_A.setCoord(1,1);
    dot_B.setCoord(1,2);

   // Dot.DrawLine(dot_A,dot_B);
    generatePoint();
    draw();
    console.log(point)
}

document.getElementById("range").addEventListener('input',sliderRefresh);
document.getElementById("scale").addEventListener('input',sliderRefresh);
document.getElementById("dif").addEventListener('input',sliderRefresh);
document.getElementById("gumb").addEventListener('click',sliderRefresh);

test()