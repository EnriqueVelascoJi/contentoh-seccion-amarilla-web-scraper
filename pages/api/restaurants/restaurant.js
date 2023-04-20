const cheerio = require("cheerio");
const axios = require("axios");

export default async function handler(req, res) {

    const {input, page} = req.body;

    if (req.method === 'POST') {
        try {
            const htmlResponse = await axios.request({
                method: "GET",
                url: `https://www.seccionamarilla.com.mx/resultados/restaurantes/${input}/${page}`,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
                }
            })
        
            //Loading documnet (parse the HTML page with Cheerio)
            const $ = cheerio.load(htmlResponse.data);
            const restaurantsContainer = $('div.eight.columns');
        
        
            //Get the list 
            const restaurantsList = restaurantsContainer.find('.list').children();
        
            //Get pagination information
            const moreInfo = restaurantsContainer.find('.list-title span').text();
            const totalRestaurants = parseInt(moreInfo.split('de')[1].split('resultados')[0].trim());
            const pages = parseInt(moreInfo.split('de')[0].split('-')[1].trim());
        
            //Scraping the info
            let restaurants = []
            restaurantsList.each((index, restaurant) => {
        
                if(restaurant.name === 'li') {
                    // Extract interest data of each item
                    const restaurantInfo = $(restaurant).find('.row.l-info .l-datos');
                    const restaurantLinks = $(restaurant).find('.row.l-btn-container');
                    const name = restaurantInfo.find('a h2 span').text();
                    const contact = restaurantInfo.find('.l-tel a span').text();
                    const email = restaurantLinks.find('.mail-btn').attr('onclick');
                    const webSite = $(restaurantLinks.find('a').get(2)).attr('href');
                    const img = $(restaurant).find('.l-logo a img').attr('src');
                    let address = '';
                    restaurantInfo.find('.l-address').children().each((index, sp) => {
                        address += $(sp).text();
                    })
                    const restaurantInfoParsed = {
                        id: index,
                        name,
                        contact,
                        email,
                        webSite,
                        address,
                        img
                    };
                    restaurants.push(restaurantInfoParsed);
                }
                
            })
        
            //console.log(restaurants);
            //console.log(pages)
    
            res.status(200).json({
                pages,
                totalRestaurants,
                data: restaurants
            })
    
    
    
        } catch (error) {
            res.status(400).json({
              error: 'Somethin was wrong',
            })
        }
    }
}

