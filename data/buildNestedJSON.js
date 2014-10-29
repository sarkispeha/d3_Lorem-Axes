// modules
var fs = require('fs');
var _ = require('underscore');

// data
var names = require('./names.json');
var nestedNames = {name: 'names', children: []};

var groupedYears = _.groupBy(names,'Year');
Object.keys(groupedYears).forEach(function(year)
{
	var outputYear = {name: year, children: []};
	// groupedYears[year].forEach(function(nameObject)
	// {
	// 	delete nameObject['Year'];
	// });
	var groupedCounties = _.groupBy(groupedYears[year],'County');
	Object.keys(groupedCounties).forEach(function(county)
	{
		var outputCounty = {name: county, children: []};
		// groupedCounties[county].forEach(function(nameObject)
		// {
		// 	delete nameObject['County'];
		// });
		var groupedSexes = _.groupBy(groupedCounties[county],'Sex');
		Object.keys(groupedSexes).forEach(function(sex)
		{
			var outputSex = {name: sex, children: []};
			groupedSexes[sex].forEach(function(nameObject)
			{
				// delete nameObject['Sex'];
				var outputName = {
					name: nameObject['First Name'],
					size: nameObject['Count']
				};
				outputSex.children.push(outputName);
			});
			outputCounty.children.push(outputSex);
		});
		outputYear.children.push(outputCounty);
	});
	nestedNames.children.push(outputYear);
});
fs.writeFileSync('./namesNested.json', JSON.stringify(nestedNames));
