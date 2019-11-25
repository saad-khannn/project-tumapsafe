
# Creates TUalert object for all TUalert types

class TUalert:

    def __init__(self, alert, date, time, crime, location, tuid):
        self.alert = alert
        self.date = date
        self.time = time
        self.crime = crime
        self.location = location
        self.id = tuid
        self.description = ''

    # alert types = crime, clear, other
    # date format = Mon, Oct 21, 2019
    # time format = 12:12 PM
    # crime format = for crime alert types will list crime for all other alert types crime will be N/A
    # location format = will vary depending on the TUalert email
    # tuid is the id for the TUalert object
    # description is just the crime + the location of the crime

# Prints the alert out with all of the contents of a TUalert object

    def printAlert(self):
        print('Alert Type: ' + self.alert + '\n' + 'Date: ' +
              self.date + '\n' + 'Time: ' + self.time + '\n' + 'Crime: ' + self.crime + '\n'
              + 'Location: ' + self.location + '\n' + 'Alert id: ' + str(self.id) + '\n' + 'Description: ' +
              self.description + '\n')
