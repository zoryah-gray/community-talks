import axios from 'axios';
import * as cheerio from 'cheerio';

// const axios = require('axios');
// const cheerio = require("cheerio");

const BASE_URL = 'https://www.cityofevanston.org';

// get the page with url (static for now)
// const url = "https://www.cityofevanston.org/government/boards-commissions-and-committees";
// axios.get(url)
//     .then(res => {
//         console.log(res.data);
//     })
//     .catch(err => {
//         console.error("Error fetching the page:", err);
//     });

async function scrapeBoardMemberNames() {
    try {
        // Step 1: Get the main page
        const { data: html } = await axios.get(`${BASE_URL}/government/boards-commissions-and-committees`);
        const $ = cheerio.load(html);
        const links = [];
    
        // Step 2: Extract links to individual boards/commissions
        $('a').each((_, el) => {
        const href = $(el).attr('href');
        if (href && href.includes('/government/boards-commissions')) {
            links.push(BASE_URL + href);
        }
        });
    
        // Step 3: Visit each link and scrape member names
        for (const link of links.slice(0, 3)) { // limit for testing
        try {
            const { data: boardHtml } = await axios.get(link);
            const $$ = cheerio.load(boardHtml);
    
            console.log(`\nBoard URL: ${link}`);
            $$('li, p, td').each((_, el) => {
            const text = $$(el).text().trim();
            if (text.match(/^[A-Z][a-z]+\s[A-Z][a-z]+/)) { // crude name matcher
                console.log('Member:', text);
            }
            });
        } catch (err) {
            console.error('Error loading board page:', link, err.message);
        }
        }
    
    } catch (err) {
        console.error('Failed to scrape:', err.message);
    }
}
    
scrapeBoardMemberNames();