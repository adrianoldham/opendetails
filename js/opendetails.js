var OpenDetails = Class.create({
    defaults: {
        selector: "summary",
        openClass: "open",
        disclosureWidgetClass: "disclosure-widget",
        disclosureEvent: "click"
    },

    initialize: function(selector, options) {
        var isChrome = navigator.userAgent.indexOf("Chrome") > -1;
        if (isChrome) return;

        this.options = Object.extend(Object.extend({}, this.defaults), options || {});
        this.selector = $$(selector ? selector : this.options.selector);
        this.selector.each(function(element) {
            this.setup(element);
        }.bind(this));
    },

    setup: function(element) {
        this.siblings = element.siblings();
        this.siblings.each(function(sibling) {
            sibling.writeAttribute("hidden", "true");
        }.bind(this));
        this.apply(element);
    },

    apply: function(element) {
        element.observe(this.options.disclosureEvent,
            this.toggle.bindAsEventListener(this, element)
        ).addClassName(this.options.disclosureWidgetClass);
    },

    toggle: function(event, element) {
        var parent = element.parentNode;
        var siblings = element.siblings();

        // Parent element
        var isOpen = parent.hasAttribute("open");
        if (isOpen) {
            parent.removeClassName(this.options.openClass).removeAttribute("open");
        } else {
            parent.addClassName(this.options.openClass).writeAttribute("open", "true");
        }

        // Sibling elements
        siblings.each(function(sibling) {
            var isHidden = sibling.hasAttribute("hidden");
            if (isHidden) {
                //show
                sibling.removeAttribute("hidden");
            } else {
                //hide
                sibling.writeAttribute("hidden", "true");
            }
        });
    }
});