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
			}
		}
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
			'usemin'
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
};
