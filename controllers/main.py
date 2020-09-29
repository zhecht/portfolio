from flask import *
import os
import json

main_blueprint = Blueprint('main_blueprint', __name__, template_folder='views')

BASE = ""
if os.path.exists("/home/zackhechtportfolio/portfolio"):
	BASE = "/home/zackhechtportfolio/portfolio/"
def read_projects():
	with open("{}static/projects.json".format(BASE)) as fh:
		return json.loads(fh.read())

def read_skills():
	with open("{}static/skills.json".format(BASE)) as fh:
		return json.loads(fh.read())

def get_all_projects(projects):
	all_html = ""
	css = ""
	for which in ["personal", "professional"]:
		html = "<div id='{}' {}>".format(which, css)
		css = "" if which == "personal" else "style='display: none'"
		for proj in projects[which]:
			html += "<div class='project'>"
			html += 	"<div class='left'>"
			html += 		"<div class='pics'>"
			hide = "flex"
			for pic in proj["pics"]:
				css = "display: {};".format(hide)
				#if pic.find("mob") == -1:
				#	css += "width: 500px;"
				if pic.endswith("mp4"):
					#html +=		"<iframe src='{}' style='display: {}'></iframe>".format(pic, hide)
					html +=		"<video src='/static/pictures/{}' controls style='{}'></video>".format(pic, css)
				else:
					html +=		"<img src='/static/pictures/{}' style='{}' />".format(pic, css)
				hide = "none"
			html += 		"</div>"
			html += 		"<div class='desc'>"
			html +=				"<button style='left:0;'>&lt;</button>"
			html +=				"<button style='right:0;'>&gt;</button>"
			html +=				"<span>{}</span>".format(proj["pics_desc"][0])
			html += 		"</div>"
			html += 	"</div>"
			html += 	"<div class='right'>"
			html +=			"<div class='title'>"
			if proj.get("site"):
				html +=			"<a href='{}'>{}</a>".format(proj.get("site"), proj["title"])
			else:
				html +=			proj["title"]
			html +=			"</div>"
			html +=			"<div class='list'>"
			for summary in proj["summary"]:
				html +=			"<div><span class='circle'></span>{}</div>".format(summary)
			html += 		"</div>"
			html += 	"</div>"
			html += "</div>"
		html += "</div>"
		all_html += html
	return all_html

def skill_tables(skills):
	html = ""
	for key in skills:
		css = "" if key == "languages" else "style='display: none'"
		html += "<div id='{}' {}>".format(key, css)
		html += "	<div class='table'>"
		for skill in skills[key]:
			skill, rank = skill.split("\t")
			rank = float(rank)
			html += 	"<div class='row'>"
			html +=			"<div>{}</div>".format(skill)
			html += 		"<div>"
			for i in range(5):
				active = "circle active" if i < rank else "circle"
				html += 		"<span class='{}'></span>".format(active)
			html += 		"</div>"
			html += 	"</div>"
		html += "	</div>"
		html += "</div>"
	return html

@main_blueprint.route('/',methods=["GET"])
def main_route():
	projects = read_projects()
	skills = read_skills()
	all_projects_html = get_all_projects(projects)
	skill_table_html = skill_tables(skills)
	return render_template("main.html", all_projects=all_projects_html, project_json=projects, skills_table=skill_table_html)