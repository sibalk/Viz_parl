setTimeout(()=>{
    console.log(seja1);
    prestejBesede();
    prestejBesedeZaOsebo("kekec");
},5000)

function prestejBesede(){
    let pers = {};

    seja1.forEach(beseda=>{
        if(!pers[beseda['\"persId\"']]){
            pers[beseda['\"persId\"']] = 0;
        }
        pers[beseda['\"persId\"']]++;
    })
    console.log(pers);
    draw(pers);
}

function prestejBesedeZaOsebo(idOsebe){
    let words = {};
    console.log(idOsebe);
    seja1.forEach(beseda=>{
        if(!words[beseda['\"lemma\"']]){
            words[beseda['\"lemma\"']] = 0;
        }
        words[beseda['\"lemma\"']]++;
    })
    console.log(words);
    //draw1();
    return;
}


function draw(data){
    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

    var format = d3.format(",d");

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var pack = d3.pack()
        .size([width, height])
        .padding(1.5);

    let classes = [];
    let i = 0;
    Object.keys(data).forEach(d=>{
        let value = data[d];
        console.log(value +'-'+d);
        classes.push({id:d.replace(/\"/g,''), value, i:i++});
    });
        

        var root = d3.hierarchy({children: classes})
            .sum(function(d) { return d.value; })
            .each(function(d) {
                if (id = d.data.id) {
                    var id, i = id.lastIndexOf(".");
                    d.id = id;
                    d.package = id.slice(0, i);
                    d.class = id.slice(i + 1);
                    d.color = d.data.i;
                }
            });
            debugger;
        var node = svg.selectAll(".node")
            .data(pack(root).leaves())
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

        node.append("circle")
            .attr("id", function(d) { return d.id; })
            .attr("r", function(d) { return d.r; })
            .style("fill", function(d) { return color(d.color); })
            .on('click', (d)=>{
                draw1();
            });

        node.append("clipPath")
            .attr("id", function(d) { return "clip-" + d.id; })
            .append("use")
            .attr("xlink:href", function(d) { return "#" + d.id; });

        node.append("text")
            .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
            .selectAll("tspan")
            .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
            .enter().append("tspan")
            .attr("x", 0)
            .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
            .text(function(d) { return d; });

        node.append("title")
            .text(function(d) { return d.id + "\n" + format(d.value); });
    return 
    

}

function draw1(){
    var svg = d3.select("svg").remove();
}