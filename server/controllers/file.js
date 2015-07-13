var fs=require('fs');
var path=require('path');

///TODO!
///封装失败！！！！！！！！！！！！！！！！！！！！会提前返回，
///arg1:上传的文件,form的文件name参数
///arg2:上传完成后挂载到response的数据项，与res一起传入，如res._img，其中_img为挂载的名称
///arg3:保存地址,相对于/client/
///arg4:bool,是则在response挂载文件名及全路径，否则只挂载文件名
function saveFile(postFile,resName,path,saveFullPath,next) {
    if(postFile){
        fs.readFile(postFile.path,function(err,data){
            if (err) {
                console.log(err);
                next();
            } else {
                var timestamp = Date.now();
                var poster = timestamp + '.' + postFile.extension;
                var newPath = path.join(__dirname, '../../client/',path , poster);
                fs.writeFile(newPath, data, function (err) {
                    if (err) {
                        console.log(err);
                        next();
                    } else {
						if(saveFullPath){
							resName = path + poster;//提供访问路径，相对于网站访问的根目录，该路径会被存入数据库，
                        	//虽然便于统一访问http开头的资源和本站资源，但是固定了存储位置，如果要改存储位置就要逐条改库
						}else{
							resName = poster;
						}
                        next();
                        
                    }
                })
            }
           
        });
    }
}

var savePosterController=function(req,res,next){
	//saveFile(req.files.uploadPoster0,req._img,'uploads/posters/',next,true); 
    
    var posterData=req.files.uploadPoster0;
    if(posterData){
        fs.readFile(posterData.path,function(err,data){
            if (err) {
                console.log(err);
                next();
            } else {
                var timestamp = Date.now();
                var poster = timestamp + '.' + posterData.extension;
                var newPath = path.join(__dirname, '../../', '/client/uploads/posters/' + poster);
                fs.writeFile(newPath, data, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        req._img = '/uploads/posters/' + poster;//提供访问路径，相对于网站访问的根目录，该路径会被存入数据库，
                        //虽然便于统一访问http开头的资源和本站资源，但是固定了存储位置，如果要改存储位置就要逐条改库
                    }
                    next();
                })
            }
           
        });
    }else{
        next();
    }  
}

var saveHeadController=function(req,res,next){
    var posterData=req.files.uploadhead;
    if(posterData){
        fs.readFile(posterData.path,function(err,data){
            if (err) {
                console.log(err);
                next();
            } else {
                var timestamp = Date.now();
                var poster = timestamp + '.' + posterData.extension;
                var newPath = path.join(__dirname, '../../', '/client/uploads/heads/' + poster);
                fs.writeFile(newPath, data, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        req._img =poster;//此处只存文件名
                    }
                    next();
                })
            }
           
        });
    }else{
        next();
    }
}

module.exports = {
  savePoster:savePosterController,
  saveHead: saveHeadController
};