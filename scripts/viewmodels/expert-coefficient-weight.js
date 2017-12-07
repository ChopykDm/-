(function ($, kendo, eventBridge) {
  $(function () {
    var viewModel = kendo.observable({
      dataSource: new kendo.data.DataSource({
        data: [
          {
            expert: "Експерт з програмування",
            coefficient: 9
          },
          {
            expert: "Експерт юзабіліті",
            coefficient: 8
          },
          {
            expert: "Експерт галузі",
            coefficient: 7
          },
          {
            expert: "Потенційні користувачі",
            coefficient: 5
          }
        ]
      })
    });

    kendo.bind($("#expert-coefficient-weight-view"), viewModel);
  });
})($, kendo, eventBridge);