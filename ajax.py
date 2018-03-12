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
	'id':fields.String,
	'seq':fields.String,
	'start':fields.Integer,
	'end':fields.Integer,
	'acc':fields.String,
	'chr_n':fields.Integer,
	'fam':fields.String,
	'pre_id':fields.String,
	'pre_seq':fields.String,
	'pre_start':fields.Integer,
	'pre_end':fields.Integer,
	'pre_acc':fields.String,
	'pre_chr':fields.String,
	}
class miRNAAnnotationList(Resource):
	@marshal_with(miRNA_annotation_fields)
	def get(self):
		result = []
		miRNA_annotation = []
		tmpa = ''
		miRNA_annotation_list = list(mongo.db.mir_annotation.find())
		
		for l in miRNA_annotation_list:
			tmpa = l['miRNA_id'].strip()+'_'+l['miRNA_seq'].strip()+'_'+l['miRNA_start'].strip()+'_'+l['miRNA_end'].strip()+\
					'_'+l['miRNA_acc'].strip()+'_'+l['miRNA_chr'].strip()+'_'+l['miRNA_fam'].strip()+'_'+l['premiRNA_id'].strip()+\
					'_'+l['premiRNA_seq'].strip()+'_'+l['premiRNA_start'].strip()+'_'+l['premiRNA_end'].strip()+'_'+l['premiRNA_acc'].strip()+'_'+l['premiRNA_chr'].strip()
			miRNA_annotation.append(tmpa)
			tmpa = ''
		
		miRNA_annotation_set = set(miRNA_annotation)

		for l in miRNA_annotation_set:
			t = l.strip().split('_')
			if len(t) == 13:
				r = { 'id':t[0],'seq':t[1],'start':t[2],'end':t[3],'acc':t[4],'chr_n':t[5],'fam':t[6],'pre_id':t[7],'pre_seq':t[8],'pre_start':t[9],'pre_end':t[10],'pre_acc':t[11],'pre_chr':t[12] }
			result.append(r)

		return result

api.add_resource(miRNAAnnotationList,'/api/miRNA_annotation')
		
		
