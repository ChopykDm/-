(function ($, kendo, app) {
  $(function () {
    var viewModel = kendo.observable({
      dataSource: new kendo.data.DataSource({
        data: [
          {
            expert: "Експерт з програмування",
            coefficient: 9,
            typeId: 'programming'
          },
          {
            expert: "Експерт юзабіліті",
            coefficient: 8,
            typeId: 'usability'
          },
          {
            expert: "Експерт галузі",
            coefficient: 7,
            typeId: 'area'
          },
          {
            expert: "Потенційні користувачі",
            coefficient: 5,
            typeId: 'user'
          }
        ]
      }),

      onGridBound: function (e) {
        app.data['expert-coefficient-weight'] = e.sender.dataSource.data();
      }
    });

    kendo.bind($("#expert-coefficient-weight-view"), viewModel);

    const grid = $("#expert-coefficient-weight-view").find('[data-role="grid"]').data('kendoGrid');
    grid.dataSource.bind('change', () => {
      app.data['expert-coefficient-weight'] = grid.dataSource.data();
      app.eventBridge.trigger('data-change', grid.dataSource.data());
    });

  });
})($, kendo, app);