//# menu bar #//

(function () {
  var Nav;

  Nav = {
    init: function () {
      this.setup();
      return this.uiBind();
    },
    setup: function () {
      return $('#mainnav').find('li:not(:first-child)').toggleClass('invisible');
    },
    uiBind: function () {
      return $(document).on('click', '#mainnav', function (e) {
        return $(this).find('li:not(:first-child)').toggleClass('animate').toggleClass('invisible');
      });
    } };
  Nav.init();
}).call(this);