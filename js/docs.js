var menu = {
   'user': {
        'overview': {
            'title': 'Overview',
            'baseline': '',
            'submenu': {
                'what': 'What is Webshell?',
                'why': 'Why using Webshell?',
                //'nodejs-for-apis': 'Node.js for APIs',
                'apis-endpoints-as-js-object': 'APIs endpoints as Javascript',
                'js-aas': 'Javascript as a service',
                'fs': 'File system',
                'c9': 'Cloud9 IDE',
                'shared-execution-environment': 'Shared execution environment',
                'usage': 'Usage overview'
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
        'share-scripts': {
            'title': 'Share Scripts',
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
    },
    'provider': {
        'overview': {
            'title': 'Overview',
            'baseline': '',
            'submenu': {
                'what': 'What is Webshell?',
                'why': 'Why using Webshell?',
                'apis-endpoints-as-js-object': 'APIs endpoints as Javascript',
                'code-as-demand': 'Code as demand',
                'fs': 'File system',
                'c9': 'Cloud9 IDE',
                'shared-execution-environment': 'Shared execution environment',
                'wsh-community': 'The Webshell community'
            }
        },
        'add-your-api': {
            'title': 'Add your API',
            'baseline': '',
            'submenu': {
                'intro': 'Introduction: wrapper',
                'rest': 'REST API',
                'client-side-api': 'Client Side API',
                'wadl': 'WADL',
                'swagger': 'Swagger',
                'mashape': 'Mashape XML (soon)'
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
        'auth': {
            'title': 'Configure your authentication',
            'baseline': '',
            'submenu': {
                'conf.json': 'conf.json',
                'oauth1': 'OAuth1',
                'oauth2': 'OAuth2',
                'custom': 'Custom Auth'
            }
        },
        'api-explorer': {
            'title': 'API Explorer',
            'baseline': '',
            'submenu': {
                'publish': 'Publish on the API Explorer',
			}
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
			if ($(this).attr('href').split('/')[2] == id)
				$(this).parent().addClass('active');
		});
	}
}

var DocsRouter = Backbone.Router.extend({
	routes: {
		":type/:page": "docsPage",
		":type/:page/:anchor": "docsPage",
		"*url": "init"
	},
	docsPage: function(type, page, anchor) {
		$('#main-menu li:not(.wsh-link)').remove();
		for (key in menu[type]) {
			$('#main-menu').append('<li><a href="#' + type + '/' + key + '">' + menu[type][key].title + '</a></li>')
		}

		$('#main-menu a[href="#' + type + '/' + page + '"]').parent().addClass('active');

		$('#menu-docs li').remove();
		for (key in menu[type][page].submenu) {
			$('#menu-docs').append('<li><a style="padding: 10px 20px" href="#' + type + '/' + page + '/' + key + '"><i class="icon-chevron-right" style="float: right"></i>' + menu[type][page].submenu[key] + '</a></li>')
		}

		$.get('./pages/' + type + '/' + page + '.html', {}, function(data) {
			$('#content-docs').html(data);
			prettyPrint();
			$(window).scroll(spyScroller);
			$('#menu-docs li a').click(function() {
				var id = $(this).attr('href').split('/')[2];
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
		this.docsPage("user", "overview");
	}
});

var route = new DocsRouter();

$(document).ready(function() {
    $('#docs-header').affix();
    $('#menu-docs').affix();
	Backbone.history.start({pushState: false});
})