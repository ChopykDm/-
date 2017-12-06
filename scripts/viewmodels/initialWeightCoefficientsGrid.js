(function ($, kendo, eventBridge) {
  $(function () {
    var viewModel = kendo.observable({
      dataSource: new kendo.data.DataSource({
        data: [
          {
            criteria: "Точність управління та обчислень",
            area: 8,
            usability: 5,
            programming: 9,
            user: 7
          },
          {
            criteria: "Ступінь стандартності інтерфейсів",
            area: 4,
            usability: 9,
            programming: 6,
            user: 4
          },
          {
            criteria: "Функціональна повнота",
            area: 10,
            usability: 3,
            programming: 9,
            user: 6
          },
          {
            criteria: "Стійкість до помилок",
            area: 6,
            usability: 4,
            programming: 10,
            user: 7
          },
          {
            criteria: "Можливість розширення",
            area: 4,
            usability: 3,
            programming: 10,
            user: 2
          },
          {
            criteria: "Можливість розширення",
            area: 4,
            usability: 3,
            programming: 10,
            user: 2
          },
          {
            criteria: "Зручність роботи",
            area: 9,
            usability: 9,
            programming: 7,
            user: 10
          },
          {
            criteria: "Простота роботи",
            area: 9,
            usability: 7,
            programming: 5,
            user: 10
          },
          {
            criteria: "Відповідність чинним стандартам",
            area: 5,
            usability: 3,
            programming: 10,
            user: 2
          },
          {
            criteria: "Переносимість між програмним (апаратним) забезпеченням",
            area: 8,
            usability: 5,
            programming: 9,
            user: 6
          },
          {
            criteria: "Зручність навчання",
            area: 7,
            usability: 8,
            programming: 5,
            user: 10
          }
        ]
      })
    });
    kendo.bind($("#initialWeightCoefficientsGridContainer"), viewModel);

    viewModel.dataSource.bind('change', () => eventBridge.trigger('initialWeightCoefficients-change', viewModel.dataSource.data()))
  });
})($, kendo, eventBridge);