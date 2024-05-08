import api from "../http/index";

export default class MapService {
    static async myMaps(id_user) {
        return api.get('/myMaps/' + id_user);
    }

    static async myMapData(id_map) {
        return api.get('/myMapData/' + id_map);
    }
}