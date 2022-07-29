const http = require('http');
const download = require('../test/');
const commander = require('./commander');
const querySongs = require('./querySongs');
const chooseSong = require('./chooseSong');

module.exports = async () => {
    const songs = await querySongs(commander);
    const { song } = await chooseSong(songs);
    song && (await download(song));
}