 $.ajax({
  url: '/charttextanalysis/chartdiv3', 
  type: "GET",
  dataType: "json",
  success: function (data1) {
    
    am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end
var chart = am4core.create("chartdiv", am4charts.XYChart);
// ---------main chart-----
chart.data=[];
area=[];
data1le =data1.length;
      for (let index = 0; index < data1le; index++) {
      area.push(data1[index]['alldata']) 
      
    }
                // var area = area.map(parseFloat)

 area = area.map(function(v) {
  return eval('(' + v + ')');
});
area = JSON.stringify(area);
chart.data=area;
console.log(chart.data);

// --------for category--------
Array.prototype.removeDuplicates = function () {
    return this.filter(function (item, index, self) {
        return self.indexOf(item) == index;
    });
};

pushedarray =[];
for(i=0; i<data1.length;i++){
  try{
    pushedarray=pushedarray.concat(data1[i]['category'].split(","));
  }
  catch{
    console.log(data1[i]["category"]);
  }
}
console.log('push '+pushedarray);
var item = pushedarray.removeDuplicates();
console.log('item '+item);
var series =[];
for(j=0;j<item.length;j++){
 
 eval('var series'+j+' = chart.series.push(new am4charts.LineSeries()); series'+j+'.dataFields.valueY = "italy";series'+j+'.dataFields.categoryX = "year";series'+j+'.name = '+item[j]+';series'+j+'.bullets.push(new am4charts.CircleBullet());series'+j+'.tooltipText = "Place taken by {name} in {categoryX}: {valueY}";series'+j+'.legendSettings.valueText = "{valueY}";series'+j+'.visible  = false;let hs'+j+' = series'+j+'.segments.template.states.create("hover");hs'+j+'.properties.trokeWidth = 5;series'+j+'.segments.template.strokeWidth = 1;');
 }
// --------for category end----------

// Create category axis
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "year";
categoryAxis.renderer.opposite = true;

// Create value axis
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.inversed = true;
valueAxis.title.text = "Place taken";
valueAxis.renderer.minLabelPosition = 0.01;


// Add chart cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.behavior = "zoomY";
// Add legend
chart.legend = new am4charts.Legend();
chart.legend.itemContainers.template.events.on("over", function(event){
  var segments = event.target.dataItem.dataContext.segments;
  segments.each(function(segment){
    segment.isHover = true;
  })
})

chart.legend.itemContainers.template.events.on("out", function(event){
  var segments = event.target.dataItem.dataContext.segments;
  segments.each(function(segment){
    segment.isHover = false;
  })
})

    }); 
    }
});