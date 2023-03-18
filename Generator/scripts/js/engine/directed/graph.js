var directedmuchii = [];

for(var i = 0;i <= 22;i++)
{
    directedmuchii[i] = new Array(22);
    for(var j = 0;j <= 22;j++)
        directedmuchii[i][j] = 0;
}

function deleteDirectedGraph()
{
    for(var i = 0;i <= 22;i++)
        for(var j = 0;j <= 22;j++)
            directedmuchii[i][j] = 0;
    deleteDirectedNodes();
    deleteDirectedEdges();
}