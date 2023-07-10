function distance(x1, y1, x2, y2)
{
    return Math.sqrt(Math.pow((x1 - x2), 2) +
        Math.pow((y1 - y2), 2));
}

// Function to calculate K closest points
export function Closest(points,
    target,ins,marker)
{
    marker.remove();
    let n = points.length;
    let d = Infinity;
    let dstate,dcity,cur;
    var arr=[];
    for (let i = 0; i < n; i++) {
        cur=distance(points[i]["lat"], points[i]["long"],target[0], target[1]);
        const obj={};
        obj["State"]=points[i]["State"];
        obj["City"]=points[i]["City"];
        obj["lat"]=points[i]["lat"];
        obj["long"]=points[i]["long"];
        obj["dist"]=cur;
        var circ=distance(22.947989,79.197638,points[i]["lat"], points[i]["long"]);
        obj["circ"]=circ;
        arr.push(obj);
        arr.sort(function(a,b){return a["dist"]-b["dist"]});
        // arr=arr.slice(0,11);    
        if(points[i]["lat"]==0 || points[i]["State"]!=ins)
        {
            continue;
        }
        if(cur<d)
        {
            d=cur;
            dcity=points[i]["City"];
            dstate=points[i]["State"];
        }
    }
    return [[dcity,dstate],arr];
};
