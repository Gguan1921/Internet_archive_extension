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
    let response = await fetch(rUrl);
    let data = await response.json();
    // console.log (data);
    // console.log (data["archived_snapshots"]["closest"]["available"]);
    return data["archived_snapshots"]["closest"]["available"];
}


var cUrl = get_ori_url();

var page_status;

// (async () => {
//     console.log(await check_avil(cUrl))
//   })()

(async () => {
    page_status = await check_avil(cUrl);
    console.log(page_status);
  })()


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

 

