function distance(x1, y1, x2, y2)
{
    return Math.sqrt(Math.pow((x1 - x2), 2) +
        Math.pow((y1 - y2), 2));
}

// Function to calculate K closest points
export function Closest(points,
    target,ins)
{
    let n = points.length;
    let d = Infinity;
    let dstate,dcity;
    for (let i = 0; i < n; i++) {
        if(points[i]["lat"]==0 || points[i]["State"]!=ins)
        {
            continue;
        }
        if(distance(points[i]["lat"], points[i]["long"],target[0], target[1])<d)
        {
            d=distance(points[i]["lat"], points[i]["long"],target[0], target[1]);
            dcity=points[i]["City"];
            dstate=points[i]["State"];
        }
    }
    return [dcity,dstate];
};
