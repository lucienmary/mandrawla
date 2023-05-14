$(function () {
    const $canvas = $('#mandrawla-canvas')[0];
    const $ctx = $canvas.getContext('2d');
    const xCenter = $canvas.width / 2;
    const yCenter = $canvas.height / 2;

    const $color = {
        construct: 'blue',
        render: 'turquoise',
        test: 'red'
    }

    const pi = Math.PI;
    const pi2 = 2 * Math.PI;

    $ctx.fillPath = $color.construct;
    $ctx.beginPath();
    $ctx.arc(xCenter, yCenter, 1, 0, pi2);
    $ctx.fill();

    $ctx.strokeStyle = $color.construct;
    $ctx.lineWidth = 1;
    $ctx.beginPath();
    $ctx.arc(xCenter, yCenter, 70, 0, pi2);
    $ctx.stroke();

    $ctx.beginPath();
    $ctx.arc(xCenter, yCenter, 140, 0, pi2);
    $ctx.stroke();

    $ctx.beginPath();
    $ctx.arc(xCenter, yCenter, 160, 0, pi2);
    $ctx.stroke();

    for (let i = 0; i < 6; i++) {
        $ctx.strokeStyle = $color.render;
        $ctx.beginPath();
        $ctx.ellipse(xCenter, yCenter, 200, 40, 119.9 * i, 0, pi2);
        $ctx.stroke();
    }

    for (let i = 0; i < 6; i++) {
        $ctx.strokeStyle = $color.test;
        $ctx.beginPath();
        $ctx.ellipse(xCenter, yCenter, 140, 20, (119.9 * i) + 0.255, 0, pi2);
        $ctx.stroke();
    }
});