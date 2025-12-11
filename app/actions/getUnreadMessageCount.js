'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export async function getUnreadMessageCount() {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser?.userId) return { count: 0 };

  const userId = String(sessionUser.userId);

  const count = await Message.countDocuments({
    recipient: userId,
    read: false
  });

  return { count };
}
