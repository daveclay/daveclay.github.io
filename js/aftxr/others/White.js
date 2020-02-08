(function(css) {
    var stage = document.getElementById("stage");
    var numberOfGenes = 120;
    var fraction = window.innerWidth / numberOfGenes;
    var genes = [];

    function gradient(elem, colors) {
        var deg = Math.round(Math.random() * 90);
        var css = 'linear-gradient(' + deg + 'deg, ';
        for (var i in colors) {
            css += colors[i];
            if (i < colors.length - 1) {
                css += ', ';
            }
        }
        css += ')';
        elem.style.background = css;
    }

    function create(i) {
        var gene = document.createElement("div");
        gene.className = "gene";
        gene.setAttribute("data-index", i);

        var text = document.createTextNode(Math.round(Math.random() * 200));
        var container = document.createElement('div');
        container.className = 'gene-line';
        container.appendChild(text);
        gene.appendChild(container);
        stage.appendChild(gene);

        genes.push(gene);
    }

    function modify(gene) {
        gradient(gene, [
            'rgba(80, 20, 20, 0) 5%',
            'rgba(265, 255, 255, .5) 50%',
            'rgba(80, 20, 20, 0) 95%'
        ]);
        gene.style.width = Math.round(Math.random() * 130);
        gene.style.borderLeft = '1px solid rgba(0, 0, 0, ' + (Math.random() *.05) + ')';

        var index = gene.getAttribute("data-index");
        var position = fraction * index;
        var range = 100;
        gene.style.left = position - range + Math.round(Math.random() * (position + range));
        setTimeout(function() {
            modify(gene);
        }, (Math.random() * 4000) + 1000);
    }

    for (var i = 0; i < numberOfGenes; i++) {
        create(i);
    }

    for (var i = 0; i < genes.length; i++) {
        modify(genes[i]);
    }

})(window.CSSUtils);
