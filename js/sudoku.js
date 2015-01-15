(function(win) {
    win.Sudoku = function(conf) {
        conf = $.extend({
            bSize: 30,
            bBColor: '#000',
            gBColor: '#CCC',
            labelColor: '#000',
            textColor: '#777',
            etextColor: '#E02727',
            container: $('body'),
            puzzle_placeholder: '0',
            puzzle: '985702134267134580314890762832976451076453208549218673621087945403629807790541326',
            answer: '985762134267134589314895762832976451176453298549218673621387945453629817798541326',
            error: function(msg) {
                if (msg) {
                    alert(msg);
                }
            },
            done: function() {
                alert('done!');
            }
        }, conf);

        var tsudoku = this;

        var GONGCOORD = {
            1: ['11', '12', '13', '21', '22', '23', '31', '32', '33'],
            2: ['14', '15', '16', '24', '25', '26', '34', '35', '36'],
            3: ['17', '18', '19', '27', '28', '29', '37', '38', '39'],
            4: ['41', '42', '43', '51', '52', '53', '61', '62', '63'],
            5: ['44', '45', '46', '54', '55', '56', '64', '65', '66'],
            6: ['47', '48', '49', '57', '58', '59', '67', '68', '69'],
            7: ['71', '72', '73', '81', '82', '83', '91', '92', '93'],
            8: ['74', '75', '76', '84', '85', '86', '94', '95', '96'],
            9: ['77', '78', '79', '87', '88', '89', '97', '98', '99']
        };

        var FSIZE = conf.bSize * 0.67;

        conf.container.css('fontSize', FSIZE + 'px');

        function _gen_bg() {
            return '<div class="sudoku-bg" style="border-color: ' + conf.bBColor + ';width:' + (conf.bSize * 9 + 2) + 'px;height:' + (conf.bSize * 9 + 2) + 'px;">';
        }

        function _gen_gong() {
            var _gong = '';
            for (var i = 0; i < 9; i++) {
                _gong += '<div class="sudoku-gong" style="border-color: ' + conf.gBColor + ';width:' + conf.bSize * 3 + 'px;height:' + conf.bSize * 3 + 'px;' + ([2, 5, 8].indexOf(i) !== -1 ? 'border-right: none;' : '') + '' + ([6, 7, 8].indexOf(i) !== -1 ? 'border-bottom: none;' : '') + '"></div>';
            }
            return _gong + '</div>';
        }

        function _gen_block(num, i, j) {
            var _key = i.toString() + j.toString();
            var _gong;

            for (var k in GONGCOORD) {
                if (GONGCOORD[k].indexOf(_key) !== -1) {
                    _gong = k;
                    break;
                }
            }
            var _left = conf.bSize * (j - 1) + 3;
            var _top = conf.bSize * (i - 1) + 3;
            (i > 3) && _top++;
            (i > 6) && _top++;

            (j > 3) && _left++;
            (j > 6) && _left++;

            var _style = 'left:' + _left + 'px;top: ' + _top + 'px;width:' + conf.bSize + 'px;height:' + conf.bSize + 'px;line-height:' + conf.bSize + 'px;color:';
            if (num === conf.puzzle_placeholder) {
                return '<input maxLength="1" class="sudoku-block sudoku-input" style="' + _style + conf.textColor + ';" data-key="' + _key + '" data-gong="' + _gong + '">';
            } else {
                return '<span class="sudoku-block sudoku-label" style="' + _style + conf.labelColor + ';" data-key="' + _key + '" data-gong="' + _gong + '">' + num + '</span>';
            }
        }

        function draw_content() {
            var key = 0,
                block_html = '';
            for (var i = 1; i < 10; i++) {
                for (var j = 1; j < 10; j++) {
                    block_html += _gen_block(conf.puzzle[key], i, j);
                    key++;
                }
            }
            conf.container.append(_gen_bg() + _gen_gong() + block_html);
        }

        tsudoku.init = function() {
            draw_content();

            $('.sudoku-input').change(function() {
                var $input = $(this);

                if ($input.val() === '') {
                    $input.removeAttr('data-done');
                    return;
                }

                var _h = $input.height();
                var _w = $input.width();
                $input.animate({
                    width: [_w * 2 + 'px', 'easeOutBounce'],
                    height: [_h * 2 + 'px', 'easeOutBounce'],
                    left: ['-=' + _w / 2 + 'px', 'easeOutBounce'],
                    top: ['-=' + _h / 2 + 'px', 'easeOutBounce'],
                    fontSize: [FSIZE * 2 + 'px', 'easeOutBounce']
                }, 400).animate({
                    width: [_w + 'px', 'easeInElastic'],
                    height: [_h + 'px', 'easeInElastic'],
                    left: ['+=' + _w / 2 + 'px', 'easeInElastic'],
                    top: ['+=' + _h / 2 + 'px', 'easeInElastic'],
                    fontSize: [FSIZE + 'px', 'easeInElastic']
                }, 200);


                if (!tsudoku.check($input)) {
                    conf.error('填的数错了(⊙o⊙)哦！');
                    $input.attr('data-error', 'yes').css({
                        color: conf.etextColor
                    });
                } else {
                    $input.attr('data-done', 'yes');

                    if ($('.sudoku-input').length === $('.sudoku-input[data-done=yes]').length) {
                        $('.sudoku-input').attr('disabled', 'disabled');
                        conf.done();
                    }
                }
            }).focus(function() {
                $('.sudoku-input').each(function() {
                    var $input = $(this);
                    if ($input.attr('data-error') === 'yes') {
                        $input.val('').css('color', conf.textColor).removeAttr('data-error');
                        conf.error();
                    }
                });
            });
        };
        tsudoku.done = function() {};
        tsudoku.error = function() {};

        function _check($ems) {
            var ret = true;
            var dict = '123456789';
            $ems.each(function() {
                var val = $(this).val() || $(this).html();
                if (dict.indexOf(val) === -1) {
                    ret = false;
                    return false;
                } else {
                    dict = dict.replace(val, '');
                }

            });
            9
            return ret;
        }
        tsudoku.check = function($input) {
            var _key = $input.attr('data-key');
            var _gong = $input.attr('data-gong');

            var pass = _check($('.sudoku-block[data-gong=' + _gong + ']')) && _check($('.sudoku-block[data-key^=' + _key[0] + ']')) && _check($('.sudoku-block[data-key$=' + _key[1] + ']'));

            return pass;

        };

        tsudoku.init();
    };
})(window);