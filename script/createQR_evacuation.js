//災害用伝言板（web171）URLからORコードを作成
function createQR() {
    jQuery(function(){
        jQuery('#qrcode').qrcode({
            width:120,
            height:120,
            text:'https://www.web171.jp/web171app/topRedirect.do;jsessionid=45B45E2C5082490985A1B57BCD31B898.ajp13w2'
        });
    })
}