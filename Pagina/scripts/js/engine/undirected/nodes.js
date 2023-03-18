var undirectednodes = [];
var undirectedgrade = [];
var undirectedn = 0;
var r = 20;

function addUndirectedNode(x, y, selected, speedX, speedY)
{
    var node = {x : x, y : y, nr : ++undirectedn, selected, speedX: speedX, speedY: speedY};
    undirectednodes.push(node);
    undirectedgrade.push(0);  
}

function updateUndirectedNode(delta, node)
{
    node.x += (node.speedX * delta);
    node.y += (node.speedY * delta);
}

function renderUndirectedNode(context, node)
{
    context.beginPath();
    context.arc(node.x, node.y, r, 0, 2 * Math.PI);
    if(node.selected)
        context.fillStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--node_selected_color");
    else
        context.fillStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--node_color");
    context.fill();
    context.font = "20px AlfaSlabOne";
    context.textAlign = "center";
    context.fillStyle = node.textColor;
    context.textBaseline = "middle";
    context.fillStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--node_text_color");
    context.fillText(node.nr + "", node.x, node.y);
}

function renderUndirectedNodes(context)
{
    undirectednodes.forEach(node => {
        renderUndirectedNode(context, node);
    });
}

function updateUndirectedNodes(delta)
{
    undirectednodes.forEach(node =>{
        updateUndirectedNode(delta, node);
    });
}

function deleteUndirectedNodes()
{
    undirectednodes = [];
    undirectedgrade = [];
    undirectedn = 0;
}