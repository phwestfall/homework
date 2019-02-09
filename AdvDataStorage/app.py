import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Measurement = Base.classes.measurement
Station = Base.classes.station

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

@app.route('/')
def index():
    return(
            f'Welcome to the Home Page!</br></br>'
            f'-------------------------</br></br>'
            f'<b>All of the available routes:</b></br></br>'
            f'Last Twelve Months of Precipitation Data: /api/v1.0/precipitation</br></br>'
            f'List of Weather Stations: /api/v1.0/stations</br></br>'
            f'Dates and Temps Observations: /api/v1.0/tobs</br></br>'
            f'Temperature minimun, average, and maximum from start date </br>'
            f'format should be in yyyy-mm-dd format: /api/v1.0/yyyy-mm-dd</br></br>'
            f'Temperature minimum, average, and maximum for a start and end date</br>'
            f'format should be in yyyy-mm-dd format: /api/v1.0/yyyy-mm-dd/yyyy-mm-dd'            
            )
    
@app.route('/api/v1.0/precipitation')
def precip():
    session = Session(engine)
    
    # Design a query to retrieve the last 12 months of precipitation data and plot the results
    last_twelve = session.query(Measurement.date).order_by(Measurement.date.desc()).first()
    max_date = last_twelve[0]

    # Calculate the date 1 year ago from the last data point in the database
    one_year_ago = dt.datetime.strptime(max_date, "%Y-%m-%d") - dt.timedelta(365)

    # Perform a query to retrieve the data and precipitation scores
    date_precip = session.query(Measurement.date, Measurement.prcp).filter(Measurement.date >= one_year_ago).all()
    
    date_precip_dict = dict(date_precip)
    return jsonify(date_precip_dict)

@app.route('/api/v1.0/stations')
def station():
    session = Session(engine)
    station_name = session.query(Measurement.station).distinct().all()
    station_list = list(np.ravel(station_name))
    return jsonify(station_list)

@app.route('/api/v1.0/tobs')
def temperatures():
    session = Session(engine)
    # Design a query to retrieve the last 12 months of precipitation data and plot the results
    last_twelve = session.query(Measurement.date).order_by(Measurement.date.desc()).first()
    max_date = last_twelve[0]

    # Calculate the date 1 year ago from the last data point in the database
    one_year_ago = dt.datetime.strptime(max_date, "%Y-%m-%d") - dt.timedelta(365)
    
    tempstation = session.query(Measurement.station,func.count(Measurement.tobs)).\
    group_by(Measurement.station).order_by(func.count(Measurement.tobs).desc()).all()

    tempstation = tempstation[0][0]

    year_temp = session.query(Measurement.tobs).filter(Measurement.station == tempstation)\
    .filter(Measurement.date >= one_year_ago).all()
    
    temp_list = list(np.ravel(year_temp))
    
    return jsonify(temp_list) 
    
@app.route('/api/v1.0/<start>')
def calcstarttemp(start=None):
    session = Session(engine)
    starttemp = session.query(Measurement.date, func.min(Measurement.tobs), func.avg(Measurement.tobs),
                                  func.max(Measurement.tobs)).filter(Measurement.date >= start).group_by(Measurement.date).all()
    starttemp_list = list(starttemp)
    return jsonify(starttemp_list)

@app.route('/api/v1.0/<start>/<end>')
def calctemp(start=None, end=None):
    session = Session(engine)
    startendtemp =session.query(Measurement.date, func.min(Measurement.tobs), func.avg(Measurement.tobs),\
                             func.max(Measurement.tobs)).filter(Measurement.date >= start).\
                             filter(Measurement.date <= end).group_by(Measurement.date).all()
    startendtemp_list = list(startendtemp)
    return jsonify(startendtemp_list)


from flask import request

def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()

@app.route('/shutdown')
def shutdown():
    shutdown_server()
    return 'Server shutting down...'

if __name__ == '__main__':
    app.run(debug=True)