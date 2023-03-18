exdragElement(document.getElementById("expopup"));

function exdragElement(element)
{
    var p1 = 0, p2 = 0, p3 = 0, p4 = 0;
    document.getElementById(element.id + "header").onmousedown = exdragMouseDown;

    function exdragMouseDown(e)
    {   
        e = e || window.event;
        e.preventDefault();
        p3 = e.clientX;
        p4 = e.clientY;

        document.onmouseup = excloseDragElement;
        document.onmousemove = exelementDrag;
    }

    function exelementDrag(e)
    {
        e = e || window.event;
        e.preventDefault();

        p1 = p3 - e.clientX;
        p2 = p4 - e.clientY;
        p3 = e.clientX;
        p4 = e.clientY;

        element.style.top = (element.offsetTop - p2) + "px";
        element.style.left = (element.offsetLeft - p1) + "px";
    }

    function excloseDragElement()
    {
        document.onmouseup = null;
        document.onmousemove = moveNode;
    }
}

function exshowPopup()
{
    if(!document.getElementById("expopup").classList.contains("show"))
    {
        document.getElementById("expopup").style.left = "6%";
        document.getElementById("expopup").style.top = "22%";
    }
    document.getElementById("expopup").classList.toggle("show");
}