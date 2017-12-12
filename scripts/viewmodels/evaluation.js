(function ($, kendo, app) {
  $(function () {

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    function getRandomIntByRange(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min };

    function getRandomInt() { return getRandomIntByRange(1, 10) };

    function get20RandomInt() {
      let ints = '';
      for (let i = 0; i < 20; i++) {
        ints += getRandomInt();
        ints += i + 1 === 20 ? '' : ', ';
      }

      return ints;
    }

    let data = [];
    app.criteries.forEach(function (criteria) {
      data.push({
        criteria,
        area: getRandomInt(),
        usability: getRandomInt(),
        programming: getRandomInt(),
        user: get20RandomInt(),
      });
    })

    var model = kendo.observable({
      init: function () {
        this.grid = this.element.find('[data-role="grid"]').data('kendoGrid');
        this.grid.dataSource.bind('change', () => {
          app.data['evaluation'] = this.grid.dataSource.data();
          app.eventBridge.trigger('data-change', this.grid.dataSource.data())
        });
      },

      dataSource: new kendo.data.DataSource({
        data: data
      }),

      onGridBound: function (e) {
        app.data['evaluation'] = e.sender.dataSource.data();
      }
    });

    let view = new kendo.View('evaluation-template', {
      init: model.init,
      model
    });
    view.render('#evaluation-view');

  });
})($, kendo, app);