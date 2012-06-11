/*

Initialise with:

    DEFAULTS
    OpenDetails();
    
    CUSTOM OPTIONS
    OpenDetails($$("summary"),{
        openClass: "open",
        disclosureWidgetClass: "disclosure-widget",
        disclosureEvent: "click"
    });

*/

function OpenDetails(selector, options) {
    // Chrome supports "details" natively
    var isChrome = navigator.userAgent.indexOf("Chrome") > -1;
    if(isChrome) return;

    var defaults = {
        selector: "summary",
        disclosureWidgetClass: "disclosure-widget",
        disclosureEvent: "click"
    };

    options = Object.extend(Object.extend({}, defaults), options || { });

    // Toggle collapsible DETAILS element
    selector = $$(selector ? selector : options.selector);
    selector.each(function(summary) {
        var details = summary.parentNode;
        var siblings = summary.siblings();

        siblings.each(function(sibling) {
            sibling.writeAttribute("hidden", "true");
        })
        summary.observe(options.disclosureEvent, function() {

            // Details element
            var isOpen = details.hasAttribute("open");
            if(isOpen) {
                details.removeAttribute("open");
            } else {
                details.writeAttribute("open", "true");
            }

            // Sibling elements
            siblings.each(function(sibling) {
                var isHidden = sibling.hasAttribute("hidden");
                if(isHidden) {
                    //show
                    sibling.removeAttribute("hidden");
                } else {
                    //hide
                    sibling.writeAttribute("hidden", "true");
                }
            })
        }).addClassName(options.disclosureWidgetClass);
    });
};
