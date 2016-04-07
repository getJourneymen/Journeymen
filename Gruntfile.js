module.exports = function(grunt) {
  /* Instructions:
  Run 'grunt' in a terminal tab
  Run 'grunt launch' in a second tab
​

  DISCLAIMER: This grunt file will deal with initial setup of the database.
    In order for it to work after the database exists, you must just use
  npm start or delete the whole thing.
  */

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'server/*.js','server/**/*.js','client/app/**/*.js'],
      options: {
         asi: true,
        laxbreak: true,
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['client/app/*.js', 'client/app/**/*.js', 'server/*.js','server/**/*.js'],
      tasks: ['jshint'],
      options : { nospawn : true }
    },
    exec: {
      init_db: {
        cmd: 'initdb journeymen_dev/'
      },
      run_db: {
        cmd: 'postgres -D journeymen_dev/'
      },
      drop_db: {
        cmd: 'dropdb journeymen_dev'
      },
      rm_dir: {
        cmd: 'rm -rf journeymen_dev'
      },
      config_db: {
        cmd: 'createdb journeymen_dev'
      },
      init_schemas: {
        cmd: 'node ./node_modules/knex/knex.js migrate:latest'
      },
      seed_db: {
        cmd: 'node ./node_modules/knex/knex.js seed:run'
      },
      launch_app: {
        cmd: 'nodemon server/server.js'
      }
    },
    fixmyjs: {
      options: {
        config: '.jshintrc',
        indentpref: 'spaces'
      },
      test: {
        files: [
          {expand: true, cwd: 'test/fixtures', src: ['**/*.js'], dest: 'test/actual/', ext: '.js'}
        ]}
     }
   });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-fixmyjs');

  grunt.registerTask('startdb',  ['jshint', 'exec:init_db', 'exec:run_db']);
  grunt.registerTask('seeddb',   ['jshint', 'exec:config_db','exec:init_schemas','exec:seed_db']);
  grunt.registerTask('dropdb', ['exec:drop_db']);
};
