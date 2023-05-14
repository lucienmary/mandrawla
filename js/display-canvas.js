$(function () {
   
    const $mandaPanel = $('#manda-panel');
    
    $mandaPanel.append(`
    <canvas id="mandrawla-canvas" width="${$mandaPanel.outerWidth() * .8}px" height="${$mandaPanel.outerWidth() * .8}px">
        Désolé, votre navigateur ne prend pas en charge &lt;canvas&gt;.
    </canvas>
    `);

});