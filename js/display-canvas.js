$(function () {
   
    const $mandaPanel = $('#manda-panel');
    
    $mandaPanel.append(`
    <canvas id="mandrawla-canvas" width="${$mandaPanel.outerWidth()}px" height="${$mandaPanel.outerWidth()}px">
        Désolé, votre navigateur ne prend pas en charge &lt;canvas&gt;.
    </canvas>
    `);

});