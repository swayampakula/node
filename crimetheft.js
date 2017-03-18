const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
 input: fs.createReadStream('../crimedata.csv')
});
var  $year;
var $description;
jsonobj = [];
rl.on('line', function (line) {
 header=line.split(","); //Getting header values
 for(var i = 0; i < header.length; i++)
 {
   if(header[i]=="Year")
    $year=i;
   else if(header[i]=="Description")
    $description=i;
	}

 });
	
rl.on('line', (line) => {
	var lin = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);    
    var obj = {};
    obj.year = lin[$year];
    var description = ["OVER $500","$500 AND UNDER"];
    obj.overfive = 0;
    obj.underfive = 0;
    var flag = 0;
	if(description.indexOf(lin[$description]) != -1) {
		
		for (var i = 0; i < jsonobj.length; i++) {
		 	if(jsonobj[i].year == lin[$year]) {
		 		if(lin[$description] == description[0]) {
		 			jsonobj[i].overfive = parseInt(jsonobj[i].overfive)+1;
		 			flag++;
		 		}
		 		else if(lin[$description] == description[1]) {
					jsonobj[i].underfive = parseInt(jsonobj[i].underfive)+1;		 
					flag++;			
		 		}
		 	}
		}; 
		if(flag == 0) {
			if(lin[$description]==description[0])
		    {
		       	obj.overfive = 1;
				jsonobj.push(obj);
			}
			if(lin[$description]==description[1])
			{
				obj.underfive = 1;
				jsonobj.push(obj);
			}
		}  	
	}
});

rl.on('close', function() {
	//console.log(jsonobj);
    fs.writeFileSync('crimetheft.json', JSON.stringify(jsonobj));
});