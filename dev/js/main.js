/**
 * @author      fanaimi, emiliano fantasia
 * @file        main => output
 * @desc        playing with canvas and trigonometry
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
    paused = false,
    angleSpeed = 1,

    degToRad = function(deg){
        return deg * (Math.PI / 180);
    }, //degToRad

    rDot = null,
    waveDots = [],
    waveSpeed = 2,

    WaveDot = function(x, y, ctx, waveSpeed, leftEdge){
        this.x = x;
        this.y = y;
        this.r = 4;
        this.ctx = ctx;
        this.waveSpeed = waveSpeed;

        this.draw = function(){
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.r, 0, 2* Math.PI, true);
            this.ctx.fillStyle = "red";
            this.ctx.fill();
            this.ctx.closePath();
        }; // draw


        this.move = function(){
            //if(this.x > leftEdge - this.r){
            if(this.x < w + this.r){
                this.x += this.waveSpeed;
            } else if( this.x < 400 || this.x < w + this.r ){
                for (var l in waveDots) {
                    if (waveDots[l] == this) {
                        waveDots.splice(l, 1)
                    }
                }
            }
        };//move
    }// WaveDot,

    RedDot = function(x, y, r, ctx, cx, cy, cRad, speedAngle){
        this.x = x;
        this.y = y;
        this.r = r;
        this.angle = 90;
        this.ctx = ctx;
        this.speedAngle = speedAngle;


        this.draw = function(){
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, 3, 0, 2* Math.PI, true);
            this.ctx.fillStyle = "red";
            this.ctx.fill();
            this.ctx.closePath();
        }; // draw

        this.move = function(){
            this.angle += this.speedAngle;

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
        ctx1.strokeStyle = "green";
        ctx1.lineWidth = 2;
        ctx1.stroke();
        ctx1.closePath();
    }, //drawC1


    drawCentre = function(){
        ctx1.beginPath();
        ctx1.arc(200, 200, 3, 0, 2* Math.PI, true);
        ctx1.fillStyle = "red";
        ctx1.fill();
        ctx1.closePath();
    }, //drawCentre


    addRedDot = function(){
        rDot = new RedDot(250, 50, 5, ctx1, 200, 200, 150,angleSpeed);
        rDot.draw();
    }

    moveRedDot = function(){
        rDot.move();
        rDot.draw();
    }, // moveRedDot

    drawGuide = function(){
        ctx1.beginPath()
        ctx1.moveTo(rDot.x, rDot.y);
        ctx1.lineTo(400, rDot.y);
        ctx1.strokeStyle = "blue";
        ctx1.lineWidth = 1;
        ctx1.stroke();
        ctx1.beginPath()

    },

    drawRadius = function(){
        ctx1.beginPath()
        ctx1.moveTo(200, 200);
        ctx1.lineTo(rDot.x, rDot.y);
        ctx1.strokeStyle = "blue";
        ctx1.lineWidth = 1;
        ctx1.stroke();
        ctx1.beginPath()
    }, //drawRadius


    addNewWaveDot = function () {
        var waveDot = new WaveDot(400, rDot.y, ctx1, waveSpeed, 400);
        waveDots.push(waveDot);
        waveDot.draw();
    }, //addNewWaveDot

    moveWaveDots = function () {
       /*
       ES6 for of
       for(let i of waveDots){
            i.move();
            i.draw();
        }*/
        for(var i in waveDots){
            waveDots[i].move();
            waveDots[i].draw();
        }
    }, // moveWaveDots

        drawGreyLines = function () {
            ctx1.beginPath()
            ctx1.moveTo(400, 0);
            ctx1.lineTo(400, h);
            ctx1.moveTo(0, 50);
            ctx1.lineTo(w, 50);

            ctx1.moveTo(0, 200);
            ctx1.lineTo(w, 200);

            ctx1.moveTo(200, 0);
            ctx1.lineTo(200, h);


            ctx1.moveTo(50, 0);
            ctx1.lineTo(50, h);


            ctx1.moveTo(350, 0);
            ctx1.lineTo(350, h);

            ctx1.moveTo(0, 350);
            ctx1.lineTo(w, 350);
            ctx1.strokeStyle = "lightgrey";
            ctx1.lineWidth = 1;
            ctx1.stroke();
            ctx1.closePath();
        }, // drawGreyLine


        playLoop = function () {

        clearCanvas(ctx1);
        drawGreyLines();
        drawC1();
        drawCentre();
        moveRedDot();
        drawRadius();
       drawGuide();

        addNewWaveDot();
        moveWaveDots();

        af = window.requestAnimationFrame(playLoop);
    }, //playLoop

    pauseLoop = function(){
        console.log("paused");
        window.cancelAnimationFrame(af);
    }, // pauseLoop

    bindBtns = function () {
        document.getElementById("pauseBtn")
            .addEventListener("click", function(){
                pauseLoop();
                paused = true;
            });


        document.getElementById("restoreBtn")
            .addEventListener("click", function(){
                if(paused){ playLoop(); paused = false}
            });

        //==================
        document.getElementById("slowAngleBtn")
            .addEventListener("click", function(){
                rDot.speedAngle --;
            });


        document.getElementById("pauseAngleBtn")
            .addEventListener("click", function(){
                rDot.speedAngle = 0;
            });

        document.getElementById("fastAngleBtn")
            .addEventListener("click", function(){
                rDot.speedAngle ++;
            });
        //==================

        document.getElementById("slowGridBtn")
            .addEventListener("click", function(){
                for(var i in waveDots){
                    waveDots[i].waveSpeed --;
                }
            });

        document.getElementById("pauseGridBtn")
            .addEventListener("click", function(){
                for(var i in waveDots){
                    waveDots[i].waveSpeed =0;
                }
            });

        document.getElementById("fastGridBtn")
            .addEventListener("click", function(){
                for(var i in waveDots){
                    waveDots[i].waveSpeed ++;
                }
            });
    }, //bindBtns



    init = function(){

        addRedDot();
        playLoop();
        bindBtns();
    } // init
;

    window.addEventListener("blur", pauseLoop);
window.addEventListener("load", init);
})();
