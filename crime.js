const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
 input: fs.createReadStream('../crimedata.csv')
});

jsonobj = [];

rl.on('line', (line) => {
    var lin = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
    var obj = {};
    obj.year = lin[17];
 	var nonindexcrime = ['BATTERY','ROBBERY','GAMBLING'];
 	var indexcrime = ['NARCOTICS', 'ASSAULT', 'THEFT'];
 	obj.nonindexcrimecount = 0;
 	obj.indexcrimecount = 0;
 	var flag = 0;
 	//console.log(lin[6]);
 	if(nonindexcrime.indexOf(lin[5]) != -1 || indexcrime.indexOf(lin[5]) != -1 ) {
		//console.log("hai");
		for (var i = 0; i < jsonobj.length; i++) {
		 	if(jsonobj[i].year == lin[17]) {
		 		//console.log(lin[5]);
		 		if(lin[5] == nonindexcrime[0] || lin[5] == nonindexcrime[1] || lin[5] == nonindexcrime[2]) {
		 			//console.log("hi");
		 			jsonobj[i].nonindexcrimecount = parseInt(jsonobj[i].nonindexcrimecount)+1;
		 			flag++;
		 		}
		 		//console.log(lin[5]);
		 		else if(lin[5] == indexcrime[0] || lin[5] == indexcrime[1] || lin[5] == indexcrime[2]) {

					jsonobj[i].indexcrimecount = parseInt(jsonobj[i].indexcrimecount)+1;		 
					flag++;			
		 		}
		 	}
		}; 
		if(flag == 0) {
		jsonobj.push(obj);
		}  	
	}

 });

rl.on('close', function() {
	//console.log(jsonobj);
    fs.writeFileSync('crime.json', JSON.stringify(jsonobj));
}); 