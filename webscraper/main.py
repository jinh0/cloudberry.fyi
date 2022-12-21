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

    # determine who course is offered by:
    def offered_by(doc):
        label = doc.find(class_="meta").findChild("p").text
        return label

    # finding course code, course name, and credits
    def course_code_credits(doc):
        code_title_credits = []
        course_code_name = doc.title.get_text()
        course_code_list = re.split("[|()]", course_code_name)
        new_credits = course_code_list[1].replace("credits", "")
        course_code = code
        code_title_credits.append(str(course_code))
        code_title_credits.append(str(course_code_list[0][9:]))
        code_title_credits.append(new_credits)
        code_title_credits = [word.strip() for word in code_title_credits]
        return code_title_credits

    # float test function
    def isfloat(num):
        try:
            float(num)
            return True
        except ValueError:
            return False

    # determine department and faculty
    def department(doc):  
        info = str(offered_by(doc))
        info = info[:-1]
        info = info.split(":")
        info.remove(info[0])
        info = info[0].split("(")
        dep_faculty = [word.strip() for word in info]
        return dep_faculty

    # determine the overview of a particular course
    def overview(doc):
        terms_for_description = doc.find("p", "catalog-terms")
        description = terms_for_description.find_previous("p").get_text()
        description = description.lstrip()
        return description


    # determine extra info and restrictions
    def extra_info(doc):        
        try:
            extra = str(doc.find_all("ul", {"class": "catalog-notes"})[-1].get_text())
            extra = re.split("\n\n", extra)
            extra = [word.strip() for word in extra]
            extra = list(filter(None, extra))
        except IndexError:
            extra = []
        return extra
    # determine instructors for each term
    def find_instructors(doc):    
        instruct = str(doc.find("p", "catalog-instructors").get_text())
        instruct = re.split("[:;()]", instruct)
        instruct.remove(instruct[0])
        instruct = [word.strip() for word in instruct]
        instruct = list(filter(None, instruct))
        return instruct

    # find terms:
    def find_terms(doc):
        term_type_offered = str(doc.find("p", "catalog-terms").get_text())
        term_type_offered = term_type_offered.split(" ")
        term_type_offered = list(filter(None, term_type_offered))
        return term_type_offered

    # determine terms from list of instructor
    def finding_terms(doc):
        terms = []
        dict_list = []
        if "Fall" in find_terms(doc):
            terms.append("fall")
            dict = {"term": "fall", "instructors": []}
            dict_list.append(dict)
        if "Winter" in find_terms(doc):
            terms.append("winter")
            dict = {"term": "winter", "instructors": []}
            dict_list.append(dict)
        if "Summer" in find_terms(doc):
            terms.append("summer")
            dict = {"term": "summer", "instructors": []}
            dict_list.append(dict)
        return dict_list, terms
    # terms = ['fall', 'winter', 'summer']

    # terms_dict = { fall: [], winter: [], summer: [] }
    def terms_dictionary(doc):
        terms_dict = {}
        for term in finding_terms(doc)[1]: 
            terms_dict[term] = []

        curr_instructors = []
        for token in find_instructors(doc):
            if token not in ["Fall", "Winter", "Summer"]:
                curr_instructors.append(token)
            else:
                terms_dict[token.lower()] = curr_instructors
                curr_instructors = []
        return terms_dict

    # convert terms_dict into our preferred list format
    def pref_dict_format(dict_list):
        dict_list = [{"term": term, "instructors": terms_dictionary(doc)[term]} for term in terms_dictionary(doc)]
        return dict_list

    def credits_counter(doc):  
        cred = 0
        if course_code_credits(doc)[2].isdigit() == True:
            cred = int(course_code_credits(doc)[2])
        elif isfloat(course_code_credits(doc)[2]) == True:
            cred = float(course_code_credits(doc)[2])
        else:
            cred = 0
        return cred

    # adding data to final dictionary for a particular course
    full_course["code"] = course_code_credits(doc)[0]
    full_course["name"] = course_code_credits(doc)[1]
    if len(overview(doc)) > 1:
        full_course["description"] = overview(doc)
    full_course["prerequisites"]
    full_course["extra"] = extra_info(doc)
    full_course["credits"] = credits_counter(doc)
    full_course["department"] = department(doc)[0]
    full_course["faculty"] = department(doc)[1]
    full_course["terms"] = pref_dict_format(terms_dictionary(doc))
 
    # adding course dictionary to list of all courses
    return full_course

def get_all_courses(year: int):
    course_list = []

    # open course crawler json file
    with open(f"{year}/course-titles.json") as f:
        course_titles = json.load(f)

        for idx, code in enumerate(course_titles):
            try:
              course_list.append(get_course(code, year))

              print(code)

              if idx % 1000 == 0:
                  print(f"Course {idx}: ", code)

                  with open(f"{year}/course-data.json", "w") as outfile:
                      json.dump(course_list, outfile, indent=2)
            except Exception as e:
                with open(f"{year}/errors-courses.txt", "a+") as outfile:
                    outfile.write(f"{code},{str(e)}\n")

                print("error", e)

    with open(f"{year}/course-data.json", "w") as outfile:
        json.dump(course_list, outfile, indent=2)


course = input("Course code (or 'all'): ")
year = int(input("Year: "))

if course == 'all':
    get_all_courses(year)
else:
    print(json.dumps(get_course(course, year), indent=2))