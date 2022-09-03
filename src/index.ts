import download from './download';
import commanderCLI from './commander';
import querySongs from './querySongs';
import chooseSong from './chooseSong';

const downloadSong = async () => {
    const songs = await querySongs(commanderCLI);
    const { song } = await chooseSong(songs);
    song && (await download(song));
}

export default downloadSong