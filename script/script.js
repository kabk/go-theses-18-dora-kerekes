$(window).on("load", function() {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var cw = canvas.width;
    var ch = canvas.height;

    var rows = 10;
    var cols = 30;
    var frame = 0;


    var img = new Image();
    img.onload = start;
    img.src = "imgs/title-03.png";
    // img.src = "https://i.ytimg.com/vi/Pg14vZJ1DIc/maxresdefault.jpg";

    function start() {

          var iw = canvas.width = img.width;
          var ih = canvas.height = img.height;
          var pieceWidth = iw / cols;
          var pieceHeight = ih / rows;

          var pieces = [];
          var objects = [];

          var i = 0;
          for(var x = 0; x < rows; x += 1 ){
                for(var y = 0; y < cols; y += 1 ){ 
                    objects[i] = { col: y, row: x, direction: Math.random()*2*Math.PI, counter: 0 };
                    i = i + 1;
               }
           }

           pieces = objects;


        setInterval(function(){ 

            var doc = document.documentElement;
            //var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
            //console.log(top);


              ctx.clearRect(0, 0, canvas.width, canvas.height);

              


            //console.log('aha');
            //shuffle(pieces, frame);

            var i = 0;
            for (var y = 0; y < rows; y++) {
                for (var x = 0; x < cols; x++) {
                var p = pieces[i++];
                p.counter = top;
                ctx.drawImage(
                    // from the original image
                    img,
                    // take the next x,y piece
                    x * pieceWidth + Math.cos(p.direction)*(0.25*p.counter) , y * pieceHeight + Math.sin(p.direction)*(0.25*p.counter) , pieceWidth, pieceHeight,
                    // draw it on canvas based on the shuffled pieces[] array
                    p.col * pieceWidth, p.row * pieceHeight, pieceWidth, pieceHeight
                );
                }
            }

            frame ++;
            
           
            // if(rows > 11) {
            //     rows = 0;
            //     cols = 0;
            // }

        }, 10);

     }

    function shuffle(a, frame) {
        
        ///if(frame%10>5) {
        for (var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
        //}/
        return a;
    };
});