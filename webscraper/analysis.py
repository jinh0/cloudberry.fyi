import json
from typing import Literal, TypedDict, Union


class Semester(TypedDict):
    term: Union[Literal["fall"], Literal["winter"]]
    instructors: list[str]


class Course(TypedDict):
    code: str
    name: str
    description: str
    credits: int
    terms: list[Semester]
    extra: list[str]
    faculty: str


def load_file() -> list[Course]:
    with open("./course-data.json") as f:
        courses: list[Course] = json.load(f)

        return courses


courses = load_file()

codes = set()
for course in courses:
    codes.add(course["code"].split("-")[0])

    if ":" not in course["description"]:
        print(course["code"])


print(len(codes))
