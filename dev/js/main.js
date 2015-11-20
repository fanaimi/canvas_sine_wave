/**
 * @author      fanaimi, emiliano fantasia
 * @file        main => output
 * @desc        playing with canvas and trigonometry
 * @inspiration http://krazydad.com/tutorials/circles/
 *      x = cx + cos(θ) R
 *      y = cy + sin(θ) R
 */

(function(){
var
    c1 = document.getElementById("c1"),
    ctx1 = c1.getContext("2d"),
    w = c1.width,
    h = c1.height,
    af = null,
    c = 0,

    degToRad = function(deg){
        return deg * (Math.PI / 180);
    }, //degToRad

    rDot = null,

    RedDot = function(x, y, r, ctx, cx, cy, cRad, speedAngle){
        this.x = x;
        this.y = y;
        this.r = r;
        this.angle = 90;
        this.ctx = ctx;


        this.draw = function(){
            //console.log("drawing");
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, 3, 0, 2* Math.PI, true);
            this.ctx.fillStyle = "red";
            this.ctx.fill();
            this.ctx.closePath();


        }; // draw

        this.move = function(){
            this.angle += speedAngle;

            this.x = cx + Math.cos( degToRad( this.angle ) ) * cRad;
            this.y = cy + Math.sin( degToRad( this.angle ) ) * cRad;
        };

    }//redDot

    clearCanvas = function(ctx){
        ctx.clearRect(0,0,w,h);
    }

    drawC1 = function(){
        ctx1.beginPath();
        ctx1.arc(200, 200, 150, 0, 2* Math.PI, true);
        ctx1.strokeStyle = "#000";
        ctx1.lineWidth = 2;
        ctx1.stroke();
        ctx1.closePath();
    }, //drawC1


    drawCentre = function(){
        ctx1.beginPath();
        ctx1.arc(200, 200, 3, 0, 2* Math.PI, true);
        ctx1.fillStyle = "#000";
        ctx1.fill();
        ctx1.closePath();
    }, //drawCentre


    addRedDot = function(){
        rDot = new RedDot(250, 50, 5, ctx1, 200, 200, 150, 2);
        rDot.draw();
    }

    moveRedDot = function(){
        rDot.move();
        rDot.draw();
    }, // moveRedDot

    drawGuide = function(){
        ctx1.beginPath()
        ctx1.moveTo(rDot.x, rDot.y);
        ctx1.lineTo(w, rDot.y);
        ctx1.strokeStyle = "blue";
        ctx1.lineWidth = 1;
        ctx1.stroke();
        ctx1.beginPath()

    }

    playLoop = function () {

        clearCanvas(ctx1);
        drawC1();
        drawCentre();
        moveRedDot();
        drawGuide();
        //c+=1;
        //console.log(c);
        af = window.requestAnimationFrame(playLoop)
    }, //playLoop


    init = function(){

        addRedDot();
        playLoop();
    } // init
;

window.addEventListener("load", init);
})();
