import * as request from './requester';

const BASE_URL = 'http://localhost:3030/jsonstore/games';

export const getAll = async () => {
    const result = await request.get(BASE_URL);

    const games = Object.values(result);

    return games;
}

export const getOne = async (gameId) => {
    const game = await request.get(`${BASE_URL}/${gameId}`);

    return game;
}

const gamesApi = {
    getOne,
    getAll,
}

export default gamesApi;