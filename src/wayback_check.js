
function get_ori_url ()
{
    return window.location.href;
}

async function check_avil(theUrl)
{
    var rUrl = "https://archive.org/wayback/available?url=" + theUrl;
    const response = await fetch(rUrl);
    if (!response.ok){
        const message = `Failed to fetch status: ${response.status}`;
        throw new Error (message);
    }
    const result = await response.json();
    if (Object.keys(result["archived_snapshots"]).length === 0)
    {
        return false;
    }

    return result["archived_snapshots"]["closest"]["available"];
}

async function redirect_archive(theUrl, callback)
{
    var ret = false;
    var rUrl = "https://web.archive.org/web/" + theUrl;
    const check = await callback(theUrl);

    if (!check)
    {
        alert ("no archive available.");
        return ret;
    }
    else console.log(check);

    if (confirm ("Go to archive?"))
    {
        window.open(rUrl, "_blank");
        ret = true;
    }
    return ret;
}

// fetch the earliest url
async function get_earliest_url(theUrl)
{
    var year = new Date().getFullYear();
    
    var rUrl = "https://timetravel.mementoweb.org/api/json/" 
    + String(year) 
    + "/" 
    + theUrl;
    const response = await fetch(rUrl);
    if (!response.ok){ 
        const message = `Failed to fetch date: ${response.status}`;
        throw new Error (message);
    }
    const res = await response.json();
    var ret = res["mementos"]["first"]["uri"][0];

    return ret;
}

async function get_first_snapshot (theUrl, callback)
{
    // console.log(theUrl);
    const rUrl = await callback(theUrl, check_avil);

    const response = await fetch(rUrl);
    if (!response.ok){ 
        const message = `Failed to fetch snapshot: ${response.status}`;
        throw new Error (message);
    }
    const res = await response.text();
    var parser = new DOMParser();
    var doc = parser.parseFromString(res, 'text/html');
    
    return doc;
    
}

async function redirect()
{
    var cUrl = get_ori_url();
    
    // await get_first_snapshot(cUrl, get_earliest_date)
    // .catch(e => console.log(e));

    var decision = await redirect_archive(cUrl, check_avil)
        .catch(e => console.log(e));

    return decision;
}

async function compare(first_snap)
{
    
}

async function main ()
{
    const cUrl = get_ori_url();
    console.log(cUrl);
    if (cUrl === "https://web.archive.org")
    {
        return;        
    }
    else if (cUrl.indexOf("https://web.archive.org") < 0) await redirect();
    else{
        var i = cUrl.lastIndexOf("https://");
        var original_html = await get_first_snapshot(cUrl.substring(i), get_earliest_url)
    }
}

main();



