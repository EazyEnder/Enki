var suppmenu_node = "";

class BlueprintNode {
    constructor(inputs,outputs,type,pos,form){
        this.inputs = inputs;
        this.outputs = outputs;
        this.type = type;
        this.pos = pos;
        this.form = form;

        this.inputsvalues = Array.apply(false, Array(this.inputs.length)).map(function (){}); 
        this.inputsready = Array.apply(null, Array(this.inputs.length)).map(function (){});

        this.inputs_entry = [];
        this.outputs_entry = [];

        this.uuid = "";
    }

    draw(){
        this.inputs_entry.forEach(element => {
            element.drawConnectors();
        });
        this.outputs_entry.forEach(element => {
            element.drawConnectors();
        });

        this.inputs_entry.forEach(element => {
            element.connectors.forEach(element2 => {
                element2.isDraw = false;
            });
        });
        this.outputs_entry.forEach(element => {
            element.connectors.forEach(element2 => {
                element2.isDraw = false;
            });
        });
    }

    loadOperation(connector_id, val){
        this.inputsready[connector_id] = true;
        this.inputsvalues[connector_id] = val;
        var flag = true;
        this.inputsready.forEach(bo => {
            if(!bo)flag=false;
        });
        if(flag){
            this.makeOperation();
        }
    }

    makeOperation(){

    }

    removeAllOutputs(){
        outputs = [];
    }

    removeAllInputs(){
        inputs = [];
    }

    getPosition(){
        return this.pos;
    }

