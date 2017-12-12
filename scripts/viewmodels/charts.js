(function ($, kendo, app) {

  let labelIndex = 0;

  function calculateData() {
    const weightCoefficientsData = app.data['initial-weight-coefficients'];
    const finalEvaluationData = app.data['final-evaluation'];
    const expertCoefficientWeight = app.data['expert-coefficient-weight'];
    const userExpertCoefficientWeight = expertCoefficientWeight.find(coef => coef.typeId === 'user').coefficient
    const expertCoefficientWeightSum = expertCoefficientWeight
      .map((item) => item.coefficient)
      .reduce((a, b) =>  a + b ) - userExpertCoefficientWeight;

    const expertsWeights = []
    const userWeights = []
    const commonWeights = []

    app.criteries.forEach((criteria, i) => {
      const sum = weightCoefficientsData[i].area +
        weightCoefficientsData[i].programming +
        weightCoefficientsData[i].usability +
        weightCoefficientsData[i].user;

      const areaWeight = expertCoefficientWeight.find(coef => coef.typeId === 'area').coefficient * finalEvaluationData[i].area;
      const usabilityWeight = expertCoefficientWeight.find(coef => coef.typeId === 'usability').coefficient * finalEvaluationData[i].usability;
      const programmingWeight = expertCoefficientWeight.find(coef => coef.typeId === 'programming').coefficient * finalEvaluationData[i].programming;
      const userWeight = expertCoefficientWeight.find(coef => coef.typeId === 'user').coefficient * finalEvaluationData[i].user;

      expertsWeights.push(Number(((areaWeight + usabilityWeight + programmingWeight) / expertCoefficientWeightSum / (sum / 4)).toFixed(0))); // divided by 4 criterias
      userWeights.push(Number((userWeight / userExpertCoefficientWeight / weightCoefficientsData[i].user).toFixed(0))); // divided by 4 criterias
    });

    expertsWeights.push(expertsWeights[0]);
    userWeights.push(userWeights[0]);
    
    for(let i = 0; i < expertsWeights.length; i++){
      commonWeights.push(Number(((expertsWeights[i] + userWeights[i]) / 2).toFixed(0)))
    }

    return [
      {
        data: convertToChartData(expertsWeights), 
        title: 'Експерти',
        id: '#specialistsChart',
        color: 'blue'
      },
      {
        data: convertToChartData(userWeights), 
        title: 'Користувачі',
        id: '#userChart',
        color: 'green'
      },
      {
        data: convertToChartData(commonWeights), 
        title: 'Разом',
        id: '#commonChart',
        color: 'red'
      },
    ];
  }

  function convertToChartData(data) {
    const chartData = [];

    for (let i = 0; i <= 10; i++) {
      chartData.push(getDataItem(i))
    }

    function getDataItem(index) {
      return [index * 36, data[index]]
    }

    return chartData;
  }

  function createCharts() {  
    const data = calculateData();
    data.forEach(options => createChart(options));
  }

  function createChart(options) {
    labelIndex = 0;
    function xAxisTmpl(e) {
      return labelIndex++;
    }

    const chart = $(options.id).kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          template: (e) => e.value.y
        }
      },
      xAxis: {
        majorUnit: 360 / 10,
        labels: {
          template: xAxisTmpl
        }
      },
      title: {
        text: options.title
      },
      series: [{
        type: "polarArea",
        data: options.data,
        color: options.color
      }]
    }).data('kendoChart');
  };

  function refreshCharts () {
    const charts = $('#chartContainer').find('[data-role="chart"]');
    const data = calculateData();
    
    data.forEach((options, i) => {
      labelIndex = 0;
      const chart = $(charts[i]).data('kendoChart');
      chart.options.series[0].data = options.data;
      chart.refresh();
    });
  }


  $(() => {
    setTimeout(createCharts, 10)
  });

  app.eventBridge.bind('data-change', refreshCharts);

})($, kendo, app);