
/*
* Cursor Watcher
* by @goonca (https://github.com/goonca)
*/

window.$goonca = (window.$goonca || {});

$goonca.cursorWatcher = function(props) {

  const _mousemove = e => {

    const $window = {
      width : $(window).width(),
      height : $(window).height()
    }

    //get the target measures
    const objMeasure = {

      left : props.target.offset().left,
      top : props.target.offset().top,
      height : props.target.height(),
      width : props.target.width(),
      
      //here vanilla offsetWidth works better then jquery
      _width : props.target.offset().left + props.target.get(0).offsetWidth,
      _height : props.target.offset().top + props.target.get(0).offsetHeight
    }

    //capture top and left of the current cursor position
    const mouseMeasure = {

      top : e.originalEvent.clientY,
      left : e.originalEvent.clientX
    }

    const distances = {

      right : objMeasure._width - mouseMeasure.left,
      bottom : objMeasure._height - mouseMeasure.top,
      left : mouseMeasure.left - objMeasure.left,
      top : mouseMeasure.top - objMeasure.top
    }

    const percentages = {

      top : Math.round(distances.top / objMeasure.top * 100),
      bottom : Math.round(distances.bottom / Math.abs($window.height - objMeasure._height) * 100),
      left : Math.round(distances.left / objMeasure.left * 100),
      right : Math.round(distances.right / Math.abs($window.width - objMeasure._width) * 100)
    }

    return {distances : distances, percentages : percentages, measure : objMeasure}

  }

  /**
  * _apply()
  * apply the watcher to the target defined in the properties
  * @return undefined
  */
  const _apply = () => {

    $(document).on('mousemove', e => {
        props.onChange(_mousemove(e));
    });
  }

  return {apply : _apply}

}