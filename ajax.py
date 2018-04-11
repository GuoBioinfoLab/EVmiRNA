import flask_restful
import os

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

### acquire the whole list of mirna
mirna_fields = {
	"mirna":fields.String(attribute="miRNA_id")
}
mirna_list_fields = {
	"mirna_list":fields.List(fields.Nested(mirna_fields))
}
class SearchmiRNA(Resource):
	@marshal_with(mirna_list_fields)
	def get(self):
		result = []
		temp = {}
		mirnaList = list(mongo.db.mir_annotation.find())
		return {"mirna_list":mirnaList}

api.add_resource(SearchmiRNA,"/api/mirnalist")



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
		mirna_list = list(mongo.db.mir_annotation.find(condition))
		mirna_info=[]
		for item in mirna_list:
			sequence = list(item["miRNA_seq"])
			item['first_base'] = sequence[0]
			item['two_to_eight'] = ''.join(sequence[1:8])
			item['the_remaining'] =''.join(sequence[8:])
			mirna_info.append(item)
		return  {"mirna_basic_list":mirna_info}

api.add_resource(mirna_info_list,'/api/mirna_list')

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
	'mir_target_list' : fields.List(fields.Nested(miR_target_fields))
}

class mirna_target_list(Resource):
	@marshal_with(miR_target_list_fields)
	def get(self):
		parser = reqparse.RequestParser()
		parser.add_argument('mirna', type = str)
		args = parser.parse_args()
		mongo.db.mir_target.ensure_index("target_start")
		mongo.db.mir_target.ensure_index("target_end")
		mongo.db.mir_target.ensure_index("target_symbol")
		condition = {}
		if args['mirna']:
			condition = {'miRNA_id':args['mirna']}
		mirna_target = list(mongo.db.mir_target.find(condition))
		return {"mir_target_list":mirna_target}

api.add_resource(mirna_target_list,"/api/mirna_target")

