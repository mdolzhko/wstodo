const ListHeader = () => {
  return (
    <thead>
      <tr>
        <th
          scope="col"
          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
        ></th>
        <th
          scope="col"
          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
        >
          Title
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
        >
          Description
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
        >
          Progress
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
        >
          Actions
        </th>
        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
  );
};

export default ListHeader;
