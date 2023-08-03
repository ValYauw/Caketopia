class ChatroomController {

  static goToChatroom(req, res) {
    const {id} = req.params;
    const session = req.session;
    res.render('chatroom', {id, session});
  }

  // static saveChatToSession(req, {content, roomName, from}) {
  //   if (!req.session.chatLog) req.session.chatLog = [];
  //   req.session.chatLog.push({content, roomName, from});
  // }

}

module.exports = ChatroomController;
