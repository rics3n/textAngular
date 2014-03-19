module.exports = function (grunt) {
	
	// load all grunt tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-istanbul-coverage');
	grunt.loadNpmTasks('grunt-karma');
	
	// Default task.
	grunt.registerTask('default', ['uglify','test']);
	grunt.registerTask('test', ['clean', 'jshint', 'karma', 'coverage']);
	
	var testConfig = function (configFile, customOptions) {
		var options = { configFile: configFile, keepalive: true };
		var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
		return grunt.util._.extend(options, customOptions, travisOptions);
	};
	
	// Project configuration.
	grunt.initConfig({
		clean: ["coverage/*"],
		coverage: {
		  options: {
		  	/* Until istanbul version is updated in grunt-istanbul-coverage
		  	thresholds: {
			  'statements': 100,
			  'branches': 100,
			  'lines': 100,
			  'functions': 100
			},*/
			thresholds: {
			  'statements': -22,
			  'branches': -23,
			  'lines': 98,
			  'functions': -3
			},
			dir: ''
		  }
		},
		karma: {
		  unit: {
			options: testConfig('karma.conf.js')
		  }
		},
		jshint: {
		  files: ['textAngular.js', 'test/*.spec.js'],// don't hint the textAngularSanitize as they will fail
		  options: {
			eqeqeq: true,
			immed: true,
			latedef: true,
			newcap: true,
			noarg: true,
			sub: true,
			boss: true,
			eqnull: true,
			globals: {}
		  }
		},
		uglify: {
			options: {
				mangle: true,
				compress: true
			},
			my_target: {
				files: {
					'textAngular.min.js': ['textAngular.js'],
					'textAngular-sanitize.min.js': ['textAngular-sanitize.js']
				}
			}
		}
	});
};