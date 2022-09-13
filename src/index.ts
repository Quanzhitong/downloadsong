import download from '../util/downloadSong';
import commanderCLI from './commander';
import chooseSong from './chooseSong';
import querySongs from '../util/querySongList';

const downloadSong = async () => {
    const songs = await querySongs(commanderCLI);
    const { song } = await chooseSong(songs);
    song && (await download(song));
}

export default downloadSong