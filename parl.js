setTimeout(()=>{
    console.log(seja1);
    prestejBesede();
    //prestejBesedeZaOsebo("kekec");
},2000)

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
    //prestejBesedeZaOsebo("kekec", pers);
}

function prestejBesedeZaOsebo(idOsebe){
    let words = {};
    let wordsSort = {};
    idOsebe = "\""+idOsebe+"\"";
    console.log(idOsebe);
    seja1.forEach(beseda=>{
        if(beseda['\"persId\"'] == idOsebe){
            if(!words[beseda['\"lemma\"']]){
                words[beseda['\"lemma\"']] = 0;
            }
            words[beseda['\"lemma\"']]++;
        }
        /*
        console.log(beseda['\"persId\"']);
        if(!words[beseda['\"lemma\"']]){
            words[beseda['\"lemma\"']] = 0;
        }
        words[beseda['\"lemma\"']]++;
        */
    })

    seja1.forEach(beseda=>{
        if(words[beseda['\"lemma\"']] < 15) {
            //console.log(words[beseda['\"lemma\"']]);
            delete words[beseda['\"lemma\"']];
        }
        else if(words[beseda['\"lemma\"']] == '\"biti\"') {
            delete words[beseda['\"lemma\"']];
        }
        /*
        console.log(beseda['\"persId\"']);
        if(!words[beseda['\"lemma\"']]){
            words[beseda['\"lemma\"']] = 0;
        }
        words[beseda['\"lemma\"']]++;
        */
    })
    
    seja1.forEach(beseda=>{
        if(beseda['\"lemma\"'] == '\"biti\"'){
            console.log(beseda['\"lemma\"'].length)
            delete words[beseda['\"lemma\"']];
        }
        else if(beseda['\"lemma\"'] == '\"se\"'){
            delete words[beseda['\"lemma\"']];
        }
        else if(beseda['\"lemma\"'] == '\"še\"'){
            delete words[beseda['\"lemma\"']];
        }
        else if(beseda['\"lemma\"'] == '\"v\"'){
            delete words[beseda['\"lemma\"']];
        }
        else if(beseda['\"lemma\"'] == '\"če\"'){
            delete words[beseda['\"lemma\"']];
        }
        else if(beseda['\"lemma\"'] == '\"ki\"'){
            delete words[beseda['\"lemma\"']];
        }
        else if(beseda['\"lemma\"'] == '\"o\"'){
            delete words[beseda['\"lemma\"']];
        }
        else if(beseda['\"lemma\"'] == '\"ta\"'){
            delete words[beseda['\"lemma\"']];
        }
        else if(beseda['\"lemma\"'] == '\"da\"'){
            delete words[beseda['\"lemma\"']];
        }
        else if(beseda['\"lemma\"'] == '\"in\"'){
            delete words[beseda['\"lemma\"']];
        }
        else if(beseda['\"lemma\"'] == '\"za\"'){
            delete words[beseda['\"lemma\"']];
        }
        else if(beseda['\"lemma\"'] == '\"ne\"'){
            delete words[beseda['\"lemma\"']];
        }
        else if(beseda['\"lemma\"'] == '\"on\"'){
            delete words[beseda['\"lemma\"']];
        }
        else if(beseda['\"lemma\"'] == '\"z\"'){
            delete words[beseda['\"lemma\"']];
        }
        else if(beseda['\"lemma\"'] == '\"k\"'){
            delete words[beseda['\"lemma\"']];
        }
        else if(beseda['\"lemma\"'] == '\"na\"'){
            delete words[beseda['\"lemma\"']];
        }
        else if(beseda['\"lemma\"'] == '\"kot\"'){
            delete words[beseda['\"lemma\"']];
        }
    })

    console.log(words);
    draw1(words);
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
        //console.log(value +'-'+d);
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
                //debugger;
                prestejBesedeZaOsebo(d.class);
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

function draw1(data){
    //var svg = d3.select("svg").remove();
    d3.select("svg").selectAll("*").remove();
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
        //console.log(value +'-'+d);
        classes.push({id:d.replace(/\"/g,''), value, i:i++});
    });
    debugger;  

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
            .style("fill", function(d) { return color(d.color); });

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