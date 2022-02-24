const Spinner = () => {
  return (
    <div className="absolute flex left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="inline-block w-8 h-8 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
