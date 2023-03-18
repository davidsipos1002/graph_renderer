var del = document.getElementById("btnDelete");
var dist = 20;
var theta = Math.PI / 4;
var lineWidth = 5;

var NodesDiv = document.getElementById("Nodes");
var EdgesDiv = document.getElementById("Edges");
var btnEdit = document.getElementById("btnEdit");
var btnRemove = document.getElementById("btnRemove");

NodesDiv.onclick = function()
{
    NodesDiv.classList.toggle("show");
    EdgesDiv.classList.toggle("show");
    if(mode != 1)
    {
        if(mode == 0)
            mode = 1;
        if(mode == 2 && !muchie)
            mode = 1;
        if(mode == 3 && !edit)
             mode = 1;
        if(mode == 4)
            mode = 1;
    }
}

EdgesDiv.onclick = function()
{
    NodesDiv.classList.toggle("show");
    EdgesDiv.classList.toggle("show");
    if(mode != 2)
    {
        if(mode == 0)
            mode = 2;
        if(mode == 1)
            mode = 2;
        if(mode == 3 && !edit)
            mode = 2;
        if(mode == 4)
            mode = 2;
    }
}

btnEdit.onclick = function()
{
    if(mode != 3)
    {
        if(mode == 0)
            mode = 3;
        if(mode == 1)
            mode = 3;
        if(mode == 2 && !muchie)
            mode = 3;
        if(mode == 4)
            mode = 3;
    }
    if(NodesDiv.classList.contains("show"))
    {
        NodesDiv.classList.toggle("show");
        EdgesDiv.classList.toggle("show");
    }
}

btnRemove.onclick = function()
{
    if(mode != 4)
    {
        if(mode == 0)
            mode = 4;
        if(mode == 1)
            mode = 4;
        if(mode == 2 && !muchie)
            mode = 4;
        if(mode == 3 && !edit)
            mode = 4;
    }
    if(NodesDiv.classList.contains("show"))
    {
        NodesDiv.classList.toggle("show");
        EdgesDiv.classList.toggle("show");
    }
}

del.onclick = function()
{
    if(directed)
    {
        deleteNodes();
        deleteEdges();
        deleteGraph();
    }
    else
    {
        deleteUndirectedNodes();
        deleteUndirectedEdges();
        deleteUndirectedGraph();
    }
    updatePopup();
    if(NodesDiv.classList.contains("show"))
    {
        NodesDiv.classList.toggle("show");
        EdgesDiv.classList.toggle("show");
    }
}