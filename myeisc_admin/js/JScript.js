var $j = jQuery;

function getHightestZIndex() {
    var index_highest = 0;
    $j("*").each(function () {
        var index_current = parseInt($j(this).css("zIndex"), 10);
        if (index_current > index_highest && index_current !== undefined) {
            index_highest = index_current;
        }
    });
    return index_highest;
}

window.mobilecheck = function () {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

/* GLOABLS */
var index_highest = getHightestZIndex();
var uifwInitAttr = 'data-init-uifw';
/* END GLOABLS */




// Floating Dialogs (no Action)
(function ($j) {
    jQuery.fn.uifwFloatingDialog = function (options) {

        var defaults = {
            'halign': 'center',
            'valign': 'center'
        };
        if (options) { $j.extend(defaults, options); }

        // set variables
        var halign = defaults.halign;
        var valign = defaults.valign;
        var t = this;

        // function get middle
        function xPoint() {
            return $j(window).width() / 2;
        }

        function yPoint() {
            return $j(window).height() / 2;
        }

        // center it
        function xAlign() {
            var widthDialog = $j(t).width();
            var heightDialog = $j(t).height();
            var leftInset = xPoint() - (widthDialog / 2);
            var topInset = yPoint() - (heightDialog / 2);

            $j(t).css({ 'left': leftInset, 'top': topInset, 'position': 'fixed' });
        }

        // on load do this
        $j(function () {
            xAlign();
        });

        // when everything is loaded do this
        $j(window).bind('load', function () {
            xAlign();
        });

        // if window changes size
        $j(window).resize(function () {
            xAlign();
        });

    };
})(jQuery);


// Floating Dialogs (no Action)
(function ($j) {
    jQuery.fn.uifwModalDialog2 = function (options) {

        var defaults = {
            'halign': 'center',
            'valign': 'center',
            'click': '',
            'color': 'black',
            'overlayClose': true,
            'debug': false,
            'callback': ''
        };
        if (options) { $j.extend(defaults, options); }

        // set variables
        var halign = defaults.halign;
        var valign = defaults.valign;
        var clickClass = defaults.click;
        var colour = defaults.color;
        var overlayClose = defaults.overlayClose;
        var t = this;
        var callback = defaults.callback;

        // function get middle
        function xPoint() {
            return $j(window).width() / 2;
        }

        function yPoint() {
            return $j(window).height() / 2;
        }

        // center it
        function xAlign() {
            var widthDialog = $j(t).width();
            var heightDialog = $j(t).height();
            var leftInset = xPoint() - (widthDialog / 2);
            var topInset = yPoint() - (heightDialog / 2);

            $j(t).css({ 'left': leftInset, 'top': topInset, 'position': 'fixed' });
        }

        function makeOverlay(colour) {
            if (colour === undefined) colour = 'black';
            $j(t).after('<div class="uifw-modal-overlay ' + colour + '"></div>');
            if ($j(this).find('.uifw-modal-close').length == 0 && overlayClose == true) $j(t).prepend('<div class="uifw-modal-close"/>');

            // is overlay closable
            if (overlayClose == true) $j('.uifw-modal-overlay').bind('click', function () { hideModal(); });
            if (overlayClose == true) $j('.uifw-modal-close').bind('click', function () { hideModal(); });

            // add inner div
            //if( $j(t).find('.uifw-modal-inner').size() == 0 ) $j(t).html('<div class="uifw-modal-inner">'+ $j(t).html() +'</div>');
        }

        function showModal() {
            if ($j('.uifw-modal-overlay').size() == 0) makeOverlay(colour);

            $j('.uifw-modal-overlay').fadeIn(function () {
                // show and work out offsets and hide
                $j(t).show();
                xAlign();
                $j(t).hide();
                // end

                $j(t).fadeIn(function () { modalDone() });
            });
        }

        function hideModal() {
            $j('.uifw-modal-overlay').fadeOut(function () { $j('.uifw-modal-overlay').remove(); });
            $j(t).fadeOut();
        }


        function modalDone() {
            if (typeof callback == "function") callback.call();
        }

        // on load do this
        $j(function () {
            $j(clickClass).bind('click', function () {
                showModal();
            });

            if (defaults.debug == true) showModal();
        });

        // when everything is loaded do this
        //$j(window).bind('load', function(){
        //    xAlign();
        //});

        // if window changes size
        $j(window).resize(function () {
            xAlign();
        });

    };
})(jQuery);



// UIFW Modal
(function ($j) {

    var UIFWModal = function (element, opt) {

        // defaults
        this.defaults = {
            'overlayClose': true,
            'opened': '',
            'closed': '',
            'color': 'white',
            'showClose': true,
            'duration': 500,
            'width': 500
        };
        if (opt) $j.extend(this.defaults, opt);

        // elements
        this.element = element;
        element.css('width', this.defaults.width);
        this.overlayClose = this.defaults.overlayClose;
        this.opened = (typeof this.defaults.opened === "function") ? this.defaults.opened : undefined;
        this.closed = (typeof this.defaults.closed === "function") ? this.defaults.closed : undefined;
        this.modalColor = this.defaults.color;
        this.modalOverlay = $j('<div class="uifw-modal-overlay ' + this.modalColor + '"/>');
        $j(this.element).addClass(this.modalColor);
        this.showClose = this.defaults.showClose;
        this.closeButton = $j('<div class="uifw-modal-close"/>');
        this.duration = this.defaults.duration;
        this.closeing = false;
    };

    UIFWModal.prototype = {
        open: function () {
            this.makeModal();

            // show modal overlay
            $j(this.modalOverlay).fadeIn($j.proxy(function () {
                // show and work out offsets and hide
                $j(this.element).show();
                this.xAlign();
                $j(this.element).hide();
                // end

                $j(this.element).fadeIn($j.proxy(function () {
                    if (this.opened !== undefined) this.opened();
                }, this));
            }, this));
        },

        close: function () {
            if (this.closeing) return;
            this.closeing = true;

            $j(this.modalOverlay).fadeOut();
            $j(this.element).fadeOut($j.proxy(function () {
                // remove modal
                $j(this.modalOverlay).remove();
                // remove inner modal stuff
                var children = this.element.find('.uifw-modal-inner').children().detach();
                $j(this.element).empty().append(children);
                // callback
                if (this.closed !== undefined) this.closed();
                this.closeing = false;
            }, this));
        },

        makeModal: function () {
            // add overlay
            $j('body').append(this.modalOverlay).addClass(this.modalColor);
            if (this.overlayClose == true) $j(this.modalOverlay).click($j.proxy(function () { this.close() }, this));

            // wrap modal content
            if ($j(this.element).find('.uifw-modal-inner').length == 0) {
                var innerContentWrapper = $j('<div class="uifw-modal-inner"/>').append(this.element.children());
                $j(this.element).append(innerContentWrapper);
                if (this.showClose == true) {
                    $j(this.element).prepend(this.closeButton);
                    $j(this.closeButton).bind('click', $j.proxy(function () { this.close() }, this))
                }
            }
        },

        xAlign: function () {
            var widthDialog = $j(this.element).width();
            var heightDialog = $j(this.element).height();
            var leftInset = this.xPoint() - (widthDialog / 2);
            var topInset = this.yPoint() - (heightDialog / 2);

            $j(this.element).css({ 'left': leftInset, 'top': topInset, 'position': 'fixed' });
        },

        xPoint: function () {
            return $j(window).width() / 2;
        },

        yPoint: function () {
            return $j(window).height() / 2;
        }
    };

    $j.fn.uifwModal = function (opt) {
        var element = $j(this);
        var uifwModal = element.data('UIFWModal');

        if (uifwModal && typeof uifwModal[opt] == 'function') {
            return uifwModal[opt].apply(uifwModal, [].slice.apply(arguments, [1]));
        }

        return element.each(function () {
            var element = $j(this);
            element.data('UIFWModal', new UIFWModal(element, opt));
        });
    }

    $j.fn.uifwModalDialog = $j.fn.uifwModal;

})(jQuery);

//uifwTooltipPopup2
(function (jQuery) {

    var ToolTip = function (element, options) {
        this.element = element;

        this.options = jQuery.extend({}, this.options, options);

        this.parentElement = jQuery(this.options.parent);

        var tipElement = this.tipElement = jQuery('<div class="uifw-tooltip"><section class="uifw-tt"><div class="uifw-tt-header"></div><div class="uifw-tt-body"></div><span class="uifw-tt-arr"></span><span class="uifw-tt-arr2"></span></section></div>');

        // Hack so the css for uifwTooltipPopup doesnt need changing.
        tipElement.css({
            'position': 'absolute',
            'zIndex': 9999
        });
        tipElement.find('.uifw-tt').css({
            'display': 'block',
            'position': 'relative',
            'width': this.options.width,
            'maxWidth': this.options.maxWidth,
            'minWidth': this.options.minWidth,
            'minHeight': this.options.minHeight
        });

        tipElement.addClass('tt-' + this.options.theme);

        tipElement.find('.uifw-tt').addClass('uifw-tt-' + this.options.direction);

        var title = (this.options.titleAttribute != null)
			? element.attr(this.options.titleAttribute)
			: this.options.title

        tipElement.find('.uifw-tt-header').html(title);

        var desc = (this.options.description != null)
			? this.options.description
			: element.attr(this.options.descriptionAttribute);

        tipElement.find('.uifw-tt-body').html(desc);

        var proxy = this.proxy = {
            onMouseEnter: jQuery.proxy(this.onMouseEnter, this),
            onMouseLeave: jQuery.proxy(this.onMouseLeave, this)
        };

        if (!window.mobilecheck()) {
            element.bind({
                'mouseenter': proxy.onMouseEnter,
                'mouseleave': proxy.onMouseLeave
            });
        }
    };

    ToolTip.prototype = {
        options: {
            'parent': 'body',
            'theme': 'grey',
            'direction': 'bottom',
            'space': 14,
            'title': 'Tip',
            'description': null,
            'titleAttribute': null,
            'descriptionAttribute': 'title',
            'delay': 0,
            'offsetX': 0,
            'offsetY': 0,
            'width': 200,
            'maxWidth': 400,
            'minWidth': 200,
            'minHeight': 0
        },

        setTitle: function (title) {
            this.tipElement.find('.uifw-tt-header').html(title);
        },

        setDescription: function (description) {
            this.tipElement.find('.uifw-tt-body').html(description);
        },

        setDirection: function (direction) {
            this.tipElement.find('.uifw-tt').
				removeClass('uifw-tt-' + this.options.direction).
				addClass('uifw-tt-' + direction);

            this.options.direction = direction;
        },

        showTip: function () {
            this.parentElement.append(this.tipElement);
            this.updatePosition();
        },

        hideTip: function () {
            this.tipElement.detach();
        },

        updatePosition: function () {
            var element = this.element;
            var tipElement = this.tipElement;

            var elCords = element.offset();
            var parentCords = this.parentElement.offset();

            var cords = {
                left: elCords.left - parentCords.left,
                top: elCords.top - parentCords.top
            }

            var elHeight = element.outerHeight();
            var elWidth = element.outerWidth();

            var tipWidth = tipElement.outerWidth();
            var tipHeight = tipElement.outerHeight();

            var space = this.options.space;
            var offsetX = this.options.offsetX;
            var offsetY = this.options.offsetY;

            // the bottom postion.
            var top = cords.top + elHeight + space + offsetY;

            // the bottom postion.
            var left = Math.floor((cords.left + (elWidth / 2)) - (tipWidth / 2) + offsetX);

            var direction = this.options.direction;

            if (direction == 'right' || direction == 'left') {
                top = cords.top + Math.floor(elHeight / 2) - 17 + offsetY;
                // 17 is distance from arrow center to top of the tool tip.
            }

            if (direction == 'top') {
                top = cords.top - tipHeight - space + offsetY;
            }

            if (direction == 'right') {
                left = cords.left + elWidth + space + offsetX;
            }

            if (direction == 'left') {
                left = cords.left - tipWidth - space + offsetX;
            }

            tipElement.css({
                'left': left,
                'top': top
            });
        },

        onMouseEnter: function () {
            var self = this;

            this.mouseEnterTimer = setTimeout(function () {
                self.showTip();
            }, this.options.delay);

            var element = this.element;

            this.elementTitle = element.attr('title');

            element.removeAttr('title');
        },

        onMouseLeave: function () {
            clearTimeout(this.mouseEnterTimer);

            this.hideTip();

            this.element.attr('title', this.elementTitle);
        }
    };

    jQuery.fn.uifwTooltipPopup2 = function (options) {
        var element = jQuery(this);
        var toolTip = element.data('UIFWTooltipPopup2');

        if (toolTip && typeof toolTip[options] == 'function') {
            return toolTip[options].apply(toolTip, [].slice.apply(arguments, [1]));
        }

        return element.each(function () {
            var element = jQuery(this);
            element.data('UIFWTooltipPopup2', new ToolTip(element, options));
        });
    };

})(jQuery);


// Tooltip
(function ($j) {
    jQuery.fn.uifwTooltipPopup = function (options) {

        var defaults = {
            'direction': 'bottom',
            'follow': false,
            'html': '<section class="uifw-tt"><div class="uifw-tt-header"></div><div class="uifw-tt-body"></div><span class="uifw-tt-arr"></span><span class="uifw-tt-arr2"></span></section>',
            'xos': 0,
            'yos': 0,
            'onload': false
        };
        if (options) { $j.extend(defaults, options); }

        // set variables
        var direction = defaults.direction;
        var follow = defaults.follow;
        var html = defaults.html;
        var tclass = this;
        var xos = defaults.xos;
        var yos = defaults.yos;
        var onload = defaults.onload;
        var offsetTop;
        var offsetLeft;

        // if it's going to show onload it CANNOT move with the mouse, so lets stop that from being a thing
        var follow = (onload == true) ? false : follow;

        $j(tclass).each(function () {

            var t = this;

            // get target element
            function targetElement(e) {
                var target;
                if (e != null && e !== undefined) { target = (e.currentTarget) ? e.currentTarget : e.srcElement; }
                else target = t;
                return target;
            }

            // function get mouse point
            function xPoint(e) { return (e == null) ? $j(t).offset().left : e.pageX; }
            function xPointRelative(e) { return xPoint(e) - $j(targetElement(e)).offset().left; }

            function yPoint(e) { return (e == null) ? $j(t).offset().top : e.pageY; }
            function yPointRelative(e) { return yPoint(e) - $j(targetElement(e)).offset().top; }

            function objectWidth(e) { return $j(t).outerWidth(); }
            function objectHeight(e) { return $j(t).outerHeight(); }
            function popupWidth(e) { return $j(t).find('.uifw-tt').outerWidth(); }
            function popupHeight(e) { return $j(t).find('.uifw-tt').outerHeight(); }

            // unfunk offsets
            function popupOffsetFixer(e, leftP, topP) {

                if (direction == 'right') {
                    offsetTop = 0;
                    offsetLeft = 30 + 20;
                    if (follow == false) {
                        offsetLeft = objectWidth(e) + 15;
                    }
                    offsetTop = offsetTop + yos;
                    offsetLeft = offsetLeft + xos;
                }

                if (direction == 'left') {
                    offsetTop = 0;
                    offsetLeft = 0 - popupWidth(e);
                    if (follow == false) {
                        offsetLeft = offsetLeft - 15;
                    }
                    offsetTop = offsetTop + yos;
                    offsetLeft = offsetLeft + xos;
                }

                if (direction == 'bottom') {
                    offsetTop = popupHeight(e);
                    offsetLeft = 0 - (popupWidth(e) / 2);
                    if (follow == false) {
                        offsetLeft = offsetLeft + ($j(t).outerWidth() / 2);
                        offsetTop = objectHeight(e) + 15;
                    }
                    offsetTop = offsetTop + yos;
                    offsetLeft = offsetLeft + xos;
                }

                if (direction == 'top') {
                    offsetTop = 0 - popupHeight(e);
                    offsetLeft = 0 - (popupWidth(e) / 2);
                    if (follow == false) {
                        offsetLeft = offsetLeft + ($j(t).outerWidth() / 2);
                        offsetTop = offsetTop - 15;
                    }
                    offsetTop = offsetTop + yos;
                    offsetLeft = offsetLeft + xos;
                }

                changeTooltip(e, 0, 0);
            }

            // show tooltip
            function showTooltip(e, leftP, topP) {
                // build it
                buildTooltip();

                // position it
                $j(t).find('.uifw-tt').css({ 'position': 'absolute', 'top': topP + offsetTop, 'left': leftP + offsetLeft });

                // show/hide it
                $j(t).find('.uifw-tt').show();

                // alter offset
                popupOffsetFixer(e, leftP, topP);
            }

            // change offset tooltip
            function changeTooltip(e, leftP, topP) {
                $j(t).find('.uifw-tt').css({ 'position': 'absolute', 'top': topP + offsetTop, 'left': leftP + offsetLeft });
            }


            // hide it
            function hideTooltip() {
                $j(t).find('.uifw-tt').hide(0, function () {
                    $j(t).find('.uifw-tt').remove();
                });
            }


            // build one
            function buildTooltip() {
                // build one
                if ($j(t).find('.uifw-tt').size() <= 0) $j(t).append(html);

                // add in close if onload is set
                if (onload == true) {
                    $j(t).find('.uifw-tt').append('<div class="uifw-tt-close" />');
                    $j(t).find('.uifw-tt-close').click(function () { hideTooltip(); });
                }

                // add header
                var title = $j(t).attr('data-uifw-tt-title');
                var description = $j(t).attr('data-uifw-tt-description');

                $j(t).find('.uifw-tt').find('.uifw-tt-header').text(title);
                $j(t).find('.uifw-tt').find('.uifw-tt-body').text(description);
                $j(t).find('.uifw-tt').addClass('uifw-tt-' + direction);

                if (title == '') $j(t).find('.uifw-tt').find('.uifw-tt-header').remove();
                if (description == '') $j(t).find('.uifw-tt').find('.uifw-tt-description').remove();

                // disable click & hover
                $j(t).find('.uifw-tt').click(function (e) { e.preventDefault(); });
                $j(t).find('.uifw-tt').hover(function (e) { e.preventDefault(); }, function (e) { e.preventDefault(); });
            }

            if (!window.mobilecheck()) {
                // if mouse over a tooltip element
                $j(t).bind('mouseover', function (e) {

                    if (onload != true) showTooltip(e, xPointRelative(e), yPointRelative(e));

                    $j(this).mousemove(function (e) {
                        if (follow == true) changeTooltip(e, xPointRelative(e), yPointRelative(e));
                    });
                });

                // if mouse off a tooltip element
                $j(t).mouseout(function () {
                    if (onload != true) hideTooltip();
                });

                // if onload is true show it
                if (onload == true) showTooltip(targetElement(null), xPointRelative(null), yPointRelative(null));
            }


        }); // end each

    };
})(jQuery);




// custom select boxes
(function ($j) {

    var UIFWFrmSelect = function (element, opt) {

        if (!element.attr(uifwInitAttr)) {
            // defaults
            this.defaults = { 'item': '.uiifw-layout-section.uifw-sh .body', 'scope': '.uiifw-layout' };
            if (opt) $j.extend(this.defaults, opt);

            // elements
            this.element = element;
            this.elementID = ($j(this.element).attr('id')) ? $j(this.element).attr('id') : '';
            this.elementName = $j(this.element).attr('name');
            this.elementOptionText = $j(this.element).find('option:selected').text();
            this.element.attr(uifwInitAttr, 'true');
            this.elementDropHeight = ($j(this.element).attr('data-dropdown-height') != '' && $j(this.element).attr('data-dropdown-height') !== undefined) ? $j(this.element).attr('data-dropdown-height') : 300;

            // run resize
            this.buildSelect();
        }
    };

    UIFWFrmSelect.prototype = {
        buildSelect: function () {

            this.divContainer = $j('<div class="uifw-frm-select" id="' + this.elementID + '" data-name="' + this.elementName + '" />');
            this.divTitleContainer = $j('<div class="uifw-frm-select-title" />');
            this.divTitle = $j('<span class="title">' + this.elementOptionText + '</span><span class="icon-chevron-down uifw-icon" />');
            this.divOptions = $j('<div class="uifw-frm-select-options" />');

            // append it all
            this.divTitleContainer.append(this.divTitle);
            this.divContainer.append(this.divTitleContainer);
            this.divContainer.append(this.divOptions);

            var optionMarkup = '';

            // get all options
            $j(this.element).find('option').each(function () {
                var attr_option = $j(this).text();
                var attr_title = ($j(this).attr('title') && $j(this).attr('title') != '' || $j(this).attr('title') !== undefined) ? $j(this).attr('title') : attr_option;
                var attr_value = $j(this).val();

                // if its selected make it the selected option
                var selected;
                if ($j(this).attr('selected')) selected = ' selected';
                else selected = '';

                // option markup
                optionMarkup += '<div class="uifw-frm-select-option' + selected + '" data-value="' + attr_value + '" title="' + attr_title + '" tabindex="0">' + attr_option + '</div>' + "\n";
            });
            this.divOptions.append(optionMarkup);
            this.divContainer.append(this.divOptions);
            this.element.after(this.divContainer);
            this.divContainer.bind('click', $j.proxy(function () { this.showOptions() }, this));

            this.element.bind('change', $j.proxy(function () { this.change() }, this))

            // sort out dimensions
            this.setDimensions();
            this.setSizes();
            this.restrictOptionHeight();
        },

        setDimensions: function () {
            // show for dims
            $j(this.divOptions).show();

            // set position
            var selectHeight = this.divContainer.innerHeight();

            this.divOptions.css({ 'top': selectHeight, 'float': 'none', 'z-index': 10000 });

            // move normal select box
            $j(this.element).css({ 'position': 'absolute', 'left': -20000, 'top': -20000 });

            // hide after dims
            $j(this.divOptions).hide();
        },

        setSizes: function () {

            // set position
            var selectHeight = this.divContainer.innerHeight();
            var selectWidth = this.divContainer.innerWidth();
            var selectWidthCSS = this.divContainer.css('width');
            var optionsDropdownWidth = this.divOptions.innerWidth();
            var arrowWidth = this.divContainer.find('.uifw-icon').width();
            var selectWidthInner = this.element.innerWidth();

            var optionsWidth = optionsDropdownWidth;
            optionsWidth = (optionsWidth > 250) ? 250 : optionsWidth + (arrowWidth * 2);

            var setWidth = ($j(this.element).attr('data-auto-width') == 'true' && $j(this.element).attr('data-dropdown-height') !== undefined) ? selectWidthInner : optionsWidth;

            this.divOptions.width(setWidth);
            this.divContainer.width(setWidth);

        },

        restrictOptionHeight: function () {
            var optionsDropdownHeight = this.divOptions.innerHeight();
            var optionsDropdownWidth = this.divOptions.innerWidth();

            optionsDropdownHeight = (optionsDropdownHeight > this.elementDropHeight) ? this.elementDropHeight : optionsDropdownHeight;

            if (optionsDropdownHeight >= this.elementDropHeight) {
                this.divInnerOptions = $j('<div class="inner" />').append(this.divOptions.html());
                $j(this.divOptions).html(this.divInnerOptions);

                this.divInnerOptions.height(optionsDropdownHeight);
                this.divInnerOptions.jScrollPane({ 'autoReinitialise': true, 'contentWidth': optionsDropdownWidth, 'verticalGutter': 0 });
            }


        },

        showOptions: function () {
            // unbind click for now
            this.divContainer.unbind('click');
            this.divContainer.addClass('focused');

            // set dimensions again
            this.setDimensions();

            // slide down
            this.divOptions.slideDown($j.proxy(function () {
                this.divContainer.bind('click', $j.proxy(function () { this.hideOptions() }, this));
            }, this));

            // option click event
            var tthis = this;
            this.divOptions.find('.uifw-frm-select-option').each(function () {
                $j(this).unbind('click');
                $j(this).bind('click', function (c) { tthis.optionSelected(this) });
            });
        },

        hideOptions: function () {
            this.divContainer.unbind('click');
            this.divContainer.removeClass('focused');

            this.divOptions.slideUp($j.proxy(function () {
                this.divContainer.bind('click', $j.proxy(function () { this.showOptions() }, this));
            }, this));
        },

        optionSelected: function (c, trigger) {

            trigger = typeof trigger !== 'undefined' ? trigger : true;

            c = $j(c);
            var optionText = c.text();
            var optionVal = c.attr('data-value');

            // make selected in hidden off-screen selects
            this.element.val(optionVal);

            // trigger on change
            if (trigger) this.element.trigger('change');

            // update on screen ui
            this.divOptions.find('div.uifw-frm-select-option.selected').removeClass('selected');
            this.divOptions.find('div.uifw-frm-select-option[data-value="' + optionVal + '"]').addClass('selected');
            this.divTitleContainer.find('span.title').text(optionText);

        },

        removeSelect: function () {
            this.divContainer.remove();
        },

        update: function () {
            this.removeSelect();
            this.buildSelect();
        },

        change: function () {
            var realValue = this.element.find('option:selected').val();
            if (!this.divOptions.find('.uifw-frm-select-option[data-value="' + realValue + '"]').hasClass('selected')) this.optionSelected(this.divOptions.find('.uifw-frm-select-option[data-value="' + realValue + '"]'), false);
        }

    };

    $j.fn.uifwFrmSelect = function (opt) {
        var element = $j(this);
        var uifwFrmSelect = element.data('UIFWFrmSelect');

        if (uifwFrmSelect && typeof uifwFrmSelect[opt] == 'function') {
            return uifwFrmSelect[opt].apply(uifwFrmSelect, [].slice.apply(arguments, [1]));
        }

        return element.each(function () {
            var element = $j(this);
            element.data('UIFWFrmSelect', new UIFWFrmSelect(element, opt));
        });
    }

})(jQuery);


// custom checkboxes
(function ($j) {

    var UIFWFrmCheckbox = function (element, opt) {

        if (!element.attr(uifwInitAttr)) {
            // defaults
            this.defaults = { 'item': '.uiifw-layout-section.uifw-sh .body', 'scope': '.uiifw-layout' };
            if (opt) $j.extend(this.defaults, opt);

            // elements
            this.element = element;
            this.elementID = ($j(this.element).attr('id')) ? $j(this.element).attr('id') : '';
            this.elementCheckedAttr = $j(this.element).attr('checked');
            this.hasCheckedAttr = (typeof this.elementCheckedAttr !== 'undefined') ? true : false;
            this.hasCheckedAttr = (this.hasCheckedAttr == true && this.elementCheckedAttr == 'checked') ? true : false;
            this.element.attr(uifwInitAttr, 'true');

            // run resize
            this.build();
        }
    };

    UIFWFrmCheckbox.prototype = {
        build: function () {

            // create checkbox div
            this.divContainer = $j('<div class="uifw-frm-checkbox"/>');
            if (this.hasCheckedAttr == true) this.divContainer.addClass('checked');

            // add to dom
            this.element.after(this.divContainer);

            // apply switcher
            this.divContainer.bind('click', $j.proxy(function () {
                this.doSwitch(true);
                this.element.change();
            }, this));

            // move normal select box
            $j(this.element).css({ 'position': 'absolute', 'left': -20000, 'top': -20000 });

            // listen for change event on input (mainly for when labels are used to change value of checkbox)
            var that = this;
            this.element.bind('change', function () {
                var attr = that.element.attr('checked');
                var checked = typeof attr !== 'undefined' && attr !== false;
                if (checked != that.divContainer.hasClass('checked')) {
                    that.doSwitch();
                }
            });
        },

        doSwitch: function () {
            if (this.divContainer.hasClass('checked')) {
                this.divContainer.removeClass('checked');
                this.element.removeAttr('checked');
            }
            else {
                this.divContainer.addClass('checked');
                this.element.attr('checked', 'checked');
            }
        }

    };

    $j.fn.uifwFrmCheckbox = function (opt) {
        var element = $j(this);
        var uifwFrmCheckbox = element.data('UIFWFrmCheckbox');

        if (uifwFrmCheckbox && typeof uifwFrmCheckbox[opt] == 'function') {
            return uifwFrmCheckbox[opt].apply(uifwFrmCheckbox, [].slice.apply(arguments, [1]));
        }

        return element.each(function () {
            var element = $j(this);
            element.data('UIFWFrmCheckbox', new UIFWFrmCheckbox(element, opt));
        });
    }

})(jQuery);


// custom switch
(function ($j) {

    var UIFWFrmSwitch = function (element, opt) {

        if (!element.attr(uifwInitAttr)) {
            // defaults
            this.defaults = { 'item': '.uiifw-layout-section.uifw-sh .body', 'scope': '.uiifw-layout' };
            if (opt) $j.extend(this.defaults, opt);

            // elements
            this.element = element;
            this.elementID = ($j(this.element).attr('id')) ? $j(this.element).attr('id') : '';
            this.elementCheckedAttr = $j(this.element).attr('checked');
            this.hasCheckedAttr = (typeof this.elementCheckedAttr !== 'undefined') ? true : false;
            this.hasCheckedAttr = (this.hasCheckedAttr == true && this.elementCheckedAttr == 'checked') ? true : false;
            this.element.attr(uifwInitAttr, 'true');

            // run resize
            this.build();
        }
    };

    UIFWFrmSwitch.prototype = {
        build: function () {

            // create checkbox div
            this.divContainer = $j('<div class="uifw-frm-switch"/>');
            if (this.hasCheckedAttr == true) this.divContainer.addClass('checked');

            // add to dom
            this.element.after(this.divContainer);

            this.bgSizePosition;

            // Sizes are different for each type of switch, set vars here
            if (this.element.hasClass('show-hide')) {
                this.divContainer.addClass('show-hide');
                this.bgSizePosition = { bgWidth: 106, bgHeight: 92, switchWidth: 64, switchHeight: 23 };

                if (this.element.hasClass('fr')) {
                    this.divContainer.addClass('show-hide').addClass('fr');
                    this.bgSizePosition = { bgWidth: 106, bgHeight: 92, switchWidth: 64, switchHeight: 23 };
                }
                else if (this.element.hasClass('es')) {
                    this.divContainer.addClass('show-hide').addClass('es');
                    this.bgSizePosition = { bgWidth: 106, bgHeight: 92, switchWidth: 64, switchHeight: 23 };
                }

            }

            else {
                this.divContainer.addClass('on-off');
                this.bgSizePosition = { bgWidth: 85, bgHeight: 92, switchWidth: 53, switchHeight: 23 };

                if (this.element.hasClass('fr')) {
                    this.divContainer.addClass('fr');
                    this.bgSizePosition = { bgWidth: 144, bgHeight: 92, switchWidth: 83, switchHeight: 23 };
                }
                else if (this.element.hasClass('es')) {
                    this.divContainer.addClass('es');
                    this.bgSizePosition = { bgWidth: 164, bgHeight: 92, switchWidth: 93, switchHeight: 23 };
                }
            }

            // Figure out of the offsets
            this.bgSwitchPositioning = {
                onSwitch: { x: 0 - (this.bgSizePosition.bgWidth - this.bgSizePosition.switchWidth), y: 0 },
                offSwitch: { x: 0, y: 0 - this.bgSizePosition.switchHeight },
                onOffBetween: { x: 0, y: 0 - (this.bgSizePosition.switchHeight * 2) },
                offOnBetween: { x: 0 - (this.bgSizePosition.bgWidth - this.bgSizePosition.switchWidth), y: 0 - (this.bgSizePosition.switchHeight * 3) }
            };

            if (this.element.hasClass('invert')) {
                this.bgSwitchPositioning = {
                    onSwitch: this.bgSwitchPositioning.offSwitch,
                    offSwitch: this.bgSwitchPositioning.onSwitch,
                    onOffBetween: this.bgSwitchPositioning.offOnBetween,
                    offOnBetween: this.bgSwitchPositioning.onOffBetween
                };
            }

            // apply switcher
            this.divContainer.bind('click', $j.proxy(function () {
                this.doSwitch(true);
                this.element.change();
            }, this));

            // move normal select box
            $j(this.element).css({ 'position': 'absolute', 'left': -20000, 'top': -20000 });

            // listen for change event on input (mainly for when labels are used to change value of checkbox)
            var that = this;
            this.element.bind('change', function () {
                var attr = that.element.attr('checked');
                var checked = typeof attr !== 'undefined' && attr !== false;
                if (checked != that.divContainer.hasClass('checked')) {
                    that.doSwitch();
                }
            });

            // Set sizes
            this.setSwitchSize();

            // Preset the toggle
            if (this.hasCheckedAttr) this.doOn(false);
            else this.doOff(false);
        },

        doSwitch: function () {
            // Do On
            if (!this.divContainer.hasClass('checked')) {
                this.doOn();
            }
            // Do Off
            else {
                this.doOff();
            }
        },

        doOn: function (animate) {
            var duration = (animate === false)
				? 0
				: 200;

            var self = this;
            this.divContainer.css({ 'background-position': '' + self.bgSwitchPositioning.onOffBetween.x + 'px ' + self.bgSwitchPositioning.onOffBetween.y + 'px' });

            this.divContainer.animate({
                'background-position-x': self.bgSwitchPositioning.onSwitch.x + 'px'
            }, duration, 'linear', function () {
                self.divContainer.css({ 'background-position': '' + self.bgSwitchPositioning.onSwitch.x + 'px ' + self.bgSwitchPositioning.onSwitch.y + 'px' });
            });

            this.divContainer.addClass('checked');
            this.element.attr('checked', 'checked');
        },

        doOff: function (animate) {
            var duration = (animate === false)
				? 0
				: 200;

            var self = this;
            this.divContainer.css({ 'background-position': '' + self.bgSwitchPositioning.offOnBetween.x + 'px ' + self.bgSwitchPositioning.offOnBetween.y + 'px' });

            this.divContainer.animate({
                'background-position-x': self.bgSwitchPositioning.offSwitch.x + 'px'
            }, duration, 'linear', function () {
                self.divContainer.css({ 'background-position': '' + self.bgSwitchPositioning.offSwitch.x + 'px ' + self.bgSwitchPositioning.offSwitch.y + 'px' });
            });

            this.divContainer.removeClass('checked');
            this.element.removeAttr('checked');
        },

        setSwitchSize: function () {
            this.divContainer.width(this.bgSizePosition.switchWidth);
            this.divContainer.height(this.bgSizePosition.switchHeight);
        }

    };

    $j.fn.uifwFrmSwitch = function (opt) {
        var element = $j(this);
        var uifwFrmSwitch = element.data('UIFWFrmSwitch');

        if (uifwFrmSwitch && typeof uifwFrmSwitch[opt] == 'function') {
            return uifwFrmSwitch[opt].apply(uifwFrmSwitch, [].slice.apply(arguments, [1]));
        }

        return element.each(function () {
            var element = $j(this);
            element.data('UIFWFrmSwitch', new UIFWFrmSwitch(element, opt));
        });
    }

})(jQuery);

// custom switch
(function ($j) {

    var UIFWFrmPassword = function (element, opt) {

        // elements
        this.element = element;
        this.showing = false;

        this.passwordField = this.element.clone();
        this.plainField = $j('<input type="text" class="' + this.passwordField.attr('class') + '" />').val(this.passwordField.val());

        this.placeHolderText = '';
        if (this.passwordField.attr('placeholder') !== undefined) this.placeHolderText = this.passwordField.attr('placeholder');
        this.plainField.attr('placeholder', this.placeHolderText);

        this.elementSpan = $j('<span class="uifw-frm-password"/>');
        this.icon = $j('<span class="password-icon" />');
        this.iconCheckbox = $j('<input type="checkbox" class="password-checkbox"/>');
        this.iconLabel = $j('<label class="password-label" />').text('Show');

        // Set heights
        this.elementSpan.height(this.element.outerHeight());
        this.icon.css('line-height', (this.element.innerHeight() - 1) + 'px');

        this.passwordField.bind('keyup', $j.proxy(this.syncValues, this)); //pjw

        this.build();

    };

    UIFWFrmPassword.prototype = {
        build: function () {

            // Icon Field
            this.icon.append(this.iconCheckbox);
            this.icon.append(this.iconLabel);

            // This container
            this.elementSpan.append(this.passwordField);
            this.elementSpan.append(this.plainField);
            this.elementSpan.append(this.icon);
            this.element.after(this.elementSpan);
            this.element.remove();

            // Add uifw class
            this.passwordField.addClass('uifw-frm-textfield-password');
            this.plainField.addClass('uifw-frm-textfield-password');

            // Hide fields
            this.plainField.hide();
            this.passwordField.show();

            var self = this;

            // Bind click
            this.icon.on('click', function () {
                self.swap();
            });
        },

        swap: function () {

            this.passwordVal = this.passwordField.val();
            this.plainVal = this.plainField.val();

            // Show it
            if (!this.showing) {
                this.showing = true;
                this.plainField.show();
                this.passwordField.hide();
                this.plainField.val(this.passwordVal); // Set value
                this.plainField.focus(); // Give focus
                this.iconCheckbox.attr('checked', 'checked');
            }
            else {
                this.showing = false;
                this.plainField.hide();
                this.passwordField.show();
                this.passwordField.val(this.plainVal); // Set value
                this.passwordField.focus(); // Give focus
                this.iconCheckbox.removeAttr('checked');
            }

        },

        syncValues: function () {//pjw
            this.element.val(this.passwordField.val());
        }
    };

    $j.fn.uifwFrmPassword = function (opt) {
        var element = $j(this);
        var uifwFrmPassword = element.data('UIFWFrmPassword');

        if (uifwFrmPassword && typeof uifwFrmPassword[opt] == 'function') {
            return uifwFrmPassword[opt].apply(uifwFrmPassword, [].slice.apply(arguments, [1]));
        }

        return element.each(function () {
            var element = $j(this);
            element.data('UIFWFrmPassword', new UIFWFrmPassword(element, opt));
        });
    }

})(jQuery);


// custom radio
(function ($j) {

    var UIFWFrmRadio = function (element, opt) {

        if (!element.attr(uifwInitAttr)) {
            // defaults
            this.defaults = {};
            if (opt) $j.extend(this.defaults, opt);

            // elements
            this.element = element;
            this.elementID = ($j(this.element).attr('id')) ? $j(this.element).attr('id') : '';
            this.elementName = this.element.attr('name');
            this.elementCheckedAttr = $j(this.element).attr('checked');
            this.hasCheckedAttr = (typeof this.elementCheckedAttr !== 'undefined') ? true : false;
            this.hasCheckedAttr = (this.hasCheckedAttr == true && this.elementCheckedAttr == 'checked') ? true : false;
            this.element.attr(uifwInitAttr, 'true');

            // run resize
            this.build();
        }
    };

    UIFWFrmRadio.prototype = {
        build: function () {

            // create radio div
            this.divContainer = $j('<div class="uifw-frm-radio" data-name="' + this.elementName + '"/>');
            if (this.hasCheckedAttr == true) this.divContainer.addClass('checked');

            // add to dom
            this.element.after(this.divContainer);

            // apply switcher
            this.divContainer.bind('click', $j.proxy(function () {
                this.doSwitch();
                this.element.change();
            }, this));

            // move normal select box
            $j(this.element).css({ 'position': 'absolute', 'left': -20000, 'top': -20000 });

        },

        doSwitch: function () {

            this.uncheckAll();

            if (this.divContainer.hasClass('checked')) {
                this.divContainer.removeClass('checked');
                this.element.removeAttr('checked');
            }
            else {
                this.divContainer.addClass('checked');
                this.element.attr('checked', 'checked');
            }

        },

        uncheckAll: function () {
            $j('input.uifw-frm-radio[name="' + this.elementName + '"]').each(function () {
                $j(this).removeAttr('checked');
            });
            $j('div.uifw-frm-radio[data-name="' + this.elementName + '"]').each(function () {
                $j(this).removeClass('checked');
            });
        }

    };

    $j.fn.uifwFrmRadio = function (opt) {
        var element = $j(this);
        var uifwFrmRadio = element.data('UIFWFrmRadio');

        if (uifwFrmRadio && typeof uifwFrmRadio[opt] == 'function') {
            return uifwFrmRadio[opt].apply(uifwFrmRadio, [].slice.apply(arguments, [1]));
        }

        return element.each(function () {
            var element = $j(this);
            element.data('UIFWFrmRadio', new UIFWFrmRadio(element, opt));
        });
    }

})(jQuery);



// Same height
(function () {
    jQuery.fn.uifwSameHeight2 = function (options) {

        var defaults = {
            'item': '.uiifw-layout-section.uifw-sh .body',
            'scope': '.uiifw-layout'
        };
        if (options) { $j.extend(defaults, options); }

        // set variables
        var item = defaults.item;
        var scope = defaults.scope;

        function sameHeight(c, scope) {
            if (scope) {
                $j(scope).each(function () {
                    var set = $j(this).find(c);
                    sameHeight(set);
                });
            }
            else {
                var h = 0;
                $j(c).each(function () {
                    var th = $j(this).height()
                    h = (th > h) ? th : h;
                });
                $j(c).height(h);
            }
        }

        $j(window).bind('load', function () {
            if (item && scope) sameHeight(item, scope);
        });
    };
})(jQuery);


// Same height
(function ($j) {

    var UIFWSameHeight = function (element, opt) {

        // defaults
        this.defaults = { 'item': '.uiifw-layout-section.uifw-sh .body', 'scope': '.uiifw-layout' };
        if (opt) $j.extend(this.defaults, opt);

        // elements
        this.element = element;
        this.item = this.defaults.item;
        this.scopeElement = this.defaults.scope;

        // run resize
        this.doResize(this.item, this.scopeElement);

    };

    UIFWSameHeight.prototype = {
        doResize: function (c, scope) {
            if (c === undefined) c = this.item;
            if (scope === undefined) c = this.scopeElement;

            this.undoResize(c, scope); // clear the heights to ensure it works.
            if (scope) {
                var self = this;
                $j(scope).each(function () {
                    var set = $j(this).find(c);
                    self.doResize(set, null);
                });
            }
            else if (c) {
                var h = 0;
                $j(c).each(function () {
                    var th = $j(this).height()
                    h = (th > h) ? th : h;
                });
                $j(c).height(h);
            }
        },

        undoResize: function (c, scope) {
            if (scope) {
                var self = this;
                $j(scope).each(function () {
                    var set = $j(this).find(c);
                    self.undoResize(set);
                });
            }
            else if (c) {
                $j(c).each(function () {
                    $j(this).css('height', 'auto');
                });
            }
        }
    };

    $j.fn.uifwSameHeight = function (opt) {
        var element = $j(this);
        var uifwSameHeight = element.data('UIFWSameHeight');

        if (uifwSameHeight && typeof uifwSameHeight[opt] == 'function') {
            return uifwSameHeight[opt].apply(uifwSameHeight, [].slice.apply(arguments, [1]));
        }

        return element.each(function () {
            var element = $j(this);
            element.data('UIFWSameHeight', new UIFWSameHeight(element, opt));
        });
    }

})(jQuery);

// Scrolling Panes
(function ($j) {
    $j.fn.uifwScroller = function (options) {
        $j(this).each(function () {
            if ($j(this).eq(0).children().is('.uiifw-frame-scroller-inner')) return;

            var html = $j(this).children().detach();
            html.find('script').remove();
            html = html.filter(':not(script)');

            var newHTML = $j('<div class="uiifw-frame-scroller-inner" />').append($j('<div class="inner-pad" />').append(html));
            $j(this).append(newHTML);
            newHTML.jScrollPane({ 'autoReinitialise': true });

            // hover effect
            $j('.uiifw-frame-scroller').hover(
				function () {
				    $j(this).parents('.uiifw-frame-scroller-inner').find('.jspVerticalBar').stop(true, true).fadeOut(200);
				    $j(this).find('.uiifw-frame-scroller-inner .jspVerticalBar').last().stop(true, true).fadeIn(200);
				},
				function () {
				    $j(this).parents('.uiifw-frame-scroller-inner').find('.jspVerticalBar').stop(true, true).fadeIn(200);
				    $j(this).find('.uiifw-frame-scroller-inner .jspVerticalBar').last().stop(true, true).fadeOut(200);
				}
			);

        });
    }
})(jQuery);


// Scrolling Areas
(function ($j) {
    $j.fn.uifwScrollingArea = function (options) {
        $j(this).each(function () {
            if ($j(this).eq(0).children().is('.uiifw-area-scroller-inner')) return;

            var html = $j(this).children().detach();
            html.find('script').remove();
            html = html.filter(':not(script)');

            var newHTML = $j('<div class="uiifw-area-scroller-inner" />').append($j('<div class="inner-pad" />').append(html));
            $j(this).append(newHTML);
            newHTML.jScrollPane({ 'autoReinitialise': true });

            // hover effect
            $j('.uiifw-area-scroller').hover(
				function () {
				    $j(this).parents('.uiifw-area-scroller-inner').find('.jspVerticalBar').stop(true, true).fadeOut(200);
				    $j(this).find('.uiifw-area-scroller-inner .jspVerticalBar').last().stop(true, true).fadeIn(200);
				},
				function () {
				    $j(this).parents('.uiifw-area-scroller-inner').find('.jspVerticalBar').stop(true, true).fadeIn(200);
				    $j(this).find('.uiifw-area-scroller-inner .jspVerticalBar').last().stop(true, true).fadeOut(200);
				}
			);

        });
    }
})(jQuery);


// Text fields
(function ($j) {
    $j.fn.uifwFromElements = function (options) {
        $j(this).each(function () {

            if ($j(this).attr('readonly') == 'readonly') {
                $j(this).addClass('readonly');
            }

            if ($j(this).attr('disabled') == 'disabled') {
                $j(this).addClass('disabled');
            }

        });
    }
})(jQuery);


// Minifader
(function ($j) {
    jQuery.fn.uifwMinifader = function (options) {

        var defaults = {
            'delay': 5000,
            'duration': 1000,
            'hoverStop': false,
            'showControls': false,
            'autoStart': true,
            'showNavigation': false,
            'removeEmptySlides': true,
            'hideControlsOnHover': false,
            'forceHeights': true
        };

        if (options) { $j.extend(defaults, options); }

        var elCont = this;
        var miniFaderTimer;
        var noOfSlides = $j(elCont).find('ul > li').length;


        // Set all slides to the same height
        function miniFaderSlidesHeight(el) {

            // force all heights
            if (defaults.forceHeights == true) {
                var h = 0;
                slideData = $j(el).find('ul > li').each(function () {
                    var th = $j(this).height();
                    h = (th > h) ? th : h;
                });
                $j(el).find('ul').height(h);

                $j(el).find('ul > li.hidden').each(function () {
                    $j(this).removeClass('hidden');
                });
            }

            // dont bother
            else {
                $j(el).find('ul > li.hidden').each(function () {
                    $j(this).removeClass('hidden');
                });
            }
        }


        // Fade between slides either left or right
        function miniFaderMove(el, dir) {
            var curSlide = $j(el).find('ul > li.showing');
            var curSlideIndex = $j(el).find('ul > li.showing').index();
            var slideData = $j(el).find('ul > li');
            dir = (dir == 'right') ? 1 : -1;

            var nextSlide = curSlideIndex + dir
            nextSlide = (nextSlide < 0) ? noOfSlides - 1 : nextSlide;
            nextSlide = (nextSlide >= noOfSlides) ? 0 : nextSlide;

            // unbind click
            miniFaderUnbindNavigation();
            miniFaderUnbindControls();

            // now kill the timer for now
            if (defaults.autoStart == true) miniFaderKillTimer();

            // show next, below
            $j(slideData).eq(nextSlide).addClass('pre');

            // fade next out
            $j(curSlide).stop(true, true).fadeOut(defaults.duration, function () {

                // remove first and showing class if it has it
                $j(curSlide).removeClass('showing'); $j(curSlide).removeClass('first');

                // With the prepared slide, remove pre and add the showing class.
                $j(slideData).eq(nextSlide).removeClass('pre').addClass('showing');

                // if the banner has reached the end...
                if (curSlideIndex == nextSlide || nextSlide == 0) miniFaderBuildNavigationUpdate(0);
                else miniFaderBuildNavigationUpdate(nextSlide);

                // now start the timer again
                if (defaults.autoStart == true) miniFaderStartTimer();

                // rebind the unbind for bindings
                miniFaderBindNavigation();
                miniFaderBindControls();

            });
        }

        // Jump to specifc slide
        function miniFaderGoTo(tis, slideIndex) {
            var curSlide = $j(elCont).find('ul > li.showing');
            var curSlideIndex = $j(elCont).find('ul > li.showing').index();
            var slideData = $j(elCont).find('ul > li');

            // unbind click
            miniFaderUnbindNavigation();
            miniFaderUnbindControls();

            // build navigation update
            miniFaderBuildNavigationUpdate(slideIndex);

            // now kill the timer for now
            if (defaults.autoStart == true) miniFaderKillTimer();

            // clear queue
            if ($j(curSlide).queue('fx').length == 0) {

                // show next, below
                $j(slideData).eq(slideIndex).addClass('pre');

                $j(curSlide).stop(true, true).fadeOut(defaults.duration, function () {

                    // remove first and showing class if it has it
                    $j(curSlide).removeClass('showing'); $j(curSlide).removeClass('first');

                    // With the prepared slide, remove pre and add the showing class.
                    $j(slideData).eq(slideIndex).removeClass('pre').addClass('showing');

                    // now start the timer again
                    if (defaults.autoStart == true) miniFaderStartTimer();

                    // rebind the unbind for bindings
                    miniFaderBindNavigation();
                    miniFaderBindControls();
                });
            }
        }


        // Kill Timer
        function miniFaderKillTimer() {
            window.clearInterval(miniFaderTimer);
        }

        // Start Timer
        function miniFaderStartTimer() {
            window.clearInterval(miniFaderTimer);
            miniFaderTimer = window.setInterval(function () { miniFaderMove(elCont, 'right'); }, defaults.delay);
        }


        // Build Icons
        function miniFaderBuildControls() {
            if (defaults.showControls == true && noOfSlides > 1) $j(elCont).append('<div id="jlsMiniFader-Controls"><span class="control previous">Previous</span><span class="control next">Next</span></div>');
            if (defaults.showNavigation == true && noOfSlides > 1) $j(elCont).append('<div id="jlsMiniFader-Navigation"><span class="navigation" /></div>');
            // Bind the clicks
            miniFaderBindControls();
            // if they want navigation build it
            miniFaderBuildNavigation();
        }


        function miniFaderBindControls() {
            $j(elCont).find('#jlsMiniFader-Controls').find('span.control.next').bind('click', function () { miniFaderMove(elCont, 'right'); });
            $j(elCont).find('#jlsMiniFader-Controls').find('span.control.previous').bind('click', function () { miniFaderMove(elCont, 'left'); });
        }


        function miniFaderUnbindControls() {
            $j(elCont).find('#jlsMiniFader-Controls').find('span.control.next').unbind('click');
            $j(elCont).find('#jlsMiniFader-Controls').find('span.control.previous').unbind('click');
        }


        // Build Icon Navs
        function miniFaderBuildNavigation() {

            if (defaults.showNavigation == false) return;

            var pageIndex = 0;

            $j(elCont).find('ul > li').each(function () {
                var pageClass = 'page-no-' + pageIndex;
                var index = pageIndex;
                var activeClass = (index == 0) ? ' active' : ''
                $j("#jlsMiniFader-Navigation .navigation").append('<div class="page-nav ' + pageClass + activeClass + '">' + parseInt(pageIndex + 1) + '</div>');
                pageIndex++;
            });

            miniFaderBindNavigation();
        }


        // Build Icon Navs Binding
        function miniFaderBindNavigation() {
            //console.log('bind');
            var pageIndex = 0;
            $j(elCont).find('ul > li').each(function () {
                var index = pageIndex;
                $j("#jlsMiniFader-Navigation .navigation").find('.page-nav').eq(pageIndex).bind('click', function () { miniFaderGoTo(this, index); });
                pageIndex++;
            });
        }

        // Unbuild Icon Navs Binding
        function miniFaderUnbindNavigation() {
            //console.log('unbind');
            var pageIndex = 0;
            $j(elCont).find('ul > li').each(function () {
                var index = pageIndex;
                $j("#jlsMiniFader-Navigation .navigation").find('.page-nav').eq(pageIndex).unbind('click');
                pageIndex++;
            });
        }


        // Update Navigation Slides to Active
        function miniFaderBuildNavigationUpdate(pageIndex) {
            if (defaults.showNavigation == false) return;
            var pageClass = 'page-no-' + pageIndex;
            $j(elCont).find('.page-nav.active').removeClass('active');
            $j(elCont).find('.' + pageClass).addClass('active');
        }


        // Hide Navigation
        function miniFaderHideControlsNavigation() {
            if (defaults.showNavigation == true) $j(elCont).find('#jlsMiniFader-Navigation').stop(true, true).fadeOut();
            if (defaults.showControls == true) $j(elCont).find('#jlsMiniFader-Controls').stop(true, true).fadeOut();
        }

        // Hide Navigation
        function miniFaderShowControlsNavigation() {
            if (defaults.showNavigation == true) $j(elCont).find('#jlsMiniFader-Navigation').stop(true, true).fadeIn();
            if (defaults.showControls == true) $j(elCont).find('#jlsMiniFader-Controls').stop(true, true).fadeIn();
        }


        // remove empty
        function miniFaderRemoveEmptySlides() {
            $j(elCont).find('ul > li').each(function () {
                if ($j(this).html() == '') $j(this).remove();
            });

            noOfSlides = $j(elCont).find('ul > li').length;
        }


        $j(function () {
            // Mini 
            miniFaderRemoveEmptySlides();

            // Remove empty slides
            if (defaults.removeEmptySlides == true) miniFaderRemoveEmptySlides();

            // Run Same Height Function
            miniFaderSlidesHeight(elCont);

            // If the user wants controls
            if (defaults.showControls == true || defaults.showNavigation) miniFaderBuildControls();


            // Start Timer if there are more than 1 banners
            if (noOfSlides > 1 && defaults.autoStart == true) miniFaderStartTimer();


            // If the user wants hover to stop the banner, do this
            if (defaults.hoverStop == true) {
                $j(elCont).find('ul').bind('mouseenter', miniFaderKillTimer).bind('mouseleave', miniFaderStartTimer);
            }


            // Hide page navigation and controls on hover out
            if (defaults.hideControlsOnHover == true) {
                miniFaderHideControlsNavigation();
                $j(elCont).hover(function () { miniFaderShowControlsNavigation() }, function () { miniFaderHideControlsNavigation(); });
            }


            // unbind window
            $j(window).focus(function () {
                miniFaderStartTimer();
            });

            $j(window).blur(function () {
                miniFaderKillTimer();
            });
        });
    }
})(jQuery);


// Fix font sizes
(function ($j) {
    $j.fn.uifwFillFont = function (options) {
        var fontSize = options.maxFontPixels;
        var ourText = $j('span:visible:first', this);
        var maxHeight = $j(this).height();
        var maxWidth = $j(this).width();
        var textHeight;
        var textWidth;
        do {
            ourText.css('font-size', fontSize);
            textHeight = ourText.height();
            textWidth = ourText.width();
            fontSize = fontSize - 1;
        } while ((textHeight > maxHeight || textWidth > maxWidth) && fontSize > 3);
        return this;
    }
})(jQuery);



// Collapse Layouts
(function ($j) {

    var UIFWCollapse = function (element, opt) {

        // elements
        this.element = element;
        this.elementHeader = this.element.find('> header');
        this.elementBody = this.element.find('> .body');
        this.headerArrow = $j('<div class="uifw-collapse up" />');

        // run collapse
        this.doInitCollapse();

        // add arrow
        this.elementHeader.prepend(this.headerArrow);

        // bind the clicks
        this.elementHeader.bind('click', $j.proxy(function () {
            this.toggleCollapse();
        }, this));

    };

    UIFWCollapse.prototype = {
        doInitCollapse: function () {
            if (!this.element.hasClass('init-show')) {
                this.elementBody.hide();
                this.elementHeader.css({ 'border-bottom-width': '0' });
                this.headerArrow.removeClass('up').addClass('down');
            }
        },

        doCollapse: function () {
            this.element.find('.body').slideUp($j.proxy(function () {
                this.elementHeader.css({ 'border-bottom-width': '0' });
            }, this));
            this.headerArrow.removeClass('up').addClass('down');
        },

        undoCollapse: function () {
            this.element.find('.body').slideDown();
            this.elementHeader.css({ 'border-bottom-width': '1px' });
            this.headerArrow.removeClass('down').addClass('up');
        },

        toggleCollapse: function () {
            if (this.elementBody.is(':visible')) {
                this.doCollapse();
            }
            else {
                this.undoCollapse();
            }
        }
    };

    $j.fn.uifwCollapse = function (opt) {
        var element = $j(this);
        var uifwCollapse = element.data('UIFWCollapse');

        if (uifwCollapse && typeof uifwCollapse[opt] == 'function') {
            return uifwCollapse[opt].apply(uifwCollapse, [].slice.apply(arguments, [1]));
        }

        return element.each(function () {
            var element = $j(this);
            element.data('UIFWCollapse', new UIFWCollapse(element, opt));
        });
    }

})(jQuery);



// Progress Bars
(function ($j) {

    var UIFWProgressBars = function (element, opt) {
        this.element = element;

        // defaults
        this.defaults = { 'delay': 500, 'duration': 1000, 'change': null, 'complete': null, 'value': null };
        if (opt) $j.extend(this.defaults, opt);

        // add inner progress
        this.progressBarInner = $j('<div class="uifw-progress-bar-inner" />');
        this.progress = $j('<div class="progress" />');
        this.progressBarInner.append(this.progress)
        element.append(this.progressBarInner);

        // duration time relative
        this.duration = this.defaults.duration / 100;

        // animate
        if (this.defaults.value != null) {
            if (this.defaults.delay != null) {
                setTimeout($j.proxy(function () { this.animateProgress(this.defaults.value) }, this), this.defaults.delay);
            }
            else this.animateProgress(this.defaults.value);
        }
    };

    UIFWProgressBars.prototype = {
        animateProgress: function (value) {
            value = (value > 100) ? 100 : (value < 0) ? 0 : value;
            if (this.element.hasClass('done')) this.element.removeClass('done');

            // duration
            var currentValue = parseInt($j(this.progress).width()); // store current value
            $j(this.progress).css('width', 'auto'); // reset width to auto
            var parentWidth = $j(this.progress).width(); // get its 100% pixel width

            $j(this.progress).width(currentValue);
            var onePercent = parentWidth / 100;
            var currentValuePercent = Math.round(currentValue / onePercent);

            var valueDifference = (value > currentValuePercent) ? (value - currentValuePercent) : (currentValuePercent - value);
            var thisDuration = valueDifference * this.duration;
            $j(this.progress).stop(false, false).animate({ width: value + '%' }, thisDuration, 'linear', $j.proxy(function () {
                this.isChanged();
                if (value >= 100) this.isDone();
            }, this));
        },

        progressTo: function (value) {
            value = (value > 100) ? 100 : (value < 0) ? 0 : value;
            // duration
            var thisDuration = value * this.duration;
            $j(this.progress).css('width', 0);
            $j(this.progress).stop(true, true).animate({ width: value + '%' }, thisDuration, 'linear', this.defaults.change);
        },

        progressSet: function (value) {
            value = (value > 100) ? 100 : (value < 0) ? 0 : value;
            $j(this.progress).stop(true, true).css({ width: value + '%' });
            this.defaults.change;
        },

        isDone: function () {
            $j(this.element).addClass('done');
            if (this.defaults.complete != null && typeof this.defaults.complete == 'function') this.defaults.complete();
        },

        isChanged: function () {
            if (this.defaults.change != null && typeof this.defaults.change == 'function') this.defaults.change();
        },

        getValue: function () {
            var currentValue = parseInt($j(this.progress).width()); // store current value
            $j(this.progress).css('width', 'auto'); // reset width to auto
            var parentWidth = $j(this.progress).width(); // get its 100% pixel width

            $j(this.progress).width(currentValue);
            var onePercent = parentWidth / 100;
            var currentValuePercent = Math.round(currentValue / onePercent);

            return currentValuePercent;
        }
    };

    $j.fn.uifwProgressBars = function (opt) {
        var element = $j(this);
        var uifwProgressBars = element.data('UIFWProgressBars');

        if (uifwProgressBars && typeof uifwProgressBars[opt] == 'function') {
            return uifwProgressBars[opt].apply(uifwProgressBars, [].slice.apply(arguments, [1]));
        }

        return element.each(function () {
            var element = $j(this);
            element.data('UIFWProgressBars', new UIFWProgressBars(element, opt))
        });
    }

})(jQuery);



// Tabbed Layout
(function ($j) {
    jQuery.fn.uifwTabbedLayout = function (options) {

        var defaults = {
            'fixed': false
        };

        if (options) { $j.extend(defaults, options); }

        $j(this).each(function () {

            var fixed = defaults.fixed;

            if ($j(this).hasClass('fixed')) fixed = true;
            var t2 = this;
            var tabs = $j(t2).find('.tabs');

            function hideAll() {
                $j(t2).find('.tabs li.selected').each(function () { $j(this).removeClass('selected'); });
                $j(t2).find('.tab-content .tab').each(function () { $j(this).removeClass('selected'); });
            }

            // click tab
            $j(tabs).find('li').bind('click', function (e) {

                if (fixed == false) e.preventDefault();
                else return;

                var thisIndex = $j(this).parent().children().index(this);
                var theTabCont = $j(t2).find('.tab-content > .tab').eq(thisIndex);

                // hide all
                hideAll();

                // selected tab
                $j(this).addClass('selected');

                // selected tab content
                $j(this).parents('.tabs').parent('.uifw-tabbed-layout').find('.tab-content .tab').eq(thisIndex).addClass('selected');

            });

        });

    }
})(jQuery);


// Switched Layout
(function ($j) {
    jQuery.fn.uifwSwitchedLayout = function (options) {

        var defaults = {
            'fixed': false
        };

        if (options) { $j.extend(defaults, options); }

        $j(this).each(function () {

            var fixed = defaults.fixed;

            if ($j(this).hasClass('fixed')) fixed = true;
            var t2 = this;
            var tabs = $j(t2).find('.switch-buttons');

            function hideAll() {
                $j(t2).find('.switch-buttons li.selected').each(function () { $j(this).removeClass('selected'); });
                $j(t2).find('.switch-content .scont').each(function () { $j(this).removeClass('selected'); });
            }

            // click tab
            $j(tabs).find('li').bind('click', function (e) {

                if (fixed == false) e.preventDefault();
                else return;

                var thisIndex = $j(this).parent().children().index(this);
                var theTabCont = $j(t2).find('.switch-content > div.scont').eq(thisIndex);

                // hide all
                hideAll();

                // selected tab
                $j(this).addClass('selected');

                // selected tab content
                $j(this).parents('.switch-buttons').parent().find('.switch-content .scont').eq(thisIndex).addClass('selected');

            });

        });

    }
})(jQuery);


// UIALerts
(function () {
    jQuery.fn.uifwAlerts = function () {

        window.uifwAlert = function (message, confirmLbl, cancelLbl, confirmCallback, cancelCallback, confirmType) {

            // function get middle
            function xPoint() {
                return $j(window).width() / 2;
            }

            function yPoint() {
                return $j(window).height() / 2;
            }

            // center it
            function xAlign() {
                var widthDialog = $j('.uifw-alert-message').width();
                var heightDialog = $j('.uifw-alert-message').height();
                var leftInset = xPoint() - (widthDialog / 2);
                var topInset = yPoint() - (heightDialog / 2);

                $j('.uifw-alert-message').css({ 'left': leftInset, 'top': topInset, 'position': 'fixed' });
            }

            // center it
            function xDoAlignStuff(c) {
                var widthDialog = $j('.uifw-alert-message').width();
                var heightDialog = $j('.uifw-alert-message').height();
                var leftInset = xPoint() - (widthDialog / 2);
                var topInset = yPoint() - (heightDialog / 2);

                if (c == 'top') return topInset;
                if (c == 'left') return leftInset;
            }

            function dismissModal(callback) {
                // add close function
                $j('.uifw-alert-overlay').fadeOut(500);
                $j('.uifw-alert-message').animate({ top: -500 }, 500, function () {
                    // now delete the elements
                    $j('.uifw-alert-message').remove();
                    $j('.uifw-alert-overlay').remove();

                    // do call back
                    if (typeof callback == "function") callback.call();
                });
            }

            // set text vars
            if (confirmLbl == '' || confirmLbl === undefined) confirmLbl = 'Okay';
            if (cancelLbl == '' || cancelLbl === undefined) cancelLbl = 'Cancel';

            var buttonColour;
            switch (confirmType) {
                case 'confirm':
                    buttonColour = 'blue';
                    break;
                case 'destruct':
                    buttonColour = 'red';
                    break;
                default:
                    buttonColour = 'blue';
                    break;
            }

            //console.log(buttonColour);
            // build alert

            // overlay
            if ($j('.uifw-alert-overlay').length == 0) $j('body').append('<div class="uifw-alert-overlay" />');
            $j('.uifw-alert-overlay').fadeIn(500);

            // message box
            var buttons = '<a href="#" class="uifw-frm-button grey small" id="btn-cancel">' + cancelLbl + '</a> <a href="#" class="uifw-frm-button small ' + buttonColour + '" id="btn-confirm">' + confirmLbl + '</a>';
            if ($j('.uifw-alert-message').length == 0) $j('.uifw-alert-overlay').after('<div class="uifw-alert-message"><div class="message">' + message + '</div><div class="buttons">' + buttons + '</div></div>');
            $j('.uifw-alert-message').show();
            $j('.uifw-alert-message').css('left', xDoAlignStuff('left'));

            // animate in the message
            $j('.uifw-alert-message').show().animate({ top: xDoAlignStuff('top') }, 500, function () { });

            // if window is resized
            $j(window).resize(function () { xAlign() });

            // close modal on cancel
            $j('.uifw-alert-message').find('#btn-cancel').bind('click', function () { dismissModal(cancelCallback) });

            // close modal on confirm
            $j('.uifw-alert-message').find('#btn-confirm').bind('click', function () { dismissModal(confirmCallback) });

            //alert(message);

        }

    }
})(jQuery);



// Scrollable Area
(function ($j) {

    var UIFWCustomScroll = function (element, opt) {

        // defaults
        this.defaults = {
            'autoHide': true,
            'enabledMouseWheel': true
        };
        if (opt) $j.extend(this.defaults, opt);

        var self = this;

        this.elementBu = element;
        this.element = element;


        if (this.element.attr('data-uifw-started') != 'yes') {
            this.element.attr('data-uifw-started', 'yes');
            this.elementContent = this.elementBu.children().detach();
        }

        this.defaults.autoHide = false;
        this.defaults.loadBottom = false;

        // If auto hide
        if (this.element.hasClass('auto-hide')) this.defaults.autoHide = true;
        else if (this.element.hasClass('no-auto-hide') || !this.element.hasClass('auto-hide')) this.defaults.autoHide = false;

        if (this.element.hasClass('load-bottom')) this.defaults.loadBottom = true;
        else this.defaults.loadBottom = false;

        this.insidePosition = 0;
        this.scrollBarPosition = 0;

        // Make elements
        this.scrollContainer = $j('<div class="uifw-scrollbar" />');
        this.scrollTrack = $j('<div class="track" />');
        this.scrollBar = $j('<div class="bar" />');
        this.scrollTop = $j('<div class="scroll-top" />');
        this.scrollBottom = $j('<div class="scroll-bottom" />');
        this.scrollInner = $j('<div class="uifw-scroll-inner" />');

        this.scrollAmount = 10;

        // Inner
        if (this.element.find('.uifw-scroll-inner').length == 0) {
            this.element.html(this.scrollInner);
            this.scrollInner.html(this.elementContent);
        }

        // Aplify
        this.aplify = 0;

        self.init();

        // If window resizes
        $j(window).bind('resize', function () {
            self.init();
        });

        var proxy = this.proxy = {
            onTouchMove: jQuery.proxy(this.onTouchMove, this),
            onTouchEnd: jQuery.proxy(this.onTouchEnd, this),
            onTouchStop: jQuery.proxy(this.onTouchStop, this)
        };

        element.bind({
            'touchmove': proxy.onTouchMove,
            'touchend': proxy.onTouchEnd
        });
    };

    UIFWCustomScroll.prototype = {

        init: function () {

            if (this.element.attr('data-uifw-started') == 'yes') {
                this.getHeights();
                if (this.insideHeight > this.containerHeight) {

                    // Bar
                    this.scrollTrack.append(this.scrollBar);
                    this.scrollTrack.append(this.scrollTop);
                    this.scrollTrack.append(this.scrollBottom);
                    this.scrollContainer.append(this.scrollTrack);

                    this.addScrollbars();
                    if (this.defaults.enabledMouseWheel) this.mouseWheelScroll();
                    if (this.defaults.autoHide) this.setShowHide();

                    this.fixScrollbarHeight();
                    this.doScroll();

                    if (this.defaults.loadBottom) this.scrollToBottom();
                }

                else {
                    //this.setInnerWidth();
                    this.scrollTrack.detach();
                }
            }

        },

        addScrollbars: function () {
            var t = this;

            // CSS
            this.element.css({ 'overflow': 'hidden' });
            //this.element.attr('unselectable', 'on').css({'-ms-user-select': 'none', '-moz-user-select': 'none', '-webkit-user-select': 'none', 'user-select': 'none'});

            this.element.append(this.scrollContainer);

            // Enable dragging function
            this.scrollBar.draggable({ axis: "y", refreshPositions: true, containment: "parent", drag: function (event, ui) { t.doScroll(event) } });

            this.setInnerWidth();
            this.getHeights();
            this.setScrollBarSize();
        },


        /*
        Method to be called whenever data is added or removed or when the scrollbar needs to be recalculated
        */
        resize: function () {
            this.getHeights();
            this.getPositions();
            this.setScrollBarSize();
        },

        /*
        Fix scrollbar track height, this prevent it disappearing if margin/padding is added
        */
        fixScrollbarHeight: function () {
            var alreadyShowing = (this.scrollContainer.filter(":visible").length == 1) ? true : false;
            if (!alreadyShowing) this.flashShow();

            this.scrollContainer.css('height', '100%');
            if (this.scrollTrack.outerHeight(true) > this.containerHeight) {
                this.scrollContainer.height(this.scrollTrack.height() - (this.scrollTrack.outerHeight(true) - this.scrollTrack.height()));
                this.resize();
            }

            if (!alreadyShowing) this.flashHide();
        },


        /*
        Function to calculate and set the heights of elements needed for the scrollbar
        */
        getHeights: function () {
            this.containerHeight = this.element.height();
            this.insideHeight = this.scrollInner.innerHeight();
            this.scrollBarTrackHeight = this.scrollContainer.height();
        },

        /*
        If any padding is added to the inner div it will be ignored
        */
        setInnerWidth: function () {
            this.scrollInner.css('width', '100%')
            this.scrollInner.width(this.scrollInner.width() - (this.scrollInner.innerWidth() - this.scrollInner.width()));
        },

        /*
        Get and set the positions of the scrollbar and inner content
        */
        getPositions: function () {
            this.insidePosition = this.scrollInner.position();
            this.scrollBarPosition = this.scrollBar.position();
        },

        /*
        Calculate and set the scrollbar size
        */
        setScrollBarSize: function () {
            // Amplify is used to figure out how much extra distance a scrollbar move should move the inner view
            this.amplify = (this.scrollBarTrackHeight / this.insideHeight);

            this.scrollBarHeight = (this.scrollBarTrackHeight * this.amplify) + ((this.containerHeight - this.scrollBarTrackHeight) * this.amplify);
            this.scrollBar.height(this.scrollBarHeight);
        },

        /*
        When a scroll actions is made on the scrollbar this must be called to update the inner view.
        */
        doScroll: function (event) {
            var alreadyShowing = (this.scrollContainer.filter(":visible").length == 1) ? true : false;
            if (!alreadyShowing) this.flashShow();
            this.getPositions();
            this.scrollInner.css('top', (0 - this.scrollBarPosition.top) / this.amplify);
            this.checkBounds();
            if (!alreadyShowing) this.flashHide();
        },

        /*
        When the user scrolls with the mouse wheel this function is used to calculate the move and prevent scrolling beyond the bounds.
        */
        mouseWheelScroll: function () {
            var t = this;
            this.element.mousewheel(function (event, delta, deltaX, deltaY) {
                t.checkBounds();

                // Scroll up
                if (deltaY > 0) {
                    if (!t.topBoundHit()) {
                        t.scrollBar.css('top', (t.scrollBarPosition.top - t.scrollAmount));
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    else t.scrollBar.css('top', t.scrollBarTopPoint);
                }

                // Scroll down
                if (deltaY < 0) {
                    if (!t.bottomBoundHit()) {
                        t.scrollBar.css('top', (t.scrollBarPosition.top + t.scrollAmount));
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    else t.scrollBar.css('top', t.scrollBarTrackHeight - t.scrollBarHeight);
                }

                t.doScroll(event);

            });
        },

        // Scroll to positions
        scrollToTop: function () {
            this.scrollBar.css('top', 0);
            this.doScroll();
        },

        scrollToBottom: function () {
            this.scrollBar.css('top', this.scrollBarTrackHeight - this.scrollBarHeight);
            this.doScroll();
        },

        scrollToElement: function (element) {
            var currentPos = parseInt(this.scrollBar.css('top'), 10);
            if (element.position().top >= currentPos && element.position().top <= (currentPos + this.scrollBarHeight)) {
                //visible
            } else {
                if ((element.position().top + element.outerHeight()) >= this.scrollBarTrackHeight) {
                    this.scrollBar.css('top', this.scrollBarTrackHeight - this.scrollBarHeight);
                    this.doScroll();
                } else {
                    this.scrollBar.css('top', element.position().top);
                    this.doScroll();
                }
            }
        },


        // Check whether the scrolling has breached the bounds and stop
        checkBounds: function () {
            this.scrollBarTopPoint = 0;
            this.scrollBarBottomPoint = this.scrollBarPosition.top + this.scrollBarHeight;
        },

        topBoundHit: function () {
            this.checkBounds();
            if (this.scrollBarPosition.top - this.scrollAmount <= this.scrollBarTopPoint) return true;
            else return false;
        },

        bottomBoundHit: function () {
            this.checkBounds();
            if (this.scrollBarTrackHeight <= this.scrollBarBottomPoint + this.scrollAmount) return true;
            else return false;
        },

        /*
        Enable auto hiding of the scrollbar
        */
        setShowHide: function () {
            var t = this;

            // Hide after a second
            this.element.mousemove(function () { t.showScrollBar() });
            setTimeout(function () { t.hideScrollBar() }, 500);

            this.element.bind('mousedown', function () {
                t.clickInteracting = true;
            });

            $j(document).bind('mouseup', function () {
                t.clickInteracting = false;
            });

            this.element.bind('mouseenter', function () {
                t.hoverInteracting = true;
            });

            this.element.bind('mouseleave', function () {
                t.hoverInteracting = false;
            });


            this.element.bind('mouseenter', function () {
                t.showScrollBar();
            });

            this.element.bind('mouseleave', function () {
                if (!t.clickInteracting && !t.hoverInteracting) t.hideScrollBar();
                else {
                    $j(document).bind('mouseup', function () {
                        if (!t.hoverInteracting) t.hideScrollBar();
                    });
                }
            });
        },

        showScrollBar: function () {
            this.scrollContainer.stop(true, true);
            if (this.scrollContainer.filter(":visible").length == 0) this.scrollContainer.stop(true, true).fadeIn();
        },

        hideScrollBar: function () {
            this.scrollContainer.stop(true, true);
            if (this.scrollContainer.filter(":visible").length == 1) this.scrollContainer.stop(true, true).fadeOut();
        },

        flashShow: function () {
            this.scrollContainer.stop(true, true).show();
        },

        flashHide: function () {
            this.scrollContainer.stop(true, true).hide();
        },

        /* begin touch scrolling fudge */
        lastX: null,
        lastY: null,

        /**
        ## Property: scrollChild -> (Boolean)

        If set to `true` then the element that is scrolled is the first child 
        element of the element that was passed to the constructor.

        Default value is `false`.
        */
        scrollChild: false,

        /**
        ## Property: scrollX -> (Boolean)

        If set to `true' the the scroll element is scrolled on the x axis. 

        Default value is `true`.
        */
        scrollX: true,

        /**
        ## Property: scrollY -> (Boolean)

        If set to `true' the the scroll element is scrolled on the y axis. 

        Default value is `true`.
        */
        scrollY: true,

        nullifyLast: function () {
            this.lastX = null;
            this.lastY = null;
        },

        onTouchMove: function (event) {
            clearTimeout(this.timer);

            if (event.originalEvent.touches.length > 1) return;

            event.preventDefault();

            var element = this.element;
            var lastX = this.lastX;
            var lastY = this.lastY;

            if (this.scrollChild) {
                element = element.children().eq(0);
            }

            var touch = event.originalEvent.touches[0];
            var pageX = touch.pageX;
            var pageY = touch.pageY;

            this.lastY = pageY;
            this.lastX = pageX;

            var diffX = lastX - pageX;
            var diffY = lastY - pageY;

            var left = element.scrollLeft();
            var top = element.scrollTop();

            var offsetX = left + diffX;
            var offsetY = top + diffY;

            if (offsetX < 0) offsetX = 0;
            if (offsetY < 0) offsetY = 0;

            if (this.scrollX && lastX !== null) {
                element.scrollLeft(offsetX);
            }

            if (this.scrollY && lastY !== null) {
                element.scrollTop(offsetY);
            }

            var newLeft = element.scrollLeft();
            var newTop = element.scrollTop();

            if (newLeft != left || newTop !== top) {
                event.stopPropagation();

                jQuery(this).trigger('scroll.touchscroll', [offsetX, offsetY]);
            }

            this.timer = setTimeout(this.proxy.onTouchStop, 250);
        },

        onTouchEnd: function (event) {
            clearTimeout(this.timer);

            this.nullifyLast();
        },

        onTouchStop: function () {
            this.nullifyLast();
        }

        /* end touch scrolling fudge */
    };


    $j.fn.uifwCustomScroll = function (opt) {
        var element = $j(this);
        var uifwCustomScroll = element.data('UIFWCustomScroll');

        if (uifwCustomScroll && typeof uifwCustomScroll[opt] == 'function') {
            return uifwCustomScroll[opt].apply(uifwCustomScroll, [].slice.apply(arguments, [1]));
        }

        return element.each(function () {
            var element = $j(this);
            element.data('UIFWCustomScroll', new UIFWCustomScroll(element, opt));
        });
    }

    $j.fn.uifwCustomScroll = $j.fn.uifwCustomScroll;

})(jQuery);



// Scrollable Area
(function ($j) {

    var UIFWDropDown = function (element, opt) {

        // defaults
        this.defaults = {
            'autoHide': true,
            'enabledMouseWheel': true
        };
        if (opt) $j.extend(this.defaults, opt);

        var self = this;
        this.element = element;
        this.elementTitle = element.find('.uifw-dropdown-title');
        this.overlay = $j('<div class="uifw-dropdown-close-overlay" />');
        this.overlay.on('click', function () { self.closeDropdown(); });
        this.closeDropdown();
    };

    UIFWDropDown.prototype = {

        openDropdown: function () {
            var self = this;
            this.elementTitle.off('click');
            this.element.removeClass('closed').addClass('open');

            this.elementTitle.on('click', function () { self.closeDropdown() });
            this.openOverlay();

            this.posCheck();
        },

        closeDropdown: function () {
            var self = this;
            this.elementTitle.off('click');
            this.element.removeClass('open').addClass('closed'); ;

            this.elementTitle.on('click', function () { self.openDropdown() });
            this.closeOverlay();
        },

        posCheck: function () {
            var windowWidth = $j(window).width();
            var popoutWidth = this.element.find('.uifw-dropdown-area').width();
            var popoutPosX = this.element.find('.uifw-dropdown-area').offset().left;
            if ((popoutPosX + popoutWidth) >= windowWidth) this.element.addClass('popout-right');
        },

        openOverlay: function () {
            $j('body').append(this.overlay);
        },

        closeOverlay: function () {
            this.overlay.detach();
        }

    };


    $j.fn.uifwDropDown = function (opt) {
        var element = $j(this);
        var uifwDropDown = element.data('UIFWDropDown');

        if (uifwDropDown && typeof uifwDropDown[opt] == 'function') {
            return uifwDropDown[opt].apply(uifwDropDown, [].slice.apply(arguments, [1]));
        }

        return element.each(function () {
            var element = $j(this);
            element.data('UIFWDropDown', new UIFWDropDown(element, opt));
        });
    }

    $j.fn.uifwDropDown = $j.fn.uifwDropDown;

})(jQuery); 

// Run Basics
(function ($j) {
    var isLoaded = false;
    $j(window).bind('load', function () {
        isLoaded = true;
    });

    $j.fn.uifwFramework = function (options) {
        var context = this.length == 0 ? $('html')[0] : this;

        // init scrollers
        if (isLoaded) {
            $j(context).find('.uiifw-frame-scroller').uifwScroller();
            $j(context).find('.uiifw-area-scroller').uifwScrollingArea();
            // $j(context).find('select.uifw-frm-select').uifwFrmSelect();
            $j(context).find('select.uifw-frm-select').select2({ minimumResultsForSearch: 10, width: 'copy', formatResult: select2format, formatSelection: select2format, escapeMarkup: function (m) { return m; } });
            $j(context).find('.uifw-frm-select .select2-choice > div > b').addClass("icon-chevron-down uifw-icon");
            $j(context).find('input.uifw-frm-checkbox').uifwFrmCheckbox();
            $j(context).find('input.uifw-frm-switch').uifwFrmSwitch();
            $j(context).find('input.uifw-frm-radio').uifwFrmRadio();
            $j(context).find('input.uifw-frm-textfield.see[type=password]').uifwFrmPassword();
            $j(context).find('input, select, textarea').uifwFromElements();
            $j(context).find('.uifw-custom-scroll').uifwCustomScroll();
        }
        else {
            $j(window).bind('load', function () {
                $j(context).find('.uiifw-frame-scroller').uifwScroller();
                $j(context).find('.uiifw-area-scroller').uifwScrollingArea();
                // $j(context).find('select.uifw-frm-select').uifwFrmSelect();
                $j(context).find('select.uifw-frm-select').select2({ minimumResultsForSearch: 10, width: 'copy', formatResult: select2format, formatSelection: select2format, escapeMarkup: function (m) { return m; } });
                $j(context).find('.uifw-frm-select .select2-choice > div > b').addClass("icon-chevron-down uifw-icon");
                $j(context).find('input.uifw-frm-checkbox').uifwFrmCheckbox();
                $j(context).find('input.uifw-frm-switch').uifwFrmSwitch();
                $j(context).find('input.uifw-frm-radio').uifwFrmRadio();
                $j(context).find('input.uifw-frm-textfield.see[type=password]').uifwFrmPassword();
                $j(context).find('input, select, textarea').uifwFromElements();
                $j(context).find('.uifw-custom-scroll').uifwCustomScroll();
                $j(context).find('.uifw-dropdown').uifwDropDown();
            });
        }

        // init section heights
        //$j('body').uifwSameHeight();
        $j(window).bind('load', function () {
            $j('body').uifwSameHeight();
        });

        // collapse sections
        $j(context).find('.uiifw-layout-section.collapsible').uifwCollapse();

        // placeholder text plugin
        $('input[type=password], input[type=text], textarea').placeholder();

        // form elements
        //$j('select.uifw-frm-select').uifwFormFields();

        $j(context).find('.uifw-tabbed-layout').uifwTabbedLayout();
        $j(context).find('.uifw-switched-layout').uifwSwitchedLayout();

        $j(context).uifwAlerts();
    };
})(jQuery);
