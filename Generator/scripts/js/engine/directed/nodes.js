var directednodes = [];
var directedn = 0;
var r = 20;

function addDirectedNode(x, y, selected, speedX, speedY)
{
    var node = {x : x, y : y, nr : ++directedn, selected: selected, speedX: speedX, speedY: speedY};
    directednodes.push(node);
}

function updateDirectedNode(delta, node)
{
    node.x += (node.speedX * delta);
    node.y += (node.speedY * delta);
}

function renderDirectedNode(context, node)
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

function renderDirectedNodes(context)
{
    directednodes.forEach(node => {
        renderDirectedNode(context, node);
    });
}

function updateDirectedNodes(delta)
{
    directednodes.forEach(node =>{
        updateDirectedNode(delta, node);
    });
}

function deleteDirectedNodes()
{
    directednodes = [];
    directedn = 0;
}