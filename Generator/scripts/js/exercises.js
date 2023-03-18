var exercises = [];
var exerciseId = 0;
var currentSelectedExercise = 0;
var newExercise = document.getElementById("newExercise");
var exerciseSelect = document.getElementById("exerciseSelect");
var saveExercise = document.getElementById("saveExercise");
var exerciseType = document.getElementById("exerciseType");
var graphType = document.getElementById("graphType");
var loadGraph = document.getElementById("loadGraph");
var exerciseTitle = document.getElementById("exerciseTitle");
var exerciseT = document.getElementById("exercise");
var newSubExercise = document.getElementById("newSubExercise");
var subExerciseOl = document.getElementById("subExerciseOl");
var generateExercises = document.getElementById("generateExercises");
var graphDiv = document.getElementById("graphDiv");
var exerciseSelector = document.getElementById("exercise-selector");
graphDiv.style.display = "none"
var subExercisesDiv = document.getElementById("subExercisesDiv");


newExercise.onclick = function() 
{
    var subexercise = [];
    var subexerciseInp = [];
    var gra = [];

    var exercise = {id: exerciseId++, type: 1, graphType: "undirected", loadGraph: false, 
    title: "Exercițiu nou", exerciseT: "Cerință nouă", numberOfSubExercises: 0, subexercises: subexercise, 
    numberOfSubexerciseInputs: 0, subexerciseInputs: subexerciseInp, graph: gra};

    exercises.push(exercise);
    updateExerciseSelect();
    currentSelectedExercise = exercise.id;
    exerciseSelect.value = currentSelectedExercise;
    exerciseType.value = 1;
    graphType.value = "undirected";
    loadGraph.checked = false;
    exerciseTitle.value = exercise.title;
    exerciseT.value = exercise.exerciseT;
    graphDiv.style.display = "none";
    subExercisesDiv.style.display = "block";
    setUndirected();
    deleteGraph();
    updateSubExerciseOl();
}

newSubExercise.onclick = function ()
{
    var subInput = document.createElement('input');
    subInput.type = "text";
    subInput.id = "subchapterTitle" + exercises[currentSelectedExercise].numberOfSubexerciseInputs;
    subInput.name = "subchapterTitle" + exercises[currentSelectedExercise].numberOfSubexerciseInputs++;

    exercises[currentSelectedExercise].subexerciseInputs.push(subInput);
    updateSubExerciseOl()
}

saveExercise.onclick = function ()
{
    var selected = exerciseSelect.value;

    exercises[selected].type = exerciseType.value;
    exercises[selected].graphType = graphType.value;
    exercises[selected].loadGraph = loadGraph.checked;
    exercises[selected].title = exerciseTitle.value;
    exercises[selected].exerciseT= exerciseT.value;
    exercises[selected].subexercises = [];
    exercises[selected].numberOfSubExercises = 0;
    for(var i = 0;i < exercises[selected].numberOfSubexerciseInputs;i++)
    {
        if(exercises[selected].subexerciseInputs[i].value != "")
        {
            var subexercise = exercises[selected].subexerciseInputs[i].value;
            exercises[selected].subexercises.push(subexercise);
            exercises[selected].numberOfSubExercises++;
        }
    }
    saveGraphToArray();
    updateExerciseSelect();
    exerciseSelect.value = selected;
}

