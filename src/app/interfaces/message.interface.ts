export interface messageData {
  message: string;
  uid: string;
  date: string;//date().toDateString
  time: string;//date().toTimeString
  username: string;
}

export interface Message {
  id: string;
  data: messageData;
}
