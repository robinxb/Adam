module.exports = function(grunt){
	var dirs = {
		tmp: '.tmp',
		src: 'src',
		build: 'build',
		assets: '/assets',
		css: '<%= dir.assets %>/css',
		js: '<%= dir.assets %>/js',
		images: '<%= dir.assets %>/img',
		fonts: '<%= dir.assets %>/fonts'
	};

    grunt.initConfig({
		dir: dirs,

        pkg: grunt.file.readJSON('package.json'),

		clean: {
		  build: {
			files: [{
			  dot: true,
			  src: [
				'<%= dir.tmp %>',
				'build',
			  ]
			}]
		  },
		  release:{
			files: [{
				dot: true,
				src: [
					'assets',
					'partials',
					'*.hbs'
				]
			}]
		  }
		},
		
		useminPrepare: {
		  options: {
			dest: '<%= dir.build%>'
		  },
		  html: '<%= dir.src %>/default.hbs'
		},

		usemin: {
		  options: {
			  basedir: '<%= dir.build %>',
			  dirs: ['<%= dir.build %>/**/*']
		  },
		  html: ['<%= dir.build %>/**/*.hbs']
		},

		copy: {
			build: {
				files:[{
						expand: true,
						dot: true,
						cwd: '<%= dir.src %>',
						src: [ '*.{ico,png,md,hbs}', ],
						dest: '<%= dir.build %>'
					},
				  {
					expand: true,
					flatten: true,
					cwd: '<%= dir.bower %>',
					src: ['**/font*/*.{svg,eot*,ttf,woff,otf}'],
					dest: '<%= dir.build %><%= dir.fonts %>/',
					filter: 'isFile'
				  }]
			},
			release: {
				files:[{
						expand: true,
						dot: true,
						cwd: '<%= dir.build%>',
						src: ["**"],
						dest: ''
				}]
			},
		},
		cssmin: {
			build: {
				options: {
					report: 'gzip'
				}
			}
		},
		csso: {
			build: {
				files:[{
					expand: true,
					cwd: '<%= dir.build %><%= dir.css %>',
					src: '**/*.css',
					dest: '<%= dir.build %><%= dir.css %>'
				}]
			}
		},
		autoprefixer: {
			options: {
				browsers:[
					'> 1%',
					'last 2 versions',
					'safari 6',
					'ie 9',
					'opera 12.1',
					'ios 6',
					'android 4'
				]
			},
			build: {
				src: '<%= dir.build %><%= dir.css %>/*.css'
			}
		},
		csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
			report: {
				src: ['<%= dir.src %><%= dir.css %>/**/*.css']
			}
		},
    });




	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.registerTask('default', 'build');
    grunt.registerTask('build', [
			'clean:build',
			'useminPrepare',
			'concat',
			'cssmin',
			'uglify',
			'copy',
			'usemin',
			'autoprefixer:build',
			'csso:build'
			]);
    grunt.registerTask('dryrun', [
			'clean:build',
			'build',
			'clean:release',
			'copy:release',
			'clean:build'
	]);
    grunt.registerTask('cls', [
			'clean:build',
			'clean:release',
	]);
    grunt.registerTask('cls', [
			'cssmin:report'
	]);
};
