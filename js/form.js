function send(cnv_type) {
    let text = $('#input-txt').val();
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:6324/re',
        data: JSON.stringify({ 'cnv_type': cnv_type, 'text': text }),
        timeout: 3500,
        success: function(res) {
            let data_json = JSON.parse(res);
            if ('res' in data_json) {
                $('#output-txt').val(data_json['res']);
            }
        },
        error: function(xhr, state, errorThrown) {
            console.log("error");
        }
    })
}
$(function() {
    $('#swap-btn').on('click', function(e) {
        let $input_txt = $('#input-txt');
        let $output_txt = $('#output-txt');
        let itext = $input_txt.val();
        let otext = $output_txt.val();
        $input_txt.val(otext);
        $output_txt.val(itext);
    })
    $('#encode-btn').on('click', function(e) {
        send('encode');
    })
    $('#decode-btn').on('click', function(e) {
        send('decode');
    })
})