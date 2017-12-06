(function ($, kendo, eventBridge) {
  $(function(){
    var viewModel = kendo.observable({
      finalResults: [
        { 
          criteria: "Точність управління та обчислень", 
          area: 56,
          usability: 25,
          programming: 11,
          user: 56,
          average: 56 
        },
        { 
          criteria: "Ступінь стандартності інтерфейсів", 
          area: 28,
          usability: 44,
          programming: 92,
          user: 8,
          average: 34.3 
        },
    ]
    });
    kendo.bind($("#resultsGridContainer"), viewModel);

    eventBridge.bind('initialWeightCoefficients-change', (data) => console.log(data))
  });
})($, kendo, eventBridge);