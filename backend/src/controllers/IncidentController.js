const connectionDatabase = require('../database/connection');


module.exports = {
    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const result = await connectionDatabase('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        
        return response.json(result);
    },

    async index(request, response){
        const { page = 1 } = request.query;

        const [count] = await connectionDatabase('incidents').count();

        response.header('X-Total-Count', count['count(*)']);

        const incidents = await connectionDatabase('incidents')
                                .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                                .limit(5)
                                .offset((page - 1) * 5)
                                .select([
                                    'incidents.*',
                                    'ongs.name',
                                    'ongs.whatsapp',
                                    'ongs.email',
                                    'ongs.uf',
                                    'ongs.city'
                                ]);
                                
        return response.json(incidents);
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        const incident = await connectionDatabase('incidents').where('id', id).select('ong_id').first();
        
        if(incident.ong_id !== ong_id){
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connectionDatabase('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}