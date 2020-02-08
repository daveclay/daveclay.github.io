(function(css) {
    var stage = document.getElementById("stage");
    var numberOfGenes = 30;
    var genes = [];

    function create(i) {
        var gene = document.createElement("div");
        gene.className = "gene";
        gene.setAttribute("data-index", i);

        var container = document.createElement('div');
        container.className = 'gene-line';
        gene.style.left = (i * 10) + "px";
        gene.appendChild(container);
        stage.appendChild(gene);

        genes.push(gene);
    }

    function modify(gene) {
        var index = gene.getAttribute("data-index");
        var height = Math.random() * 700 + 2;
        gene.style.height = height + "px";

        var colors = [
            {
                r: 250,
                g: 250,
                b: 250,
                a: .3
            },
            {
                r: 250,
                g: 250,
                b: 250,
                a: .3
            }
        ];
        var result = colors.map(function(color) {
            console.log(color);
            return "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a + ")";
        }).join();

        console.log(result);
        //background: radial-gradient(ellipse at center, rgba(255, 255, 250, .3) 0%, rgba(255, 255, 255, 0) 70%);

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
