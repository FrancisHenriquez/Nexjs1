'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

export async function markMessageAsRead(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }
  const sessionUserId = String(sessionUser.userId);

  const message = await Message.findById(messageId);

  if (!message) throw new Error('Message not found');

  //Verify Ownership

  const recipientValue = message.recipient;
  const recipientId =
    typeof recipientValue === 'object' && recipientValue !== null
      ? recipientValue._id?.toString()
      : recipientValue?.toString();

  if (!recipientId || recipientId !== sessionUserId) {
    throw new Error('Unauthorized');
  }

  message.read = !message.read;

  revalidatePath('/messages', 'page');

  await message.save();

  return message.read;
}
