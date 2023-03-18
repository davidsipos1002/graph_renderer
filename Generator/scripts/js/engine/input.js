var directeddist = 20;
var directedtheta = Math.PI / 4;
var lineWidth = 1;

var newNode = document.getElementById("newNode");
var newEdge = document.getElementById("newEdge");
var moveNode = document.getElementById("moveNode");
var removeEdge = document.getElementById("removeEdge");
var deleteGrap = document.getElementById("deleteGraph");

newNode.onclick = function ()
{
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

newEdge.onclick = function ()
{
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

moveNode.onclick = function ()
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
}

removeEdge.onclick = function() 
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
}

deleteGrap.onclick = function ()
{
    if(directed)
    {
        deleteDirectedNodes();
        deleteDirectedEdges();
        deleteDirectedGraph();
    }
    else
    {
        deleteNodes();
        deleteEdges();
        deleteGraph();
    }
}