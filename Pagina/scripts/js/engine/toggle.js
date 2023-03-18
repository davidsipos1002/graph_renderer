var mode = 0;
var edit = false;
var muchie = false;
var directed = false;

function toggleMode()
{
    if(directed)
    {
        deleteNodes();
        deleteEdges();
        deleteGraph();
        mode = 0;
        edit = false;
        muchie = false;
        directed = false;
    }
    else
    {
        deleteUndirectedNodes();
        deleteUndirectedEdges();
        deleteUndirectedGraph();
        mode = 0;
        edit = false;
        muchie = false;
        directed = true;
    }
}

function setDirected()
{
    deleteUndirectedNodes();
    deleteUndirectedEdges();
    deleteUndirectedGraph();
    mode = 0;
    edit = false;
    muchie = false;
    directed = true;
}

function setUndirected()
{
    deleteNodes();
    deleteEdges();
    deleteGraph();
    mode = 0;
    edit = false;
    muchie = false;
    directed = false;
}