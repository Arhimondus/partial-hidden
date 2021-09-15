// by Adam Pietrasiak 16.02.2016 from https://coderoad.ru/8897289
module.exports = function isHidden(window, element, partial = true){
    //we're using getBoundingClientRect to get position of element relative to viewport
    //so we dont need to care about scroll position
    var box = element.getBoundingClientRect();

    //let's save window size
    var win = {
        h: window.innerWidth,
        w: window.innerHeight,
    };

    //now we check against edges of element

    //firstly we check one axis
    //for example we check if left edge of element is between left and right edge of scree (still might be above/below)
    var topEdgeInRange = box.top >= 0 && box.top <= win.h;
    var bottomEdgeInRange = box.bottom >= 0 && box.bottom <= win.h;

    var leftEdgeInRange = box.left >= 0 && box.left <= win.w;
    var rightEdgeInRange = box.right >= 0 && box.right <= win.w;


    //here we check if element is bigger then window and 'covers' the screen in given axis
    var coverScreenHorizontally = box.left <= 0 && box.right >= win.w;
    var coverScreenVertically = box.top <= 0 && box.bottom >= win.h;

    //now we check 2nd axis
    var topEdgeInScreen = topEdgeInRange && ( leftEdgeInRange || rightEdgeInRange || coverScreenHorizontally );
    var bottomEdgeInScreen = bottomEdgeInRange && ( leftEdgeInRange || rightEdgeInRange || coverScreenHorizontally );

    var leftEdgeInScreen = leftEdgeInRange && ( topEdgeInRange || bottomEdgeInRange || coverScreenVertically );
    var rightEdgeInScreen = rightEdgeInRange && ( topEdgeInRange || bottomEdgeInRange || coverScreenVertically );

    //now knowing presence of each edge on screen, we check if element is partially or entirely present on screen
    var isPartiallyOnScreen = topEdgeInScreen || bottomEdgeInScreen || leftEdgeInScreen || rightEdgeInScreen;
    var isEntirelyOnScreen = topEdgeInScreen && bottomEdgeInScreen && leftEdgeInScreen && rightEdgeInScreen;

    return partial ? isPartiallyOnScreen : isEntirelyOnScreen;
}
