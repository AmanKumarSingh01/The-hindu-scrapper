const express = require('express');;
const router = express.Router();
const cheerio = require('cheerio')
const axios = require('axios')

router.get('/national-scraper' , (req ,res) => {
    console.log("Hitting for headlines")
    let url = 'https://www.thehindu.com/news/national/'
    let data = []
    axios(url)
        .then( response => {
            const html = response.data;
            const $ = cheerio.load(html)
            const headlines = $('.dropdown-32-story');
            console.log(headlines.length)
            headlines.each (function () {
                const item = $(this).find('li ').contents().prev();
                item.each( function () {
                    const link =$(this).attr('href');
                    const heading = $(this).text().trim().slice($(this).clone().children().remove().text().trim().length)
                    const atr = {
                        link,
                        heading 
                    }
                    data.push(atr)
                })
            })
            res.json(data)
        })
        .catch(console.error)
})

router.post('/get-stuffs' , (req , res) => {
    let url = req.body.url;
    var arr = url.split("/");
    const l =arr.length;
    let aux = arr[l-1].split(".");
    let data = aux[0];
    const id = data.replace('article' , ' ').trim();
    const id_name = '#content-body-14269002-'+id;
    axios(url)
        .then(response =>{
            const html = response.data;
            const $ = cheerio.load(html);
            const data = $(id_name)
            // console.log(data.text().trim().replace("\n\n\n\n " , " "))
            res.json({"Response" : data.text().trim()})
        })
        .catch(console.error)
})


router.post('/national-headlines-with-pictures' ,async (req ,res) =>{
    console.log("Hitting for headlines")
    let data = []
    for(var i=1 ; i <= req.body.pages ; i++){
        let url = 'https://www.thehindu.com/news/national/?page='+i;
        await axios(url)
            .then(response =>{
                const html =response.data;
                const $ = cheerio.load(html);
                const headlines = $('.story-card')
                console.log(headlines.length)
                headlines.each( function() {
                    const link = $(this).find('a').attr('href');
                    const image = $(this).find('.media-object').attr('data-src-template');
                    const headlines =$(this).text().replace('National' , '').trim();
                    const atr = {
                        link ,
                        image ,
                        headlines
                    }
                    data.push(atr)
                })
            })
            .catch(console.error)
    }
    res.json(data);
})


router.post('/international' , async (req , res) =>{
    console.log("Hitting for international headlines")
    let data = [];
    for(var i=1 ; i <= req.body.pages ; i++){
        let url = 'https://www.thehindu.com/news/international/?page='+i;
        await axios(url)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html);
                const headlines = $('.story-card');
                console.log(headlines.length);
                headlines.each( function() {
                    const link = $(this).find('a').attr('href');
                    const image = $(this).find('.media-object').attr('data-src-template');
                    const headlines =$(this).text().replace('International' , '').trim().split('\n')[0];
                    const atr = {
                        link ,
                        image ,
                        headlines
                    }
                    data.push(atr);
                    console.log(atr);
                })
            })
    }
    res.json(data);
})

router.post('/editorial' , async (req , res) => {
    console.log("Hitting for international headlines")
    let data = [];
    for(var i=1 ; i <= req.body.pages ; i++){
        let url
        if(i===1){
            url = "https://www.thehindu.com/opinion/editorial/"
        }else {
            url = 'https://www.thehindu.com/opinion/editorial/?page='+i;
        }
        await axios(url)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html);
                const headlines = $('.story-card');
                console.log(headlines.length);
                headlines.each( function() {
                    const link = $(this).find('a').attr('href');
                    const image = 'https://lh3.googleusercontent.com/proxy/OiCirfw1MZAKSI0isPfoXL3fYU7yGMhvXkmIAwgSTQnwUEqjvw6IMTDEUAXa1e2JeFtAn-mmaFUB-dG3H_VuLNq9QwLkOeo_qReATEIvAE40wAic1PXuWnbuSuHyRbj4';
                    const headlines =$(this).text().replace('Editorial' , '').replace(/(\r\n|\n|\r)/gm  , '').trim();
                    const atr = {
                        link ,
                        image ,
                        headlines
                    }
                    data.push(atr);
                    //console.log(headlines);
                })
            })
            .catch(console.error)
    }
    res.json(data);
})

module.exports= router;