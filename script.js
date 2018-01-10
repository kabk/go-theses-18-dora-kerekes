window.onload = function(){

		$('.page').each(function(i) {
			$(this).css('min-height', $(window).outerHeight());
			var p = $(this);
			var position = p.position();
			$(this).attr("data-toppos", position.top);
		});

		var totalHeight = $(document).outerHeight();
		$('body').css('height', totalHeight);

		var arrayOfHeights = [];

		$('.page').each(function(i) {
			if(i != 0) {
				$(this).css('position', "fixed");
				$(this).css('top', "0px");
				$(this).css('left', "0px");
				$(this).css('z-index', -i);
			}
		});

		// set scroll space
		

		$('.page').each(function() {
			//console.log($(this).height());
			arrayOfHeights.push($(this).outerHeight());
		});

		$( window ).scroll(function() {
  			//console.log($(this).scrollTop());

  			var scrollValue = $(this).scrollTop();

  			var selection = returnSelectedPage(scrollValue, arrayOfHeights);

  			$('.page').each(function(i) {


  					if(i < selection) {
  						$(this).css('position', "relative");
  					}

  					if(i == selection) {
  						$(this).css('position', "relative");
  					}

  					if(i > selection) {
  						$(this).css('position', "fixed");
  					}

			});

		});

		function returnSelectedPage(scrollValue, arrayOfHeights) {
			
			var newArray = [];
			// snapping pionts
			var sum = 0;
			newArray.push(sum);
			for(var i in arrayOfHeights) {
				sum += arrayOfHeights[i];				
				newArray.push(sum);
			}
			var selection = 0;
			for(var n in newArray) {
				if(scrollValue > newArray[n] && scrollValue < newArray[(parseInt(n)+1)]) {
					selection = n;
				}
			}
			
			return selection;
		}


		//-----------------------------------------------------------------

		$('canvas').each(function(i) {

	var canvas = this;
    var ctx = canvas.getContext("2d");

    var parent = $(this).parent().parent();
    console.log(parent);
    var offset = parent.attr("data-toppos");
    console.log(offset);
    // canvas.width = document.body.clientWidth - 50;
    // canvas.height = document.body.clientHeight - 50;
    // var cw = canvas.width;
    // var ch = canvas.height;


    var rows = 30;
    var cols = 15;
    var frame = 0;


    var img = new Image();
    img.onload = start;
    img.src = "imgs/title.png";
    //img.src = "https://vignette.wikia.nocookie.net/mixels-lucky-screenshots/images/b/bb/Pickle.jpg/revision/latest?cb=20170923121351";
    var ratio = img.width / img.height;

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
        	//console.log("r");
            var doc = document.documentElement;
            var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

            ctx.clearRect(0, 0, canvas.width, img.height);

            var i = 0;
            for (var y = 0; y < rows; y++) {
                for (var x = 0; x < cols; x++) {
                    var p = pieces[i++];
                    p.counter = top-offset;
                    ctx.drawImage(
                        img, 
                        x * pieceWidth + Math.cos(p.direction) * (0.25 * p.counter),
                        (y - (top-offset) *0.029) * pieceHeight + Math.sin(p.direction) * (0.25 * p.counter), 
                        pieceWidth, 
                        pieceHeight,

                        // draw it on canvas based on the shuffled pieces[] array
                        p.col * pieceWidth, p.row * pieceHeight, pieceWidth, pieceHeight
                    );
                }
            }
            frame++;
        }, 10);
    }

	});

    function shuffle(a, frame) {
        for (var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
        return a;
    };

};





