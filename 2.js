<script>
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
// for category
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

      for(j=0;j<item.length;j++){
      console.log('itemss ' +item[j]);
      }
// for category end
// Create category axis
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "year";
categoryAxis.renderer.opposite = true;

// Create value axis
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.inversed = true;
valueAxis.title.text = "Place taken";
valueAxis.renderer.minLabelPosition = 0.01;

// Create series
var series1 = chart.series.push(new am4charts.LineSeries());
series1.dataFields.valueY = "Adrenergic ";
series1.dataFields.categoryX = "year";
series1.name = "Adrenergic";
series1.bullets.push(new am4charts.CircleBullet());
series1.tooltipText = "Place taken by {name} in {categoryX}: {valueY}";
series1.legendSettings.valueText = "{valueY}";
series1.visible  = false;

var series2 = chart.series.push(new am4charts.LineSeries());
series2.dataFields.valueY = "Adolescent";
series2.dataFields.categoryX = "year";
series2.name = 'Adolescent';
series2.bullets.push(new am4charts.CircleBullet());
series2.tooltipText = "Place taken by {name} in {categoryX}: {valueY}";
series2.legendSettings.valueText = "{valueY}";

var series3 = chart.series.push(new am4charts.LineSeries());
series3.dataFields.valueY = "Alkylating";
series3.dataFields.categoryX = "year";
series3.name = 'Alkylating';
series3.bullets.push(new am4charts.CircleBullet());
series3.tooltipText = "Place taken by {name} in {categoryX}: {valueY}";
series3.legendSettings.valueText = "{valueY}";

// Add chart cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.behavior = "zoomY";


let hs1 = series1.segments.template.states.create("hover")
hs1.properties.strokeWidth = 5;
series1.segments.template.strokeWidth = 1;

let hs2 = series2.segments.template.states.create("hover")
hs2.properties.strokeWidth = 5;
series2.segments.template.strokeWidth = 1;

let hs3 = series3.segments.template.states.create("hover")
hs3.properties.strokeWidth = 5;
series3.segments.template.strokeWidth = 1;

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
</script>