generateExercises.onclick = function ()
{
    var exercisesXml = "var exercises = \n`\n";
    exercisesXml += "<exercises>\n";
    for(var i = 0;i < exerciseId;i++)
    {
        exercisesXml += "\t<exercise>\n";
        exercisesXml += "\t\t<type>" + exercises[i].type + "</type>\n";
        exercisesXml += "\t\t<directed>" + (exercises[i].graphType == "undirected" ? 0 : 1) + "</directed>\n";
        exercisesXml += "\t\t<title>" + exercises[i].title + "</title>\n";
        exercisesXml += "\t\t<load>" + (exercises[i].loadGraph == true ? 1 : 0) + "</load>\n";
        exercisesXml += "\t\t<text>" + exercises[i].exerciseT + "</text>\n";
        for(var j = 0;j < exercises[i].numberOfSubExercises;j++)
            exercisesXml += "\t\t<sub>" + exercises[i].subexercises[j] + "</sub>\n";

        if(exercises[i].loadGraph)
        {
            if(exercises[i].graph.numberOfNodes > 0)
            {
                exercisesXml += "\t\t<graph>\n";
                exercisesXml += "\t\t\t<n>" + exercises[i].graph.numberOfNodes + "</n>\n";
                exercisesXml += "\t\t\t<m>" + exercises[i].graph.numberOfEdges + "</m>\n";

                exercisesXml += "\t\t\t<nodes>\n";
                for(var k = 0;k < exercises[i].graph.numberOfNodes;k++)
                {
                    exercisesXml += "\t\t\t\t<node>\n";
                    exercisesXml += "\t\t\t\t\t<x>" + exercises[i].graph.nodesArray[k].x + "</x>\n";
                    exercisesXml += "\t\t\t\t\t<y>" + exercises[i].graph.nodesArray[k].y + "</y>\n";
                    exercisesXml += "\t\t\t\t</node>\n";
                }
                exercisesXml += "\t\t\t</nodes>\n";

                exercisesXml += "\t\t\t<edges>\n";
                for(var k = 0;k < exercises[i].graph.edgesArray.length;k++)
                {
                    if(exercises[i].graph.edgesArray[k].render)
                    {
                        exercisesXml += "\t\t\t\t<edge>\n";
                        exercisesXml += "\t\t\t\t\t<n1>" + exercises[i].graph.edgesArray[k].n1 + "</n1>\n";
                        exercisesXml += "\t\t\t\t\t<n2>" + exercises[i].graph.edgesArray[k].n2 + "</n2>\n";
                        exercisesXml += "\t\t\t\t</edge>\n";
                    }
                }
                exercisesXml += "\t\t\t</edges>\n";

                exercisesXml += "\t\t</graph>\n";
            }
        }

        exercisesXml += "\t</exercise>\n";
    }
    exercisesXml += "</exercises>\n`;"; 
    download("exercises-data.js", exercisesXml);
}

exerciseSelect.onchange = function ()
{
    currentSelectedExercise = exerciseSelect.value;
    exerciseType.value = exercises[currentSelectedExercise].type;
    graphType.value = exercises[currentSelectedExercise].graphType;
    loadGraph.checked = exercises[currentSelectedExercise].loadGraph;
    exerciseTitle.value = exercises[currentSelectedExercise].title;
    exerciseT.value = exercises[currentSelectedExercise].exerciseT;
  
    if(graphType.value == "undirected")
    {
        setUndirected();
        deleteGraph();
    }
    else
    {
        setDirected();
        deleteDirectedGraph();
    }

    if(loadGraph.checked)
    {
        graphDiv.style.display = "block";
        loadGraphFromArray();
    }
    else
        graphDiv.style.display = "none";
    updateSubExerciseOl();
}

loadGraph.onchange = function ()
{
    if(loadGraph.checked)
        graphDiv.style.display = "block";
    else
        graphDiv.style.display = "none";
}

graphType.onchange = function ()
{
    if(graphType.value == "undirected")
    {
        setUndirected();
        deleteGraph();
    }
    else
    {
        setDirected();
        deleteDirectedGraph();
    }
}

function updateExerciseSelect()
{
    exerciseSelect.innerHTML = "";
    for(var i = 0;i < exerciseId;i++)
    {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(exercises[i].title));
        opt.value = exercises[i].id; 
        exerciseSelect.appendChild(opt); 
    }
}

function updateSubExerciseOl()
{
    subExerciseOl.innerHTML = "";
    for(var i = 0;i < exercises[currentSelectedExercise].numberOfSubexerciseInputs;i++)
    {
        var listItem = document.createElement('li');
        listItem.appendChild(exercises[currentSelectedExercise].subexerciseInputs[i]);
        subExerciseOl.appendChild(listItem); 
    }
}

