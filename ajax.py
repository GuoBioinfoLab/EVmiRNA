import flask_restful

from EVmiRNA import app, api
from EVmiRNA.core import mongo

from flask_restful import Resource, fields, marshal_with, reqparse, marshal

###test
test_fields = {
    'source':fields.String,
    'samp':fields.String
        }

class FuzzyFoo(Resource):
    @marshal_with(test_fields)
    def get(self):
        a = [{'source':'seminal','samp':'ar'},{'source':'s','samp':'e'}]
        return a

api.add_resource(FuzzyFoo,'/api/test')



### browse source and miRNA
browse_fields = {
    'source':fields.String,
    'cellline':fields.String,
    'sample_num':fields.Integer,
    'desease':fields.String,
    'mv_exo':fields.String,
        }
class Browse(Resource):
    @marshal_with(browse_fields)
    def get(self):
        
        result = []
        source_browse = []
        tmpa = ''
        samp = list(mongo.db.sample.find())
        
        for l in samp:
            tmpa = l['source'].strip()+'_'+l['cell line'].strip()+'_'+l['desease'].strip()+'_'+l['mv_exo'].strip()
            source_browse.append(tmpa)
            tmpa = ''
        source_browse_set = set(source_browse)

        for l in source_browse_set:
            t = l.strip().split('_')
            if len(t) == 4:
                r = {'source':t[0],'cellline':t[1],'desease':t[2],'mv_exo':t[3],'sample_num':source_browse.count(l)}
            result.append(r)

        return result

api.add_resource(Browse,'/api/browse')

### miRNA_annotation
miRNA_annotation_fields = {
	'premiRNA_acc':fields.String,
	'premiRNA_seq':fields.String,
	'miRNA_acc':fields.String,
	'miRNA_start':fields.String,
	'premiRNA_chr':fields.String,
	'miRNA_chr':fields.String,
	'miRNA_seq':fields.String,
	'miRNA_end':fields.String,
	'miRNA_id':fields.String,
	'premiRNA_id':fields.String,
	'miRNA_fam':fields.String,
	'premiRNA_end':fields.String,
	'premiRNA_start':fields.String,
	}
class mirna_info(Resource):
	@marshal_with(miRNA_annotation_fields)
	def get(self):
		parser = reqparse.RequestParser()
		parser.add_argument('miRNA_id',type = str)
		parser.add_argument('miRNA_acc',type= str)
		args = parser.parse_args()
		condition = {}
		if args['miRNA_id'] or args['miRNA_acc']:
			condition ={ 'premiRNA_acc':args['premiRNA_acc'],'seq':args['seq'],'miRNA_acc':args['miRNA_acc'],'miRNA_start':args['start'],'premiRNA_chr':args['premiRNA_chr'],'miRNA_chr':args['chr'],'miRNA_seq':args['miRNA_seq'],'miRNA_end':args['miRNA_end'],'miRNA_id':args['miRNA_id'],'premiRNA_id':args['premiRNA_id'],'miRNA_fam':args['miRNA_fam'],'premiRNA_end':args['premiRNA_end'],'premiRNA_start':args['premiRNA_start']}
			mirna_info = mongo.db.mir_annotation.find(condition)
		else:
			mirna_info = mongo.db.mir_annotation.find_one()
		app.logger.debug("mirna_info={}".format(mirna_info))
		return mirna_info

api.add_resource(mirna_info,"/api/mirna_info")

miRNA_annotation_list_fields = {
	"miRNA_annotation_fields" : fields.List(fields.Nested(miRNA_annotation_fields))
}
class mirna_info_list(Resource):
	@marshal_with(miRNA_annotation_list_fields)
	def get(self):
		parser = reqparse.RequestParser()
		parser.add_argument('miRNA_id', type = str)
		parser.add_argument('miRNA_acc', type= str)
		args = parser.parse_args()
		condition = {}
		if args['miRNA_id']:
			condition['miRNA_id'] = args['miRNA_id']
		if args['miRNA_acc']:
			condition['miRNA_acc'] = args['miRNA_acc']
		mirna_info_list = list(mongo.db.mir_annotation.find(condition))
		return {'mirna_info_list':mirna_info_list}

api.add_resource(mirna_info_list,'/api/mirna_list')
