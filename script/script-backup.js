$(window).on("load", function() {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var cw = canvas.width;
    var ch = canvas.height;

    var rows = 3;
    var cols = 3;

    var img = new Image();
    img.onload = start;
    // img.src = "imgs/title-03.png";
    img.src = "https://i.ytimg.com/vi/Pg14vZJ1DIc/maxresdefault.jpg";

    function start() {

        var iw = canvas.width = img.width;
        var ih = canvas.height = img.height;
        var pieceWidth = iw / cols;
        var pieceHeight = ih / rows;


        // var pieces = [
        //     { col: 0, row: 0 },
        //     { col: 1, row: 0 },
        //     { col: 2, row: 0 },
        //     { col: 3, row: 0 },
        //     { col: 4, row: 0 },
        //     { col: 5, row: 0 },
        //     // { col: 6, row: 0 },
        //     // { col: 7, row: 0 },
        //     // { col: 8, row: 0 },
        //     // { col: 9, row: 0 },
        //     // { col: 10, row: 0 },
        //     { col: 0, row: 1 },
        //     { col: 1, row: 1 },
        //     { col: 2, row: 1 },
        //     { col: 3, row: 1 },
        //     { col: 4, row: 1 },
        //     { col: 5, row: 1 },
        //     // { col: 6, row: 1 },
        //     // { col: 7, row: 1 },
        //     // { col: 8, row: 1 },
        //     // { col: 9, row: 1 },
        //     // { col: 10, row: 1 },
        //     { col: 0, row: 2 },
        //     { col: 1, row: 2 },
        //     { col: 2, row: 2 },
        //     { col: 3, row: 2 },
        //     { col: 4, row: 2 },
        //     { col: 5, row: 2 },
        //     // { col: 6, row: 2 },
        //     // { col: 7, row: 2 },
        //     // { col: 8, row: 2 },
        //     // { col: 9, row: 2 },
        //     // { col: 10, row: 2 },
        //     { col: 0, row:3 },
        //     { col: 1, row:3 },
        //     { col: 2, row:3 },
        //     { col: 3, row:3 },
        //     { col: 4, row:3 },
        //     { col: 5, row:3 },
        //     // { col: 6, row:3 },
        //     // { col: 7, row:3 },
        //     // { col: 8, row:3 },
        //     // { col: 9, row:3 },
        //     // { col: 10, row:3 },
        //     { col: 0, row:4 },
        //     { col: 1, row:4 },
        //     { col: 2, row:4 },
        //     { col: 3, row:4 },
        //     { col: 4, row:4 },
        //     { col: 5, row:4 },
        //     // { col: 6, row:4 },
        //     // { col: 7, row:4 },
        //     // { col: 8, row:4 },
        //     // { col: 9, row:4 },
        //     // { col: 10, row:4 },
        //     { col: 0, row:5 },
        //     { col: 1, row:5 },
        //     { col: 2, row:5 },
        //     { col: 3, row:5 },
        //     { col: 4, row:5 },
        //     { col: 5, row:5 },
        //     // { col: 6, row:5 },
        //     // { col: 7, row:5 },
        //     // { col: 8, row:5 },
        //     // { col: 9, row:5 },
        //     // { col: 10, row:5 },
        // ]
        var pieces = [
                    {col:0,row:0},
                    {col:1,row:0},
                    {col:2,row:0},
                    {col:0,row:1},
                    {col:1,row:1},
                    {col:2,row:1},
                    {col:0,row:2},
                    {col:1,row:2},
                    {col:2,row:2},
                  ]



        
        shuffle(pieces);

        var i = 0;
        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < cols; x++) {
                var p = pieces[i++];
                ctx.drawImage(
                    // from the original image
                    img,
                    // take the next x,y piece
                    x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight,
                    // draw it on canvas based on the shuffled pieces[] array
                    p.col * pieceWidth, p.row * pieceHeight, pieceWidth, pieceHeight
                );
            }
        }


    }

    function shuffle(a) {
        for (var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
        return a;
    };
});