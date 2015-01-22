! function() {
    var mySudoku = new Sudoku({
        bSize: 30,// 每个block的宽高
        bBColor: '#000',// 外层边框颜色
        gBColor: '#CCC',//宫细边框颜色
        labelColor: '#000',// 题目数字文字颜色
        textColor: '#777',// 填入内容文字颜色
        etextColor: '#E02727',// 出错文字颜色
        container: $('#J-sudoku_stage'),// 容器
        puzzle_placeholder: '0',// 谜面占位符
        puzzle: PUZZLE,
        answer: '985762134267134589314895762832976451176453298549218673621387945453629817798541326',
        error: function(msg) {
            if (msg) {
                $('#J-errors').html(msg);
            } else {
                $('#J-errors').empty();
            }
        },
        done: function() {
            $('#J-done').show();
        }
    });
}();