function saveGraphToArray()
{    
    if(exercises[currentSelectedExercise].graphType == "directed")
    {
        var graphk = {numberOfNodes: directedn, numberOfEdges: directedmnumber, nodesArray: directednodes, edgesArray: directededges};
        exercises[currentSelectedExercise].graph = graphk;
    }
    else
    {
        var graphk = {numberOfNodes: n, numberOfEdges: mnumber, nodesArray: nodes, edgesArray: edges};
        exercises[currentSelectedExercise].graph = graphk;        
    }
}

function loadGraphFromArray()
{
    if(exercises[currentSelectedExercise].graphType == "directed")
    {
        if(exercises[currentSelectedExercise].graph.numberOfNodes > 0)
        {
            setDirected();
            deleteDirectedGraph();

            for(var i = 0;i < exercises[currentSelectedExercise].graph.nodesArray.length;i++)
                addDirectedNode(exercises[currentSelectedExercise].graph.nodesArray[i].x, exercises[currentSelectedExercise].graph.nodesArray[i].y, false, 0, 0);

            for(var i = 0;i < exercises[currentSelectedExercise].graph.edgesArray.length;i++)
            {
                var n1 = exercises[currentSelectedExercise].graph.edgesArray[i].n1;
                var n2 = exercises[currentSelectedExercise].graph.edgesArray[i].n2;
                var t = addDirectedEdge(n1, n2);
                directedmuchii[n1][n2] = t;
            }
        }
    }
    else
    {
        if(exercises[currentSelectedExercise].graph.numberOfNodes > 0)
        {
            setUndirected();
            deleteGraph();

            for(var i = 0;i < exercises[currentSelectedExercise].graph.nodesArray.length;i++)
                addNode(exercises[currentSelectedExercise].graph.nodesArray[i].x, exercises[currentSelectedExercise].graph.nodesArray[i].y, false, 0, 0);

            for(var i = 0;i < exercises[currentSelectedExercise].graph.edgesArray.length;i++)
            {
                var n1 = exercises[currentSelectedExercise].graph.edgesArray[i].n1;
                var n2 = exercises[currentSelectedExercise].graph.edgesArray[i].n2;
                var t = addEdge(n1, n2);
                muchii[n1][n2] = muchii[n1][n2] = t;
            }
        }
    }
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function loadExercises(exercisess)
{
    exerciseId = 0;
    exercises = [];

    var parser = new DOMParser();
    exDoc = parser.parseFromString(exercisess, "text/xml");
    exercisesDOM = exDoc.getElementsByTagName("exercise");

    console.log(exercisesDOM);
    
    if(exercisesDOM.length > 0)
    {
        for(var i = 0;i < exercisesDOM.length;i++)
        {

            var subexercise = [];
            var subexerciseInp = [];
            var gra = [];

            var exercise = {id: exerciseId++, 
                type: exercisesDOM[i].childNodes[1].childNodes[0].nodeValue, 
                graphType: ((exercisesDOM[i].childNodes[3].childNodes[0].nodeValue == 0) ? "undirected" : "directed"), 
                loadGraph: ((exercisesDOM[i].childNodes[7].childNodes[0].nodeValue == 0) ? false : true), 
                title: exercisesDOM[i].childNodes[5].childNodes[0].nodeValue, 
                exerciseT: exercisesDOM[i].childNodes[9].childNodes[0].nodeValue, 
                numberOfSubExercises: 0, subexercises: subexercise, 
                numberOfSubexerciseInputs: 0, subexerciseInputs: subexerciseInp, graph: gra};

            exercises.push(exercise);
            
            var subExs = exercisesDOM[i].getElementsByTagName("sub");

            for(var j = 0;j < subExs.length;j++)
            {
                var subInput = document.createElement('input');
                subInput.type = "text";
                subInput.id = "subchapterTitle" + exercises[exerciseId - 1].numberOfSubexerciseInputs;
                subInput.value = subExs[j].childNodes[0].nodeValue;
                subInput.name = "subchapterTitle" + exercises[exerciseId - 1].numberOfSubexerciseInputs++;

                exercises[exerciseId - 1].subexerciseInputs.push(subInput);
            }

            if(exercises[exerciseId - 1].loadGraph)
            {
                var graphtoload = exercisesDOM[i].getElementsByTagName("graph")[0];

                if(exercises[exerciseId - 1].graphType == "undirected")
                {
                    setUndirected();
                    deleteGraph();

                    var nodestoload = graphtoload.childNodes[5].getElementsByTagName("node");

                    for(var k = 0;k < nodestoload.length;k++)
                        addNode(parseInt(nodestoload[k].childNodes[1].childNodes[0].nodeValue), parseInt(nodestoload[k].childNodes[3].childNodes[0].nodeValue), false, 0, 0);
                    
                    var edgestoload = graphtoload.childNodes[7].getElementsByTagName("edge");

                    for(var k = 0;k < edgestoload.length;k++)
                    {
                        var n1 = parseInt(edgestoload[k].childNodes[1].childNodes[0].nodeValue);
                        var n2 = parseInt(edgestoload[k].childNodes[3].childNodes[0].nodeValue);
                        var edgenr = addEdge(n1, n2, "black");
                        muchii[n1][n2] = muchii[n1][n2] = edgenr;
                    }
                }
                else
                {
                    setDirected();
                    deleteDirectedGraph();

                    var nodestoload = graphtoload.childNodes[5].getElementsByTagName("node");

                    for(var k = 0;k < nodestoload.length;k++)
                        addDirectedNode(parseInt(nodestoload[k].childNodes[1].childNodes[0].nodeValue), parseInt(nodestoload[k].childNodes[3].childNodes[0].nodeValue), false, 0, 0);
                    
                    var edgestoload = graphtoload.childNodes[7].getElementsByTagName("edge");

                    for(var k = 0;k < edgestoload.length;k++)
                    {
                        var n1 = parseInt(edgestoload[k].childNodes[1].childNodes[0].nodeValue);
                        var n2 = parseInt(edgestoload[k].childNodes[3].childNodes[0].nodeValue);
                        var t = addDirectedEdge(n1, n2);
                        directedmuchii[n1][n2] = t;
                    }
                }
            }

            exercises[exerciseId - 1].subexercises = [];
            exercises[exerciseId - 1].numberOfSubExercises = 0;
            for(var j = 0;j < exercises[exerciseId - 1].numberOfSubexerciseInputs;j++)
            {
                if(exercises[exerciseId - 1].subexerciseInputs[j].value != "")
                {
                    var subexercise = exercises[exerciseId - 1].subexerciseInputs[j].value;
                    exercises[exerciseId - 1].subexercises.push(subexercise);
                    exercises[exerciseId - 1].numberOfSubExercises++;
                }
            }
           
            if(exercises[exerciseId - 1].graphType == "directed")
            {
                var graphk = {numberOfNodes: directedn, numberOfEdges: directedmnumber, nodesArray: directednodes, edgesArray: directededges};
                exercises[exerciseId - 1].graph = graphk;
            }
            else
            {
                var graphk = {numberOfNodes: n, numberOfEdges: mnumber, nodesArray: nodes, edgesArray: edges};
                exercises[exerciseId - 1].graph = graphk;        
            }
            console.log(exercises[exerciseId - 1]);
        }
        
        updateExerciseSelect();
        currentSelectedExercise = 0;
        exerciseType.value = exercises[currentSelectedExercise].type;
        graphType.value = exercises[currentSelectedExercise].graphType;
        loadGraph.checked = exercises[currentSelectedExercise].loadGraph;
        exerciseTitle.value = exercises[currentSelectedExercise].title;
        exerciseT.value = exercises[currentSelectedExercise].exerciseT;
  
        if(graphType.value == "undirected")
        {
            setUndirected();
            deleteGraph();
        }
        else
        {
            setDirected();
            deleteDirectedGraph();
        }

        if(loadGraph.checked)
        {
            graphDiv.style.display = "block";
            loadGraphFromArray();
        }
        else
            graphDiv.style.display = "none";
        updateSubExerciseOl();
    }
}

exerciseSelector.addEventListener('change', (event) => {
    var files = event.target.files;;
    var reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = function()
    {
        loadExercises(reader.result.slice(18, reader.result.length - 2));
    }
});