###miRNA_pathway
miR_pathway_fields = {
	'mirna':fields.String(attribute="miRNA_id"),
	'kegg':fields.String(attribute="kegg_id"),
	'is_gene':fields.String,
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
                if args['mirna']:
                        condition = {'miRNA_id':args['mirna']}
		mirna_pathway = list(mongo.db.mir_pathway.find(condition))
		return {"mir_pathway_list":mirna_pathway }
	
api.add_resource(mirna_pathway_list,"/api/mirna_pathway")

###mirna_pubmed
miR_pubmed_fields = {
	'mirna':fields.String(attribute='miRNA_id'),
	'title':fields.String,
	'journal':fields.String(attribute='jt'),
	'year':fields.String,
	'PMID':fields.String,
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
		condition = {}
		if args['mirna']:
			string = args['mirna'].replace('hsa-miR','MiR')
			condition = { 'miRNA_id': string}
		mirna_pubmed = list(mongo.db.mir_pm.find(condition))
		return {"mir_pubmed_list":mirna_pubmed}
api.add_resource(mirna_pubmed_list,"/api/mirna_pubmed")


###mirna_expression_source
exp_source_fields = {
	'mirna':fields.String(attribute="miRNA_id"),
	'Fibroblasts':fields.Float,
	'Urine':fields.Float,
	'Human_epithelial_cells':fields.Float(attribute="Human epithelial cells"),
	'Saliva':fields.Float,
	'Seminal_fluid':fields.Float(attribute="Seminal fluid"),
	'Mesenchymal_Stem_Cells':fields.Float(attribute="Mesenchymal Stem Cells"),
	'CLL_cell_line':fields.Float(attribute="CLL cell line"),
	'Human_Mammary_Epithelial_Cells':fields.Float(attribute="Human Mammary Epithelial Cells"),
	'Blymphoblastoid_cell_lines':fields.Float(attribute="B-lymphoblastoid cell lines"),
	'Colon':fields.Float,
	'Breast':fields.Float,
	'Breast_milk':fields.Float(attribute="Breast milk"),
	'Human_mast_cells':fields.Float(attribute="Human mast cells"),
	'Tongue':fields.Float,
	'Lymph':fields.Float,
	'Kidney':fields.Float,
	'Blood':fields.Float
}
exp_source_list_fields ={
	"exp_source_list":fields.List(fields.Nested(exp_source_fields))
}
class exp_source_list(Resource):
	@marshal_with(exp_source_list_fields)
	def get(self):
		parser = reqparse.RequestParser()
		parser.add_argument('mirna',type = str)
		args = parser.parse_args()
		condition = {}
		if args['mirna']:
			condition = {'miRNA_id':args['mirna']}
		exp_source = list(mongo.db.exp_source.find(condition))
		return {"exp_source_list":exp_source }
		

api.add_resource(exp_source_list,"/api/exp_source")

###mirna_expression_cancer
exp_cancer_fields = {
	"mirna":fields.String(attribute="miRNA_id"),
	"Squamous_cell_carcinoma":fields.Float(attribute="Squamous cell carcinoma"),
	"Prostate_Cancer":fields.Float(attribute="Prostate Cancer"),
	"Mast_cell_leukemia":fields.Float(attribute="Mast cell leukemia"),
	"chronic_myelocytic_leukemia":fields.Float(attribute="chronic myelocytic leukemia"),
	"Breast_adenocarcinoma":fields.Float(attribute="Breast adenocarcinoma"),
	"Colon_carcinoma":fields.Float(attribute="Colon carcinoma"),
	"Chronic_lymphocytic_leukemia":fields.Float(attribute="Chronic lymphocytic leukemia"),
	"Oral_cancer":fields.Float(attribute="Oral cancer"),
	"Healthy_Control":fields.Float(attribute="Healthy Control"),
	"Pancreatic_Cancer":fields.Float(attribute="Pancreatic Cancer"),
	"Lymphoma":fields.Float
}
exp_cancer_list_fields = {
	"exp_cancer_list":fields.List(fields.Nested(exp_cancer_fields))
}
class exp_cancer_list(Resource):
	@marshal_with(exp_cancer_list_fields)
	def get(self):
                parser = reqparse.RequestParser()
                parser.add_argument('mirna',type = str)
                args = parser.parse_args()
                condition = {}
                if args['mirna']:
                        condition = {'miRNA_id':args['mirna']}
                exp_cancer = list(mongo.db.exp_cancer.find(condition))
                return {"exp_cancer_list":exp_cancer }

api.add_resource(exp_cancer_list,"/api/exp_cancer")

###mirna expression cell line
exp_cellline_fields = {
	"mirna":fields.String(attribute="miRNA_id"),
	"SCC9":fields.Float(attribute="SCC-9"),
	"MDAMB231":fields.Float(attribute="MDA-MB-231"),
	"Bjab":fields.Float,
	"MCF7":fields.Float,
	"LIM1863":fields.Float,
	"MCF10A":fields.Float,
	"Blymphoblastoid_cell_lines":fields.Float(attribute="B-lymphoblastoid cell lines"),
	"TY1":fields.Float,
	"K562":fields.Float,
	"BJAB":fields.Float,
	"Adipose_Mesenchymal_Stem_Cells":fields.Float(attribute="Adipose Mesenchymal Stem Cells"),
	"Umbilical_cord_Mesenchymal_Stem_Cells":fields.Float(attribute="Umbilical cord Mesenchymal Stem Cells"),
	"Fetus_Mesenchymal_Stem_Cells":fields.Float(attribute= "Fetus Mesenchymal Stem Cells"),
	"Blood":fields.Float,
	"HMC1":fields.Float(attribute="HMC-1"),
	"Saliva":fields.Float,
	"Fibroblasts":fields.Float,
	"Seminal_fluid":fields.Float(attribute="Seminal fluid"),
	"Adult_Mesenchymal_Stem_Cells":fields.Float(attribute="Adult Mesenchymal Stem Cells"),
	"DLD1":fields.Float(attribute="DLD-1"),
	"DKO1":fields.Float(attribute="DKO-1"),
	"DKs8":fields.Float(attribute="DKs-8"),
	"HEK293T":fields.Float,
	"HMEC":fields.Float,
	"Urine":fields.Float(attribute="Urine"),
	"CLL_cell_line":fields.Float(attribute="CLL cell line"),
	"Cal27":fields.Float(attribute="Cal-27"),
	"BCBL1":fields.Float(attribute="BCBL-1"),
	"Breast_milk":fields.Float(attribute="Cal-27"),
	"LCL":fields.Float,
	"Mutu1":fields.Float(attribute="Mutu-1")
}
exp_cellline_list_fields = {
	"exp_cellline_list":fields.List(fields.Nested(exp_cellline_fields))
}
class exp_cellline_list(Resource):
	@marshal_with(exp_cellline_list_fields)
	def get(self):
		parser = reqparse.RequestParser()
                parser.add_argument('mirna',type = str)
                args = parser.parse_args()
                condition = {}
                if args['mirna']:
                        condition = {'miRNA_id':args['mirna']}
                	exp_cellline = list(mongo.db.exp_cellline.find(condition))
                return {"exp_cellline_list":exp_cellline }

api.add_resource(exp_cellline_list,'/api/exp_cellline')

###mirna expression of source and mv
exp_source_mv_fields = {
	"mirna":fields.String(attribute="miRNA_id"),
	"Breast_MV":fields.Float,
	"Human_Mammary_Epithelial_Cells_Exo":fields.Float(attribute="Human Mammary Epithelial Cells_Exo"),
	"Kidney_Exo":fields.Float,
	"Breast_Exo":fields.Float,
	"Blymphoblastoid_cell_lines_Exo":fields.Float(attribute="B-lymphoblastoid cell lines_Exo"),
	"Tongue_Exo":fields.Float,
	"Blood_Exo":fields.Float,
	"Fibroblasts_MV":fields.Float,
	"Human_mast_cells_Exo":fields.Float(attribute="Human mast cells_Exo"),
	"Colon_Exo":fields.Float,
	"Breast_milk_Exo":fields.Float,
	"Lymph_Exo":fields.Float,
	"CLL_cell_line_Exo":fields.Float(attribute="CLL cell line_Exo"),
	"Saliva_Exo":fields.Float,
	"Colon_MV":fields.Float,
	"Seminal_fluid_Exo":fields.Float(attribute="Seminal fluid_Exo"),
	"Mesenchymal_Stem_Cells_Exo":fields.Float(attribute="Mesenchymal Stem Cells_Exo"),
	"Human_epithelial_cells_Exo":fields.Float(attribute="Human epithelial cells_Exo"),
	"Mesenchymal_Stem_Cells_MV":fields.Float(attribute="Mesenchymal Stem Cells_MV"),
	"Urine_MV":fields.Float,
	"Blood_MV":fields.Float
}
exp_source_mv_list_fields = {
	"exp_source_mv_list":fields.List(fields.Nested(exp_source_mv_fields))
}

class exp_source_mv_list(Resource):
	@marshal_with(exp_source_mv_list_fields)
	def get(self):
		parser = reqparse.RequestParser()
                parser.add_argument('mirna',type = str)
                args = parser.parse_args()
                condition = {}
                if args['mirna']:
                        condition = {'miRNA_id':args['mirna']}
                	exp_source_mv = list(mongo.db.exp_source_exp_mv.find(condition))
                return {"exp_source_mv_list":exp_source_mv }

api.add_resource(exp_source_mv_list,'/api/exp_source_mv')

###mirna expression in different sources
source_all_fields = {
	"source":fields.String,
	"mirna":fields.String(attribute="miRNA_id"),
	"min":fields.Float,
	"Q1":fields.Float,
	"Q2":fields.Float,
	"Q3":fields.Float,
	"max":fields.Float,
	"outliner":fields.List(fields.Float)
}
source_all_list_fields = {
	"source_all_list":fields.List(fields.Nested(source_all_fields))
}
class SourceAll(Resource):
	@marshal_with(source_all_list_fields)
	def get(self):
		parser = reqparse.RequestParser()
		parser.add_argument("mirna",type=str)
		args = parser.parse_args()
		sourcelist = ["Fibroblasts","Urine","Human epithelial cells","Saliva","Seminal fluid","Mesenchymal Stem Cells","CLL cell line","Human Mammary Epithelial Cells","B-lymphoblastoid cell lines","Colon","Breast","Breast milk","Human mast cells","Tongue","Lymph","Kidney","Blood"]
		sourceSamlist = []
		result = []
		for l in sourcelist:
			templist = []
			templist.append(l)
			temp = list(mongo.db.sample.aggregate([{"$match":{"source":l}}]))
			for ll in temp:
				templist.append(ll["sample"])
			sourceSamlist.append(templist)
		if args["mirna"]:
			miExp = mongo.db.exp_all.find_one({"miRNA_id":args["mirna"]})
		for lll in sourceSamlist:
			tempdict = {}
			tempdict["miRNA_id"] = args["mirna"]
			tempdict["source"] = lll[0]
			templista = []
			for d in lll[1:]:
				number = miExp[d]
				templista.append(float(number))
			listmedian = np.percentile(templista,50,axis = 0)
			outliner = []
			inliner = []
			if listmedian == 0:
				tempdict["outliner"] = templista
				tempdict["min"] = 0.0
				tempdict["Q1"] = 0.0
				tempdict["Q2"] = 0.0
				tempdict["Q3"] = 0.0
				tempdict["max"] = 0.0
			else:
				for dd in templista:
					if (abs(dd-listmedian)/100.0) > 0.15 :
						outliner.append(dd)
					else:
						inliner.append(dd)
				if inliner == []:
					tempdict["outliner"] = outliner
                                	tempdict["min"] = 0.0
                                	tempdict["Q1"] = 0.0
                                	tempdict["Q2"] = 0.0
                                	tempdict["Q3"] = 0.0
                                	tempdict["max"] = 0.0
				else:
					tempdict["outliner"] = outliner
					tempdict["min"] = np.percentile(inliner,0,axis = 0)
					tempdict["Q1"] = np.percentile(inliner,25,axis = 0)
					tempdict["Q2"] = np.percentile(inliner,50,axis = 0)
					tempdict["Q3"] = np.percentile(inliner,75,axis = 0)
					tempdict["max"] = np.percentile(inliner,100,axis = 0)
			result.append(tempdict)
		return {"source_all_list":result}

api.add_resource(SourceAll,"/api/sourceall")

###mirna expression in different cell lines
cellLine_all_fields = {
	"cell line":fields.String(attribute="cell_line"),
	"mirna":fields.String(attribute="miRNA_id"),
	"min":fields.Float,
	"Q1":fields.Float,
	"Q2":fields.Float,
	"Q3":fields.Float,
	"max":fields.Float,
	"outliner":fields.List(fields.Float)
}
cellLine_all_list_fields = {
	"cellLine_all_list":fields.List(fields.Nested(cellLine_all_fields))
}
class CellLineExp(Resource):
	@marshal_with(cellLine_all_list_fields)
	def get(self):
		parser = reqparse.RequestParser()
		parser.add_argument("mirna",type = str)
		args = parser.parse_args()
		cellLineList = ["SCC-9", "MDA-MB-231","Bjab","MCF7","LIM1863","MCF10A","B-lymphoblastoid cell lines","TY-1","K562","BJAB","Adipose Mesenchymal Stem Cells","Umbilical cord Mesenchymal Stem Cells","Fetus Mesenchymal Stem Cells","Blood","HMC-1","Saliva","Fibroblasts","Seminal fluid","Adult Mesenchymal Stem Cells","DLD-1","DKO-1","DKs-8","HEK293T","HMEC","Urine","CLL cell line","Cal-27","BCBL-1","Breast milk","LCL","Mutu-1"]
		cellLineSamList = []
		result = []
		for l in cellLineList:
			templist = []
			templist.append(l)
			temp = list(mongo.db.sample.aggregate([{"$match":{"cell line":l}}]))
			for ll in temp:
				templist.append(ll["sample"])
			cellLineSamList.append(templist)
		if args["mirna"]:
			miExp = mongo.db.exp_all.find_one({"miRNA_id":args["mirna"]})
		for lll in cellLineSamList:
			tempdict = {}
			tempdict["miRNA_id"] = args["mirna"]
			tempdict["cell_line"] = lll[0]
			templista = []
			for d in lll[1:]:
				number = miExp[d]
				templista.append(float(number))
			listmedian = np.percentile(templista,50,axis = 0)
			outliner = []
			inliner = []
			if listmedian == 0 :
				tempdict["outliner"] = templista
                                tempdict["min"] = 0.0
                                tempdict["Q1"] = 0.0
                                tempdict["Q2"] = 0.0
                                tempdict["Q3"] = 0.0
                                tempdict["max"] = 0.0
			else:
				for dd in templista:
					if (abs(dd-listmedian)/100.0) >0.15:
						outliner.append(dd)
					else:
						inliner.append(dd)
				if inliner == []:
					tempdict["outliner"] = outliner
                                        tempdict["min"] = 0.0
                                        tempdict["Q1"] = 0.0
                                        tempdict["Q2"] = 0.0
                                        tempdict["Q3"] = 0.0
                                        tempdict["max"] = 0.0
				else:
					tempdict["outliner"] = outliner
                                        tempdict["min"] = np.percentile(inliner,0,axis = 0)
                                        tempdict["Q1"] = np.percentile(inliner,25,axis = 0)
                                        tempdict["Q2"] = np.percentile(inliner,50,axis = 0)
                                        tempdict["Q3"] = np.percentile(inliner,75,axis = 0)
                                        tempdict["max"] = np.percentile(inliner,100,axis = 0)
			result.append(tempdict)
		return {"cellLine_all_list":result}

api.add_resource(CellLineExp,"/api/cell_line_exp")

###minra expression in different deseases
desease_all_fields = {
	"desease":fields.String,
	"mirna":fields.String(attribute="miRNA_id"),
	"Q1":fields.Float,
	"min":fields.Float,
	"Q2":fields.Float,
	"Q3":fields.Float,
	"max":fields.Float,
	"outliner":fields.List(fields.Float)
}
desease_all_list_fields = {
	"desease_all_list":fields.List(fields.Nested(desease_all_fields))
}
class DeseaseExp(Resource):
	@marshal_with(desease_all_list_fields)
	def get(self):
		parser = reqparse.RequestParser()
		parser.add_argument("mirna",type = str)
		args = parser.parse_args()
		deseaseList = ["Squamous cell carcinoma","Prostate Cancer","Mast cell leukemia","chronic myelocytic leukemia","Breast adenocarcinoma","Colon carcinoma","Chronic lymphocytic leukemia","Oral cancer","Healthy Control","Pancreatic Cancer", "Lymphoma"]
		deseaseSamList = []
		result = []
		for l in deseaseList:
			templist = []
			templist.append(l)
			temp = list(mongo.db.sample.aggregate([{"$match":{"desease":l}}]))
			for ll in temp:
				templist.append(ll["sample"])
			deseaseSamList.append(templist)
		if args["mirna"]:
			miExp = mongo.db.exp_all.find_one({"miRNA_id":args["mirna"]})
		for lll in deseaseSamList:
			tempdict = {}
			tempdict["miRNA_id"] = args["mirna"]
			tempdict["desease"] = lll[0]
			templista = []
			for d in lll[1:]:
				number = miExp[d]
				templista.append(float(number))
			listmedian = np.percentile(templista,50,axis = 0)
			outliner = []
			inliner = []
			if listmedian == 0:
				tempdict["outliner"] = templista
                                tempdict["min"] = 0.0
                                tempdict["Q1"] = 0.0
                                tempdict["Q2"] = 0.0
                                tempdict["Q3"] = 0.0
                                tempdict["max"] = 0.0
			else:
				for dd in templista:
                                        if (abs(dd-listmedian)/100.0) > 0.15 :
                                                outliner.append(dd)
                                        else:
                                                inliner.append(dd)
                                if inliner == []:
                                        tempdict["outliner"] = outliner
                                        tempdict["min"] = 0.0
                                        tempdict["Q1"] = 0.0
                                        tempdict["Q2"] = 0.0
                                        tempdict["Q3"] = 0.0
                                        tempdict["max"] = 0.0
                                else:
                                        tempdict["outliner"] = outliner
                                        tempdict["min"] = np.percentile(inliner,0,axis = 0)
                                        tempdict["Q1"] = np.percentile(inliner,25,axis = 0)
                                        tempdict["Q2"] = np.percentile(inliner,50,axis = 0)
                                        tempdict["Q3"] = np.percentile(inliner,75,axis = 0)
                                        tempdict["max"] = np.percentile(inliner,100,axis = 0)
			result.append(tempdict)
		return {"desease_all_list":result}

api.add_resource(DeseaseExp,"/api/deseaseexp")

### mirna expression in source_mv
sourcemv_all_fields = {
	"sourcemv":fields.String,
	"mirna":fields.String(attribute="miRNA_id"),
	"min":fields.Float,
	"Q1":fields.Float,
	"Q2":fields.Float,
	"Q3":fields.Float,
	"max":fields.Float,
	"outliner":fields.List(fields.Float)
}
sourcemv_all_list_fields = {
	"sourcemv_all_list":fields.List(fields.Nested(sourcemv_all_fields))
}
class SourcemvExp(Resource):
	@marshal_with(sourcemv_all_list_fields)
	def get(self):
		parser = reqparse.RequestParser()
		parser.add_argument("mirna",type = str)
		args = parser.parse_args()
		sourcemvList = ["Breast_MV","Human Mammary Epithelial Cells_Exo","Kidney_Exo","Breast_Exo","B-lymphoblastoid cell lines_Exo","Tongue_Exo","Blood_Exo","Fibroblasts_MV","Human mast cells_Exo","Colon_Exo","Breast milk_Exo","Lymph_Exo","CLL cell line_Exo","Saliva_Exo","Colon_MV","Seminal fluid_Exo","Mesenchymal Stem Cells_Exo","Human epithelial cells_Exo","Mesenchymal Stem Cells_MV","Urine_MV","Blood_MV"]
		sourcemvSamList = []
		result = []
		for l in sourcemvList:
			templist = []
			templist.append(l)
			temprlist = l.split("_")
			temp = list(mongo.db.sample.aggregate([{"$match":{"source":temprlist[0],"mv_exo":temprlist[1]}}]))
			for ll in temp:
				templist.append(ll["sample"])
			sourcemvSamList.append(templist)
		if args["mirna"]:
			miExp = mongo.db.exp_all.find_one({"miRNA_id":args["mirna"]})
		for lll in sourcemvSamList:
			tempdict = {}
			tempdict["miRNA_id"] = args["mirna"]
			tempdict["sourcemv"] = lll[0]
			templista = []
			for d in lll[1:]:
				number = miExp[d]
				templista.append(float(number))
			listmedian = np.percentile(templista,50,axis = 0)
			outliner = []
			inliner = []
			if listmedian == 0:
                                tempdict["outliner"] = templista
                                tempdict["min"] = 0.0
                                tempdict["Q1"] = 0.0
                                tempdict["Q2"] = 0.0
                                tempdict["Q3"] = 0.0
                                tempdict["max"] = 0.0
                        else:
                                for dd in templista:
                                        if (abs(dd-listmedian)/100.0) > 0.15 :
                                                outliner.append(dd)
                                        else:
                                                inliner.append(dd)
                                if inliner == []:
                                        tempdict["outliner"] = outliner
                                        tempdict["min"] = 0.0
                                        tempdict["Q1"] = 0.0
                                        tempdict["Q2"] = 0.0
                                        tempdict["Q3"] = 0.0
                                        tempdict["max"] = 0.0
                                else:
                                        tempdict["outliner"] = outliner
                                        tempdict["min"] = np.percentile(inliner,0,axis = 0)
                                        tempdict["Q1"] = np.percentile(inliner,25,axis = 0)
                                        tempdict["Q2"] = np.percentile(inliner,50,axis = 0)
                                        tempdict["Q3"] = np.percentile(inliner,75,axis = 0)
                                        tempdict["max"] = np.percentile(inliner,100,axis = 0)
			result.append(tempdict)
		return {"sourcemv_all_list":result}

api.add_resource(SourcemvExp,"/api/sourcemvexp")
