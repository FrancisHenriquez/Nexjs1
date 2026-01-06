// "use client";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const PropertiesPage = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const { page = 1, pageSize = 2 } = resolvedSearchParams;
  const pageNumber = Number(page) || 1;
  const pageSizeNumber = Number(pageSize) || 2;
  await connectDB();

  const skip = (pageNumber - 1) * pageSizeNumber;

  const total = await Property.countDocuments({});
  const totalPages = Math.max(1, Math.ceil(total / pageSizeNumber));
  const properties = await Property.find({}).skip(skip).limit(pageSizeNumber);

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <>
            <div className="grid gird-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  searchParams={resolvedSearchParams}
                />
              ))}
            </div>
            <nav className="mt-8 flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageValue = index + 1;
                const href = `/properties?page=${pageValue}&pageSize=${pageSizeNumber}`;
                const isActive = pageValue === pageNumber;

                return (
                  <Link
                    key={pageValue}
                    href={href}
                    className={`px-3 py-1 rounded border text-sm ${
                      isActive
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageValue}
                  </Link>
                );
              })}
            </nav>
          </>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
