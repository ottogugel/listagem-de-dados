export function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen gap-4">
      <div className="animate-pulse rounded-full h-4 w-4 border-b-2 border-gray-900 bg-white"></div>
      <div className="animate-pulse rounded-full h-4 w-4 border-b-2 border-gray-900 bg-white"></div>
      <div className="animate-pulse rounded-full h-4 w-4 border-b-2 border-gray-900 bg-white"></div>
    </div>
  );
}
