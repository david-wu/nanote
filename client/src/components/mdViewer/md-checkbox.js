angular.module('services')
        .factory('mdItCheckbox', [
                MdItCheckboxFactory
        ]);

function MdItCheckboxFactory(){

    function MdItCheckbox(md, options){
        md.core.ruler.push('checkbox', checkboxReplace(md, options));
    }

    return MdItCheckbox;
}

function checkboxReplace(md, options) {
    options = options || {}
    _.defaults(options, {
        divWrap: false,
        divClass: 'checkbox',
        idPrefix: 'checkbox'
    });

    var arrayReplaceAt = md.utils.arrayReplaceAt;
    var pattern = /\[(X|\s|\_|\-)\]\s(.*)/i;

    function createTokens(checked, label, Token) {

        var nodes = [
            openLabel(Token),
            checkboxInput(Token, checked),
            labelContent(Token, label),
            closeLabel(Token),
        ];

        if (options.divWrap) {
            nodes.unshift(openDiv(Token));
            nodes.push(closeDiv(Token));
        }
        return nodes;
    };

    function splitTextToken(original, Token) {
        var checked, label, matches, text, value;
        text = original.content;
        matches = text.match(pattern);
        if (matches === null) {
            return original;
        }
        checked = false;
        value = matches[1];
        label = matches[2];
        if (value === 'X' || value === 'x') {
            checked = true;
        }
        return createTokens(checked, label, Token);
    };

    return function(state) {
        var blockTokens, i, j, l, token, tokens;
        blockTokens = state.tokens;
        j = 0;
        l = blockTokens.length;
        while (j < l) {
            if (blockTokens[j].type !== 'inline') {
                j++;
                continue;
            }
            tokens = blockTokens[j].children;
            i = tokens.length - 1;
            while (i >= 0) {
                token = tokens[i];
                blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, splitTextToken(token, state.Token));
                i--;
            }
            j++;
        }
    };
};

function openDiv(Token){
    var token = new Token('checkbox_open', 'div', 1);
    token.attrs = [['class', options.divClass]];
    return token;
}

function openLabel(Token){
    return new Token('label_open', 'label', 1);
}

function checkboxInput(Token, checked){
    var token = new Token('checkbox_input', 'input', 0);
    token.attrs = [['type', 'checkbox']];
    if (checked === true) {
        token.attrs.push(['checked', 'true']);
    }
    return token;
}

function labelContent(Token, label){
    var token = new Token('text', '', 0);
    token.content = label;
    return token;
}

function closeLabel(Token){
    return new Token('label_close', 'label', -1);
}

function closeDiv(Token){
    return new Token('checkbox_close', 'div', -1)
}
