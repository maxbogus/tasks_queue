# Install:
* $ python database_setup.py
* $ python application.py 

# Use:
* Open localhost:3000 in browser
* Send request to: curl -X POST -d '{"priority":4,"title":"Покрасить забор","description":"Покрасить забор вокруг дома розовым цветом до полуночи сегодня."}' -H "Content-type: application/json" http://localhost:5000/tasks