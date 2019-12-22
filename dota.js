'use strict';

const Router = require('koa-router');
const request = require('request-promise');
const router = new Router({ prefix: '/dota' });

router.get('/', async ctx => {
  let opts = {
    uri: 'https://api.opendota.com/api/players/108296670/matches?limit=10',
    json: true
  };
  let data = await request(opts);
  let { match_id, player_slot } = data[0];
  let matchOpts = {
    uri: `https://api.opendota.com/api/matches/${match_id}`,
    json: true
  };
  let match = await request(matchOpts);
  let players = match.players;
  let buddy = players.filter(player => player.player_slot === player_slot);
  let {
    assists,
    deaths,
    kills,
    hero_damage,
    building_damage
  } = buddy[0];
  ctx.send(200, buddy);
});

module.exports = router;