    onDoubleClick(event){
        var target = event.target || event.srcElement;
        var id = target.id;
        
        
        suppmenu_node = target.id;
        var node = searchNode(suppmenu_node);
        if(node == undefined)return;

        var div = document.createElement("div");
        div.id = "suppnodemenu";
        document.body.appendChild(div);


        div.style.padding = "0";
        div.style.margin = "0";
        div.style.zIndex = "2";
        div.style.position = "absolute";
        div.style.width = node.size*4.25+"px";
        div.style.height = node.size*3+"px";
        div.style.backgroundColor = main_color;
        div.style.opacity = 1;
        div.style.left = (node.pos[0] + node.size*3/2 - node.size*4.25/2) +"px";
        div.style.top = (node.pos[1] + node.size + 10) +"px";

        div.style.borderStyle = "inset";
            div.style.borderWidth = 2 + "px";
            div.style.borderColor = second_color;

        var menu = document.createElement("ul");
        menu.id = div.id + "menu";
        div.appendChild(menu);

        menu.style.padding = "0";
        menu.style.margin = "0";
        menu.style.listStyleType = "none";
        menu.style.height = "100%";
        menu.style.overflowY = "auto";

        var options = ["Delete","Copy","Reset","Operation","Connectors"];

        options.forEach(option => {
       
            var li = document.createElement("li");
            li.id = menu.id + option;
            menu.appendChild(li);

            li.innerHTML = "<span style=\"color:" + font_color + "\">" + option;

            li.style.padding = "12px";
            li.style.margin = "0";
            li.style.textDecoration = "none";
            li.style.listStyleType = "none";
            li.style.backgroundColor = main_color;

            li.addEventListener('mouseover', changeColorInner, false);
            li.addEventListener('mouseleave', changeColorExit, false);

            li.addEventListener('click', clickOnOption, false);

        });

        function clickOnOption(event){

            var target = event.target || event.srcElement;

            if(document.getElementById("jscodenodemenu") != null)
            document.body.removeChild(document.getElementById("jscodenodemenu"));
            var option_selected = target.id.substring("suppnodemenumenu".length,target.id.length);
            if(option_selected == "Delete"){
                var node = searchNode(suppmenu_node);
                if(node == undefined)return;
                node.deleteNode();
            }
            else if(option_selected == "Operation"){
                openCodeUI(event);
            }
            else if(option_selected == "Connectors"){
                openConnectorsUI(event);
            }
    
        }

        function openCodeUI(event, node){
            var target = event.target || event.srcElement;
            var id = target.id;
        
            var node = searchNode(suppmenu_node);
            if(node == undefined)return;

            var div = document.createElement("div");
            div.id = "jscodenodemenu";
            document.body.appendChild(div);


            div.style.padding = "0";
            div.style.margin = "0";
            div.style.zIndex = "2";
            div.style.position = "absolute";
            div.style.width = node.size*6+"px";
            div.style.height = node.size*5+"px";
            div.style.overflowY = "auto";
            div.style.backgroundColor = main_color;
            div.style.opacity = 1;
            div.style.left = (node.pos[0] + node.size*3/2 - node.size*4.25/2 + node.size*4.25) + 10 +"px";
            div.style.top = (node.pos[1] + node.size + 10) +"px";

            div.style.borderStyle = "inset";
            div.style.borderWidth = 2 + "px";
            div.style.borderColor = second_color;

            var desc = document.createElement("font");
            desc.id = div.id + "desc";
            div.appendChild(desc);

            desc.style.padding = "0";
            desc.style.margin = "0";
            desc.style.height = "100%";
            desc.style.overflowY = "auto";
            //desc.style.textAlign = "center";
            desc.style.color = "white";

            var str = node.makeOperation.toString();
            var str_array = str.split('\r\n');
            str = "";
            var find = ' ';
            var re = new RegExp(find, 'g');

            str_array.forEach(s => {
                s = s.replace(re,'&nbsp');
                str = str+"<br>"+s;
            });

            desc.innerHTML = str;
        }

        function openConnectorsUI(event, node){
            var target = event.target || event.srcElement;
            var id = target.id;
        
            var node = searchNode(suppmenu_node);
            if(node == undefined)return;

            var div = document.createElement("div");
            div.id = "jscodenodemenu";
            document.body.appendChild(div);


            div.style.padding = "0";
            div.style.margin = "0";
            div.style.zIndex = "2";
            div.style.position = "absolute";
            div.style.width = node.size*5+"px";
            div.style.height = node.size*3+"px";
            div.style.overflowY = "auto";
            div.style.backgroundColor = main_color;
            div.style.opacity = 1;
            div.style.left = (node.pos[0] + node.size*3/2 - node.size*4.25/2 + node.size*4.25) + 10 +"px";
            div.style.top = (node.pos[1] + node.size + 10) +"px";

            div.style.borderStyle = "inset";
            div.style.borderWidth = 2 + "px";
            div.style.borderColor = second_color;

            var desc = document.createElement("font");
            desc.id = div.id + "desc";
            div.appendChild(desc);

            desc.style.padding = "0";
            desc.style.margin = "0";
            desc.style.height = "100%";
            desc.style.overflowY = "auto";
            //desc.style.textAlign = "center";
            desc.style.color = "white";

            var str = "Connect ports: <br/>" + " Inputs:";
            var i1 = 1;
            node.inputsvalues.forEach(val => {
                str = "<br />" + i1 + ": " + val.toString();
                i1++;
            });
            i1 = 1;
            str = str + "<br/> Output: <br /> " + node.value; 
            var find = ' ';
            var re = new RegExp(find, 'g');
            str = str.replace(re,'&nbsp');
            

            desc.innerHTML = str;
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

        
        
    }

    removeSuppNodeMenu(uuid){
        if(uuid != undefined){
        if(document.getElementById("suppnodemenu") != null)
        document.body.removeChild(document.getElementById("suppnodemenu"));
        if(document.getElementById("jscodenodemenu") != null)
        document.body.removeChild(document.getElementById("jscodenodemenu"));
        suppmenu_node = "";
        }
    }

    onMouseDown(event){

        var target = event.target || event.srcElement;
        if(searchNode(target.id)!= undefined)searchNode(target.id).removeSuppNodeMenu(target.id);
        selection_node = target.id;
    }

    onMouseUp(event){
        selection_node = "";
    }

    onMouseOver(event){
        selection_node = "";
    }

    onMouseMove(event){
        var mx = event.clientX;
        var my = event.clientY;

        var target = event.target || event.srcElement;
        var id = target.id;


        if(selection_node==target.id && selection_node != ""){

            var n = searchNode(target.id);
            if(n != null){

            var applicationpoint_x = mx - n.size/2; 
            var applicationpoint_y = my - n.size/2;

            n.pos = [applicationpoint_x,applicationpoint_y];

            document.getElementById(target.id).style.left = n.pos[0]+"px";
            document.getElementById(target.id).style.top = n.pos[1]-n.size+"px";
            }
        }

    }

    deleteNode(){
        this.removeSuppNodeMenu(this.uuid);

        var divlist =  document.getElementsByTagName("div");
        
        for(let element of divlist)
            {
            if(element.id.includes(this.uuid)){
                element.remove();
            }
            }

        var newL = [];
        nodes.forEach(no => {
            if(no.uuid != this.uuid){
                newL.push(no);
            }else{
                no.inputs_entry.forEach(input => {
                    input.connectors.forEach(connector => {
                        connector.entry1.connectors.forEach(element => {
                            var newList = [];
                            if(element != connector){
                                newList.push(element);
                            }
                            connector.entry1.connectors = [];
                        });
                    });
                });
                no.outputs_entry.forEach(output => {
                    output.connectors.forEach(connector => {
                        connector.entry2.connectors.forEach(element => {
                            var newList = [];
                            if(element != connector){
                                newList.push(element);
                            }
                            connector.entry2.connectors = [];
                        });
                    });
                });
            }
        });
        nodes = newL;
    }


}

function getAllNodesName(){
    return ["Number","String","Timer","Function","Add","Multiply","Graph","2DSimulation","Primitive","Derivative"];
}

function createNodeByName(name,inputs,outputs,type,pos,form){
    if(name=="Number"){
        nodes.push(new Node_Number(outputs,pos));
        return true;
    }else if(name=="Add"){
        nodes.push(new Node_Add(inputs,outputs,pos));
        return true;
    }
    return false;
    
}

function refreshNodeList(node){
    
    var newL = [];
    nodes.forEach(no => {
        if(no.uuid != node.uuid){
            newL.push(no);
        }else{
            newL.push(node);
        }
    });
    nodes = newL;
}


function searchNode(uuid){
    var n = undefined;
    nodes.forEach(node => {
        if(node.uuid==uuid){
            n =  node;
        }
    });
    return n;
}