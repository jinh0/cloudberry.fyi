import requests


def test_route(route: str):
    times = []
    n = 5

    for _ in range(n):
        times.append(
            requests.get(
                "https://www.cloudberry.fyi"
                + route
                # "https://www.cloudberry.fyi/api/edge_test"
                # "https://www.cloudberry.fyi/api/courses?search=comp%20250"
            ).elapsed.total_seconds()
        )

    return sum(times) / n


print(test_route("/courses/math-462"))


# 200ms for test api
# 110ms for /courses with nothing
