var settingsDiv = document.getElementById("settingsDiv");
var settingsCircle = document.getElementById("settingsCircle");
var settingsButton = document.getElementById("settingsButton");
var settingsOpen = false;

var contentsDiv = document.getElementById("contentsDiv");
var contentsCircle = document.getElementById("contentsCircle");
var contentsButton = document.getElementById("contentsButton");
var contentsOpen = false;

var helpDiv = document.getElementById("helpDiv");
var helpCircle = document.getElementById("helpCircle");
var helpButton = document.getElementById("helpButton");
var helpOpen = false;

var theoryDiv = document.getElementById("theoryDiv");
var theoryCircle = document.getElementById("theoryCircle");
var theoryButton = document.getElementById("theoryButton");
var theoryOpen = false;

var btnAdd = document.getElementById("btnAdd");
var NodesDiv = document.getElementById("Nodes");
var EdgesDiv = document.getElementById("Edges");

var del = false;

function toggleSettings()
{
    if(!contentsOpen && !helpOpen)
    {
        settingsDiv.classList.toggle("show");
        settingsCircle.classList.toggle("show");
        if(settingsButton.className == "settings")
        {
            settingsButton.className = "settings_x";
            settingsOpen = true;
        }
        else
        {
            settingsButton.className = "settings";
            settingsOpen = false;
        }
    }
}

function toggleContents()
{
    if(!settingsOpen && !helpOpen)
    {
        contentsDiv.classList.toggle("show");
        contentsCircle.classList.toggle("show");
        if(contentsButton.className == "contents")
        {
            contentsButton.className = "contents_x";
            contentsOpen = true;
        }
        else
        {
            contentsButton.className = "contents";
            contentsOpen = false;
        }
    }
}

function toggleHelp()
{
    if(!settingsOpen && !contentsOpen)
    {
        helpDiv.classList.toggle("show");
        helpCircle.classList.toggle("show");
        if(helpButton.className == "help")
        {
            helpButton.className = "help_x";
            helpOpen = true;
        }
        else
        {
            helpButton.className = "help";
            helpOpen = false;
        }
    }
}

function toggleTheory()
{
        theoryDiv.classList.toggle("show");
        theoryCircle.classList.toggle("show");
        if(theoryButton.className == "theory")
        {
            theoryButton.className = "theory_x";
            theoryOpen = true;
        }
        else
        {
            theoryButton.className = "theory";
            theoryOpen = false;
        }
}

function toggleAdd()
{
    NodesDiv.classList.toggle("show");
    EdgesDiv.classList.toggle("show");
}
