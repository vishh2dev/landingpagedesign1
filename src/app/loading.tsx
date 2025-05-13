export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <img src="/loading.gif" alt="Loading" className="w-28 h-28 object-contain" />
    </div>
  );
} 