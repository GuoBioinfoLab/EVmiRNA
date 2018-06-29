import flask_restful
import os

from flask_restful.reqparse import RequestParser

from EVmiRNA import app, api
from EVmiRNA.core import mongo

from flask_restful import Resource, fields, marshal_with, reqparse, marshal
import numpy as np

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

###mirnalist
class miRNAList(Resource):
    def get(self):
        result = []
        path = os.path.abspath('.')
        ultipath = path+"/EVmiRNA/static/EVmiRNA/js/mirnalist.txt"
        mirnalist = open(ultipath,"r")
        for line in mirnalist.readlines():
            line = line.strip()
            result.append(line)
        return result
api.add_resource(miRNAList,"/api/mirnalist");




### browse mvs miRNA

browse_mv_fields = {
    'type':fields.String,
    'Blood':fields.List(fields.String),
    'Breast':fields.List(fields.String),
    'Breast_adenocarcinoma':fields.List(fields.String),
    'Colon':fields.List(fields.String),
    'Fibroblasts':fields.List(fields.String),
    'Urine':fields.List(fields.String),
    'Mesenchymal_Stem_Cells':fields.List(fields.String),
    'Colon_carcinoma':fields.List(fields.String),
    'Prostate_cancer':fields.List(fields.String),
    'chronic_myelocytic_leukemia':fields.List(fields.String),
    'Pancreatic_cancer':fields.List(fields.String),
        }
class Browse_MVs(Resource):
    @marshal_with(browse_mv_fields)
    def get(self):
        result = []

        # ts = []
        Breast = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"MV","type1":"Source","type2":"Breast"}))
        Colon = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"MV","type1":"Source","type2":"Colon"}))
        Fibroblasts = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"MV","type1":"Source","type2":"Fibroblasts"}))
        Urine = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"MV","type1":"Source","type2":"Urine"}))
        Mesenchymal_Stem_Cells = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"MV","type1":"Source","type2":"Mesenchymal Stem Cells"}))
        Blood = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"MV","type1":"Source","type2":"Blood"}))
        Colon_carcinoma = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"MV","type1":"Cancer","type2":"Colon carcinoma"}))
        Breast_adenocarcinoma = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"MV","type1":"Cancer","type2":"Breast adenocarcinoma"}))
        chronic_myelocytic_leukemia = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"MV","type1":"Cancer","type2":"Chronic myelocytic leukemia"}))
        Pancreatic_cancer = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"MV","type1":"Cancer","type2":"Pancreatic cancer"}))
        Prostate_cancer = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"MV","type1":"Cancer","type2":"Prostate cancer"}))


        return {
        "type":'MVs',
        "Breast":Breast,
        "Colon":Colon,
        "Fibroblasts":Fibroblasts,
        "Urine":Urine,
        "Mesenchymal_Stem_Cells":Mesenchymal_Stem_Cells,
        "Blood":Blood,
        "Colon_carcinoma":Colon_carcinoma,
        "Breast_adenocarcinoma":Breast_adenocarcinoma,
        "chronic_myelocytic_leukemia":chronic_myelocytic_leukemia,
        "Prostate_cancer" : Prostate_cancer,
        "Pancreatic_cancer" : Pancreatic_cancer
        }
api.add_resource(Browse_MVs,'/api/browse_mv')


### browse exo and miRNA

browse_exo_fields = {
    'type':fields.String,
    'Lymph':fields.List(fields.String),
    'Tongue':fields.List(fields.String),
    'Blood':fields.List(fields.String),
    'Seminal_fluid':fields.List(fields.String),
    'Human_mast_cells':fields.List(fields.String),
    'Human_Mammary_Epithelial_Cells':fields.List(fields.String),
    'Kidney':fields.List(fields.String),
    'Breast':fields.List(fields.String),
    'CLL_cells':fields.List(fields.String),
    'CLL':fields.List(fields.String),
    'Human_epithelial_cells':fields.List(fields.String),
    'Colon':fields.List(fields.String),
    'Blymphoblastoid_cells':fields.List(fields.String),
    'Saliva':fields.List(fields.String),
    'Breast_milk':fields.List(fields.String),
    'Mesenchymal_Stem_Cells':fields.List(fields.String),
    'Breast_adenocarcinoma':fields.List(fields.String),
    'Lymphoma':fields.List(fields.String),
    'Leukemia':fields.List(fields.String),
    'Oral_cancer':fields.List(fields.String),
    'Prostate_Cancer':fields.List(fields.String),
    'Colon_carcinoma':fields.List(fields.String),
    'Squamous_cell_carcinoma':fields.List(fields.String),
        }
class Browse_EXOs(Resource):
    @marshal_with(browse_exo_fields)
    def get(self):
        result = []

        # ts = []
        Lymph = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Source","type2":"Lymph"}))
        Tongue = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Source","type2":"Tongue"}))
        Blood = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Source","type2":"Blood"}))
        Seminal_fluid = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Source","type2":"Seminal fluid"}))
        Human_mast_cells = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Source","type2":"Human mast cell"}))
        Human_Mammary_Epithelial_Cells = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Source","type2":"Human mammary epithelial"}))
        Kidney = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Source","type2":"Kidney"}))
        Breast = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Source","type2":"Breast"}))
        CLL_cells = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Source","type2":"Chronic lymphocytic leukemia cell"}))
        CLL = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Cancer","type2":"Chronic lymphocytic leukemia"}))
        Human_epithelial_cells = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Source","type2":"Human epithelial cells"}))
        Colon = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Source","type2":"Colon"}))
        Blymphoblastoid_cells = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Source","type2":"B-lymphoblastoid cell lines"}))
        Saliva = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Source","type2":"Saliva"}))
        Breast_milk = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Source","type2":"Breast milk"}))
        Mesenchymal_Stem_Cells = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Source","type2":"Mesenchymal Stem Cells"}))
        Breast_adenocarcinoma = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Cancer","type2":"Breast adenocarcinoma"}))
        Lymphoma = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Cancer","type2":"Lymphoma"}))
        Leukemia = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Cancer","type2":"Leukemia"}))
        Oral_cancer = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Cancer","type2":"Oral cancer"}))
        Prostate_Cancer = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Cancer","type2":"Prostate cancer"}))
        Colon_carcinoma = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Cancer","type2":"Squamous cell carcinoma"}))
        Squamous_cell_carcinoma = list(mongo.db.mir_biomarker_exo_mv.distinct("miRNA_id",{"EV_type":"EXO","type1":"Cancer","type2":"Squamous cell carcinoma"}))

        return {
            'type':'EXOs',
            'Lymph':Lymph,
            'Tongue':Tongue,
            'Blood':Blood,
            'Seminal_fluid':Seminal_fluid,
            'Human_mast_cells':Human_mast_cells,
            'Human_Mammary_Epithelial_Cells':Human_Mammary_Epithelial_Cells,
            'Kidney':Kidney,
            'Breast':Breast,
            'CLL_cells':CLL_cells,
            'CLL':CLL,
            'Human_epithelial_cells':Human_epithelial_cells,
            'Colon':Colon,
            'Blymphoblastoid_cells':Blymphoblastoid_cells,
            'Saliva':Saliva,
            'Breast_milk':Breast_milk,
            'Mesenchymal_Stem_Cells':Mesenchymal_Stem_Cells,
            'Breast_adenocarcinoma':Breast_adenocarcinoma,
            'Lymphoma':Lymphoma,
            'Leukemia':Leukemia,
            'Oral_cancer':Oral_cancer,
            'Prostate_Cancer':Prostate_Cancer,
            'Colon_carcinoma':Colon_carcinoma,
            'Squamous_cell_carcinoma':Squamous_cell_carcinoma,
        }

api.add_resource(Browse_EXOs,'/api/browse_exo')


### browse EVs miRNA

browse_fields = {
    'source':fields.List(fields.String),
    'cellline':fields.List(fields.String),
    'desease':fields.List(fields.String),
    'Breast_adenocarcinoma':fields.List(fields.String),
    'Chronic_lymphocytic_leukemia':fields.List(fields.String),
    'Chronic_myelocytic_leukemia':fields.List(fields.String),
    'Colon_carcinoma':fields.List(fields.String),
    'Lymphoma':fields.List(fields.String),
    'Mast_cell_leukemia':fields.List(fields.String),
    'Oral_cancer':fields.List(fields.String),
    'Pancreatic_Cancer':fields.List(fields.String),
    'Prostate_Cancer':fields.List(fields.String),
    'Squamous_cell_carcinoma':fields.List(fields.String),
    'Blood':fields.List(fields.String),
    'Breast':fields.List(fields.String),
    'Breast_milk':fields.List(fields.String),
    'CLL_cell_line':fields.List(fields.String),
    'Colon':fields.List(fields.String),
    'Fibroblasts':fields.List(fields.String),
    'Human_endothelial_cells':fields.List(fields.String),
    'Human_epithelial_cells':fields.List(fields.String),
    'Human_mast_cells':fields.List(fields.String),
    'Kidney':fields.List(fields.String),
    'Mesenchymal_Stem_Cells':fields.List(fields.String),
    'Saliva':fields.List(fields.String),
    'Seminal_fluid':fields.List(fields.String),
    'Tongue':fields.List(fields.String),
    'Urine':fields.List(fields.String),
        }
