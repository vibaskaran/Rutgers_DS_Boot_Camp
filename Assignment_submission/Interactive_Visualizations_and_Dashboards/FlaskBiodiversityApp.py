import json
import datetime as dt
import numpy as np
import pandas as pd
import pymongo
import pprint


from flask import Flask, render_template, jsonify, redirect
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# sqlite connection
#################################################

engine = create_engine("sqlite:///belly_button_biodiversity.sqlite", echo=False)
Base = automap_base()
Base.prepare(engine, reflect=True)
Base.classes.keys()
OTU = Base.classes.otu
Samples = Base.classes.samples
SamplesMetadata = Base.classes.samples_metadata
session = Session(engine)


#################################################
# Flask Routes
#################################################

#################################################
# Flask Routes
#################################################

# #Default Route#
# @app.route("/")
# def welcome():
#     conn = "mongodb://test:test@ds243335.mlab.com:43335/heroku_smxwwn9d"
#     client = pymongo.MongoClient(conn)

#     db = client.heroku_smxwwn9d
#     mars_collection = db.mars_collection

#     for record in db.mars_collection.find().sort('time', 1):
#         last_record = record

#     title_list, url_list = [], []

#     for k,v in last_record.items():
#         if(k == '_id'):
#             pass
#         else:
#             if(k == 'df_mars'):
#                 mars_facts = pd.read_json(v).to_html()
#             if(k == 'hemisphere_image_urls'):
#                 for x in v:
#                     title_list.append(x['title'])
#                     url_list.append(x['img_url'])

#     return render_template("index.html", results=last_record, results2=mars_facts, results3=title_list, results4=url_list)

# #Route for Scraping latest data#
# @app.route("/scrape")
# def scrape1():
#     conn = "mongodb://test:test@ds243335.mlab.com:43335/heroku_smxwwn9d"
#     client = pymongo.MongoClient(conn)

#     db = client.heroku_smxwwn9d
#     mars_collection = db.mars_collection

#     res1 = md.scrape()
#     mars_collection.insert_one(res1)

#     return redirect("http://localhost:5000/", code=302)


@app.route("/")
def default():

    # sample_list_v = json.dumps(redirect("http://localhost:5000/names", code=302))
    sample_list_v = names()
    print(sample_list_v)

    # sample_metadata_v = metadata("BB_941")
    # print(sample_metadata_v)
    return render_template("index.html")
    # return render_template("index.html", sample_list=sample_list_v)
    # return render_template("index.html", sample_list=sample_list_v, sample_mt = sample_metadata_v)


@app.route("/names", methods=['POST','GET'])
def names():

    samples_cols_list = Base.classes.samples.__table__.columns.keys()
    sample_list = samples_cols_list[1:]
    return jsonify(samples_cols_list[1:])
    # return render_template("index.html", sample_list = samples_cols_list[1:])
    # return json.dumps(sample_list)
    # return sample_list

@app.route("/otu", methods=['POST','GET'])
def otu():

    otu_desc = session.query(OTU.lowest_taxonomic_unit_found).all()
    otu_descriptions = [i[0] for i in otu_desc]
    return jsonify(otu_descriptions)


@app.route('/metadata/<sample>', methods=['POST','GET'])
def metadata(sample):

    results = session.query(SamplesMetadata).filter(SamplesMetadata.SAMPLEID == sample[3:]).all()
    dict1 = {}
    for k,v in results[0].__dict__.items():
        if ('AGE' in k or 'BBTYPE' in k or 'ETHNICITY' in k or 'GENDER' in k or 'LOCATION' in k or 'SAMPLEID' in k):
            dict1[k] = v

    return jsonify(dict1)
    # return dict1
    # tbl1 = pd.DataFrame(dict1, index=[0])
    # tbl1 = pd.DataFrame.from_dict(dict1, orient='index')
    # return tbl1.to_html()
    # return render_template("index.html", sample_mt = dict1)

    # sample_list_v = names()
    # print(sample_list_v)
    # return render_template("index.html", sample_list = sample_list_v, sample_mt = dict1)
    

@app.route('/wfreq/<sample>', methods=['POST','GET'])
def wfreq(sample):

    results = session.query(SamplesMetadata.WFREQ).filter(SamplesMetadata.SAMPLEID == sample[3:]).all()
    
    return jsonify(results[0][0])

@app.route('/samples/<sample>', methods=['POST','GET'])
def samples(sample):

    # results = session.query(Samples.otu_id,getattr(Samples, sample)).order_by(getattr(Samples, sample).desc()).limit(10).all()
    results = session.query(Samples.otu_id,getattr(Samples, sample)).order_by(getattr(Samples, sample).desc()).all()
    results
    dict1, dict2 = {}, {}
    list1, list2, list3 = [], [], []
    for x in results:
        if(x[1] > 0):
            list1.append(x[0])
            list2.append(x[1])
    dict1['otu_id'] = list1
    dict1['sample_values'] = list2
    list3.append(dict1)
    list3

    return jsonify(list3)
    # return list3

    # sample_list_v = names()
    # print(sample_list_v)
    # dict1 = metadata(sample)
    # print(dict1)

    # return render_template("index.html", sample_list = sample_list_v, sample_mt = dict1, sample_d1 = list3)

@app.route("/index.js")
def welcome1():
    return render_template("index.js")

@app.route("/data.js")
def welcome2():
    return render_template("data.js")

@app.route("/metadata/index.js")
def md_welcome1():
    return render_template("index.js")

@app.route("/metadata/data.js")
def md_welcome2():
    return render_template("data.js")



if __name__ == '__main__':
    app.run(debug=True)
