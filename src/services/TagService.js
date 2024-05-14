import api from "../http/index";

export default class TagService {
    static async tagsForMap(id_map) {
        return api.get('/tagsForMap/' + id_map);
    }

    static async bindTagToMap(tag_name, id_map) {
        return api.post('/bindTagToMap', {tag_name, id_map});
    }

    static async deleteTag(id_map, id_tag) {
        return api.post('/deleteTag', {id_map, id_tag});
    }
}