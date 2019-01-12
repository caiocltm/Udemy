###Angular JS Tutorial

YouTube channel link: https://www.youtube.com/playlist?list=PLQCmSnNFVYnTD5p2fR4EXmtlR6jQJMbPb

Playlist: Tudo Sobre AngularJS (#1 à #17).


### Config
-----

tip: Works like a charm with Cloud9 IDE!

```bash
$ npm install -g gulp
$ npm install
$ gulp
```

**gulpfile.js** dependencies:

- (gulp-sass)  
    Updates the final css file (css/main.min.css) whenever a .scss file is modified
- (gulp-autoprefixer)  
    Apply vendors prefixes (ex: -webkit, -moz, -o, etc)
- (gulp-cssmin + gulp-rename)
    Minify and renames the final css file (css/main.min.css)
- (gulp-imagemin)  
    Minify all the images inside res folder
- (browser-sync)  
    Update the preview whenever .html, .js or .scss file is changed