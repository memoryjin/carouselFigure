window.onload = function(){
	switchPic();
	drag()
};

function switchPic(){
	         /*变量、函数的声明*/
	var container = document.getElementById("container");
	var arrowPre = document.getElementById("prev");
	var arrowNext = document.getElementById("next");
	var list = document.getElementById("list");
	var spans = document.getElementsByTagName("span");
	var left = parseInt(window.getComputedStyle(list, null)["left"]);//list.style.left只能获取内联样式，外部样式获取需要使用window.getComputedStyle(ele,null)[style]方法
	var index = 0;
	var move = 0; //中间变量
	var buttons = document.getElementById("buttons");

		/*通过单击选择按钮切换图片*/
	buttons.addEventListener("click", function(event){
		if(event.target.getAttribute("index")) {
			spans[index].className = "";
			index = Number(event.target.getAttribute("index"));//getAttribute()返回的结果是字符串，通过Number()方法转换成数值类型
			spans[index].className = "on";
			left = -900 - 900*index;
			list.style.left = left + "px";
			}
	}, false);

	function animateNext(){
		if(move !== 900){
			move += 20;
			left -= 20;
			list.style.left = left + "px";
			setTimeout(animateNext, 10);
		}
		else {
			spans[index].className = "";
			if(index === 4) {
				index = -1;
				left = -900;
				list.style.left = left + "px";
			}
			index += 1;
			spans[index].className = "on";
			move = 0;
		}
	}
	function animatePre(){
		if(move !== 900){
			move += 20;
			left += 20;
			list.style.left = left + "px";
			setTimeout(animatePre, 10);
		}
		else {
			spans[index].className = "";
			if(index === 0) {
				index = 5;
				left = -4500;
				list.style.left = left + "px";
			}
			index -= 1;
			spans[index].className = "on";
			move = 0;
		}
	}
	arrowNext.addEventListener("click", animateNext, false);
	arrowPre.addEventListener("click", animatePre, false);

				/*图片自动切换效果*/
	function autoSwitch(time){
		setInterval(animateNext, time)
	}
	var fnAutoSwitch = function(){
		autoSwitch(1000);
	} ;
	
	container.addEventListener("mouseout" , fnAutoSwitch, false);
	container.addEventListener("mouseover", function(){
		container.removeEventListener("mouseout" , fnAutoSwitch, false);
	});
}	


//拖曳效果实现
function drag(){
	var isDraging = false;
	var dis_X = 0;
	var dis_Y = 0;
	var max_X = 0;
	var max_Y = 0;
	var main = document.getElementById("main");
	var container = document.getElementById("container");

	function fnDown(event){
		event.preventDefault();
		dis_X = event.pageX - container.offsetLeft - main.offsetLeft;
		dis_Y = event.pageY - container.offsetTop - main.offsetTop;
		max_X = main.clientWidth - container.offsetWidth;
		max_Y = main.clientHeight - container.offsetHeight;
		isDraging = true;
	}

	function fnMove(event){
		if(isDraging === true){
			var pos_X = event.pageX - dis_X - main.offsetLeft;
			var pos_Y = event.pageY - dis_Y - main.offsetTop;
			if(pos_X < 0){
				pos_X = 0;
			}
			else if(pos_X > max_X){
				pos_X = max_X;
			}
			if(pos_Y < 0){
				pos_Y = 0;
			}
			else if(pos_Y > max_Y){
				pos_Y = max_Y;
			}
			container.style.left = pos_X + 450 + "px"; //450是由于负的margin，所以这里得加上，下面的300同理
			container.style.top = pos_Y + 300 + "px"; 	
		}
	}

	container.addEventListener("mousedown", function(event){
		fnDown(event);
	}, false);
	document.addEventListener("mousemove", function(event){
		fnMove(event);
	}, false);	
	document.addEventListener("mouseup", function(){
		isDraging = false;
	}, false);
}	


