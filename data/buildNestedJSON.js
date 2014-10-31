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
	var groupedSexes = _.groupBy(groupedYears[year],'Sex');
	Object.keys(groupedSexes).forEach(function(sex)
	{
		var outputSex = {name: sex, children: []};
		var groupedCounties = _.groupBy(groupedSexes[sex],'County');
		Object.keys(groupedCounties).forEach(function(county)
		{
			var outputCounty = {name: county, children: []};
			groupedCounties[county].forEach(function(nameObject)
			{
				var outputName = {
					name: nameObject['First Name'],
					size: nameObject['Count']
				};
				outputCounty.children.push(outputName);
			});
			outputSex.children.push(outputCounty);
		});
		outputYear.children.push(outputSex);
	});
	nestedNames.children.push(outputYear);
});
fs.writeFileSync('./namesNestedFull.json', JSON.stringify(nestedNames));
var dendogramData = {
	name:'M',
	children: nestedNames.children[0].children[0].children.slice(0,30)
};
fs.writeFileSync('./dendogramData.json', JSON.stringify(dendogramData));
