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

alertList = []
printAlert = TUalert.printAlert

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

#Prints out all of the current TUalerts
def printAlerts():
  for x in range(len(alertList)):
    printAlert(alertList[x])

# Gets list of messages that are about TUalerts
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

# Reads the message and gets the date and time of the TUalert
def getDateTime(service, user_id, msg_id, final, alert):
    try:
      message = service.users().messages().get(userId=user_id, id=msg_id, format='minimal').execute()
      temp = message['snippet'].split('Date:')[1].split('at')
      #temp2 = temp[1]
      final += "Date: " + temp[0] + '\n'
      final += "Time: " + temp[1].split('Subject:')[0] + '\n'
      alert.date = temp[0]
      alert.time = temp[1].split('Subject:')[0]
      print(final)
      #print('Date and time: %s' % message)
      #print('\n')
      return alert

    except errors.HttpError, error:
     print('An error occurred: %s' % error)

# Reads the message and gets the crime and location of the TUalert
def getCrimeLocation(service, user_id, threads):
  totalAlerts = 0
  for thread in threads:
        tdata = service.users().threads().get(userId='me', id=thread['id']).execute()

        alert = TUalert('', '', '', '', '', totalAlerts)
        totalAlerts += 1

        #print('Crime and location: %s' % thread['snippet'])

        final = 'Alert Type: '
        temp = thread['snippet']

        if 'Use caution.' in temp:
          alert.alert = 'Crime'
          final += 'crime \n'
          final += 'Crime: '
          temp2 = temp.split('reported at')
          final += temp2[0].split(',')[1] + '\n' + 'Location: '
          temp3 = temp2[1].split('.')
          final += temp3[0] + '\n'
          alert.location = temp3[0]
          alert.crime = temp2[0].split(',')[1]
        elif 'All clear' in temp:
          alert.alert = 'All Clear'
          final += 'clear \n'
          final += 'Crime: clear \n'
          temp2 = temp.split('in the area of')
          final += 'Location: ' + temp2[1].split('.')[0] + '\n'
          alert.location = temp2[1].split('.')[0]
          alert.crime = 'N/A'
        else:
          final += 'other \n'
          final += 'Crime: N/A \n'
          final += 'Location: N/A \n' 
          alert.alert = 'Other'
          alert.location = 'N/A'
          alert.crime = 'N/A'
               
        for data in tdata['messages']:
          alertList.append(getDateTime(service, 'me', data['id'], final, alert))

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

    # Call the Gmail API

    threads = listMessages(service,'me','Jay Patel,')

    if not threads:
        print('No TUalerts found.')
    else:
      getCrimeLocation(service, 'me', threads)
      
    printAlerts()

if __name__ == '__main__':
    main()



  
    
    

      












