/*
 * Hover Hands 0.0.1
 * 3D hover effect
 * Eliseo Geraldo
 */

(function (root, factory) {

  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Hover = factory();
  }

})(this, function () {

  let __set_tracker = function (e) {
    let $dm = e.currentTarget;
    $dm.classList.add('--on-focus');
    $dm.addEventListener('mousemove', function (ev) {
      let x, y;

      y = Math.round((ev.offsetX - $dm.clientWidth / 2) / $dm.clientWidth * window.__sensivility);
      x = Math.round((ev.offsetY - $dm.clientHeight / 2) / $dm.clientHeight * window.__sensivility);

      $dm.style.transform = 'rotateY(' + y + 'deg) rotateX(' + -x + 'deg)';

      console.log(y, x);
    })
  }

  let __out_tracker = function (e) {
    let $dm = e.currentTarget;
    $dm.classList.remove('--on-focus');
    $dm.style.transform = 'rotateY(0deg) rotateX(0deg)';
  }

  var Hover = function (elements, sensivility, perspective) {

    window.__sensivility = sensivility || 20;
    window.__perspective = perspective || 500;

    console.log(__sensivility);
    console.log(__perspective);

    if (elements === undefined) {
      throw ' ::Constructor argument required';
    }

    if (typeof elements === 'string') {
      this.$dom = document.querySelectorAll(elements);
    } else if (typeof elements === 'object') {
      if (elements.length === undefined) {
        this.$dom = [];
        this.$dom.push(elements);
      } else if (elements.length === 0) {
        console.warn('Hover Hand can\'t find DOM elements');
      } else {
        this.$dom = elements;
      }
    }

    this.$dom[0]
      .parentNode
      .style
      .perspective = window.__perspective + 'px';

    this.$dom.forEach(function ($dm) {
      $dm.addEventListener('mouseenter', __set_tracker);
      $dm.addEventListener('mouseleave', __out_tracker);
    });
  }

  return Hover;
});
