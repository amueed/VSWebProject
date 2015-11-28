(function (jQuery) {

    /**
    Class: FlexModal
    A modal window that flexs vertically as the window is scrolled
    and contains an iframe.
    Parameters:
    - url - (String) - The url to open in the modal window. 
    */
    var FlexModal = function (url) {
        this.url = url;

        this.body = jQuery(window.top.document).find('body');
        var screen = this.screen = jQuery('<div class="ekm-modal-screen" />');
        var screenCenter = this.screenCenter = jQuery('<div class="ekm-modal-screen-center" />');
        var frame = this.frame = jQuery('<div class="ekm-modal-frame" />');
        screen.append(screenCenter.append(frame));

        frame.bind('click', function (event) {
            event.stopPropagation();
        });

        var closeFn = jQuery.proxy(this.close, this);

        var closeFrame = jQuery('<a class="ekm-modal-frame-close" title="Close">Close</a>');
        closeFrame.bind('click', closeFn);
        frame.append(closeFrame);

        this.spinner = jQuery('<div class="ekm-modal-spinner"><img src="/ekmps/images/modal-spinner.gif" width="32" height="32" alt="loading" title="loading" /></div>');

        jQuery(window.top).bind('resize', jQuery.proxy(this.onResize, this));

        this.iframe = jQuery('<iframe frameBorder="0" />');
        this.onIframeLoadBound = jQuery.proxy(this.onIframeLoad, this);

        this.width = 980;
        this.frameSpace = 70;
        this.reloadOnExit = false;
    }

    FlexModal.prototype = {
        /**
        Method: open
        Opens the modal window.
        Parameters:
        - url - (String) - Optional. The url to open in the modal window.
        */
        open: function (url) {
            if (url) this.url = url;
            var self = this;
            var width = this.width;
            var height = this.height = jQuery(window).height() - this.frameSpace;
            var frame = this.frame;
            var left = -Math.floor(width / 2);
            var top = -(Math.floor(height / 2));

            frame.css({
                left: left,
                top: top,
                width: width,
                height: height
            });

            var screen = this.screen;
            this.body.append(screen);
            frame.hide();
            screen.fadeIn(function () {
                frame.show();
                self.loadIframe();
                self.showSpinner();
            });
            window.top.jQuery.fn.flexModal.reloadOnExit = false;
        },

        /**
        Method: close
        Closes the modal window. Triggers the event `flexmodalclose` 
        which can be canceled using `event.preventDefault()` which 
        will stop the FlexModal window closeing.
        */
        close: function () {
            if (window.top.jQuery.fn.flexModal.reloadOnExit) reloadShopFrame();

            jQuery(this).trigger('flexmodalbeforeclose');

            var flexmodalclose = jQuery.Event('flexmodalclose');
            jQuery(this).trigger(flexmodalclose);
            if (flexmodalclose.isDefaultPrevented()) return;

            var self = this;
            this.frame.hide();
            this.screen.fadeOut(function () {
                self.screen.detach();
            });
        },

        /**
        Method: showSpinner
        Displays a loading graphic.
        */
        showSpinner: function () {
            this.frame.append(this.spinner);
        },

        /**
        Method: hide
        Hides the loading graphic.
        */
        hideSpinner: function () {
            this.spinner.detach();
        },

        /**
        Method: loadIframe
        Loads the url using the iframe.
        */
        loadIframe: function () {
            var iframe = this.iframe;
            iframe.bind('load', this.onIframeLoadBound);
            iframe.attr({
                width: this.width,
                height: this.height,
                src: this.url
            });
            this.frame.append(iframe);
        },

        /*
        Event handler for the iframes load event.
        */
        onIframeLoad: function () {
            this.iframe.unbind('load', this.onIframeLoadBound);
            this.hideSpinner();
        },

        /**
        Event handler for the resizing of the window.
        */
        onResize: function () {
            var headerHeight = jQuery('#headerBar').height()
            var space = this.frameSpace
            var height = this.height = jQuery(window).height() - space;
            this.frame.css({
                top: -(Math.floor(height / 2)),
                height: height
            });
            this.iframe.attr('height', height);
        }
    };

    /**
    Event: flexmodalclose
    Triggered before the flexmodal is closed. Can prevent the 
    flexmodal instance closing by calling event.preventDefault 
    in the event handler.
    */

    /**
    Function: jQuery.flexModal
    Initializes a new instance of FlexModal on the selected 
    elements or calls a method of an existing FlexModal instance.
    Parameters:
    - url - (String) - The url to be opened in the flex modal 
    window or the method name to call. In the second case 
    other parameters are passed to the called method.
    Returns:
    - (Mixed) - The jQuery wrapped element or the return 
    value of the called method.
    */
    jQuery.fn.flexModal = function (url) {
        var elements = jQuery(this);
        var flexModal = elements.data('FlexModal');
        if (flexModal && flexModal[url]) {
            var args = [].slice.call(arguments, 1);
            return flexModal[url].apply(flexModal, args);
        }

        return elements.each(function () {
            var flexModal = new FlexModal(url);
            jQuery(this).data('FlexModal', flexModal);
            flexModal.open();
        });
    }

})(jQuery);