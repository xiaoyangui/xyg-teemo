var gulp = require("gulp");
//var uglify = require("gulp-uglify");
var sass = require("gulp-sass");

//复制html
gulp.task("copyhtml",function(){
	gulp.src("*.html")
	.pipe(gulp.dest("F:\\xyg-teemo02"));
	
});
gulp.task("copyjs",function(){
	gulp.src("js/**/*")
	.pipe(gulp.dest("F:\\xyg-teemo02\\js"));
	
});

//复制图片
gulp.task("copyimg",function(){
	gulp.src("img/*.{jpg,png}").pipe(gulp.dest("F:\\xyg-teemo02\\img"));
	
	
});

//压缩js
//gulp.task("uglifyjs",function(){
//	gulp.src("js/*.js")
//	.pipe(uglify())
//	.pipe(gulp.dest("D:\\phpStudy\\WWW\\web1802\\js"));	
//});

//sass编译
gulp.task("scssfile",function(){
	gulp.src("scss/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("F:\\xyg-teemo02\\css"));
});

//监听
gulp.task("watchall",function(){
	gulp.watch("*.html",["copyhtml"]);
	gulp.watch("img/*.{jpg,png}",["copyimg"]);
	//gulp.watch("js/*.js",["uglifyjs"]);
	gulp.watch("scss/*.scss",["scssfile"]);
	gulp.watch("js/**/*",["copyjs"])
});