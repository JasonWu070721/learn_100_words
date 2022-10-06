import pandas as pd
import numpy as np
import re
import json


def words_to_array(detail):

    detail_split = detail[0].split('@')

    if len(detail_split) < 2:
        return

    translate_split = detail_split[1].split(')')

    if len(translate_split) < 2:
        return
    part_of_speech = re.sub("\(", "", translate_split[0])

    word_dist = {
        'en': detail_split[0], 'zh_tw': translate_split[1], 'part_of_speech': part_of_speech}

    return word_dist


def write_json_file(dist, file_name):

    json_object = json.dumps(dist, indent=4, ensure_ascii=False)

    with open(file_name, "w", encoding='utf-8') as outfile:
        outfile.write(json_object)


if __name__ == '__main__':

    xls_page_list = ['1級', '2級', '3級', '4級', '5級']
    level_list = ['level_1', 'level_2', 'level_3', 'level_4', 'level_5']

    xls = pd.ExcelFile('senior_7000.xls')

    for idx,  level in enumerate(xls_page_list):
        pd_data = pd.read_excel(xls, level)

        senior7_data = np.array(pd_data)

        level_arr = []

        for word_list in senior7_data:
            word_dist = words_to_array(word_list)

            level_arr.append(word_dist)

        json_file_name = level_list[idx] + '.json'
        write_json_file(level_arr, json_file_name)
        print(level_arr)
