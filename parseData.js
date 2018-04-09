let fs = require('fs');

let output = [];


fs.readdir('C:\\FRI\\OO\\CLARIN.SI-master\\SlovParl\\Sk-11-csv\\lemma\\', (err, files)=>{
    let i = 0;
    files.forEach(file=>{
        readFile('C:\\FRI\\OO\\CLARIN.SI-master\\SlovParl\\Sk-11-csv\\lemma\\'+file, file);
        console.log(i++);
    })
    debugger;
})


function readFile(file, name){
    let fileData = fs.readFileSync(file, {encoding:'utf8'});
    let lines = fileData.split('\n');

    let head;

    let data = [];

    lines.forEach(line=>{
        if(!head){
            head = line.split(',');
            return;
        }
        let lineData = line.split(',');
        let dataLine = {};
        for(var i=0; i < head.length; i++){
            dataLine[head[i]] = lineData[i];
        }
        data.push(dataLine);
    })
    fs.writeFileSync('C:\\FRI\\OO\\data\\'+name+'.json', JSON.stringify(data));
    //debugger;
}