(function ($, kendo, app) {
  $(function () {

    let view = new kendo.View('initial-weight-coefficients-template', { 
      init: function () {
        this.grid = this.element.find('[data-role="grid"]').data('kendoGrid');
        this.grid.dataSource.bind('change', () => {
          app.data['initial-weight-coefficients'] = this.grid.dataSource.data();
          app.eventBridge.trigger('data-change', this.grid.dataSource.data())
        });
      },

      model: kendo.observable({
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
        }),
  
        onGridBound: function (e) {
          app.data['initial-weight-coefficients'] = e.sender.dataSource.data();
        }
      })
    });

    view.render('#initial-weight-coefficients-view');
  });
})($, kendo, app);