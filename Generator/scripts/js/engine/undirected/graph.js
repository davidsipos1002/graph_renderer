var muchii = [];

for(var i = 0;i <= 22;i++)
{
    muchii[i] = new Array(22);
    for(var j = 0;j <= 22;j++)
        muchii[i][j] = 0;
}

function deleteGraph()
{
    for(var i = 0;i <= 22;i++)
        for(var j = 0;j <= 22;j++)
            muchii[i][j] = 0;
    deleteNodes();
    deleteEdges();
}