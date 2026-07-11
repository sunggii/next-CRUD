const COLORS = {
  gray: 'bg-gray-500 hover:bg-gray-600',
  blue: 'bg-blue-500 hover:bg-blue-600',
  red: 'bg-rose-500 hover:bg-rose-600',
  green: 'bg-emerald-500 hover:bg-emerald-600',
};

export default function Button({ children, onClick, color = 'gray' }) {
  const colorClasses = COLORS[color] ?? COLORS.gray;

  return (
    <button
      onClick={onClick}
      className={`${colorClasses} rounded px-3 py-1 mr-2 text-white transition cursor-pointer`}
    >
      {/* children = content ที่อยู่ในแท็ก component 
      เช่น <Button>Click me</Button> */}
      {children}
    </button>
  );
}