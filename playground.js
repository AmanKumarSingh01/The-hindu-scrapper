var url = 'https://www.thehindu.com/news/national/karnataka/95-roads-blocked-to-curbspread-of-coronavirus/article31429670.ece'

var arr = url.split("/")

const l =arr.length;
console.log(l)
let aux = arr[l-1].split(".");
let data = aux[0];
console.log(data.replace('article' , ' ').trim())