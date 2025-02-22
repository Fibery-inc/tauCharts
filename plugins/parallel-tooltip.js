import Taucharts from "@fibery/taucharts";

var utils = Taucharts.api.utils;

function ChartParallelTooltip(xSettings) {
  var settings = utils.defaults(xSettings || {}, {
    // add default settings here
  });

  var plugin = {
    init: function (chart) {
      this._cursor = null;
      this._chart = chart;
      this._tooltip = chart.addBalloon({
        spacing: 3,
        auto: true,
        effectClass: "fade",
      });

      this._tooltip.content(this.template);

      this._tooltip.getElement().addEventListener(
        "click",
        function (e) {
          var target = e.target;

          while (target !== e.currentTarget && target !== null) {
            if (target.classList.contains("i-role-exclude")) {
              self._exclude();
            }
            target = target.parentNode;
          }

          self._tooltip.hide();
        },
        false
      );

      var self = this;
      var timeoutHide;
      this.showTooltip = function (e) {
        clearTimeout(timeoutHide);

        self._cursor = e.data;

        var content = self._tooltip.getElement().querySelectorAll(".i-role-content");
        if (content[0]) {
          content[0].innerHTML = Object.keys(e.data)
            .map(function (k) {
              return self.itemTemplate({ label: k, value: e.data[k] });
            })
            .join("");
        }

        self._tooltip.show(e.event.pageX, e.event.pageY).updateSize();
      };

      this.hideTooltip = function (e) {
        timeoutHide = setTimeout(function () {
          self._tooltip.hide();
        }, 1000);
      };

      this._tooltip.getElement().addEventListener(
        "mouseover",
        function (e) {
          clearTimeout(timeoutHide);
        },
        false
      );

      this._tooltip.getElement().addEventListener(
        "mouseleave",
        function (e) {
          self._tooltip.hide();
        },
        false
      );
    },

    _exclude: function () {
      this._chart.addFilter({
        tag: "exclude",
        predicate: (function (element) {
          return function (row) {
            return JSON.stringify(row) !== JSON.stringify(element);
          };
        })(this._cursor),
      });
      this._chart.refresh();
    },

    onRender: function (chart) {
      var self = this;

      chart
        .select(function (node) {
          return node.config.type === "PARALLEL/ELEMENT.LINE";
        })
        .forEach(function (node) {
          node.on("mouseout", function (sender, e) {
            self.hideTooltip(e);
          });

          node.on("mouseover", function (sender, e) {
            self.showTooltip(e);
          });
        });
    },

    template: [
      '<div class="tau-chart__tooltip__buttons tau-chart__tooltip__clickable">',
      '<div class="tau-chart__tooltip__button i-role-exclude">',
      '<div class="tau-chart__tooltip__button__wrap">',
      '<span class="tau-icon-close-gray"></span>',
      "Exclude",
      "</div>",
      "</div>",
      "</div>",
      '<div class="i-role-content tau-chart__tooltip__content"></div>',
    ].join(""),

    itemTemplate: utils.template(
      [
        '<div class="tau-chart__tooltip__list__item">',
        '<div class="tau-chart__tooltip__list__elem"><%=label%></div>',
        '<div class="tau-chart__tooltip__list__elem"><%=value%></div>',
        "</div>",
      ].join("")
    ),
  };

  return plugin;
}

Taucharts.api.plugins.add("parallel-tooltip", ChartParallelTooltip);

export default ChartParallelTooltip;
