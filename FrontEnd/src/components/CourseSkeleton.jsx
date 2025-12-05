export default function CourseSkeleton() {
    return (
        <div className="border rounded-lg p-4 w-100 mb-3 animate-pulse bg-gray-100">
            <div className="h-32 w-100 bg-gray-300 rounded mb-3"></div>

            <div className="h-4 bg-gray-300 rounded mb-2 w-75"></div>
            <div className="h-4 bg-gray-300 rounded mb-4 w-50"></div>

            <div className="h-8 bg-gray-300 rounded w-25"></div>
        </div>
    );
}
