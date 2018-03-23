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
miR_basic_fields = {
	'pre_acc':fields.String(attribute='premiRNA_acc'),
	'pre_seq':fields.String(attribute='premiRNA_seq'),
	'accession':fields.String(attribute='miRNA_acc'),
	'start':fields.Integer(attribute='miRNA_start'),
	'pre_chr':fields.String(attribute='premiRNA_chr'),
	'chromosome':fields.String(attribute='miRNA_chr'),
	'sequence':fields.String(attribute='miRNA_seq'),
	'end':fields.String(attribute='miRNA_end'),
	'mirna':fields.String(attribute='miRNA_id'),
	'premirna':fields.String(attribute='premiRNA_id'),
	'family':fields.String(attribute='miRNA_fam'),
	'pre_end':fields.Integer(attribute='premiRNA_end'),
	'pre_start':fields.Integer(attribute='premiRNA_start'),
	}
class mirna_info(Resource):
	@marshal_with(miR_basic_fields)
	def get(self):
		parser = reqparse.RequestParser()
		parser.add_argument('mirna',type = str)
		args = parser.parse_args()
		condition = {}
		if args['mirna']:
			condition = {'miRNA_id':args['mirna']}
			mirna_info = mongo.db.mir_annotation.find(condition)
		else:
			mirna_info = mongo.db.mir_annotation.find_one()
		app.logger.debug("mirna_info={}".format(mirna_info))
		return mirna_info

api.add_resource(mirna_info,"/api/mirna_info")

miR_basic_list_fields = {
	'mirna_basic_list' : fields.List(fields.Nested(miR_basic_fields))
}
class mirna_info_list(Resource):
	@marshal_with(miR_basic_list_fields)
	def get(self):
		parser = reqparse.RequestParser()
		parser.add_argument('mirna', type = str)
		args = parser.parse_args()
		condition = {}
		if args['mirna']:
			condition = { 'miRNA_id':args['mirna']}
		mirna_info = list(mongo.db.mir_annotation.find(condition))
		return  {"mirna_basic_list":mirna_info}

api.add_resource(mirna_info_list,'/api/mirna_list')

###miRNA_target
miR_target_fields = {
	'mirna': fields.String(attribute='miRNA_id'),
	'target_start':fields.Integer,
	'p_v':fields.String,
	'target_chr':fields.String,
	'target_symbol':fields.String,
	'target_end':fields.Integer
}

miR_target_list_fields = {
	'miR_target_list' : fields.List(fields.Nested(miR_target_fields))
}

class mirna_target_list(Resource):
	@marshal_with(miR_target_list_fields)
	def get(self):
		parser = reqparse.RequestParser()
		parser.add_argument('mirna', type = str)
		args = parser.parse.args()
		condition = {}
		if args['mirna']:
			condition = {'miRNA_id':args['mirna']}
		mirna_target = list(mongo.db.mir_target.find(condition))
		return {"mirna_target":mirna_target}

api.add_resource(mirna_target_list,"/api/mirna_target")

###miRNA_pathway
miR_pathway_fields = {
	'mirna':fields.String(attribute="miRNA_id"),
	'kegg':fields.String(attribute="kegg_id"),
	'is_gene':fields.String,
	'pvalue':fields.Float,
	'possibility':fields.Float,
	'kegg_dscp':fields.String
}

miR_pathway_list_fields = {
	'miR_pathway_list':fields.List(fields.Nested(miR_pathway_fields))
}

class miR_pathway_list(Resource):
	@marshal_with(miR_pathway_fields)
	def get(self):
		parser = reqparse.RequestParser()
		parser.add_argument('mirna', type = str)
                args = parser.parse.args()
                condition = {}
                if args['mirna']:
                        condition = {'miRNA_id':args['mirna']}
		mirna_pathway = list(mongo.db.mir_pathway.find(condition))
		return {"mirna_pathway":mirna_pathway }
	
api.add_resource(miR_pathway_list,"/api/mirna_target")
