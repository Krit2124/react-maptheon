import api from "../http/index";

export default class MapService {
    static async myMaps(textToFind, sortByField) {
        return api.post('/myMaps', {textToFind, sortByField});
    }

    static async myMapData(id_map) {
        return api.get('/myMapData/' + id_map);
    }

    static async myMapSettings(id_map) {
        return api.get('/myMapSettings/' + id_map);
    }

    static async saveMapData(id_map, data, mapImage) {
        return api.post('/saveMapData', {id_map, data, mapImage});
    }
}