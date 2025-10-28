import connectDB from '@/config/database';
import Message from '@/models/Message';
import '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';
import { getSessionUser } from '@/utils/getSessionUser';
import MessageCard from '@/components/MessageCard';

const MessagesPage = async () => {
  connectDB();

  const sessionUser = await getSessionUser();
  const userId = sessionUser?.userId;

  if (!userId) {
    throw new Error('User must be signed in to view messages.');
  }

  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const unreadMessages = await Message.find({ recipient: userId, read: false })
    .sort({ createAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializableObject(messageDoc);
    message.sender = convertToSerializableObject(messageDoc.sender);
    message.property = convertToSerializableObject(messageDoc.property);
    return message;
  });

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 mas-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <p>You have no message</p>
              ) : (
                messages.map((message) => (
                  <MessageCard key={message._id} message={message} />
                ))
              )}
            </div>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