class Browse(Resource):
    @marshal_with(browse_fields)
    def get(self):
        result = []

        # samp = list(mongo.db.sample.find())
        source = list(mongo.db.sample.distinct("source"))
        source.sort()
        cell_line = list(mongo.db.sample.distinct("cell line"))
        cell_line.sort()
        disease = list(mongo.db.sample.distinct("desease"))
        disease.sort()
        disease.remove("Healthy Control")

        # ts = []
        Breast_adenocarcinoma = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Breast adenocarcinoma"}))
        Chronic_lymphocytic_leukemia = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Chronic lymphocytic leukemia"}))
        Chronic_myelocytic_leukemia = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Chronic myelocytic leukemia"}))
        Colon_carcinoma = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Colon carcinoma"}))
        Lymphoma = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Lymphoma"}))
        Mast_cell_leukemia = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Mast cell leukemia"}))
        Oral_cancer = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Oral cancer"}))
        Pancreatic_Cancer = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Pancreatic Cancer"}))
        Prostate_Cancer = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Prostate Cancer"}))
        Squamous_cell_carcinoma = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Squamous cell carcinoma"}))
        Blood = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Blood"}))
        Breast = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Breast"}))
        Breast_milk = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Breast milk"}))
        CLL_cell_line = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"CLL cell line"}))
        Colon = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Colon"}))
        Fibroblasts = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Fibroblasts"}))
        Human_endothelial_cells = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Human endothelial cells"}))
        Human_epithelial_cells = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Human epithelial cells"}))
        Human_mast_cells = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Human mast cells"}))
        Kidney = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Kidney"}))
        Mesenchymal_Stem_Cells = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Mesenchymal Stem Cells"}))
        Saliva = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Saliva"}))
        Seminal_fluid = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Seminal fluid"}))
        Tongue = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Tongue"}))
        Urine = list(mongo.db.mir_biomarker.distinct("miRNA_id",{"tissue_cancer":"Urine"}))

        return {'source':source,
        'cellline':cell_line,
        'desease':disease,
        'Breast_adenocarcinoma':Breast_adenocarcinoma,
        'Chronic_lymphocytic_leukemia':Chronic_lymphocytic_leukemia,
        'Chronic_myelocytic_leukemia':Chronic_myelocytic_leukemia,
        'Colon_carcinoma':Colon_carcinoma,
        'Lymphoma':Lymphoma,
        'Mast_cell_leukemia':Mast_cell_leukemia,
        'Oral_cancer':Oral_cancer,
        'Pancreatic_Cancer':Pancreatic_Cancer,
        'Prostate_Cancer':Prostate_Cancer,
        'Squamous_cell_carcinoma':Squamous_cell_carcinoma,
        'Blood':Blood,
        'Breast':Breast,
        'Breast_milk':Breast_milk,
        'CLL_cell_line':CLL_cell_line,
        'Colon':Colon,
        'Fibroblasts':Fibroblasts,
        'Human_endothelial_cells':Human_endothelial_cells,
        'Human_epithelial_cells':Human_epithelial_cells,
        'Human_mast_cells':Human_mast_cells,
        'Kidney':Kidney,
        'Mesenchymal_Stem_Cells':Mesenchymal_Stem_Cells,
        'Saliva':Saliva,
        'Seminal_fluid':Seminal_fluid,
        'Tongue':Tongue,
        'Urine':Urine,
        }

api.add_resource(Browse,'/api/browse')

###RNA_ratio
sample_RNA_ratio_fields = {
        "known_miRNA" : fields.String,
        "rRNA" : fields.String,
        "snRNA" : fields.String,
        "tRNA" : fields.String,
        "piRNA" : fields.String,
        "number" : fields.Integer,
        "Sample" : fields.String,
        "unann" : fields.String,
        "snoRNA" : fields.String,
}
sample_RNA_ratio_list_fields = {
        "sample_RNA_ratio_list":fields.List(fields.Nested(sample_RNA_ratio_fields)),
	    "records_num":fields.Integer
}
class RNAratio(Resource):
        @marshal_with(sample_RNA_ratio_list_fields)
        def get(self):
                parser = reqparse.RequestParser()
                parser.add_argument("page", type=int, default=1)
                parser.add_argument("per_page", type=int, default=15)
                args = parser.parse_args()
                page = args["page"]
                per_page = args["per_page"]
                record_skip = (page - 1) * per_page
                result = list(mongo.db.RNA_ratio.find().sort([("number",1)]).skip(record_skip).limit(per_page))
                records_number = mongo.db.RNA_ratio.find().count()
                return {"sample_RNA_ratio_list":result,"records_num":records_number}
api.add_resource(RNAratio,"/api/rnaratio")


###sample_run information
sample_run_fields = {
    "sample":fields.String,
    "Run":fields.String,
    "id":fields.String
}
sample_run_list_fields = {
    "sample_run_list":fields.List(fields.Nested(sample_run_fields))
}
class SampleRun(Resource):
    @marshal_with(sample_run_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("sample",type= str,default = "50")
        args = parser.parse_args()
        condition = {}
        if args["sample"]:
            condition["sample"] = args["sample"]
            result = list(mongo.db.sample_run.find(condition))
        return {"sample_run_list":result}
api.add_resource(SampleRun,"/api/samplerun")


### acquire the whole list of mirna
mirna_fields = {
    "mirna":fields.String(attribute="miRNA_id")
}
mirna_list_fields = {
    "mirna_list":fields.List(fields.Nested(mirna_fields)),
    "records_num":fields.Integer
}
class SearchmiRNA(Resource):
    @marshal_with(mirna_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int,default =1)
        parser.add_argument('per_page',type=int,default =20)
        args = parser.parse_args()
        page = args["page"]
        per_page = args["per_page"]
        record_skip = (page - 1) * per_page
        mirnaList = list(mongo.db.mir_annotation.find().skip(record_skip).limit(per_page))
        mirnatotal = mongo.db.mir_annotation.find().count()
        return {"mirna_list":mirnaList,"records_num":mirnatotal}

api.add_resource(SearchmiRNA,"/api/mirna_list")



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
    'first_base':fields.String,
    'two_to_eight':fields.String,
    'the_remaining':fields.String,
    }
miR_basic_list_fields = {
    'mirna_basic_list' : fields.List(fields.Nested(miR_basic_fields))
}


