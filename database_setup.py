from sqlalchemy import Column, Integer, String
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Tasks(Base):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True)
    title = Column(String(250), nullable=False)
    description = Column(String(250), nullable=False)
    priority = Column(Integer)

    @property
    def serialize(self):
        """Returns object data in easily serializable format"""
        return {'id': self.id,
                'title': self.title,
                'description': self.description,
                'priority': self.priority}


# insert at end of file #######

engine = create_engine('sqlite:///tasks.db')

Base.metadata.create_all(engine)
