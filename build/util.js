var glob = require("glob");//分析文件夹中文件路径的第三方模块
var path = require("path");
var options = {
    getEntry:function(globPath) {
        var entries = {},
          basename, tmp, pathname;
        if (typeof (globPath) == "string") {
          globPath = [globPath]
        }
        globPath.forEach((itemPath) => {
          glob.sync(itemPath).forEach(function (entry) {
            basename = path.basename(entry,path.extname(entry));
            entries[basename] = entry;
            /*if (entry.split('/').length > 4) {
              tmp = entry.split('/').splice(-3);
              pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
              entries[pathname] = entry;
            } else {
              entries[basename] = entry;
            }*/
          });
        });
        return entries;
    }
}
module.exports = options;
