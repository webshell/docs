var menu = {
    'overview': {
        'title': 'Overview',
        'baseline': '',
        'submenu': {
            'intro': 'Introduction',
            'js-aas': 'Javascript as a service',
            'fs': 'File system',
            'apis-endpoints-as-js-object': 'APIs endpoints as JS Object',
            'auth': 'APIs Authentication made easy',
            'add-your-api': "Add your API",
        }
    },
    'getting-started': {
        'title': 'Getting Started',
        'baseline': '',
        'submenu': {
            'prerequisites': 'Prerequisites',
            'quick-start': 'Quick Start',
            'hello-world-app': 'Hello World app',
            'samples': 'Samples',
            'build-and-develop-wsh': 'Build and develop Webshell'
        }
    },
    'writing-scripts': {
        'title': 'Writing Scripts',
        'baseline': '',
        'submenu': {
            'builtins': 'Builtins',
            'auth': 'Authentication',
            'args': 'Arguments',
            'data-format': 'Data format',
            'html-views': 'HTML Views',
            'versionning': 'Versionning',
            'events-triggers': 'Events/Triggers (soon)',
            'unify': 'Unify APIs using contract (soon)'
        }
    },
    'stdlib': {
        'title': 'Builtins/StdLib',
        'baseline': '',
        'submenu': {
            'display': 'Display/debug',
            'http': 'HTTP',
            'fs': 'Files management',
            'views': 'Views'
        }
    },
    'executing-scripts': {
        'title': 'Executing Scripts',
        'baseline': '',
        'submenu': {
            'execute-js': 'Execute Javascript via HTTP',
            'fs': 'FS API',
            'js-sdk': 'Javascript SDK',
            'node-sdk': 'Node.js SDK'
        }
    },
    'add-your-api': {
        'title': 'Add your API',
        'baseline': '',
        'submenu': {
            'share': 'Share Scripts', 
            'fork': 'Fork',
            'pullrequest': 'Pull request',
            'sync-github': 'Synchronize with Github (soon)'
        }
    },
    'monitoring': {
        'title': 'Monitoring',
        'baseline': '',
        'submenu': {
            'dashboard': 'Dashboard',
            'analytics': 'Analytics (soon)',
            '3rd-party-rate-limit-monitoring': '3rd-party rate limit monitoring',
            'tos-monitoring': 'Terms of service monitoring (soon)'
        }
    }
}


function spyScroller() {
	var id = null;
	$('#content-docs section').each(function() {
		if ($(this).offset().top < parseInt($('body').scrollTop() + 50))
			id = $(this).attr('id');
	});
	$('#menu-docs li').removeClass('active');
	if (id) {
		$('#menu-docs li a').each(function() {
			if ($(this).attr('href').split('/')[1] == id)
				$(this).parent().addClass('active');
		});
	}
}

var DocsRouter = Backbone.Router.extend({
	routes: {
		":page": "docsPage",
		":page/:anchor": "docsPage",
		"*url": "init"
	},
	docsPage: function(page, anchor) {
		$('#main-menu li:not(.wsh-link)').remove();
		for (key in menu) {
			$('#main-menu').append('<li><a href="#' + key + '">' + menu[key].title + '</a></li>')
		}

		$('#main-menu a[href="#' + page + '"]').parent().addClass('active');

		$('#menu-docs li').remove();
		for (key in menu[page].submenu) {
			$('#menu-docs').append('<li><a style="padding: 10px 20px" href="#' + page + '/' + key + '"><i class="icon-chevron-right" style="float: right"></i>' + menu[page].submenu[key] + '</a></li>')
		}

		$.get('./pages/' + page + '.html', {}, function(data) {
			$('#content-docs').html(data);
			prettyPrint();
			$(window).scroll(spyScroller);
			$('#menu-docs li a').click(function() {
				var id = $(this).attr('href').split('/')[1];
				if ($('#' + id).length > 0) {
					$('body').animate({
						scrollTop: $('#' + id).offset().top
					}, 0, function() {
						spyScroller();
					})
				}
				$('#menu-docs li.active').removeClass('active');
				$(this).parent().addClass('active');
				return false;
			})

		})
	},
	init: function() {
		this.docsPage("overview");
	}
});

var route = new DocsRouter();

$(document).ready(function() {
    $('#docs-header').affix();
    $('#menu-docs').affix();
	Backbone.history.start({pushState: false});
})