var menunodeadd_isenabled = false;
var menu_pos = [];

function enableAddNodeMenu(position){


    edit_entry_freeze = mouse_pos;

    var search_value = "";
    var sizemenuX = 350, sizemenuY = 400;

    var div = document.createElement("div");
    div.id = "addnodemenu";
    document.body.appendChild(div);


    div.style.padding = "0";
    div.style.margin = "0";
    div.style.zIndex = "2";
    div.style.position = "absolute";
    div.style.width = sizemenuX+"px";
    div.style.height = sizemenuY+"px";
    div.style.backgroundColor = main_color;
    div.style.opacity = 1;
    div.style.left = position[0]+"px";
    div.style.top = (position[1] - sizemenuY/2) +"px";

    var input_search = document.createElement("input");
    input_search.placeholder = "Node name";
    input_search.id = div.id+"searchbox";
    input_search.style.width = "98%";
    input_search.style.height = "10%";
    input_search.style.left = 0;
    input_search.style.top = 0;
    input_search.style.backgroundColor = font_color;
    input_search.style.borderColor = main_color;
    
    div.appendChild(input_search);

    input_search.addEventListener('input',changeValue, false);
    input_search.addEventListener('keyup',searchFunction, false);

    function changeValue(event){
        var target = event.target || event.srcElement;
        search_value = document.getElementById(target.id).value;
    }

    function searchFunction(event){
        var target = event.target || event.srcElement;

        // Declare variables
        var filter, men, li;
        filter = document.getElementById(target.id).value;
        men = document.getElementById(target.id.substring(0,target.id.length-"searchbox".length) + "menu");
        li = [...men.getElementsByTagName("li")];
        console.log(li);

        li.forEach(element => {
            if(!element.innerHTML.includes(filter)){
                element.style.display="none";
            }else{
                element.style.display="";
            }
        });
        
    }


    var menu = document.createElement("ul");
    menu.id = div.id + "menu";
    div.appendChild(menu);

    menu.style.padding = "0";
    menu.style.margin = "0";
    menu.style.listStyleType = "none";
    menu.style.height = "90%";
    menu.style.overflowY = "auto";

    getAllNodesName().forEach(node_name => {
       
        var li = document.createElement("li");
        li.id = menu.id + node_name;
        menu.appendChild(li);

        li.innerHTML = "<span style=\"color:" + font_color + "\">" + node_name;

        li.style.padding = "12px";
        li.style.margin = "0";
        li.style.textDecoration = "none";
        li.style.listStyleType = "none";
        li.style.backgroundColor = main_color;

        li.addEventListener('mouseover', changeColorInner, false);
        li.addEventListener('mouseleave', changeColorExit, false);

        li.addEventListener('click', clickOnNode, false);

   });

   function clickOnNode(event){

        var target = event.target || event.srcElement;
        var node_name = target.id.substring("addnodemenumenu".length,target.id.length);

        if(createNodeByName(node_name,[],[],"",menu_pos,""))
        {   disableAddNodeMenu();
            if(edit_entry != undefined && edit_entry != null){

                

                edit_entry = null;
            }
        }

   }

   function changeColorInner(event){
        var target = event.target || event.srcElement;
        if(document.getElementById(target.id) != null)
        document.getElementById(target.id).style.backgroundColor = second_color;
   }

   function changeColorExit(event){
     var target = event.target || event.srcElement;
     if(document.getElementById(target.id) != null)
     document.getElementById(target.id).style.backgroundColor = main_color;
    }
    



    menunodeadd_isenabled = true;

}

function disableAddNodeMenu(){

    edit_entry_freeze = [0,0];
    if(document.getElementById("addnodemenu") != null)
    document.body.removeChild(document.body.querySelector("#"+"addnodemenu"));
    menunodeadd_isenabled = false;
}