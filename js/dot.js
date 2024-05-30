import { origin, ctx} from "./main.js";
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
}