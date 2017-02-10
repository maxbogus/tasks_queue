from tornado.ioloop import IOLoop
from tornado.web import FallbackHandler, RequestHandler, Application
from tornado.wsgi import WSGIContainer

from application import app


class MainHandler(RequestHandler):
    def get(self):
        self.write("This message comes from Tornado ^_^")


tr = WSGIContainer(app)

application = Application([
    (r"/tornado", MainHandler),
    (r".*", FallbackHandler, dict(fallback=tr)),
])

if __name__ == "__main__":
    application.listen(3000)
    application.debug = True
    IOLoop.instance().start()
