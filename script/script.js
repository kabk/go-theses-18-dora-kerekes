  // $(window).scroll(function() {
  //   console.log($(this).scrollTop() + "please");
  //   var scrollTop = $(window).scrollTop();
  //     if (scrollTop >= 2993) {
  //        $(".canvascontainer").fadeOut( "slow" );
  //   }

  //       // if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
  //       //     alert('Bottom reached!');
  //       // }
  //   });


$(window).on("load", function() {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    // canvas.width = document.body.clientWidth - 50;
    // canvas.height = document.body.clientHeight - 50;
    // var cw = canvas.width;
    // var ch = canvas.height;


    var rows = 50;
    var cols = 30;
    var frame = 0;


    var img = new Image();
    img.onload = start;
    img.src = "imgs/title.png";
    //img.src = "https://vignette.wikia.nocookie.net/mixels-lucky-screenshots/images/b/bb/Pickle.jpg/revision/latest?cb=20170923121351";
    var ratio = img.width / img.height;



    $("#canvas").click(function() {
        $(".canvascontainer").fadeOut( "slow" );
        $("#abstract-wrapper").removeClass("hidden").fadeIn( "slow" );
    }); 

    $("#abstract-wrapper").click(function() {
        $("#abstract-wrapper").fadeOut( "slow" );

    }); 

    $("#wrapper-sec1").click(function() {
        $(this).fadeOut( "slow" );

    }); 

    function resize() {
        $("#canvas")
            .width(win.width())
            .height(win.height());
    }

    var win = $(window).on('resize', resize);

    function start() {
        resize();

        var iw = canvas.width = img.width;
        var ih = canvas.height = img.height;

        var pieceWidth = iw / cols;
        var pieceHeight = ih / rows;

        var pieces = [];
        var objects = [];

        var i = 0;
        for (var x = 0; x < rows; x += 1) {
            for (var y = 0; y < cols; y += 1) {
                objects[i] = { col: y, row: x, direction: Math.random() * 2 * Math.PI, counter: 0 };
                i = i + 1;
            }
        }

        pieces = objects;

        setInterval(function() {
            var doc = document.documentElement;
            var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

            ctx.clearRect(0, 0, canvas.width, img.height);

            var i = 0;
            for (var y = 0; y < rows; y++) {
                for (var x = 0; x < cols; x++) {
                    var p = pieces[i++];
                    p.counter = top;
                    ctx.drawImage(
                        img,
                        x * pieceWidth + Math.cos(p.direction) * (0.25 * p.counter), y * pieceHeight + Math.sin(p.direction) * (0.25 * p.counter), pieceWidth, pieceHeight,
                        // draw it on canvas based on the shuffled pieces[] array
                        p.col * pieceWidth, p.row * pieceHeight, pieceWidth, pieceHeight
                    );
                }
            }
            frame++;
        }, 10);
    }

    function shuffle(a, frame) {
        for (var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
        return a;
    };
});