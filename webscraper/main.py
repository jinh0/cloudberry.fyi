import requests
from bs4 import BeautifulSoup
import json
import re


def get_course(code: str, year: int):
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

    url = f"https://www.mcgill.ca/study/{year}-{year + 1}/courses/{code}"
    req = requests.get(url, headers)
    doc = BeautifulSoup(req.content, "html.parser")

    # Offered by:
    label = doc.find(class_="meta").findChild("p").text

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
    # float test function
    def isfloat(num):
        try:
            float(num)
            return True
        except ValueError:
            return False

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
        extra = str(doc.find_all("ul", {"class": "catalog-notes"})[-1].get_text())
        extra = re.split("\n\n", extra)
        extra = [word.strip() for word in extra]
        extra = list(filter(None, extra))
    except IndexError:
        extra = []

    # determine instructors for each term
    instruct = str(doc.find("p", "catalog-instructors").get_text())
    instruct = re.split("[:;()]", instruct)
    instruct.remove(instruct[0])
    instruct = [word.strip() for word in instruct]
    instruct = list(filter(None, instruct))

    # find terms:
    term_types = str(doc.find("p", "catalog-terms").get_text())
    term_types = term_types.split(" ")
    term_types = list(filter(None, term_types))

    # determine terms from list of instructor
    terms = []
    dict_list = []
    if "Fall" in term_types:
        terms.append("fall")
        dict = {"term": "fall", "instructors": []}
        dict_list.append(dict)
    if "Winter" in term_types:
        terms.append("winter")
        dict = {"term": "winter", "instructors": []}
        dict_list.append(dict)
    if "Summer" in term_types:
        terms.append("summer")
        dict = {"term": "summer", "instructors": []}
        dict_list.append(dict)

    # terms = ['fall', 'winter', 'summer']

    # terms_dict = { fall: [], winter: [], summer: [] }
    terms_dict = {}
    for term in terms:
        terms_dict[term] = []

    curr_instructors = []
    for token in instruct:
        if token not in ["Fall", "Winter", "Summer"]:
            curr_instructors.append(token)
        else:
            terms_dict[token.lower()] = curr_instructors
            curr_instructors = []

    # convert terms_dict into our preferred list format
    dict_list = [{"term": term, "instructors": terms_dict[term]} for term in terms_dict]

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
    return full_course


def get_all_courses(year: int):
    course_list = []

    # open course crawler json file
    with open(f"{year}/course-titles.json") as f:
        course_titles = json.load(f)

        for idx, code in enumerate(course_titles):
            # try:
            course_list.append(get_course(code, year))

            print(code)

            if idx % 1000 == 0:
                print(f"Course {idx}: ", code)

                with open(f"{year}/course-data.json", "w") as outfile:
                    json.dump(course_list, outfile, indent=2)
            # except Exception as e:
            #     with open(f"{year}/errors-courses.txt", "a+") as outfile:
            #         outfile.write(f"{code},{str(e)}\n")

            #     print("error", e)

    with open(f"{year}/course-data.json", "w") as outfile:
        json.dump(course_list, outfile, indent=2)


course = input("Course code (or 'all'): ")
year = int(input("Year: "))

if course == 'all':
    get_all_courses(year)
else:
    print(json.dumps(get_course(course, year), indent=2))