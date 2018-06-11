function $(id){
	return document.getElementById(id);
}

function $create(tagName){
	return document.createElement(tagName);
}
class Slider{
	
	constructor(boxDom,width,height,imgs,hrefs,timeSpace){
		this.boxDom = boxDom;
		this.width = width;
		this.height = height;
		this.imgs = imgs;
		this.hrefs = hrefs;
		this.timeSpace = timeSpace;
		this.ord = 0;
		this.myTimer = null;
		this.slideTimer = null;	
		this.initUI();
		this.initEvent();
		this.changeImg();		
	}
	
	//初始化界面的函数
	initUI(){
		//1、动态产生轮播图中所有DOM对象
		//1)、创建图片；
		for(let i=0;i<this.imgs.length;i++){
			let imgDom = $create("img");
			imgDom.src = this.imgs[i];
			imgDom.style.cssText = "position:absolute;left:"+this.width+"px;top:0px;width:100%;height:100%;";
			imgDom.onclick = function(){
				window.location.href = hrefs[i];
			}
			this.boxDom.appendChild(imgDom);
		}
		this.boxDom.children[0].style.left = "0px";
	
		//2)、创建豆豆：
		let ulDom = $create("ul");
		ulDom.style.cssText = "position:absolute;left:550px;bottom:0;height:40px;list-style:none;z-index:999;";
		this.boxDom.appendChild(ulDom);
		for(let i=0;i<this.imgs.length;i++){
			let liDom = $create("li");
			liDom.style.cssText = "float:left;margin-left:10px;width:15px;height:15px;border-radius:50%;background-color:#b6b6b6;";
			ulDom.appendChild(liDom);
		}		
		ulDom.children[0].style.backgroundColor = "#ff4949";		
	}
	
	//初始化事件（给DOM对象增加事件）
	initEvent(){
		let obj = this;//this是调用initEvent的对象。
		this.boxDom.onmouseover = function(){
			//this是事件源，所有是boxDom
			clearInterval(obj.myTimer);
		}
		
		this.boxDom.onmouseout = function(){
			obj.changeImg();
		}	
		
		let lis = this.boxDom.lastElementChild.children;
		for(let i=0;i<lis.length;i++){
			lis[i].onclick = function(){
				clearInterval(obj.myTimer);
				//清除当前淡入淡出的定时器
				if(obj.slideTimer!=null){
					clearInterval(obj.slideTimer);			
				}
				obj.showImg(obj.ord,i);//showImg(2,4);
			}
		}
	}
	
	//动态改变图片
	changeImg(){
		this.myTimer = setInterval(()=>{
			//一、数据处理
			//1、改变图片序号
			let outOrd = this.ord;//定义淡出（消失）的图片序号
			this.ord=this.ord+1;
			//2、改变外观（显示对应的图片）
			this.showImg(outOrd,this.ord);
		},this.timeSpace);
	}

	
	//显示指定的图片（根据指定的图片序号）
	showImg(outOrd,transOrd){//2,4
		//一、数据处理
		//1、数据改变
		this.ord=transOrd;
		//2、边界（数据合法性）
		if(this.ord>this.imgs.length-1 || this.ord<0){
			this.ord=0;
		}
		//二、外观
		//调用淡入淡出函数就行了
		this.slideInOut(outOrd,this.ord);//2,4
		
		//把所有豆豆都变成原始颜色。
		for(let i=0;i<this.imgs.length;i++){
			this.boxDom.lastElementChild.children[i].style.backgroundColor = "#b6b6b6";
		}
		//把当前豆豆变成高亮颜色。
		this.boxDom.lastElementChild.children[this.ord].style.backgroundColor = "#ff4949";
	}
	
	//滑入滑出效果
	slideInOut(outOrd,inOrd){//2,4
		if(outOrd==inOrd){
			return;
		}
		//把要进行滑入滑出效果的两张图片的层级设置为所有图片的最高
		let imgDoms = this.boxDom.children;
		for(let i=0;i<this.imgs.length;i++){
			imgDoms[i].style.zIndex = 0;
		}
		imgDoms[outOrd].style.zIndex = 1;	
		imgDoms[inOrd].style.zIndex = 1;
		
		//把要进入的那张图片的left修改为500（即把要进入的图片放在盒子右边）
		imgDoms[outOrd].style.left = "0px";	
		imgDoms[inOrd].style.left = this.width+"px";		
		
		let currLeft = 0;
		this.slideTimer = setInterval(()=>{
			//数据改变
			currLeft-=20;
			//边界处理
			if(currLeft<= -1*this.width){
				currLeft = -1*this.width; 
				clearInterval(this.slideTimer);
				this.slideTimer = null;
			}
			//改变外观
			imgDoms[outOrd].style.left = currLeft+"px";
			imgDoms[inOrd].style.left = currLeft+this.width+"px";	
		},2);
	}
}