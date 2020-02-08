(function(css) {

    var codex = [
        "&nbsp;", "&nbsp;", "{<br/>&nbsp;&nbsp;&nbsp;", "{<br/>&nbsp;&nbsp;&nbsp;", "<br/>", "<br/>",
        "abstract", "arguments", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger", "default", "delete", "do", "double", "else", "enum*", "eval", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int", "interface", "let", "long", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with", "yield", "undefined", "prototype", "Object", "closed", "read", "send", "transmit", "data", "select", "plugin", "prompt", "accept", "reject", "violate", "option"
    ];

    var code = [];
    var lines = [];

    function transmit() {
        code.push(codex.sample() + " ");
        if (code.length % Math.floor(Math.random() * 20) == 1) {
            code.push("<br/>");
        }
        $('#code').html(code.join(""));
        var time;
        if (code.length > 200) {
            code = [];
            time = 1000;
        } else {
            time = 100;
        }
        setTimeout(function () {
            transmit();
        }, Math.random() * time);
    }

    transmit();

});
