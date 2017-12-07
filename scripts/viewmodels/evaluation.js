(function ($, kendo, eventBridge) {
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

    let criteries = [
      'Точність управління та обчислень',
      'Ступінь стандартності інтерфейсів',
      'Функціональна повнота',
      'Стійкість до помилок',
      'Можливість розширення',
      'Зручність роботи',
      'Простота роботи',
      'Відповідність чинним стандартам',
      'Переносимість між програмним (апаратним) забезпеченням',
      'Зручність навчання'
    ];

    let data = [];
    criteries.forEach(function (criteria) {
      data.push({
        criteria,
        area: getRandomInt(),
        usability: getRandomInt(),
        programming: getRandomInt(),
        user: get20RandomInt(),
      });
    })

    var viewModel = kendo.observable({
      dataSource: new kendo.data.DataSource({
        data: data
      })
    });
    kendo.bind($("#evaluation-view"), viewModel);

    eventBridge.bind('initial-weight-coefficients', (data) => console.log(data))
  });
})($, kendo, eventBridge);