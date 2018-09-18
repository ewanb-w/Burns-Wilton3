//author: Ewan Burns-Wilton
//date: 9/17/18
//description: This program adds on to the rotating square program. My version allows the user to change
//the color of the square to black, green, pink, and back to red.
//proposed points (out of 15): 13/15 - I did everything but use a uniform variable
//within my fragment shader.
//Pressing the g key turns the square green. Pressing the p key turns the square pink.

"use strict";

var gl;

var theta = 0.0;
var speed = 0.05;
var thetaLoc;

var direction = true;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var vertices = [
        vec2(  0,  1 ),
        vec2(  -1,  0 ),
        vec2( 1,  0 ),
        vec2(  0, -1 )
    ];

    var colors = [
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0)
    ];

    // Load the data into the GPU
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );


    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation( program, "theta" );

    //Slider to change speed
    document.getElementById("slider").onchange = function(event) {
        speed = parseFloat(event.target.value);
    };

    //Turn square red again
    document.getElementById("Direction").onclick = function() {
        console.log("pressed button");
        // direction = !direction;
        colors = [
            vec3(1.0, 0.0, 0.0),
            vec3(1.0, 0.0, 0.0),
            vec3(1.0, 0.0, 0.0),
            vec3(1.0, 0.0, 0.0)
        ];

        var cBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

        var vColor = gl.getAttribLocation( program, "vColor" );
        gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vColor );
    }; 

    // Initialize event handler (menu)
    document.getElementById("Controls" ).onclick = function(event) {
        switch( event.target.index ) {
         case 0:
            direction = !direction;
            break;
         case 1: //Turn square blue
                colors = [
                    vec3(0.0, 0.0, 1.0),
                    vec3(0.0, 0.0, 1.0),
                    vec3(0.0, 0.0, 1.0),
                    vec3(0.0, 0.0, 1.0)
                ];

                var cBuffer = gl.createBuffer();
                gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
                gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

                var vColor = gl.getAttribLocation( program, "vColor" );
                gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
                gl.enableVertexAttribArray( vColor );
                break;
                
         case 2: //Turn square black
                colors = [
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0),
                    vec3(0.0, 0.0, 0.0)
                ];

                var cBuffer = gl.createBuffer();
                gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
                gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

                var vColor = gl.getAttribLocation( program, "vColor" );
                gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
                gl.enableVertexAttribArray( vColor );
                break;
        }
    };

    // Initialize event handler (key codes)
    window.onkeydown = function( event ) {
        var key = String.fromCharCode(event.keyCode);
        switch( key ) {
          case 'G': //Turn square green
          case 'g':
            colors = [
                vec3(0.0, 1.0, 0.0),
                vec3(0.0, 1.0, 0.0),
                vec3(0.0, 1.0, 0.0),
                vec3(0.0, 1.0, 0.0)
            ];

            var cBuffer = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
            gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

            var vColor = gl.getAttribLocation( program, "vColor" );
            gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
            gl.enableVertexAttribArray( vColor );
            break;

          case 'P': //Turns square pink
          case 'p':
            colors = [
                vec3(1.0, 0.0, 1.0),
                vec3(1.0, 0.0, 1.0),
                vec3(1.0, 0.0, 1.0),
                vec3(1.0, 0.0, 1.0)
            ];

            var cBuffer = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
            gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

            var vColor = gl.getAttribLocation( program, "vColor" );
            gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
            gl.enableVertexAttribArray( vColor );
            break;
        }
    };

    render();
};

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );

    if (direction == true)
    {
        theta += speed;
    }
    else 
    {
        theta -= speed;
    }
    gl.uniform1f(thetaLoc, theta);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    window.requestAnimFrame(render);
}
