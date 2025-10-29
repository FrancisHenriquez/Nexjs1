'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { markMessageAsRead } from '@/app/actions/markMessageAsRead';

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);

    setIsRead(read);
    toast.success(`Marked as ${read ? 'read' : 'new'}`);
  };

  const propertyName =
    message.property?.name ??
    message.propertyName ??
    (typeof message.property === 'string'
      ? message.property
      : 'Unknown property');

  const receivedDate = new Date(message.createdAt).toLocaleDateString('en-US', {
    timeZone: 'UTC'
  });

  return (
    <div className="relative bg-white p-3 rounded-md shadow-sm border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
          New{' '}
        </div>
      )}
      <h2 className="text-lg font-semibold mb-3">
        <span className="mr-1">Property Inquiry:</span>
        {''}
        {propertyName}
      </h2>
      <p className="text-gray-700 text-sm leading-relaxed">{message.body}</p>

      <ul className="mt-3 space-y-1 text-sm">
        <li className="flex gap-1">
          <strong>Reply Email:</strong>
          <a href={`mailto:${message.email}`} className="text-blue-500 hover:underline">
            {message.email}
          </a>
        </li>

        <li className="flex gap-1">
          <strong>Reply phone:</strong>
          {''}
          <a href={`tel:${message.phone}`} className="text-blue-500 hover:underline">
            {message.phone}
          </a>
        </li>

        <li className="flex gap-1">
          <strong>Received:</strong>
          {''}
          {receivedDate}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className="mt-3 mr-2 bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600"
      >
        {isRead ? 'Mark as New' : 'Mark as Read'}
      </button>
      <button className="mt-3 bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600">
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
