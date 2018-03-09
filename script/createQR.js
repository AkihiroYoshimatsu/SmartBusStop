//くるりんばす時刻表URLからORコードを作成
function createQR() {
    jQuery(function(){
        jQuery('#qrcode').qrcode({
            width:120,
            height:120,
            text:'http://www.city.nisshin.lg.jp/shisetsu/bus/kururin_jikokuhyou.html.html'
        });
    })
}