import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { convertToSerializableObject } from '@/utils/convertToObject';
import { redirect } from 'next/navigation';

const SavedPropertiesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser?.userId) {
    redirect('/');
  }

  const user = await User.findById(sessionUser.userId).lean();

  if (!user) {
    redirect('/profile');
  }

  const savedPropertyIds = user.bookmarks ?? [];

  const savedPropertyDocs = savedPropertyIds.length
    ? await Property.find({ _id: { $in: savedPropertyIds } }).lean()
    : [];

  const savedProperties = savedPropertyDocs.map((property) =>
    convertToSerializableObject(property)
  );

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-6">Your Saved Properties</h1>
          {savedProperties.length === 0 ? (
            <p>You have not saved any properties yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
