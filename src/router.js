var routes = {};
// The route registering function:
function route (path, templateId, controller) {
    // Allow route(path, controller) for template less routes:
    if (typeof templateId === 'function') {
        controller = templateId;
        templateId = null;
    }
    routes[path] = {templateId: templateId, controller: controller};
}

var el = null, current = null;
function router () {
    // Current route url (getting rid of '#' in hash as well):
    var url = location.hash.slice(1) || '/';
    // Get route by url:
    var route = routes[url];
    // Is it a route without template?
    if (route && !route.templateId) {
        // Just initiate controller:
        return route.controller ? new route.controller : null;
    }
    // Lazy load view element:
    el = el || document.getElementById('view');
    // Clear existing observer:
    if (current) {
        Object.unobserve(current.controller, current.render);
        current = null;
    }
    // Do we have both a view and a route?
    if (el && route && route.controller) {
        // Set current route information:
        current = {
            controller: new route.controller,
            template: tmpl(route.templateId),
            render: function () {
                // Render route template with John Resig's template engine:
                el.innerHTML = this.template(this.controller);
            }
        };
        // Render directly:
        current.render();
        // And observe for changes:
        Object.observe(current.controller, current.render.bind(current));
    }
}
// Listen on hash change:
window.addEventListener('hashchange', router);
// Listen on page load:
window.addEventListener('load', router);
// Expose the route register function:
//this.route = route;


Lettuce.prototype.Router = route;
