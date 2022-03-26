import json
import threading
from flask import Blueprint, request, jsonify, make_response
from flask_cors import CORS, cross_origin
import requests

getData = Blueprint('getData', __name__)


CORS(getData)
cors = CORS(getData, resources={r"/getData": {"origins": "*"}})

url = 'https://app.socialinsider.io/api'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer API_KEY_TEST',
}


def get_profile_data(id, profile_type, my_list, start_time, end_time):

    data_get_profile_data = {
        "id" : 1,
        "method" : "socialinsider_api.get_profile_data",
        "params":{
            "id": id,
            "profile_type": profile_type,
            "date": {
                "start": start_time,
                "end": end_time,
                "timezone": "Europe/London"
            }
        }
    }

    # sending request
    response = requests.post(url, data = json.dumps(data_get_profile_data), headers = headers)

    # parsing data
    data = json.loads(response.content)
    resp = data["resp"][id]
    total_engagement = 0
    fans = 0

    # iterating through days
    # and collecting useful information
    for __, item in resp.items():
        try:
            total_engagement = total_engagement + int(item['engagement'])
        except Exception as ex:
            pass
        try:
            fans = int(item['fans'])
        except Exception as ex:
            pass
    my_list.append([total_engagement, fans])

@getData.route('/getData', methods = ["POST", "GET"])
def get_data_api():


    # getting data from post request 
    start_time = request.json['start']
    end_time = request.json['end']

    data_get_brands = {
        "jsonrpc": "2.0", 
        "id": 1,
        "method": "socialinsider_api.get_brands", 
        "params": {
            "projectname": "API_test"
        }
    }

    # send request
    response = requests.post(url, data = json.dumps(data_get_brands), headers = headers)

    # parsing data
    data = json.loads(response.content)
    brands_data = data['result']

    # construct a list with the following structure:
    # [['brand_name', [['id1', 'profile_type1'], ['id2', 'profile_type2'], ...], ...]
    brands = [
        [brand_data['brandname'], [[brand_profile['id'],brand_profile['profile_type']] 
            for brand_profile in brand_data['profiles']]]
                for brand_data in brands_data
    ]


    aux_dict = {}

    # making a list of threads so we can execute all requests in parallel 
    thread_list = []
    for brand in brands:
        profiles = brand[1]
        aux_dict[brand[0]] = [len(profiles)]
        for profile in profiles:
            thread_list.append(threading.Thread(target = get_profile_data, args=(profile[0], profile[1], aux_dict[brand[0]], start_time, end_time )))

    # starting all threads
    for thread in thread_list:
        thread.start()

    # wait until every request thread is completely executed
    for thread in thread_list:
        thread.join()


    # calculating the final data
    final_data = []
    for key, item in aux_dict.items():

        engagement = 0
        fans = 0
        for values in item[1:]:
            engagement = engagement + values[0]
            fans = fans + values[1]
        
        final_data.append({
            'brandName': key,
            'engagement': engagement,
            'fans': fans,
            'totalProfiles': item[0]
        })

    return make_response(jsonify(final_data))