class mirna_info_list(Resource):
    @marshal_with(miR_basic_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mirna', type = str)
        parser.add_argument('family',type=str)
        args = parser.parse_args()
        condition = {}
        mirna_list = []
        if args['mirna']:
            condition = { 'miRNA_id':args['mirna']}
            mirna_list = list(mongo.db.mir_annotation.find(condition))
        if args['family']:
            condition = { 'miRNA_fam':args['family']}
            mirna_list = list(mongo.db.mir_annotation.find(condition))
        mirna_info=[]
        for item in mirna_list:
            sequence = list(item["miRNA_seq"])
            item['first_base'] = sequence[0]
            item['two_to_eight'] = ''.join(sequence[1:8])
            item['the_remaining'] =''.join(sequence[8:])
            mirna_info.append(item)
        return  {"mirna_basic_list":mirna_info}

api.add_resource(mirna_info_list,'/api/mirna_info')


### miRNA_annotation_list
mirnalist1 = ["hsa-miR-99b-5p","hsa-miR-99b-3p","hsa-miR-99a-5p","hsa-miR-99a-3p","hsa-miR-98-5p","hsa-miR-98-3p","hsa-miR-96-5p","hsa-miR-96-3p","hsa-miR-9-5p","hsa-miR-95-3p","hsa-miR-944","hsa-miR-943","hsa-miR-942-5p","hsa-miR-942-3p","hsa-miR-941","hsa-miR-940","hsa-miR-9-3p","hsa-miR-939-5p","hsa-miR-937-3p","hsa-miR-93-5p","hsa-miR-935","hsa-miR-934","hsa-miR-93-3p","hsa-miR-92b-5p","hsa-miR-92b-3p","hsa-miR-92a-3p","hsa-miR-92a-2-5p","hsa-miR-92a-1-5p","hsa-miR-892c-5p","hsa-miR-892c-3p","hsa-miR-892b","hsa-miR-892a","hsa-miR-891b","hsa-miR-891a-5p","hsa-miR-890","hsa-miR-889-3p","hsa-miR-888-5p","hsa-miR-887-5p","hsa-miR-887-3p","hsa-miR-885-5p","hsa-miR-885-3p","hsa-miR-877-5p","hsa-miR-877-3p","hsa-miR-876-5p","hsa-miR-876-3p","hsa-miR-874-5p","hsa-miR-874-3p","hsa-miR-873-5p","hsa-miR-873-3p","hsa-miR-8485","hsa-miR-8086","hsa-miR-8069","hsa-miR-7977","hsa-miR-7976","hsa-miR-7975","hsa-miR-7974","hsa-miR-7851-3p","hsa-miR-7850-5p","hsa-miR-7847-3p","hsa-miR-7846-3p","hsa-miR-7843-3p","hsa-miR-7706","hsa-miR-7705","hsa-miR-7704","hsa-miR-769-5p","hsa-miR-769-3p","hsa-miR-767-5p","hsa-miR-766-5p","hsa-miR-766-3p","hsa-miR-765","hsa-miR-7641","hsa-miR-762","hsa-miR-760","hsa-miR-7-5p","hsa-miR-758-5p","hsa-miR-758-3p","hsa-miR-744-5p","hsa-miR-744-3p","hsa-miR-718","hsa-miR-7-1-3p","hsa-miR-7111-3p","hsa-miR-7110-5p","hsa-miR-7110-3p","hsa-miR-7108-5p","hsa-miR-7108-3p","hsa-miR-7107-5p","hsa-miR-708-5p","hsa-miR-708-3p","hsa-miR-6883-5p","hsa-miR-6877-5p","hsa-miR-6875-5p","hsa-miR-6873-3p","hsa-miR-6870-5p","hsa-miR-6869-5p","hsa-miR-6867-5p","hsa-miR-6866-5p","hsa-miR-6859-5p","hsa-miR-6858-5p","hsa-miR-6858-3p","hsa-miR-6850-5p","hsa-miR-6847-5p","hsa-miR-6843-3p","hsa-miR-6842-3p","hsa-miR-6839-5p","hsa-miR-6839-3p","hsa-miR-6836-5p","hsa-miR-6826-5p","hsa-miR-6822-5p","hsa-miR-6821-5p","hsa-miR-6816-5p","hsa-miR-6807-3p","hsa-miR-6806-5p","hsa-miR-6806-3p","hsa-miR-6790-3p","hsa-miR-6789-5p","hsa-miR-6785-5p","hsa-miR-6777-5p","hsa-miR-6777-3p","hsa-miR-6773-5p","hsa-miR-6769b-5p","hsa-miR-6765-3p","hsa-miR-6764-5p","hsa-miR-676-3p","hsa-miR-6763-5p","hsa-miR-675-5p","hsa-miR-675-3p","hsa-miR-6753-5p","hsa-miR-6753-3p","hsa-miR-6752-3p","hsa-miR-6750-5p","hsa-miR-6750-3p","hsa-miR-6747-5p","hsa-miR-6746-5p","hsa-miR-6743-3p","hsa-miR-6740-5p","hsa-miR-6734-5p","hsa-miR-6729-5p","hsa-miR-6724-5p","hsa-miR-6723-5p","hsa-miR-6718-5p","hsa-miR-6716-3p","hsa-miR-671-5p","hsa-miR-671-3p","hsa-miR-668-3p","hsa-miR-665","hsa-miR-664b-5p","hsa-miR-664b-3p","hsa-miR-664a-5p","hsa-miR-664a-3p","hsa-miR-663b","hsa-miR-663a","hsa-miR-660-5p","hsa-miR-660-3p","hsa-miR-659-5p","hsa-miR-658","hsa-miR-656-5p","hsa-miR-656-3p","hsa-miR-655-3p","hsa-miR-654-5p","hsa-miR-654-3p","hsa-miR-652-5p","hsa-miR-652-3p","hsa-miR-6516-5p","hsa-miR-6516-3p","hsa-miR-651-5p","hsa-miR-6515-5p","hsa-miR-6513-3p","hsa-miR-6511b-5p","hsa-miR-6511b-3p","hsa-miR-6511a-5p","hsa-miR-6511a-3p","hsa-miR-6510-3p","hsa-miR-6509-5p","hsa-miR-6501-3p","hsa-miR-6500-3p","hsa-miR-646","hsa-miR-643","hsa-miR-642a-5p","hsa-miR-642a-3p","hsa-miR-641","hsa-miR-638","hsa-miR-636","hsa-miR-629-5p","hsa-miR-629-3p","hsa-miR-628-5p","hsa-miR-628-3p","hsa-miR-627-5p","hsa-miR-627-3p","hsa-miR-625-5p","hsa-miR-625-3p","hsa-miR-624-5p","hsa-miR-619-5p","hsa-miR-618","hsa-miR-616-5p","hsa-miR-615-5p","hsa-miR-615-3p","hsa-miR-6131","hsa-miR-6126","hsa-miR-6125","hsa-miR-6124","hsa-miR-6090","hsa-miR-6089","hsa-miR-6087","hsa-miR-6078","hsa-miR-6075","hsa-miR-6073","hsa-miR-607","hsa-miR-601","hsa-miR-598-3p","hsa-miR-597-3p","hsa-miR-595","hsa-miR-592","hsa-miR-590-5p","hsa-miR-590-3p","hsa-miR-589-5p","hsa-miR-589-3p","hsa-miR-585-3p","hsa-miR-584-5p","hsa-miR-582-5p","hsa-miR-582-3p","hsa-miR-579-3p","hsa-miR-577","hsa-miR-576-5p","hsa-miR-576-3p","hsa-miR-574-5p","hsa-miR-574-3p","hsa-miR-5701","hsa-miR-5699-5p","hsa-miR-5699-3p","hsa-miR-5684","hsa-miR-5680","hsa-miR-566","hsa-miR-564","hsa-miR-561-5p","hsa-miR-5588-5p","hsa-miR-5585-3p","hsa-miR-5581-3p","hsa-miR-558","hsa-miR-5571-5p","hsa-miR-557","hsa-miR-552-5p","hsa-miR-552-3p","hsa-miR-551b-5p","hsa-miR-551b-3p","hsa-miR-551a","hsa-miR-550a-5p","hsa-miR-550a-3p","hsa-miR-550a-3-5p","hsa-miR-549a","hsa-miR-548z","hsa-miR-548w","hsa-miR-548u","hsa-miR-548t-5p","hsa-miR-548s","hsa-miR-548q","hsa-miR-548p","hsa-miR-548o-5p","hsa-miR-548o-3p","hsa-miR-548n","hsa-miR-548l","hsa-miR-548k","hsa-miR-548j-5p","hsa-miR-548j-3p","hsa-miR-548i","hsa-miR-548h-5p","hsa-miR-548g-5p","hsa-miR-548f-3p","hsa-miR-548e-5p","hsa-miR-548e-3p","hsa-miR-548d-5p","hsa-miR-548c-5p","hsa-miR-548b-3p","hsa-miR-548az-5p","hsa-miR-548ay-5p","hsa-miR-548ar-5p","hsa-miR-548ar-3p","hsa-miR-548aq-3p","hsa-miR-548am-5p","hsa-miR-548ah-5p","hsa-miR-548ah-3p","hsa-miR-545-5p","hsa-miR-545-3p","hsa-miR-543","hsa-miR-542-3p","hsa-miR-541-5p","hsa-miR-541-3p","hsa-miR-539-5p","hsa-miR-539-3p","hsa-miR-532-5p","hsa-miR-532-3p","hsa-miR-526b-5p","hsa-miR-525-5p","hsa-miR-524-5p","hsa-miR-524-3p","hsa-miR-522-3p","hsa-miR-521","hsa-miR-520g-3p","hsa-miR-520f-3p","hsa-miR-520d-5p","hsa-miR-520d-3p","hsa-miR-520c-3p","hsa-miR-520a-5p","hsa-miR-520a-3p","hsa-miR-519d-5p","hsa-miR-519d-3p","hsa-miR-519c-3p","hsa-miR-519b-3p","hsa-miR-519a-5p","hsa-miR-519a-3p","hsa-miR-5196-5p","hsa-miR-5196-3p","hsa-miR-5195-3p","hsa-miR-518e-3p","hsa-miR-518c-3p","hsa-miR-518b","hsa-miR-518a-5p","hsa-miR-5187-5p","hsa-miR-517c-3p","hsa-miR-517b-3p","hsa-miR-516b-5p","hsa-miR-516a-5p","hsa-miR-515-5p","hsa-miR-515-3p","hsa-miR-514a-5p","hsa-miR-514a-3p","hsa-miR-513c-5p","hsa-miR-513a-5p","hsa-miR-512-3p","hsa-miR-511-5p","hsa-miR-511-3p","hsa-miR-510-5p","hsa-miR-510-3p","hsa-miR-5100","hsa-miR-5096","hsa-miR-509-5p","hsa-miR-5095","hsa-miR-5094","hsa-miR-509-3p","hsa-miR-509-3-5p","hsa-miR-5088-3p","hsa-miR-508-3p","hsa-miR-506-3p","hsa-miR-505-5p","hsa-miR-505-3p","hsa-miR-504-5p","hsa-miR-503-5p","hsa-miR-503-3p","hsa-miR-502-3p","hsa-miR-501-5p","hsa-miR-501-3p","hsa-miR-5010-5p","hsa-miR-5010-3p","hsa-miR-500b-3p","hsa-miR-500a-5p","hsa-miR-500a-3p","hsa-miR-5006-5p","hsa-miR-5004-3p","hsa-miR-5002-5p","hsa-miR-5001-3p","hsa-miR-499a-5p","hsa-miR-499a-3p","hsa-miR-498","hsa-miR-497-5p","hsa-miR-496","hsa-miR-495-3p","hsa-miR-494-3p","hsa-miR-493-5p","hsa-miR-493-3p","hsa-miR-491-5p","hsa-miR-491-3p","hsa-miR-490-5p","hsa-miR-490-3p","hsa-miR-488-3p","hsa-miR-487b-5p","hsa-miR-487b-3p","hsa-miR-487a-5p","hsa-miR-487a-3p","hsa-miR-486-5p","hsa-miR-486-3p","hsa-miR-485-5p","hsa-miR-485-3p","hsa-miR-484","hsa-miR-483-5p","hsa-miR-483-3p","hsa-miR-4804-5p","hsa-miR-4802-5p","hsa-miR-4802-3p","hsa-miR-4800-5p","hsa-miR-4800-3p","hsa-miR-4792","hsa-miR-4791","hsa-miR-4789-5p","hsa-miR-4787-5p","hsa-miR-4787-3p","hsa-miR-4785","hsa-miR-4784","hsa-miR-4775","hsa-miR-4767","hsa-miR-4755-3p","hsa-miR-4750-5p","hsa-miR-4746-5p","hsa-miR-4745-5p","hsa-miR-4741","hsa-miR-4740-3p","hsa-miR-4739","hsa-miR-4732-5p","hsa-miR-4732-3p","hsa-miR-4728-3p","hsa-miR-4725-3p","hsa-miR-4716-3p","hsa-miR-4709-5p","hsa-miR-4707-5p","hsa-miR-4707-3p","hsa-miR-4690-3p","hsa-miR-4684-3p","hsa-miR-4677-3p","hsa-miR-4674","hsa-miR-4669","hsa-miR-4667-5p","hsa-miR-4666a-3p","hsa-miR-4665-5p","hsa-miR-4664-5p","hsa-miR-4664-3p","hsa-miR-4662b","hsa-miR-4661-5p","hsa-miR-4659a-3p","hsa-miR-4658","hsa-miR-4654","hsa-miR-4653-3p","hsa-miR-4652-5p","hsa-miR-4651","hsa-miR-4647","hsa-miR-4645-3p","hsa-miR-4644","hsa-miR-455-5p","hsa-miR-455-3p","hsa-miR-454-5p","hsa-miR-454-3p","hsa-miR-4532","hsa-miR-4531","hsa-miR-4527","hsa-miR-452-5p","hsa-miR-452-3p","hsa-miR-4521","hsa-miR-451a","hsa-miR-4518","hsa-miR-4517","hsa-miR-4516","hsa-miR-4513","hsa-miR-4511","hsa-miR-4510","hsa-miR-450b-5p","hsa-miR-450a-5p","hsa-miR-450a-1-3p","hsa-miR-4508","hsa-miR-4507","hsa-miR-4504","hsa-miR-4500","hsa-miR-449c-5p","hsa-miR-449a","hsa-miR-4497","hsa-miR-4492","hsa-miR-4488","hsa-miR-4485-3p","hsa-miR-4482-3p","hsa-miR-4479","hsa-miR-4478","hsa-miR-4474-3p","hsa-miR-4473","hsa-miR-4472","hsa-miR-4470","hsa-miR-4467","hsa-miR-4466","hsa-miR-4463","hsa-miR-4461","hsa-miR-4459","hsa-miR-4454","hsa-miR-4451","hsa-miR-4449","hsa-miR-4448","hsa-miR-4446-3p","hsa-miR-4444","hsa-miR-4443","hsa-miR-4436b-5p","hsa-miR-4435","hsa-miR-4433b-5p","hsa-miR-4433b-3p","hsa-miR-4429","hsa-miR-4428","hsa-miR-4424","hsa-miR-4423-3p","hsa-miR-4421","hsa-miR-4419b","hsa-miR-4419a","hsa-miR-433-5p","hsa-miR-433-3p","hsa-miR-4330","hsa-miR-4326","hsa-miR-432-5p","hsa-miR-432-3p","hsa-miR-431-5p","hsa-miR-431-3p","hsa-miR-4313","hsa-miR-4306","hsa-miR-4305","hsa-miR-4301","hsa-miR-429","hsa-miR-4286","hsa-miR-4284","hsa-miR-4283","hsa-miR-4278","hsa-miR-4273","hsa-miR-4270","hsa-miR-4259","hsa-miR-4258","hsa-miR-425-5p","hsa-miR-4254","hsa-miR-425-3p","hsa-miR-424-5p","hsa-miR-424-3p","hsa-miR-423-5p","hsa-miR-423-3p","hsa-miR-422a","hsa-miR-421","hsa-miR-412-5p","hsa-miR-412-3p","hsa-miR-411-5p","hsa-miR-411-3p","hsa-miR-410-5p","hsa-miR-410-3p","hsa-miR-409-5p","hsa-miR-409-3p","hsa-miR-3976","hsa-miR-3960","hsa-miR-3944-3p","hsa-miR-3940-5p","hsa-miR-3940-3p","hsa-miR-3938","hsa-miR-3934-5p","hsa-miR-3929","hsa-miR-3928-3p","hsa-miR-3916","hsa-miR-3913-5p","hsa-miR-3912-3p","hsa-miR-3911","hsa-miR-3909","hsa-miR-3907","hsa-miR-384","hsa-miR-383-5p","hsa-miR-382-5p","hsa-miR-382-3p","hsa-miR-381-5p","hsa-miR-381-3p","hsa-miR-380-5p","hsa-miR-380-3p","hsa-miR-379-5p","hsa-miR-379-3p","hsa-miR-378h","hsa-miR-378g","hsa-miR-378f","hsa-miR-378e","hsa-miR-378d","hsa-miR-378c","hsa-miR-378b","hsa-miR-378a-5p","hsa-miR-378a-3p","hsa-miR-377-5p","hsa-miR-377-3p","hsa-miR-376c-5p","hsa-miR-376c-3p","hsa-miR-376b-5p","hsa-miR-376b-3p","hsa-miR-376a-5p","hsa-miR-376a-3p","hsa-miR-375","hsa-miR-374c-5p","hsa-miR-374b-5p","hsa-miR-374b-3p","hsa-miR-374a-5p","hsa-miR-374a-3p","hsa-miR-373-3p","hsa-miR-372-3p","hsa-miR-371a-5p","hsa-miR-371a-3p","hsa-miR-370-5p","hsa-miR-370-3p","hsa-miR-369-5p","hsa-miR-369-3p","hsa-miR-3691-5p","hsa-miR-3690","hsa-miR-3688-3p","hsa-miR-3687","hsa-miR-3681-5p","hsa-miR-3679-5p","hsa-miR-3678-5p","hsa-miR-3677-3p","hsa-miR-3675-5p","hsa-miR-3665","hsa-miR-3664-3p","hsa-miR-3663-3p","hsa-miR-3662","hsa-miR-3661","hsa-miR-3660","hsa-miR-365b-5p","hsa-miR-365b-3p","hsa-miR-365a-5p","hsa-miR-365a-3p","hsa-miR-3657","hsa-miR-3656","hsa-miR-3653-5p","hsa-miR-3653-3p","hsa-miR-3651","hsa-miR-3648","hsa-miR-363-5p","hsa-miR-363-3p","hsa-miR-362-5p","hsa-miR-362-3p","hsa-miR-3622a-5p","hsa-miR-3617-5p","hsa-miR-361-5p","hsa-miR-3615","hsa-miR-3614-5p","hsa-miR-361-3p","hsa-miR-3613-5p","hsa-miR-3609","hsa-miR-3607-3p","hsa-miR-3605-5p","hsa-miR-3605-3p","hsa-miR-3591-5p","hsa-miR-34c-5p","hsa-miR-34c-3p","hsa-miR-34b-5p","hsa-miR-34b-3p","hsa-miR-34a-5p","hsa-miR-34a-3p","hsa-miR-346","hsa-miR-345-5p","hsa-miR-345-3p","hsa-miR-342-5p","hsa-miR-342-3p","hsa-miR-340-5p","hsa-miR-340-3p","hsa-miR-33b-5p","hsa-miR-33b-3p","hsa-miR-33a-5p","hsa-miR-33a-3p","hsa-miR-339-5p","hsa-miR-339-3p","hsa-miR-338-5p","hsa-miR-338-3p","hsa-miR-337-5p","hsa-miR-337-3p","hsa-miR-335-5p","hsa-miR-335-3p","hsa-miR-331-5p","hsa-miR-331-3p","hsa-miR-330-5p","hsa-miR-330-3p","hsa-miR-329-5p","hsa-miR-329-3p","hsa-miR-328-5p","hsa-miR-328-3p","hsa-miR-326","hsa-miR-32-5p","hsa-miR-324-5p","hsa-miR-324-3p","hsa-miR-32-3p","hsa-miR-323b-3p","hsa-miR-323a-5p","hsa-miR-323a-3p","hsa-miR-320e","hsa-miR-320d","hsa-miR-320c","hsa-miR-320b","hsa-miR-320a","hsa-miR-3202","hsa-miR-3200-3p","hsa-miR-3199","hsa-miR-3196","hsa-miR-3195","hsa-miR-3194-5p","hsa-miR-3190-3p","hsa-miR-3188","hsa-miR-3187-3p","hsa-miR-3182","hsa-miR-3180-5p","hsa-miR-3180-3p","hsa-miR-3180","hsa-miR-3179","hsa-miR-3178","hsa-miR-3177-3p","hsa-miR-3176","hsa-miR-3175","hsa-miR-3174","hsa-miR-3173-3p","hsa-miR-3168","hsa-miR-3167","hsa-miR-3162-3p","hsa-miR-3160-3p","hsa-miR-31-5p","hsa-miR-3158-3p","hsa-miR-3156-3p","hsa-miR-3155a","hsa-miR-3154","hsa-miR-3152-5p","hsa-miR-3150b-3p","hsa-miR-3149","hsa-miR-3147","hsa-miR-3144-3p","hsa-miR-3143","hsa-miR-3142","hsa-miR-3141","hsa-miR-31-3p","hsa-miR-3138","hsa-miR-3136-5p","hsa-miR-3133","hsa-miR-3132","hsa-miR-3131","hsa-miR-3130-3p","hsa-miR-3129-5p","hsa-miR-3129-3p","hsa-miR-3127-5p","hsa-miR-3126-5p","hsa-miR-3125","hsa-miR-3123","hsa-miR-3122","hsa-miR-3121-3p","hsa-miR-3120-3p","hsa-miR-3117-3p","hsa-miR-3116","hsa-miR-30e-5p","hsa-miR-30e-3p","hsa-miR-30d-5p","hsa-miR-30d-3p","hsa-miR-30c-5p","hsa-miR-30c-2-3p","hsa-miR-30c-1-3p","hsa-miR-30b-5p","hsa-miR-30b-3p","hsa-miR-30a-5p","hsa-miR-30a-3p","hsa-miR-3074-5p","hsa-miR-3074-3p","hsa-miR-3065-5p","hsa-miR-3065-3p","hsa-miR-3064-5p","hsa-miR-302a-5p","hsa-miR-301b-3p","hsa-miR-301a-5p","hsa-miR-301a-3p","hsa-miR-29c-5p","hsa-miR-29c-3p","hsa-miR-29b-3p","hsa-miR-29b-2-5p","hsa-miR-29b-1-5p","hsa-miR-29a-5p","hsa-miR-29a-3p","hsa-miR-299-5p","hsa-miR-299-3p","hsa-miR-296-5p","hsa-miR-296-3p","hsa-miR-2861","hsa-miR-28-5p","hsa-miR-28-3p","hsa-miR-27b-5p","hsa-miR-27b-3p","hsa-miR-27a-5p","hsa-miR-27a-3p","hsa-miR-26b-5p","hsa-miR-26b-3p","hsa-miR-26a-5p","hsa-miR-26a-2-3p","hsa-miR-26a-1-3p","hsa-miR-2682-5p","hsa-miR-25-5p","hsa-miR-25-3p","hsa-miR-2467-5p","hsa-miR-24-3p","hsa-miR-24-2-5p","hsa-miR-24-1-5p","hsa-miR-23c","hsa-miR-23b-5p","hsa-miR-23b-3p","hsa-miR-23a-5p","hsa-miR-23a-3p","hsa-miR-2355-5p","hsa-miR-2355-3p","hsa-miR-2277-5p","hsa-miR-2277-3p","hsa-miR-2276-3p","hsa-miR-22-5p","hsa-miR-224-5p","hsa-miR-224-3p","hsa-miR-22-3p","hsa-miR-223-5p","hsa-miR-223-3p","hsa-miR-222-5p","hsa-miR-222-3p","hsa-miR-221-5p","hsa-miR-221-3p","hsa-miR-219b-5p","hsa-miR-219a-5p","hsa-miR-219a-2-3p","hsa-miR-219a-1-3p","hsa-miR-218-5p","hsa-miR-218-2-3p","hsa-miR-218-1-3p","hsa-miR-217","hsa-miR-216b-5p","hsa-miR-216b-3p","hsa-miR-216a-5p","hsa-miR-21-5p","hsa-miR-215-5p","hsa-miR-215-3p","hsa-miR-214-5p","hsa-miR-214-3p","hsa-miR-21-3p","hsa-miR-212-5p","hsa-miR-212-3p","hsa-miR-2116-3p","hsa-miR-211-5p","hsa-miR-2115-5p","hsa-miR-2115-3p","hsa-miR-2113","hsa-miR-2110","hsa-miR-210-5p","hsa-miR-210-3p","hsa-miR-20b-5p","hsa-miR-20b-3p","hsa-miR-20a-5p","hsa-miR-20a-3p","hsa-miR-208b-3p","hsa-miR-206","hsa-miR-205-5p","hsa-miR-205-3p","hsa-miR-204-5p","hsa-miR-204-3p","hsa-miR-203b-3p","hsa-miR-203a-5p","hsa-miR-203a-3p","hsa-miR-202-5p","hsa-miR-202-3p","hsa-miR-200c-5p","hsa-miR-200c-3p","hsa-miR-200b-5p","hsa-miR-200b-3p","hsa-miR-200a-5p","hsa-miR-200a-3p","hsa-miR-19b-3p","hsa-miR-19b-2-5p","hsa-miR-19b-1-5p","hsa-miR-19a-5p","hsa-miR-19a-3p","hsa-miR-199b-5p","hsa-miR-199b-3p","hsa-miR-199a-5p","hsa-miR-199a-3p","hsa-miR-197-5p","hsa-miR-197-3p","hsa-miR-1972","hsa-miR-196b-5p","hsa-miR-196a-5p","hsa-miR-196a-3p","hsa-miR-195-5p","hsa-miR-195-3p","hsa-miR-194-5p","hsa-miR-194-3p","hsa-miR-193b-5p","hsa-miR-193b-3p","hsa-miR-193a-5p","hsa-miR-193a-3p","hsa-miR-192-5p","hsa-miR-192-3p","hsa-miR-191-5p","hsa-miR-1915-3p","hsa-miR-191-3p","hsa-miR-1912","hsa-miR-1911-5p","hsa-miR-1911-3p","hsa-miR-1910-5p","hsa-miR-1910-3p","hsa-miR-190b","hsa-miR-190a-5p","hsa-miR-190a-3p","hsa-miR-1908-5p","hsa-miR-1908-3p","hsa-miR-18b-5p","hsa-miR-18a-5p","hsa-miR-18a-3p","hsa-miR-188-5p","hsa-miR-188-3p","hsa-miR-187-5p","hsa-miR-187-3p","hsa-miR-186-5p","hsa-miR-186-3p","hsa-miR-185-5p","hsa-miR-185-3p","hsa-miR-184","hsa-miR-183-5p","hsa-miR-183-3p","hsa-miR-1827","hsa-miR-182-5p","hsa-miR-182-3p","hsa-miR-181d-5p","hsa-miR-181d-3p","hsa-miR-181c-5p","hsa-miR-181c-3p","hsa-miR-181b-5p","hsa-miR-181b-3p","hsa-miR-181b-2-3p","hsa-miR-181a-5p","hsa-miR-181a-3p","hsa-miR-181a-2-3p","hsa-miR-17-5p","hsa-miR-17-3p","hsa-miR-16-5p","hsa-miR-16-2-3p","hsa-miR-16-1-3p","hsa-miR-15b-5p","hsa-miR-15b-3p","hsa-miR-15a-5p","hsa-miR-15a-3p","hsa-miR-155-5p","hsa-miR-155-3p","hsa-miR-154-5p","hsa-miR-154-3p","hsa-miR-1538","hsa-miR-153-3p","hsa-miR-152-5p","hsa-miR-152-3p","hsa-miR-151b","hsa-miR-151a-5p","hsa-miR-151a-3p","hsa-miR-150-5p","hsa-miR-150-3p","hsa-miR-149-5p","hsa-miR-149-3p","hsa-miR-148b-5p","hsa-miR-148b-3p","hsa-miR-148a-5p","hsa-miR-148a-3p","hsa-miR-147b","hsa-miR-146b-5p","hsa-miR-146b-3p","hsa-miR-146a-5p","hsa-miR-146a-3p","hsa-miR-1468-5p","hsa-miR-145-5p","hsa-miR-145-3p","hsa-miR-144-5p","hsa-miR-144-3p","hsa-miR-143-5p","hsa-miR-143-3p","hsa-miR-142-5p","hsa-miR-142-3p","hsa-miR-141-5p","hsa-miR-141-3p","hsa-miR-140-5p","hsa-miR-140-3p","hsa-miR-1-3p","hsa-miR-139-5p","hsa-miR-139-3p","hsa-miR-138-5p","hsa-miR-138-2-3p","hsa-miR-138-1-3p","hsa-miR-137","hsa-miR-136-5p","hsa-miR-136-3p","hsa-miR-135b-5p","hsa-miR-135b-3p","hsa-miR-135a-5p","hsa-miR-135a-3p","hsa-miR-134-5p","hsa-miR-1343-5p","hsa-miR-1343-3p","hsa-miR-133b","hsa-miR-133a-5p","hsa-miR-133a-3p","hsa-miR-132-5p","hsa-miR-132-3p","hsa-miR-1323","hsa-miR-130b-5p","hsa-miR-130b-3p","hsa-miR-130a-5p","hsa-miR-130a-3p","hsa-miR-1307-5p","hsa-miR-1307-3p","hsa-miR-1306-5p","hsa-miR-1306-3p","hsa-miR-1304-5p","hsa-miR-1304-3p","hsa-miR-1303","hsa-miR-1301-3p","hsa-miR-1299","hsa-miR-1298-5p","hsa-miR-1298-3p","hsa-miR-1296-5p","hsa-miR-1296-3p","hsa-miR-129-5p","hsa-miR-1295a","hsa-miR-1294","hsa-miR-1293","hsa-miR-1292-5p","hsa-miR-129-2-3p","hsa-miR-129-1-3p","hsa-miR-1291","hsa-miR-1290","hsa-miR-1289","hsa-miR-1287-5p","hsa-miR-1287-3p","hsa-miR-1286","hsa-miR-1285-5p","hsa-miR-1285-3p","hsa-miR-1284","hsa-miR-128-3p","hsa-miR-1283","hsa-miR-128-2-5p","hsa-miR-128-1-5p","hsa-miR-1278","hsa-miR-1277-5p","hsa-miR-1277-3p","hsa-miR-1276","hsa-miR-127-5p","hsa-miR-1275","hsa-miR-127-3p","hsa-miR-1273h-5p","hsa-miR-1273h-3p","hsa-miR-1273g-5p","hsa-miR-1273g-3p","hsa-miR-1273f","hsa-miR-1273e","hsa-miR-1273d","hsa-miR-1273c","hsa-miR-1273a","hsa-miR-1272","hsa-miR-1271-5p","hsa-miR-1271-3p","hsa-miR-1270","hsa-miR-1269b","hsa-miR-1268b","hsa-miR-1268a","hsa-miR-1266-5p","hsa-miR-126-5p","hsa-miR-1264","hsa-miR-126-3p","hsa-miR-1262","hsa-miR-1261","hsa-miR-1260b","hsa-miR-1260a","hsa-miR-125b-5p","hsa-miR-125b-2-3p","hsa-miR-125b-1-3p","hsa-miR-125a-5p","hsa-miR-125a-3p","hsa-miR-1255a","hsa-miR-1254","hsa-miR-1251-5p","hsa-miR-1248","hsa-miR-1247-5p","hsa-miR-1247-3p","hsa-miR-1246","hsa-miR-124-5p","hsa-miR-1244","hsa-miR-124-3p","hsa-miR-1243","hsa-miR-1237-5p","hsa-miR-1236-5p","hsa-miR-1228-5p","hsa-miR-1227-5p","hsa-miR-1226-5p","hsa-miR-1226-3p","hsa-miR-122-5p","hsa-miR-1224-5p","hsa-miR-1224-3p","hsa-miR-1197","hsa-miR-1185-5p","hsa-miR-1185-2-3p","hsa-miR-1185-1-3p","hsa-miR-1180-3p","hsa-miR-10b-5p","hsa-miR-10b-3p","hsa-miR-10a-5p","hsa-miR-10a-3p","hsa-miR-107","hsa-miR-106b-5p","hsa-miR-106b-3p","hsa-miR-106a-5p","hsa-miR-106a-3p","hsa-miR-105-5p","hsa-miR-105-3p","hsa-miR-103a-3p","hsa-miR-103a-2-5p","hsa-miR-101-5p","hsa-miR-101-3p","hsa-miR-100-5p","hsa-miR-100-3p","hsa-let-7i-5p","hsa-let-7i-3p","hsa-let-7g-5p","hsa-let-7g-3p","hsa-let-7f-5p","hsa-let-7f-2-3p","hsa-let-7f-1-3p","hsa-let-7e-5p","hsa-let-7e-3p","hsa-let-7d-5p","hsa-let-7d-3p","hsa-let-7c-5p","hsa-let-7c-3p","hsa-let-7b-5p","hsa-let-7b-3p","hsa-let-7a-5p","hsa-let-7a-3p"]

miR_basic_list_fields = {
    # 'pre_acc':fields.String(attribute='premiRNA_acc'),
    # 'pre_seq':fields.String(attribute='premiRNA_seq'),
    # 'accession':fields.String(attribute='miRNA_acc'),
    'accession':fields.String,
    # 'start':fields.Integer(attribute='miRNA_start'),
    'start':fields.Integer,
    # 'pre_chr':fields.String(attribute='premiRNA_chr'),
    # 'chromosome':fields.String(attribute='miRNA_chr'),
    'chromosome':fields.String,
    # 'sequence':fields.String(attribute='miRNA_seq'),
    # 'end':fields.String(attribute='miRNA_end'),
    'end':fields.String,
    # 'mirna':fields.String(attribute='miRNA_id'),
    'mirna':fields.String,
    # 'premirna':fields.String(attribute='premiRNA_id'),
    # 'family':fields.String(attribute='miRNA_fam'),
    # 'pre_end':fields.Integer(attribute='premiRNA_end'),
    # 'pre_start':fields.Integer(attribute='premiRNA_start'),
    'first_base':fields.String,
    'two_to_eight':fields.String,
    'the_remaining':fields.String,
    }
miR_basic_list_list_fields = {
    'mirna_basic_list_list' : fields.List(fields.Nested(miR_basic_list_fields))
}

class mirna_info_list_list(Resource):
    @marshal_with(miR_basic_list_list_fields)
    def get(self):
        mirna_list = list(mongo.db.mir_annotation.find())
        mirna_info=[]
        for item in mirna_list:
            item1 = {}
            if item["miRNA_id"] in mirnalist1:
                sequence = list(item["miRNA_seq"])
                item1['first_base'] = sequence[0]
                item1['two_to_eight'] = ''.join(sequence[1:8])
                item1['the_remaining'] =''.join(sequence[8:])
                item1['accession'] = item['miRNA_acc']
                item1['start'] = item['miRNA_start']
                item1['chromosome'] = item['miRNA_chr']
                item1['end'] = item['miRNA_end']
                item1['mirna'] = item['miRNA_id']
                # print item1
                mirna_info.append(item1)
        return  {"mirna_basic_list_list":mirna_info}
api.add_resource(mirna_info_list_list,'/api/mirna_info_list')

###miRNA_target
miR_target_fields = {
    'mirna': fields.String(attribute='miRNA_id'),
    'target_start':fields.String,
    'p_v':fields.String,
    'target_chr':fields.String,
    'target_symbol':fields.String,
    'target_end':fields.String,
}

miR_target_list_fields = {
    'mir_target_list' : fields.List(fields.Nested(miR_target_fields)),
    'records_num' : fields.Integer
}

class mirna_target_list(Resource):
    @marshal_with(miR_target_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mirna', type = str)
        parser.add_argument("page",type=int,default=1)
        parser.add_argument("per_page",type=int,default=8)
        args = parser.parse_args()
        page = args["page"]
        per_page = args["per_page"]
        record_skip = (page-1)*per_page
        mongo.db.mir_target.ensure_index("target_start")
        mongo.db.mir_target.ensure_index("target_end")
        mongo.db.mir_target.ensure_index("target_symbol")
        condition = {}
        mirna_target_list = []
        if args['mirna']:
            condition = {'miRNA_id':args['mirna']}
            mirna_target_list = mongo.db.mir_target.find(condition).sort([("target_chr",1),("target_start",1),("target_end",1)]).skip(record_skip).limit(per_page)
            records_number = mongo.db.mir_target.find(condition).count()
        result = []
        for item in mirna_target_list:
            result.append(item)
        return {"mir_target_list":result,"records_num":records_number}
api.add_resource(mirna_target_list,"/api/mirna_target")


###miRNA_for mirlist all
miR_list_target_fields = {
    'mirna': fields.String(attribute='miRNA_id'),
    'target_start':fields.String(attribute='target_start'),
    'p_v':fields.String(attribute='p_v'),
    'target_chr':fields.String(attribute='target_chr'),
    'target_symbol':fields.String(attribute='target_symbol'),
    'target_end':fields.String(attribute='target_end'),
    "id":fields.String(attribute='id'),
}
miR_list_target_list_fields = {
    'mir_list_target_list' : fields.List(fields.Nested(miR_target_fields)),
}
class mirna_list_target_list(Resource):
    @marshal_with(miR_list_target_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mirna', type = str)
        args = parser.parse_args()
        condition = {'miRNA_id':args['mirna']}
        mirna_target_list = list(mongo.db.mir_target.find(condition))
        return {"mir_list_target_list":mirna_target_list}
api.add_resource(mirna_list_target_list,"/api/mirna_list_target")


###miRNA_pathway
miR_pathway_fields = {
    'mirna':fields.String(attribute="miRNA_id"),
    'kegg':fields.String(attribute="kegg_id"),
    'gene':fields.List(fields.String),
    'pvalue':fields.Float,
    'possibility':fields.Float,
    'kegg_dscp':fields.String,
}

miR_pathway_list_fields = {
    'mir_pathway_list':fields.List(fields.Nested(miR_pathway_fields))
}

class mirna_pathway_list(Resource):
    @marshal_with(miR_pathway_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mirna', type = str)
        args = parser.parse_args()
        condition = {}
        result = []
        if args['mirna']:
            condition = {'miRNA_id':args['mirna']}
        mirna_pathway = list(mongo.db.mir_pathway.find(condition))
        for item in mirna_pathway:
            tempdict = {}
            tempdict["miRNA_id"] = item["miRNA_id"]
            tempdict["kegg_id"] = item["kegg_id"]
            tempdict["pvalue"] = '{:.2E}'.format(float(item["pvalue"]))
            tempdict["possibility"] = item["possibility"]
            tempdict["kegg_dscp"] = item["kegg_dscp"]
            templist = item["is_gene"].split(",")
            tempdict["gene"] = templist
            result.append(tempdict)
        return {"mir_pathway_list":result }

api.add_resource(mirna_pathway_list,"/api/mirna_pathway")

###mirna_pubmed
miR_pubmed_fields = {
	'mirna':fields.String(attribute='miRNA_id'),
	'title':fields.String,
	'journal':fields.String(attribute='jt'),
	'year':fields.String,
	'PMID':fields.String,
	'ab':fields.String
}

miR_pubmed_list_fields = {
	'mir_pubmed_list':fields.List(fields.Nested(miR_pubmed_fields))
}

class mirna_pubmed_list(Resource):
    @marshal_with(miR_pubmed_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mirna',type=str)
        args = parser.parse_args()
        result = []
        if args['mirna']:
            string = args['mirna'].replace('hsa-','')
            string = string.replace('-5p','')
            string = string.replace('-3p','')
            # string = string.replace('a','')
        mirna_pubmed = list(mongo.db.mir_pm.find({"miRNA_id":{'$regex':string,'$options':'i'}}))
        for item in mirna_pubmed:
            result.append(item)
        templist = string.split('-')
        mirna_ambiguous = templist[0]+"-"+templist[1]
        mirna_pubmed_add = list(mongo.db.mir_pm.find({"miRNA_id":{'$regex':mirna_ambiguous,'$options':'i'}}))
        for itema in mirna_pubmed_add:
            if  itema not in result:
                result.append(itema)
        return {"mir_pubmed_list":result}
api.add_resource(mirna_pubmed_list,"/api/mirna_pubmed")


###mirna_mv_expression_source
exp_mv_source_fields = {
	'mirna':fields.String(attribute="miRNA_id"),
	'Blood':fields.Float(attribute="Blood_MV"),
	'Breast':fields.Float(attribute="Breast_MV"),
	'Colon':fields.Float(attribute="Colon_MV"),
	'Fibroblasts':fields.Float(attribute="Fibroblasts_MV"),
	'Urine':fields.Float(attribute="Urine_MV"),
	'Mesenchymal_Stem_Cells':fields.Float(attribute="Mesenchymal Stem Cells_MV"),
}
exp_mv_source_list_fields ={
	"exp_mv_source_list":fields.List(fields.Nested(exp_mv_source_fields))
}
class exp_mv_source_list(Resource):
    @marshal_with(exp_mv_source_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mirna', type=str)
        args = parser.parse_args()
        condition = {}
        if args['mirna']:
            condition = {'miRNA_id': args['mirna']}
            exp_mv_source = list(mongo.db.exp_source_mv.find(condition))
            return {"exp_mv_source_list": exp_mv_source}
api.add_resource(exp_mv_source_list,"/api/exp_mv_source")


###mirna_mv_expression_cancer
exp_mv_cancer_fields = {
    "mirna":fields.String(attribute="miRNA_id"),
    "Prostate_Cancer":fields.Float(attribute="Prostate cancer_MV"),
    "chronic_myelocytic_leukemia":fields.Float(attribute="Chronic myelocytic leukemia_MV"),
    "Breast_adenocarcinoma":fields.Float(attribute="Breast adenocarcinoma_MV"),
    "Colon_carcinoma":fields.Float(attribute="Colon carcinoma_MV"),
    "Healthy_Control":fields.Float(attribute="Healthy control_MV"),
    "Pancreatic_Cancer":fields.Float(attribute="Pancreatic cancer_MV"),
}
exp_mv_cancer_list_fields = {
    "exp_mv_cancer_list":fields.List(fields.Nested(exp_mv_cancer_fields))
}
class exp_mv_cancer_list(Resource):
    @marshal_with(exp_mv_cancer_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mirna',type = str)
        args = parser.parse_args()
        condition = {}
        if args['mirna']:
            condition = {'miRNA_id':args['mirna']}
            exp_mv_cancer = list(mongo.db.exp_cancer_mv.find(condition))
            return {"exp_mv_cancer_list": exp_mv_cancer}
api.add_resource(exp_mv_cancer_list,"/api/exp_mv_cancer")

###mirna_exo_expression_source
exp_exo_source_fields = {
    'mirna':fields.String(attribute="miRNA_id"),
    'Lymph':fields.Float(attribute="Lymph_Exo"),
    'Tongue':fields.Float(attribute="Tongue_Exo"),
    'Blood':fields.Float(attribute="Blood_Exo"),
    'Seminal_fluid':fields.Float(attribute="Seminal fluid_Exo"),
    'Human_mast_cell':fields.Float(attribute="Human mast cell_Exo"),
    'Human_mammary_epithelial_cell':fields.Float(attribute="Human mammary epithelial cell_Exo"),
    'Kidney':fields.Float(attribute="Kidney_Exo"),
    'Breast':fields.Float(attribute="Breast_Exo"),
    'CLL_cell':fields.Float(attribute="Chronic lymphocytic leukemia cell_Exo"),
    'Human_epithelial_cell':fields.Float(attribute="Human epithelial cells_Exo"),
    'Colon':fields.Float(attribute="Colon_Exo"),
    'B_lymphoblastoid_cell':fields.Float(attribute="B-lymphoblastoid cell lines_Exo"),
    'Saliva':fields.Float(attribute="Saliva_Exo"),
    'Breast_milk':fields.Float(attribute="Breast milk_Exo"),
    'Mesenchymal_stem_cell':fields.Float(attribute="Mesenchymal Stem Cells_Exo"),
}
exp_exo_source_list_fields ={
    "exp_exo_source_list":fields.List(fields.Nested(exp_exo_source_fields))
}
class exp_exo_source_list(Resource):
    @marshal_with(exp_exo_source_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mirna',type=str)
        args = parser.parse_args()
        condition = {}
        if args['mirna']:
            condition = {'miRNA_id':args['mirna']}
        exp_exo_source = list(mongo.db.exp_source_exo.find(condition))
        return {"exp_exo_source_list":exp_exo_source }
api.add_resource(exp_exo_source_list,"/api/exp_exo_source")


###mirna_exo_expression_cancer
exp_exo_cancer_fields = {
    "mirna":fields.String(attribute="miRNA_id"),
    "Breast_adenocarcinoma":fields.Float(attribute="Breast adenocarcinoma_Exo"),
    "Lymphoma":fields.Float(attribute="Lymphoma_Exo"),
    "Leukemia":fields.Float(attribute="Leukemia_Exo"),
    "Oral_cancer":fields.Float(attribute="Oral cancer_Exo"),
    "Prostate_Cancer":fields.Float(attribute="Prostate cancer_Exo"),
    "Healthy_Control":fields.Float(attribute="Healthy control_Exo"),
    "Colon_carcinoma":fields.Float(attribute="Colon carcinoma_Exo"),
    "Chronic_lymphocytic_leukemia":fields.Float(attribute="Chronic lymphocytic leukemia_Exo"),
    "Squamous_cell_carcinoma":fields.Float(attribute="Squamous cell carcinoma_Exo"),
}
exp_exo_cancer_list_fields = {
    "exp_exo_cancer_list":fields.List(fields.Nested(exp_exo_cancer_fields))
}
class exp_exo_cancer_list(Resource):
    @marshal_with(exp_exo_cancer_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mirna',type = str)
        args = parser.parse_args()
        condition = {}
        if args['mirna']:
            condition = {'miRNA_id':args['mirna']}
        exp_mv_cancer = list(mongo.db.exp_cancer_exo.find(condition))
        return {"exp_exo_cancer_list":exp_mv_cancer }
api.add_resource(exp_exo_cancer_list,"/api/exp_exo_cancer")



### different mirnas' expression in the same source, browse source and browse cancer

sourceexp_fields = {
    "mirna":fields.String,
    "source":fields.String,
    "expression":fields.Float
}

source_sra_fields = {
    "sample":fields.String,
    "study":fields.String,
    "sra":fields.String,
    "source":fields.String,
    "cellline":fields.String,
    "cancer":fields.String,
}

sourceexp_list_fields = {
    "sourceexp_list":fields.List(fields.Nested(sourceexp_fields)),
    "source_sra_list":fields.List(fields.Nested(source_sra_fields)),
    "records_num":fields.Integer,
    "sralength":fields.Integer
}

class SourceExp(Resource):
    @marshal_with(sourceexp_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("source",type= str)
        parser.add_argument("type",type= str)
        parser.add_argument("sra",type= str)
        args = parser.parse_args()
        if args["type"] == "mv":
            result = list(mongo.db.exp_source_mv.find())
            result1 = []
            for i in result:
                result1.append({"mirna":i["miRNA_id"],"source":args["sra"],"expression":i[args['source']]})
            # up expression, down sra
            if args["sra"] == "Fibroblast":
                args_source = "Fibroblasts"
            elif args["sra"] == "Mesenchymal stem cell":
                args_source = "Mesenchymal Stem Cells"
            else:
                args_source = args["sra"]
            result_sra = list(mongo.db.sample.find({"mv_exo":"MV","source":args_source}))
            result_sra1 = []
            for i in result_sra:
                result_sra1.append(i["sample"])
            result_sra2 = list(mongo.db.sample_run.find({"sample":{"$in":result_sra1}}))
            result_sra3 = []
            for i in result_sra2:
                cancertype = ''
                cellline = ''
                for j in result_sra:
                    if i["sample"] == j["sample"]:
                        cancertype = j["cancer"]
                        cellline = j["cell line"]
                result_sra3.append({"sample":i['sample'],"source":args['sra'],"cellline":cellline, "cancer":cancertype,"study":i["study"],"sra":i["Run"]})
            sralen = len(result_sra3)
            return {"sourceexp_list":result1,"source_sra_list":result_sra3,"records_num":len(result1),"sralength":sralen}
        if args["type"] == "exo":
            result = list(mongo.db.exp_source_exo.find())
            result1 = []
            for i in result:
                result1.append({"mirna": i["miRNA_id"], "source": args["sra"], "expression": i[args["source"]]})
            #up expression, down sra run
            if args["sra"] == "B-lymphoblastoid cell":
                args_source = "B-lymphoblastoid cell lines"
            elif args["sra"] == "Chronic lymphocytic leukemia":
                args_source = "CLL cell line"
            elif args["sra"] == "Human epithelial cell":
                args_source = "Human epithelial cells"
            elif args["sra"] == "Human mammary epithelial cell":
                args_source = "Human mammary epithelial cell"
            elif args["sra"] == "Human mast cell":
                args_source = "Human mast cell"
            elif args["sra"] == "Mesenchymal stem cell":
                args_source = "Mesenchymal Stem Cells"
            else:
                args_source = args["sra"]
            result_sra = list(mongo.db.sample.find({"mv_exo":"Exo","source":args_source}))
            result_sra1 = []
            for i in result_sra:
                result_sra1.append(i["sample"])
            result_sra2 = list(mongo.db.sample_run.find({"sample":{"$in":result_sra1}}))
            result_sra3 = []
            for i in result_sra2:
                cancertype = ''
                cellline = ''
                for j in result_sra:
                    if i["sample"] == j["sample"]:
                        cancertype = j["cancer"]
                        cellline = j["cell line"]
                result_sra3.append({"sample":i['sample'],"source":args['sra'],"cellline":cellline, "cancer":cancertype,"study":i["study"],"sra":i["Run"]})
            sralen = len(result_sra3)
            return {"sourceexp_list":result1,"source_sra_list":result_sra3,"records_num":len(result1),"sralength":sralen}
api.add_resource(SourceExp,"/api/sourceexp")

# sraexp
sraexp_fields = {
    "mirna":fields.String,
    "expression":fields.Float
}

sraexp_list_fields = {
    "sraexp_list":fields.List(fields.Nested(sraexp_fields)),
    "sra":fields.String
}

class SraExp(Resource):
    @marshal_with(sraexp_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("sra",type=str)
        args = parser.parse_args()
        sra = args['sra']
        sample = list(mongo.db.sample_run.find({'Run':sra},{"sample":1}))
        sample = sample[0]['sample']
        sp = list(mongo.db.exp_all.find({},{sample:1, "miRNA_id":1}))
        spa = []
        for i in sp:
            spa.append({'mirna':i["miRNA_id"],'expression':i[sample]})
        return {"sraexp_list":spa,"sra":sra}
api.add_resource(SraExp,"/api/sraexp")

###exp_cancer_exo_mv
ecem_fields = {
    "mirna":fields.String(attribute="miRNA_id"),
    "Prostate_cancer_MV":fields.String(attribute="Prostate cancer_MV"),
    "Breast_adenocarcinoma_Exo":fields.String(attribute="Breast adenocarcinoma_Exo"),
    "Lymphoma_Exo":fields.String(attribute="Lymphoma_Exo"),
    "Oral_cancer_Exo":fields.String(attribute="Oral cancer_Exo"),
    "Healthy_control_MV":fields.String(attribute="Healthy control_MV"),
    "Pancreatic_cancer_MV":fields.String(attribute="Pancreatic cancer_MV"),
    "Chronic_lymphocytic_leukemia_Exo":fields.String(attribute="Chronic lymphocytic leukemia_Exo"),
    "Breast_adenocarcinoma_MV" : fields.String(attribute="Breast adenocarcinoma_MV"),
    "Prostate_cancer_Exo": fields.String(attribute="Prostate cancer_Exo"),
    "Colon_carcinoma_Exo" :fields.String(attribute="Colon carcinoma_Exo"),
    "Chronic_myelocytic_leukemia_MV":fields.String(attribute="Chronic myelocytic leukemia_MV"),
    "Leukemia_Exo":fields.String(attribute="Leukemia_Exo"),
    "Healthy_control_Exo": fields.String(attribute="Healthy control_Exo"),
    "Colon_carcinoma_MV":fields.String(attribute="Colon carcinoma_MV"),
    "Squamous_cell_carcinoma_Exo":fields.String(attribute="Squamous cell carcinoma_Exo")
}
ecem_list_fields = {
    "ecem_list":fields.List(fields.Nested(ecem_fields)),
    "records_num":fields.Integer
}
class Ecem(Resource):
    @marshal_with(ecem_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mirna",type=str)
        args = parser.parse_args()
        condition = {}
        result = []
        if args['mirna']:
            condition =  {"miRNA_id":args['mirna']}
            result = list(mongo.db.exp_cancer_exo_mv.find(condition))
        return {"ecem_list":result,"records_num":len(result)}
api.add_resource(Ecem,"/api/expEvCancer")


###exp source exo mv
esem_fields = {
    "Breast_MV":fields.String,
    "Kidney_Exo":fields.String,
    "Breast_Exo":fields.String,
    "B_lymphoblastoid_cell_lines_Exo":fields.String(attribute="B-lymphoblastoid cell lines_Exo"),
    "Tongue_Exo":fields.String,
    "Blood_Exo":fields.String,
    "Fibroblasts_MV":fields.String,
    "Colon_Exo":fields.String,
    "Breast_milk_Exo" :fields.String,
    "mirna":fields.String(attribute="miRNA_id"),
    "Lymph_Exo":fields.String,
    "Human_mast_cell_Exo":fields.String(attribute="Human mast cell_Exo"),
    "Human_mammary_epithelial_cell_Exo":fields.String(attribute="Human mammary epithelial cell_Exo"),
    "Saliva_Exo":fields.String,
    "Chronic_lymphocytic_leukemia_cell_Exo":fields.String(attribute="Chronic lymphocytic leukemia cell_Exo"),
    "Colon_MV":fields.String,
    "Seminal_fluid_Exo":fields.String(attribute="Seminal fluid_Exo"),
    "Mesenchymal_Stem_Cells_Exo":fields.String(attribute="Mesenchymal Stem Cells_Exo"),
    "Human_epithelial_cells_Exo":fields.String(attribute="Human epithelial cells_Exo"),
    "Mesenchymal_Stem_Cells_MV":fields.String(attribute="Mesenchymal Stem Cells_MV"),
    "Urine_MV":fields.String,
    "Blood_MV":fields.String
}

esem_list_fields = {
    "esem_list":fields.List(fields.Nested(esem_fields)),
    "records_num":fields.Integer
}
class Esem(Resource):
    @marshal_with(esem_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mirna",type=str)
        args = parser.parse_args()
        condition = {}
        result = []
        if args['mirna']:
            condition = {"miRNA_id":args['mirna']}
            result = list(mongo.db.exp_source_exo_mv.find(condition))
        return {"esem_list":result,"records_num":len(result)}
api.add_resource(Esem,"/api/expEvSource")

# browse cancer
cancerexp_fields = {
    "mirna":fields.String,
    "cancer":fields.String,
    "expression":fields.Float
}

cancer_sra_fields = {
    "study":fields.String,
    "sra":fields.String
}

cancerexp_list_fields = {
    "cancerexp_list":fields.List(fields.Nested(cancerexp_fields)),
    "cancer_sra_list":fields.List(fields.Nested(cancer_sra_fields)),
    "records_num":fields.Integer
}

class CancerExp(Resource):
    @marshal_with(cancerexp_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("cancer",type= str)
        parser.add_argument("type",type= str)
        parser.add_argument("sra",type= str)
        args = parser.parse_args()
        if args["type"] == "mv":
            result = list(mongo.db.exp_cancer_mv.find())
            result1 = []
            for i in result:
                result1.append({"mirna":i["miRNA_id"],"cancer":args["sra"],"expression":i[args["cancer"]]})
            # up exp, down sra
            args_cancer = args["sra"]
            result_sra = mongo.db.sample.find({"mv_exo":"MV","cancer":args_cancer})
            result_sra1 = []
            for i in result_sra:
                result_sra1.append(i["sample"])
            print result_sra1
            result_sra2 = list(mongo.db.sample_run.find({"sample":{"$in":result_sra1}}))
            result_sra3 = []
            for i in result_sra2:
                result_sra3.append({"study":i["study"],"sra":i["Run"]})
            return {"cancerexp_list":result1,"cancer_sra_list":result_sra3,"records_num":len(result1)}
        if args["type"] == "exo":
            result = list(mongo.db.exp_cancer_exo.find())
            result1 = []
            for i in result:
                result1.append({"mirna": i["miRNA_id"], "cancer": args["sra"], "expression": i[args["cancer"]]})
            args_cancer = args["sra"]
            result_sra = mongo.db.sample.find({"mv_exo": "Exo", "cancer": args_cancer})
            result_sra1 = []
            for i in result_sra:
                result_sra1.append(i["sample"])
            result_sra2 = list(mongo.db.sample_run.find({"sample": {"$in": result_sra1}}))
            result_sra3 = []
            for i in result_sra2:
                result_sra3.append({"study":i["study"],"sra":i["Run"]})
            return {"cancerexp_list": result1, "cancer_sra_list": result_sra3, "records_num": len(result1)}
api.add_resource(CancerExp,"/api/cancerexp")

###mirna_function
mir_function = {
	"miR_gene_id":fields.String,
	"pubmed_id":fields.String,
	"timestamps":fields.String,
	"mirna" : fields.String(attribute="miRNA_id"),
	"mir_function":fields.String
}
mir_function_list_fields = {
	"mir_function_list":fields.List(fields.Nested(mir_function)),
	# "records_num":fields.Integer
}
class miRNAfunction(Resource):
    @marshal_with(mir_function_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mirna",type=str)
        args = parser.parse_args()
        result = []

        if args["mirna"]:
            string = args["mirna"].replace('-3p','')
            string = string.replace('-5p','')
            result = list(mongo.db.mir_function.find({"miRNA_id":{'$regex':string,'$options':'i'}}))
        return {"mir_function_list":result}

api.add_resource(miRNAfunction,"/api/mirna_function")

###drug targeted mirna
mir_drug_fields = {
    "FDA" : fields.String,
	"Detection method " : fields.String,
	"Reference" : fields.String,
	"CID" : fields.String,
	"miRBase" : fields.String,
	"small melocule" : fields.String,
	"Support" : fields.String,
	"Detection method":fields.String,
	"DB" : fields.String,
	"mirna" : fields.String(attribute="miRNA"),
	"Year" : fields.String,
	"PMID" : fields.String,
	"Expression pattern of miRNA" : fields.String,
	"Species" : fields.String,
	"Condition" : fields.String
}
mir_drug_list_fields = {
	"mir_drug_list":fields.List(fields.Nested(mir_drug_fields)),
	"records_num":fields.Integer
}
class DrugTarget(Resource):
    @marshal_with(mir_drug_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mirna",type = str)
        args = parser.parse_args()
        result = []
        if args["mirna"]:
            query_mirna = args["mirna"][4:]
            result = list(mongo.db.mir_small_molecular_drug.find({"miRNA":query_mirna}))
        return {"mir_drug_list":result,"records_num":len(result)}
api.add_resource(DrugTarget,"/api/moleculardrug")

###tcge expression
tcga_expression_fields = {
	"KIRC_normal" : fields.String,
	"THYM_normal" : fields.String,
	"KIRC_case" : fields.String,
	"UVM_case" : fields.String,
	"THCA_normal" : fields.String,
	"ESCA_normal" : fields.String,
	"BLCA_normal" : fields.String,
	"SKCM_normal" : fields.String,
	"READ_case" : fields.String,
	"BRCA_normal" : fields.String,
	"LGG_normal" : fields.String,
	"KIRP_normal" : fields.String,
	"SKCM_case" : fields.String,
	"HNSC_normal" : fields.String,
	"ESCA_case" : fields.String,
	"THYM_case" : fields.String,
	"BRCA_case" : fields.String,
	"STAD_normal" : fields.String,
	"CHOL_case" : fields.String,
	"PRAD_normal" : fields.String,
	"LUAD_normal" : fields.String,
	"LIHC_case" : fields.String,
	"THCA_case" : fields.String,
	"UCS_case" : fields.String,
	"CHOL_normal" : fields.String,
	"ACC_case" : fields.String,
	"KICH_normal" : fields.String,
	"DLBC_normal" : fields.String,
	"CESC_normal" : fields.String,
	"UCEC_normal" : fields.String,
	"READ_normal" : fields.String,
	"COAD_normal" : fields.String,
	"GBM_case" : fields.String,
	"TGCT_case" : fields.String,
	"COAD_case" : fields.String,
	"OV_normal" : fields.String,
	"FPPP_normal" : fields.String,
	"CESC_case" : fields.String,
	"SARC_normal" : fields.String,
	"LIHC_normal" : fields.String,
	"LUAD_case" : fields.String,
	"OV_case" : fields.String,
	"TGCT_normal" : fields.String,
	"KICH_case" : fields.String,
	"HNSC_case" : fields.String,
	"LAML_case" : fields.String,
	"DLBC_case" : fields.String,
	"MESO_case" : fields.String,
	"PRAD_case" : fields.String,
	"BLCA_case" : fields.String,
	"LUSC_normal" : fields.String,
	"UCS_normal" : fields.String,
	"ACC_normal" : fields.String,
	"KIRP_case" : fields.String,
	"LGG_case" : fields.String,
	"UVM_normal" : fields.String,
	"PAAD_normal" : fields.String,
	"LAML_normal" : fields.String,
	"PCPG_normal" : fields.String,
	"LUSC_case" : fields.String,
	"FPPP_case" : fields.String,
	"MESO_normal" : fields.String,
	"STAD_case" : fields.String,
	"PAAD_case" : fields.String,
	"UCEC_case" : fields.String,
	"GBM_normal" : fields.String,
	"PCPG_case" : fields.String,
	"SARC_case" : fields.String,
	"mirna":fields.String(attribute="miRNA_id")
}
tcga_expression_list_fields = {
	"tcga_expression_list":fields.List(fields.Nested(tcga_expression_fields))
}
class TCGAexpression(Resource):
    @marshal_with(tcga_expression_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mirna",type=str)
        args = parser.parse_args()
        result = []
        if args["mirna"]:
            result = list(mongo.db.exp_tcga_mir.find({"miRNA_id":args["mirna"]}))
        return {"tcga_expression_list":result}
api.add_resource(TCGAexpression,"/api/tcgaexpression")

### search expression of different miRNAs in sample source
class RefineExpression(Resource):
    @marshal_with(esem_list_fields)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("source",type=str)
        parser.add_argument("logic",type=str)
        parser.add_argument("minexp",type=float,default=0)
        parser.add_argument("maxexp",type=float)
        args = parser.parse_args()
        exptable = list(mongo.db.exp_source_exo_mv.find())
        result = []
        if args["source"]:
            source = args["source"]
            s = source.split("*")
            if args["minexp"]:
                if args["maxexp"]:
                    for ii in exptable:
                        flaga = 1
                        for ss in s:
                            if float(ii[str(ss)]) < args["minexp"] or float(ii[str(ss)]) > args["maxexp"]:
                                if args["logic"] == "and":
                                    flaga = 0 
                                    break
                            else:
                                if args["logic"] == "and":
                                    pass
                                elif args["logic"] == "or":
                                    result.append(ii)
                                    break
                        if flaga == 1 and args["logic"] == "and":    
                            result.append(ii)
                else:
                    for ii in exptable:
                        flagb = 1
                        for ss in s:
                            if float(ii[str(ss)]) < args["minexp"]:
                                if args["logic"] == "and":    
                                    flagb = 0
                                    break
                            else:
                                if args["logic"] == "and":
                                    pass
                                elif args["logic"] == "or":
                                    result.append(ii)
                                    break
                        if flagb == 1 and args["logic"] == "and":
                                result.append(ii)
            else:
                if args["maxexp"]:
                    for ii in exptable:
                        flagc = 1
                        for ss in s:
                            if float(ii[str(ss)]) > args["maxexp"]:
                                if args["logic"] == "and":    
                                    flagc = 0
                                    break
                            else:
                                if args["logic"] == "and":
                                    pass
                                elif args["logic"] == "or":
                                    result.append(ii)
                                    break
                        if flagc == 1 and args["logic"] == "and":
                                result.append(ii)
                else:
                    result = exptable
                    
        return {"esem_list":result,"records_num":len(result)}
        
api.add_resource(RefineExpression,"/api/refinexp")