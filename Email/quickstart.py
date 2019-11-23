from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import base64
import email
from apiclient import errors
from TUalert import TUalert

# Array that holds all of the TUalerts
alertList = []
# Imports the printAlert function from the TUalert class
printAlert = TUalert.printAlert

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

#Prints out all of the current TUalerts from the alertList array
def printAlerts():
  for x in range(len(alertList)):
    printAlert(alertList[x])

# Gets a list of messages that are about TUalerts based on a search query
def listMessages(service, user_id, query):
    try: 
      response = service.users().threads().list(userId=user_id,
                                               q=query).execute()
      threads = []
      if 'threads' in response:
         threads.extend(response['threads'])
    
      while 'nextPageToken' in response:
        page_token = response['nextPageToken']
        response = service.users().threads().list(userId=user_id, q=query, pageToken=page_token).execute()
        threads.extend(response['threads'])    

      return threads 
    except errors.HttpError, error:
      print('An error occurred: %s' % error)

# Reads the message and gets the date and time information about the TUalert
def getDateTime(service, user_id, msg_id, alert):
    try:
      message = service.users().messages().get(userId=user_id, id=msg_id, format='minimal').execute()

      # Splits the content of the message to the needed components and assigns it to a TUalert object
      temp = message['snippet'].split('Date:')[1].split('at')
      alert.date = temp[0]
      alert.time = temp[1].split('Subject:')[0]
      return alert

    except errors.HttpError, error:
     print('An error occurred: %s' % error)

# Reads the message and gets the crime and location information about the TUalert
def getCrimeLocation(service, user_id, threads):
  totalAlerts = 0
  for thread in threads:
        tdata = service.users().threads().get(userId='me', id=thread['id']).execute()

        # Creates an empty TUalert object
        alert = TUalert('', '', '', '', '', totalAlerts)
        # Incriments the total alert count
        totalAlerts += 1
        
        temp = thread['snippet']

        # If the TUalert is a crime
        if 'Use caution.' in temp:
          alert.alert = 'Crime'
          # Description of TUalert
          alert.description = temp.split('<b>Patel</b>,')[1]
          temp2 = temp.split('reported at')
          temp3 = temp2[1].split('.')
          # Location of TUalert
          alert.location = temp3[0]
          # Crime description of TUalert
          alert.crime = temp2[0].split(',')[1]

        # If the TUalert is an all clear message  
        elif 'All clear' in temp:
          alert.alert = 'All Clear'
          # Description of TUalert
          alert.description = temp.split('<b>Patel</b>,')[1]
          temp2 = temp.split('in the area of')
          # Location of TUalert
          alert.location = temp2[1].split('.')[0]
          # Crime type does not apply for this type of TUalert
          alert.crime = 'N/A'

        # If the TUalert is something else (will be ignored)  
        else:
          alert.alert = 'Other'
          # Description of TUalert
          alert.description = temp.split('<b>Patel</b>,')[1]
          # Location does not apply for this type of TUalert
          alert.location = 'N/A'
          # Crime type does not apply for this type of TUalert
          alert.crime = 'N/A'
               
        # Gets the date and time info for all of the TUalerts and adds them to the alertList array       
        for data in tdata['messages']:
          alertList.append(getDateTime(service, 'me', data['id'], alert))

def main():
    """Shows basic usage of the Gmail API.
    Lists the user's Gmail labels.
    """
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('gmail', 'v1', credentials=creds)

    # Calls the Gmail API

    threads = listMessages(service,'me','Jay Patel,')

    if not threads:
        print('No TUalerts found.')
    else:
      getCrimeLocation(service, 'me', threads)
      
    printAlerts()

if __name__ == '__main__':
    main()



  
    
    

      












