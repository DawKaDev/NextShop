interface RatingProps {
  rating: number
}

const Rating = ({ rating }: RatingProps) => {
  return (
    <div className="absolute -top-2 -left-2 text-sm text-center pt-2 font-bold h-10 w-10 bg-white border-2 border-teal-800 text-teal-800 rounded-full">{rating}</div>
  );
}

export default Rating;
