const express = require('express');
let mod = require('../artist');
const router = express.Router();

router.get('/', (req,res) => {
   return res.send(`<form action="/players/add" method="POST"> 
               <input type="text" name="player_name" /> <input type="submit"  value="submit" /> 
           </form>`)
});

/*
router.get('/players/add', (req,res) => {
   return res.send(`<form action="/players/add" method="POST"> 
               <input type="text" name="player_name" /> <input type="submit"  value="submit" /> 
           </form>`)
});

router.get('/players/all', (req,res) => {
   let p = mod.getall();
   let str = '<ul>'
   let lis = '';
   for(let i=0;i<p.length;i++) {
       lis+='<li>' + p[i] + '</li>';
   }
   str+=lis;
   str+='</ul>';
   return res.send(str);
});


router.post('/players/add', (req, res) => {
   const player_name = req.body.player_name;
   mod.add(player_name);
   res.redirect(301, '/players/all');
})

module.exports = router;

*/