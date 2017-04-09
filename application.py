from flask import Flask, render_template, request
from flask import jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database_setup import Tasks, Base

app = Flask(__name__)

engine = create_engine('sqlite:///tasks.db')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route('/')
@app.route('/tasks', methods=['GET'])
def tasks_list():
    """ This page will show all my tasks """
    try:
        tasks = session.query(Tasks).all()
    except Exception:
        session.rollback()
    return render_template('index.html')


@app.route('/tasks', methods=['POST'])
def get_task():
    """ This page will show all my tasks """
    content = request.get_json(silent=True)
    new_task = Tasks(title=content['title'],
                     description=content['description'],
                     priority=content['priority'])
    session.add(new_task)
    session.commit()

    return jsonify(content)


@app.route('/task/delete/<id>', methods=['POST'])
def delete_task(id):
    """ This page will show all my tasks """
    result = ""
    try:
        task = session.query(Tasks).filter_by(id=id).delete()
        session.commit()
        result = "success"
    except Exception:
        session.rollback()
        result = "failure {}".format(id)
    return jsonify(result)


@app.route('/tasks/json', methods=['GET'])
def tasks_json():
    tasks = session.query(Tasks).order_by(Tasks.priority.desc())
    return jsonify(Tasks=[i.serialize for i in tasks])


if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=3000)
