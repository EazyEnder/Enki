var nodes = [];

var font_color = "#dcdde1";
var main_color = "#273c75";
var second_color = "#192a56";



function openBlueprintFrame(){

    selection = undefined;

    this.open = function Open(){

        this.interval = setInterval(this.update, 10);

        canvas.addEventListener('click', this.fonclick, false);

        nodes.push(new Node_Number([],[200,200]));

        colorChangeButtons();

    }

    function draw(){

        ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        nodes.forEach(node => {
            node.draw();
            node.outputs_entry.forEach(entry => {
                ctx.beginPath();
                ctx.shadowColor = second_color;
                ctx.shadowBlur = 2;
                ctx.fillStyle = second_color;
                ctx.arc(node.pos[0]+entry.pos[0],node.pos[1]-node.size+entry.pos[1],entry.size/4*2,0,2*Math.PI);
                ctx.fill();
                ctx.strokeStyle = "rgba(0,0,0,0.5)"; 
                ctx.stroke();
                ctx.restore();
                ctx.closePath();
            });
            node.inputs_entry.forEach(entry => {
                ctx.beginPath();
                ctx.shadowColor = second_color;
                ctx.shadowBlur = 2;
                ctx.fillStyle = second_color;
                ctx.arc(node.pos[0]+entry.pos[0],node.pos[1]-node.size+entry.pos[1],entry.size/4*2,0,2*Math.PI);
                ctx.fill();
                ctx.strokeStyle = "rgba(0,0,0,0.5)"; 
                ctx.stroke();
                ctx.restore();
                ctx.closePath();
            });
        });

        ctx.beginPath();
        ctx.font = window.innerWidth*0.01+'px serif';
        ctx.textAlign = 'left';
        ctx.fillStyle = main_color;   
        ctx.fillText("V0.0.0", 10,window.innerHeight-window.innerWidth*0.01);
        ctx.stroke();
        ctx.closePath();

        if(menu_pos != [] && menunodeadd_isenabled){
            ctx.beginPath();
            ctx.shadowColor = second_color;
            ctx.shadowBlur = 2;
            ctx.fillStyle = second_color;
            ctx.arc(menu_pos[0],menu_pos[1],10,0,2*Math.PI);
            ctx.fill();
            ctx.restore();
            ctx.closePath();
        }
        
        if(edit_entry != null && edit_entry != undefined){

            var absolute_rect = document.getElementById(edit_entry.node_parent.uuid).getBoundingClientRect();
            var absolute_pos = [absolute_rect.x,absolute_rect.y];

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = main_color;
            ctx.moveTo(absolute_pos[0]+edit_entry.pos[0],absolute_pos[1]+edit_entry.pos[1]);
            if(mouse_pos != null && mouse_pos != undefined)
            {   if((edit_entry_freeze[0]==0 && edit_entry_freeze[1]==0))
                    ctx.lineTo(mouse_pos[0],mouse_pos[1]);
                else{
                    ctx.lineTo(edit_entry_freeze[0],edit_entry_freeze[1]);  
                }
            }
            ctx.stroke();
            ctx.closePath();

        }

    }
    
    this.update = function update(){
        draw();

    }
    

    function colorChangeButtons(){

        var div = document.createElement("div");
        div.id = "topbar";
        document.body.appendChild(div);
    
        div.style.padding = "0";
        div.style.margin = "0";
        div.style.zIndex = "2";
        div.style.position = "absolute";
        div.style.width = "100%";
        div.style.height = "5%";
        div.style.backgroundColor = "RGBa(20,20,20,0)";
        div.style.opacity = 1;
        div.style.left = 0;
        div.style.top = 0;    

        var color_change_font = document.createElement("input");
        color_change_font.type = "color";
        color_change_font.name = "";
        color_change_font.value = font_color;
        div.appendChild(color_change_font);
        color_change_font.addEventListener('input',changeColorFont, false);
        function changeColorFont(event){
        font_color = color_change_font.value;
        canvas.style.background = font_color;
        }

        var color_change_main = document.createElement("input");
        color_change_main.type = "color";
        color_change_main.name = "";
        color_change_main.value = main_color;
        div.appendChild(color_change_main);
        color_change_main.addEventListener('input',changeColorMain, false);
        function changeColorMain(event){
        main_color = color_change_main.value;
        }

        var color_change_second = document.createElement("input");
        color_change_second.type = "color";
        color_change_second.name = "";
        color_change_second.value = second_color;
        div.appendChild(color_change_second);
        color_change_second.addEventListener('input',changeColorSecond, false);
        function changeColorSecond(event){
        second_color = color_change_second.value;
        }

    }

    this.fonclick = function onClickEvent(event){

        var mx = window.event.clientX;
        var my = window.event.clientY;

        menu_pos = [mx,my];

        var flag = true;
        nodes.forEach(node => {
            if(flag && node.getPosition()[0] == mx && node.getPosition()[1] == my)flag=false;
        });

        if(flag){

            if(!menunodeadd_isenabled){
            enableAddNodeMenu([mx,my]);}
            else{
            disableAddNodeMenu();
            edit_entry = null;
            }

        }

        

    }

    this.open();

}