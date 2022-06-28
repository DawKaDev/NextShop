interface RatingProps {
  rating: number
}

const Rating = ({ rating }: RatingProps) => {
  return (
    <div className="text-white absolute -top-2 -left-2 text-md text-center pt-1.5 font-bold h-10 w-10 bg-blue-400 rounded-full">{rating}</div>
  );
}

export default Rating;
