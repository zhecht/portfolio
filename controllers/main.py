from flask import *
import operator
import os
import json

main_blueprint = Blueprint('main_blueprint', __name__, template_folder='views')

BASE = ""
if os.path.exists("/home/zackhechtportfolio/portfolio"):
	BASE = "/home/zackhechtportfolio/portfolio/"

def getProjects():
	with open("{}static/projects.json".format(BASE)) as fh:
		return json.loads(fh.read())

def readSkills():
	with open("{}static/skills.json".format(BASE)) as fh:
		skills = json.loads(fh.read())

	res = {}
	for skillType in skills:
		data = []
		for skillRow in sorted(skills[skillType], key=operator.itemgetter("rating"), reverse=True):
			data.append(skillRow)
		res[skillType] = data
	return res


@main_blueprint.route('/',methods=["GET"])
def main_route():
	projects = getProjects()
	skills = readSkills()
	return render_template("main.html", projects=projects, skills=skills)