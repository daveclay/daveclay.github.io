(function(css) {
    var stage = document.getElementById("stage");
    var numberOfGenes = 120;
    var fraction = window.innerWidth / numberOfGenes;
    var genes = [];

    function create(i) {
        var gene = document.createElement("div");
        gene.className = "gene";
        gene.setAttribute("data-index", i);

        var text = document.createTextNode(Math.round(Math.random() * 200));
        var container = document.createElement('div');
        container.className = 'gene-line';
        //container.appendChild(text);
        gene.appendChild(container);
        stage.appendChild(gene);

        genes.push(gene);
    }

    function modify(gene) {
        var index = gene.getAttribute("data-index");
        var size = Math.random() * 700 + 2;
        gene.style.width = size + "px";
        gene.style.height = size + "px";
        gene.style.left = Math.round(Math.random() * window.innerWidth) - (size / 2);
        gene.style.top = Math.round(Math.random() * window.innerHeight) - (size / 2);
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
