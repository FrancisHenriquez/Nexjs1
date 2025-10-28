const MessageCard = ({ message }) => {
  const propertyName =
    message.property?.name ??
    message.propertyName ??
    (typeof message.property === 'string'
      ? message.property
      : 'Unknown property');

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      <h2 className="text-xl mb-4">
        <span className="font bold">Property Inquiry:</span>
        {''}
        {propertyName}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>
          {''}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>

        <li>
          <strong>Reply phone:</strong>
          {''}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>

        <li>
          <strong>Received:</strong>
          {''}
          {new Date(message.createdAt).toLocaleDateString()}
        </li>
      </ul>
      <button className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded">
        Mark As Read
      </button>
      <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded">
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
