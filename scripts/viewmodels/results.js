(function ($, kendo, app) {
  $(function () {

    var viewModel = kendo.observable({
      onGridBound: (e) => { app.data['final-evaluation'] = e.sender.dataSource.data() }
    });

    setTimeout(() => {
      var data = calculateData();
      updateView(data);
    });

    app.eventBridge.bind('data-change', () => {
      var data = calculateData();
      updateView(data);
    });

    function updateView(data) {
      viewModel.set('finalResults', data);
      kendo.bind($("#results-view"), viewModel);
    }

    function calculateData() {
      var initialWeightCoefficientsData = app.data['initial-weight-coefficients'];
      var evaluationData = app.data['evaluation'];
      var data = [];

      app.criteries.forEach((criteria, i) => {
        var userEvaluations = evaluationData[i].user
          .split(',')
          .map(number => parseInt(number, 10));
          var userEvaluationsSum = userEvaluations.reduce((a, b) => a + b);
          var userEvaluationsAvg = userEvaluationsSum / userEvaluations.length;
          
          var dataItem = {
            criteria,
            area: initialWeightCoefficientsData[i].area * evaluationData[i].area,
            usability: initialWeightCoefficientsData[i].usability * evaluationData[i].usability,
            programming: initialWeightCoefficientsData[i].programming * evaluationData[i].programming,
            user: parseFloat((initialWeightCoefficientsData[i].user * userEvaluationsAvg).toFixed(2))
          };

          dataItem.average = parseFloat(((dataItem.area + dataItem.usability + dataItem.programming + dataItem.user) / 
          (evaluationData[i].area + evaluationData[i].usability + evaluationData[i].programming + userEvaluationsAvg)).toFixed(2));

        data.push(dataItem);
      });

      return data;
    }
  });
})($, kendo, app);