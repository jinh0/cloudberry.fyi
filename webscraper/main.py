import requests
from bs4 import BeautifulSoup
import json
import re

course_list = []


def get_course(code: str):
    # defining dictionary for a course
    full_course = {
        key: []
        for key in [
            "code",
            "name",
            "description",
            "prerequisites",
            "extra",
            "department",
            "faculty",
            "terms",
            "credits",
        ]
    }

    # just incase
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "3600",
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0",
    }

    url = f"https://www.mcgill.ca/study/2022-2023/courses/{code}"
    req = requests.get(url, headers)
    doc = BeautifulSoup(req.content, "html.parser")

    label = doc.find(text="Overview").findNext("p").text

    # finding course code, course name, and credits
    code_title_credits = []
    course_code_name = doc.title.get_text()
    course_code_list = re.split("[|()]", course_code_name)
    new_credits = course_code_list[1].replace("credits", "")
    course_code = code
    code_title_credits.append(str(course_code))
    code_title_credits.append(str(course_code_list[0][9:]))
    code_title_credits.append(new_credits)
    code_title_credits = [word.strip() for word in code_title_credits]

    # float test function
    def isfloat(num):
        try:
            float(num)
            return True
        except ValueError:
            return False

    # finding extra info restrictions and others

    # if not doc.find(text='Prerequisites: ').findNext("p").text is None:
    #     extra = doc.find(text='Prerequisites: ').findNext("p").text

    # determine department and faculty
    info = str(label)
    spliced = info[:-1]
    spliced = spliced.split(":")
    spliced.remove(spliced[0])
    spliced = spliced[0].split("(")
    dep_faculty = [word.strip() for word in spliced]

    # determine the overview of a particular course
    terms_for_description = doc.find("p", "catalog-terms")
    description = terms_for_description.find_previous("p").get_text()
    description = description.lstrip()

    # determine extra info and restrictions
    try:
        extra = str(doc.find_all('ul', {'class': "catalog-notes"})[-1].get_text())
        extra = re.split("\n\n", extra)
        extra = [word.strip() for word in extra]
        extra = list(filter(None, extra))
    except:
        extra = []

    # determine instructors for each term
    instruct = str(doc.find("p", "catalog-instructors").get_text())
    instruct = re.split("[:;()]", instruct)
    instruct.remove(instruct[0])
    instruct = [word.strip() for word in instruct]
    instruct = list(filter(None, instruct))

    # determine terms from list of instructor
    terms = []
    if "Fall" in instruct:
        terms.append("Fall")
    if "Winter" in instruct:
        terms.append("Winter")

    # defining list of dictionaries for each term
    dict_list = []
    if "Fall" in instruct:
        dict = {"term": "fall", "instructors": []}
        dict_list.append(dict)
    if "Winter" in instruct:
        dict = {"term": "winter", "instructors": []}
        dict_list.append(dict)

    # Account for cases where a course is offered in 1,2,3 semesters (Summer is the third case)

    N = "Fall"
    W = "Winter"

    if "Fall" in terms and not "Winter" in terms:
        fall_instruct = instruct.index(N)
        fall_instruct = instruct[:fall_instruct]
        dict_list[0]["instructors"] = fall_instruct

    if "Winter" in terms and not "Fall" in terms:
        if not "Fall" in terms:
            dict_list[0]["instructors"] = instruct[:-1]
        else:
            wint_instruct = instruct.index(N)
            wint_instruct = instruct[:wint_instruct]
            dict_list[0]["instructors"] = wint_instruct

    if "Fall" in terms and "Winter" in terms:
        fall_instruct = instruct.index(N)
        fall_instruct = instruct[:fall_instruct]
        dict_list[0]["instructors"] = fall_instruct

        wint_instruct = instruct.index(W)
        wint_instruct = instruct[instruct.index(N) + 1 : wint_instruct]
        dict_list[1]["instructors"] = wint_instruct

    # adding data to final dictionary for a particular course
    full_course["code"] = code_title_credits[0]
    full_course["name"] = code_title_credits[1]

    if len(description) > 1:
        full_course["description"] = description

    full_course["prerequisites"]
    full_course["extra"] = extra
    if code_title_credits[2].isdigit() == True:
        full_course["credits"] = int(code_title_credits[2])
    elif isfloat(code_title_credits[2]) == True:
        full_course["credits"] = float(code_title_credits[2])
    else:
        full_course["credits"] = 0
    full_course["department"] = dep_faculty[0]
    full_course["faculty"] = dep_faculty[1]
    full_course["terms"] = dict_list
    # print(json.dumps(full_course, indent=2))

    # adding course dictionary to list of all courses
    course_list.append(full_course)


def get_all_courses():
    # open course crawler json file
    with open("output-coursetitles.json") as f:
        course_titles = json.load(f)
        for idx, code in enumerate(course_titles):
            try:
                get_course(code)
                # print(course_list)
                print(code)

                if idx % 1000 == 0:
                    print(f"Course {idx}: ", code)

                    with open("billion.json", "w") as outfile:
                        json.dump(course_list, outfile, indent=2)
            except Exception as e:
                print(e)

    with open("billion.json", "w") as outfile:
        json.dump(course_list, outfile, indent=2)


get_all_courses()
