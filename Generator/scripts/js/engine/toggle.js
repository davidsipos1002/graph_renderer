var mode = 0;
var edit = false;
var muchie = false;
var directed = false;

function toggleMode()
{
    if(directed)
    {
        deleteDirectedNodes();
        deleteDirectedEdges();
        deleteDirectedGraph();
        mode = 0;
        edit = false;
        muchie = false;
        directed = false;
    }
    else
    {
        deleteNodes();
        deleteEdges();
        deleteGraph();
        mode = 0;
        edit = false;
        muchie = false;
        directed = true;
    }
}

function setDirected()
{
  
    deleteNodes();
    deleteEdges();
    deleteGraph();
    mode = 0;
    edit = false;
    muchie = false;
    directed = true;
}

function setUndirected()
{
    deleteDirectedNodes();
    deleteDirectedEdges();
    deleteDirectedGraph();
    mode = 0;
    edit = false;
    muchie = false;
    directed = false;
}