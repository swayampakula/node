const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
 input: fs.createReadStream('../crimedata.csv')
});

jsonobj = [];
rl.on('line', function (line) {
 header=line.split(","); //Getting header values
 for(var i = 0; i < header.length; i++)
 {
   if(header[i]=="Year")
    $year=i;
   else if(header[i]=="Primary Type")
    $primarytype=i;
   else if(header[i]=="Arrest")
    $arrest=i;
  }

 });

rl.on('line', (line) => {
    //var lin = line.split(',');
    var lin = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
    var obj = {};
    var arrest = ["true", "false"];
    //console.log(lin);
    obj.year = lin[$year];
    obj.arrested = 0;
    obj.notarrested = 0;
    var flag = 0;
    //console.log("Hello");
	if(lin[$primarytype] === "ASSAULT" ) {
		//console.log("Hi");
		for (var i = 0; i < jsonobj.length; i++) {
		 	if(jsonobj[i].year == lin[$year]) {
		 		//console.log(lin[8], arrest[0]);
		 		if(lin[$arrest] == arrest[0]) {
		 			//console.log("bbb");
		 			jsonobj[i].arrested = parseInt(jsonobj[i].arrested)+1;
		 			flag++;
		 		}
		 		else if(lin[$arrest] == arrest[1]) {
					jsonobj[i].notarrested = parseInt(jsonobj[i].notarrested)+1;		 
					flag++;			
		 		}
		 	}
		}; 
		if(flag == 0) {
			if(lin[$arrest]==arrest[0])
		    {
		       	obj.arrested = 1;
				jsonobj.push(obj);
			}
			if(lin[$arrest]==arrest[1])
			{
				obj.notarrested = 1;
				jsonobj.push(obj);
			}
		}  	
	}	

});

rl.on('close', function() {
	//console.log(jsonobj);
    fs.writeFileSync('crimeassault.json', JSON.stringify(jsonobj));
});