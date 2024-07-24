import { useEffect, useState } from "react";

import * as gamesAPI from "../api/games-api";

export function useGetAllGames() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gamesAPI.getAll()
            .then(result => setGames(result));
    }, []);

    return [games, setGames];
}

export function useGetOneGames(gameId) {
    const [game, setGame] = useState([]);

    useEffect(() => {
        gamesAPI.getOne(gameId)
            .then(result => setGame(result));
    }, [gameId]);

    return [game, setGame];
}