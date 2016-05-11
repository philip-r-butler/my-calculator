/*global jQuery, myCalculator */
(function (jq, calc) {

    'use strict';

    calc.view = {};

    calc.view.css = {
        calculators: '.calc-calculators',
        calculatorMenu: '.calc-toolbar',
        calculatorDropDown: '.calc-dropdown',
        calculatorDropDownMenu: '.calc-dropdown-menu',
        calculatorDropDownType: '#calc-dropdown-type',
        calculatorTabs: '.calc-tabs',
        calculatorTabContent: '.calc-tab-content',
        calculatorInputDefault: '.calc-input-default',
        calculatorInputPanel: '#calc-input-panel',
        calculatorInput: '.calc-input',
        calculatorLogPanelToggle: '.calc-log-panel-toggle',
        calculatorLogPanel: '#calc-log-panel',
        calculatorHistoryTab: '#calc-tab-history',
        calculatorMemoryTab: '#calc-tab-memory',
        calculatorExpression: '.calc-expression',
        calculatorResult: '.calc-result',
        calculatorScreen: '.calc-input-screen',
        calculatorParameterX: '.calc-input-x',
        calculatorParameterY: '.calc-input-y',
        calculatorResponsiveAll: '.calc-responsive-all',
        calculatorResponsiveDesktop: '.calc-responsive-desktop',
        calculatorResponsiveMobile: '.calc-responsive-mobile'
    };

    calc.view.buttons = {
        memorySave: {
            selector: '.msave',
            callback: function () {
                calc.api.memory.save();
            }
        },
        memoryPlus: {
            selector: '.mplus',
            callback: function () {
                calc.api.memory.addTo();
            }
        },
        memoryMinus: {
            selector: '.mminus',
            callback: function () {
                calc.api.memory.subtractFrom();
            }
        },
        memoryRecall: {
            selector: '.mrecall',
            callback: function () {
                calc.api.memory.recall();
            }
        },
        memoryClear: {
            selector: '.mclear',
            callback: function () {
                calc.api.memory.clear();
            }
        },
        parameter: {
            selector: '.parameter',
            callback: function (val) {
                calc.api.parameter.set(val, calc.api.expression.get());
                calc.api.expression.clear();
            }
        },
        function: {
            selector: '.function',
            callback: function (val) {
                calc.api.expression.appendTo(val);
            }
        },
        trigonometry: {
            selector: '.trigonometry',
            callback: function (val) {
                //var units;
                //units = 'deg';
                //calc.api.expression.appendTo(' ' + units);
                calc.api.expression.appendTo(val);
            }
        },
        pi: {
            selector: '.pi',
            callback: function () {
                calc.api.expression.appendTo('pi');
            }
        },
        number: {
            selector: '.number',
            callback: function (val) {
                calc.api.expression.appendTo(val);
            }
        },
        operator: {
            selector: '.operator',
            callback: function (val) {
                calc.api.expression.appendTo(val);
            }
        },
        plusmn: {
            selector: '.plusmn',
            callback: function () {
                if (calc.api.expression.indexOf('-') === 0) {
                    calc.api.removeFirst();
                } else {
                    calc.api.expression.prependTo('-');
                }
            }
        },
        evaluate: {
            selector: '.evaluate',
            callback: function () {
                calc.api.expression.evaluate();
            }
        },
        remove: {
            selector: '.backspace',
            callback: function () {
                calc.api.expression.removeLast();
            }
        },
        clear: {
            selector: '.clear',
            callback: function () {
                calc.api.history.clear();
                calc.api.memory.clear();
                calc.api.expression.clear();
            }
        },
        reset: {
            selector: '.reset',
            callback: function () {
                calc.api.expression.clear();
            }
        }
    };

    calc.view.elements = (function (css) {
        var o, obj = {};

        for (o in css) {
            if (css.hasOwnProperty(o)) {
                obj[o] = jq(css[o]);
            }
        }
        obj.window = jq(window);

        return obj;
    }(calc.view.css));

    calc.view = (function (css, buttons, elements) {

        function getButtons() {
            return buttons;
        }

        function updateCalculatorScreen(val) {
            elements.calculatorScreen.html(val);
        }

        function updateCalculatorHistory(obj) {
            var arr, result;

            arr = [];
            arr.push('<p>', '<span class="expression">', obj.expression, '</span>', '<span class="result">', '=&nbsp;' + obj.result, '</span>', '</p>');
            result = arr.join('\n');
            elements.calculatorHistoryTab.prepend(result);
        }

        function clearCalculatorHistory() {
            elements.calculatorHistoryTab.html('');
        }

        function updateCalculatorMemory(val) {
            var arr;
            arr = [];
            arr.push('<p>');
            arr.push('<span class="result">');
            arr.push(val);
            arr.push('</span>');
            arr.push('</p>');
            console.log('update memory');
            elements.calculatorMemoryTab.html(arr.join('\n'));
        }

        function updateParameterX(val) {
            elements.calculatorParameterX.html(val);
        }

        function updateParameterY(val) {
            elements.calculatorParameterY.html(val);
        }

        function toggleInputPanel(override) {
            var visible = 'visible';

            if (elements.calculatorInputPanel.hasClass(visible) || override === 'hide') {
                elements.calculatorInputPanel.removeClass(visible);
            } else if (!elements.calculatorInputPanel.hasClass(visible) || override === 'show') {
                elements.calculatorInputPanel.addClass(visible);
            }
        }

        function toggleLogPanel(override) {
            var visible = 'visible',
                active  = 'active';

            if (elements.calculatorLogPanel.hasClass(visible) || override === 'hide') {
                elements.calculatorLogPanel.removeClass(visible);
                elements.calculatorLogPanelToggle.removeClass(active);
            } else if (!elements.calculatorLogPanel.hasClass(visible) || override === 'show') {
                elements.calculatorLogPanel.addClass(visible);
                elements.calculatorLogPanelToggle.addClass(active);
            }
        }

        function setTabs() {
            elements.calculatorTabs.on('click', 'a', function (event) {
                var selected, active, target;
                active   = 'active';
                target   = jq(event.target);
                selected = target.parent();
                console.log('tab selected');
                if (!selected.hasClass(active)) {
                    jq(css.calculatorTabs + '>li.' + active).removeClass(active);
                    selected.addClass(active);
                    jq(css.calculatorTabContent + '>div.' + active).removeClass(active);
                    jq(target.attr('href')).addClass(active);
                }
            });
        }

        function setPanels() {
            toggleInputPanel('show');
        }

        function setLogPanelToggle() {
            elements.calculatorLogPanelToggle.on('click', function () {
                if (elements.window.width() < 768) {
                    toggleInputPanel();
                    elements.calculatorLogPanel.css('width', '100%');
                } else {
                    elements.calculatorLogPanel.css('width', '30%');
                }
                toggleLogPanel();
            });
        }

        function showInputPanel(selector) {
            var def, selectedPanel;

            def = css.calculatorInputDefault.slice(1);
            if (selector) {
                selectedPanel = jq(css.calculatorInput + selector);

                if (selectedPanel.length) {
                    elements.calculatorInput.removeClass(def);
                    selectedPanel.addClass(def);
                }
            }
        }

        function getURLHash() {
            var result, re, arr;
            result = '';
            re     = new RegExp('#(.*)');
            arr    = document.URL.toString().match(re);
            if (arr) {
                result = arr[0];
            }
            return result;
        }

        function setDropDownMenus() {
            var active = 'active';

            function hideDropDownMenus() {
                jq(css.calculatorDropDown + '>a.' + active).removeClass(active);
                jq(css.calculatorDropDownMenu + '.' + active).removeClass(active);
            }

            function showDropDownMenu(target) {
                var selected;

                if (!target[0].hasAttribute('href')) {
                    selected = jq(target.parent());
                } else {
                    selected = target;
                }
                if (!selected.hasClass(active)) {
                    hideDropDownMenus();
                    selected.addClass(active);
                    jq(selected.attr('href')).addClass(active);
                }

            }

            jq(document)
                .on('click', function (event) {
                    var target;

                    target = jq(event.target);

                    if (!(target.is(css.calculatorDropDown) || target.parents().is(css.calculatorDropDown))) {
                        hideDropDownMenus();
                    } else {
                        if (target.is(css.calculatorDropDownMenu) || target.parents().is(css.calculatorDropDownMenu)) {
                            target.parent().siblings().children('.' + active).removeClass(active);
                            target.addClass(active);
                            hideDropDownMenus();
                        } else {
                            showDropDownMenu(target);
                        }
                    }
                })
                .on('click', css.calculatorDropDownType + '>li>a', function (event) {
                    showInputPanel(jq(event.target).attr('href'));
                });
        }

        function setWindowResize() {
            var preWidth;

            preWidth = elements.window.width();

            function showDesktop() {
                elements.calculatorResponsiveMobile.hide();
                elements.calculatorResponsiveDesktop.show();
            }

            function showMobile() {
                elements.calculatorResponsiveDesktop.hide();
                elements.calculatorResponsiveMobile.show();
            }

            if (preWidth < 768) {
                showMobile();
            } else {
                showDesktop();
            }
            elements.calculatorResponsiveAll.show();

            elements.window.on('resize', function (event) {
                var newWidth;

                newWidth = jq(event.target).width();

                if (preWidth >= 768 && newWidth < 768) {
                    showMobile();
                    if (elements.calculatorLogPanel.hasClass('visible')) {
                        toggleLogPanel('hide');
                        elements.calculatorLogPanel.css('width', '100%');
                    }
                }

                if (preWidth < 768 && newWidth >= 768) {
                    showDesktop();
                    if (elements.calculatorLogPanel.hasClass('visible')) {
                        elements.calculatorLogPanel.css('width', '30%');
                        toggleInputPanel('show');
                    }
                }

                preWidth = newWidth;
            });
        }

        function setCalculatorTypes(selector) {
            var i, types, type, arr, active, selectedPanel, selected;

            arr      = [];
            types    = elements.calculatorInput.map(function () {
                return this.id;
            }).toArray();
            selected = elements.calculatorInputDefault.attr('id');

            if (selector) {
                selectedPanel = jq(selector + css.calculatorInput);
                if (selectedPanel.length) {
                    selected = selector.slice(1);
                }
            }

            for (i = 0; i < types.length; i += 1) {
                type = types[i];
                if (type === selected) {
                    active = 'class="active"';
                } else {
                    active = '';
                }
                arr.push('<li>');
                arr.push('<a href="#' + type + '" ' + active + '>');
                arr.push(type.substr(0, 1).toUpperCase() + type.substr(1, type.length));
                arr.push('</a>');
                arr.push('</li>');
            }
            elements.calculatorDropDownType.html(arr.join(''));
        }

        (function () {
            var selectedInputPanel;

            selectedInputPanel = getURLHash();

            setWindowResize();
            setLogPanelToggle();
            setDropDownMenus();
            setCalculatorTypes(selectedInputPanel);
            showInputPanel(selectedInputPanel);
            setPanels();
            setTabs();
        }());

        return {
            clearHistory: clearCalculatorHistory,
            getButtons: getButtons,
            updateScreen: updateCalculatorScreen,
            updateHistory: updateCalculatorHistory,
            updateMemory: updateCalculatorMemory,
            updateX: updateParameterX,
            updateY: updateParameterY
        };

    }(calc.view.css, calc.view.buttons, calc.view.elements));

}(jQuery, myCalculator));