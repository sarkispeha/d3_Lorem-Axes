var myFlower = new CodeFlower("#flower", 300, 200);
myflower.update(names.json);


$(document).on('ready', function() {
	var currentCodeFlower;
      var createCodeFlower = function(json) {
        // update the jsonData textarea
        document.getElementById('jsonData').value = JSON.stringify(json);
        // remove previous flower to save memory
        if (currentCodeFlower) currentCodeFlower.cleanup();
        // adapt layout size to the total number of elements
        var total = countElements(json);
        w = parseInt(Math.sqrt(total) * 30, 10);
        h = parseInt(Math.sqrt(total) * 30, 10);
        // create a new CodeFlower
        currentCodeFlower = new CodeFlower("#visualization", w, h).update(json);
      };

      d3.json('data.json', createCodeFlower);

      document.getElementById('project').addEventListener('change', function() {
        d3.json(this.value, createCodeFlower);
      });
      document.getElementById('jsonInput').addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('visualization').scrollIntoView();
        var json = JSON.parse(document.getElementById('jsonData').value);
        currentCodeFlower.update(json);
      });
      document.getElementById('jsonConverter').addEventListener('submit', function(e) {
        e.preventDefault();
        var origin = this.children[0].children[0].value;
        var data = this.children[0].children[1].value;
        var json = convertToJSON(data, origin);
        document.getElementById('visualization').scrollIntoView();
        createCodeFlower(json);
      });

})