var canvas = document.getElementById('canvas');

if (canvas.getContext) {

    var context = canvas.getContext('2d');
    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
            return setTimeout(callback, 16);
        };

    // Let's define our square
    var square = {
        'x': 20,
        'y': 20,
        'width': 50,
        'height': 50,
        'fill': '#f00'
    };

    var render = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.beginPath();
        context.rect(square.x, square.y, square.width, square.height);
        context.fillStyle = square.fill;
        context.fill();

        requestAnimationFrame(render);
    };

    render();

    var animate= function(prop, val, duration, dist, direction) {

        var start = new Date().getTime();
        var end = start + duration;
        var current = square[prop];
        var distance = dist;

        var step = function() {

            var timestamp = new Date().getTime();
            var progress = Math.min((duration - (end - timestamp)) / duration, 1);

            if (direction === 'right') {
                square[prop] = current + (distance * progress);
            } else {
                square[prop] = current - (distance * progress);
            }


            if (progress < 1) requestAnimationFrame(step);
        };

        return step();
    };

    animate('x', 0, 500, 330, 'right');
    setTimeout(function(){
        animate('x', 0, 500, 330, 'left');
    }, 2000);



};