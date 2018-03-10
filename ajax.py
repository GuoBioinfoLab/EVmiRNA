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

###
