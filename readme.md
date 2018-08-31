# Install:

[![Greenkeeper badge](https://badges.greenkeeper.io/maxbogus/tasks_queue.svg)](https://greenkeeper.io/)

* $ python database_setup.py

# Use:
* Decide which mode do you want to use:
    * common (simple flask server)
    * cyclone (flask + tornado)
* Open localhost:3000 in browser
* Send request to: curl -X POST -d '{"priority":4,"title":"Покрасить забор","description":"Покрасить забор вокруг дома розовым цветом до полуночи сегодня."}' -H "Content-type: application/json" http://localhost:3000/tasks

# Future plans:
![My image](https://github.com/maxbogus/tasks_queue/blob/master/images/future_plans.png)