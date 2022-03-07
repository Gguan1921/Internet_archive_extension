function get_ori_url ()
{
    return window.location.href;
}

function get_archive_url ()
{
    var original = window.location.href;
    return get_ori_url + original;
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
// fetch the earliest url
async function get_earliest_url(theUrl)
{
    var rUrl = "https://web.archive.org/details/" + theUrl;
    const response = await fetch(rUrl);
    if (!response.ok){
        const message = `Failed to fetch summary page: ${response.status}`;
        throw new Error (message);
    }
    const result = await response.json();

    return result;
}

function main()
{
    var cUrl = get_ori_url();
    var avil;
    var summary_page;
    (async function() {
        try{
            avil = await check_avil(cUrl);
            if (!avil) return;
        } catch (e) {
            console.log (e);
            return;
        }

        try {
            summary_page = await get_earliest_url(cUrl);
            console.log(summary_page);
        } catch(e) {
            console.log (e);
            return;
        }
    })();
}

main();



// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function () {
//   if (this.readyState == 4 && this.status == 200) {
//     console.log(xhttp.responseText);
//   } else {
//     console.log("error")
//   }
// };
// xhttp.open("GET", new_link, true);
// xhttp.send();


// let paragraphs = document.getElementsByTagName('p');
// for (elt of paragraphs){
//     elt.style['background-color'] = '#FF00FF';
// }

 

