
# Creates TUalert object for all TUalert types

class TUalert:

 def __init__(self, alert, date, time, crime, location, tuid):
   self.alert = alert
   self.date = date
   self.time = time
   self.crime = crime
   self.location = location
   self.id = tuid

 
 # alert types = crime, clear, close
 # date format = 11/11/19
 # time format = 12:12 PM
 # crime format = for crime alert types will list crime for all other alert types crime will be N/A
 # location format = will vary depending on the TUalert email
 # tuid is the id for the TUalert object

 def printAlert(self):
  	print('Alert Type: ' + self.alert + '\n' + 'Date: ' + 
  		self.date + '\n' + 'Time: ' + self.time + '\n' + 'Crime: ' + self.crime + '\n'
  		+ 'Location: ' + self.location + '\n' + 'Alert id: ' + str(self.id) + '\n')