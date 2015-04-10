'use strict'

var detailController=function (req,res) {		
	res.render('detail',{
		title:"Detail",
		items:[{img:"/images/fast7-2.jpg",title:"Fast and Furious",desp:"Game of Man",addr:"#"},{img:"/images/game.png",title:"Game of Throne",desp:"......",addr:"#"},{img:"/images/bat.jpg",title:"Bat Man",desp:"Game of Man",addr:"#"}]
	})
}

module.exports ={
	detail:detailController
}