import { origin, ctx, data, getFun} from "./main.js";
import { Func } from "./function.js";
export class Dot{
    constructor(data){
        this.width = data.width;
        this.height = data.height;
        this.scale = data.scale;
    }

    setCoord(x, y){
        this.x = x;
        this.y = y;

        this.canvas_x = Math.floor(origin.x + this.scale*x);
        this.canvas_y = Math.floor(origin.y - this.scale*y);
    }

    /**
     * 
     * @param {Dot} A 
     * @param {Dot} B 
     */
    static DrawLine(A, B){
        ctx.beginPath()
        ctx.moveTo(A.canvas_x, A.canvas_y);
        ctx.lineTo(B.canvas_x, B.canvas_y);
        ctx.lineWidth = 2;
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke();
        ctx.closePath
    }
    /**
     * 
     * @param {Dot} A 
     * @param {Dot} B 
     */
    static k(A,B){
        //return (A.y - B.y) / (A.x - B.x);
        //return (A.y - B.y);
        let dis = Math.sqrt(Math.pow(A.canvas_x-B.canvas_x,2)+Math.pow(A.canvas_y-B.canvas_y,2))
        //console.log(dis);
        return dis;
    }

    /**
     * 
     * @param {Array.<Dot>} dots 
     */
    static drawLineFromArray(dots){
        let path = new Path2D();
        path.moveTo(dots[0].canvas_x,dots[0].canvas_y);
        for(let i=1; i<dots.length; i++){
            path.lineTo(dots[i].canvas_x,dots[i].canvas_y);
        }
        //path.closePath();
        ctx.lineWidth = 2;
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        
        ctx.stroke(path);
        
    }
    /**
     * 
     * @param {Array.<Dot>} dots 
     */
    static drawCurveFromArray(dots, parX, parY){
        let path = new Path2D();
        
        for(let i=1; i<dots.length; i++){
            path.moveTo(dots[i-1].canvas_x,dots[i-1].canvas_y);
            let cp = new Dot(data);
            //let cpX = ((dots[i-1].x+dots[i].x)/2) - 0.75*dots[i-1].x - 0.25* dots[i].x ;
            let cpX = ((dots[i-1].x+dots[i].x)/2)
            let rezY = Func.racunFunkcija(getFun(),cpX);

            let cpY = rezY - (dots[i-1].y+dots[i].y)/2 + (dots[i-1].y+dots[i].y)/2;
            cp.setCoord(cpX,cpY);
            path.quadraticCurveTo(cp.canvas_x,cp.canvas_y,dots[i].canvas_x,dots[i].canvas_y);
        }
        //.closePath();
        ctx.lineWidth = 2;
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        
        ctx.stroke(path);
        
    }
}