import api from "../http/index";

export default class MapService {
    static async allMaps(textToFind, sortByField) {
        return api.post('/allMaps', {textToFind, sortByField});
    }

    static async myMaps(textToFind, sortByField) {
        return api.post('/myMaps', {textToFind, sortByField});
    }

    static async userMaps(id_user, textToFind, sortByField) {
        return api.post('/userMaps', {id_user, textToFind, sortByField});
    }

    static async myMapData(id_map) {
        return api.get('/myMapData/' + id_map);
    }

    static async myMapSettings(id_map) {
        return api.get('/myMapSettings/' + id_map);
    }

    static async updateMapName(id_map, newName) {
        return api.post('/updateMapName', {id_map, newName});
    }

    static async updateMapDescription(id_map, newDescription) {
        return api.post('/updateMapDescription', {id_map, newDescription});
    }

    static async updateMapPublicStatus(id_map, newPublicStatus) {
        return api.post('/updateMapPublicStatus', {id_map, newPublicStatus});
    }

    static async saveMapData(id_map, data, mapImage) {
        return api.post('/saveMapData', {id_map, data, mapImage});
    }

    static async deleteMap(id_map) {
        return api.post('/deleteMap', {id_map});
    }
}