 var global_selection = 0;


window.onload = function(){

        var arrayOfCanvas = [];
        var imgsArray = [
            "imgs/title.png",
            "imgs/chapter-1.png",
            "imgs/chapter-2.png",
            "imgs/chapter-3.png",
            "imgs/chapter-4.png",
            "imgs/chapter-5.png",
            "imgs/conclusion.png",
        ];
        var imgsArrayPrint = [
            "imgs/print-imgs/p-title.jpg",
            "imgs/print-imgs/p-chapter-1.jpg",
            "imgs/print-imgs/p-chapter-2.jpg",
            "imgs/print-imgs/p-chapter-3.jpg",
            "imgs/print-imgs/p-chapter-4.jpg",
            "imgs/print-imgs/p-chapter-5.jpg",
            "imgs/print-imgs/p-conclusion.jpg",
        ];

        $('.page').each(function(i) {
            $(this).css('min-height', $(window).outerHeight());
        });

        var index = 0;
        
        $('.page').each(function(i) {
            if($(this).find("canvas").length > 0) {
                var c = $(this).find("canvas")[0];

                var img = document.createElement("img");
                img.src = imgsArrayPrint[index];
                img.setAttribute("class", "hiddenImg");
                $(c).parent().append(img);
                
                var p = $(this);
                var position = p.position();

                $(c).attr("data-toppos", position.top);
                $(c).attr("data-img", imgsArray[index]);
                arrayOfCanvas.push(c);
                index++;
              //  console.log("canvas");
            } else {
                arrayOfCanvas.push(null);
              //  console.log("no canvas");
            }
        });

        var totalHeight = $(document).outerHeight();
        $('body').css('height', totalHeight);

        var arrayOfHeights = [];
        var newArray = [];
       
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

        
        // snapping pionts
        var sum = 0;
        newArray.push(sum);
        for(var i in arrayOfHeights) {
            sum += arrayOfHeights[i];               
            newArray.push(sum);
        }

        $( window ).scroll(function() {
            //console.log($(this).scrollTop());

            var scrollValue = $(this).scrollTop();

            global_selection = returnSelectedPage(newArray, scrollValue, arrayOfHeights);

            $('.page').each(function(i) {


                    if(i < global_selection) {
                        $(this).css('position', "relative");
                        //$(this).css('visibility', "hidden");
                    }

                    if(i == global_selection) {
                        $(this).css('position', "relative");
                        //$(this).css('visibility', "visible");
                    }

                    if(i > global_selection) {
                        $(this).css('position', "fixed");
                          //$(this).css('visibility', "visible");
                    }

                    if(i > global_selection+1) {
                         //$(this).css('visibility', "hidden");
                    }

            });

        });

        function returnSelectedPage(newArray, scrollValue, arrayOfHeights) {
            
            var selection = 0;
            for(var n in newArray) {
                if(scrollValue >= newArray[n] && scrollValue < newArray[(parseInt(n)+1)]) {
                    selection = n;
                }
            }
            
            return selection;
        }


        //-----------------------------------------------------------------
        
             $('canvas').each(function(index) {
                        var canvas = this;

                        var rows = 30;
                        var cols = 15;

                        var img = new Image();
                        img.onload = start;
                        img.src = "imgs/title.png";
                        
                        var ratio = img.width / img.height;


                        function start() {
                            //resize();

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
                                img.onload = function() {
                            };

                            if( index == 0) {
                            
                                window.requestAnimationFrame(function() {

                                    render(arrayOfCanvas, img, rows, cols, pieces, pieceWidth, pieceHeight)

                                });

                            }
                        }
             });

      //  });


};



function render(arrayOfCanvas, img, rows, cols, pieces, pieceWidth, pieceHeight) {

                var canvas = arrayOfCanvas[global_selection];


                if(canvas == null) {
                      canvas = arrayOfCanvas[(parseInt(global_selection)+1)];
                      
                }
                
                if(canvas != null) {

                var offset = $(canvas).attr("data-toppos");  
                img.src = $(canvas).attr("data-img"); 
                // console.log($(canvas).attr("data-img"))  
                //$(canvas).css("background-color", "red");
                //console.log(offset);

                var ctx = canvas.getContext("2d");

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
                }

                window.requestAnimationFrame(function() {
                    render(arrayOfCanvas, img, rows, cols, pieces, pieceWidth, pieceHeight)
                });
        };