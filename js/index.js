! function() {
    var mySudoku = new Sudoku({
        bSize: 30,
        bBColor: '#000',
        gBColor: '#CCC',
        labelColor: '#000',
        textColor: '#777',
        etextColor: '#E02727',
        container: $('#J-sudoku_stage'),
        puzzle_placeholder: '0',
        puzzle: '985702134267134580314890762832976451076453208549218673621087945403629807790541326',
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