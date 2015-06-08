/*
var cv = require('opencv');

var processingImage = false;

var lastPng;
var camInterval = 80;
var ioS = require('socket.io-client');
var socketS = ioS.connect("http://192.168.137.1:8080");

module.exports = function (socket) {

    socketS.on('frame1', function (data) {

        lastPng=data;
        if(data.realData==true){

            if (( !processingImage ) && lastPng) {
                processingImage = true;
                cv.readImage(lastPng, function (err, im) {
                    var opts = {};
                    im.detectObject(cv.FACE_CASCADE, opts, function (err, faces) {

                            var face;
                            var biggestFace;

                            for (var k = 0; k < faces.length; k++) {
                                face = faces[k];

                                if (!biggestFace || biggestFace.width < face.width) biggestFace = face;

                                im.rectangle([face.x, face.y], [face.x + face.width, face.y + face.height], [0, 255, 0], 2);
                            }
                            socket.emit('frame', {buffer: im.toBuffer()});

                            processingImage = false;
                            //im.save('/tmp/salida.png');

                        }, opts.scale, opts.neighbors
                        , opts.min && opts.min[0], opts.min && opts.min[1]);
                });
            };
            console.log(data.buffer);
            socket.emit('frameV',{buffer:data.buffer});
        }
    });
};
*/



var cv = require('opencv');
var png = null;
var processingImage = false;
var video = require('socket.io').listen(3003);
//video.sockets.on('connection', require('./../lib/routes/socket'));
var arDrone = require('ar-drone');
var lastPng;
var camInterval = 80;
var client = arDrone.createClient();
//require('ar-drone-png-stream')(client, { port: 8000 });


    png = client.getPngStream();
    png.on('error', function (err) {
        console.error('png stream ERROR: ' + err);
    }).on('data', function(pngBuffer) {
        console.log("got image");
        lastPng = pngBuffer;
    });



video.sockets.on('connection', function (socket) {

    setInterval(function() {
        if (( !processingImage ) && lastPng) {
            processingImage = true;
            cv.readImage(lastPng, function (err, im) {
                var opts = {};
                im.detectObject(cv.FACE_CASCADE, opts, function (err, faces) {

                        var face;
                        var biggestFace;

                        for (var k = 0; k < faces.length; k++) {
                            face = faces[k];

                            if (!biggestFace || biggestFace.width < face.width) biggestFace = face;

                            im.rectangle([face.x, face.y], [face.x + face.width, face.y + face.height], [0, 255, 0], 2);
                        }
                        socket.emit('frame', {buffer: im.toBuffer()});

                        processingImage = false;
                        //im.save('/tmp/salida.png');

                    }, opts.scale, opts.neighbors
                    , opts.min && opts.min[0], opts.min && opts.min[1]);
            });
        };
    },camInterval);
});

var iof = require('socket.io').listen(3002);
var batteryLevel=0;
//io.set('log level', 1);

iof.sockets.on('connection', function (socket) {

    if(typeof client =='undefined'){
        console.log("Drone client is undefined");
    }
    if(typeof client != 'undefined'){
        client.config('general:navdata_demo', 'FALSE');

        setInterval(function(){

            if(typeof client.battery() != 'undefined' ) {
                batteryLevel = client.battery();

                console.log("batterylevel :--->" + batteryLevel);

                socket.emit('event', {name: 'battery', value: batteryLevel});
                socket.emit('event', { name: 'battery',value: batteryLevel});
                //client.animateLeds('blinkRed', 5, 2);

            }

        },1000);

    }



    socket.on('event', function (data) {
        if(data.name=="takeoff"){
            console.log("Browser asked Ar Drone to Take Off");
            client.takeoff();
        }
        if(data.name=="up"){
            console.log("Browser asked Ar Drone to up by :"+data.speed+"m/s  duration : "+data.duration+"s");
            client.up(data.speed);
            console.log("Browser asked Ar Drone to stop");
            //client.stop();
        }
        if(data.id=="animation"){
        	console.log("Browser asked Ar Drone to animate NAME:" +data.name.toString()+" TIME: "+data.duration);
            client.animate(data.name.toString(),data.duration);
        }
        if(data.id=="animationled"){
        	console.log("Browser asked Ar Drone to animateled NAME:" +data.name.toString()+" TIME: "+data.duration);
            client.animateLeds(data.name.toString(),5,data.duration);
        }
        if(data.name=="stop"){
        	console.log("Browser asked Ar Drone to stop");
            client.stop();
        }
        if(data.name=="land"){
            console.log("Browser asked Ar Drone to Land");
            client.land();
        }
        //------------------------------------------------------------------
         if(data.name=="down"){
            console.log("Browser asked Ar Drone to down :"+data.speed+"m/s  duration : "+data.duration+"s");
            client.down(data.speed);
             console.log("Browser asked Ar Drone to stop");
             //client.stop();
        }
        if(data.name=="left"){
            console.log("Browser asked Ar Drone to left by :"+data.speed+"m/s  duration : "+data.duration+"s");
            client.left(data.speed);
            console.log("Browser asked Ar Drone to stop");
           // client.stop();
        }
        if(data.name=="right"){
           console.log("Browser asked Ar Drone to right  by :"+data.speed+"m/s  duration : "+data.duration+"s");
            client.right(data.speed);
            console.log("Browser asked Ar Drone to stop");
            //client.stop();
        }
        if(data.name=="front"){
            console.log("Browser asked Ar Drone to front   by :"+data.speed+"m/s  duration : "+data.duration+"s");
            client.front(data.speed);
            console.log("Browser asked Ar Drone to stop");
            //client.stop();
        }
         if(data.name=="back"){
            console.log("Browser asked Ar Drone to back  by :"+data.speed+"m/s  duration : "+data.duration+"s");
            client.back(data.speed);
             console.log("Browser asked Ar Drone to stop");
             client.stop();
        }
        if(data.name=="clockwise"){
            console.log("Browser asked Ar Drone to clockwise  by :"+data.speed+"m/s  duration : "+data.duration+"s");
            client.clockwise(data.speed);
            console.log("Browser asked Ar Drone to stop");
            //client.stop();
        }
        if(data.name=="counter-clockwise"){
            console.log("Browser asked Ar Drone to counter-clockwise  by :"+data.speed+"m/s  duration : "+data.duration+"s");
            client.counterClockwise(data.speed);
            console.log("Browser asked Ar Drone to stop");
            client.stop();
        }
        if(data.name=="recover"){
            console.log("Browser asked Ar Drone to recover");
            client.stop();
        }

    });
});

